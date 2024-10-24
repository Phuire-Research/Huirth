/*<$
For the graph programming framework Stratimux and the Web Socket Client Concept, generate a principle that will establish a connection with a server, and pass its semaphore.
Then create a plan to notify the server of state changes, while ignoring values that would disallow this process from being halting complete.
As well as receive actions from the server, the parse and dispatch them into the client's action stream.
$>*/
/*<#*/
import { Action, KeyedSelector, muxiumKick, muxiumRegisterStagePlanner, createStage, getMuxiumState, selectMuxifiedState } from 'stratimux';
import _ws from 'express-ws';
import { WebSocketClientPrinciple, WebSocketClientState } from './webSocketClient.concept';
import { webSocketClientSetClientSemaphore } from './strategies/server/setClientSemaphore.helper';
import { webSocketServerSyncClientState } from './strategies/server/syncServerState.helper';
import { webSocketClient_createActionQueSelector } from './webSocketClient.selectors';

const filterKeys = [
  'pages',
  'pagesCached',
  'components',
  'currentPage',
  'selectors',
  'boundSelectors',
  'clientSemaphore',
  'serverSemaphore',
  'pageStrategies',
  'actionQue',
];
const notKeys = (key: string) => {
  return !filterKeys.includes(key);
};

export const webSocketClientPrinciple: WebSocketClientPrinciple = ({ plan, conceptSemaphore, observer, concepts_, d_ }) => {
  const url = 'ws://' + window.location.host + '/muxium';
  const ws = new WebSocket(url);
  const syncState: Record<string, unknown> = {};
  ws.addEventListener('open', () => {
    // console.log('SEND');
    ws.send(JSON.stringify(webSocketClientSetClientSemaphore({ semaphore: conceptSemaphore })));
    plan('Web Socket Planner', ({ stage, d__, k__ }) => [
      stage(({ concepts, dispatch, stagePlanner, k }) => {
        const name = k.name(concepts);
        if (name) {
          dispatch(d__.muxium.e.muxiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
            iterateStage: true,
          });
        } else {
          stagePlanner.conclude();
        }
      }),
      stage(
        ({ concepts, stagePlanner }) => {
          const state = selectMuxifiedState<WebSocketClientState>(concepts, conceptSemaphore);
          if (state) {
            if (state.actionQue.length > 0) {
              const que = state.actionQue;
              // console.log('ATTEMPTING TO SEND', que);
              const emptyQue = () => {
                if (que.length) {
                  const action = que.shift();
                  if (action) {
                    // console.log('SENDING', action);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    action.conceptSemaphore = (state as any).clientSemaphore;
                    ws.send(JSON.stringify(action));
                  }
                }
              };
              emptyQue();
            }
          } else {
            stagePlanner.conclude();
          }
        },
        { beat: 3, selectors: [k__.actionQue] }
      ),
    ]);
    const onChangePlan = plan('Web Socket Server On Change', ({ stage }) => [
      stage(({ concepts, dispatch, stagePlanner, d, k }) => {
        const name = k.name(concepts);
        if (name) {
          dispatch(d.muxium.e.muxiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
            iterateStage: true,
          });
        } else {
          stagePlanner.conclude();
        }
      }),
      stage(
        ({ concepts, stagePlanner, k }) => {
          // Bucket State
          const state: Record<string, unknown> = {};
          const newState = k.state(concepts) as Record<string, unknown>;
          if (newState) {
            const stateKeys = Object.keys(newState);
            if (Object.keys(syncState).length === 0) {
              for (const key of stateKeys) {
                if (notKeys(key)) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                }
              }
              ws.send(JSON.stringify(webSocketServerSyncClientState({ state })));
            } else {
              let changed = false;
              for (const key of stateKeys) {
                if (notKeys(key) && typeof newState[key] !== 'object' && newState[key] !== syncState[key]) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                  changed = true;
                } else if (notKeys(key) && typeof newState[key] === 'object' && !Object.is(newState[key], syncState[key])) {
                  syncState[key] = newState[key];
                  state[key] = newState[key];
                  changed = true;
                }
              }
              if (changed) {
                const sync = webSocketServerSyncClientState({ state });
                sync.conceptSemaphore = (newState as WebSocketClientState).serverSemaphore;
                // console.log('CHECK SYNC', sync);
                ws.send(JSON.stringify(sync));
              }
            }
          } else {
            stagePlanner.conclude();
          }
        },
        { priority: 2000 }
      ),
      stage(({ dispatch, d }) => {
        dispatch(d.muxium.e.muxiumKick(), {
          setStage: 1,
        });
      }),
    ]);
    ws.addEventListener('close', () => {
      onChangePlan.conclude();
    });
  });
  ws.addEventListener('message', (message: any) => {
    // console.log('CHECK MESSAGE', message);
    if (message.data !== 'ping') {
      const act = JSON.parse(message.data) as Action;
      if (Object.keys(act).includes('type')) {
        // if (getMuxiumState(concepts_).logging && (act as Action).type !== muxiumKick.actionType) {
        console.log('MESSAGE', act);
        act.semaphore = [-1, -1, -1, -1];
        // }
        observer.next(act);
      }
    }
  });
};
/*#>*/
