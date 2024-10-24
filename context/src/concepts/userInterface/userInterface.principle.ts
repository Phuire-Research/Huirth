/*<$
For the graph programming framework Stratimux and the User Interface Concept, generate a principle that will dispatch a sequence of page to state strategies that will cache the required pages for the client.
$>*/
/*<#*/
import { strategySequence, strategyBegin, muxiumSelectOpen, ActionStrategy, getMuxiumState, selectSlice } from 'stratimux';
import { UserInterfacePrinciple, UserInterfaceState } from './userInterface.concept';
import { userInterfacePageToStateStrategy } from './strategies.ts/pageToState.strategy';
import { userInterface_isClient } from '../../model/userInterface';
import { UserInterfaceClientState } from '../userInterfaceClient/userInterfaceClient.concept';

export const userInterfaceInitializationPrinciple: UserInterfacePrinciple = ({ subscribe, plan }) => {
  const _diag = subscribe((val) => {
    const muxiumState = getMuxiumState(val);
    if (muxiumState.badActions.length > 0) {
      console.error('BAD ACTIONS: ', muxiumState.badActions);
    }
    // console.log('BAD PLANS', muxiumState.badPlans);
    // console.log('CHECK FOR SIDEBAR CONTENT', val[1].qualities[56]);
  });
  const userInterfacePageInit = plan('User Interface Page to State initialization plan', ({ stage, d__, k__ }) => [
    stage(
      ({ concepts, dispatch, stagePlanner, d, k }) => {
        // console.log('USER INTERFACE PAGE TO STATE INIT 1');
        const name = k.name(concepts);
        if (name && selectSlice(concepts, d.muxium.k.open) === true) {
          dispatch(d__.muxium.e.muxiumRegisterStagePlanner({ conceptName: name, stagePlanner }), {
            iterateStage: true,
          });
        } else if (name === undefined) {
          // console.log('THIS IS CONCLUDING EARLY', name, selectSlice(concepts, muxiumSelectOpen));
          stagePlanner.conclude();
        }
      },
      { priority: 1000, selectors: [d__.muxium.k.open] }
    ),
    stage(
      ({ concepts, dispatch, stagePlanner, d, k }) => {
        const uiState = k.state(concepts);
        // console.log('USER INTERFACE PAGE TO STATE INIT 2', uiState?.pages.length, uiState?.pageStrategies.length);
        if (uiState) {
          if (uiState.pageStrategies.length === 1) {
            dispatch(strategyBegin(userInterfacePageToStateStrategy(uiState.pageStrategies[0](concepts), d)), {
              iterateStage: true,
            });
          } else if (uiState.pageStrategies.length > 1) {
            const isClient = userInterface_isClient();
            const list: ActionStrategy[] = [];
            uiState.pageStrategies.forEach((creator) => {
              if (isClient) {
                const pageCreator = creator(concepts);
                const title = pageCreator(d)[1].topic;
                const currentPage = (uiState as UserInterfaceClientState).currentPage;
                if (title === currentPage) {
                  list.push(userInterfacePageToStateStrategy(pageCreator, d));
                }
              } else {
                list.push(userInterfacePageToStateStrategy(creator(concepts), d));
              }
            });
            const strategy = strategySequence(list);
            if (strategy) {
              // console.log('DISPATCHED', uiState.pages.length, strategy);
              dispatch(strategyBegin(strategy), {
                iterateStage: true,
              });
            }
          } else {
            if (getMuxiumState(concepts).logging) {
              console.log('No pages initialized');
            }
            stagePlanner.conclude();
          }
        }
      },
      {
        selectors: [
          (() => {
            // console.error('CHECK K', Object.keys(d__), 'something');
            const output = k__ as any;
            // console.log('CHECK OUTPUT', output);
            return output;
          })(),
        ],
      }
    ),
    stage(({ stagePlanner }) => {
      // console.log('USER INTERFACE PAGE TO STATE INIT 3');
      stagePlanner.conclude();
    }),
  ]);
};
/*#>*/
