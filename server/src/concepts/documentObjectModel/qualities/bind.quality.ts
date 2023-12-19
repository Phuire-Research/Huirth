/*<$
For the graph programming framework Stratimux and Document Object Model Concept, generate a quality that will bind an action to an element.
$>*/
/*<#*/
import {
  Action,
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  refreshAction,
  selectPayload,
  strategyBegin,
  strategySuccess,
} from 'stratimux';
import { Binding } from '../../../model/userInterface';
import { Subject } from 'rxjs';
import { elementEventBinding } from '../../../model/html';
import { documentObjectModelBindActionStrategy } from '../strategies/bindAction.strategy';

export type DocumentObjectModelBindPayload = {
  action$: Subject<Action>,
  id: string,
  binding: Binding
}
export const documentObjectModelBindType: ActionType = 'Document Object Model bind element';
export const documentObjectModelBind =
  prepareActionWithPayloadCreator<DocumentObjectModelBindPayload>(documentObjectModelBindType);

const documentObjectModelBindMethodCreator: MethodCreator = (event) => createMethod((action) => {
  const payload = selectPayload<DocumentObjectModelBindPayload>(action);
  const element = document.getElementById(payload.id);
  if (element) {
    setElementBinding(element, payload);
  }
  if (action.strategy) {
    const success = strategySuccess(action.strategy);
    return success;
  } else {
    return action;
  }
});

export const documentObjectModelBindQuality = createQuality(
  documentObjectModelBindType,
  defaultReducer,
  documentObjectModelBindMethodCreator,
);
const setElementBinding = (element: HTMLElement, payload: DocumentObjectModelBindPayload) => {
  const {
    binding
  } = payload;
  (element as any)[payload.elementEventBinding] = (event) => {
    payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
  };
};
/*#>*/

// Stashing if we ever need to be very specific with event bindings.
// eslint-disable-next-line complexity
// switch (binding.eventBinding) {
// case elementEventBinding.onabort: {
//   element.onabort = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onafterprint: {
//   window.onafterprint = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onbeforeprint: {
//   window.onbeforeprint = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onblur: {
//   element.onblur = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncanplay: {
//   element.oncanplay = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncanplaythrough: {
//   element.oncanplaythrough = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onchange: {
//   element.onchange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onclick: {
//   element.onclick = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncontextmenu: {
//   element.oncontextmenu = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncopy: {
//   element.oncopy = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncuechange: {
//   element.oncuechange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oncut: {
//   element.oncut = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondblclick: {
//   element.ondblclick = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondrag: {
//   element.ondrag = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondragend: {
//   element.ondragend = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondragenter: {
//   element.ondragenter = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondragover: {
//   element.ondragover = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondrop: {
//   element.ondrop = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ondurationchange: {
//   element.ondurationchange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onemptied: {
//   element.onemptied = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onended: {
//   element.onended = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onerror: {
//   element.onerror = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onfocus: {
//   element.onfocus = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onhashchange: {
//   window.onhashchange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.oninput: {
//   element.oninput = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onkeydown: {
//   element.onkeydown = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onkeyup: {
//   element.onkeyup = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onload: {
//   element.onload = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onloadeddata: {
//   element.onloadeddata = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onloadedmetadata: {
//   element.onloadedmetadata = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onloadstart: {
//   element.onloadstart = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onmessage: {
//   window.onmessage = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onmousedown: {
//   element.onmousedown = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onmouseout: {
//   element.onmouseout = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onmouseup: {
//   element.onmouseup = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onoffline: {
//   window.onoffline = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ononline: {
//   window.ononline = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onpagehide: {
//   window.onpagehide = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onpageshow: {
//   window.onpageshow = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onpaste: {
//   element.onpaste = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onpause: {
//   element.onpause = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onplaying: {
//   element.onplaying = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onpopstate: {
//   window.onpopstate = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onprogress: {
//   element.onprogress = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onratechange: {
//   element.onratechange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onreset: {
//   element.onreset = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onresize: {
//   window.onresize = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onscroll: {
//   element.onscroll = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onseeked: {
//   element.onseeked = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onseeking: {
//   element.onseeking = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onstalled: {
//   element.onstalled = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onsubmit: {
//   element.onsubmit = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onsuspend: {
//   element.onsuspend = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ontimeupdate: {
//   element.ontimeupdate = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.ontoggle: {
//   element.ontoggle = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onunload: {
//   window.onunload = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onvolumechange: {
//   element.onvolumechange = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onwaiting: {
//   element.onwaiting = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// case elementEventBinding.onwheel: {
//   element.onwheel = (event) => {
//     payload.action$.next(strategyBegin(documentObjectModelBindActionStrategy({event}, refreshAction(payload.binding.action))));
//   };
//   break;
// }
// default: {
//   break;
// }
// }
