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
  strategySuccess,
} from 'stratimux';
import { Binding } from '../../../model/userInterface';
import { Subject } from 'rxjs';
import { elementEventBinding } from '../../../model/html';

export type DocumentObjectModelBindPayload = {
  action$: Subject<Action>;
  id: string;
  binding: Binding;
};
export const documentObjectModelBindType: ActionType = 'Document Object Model bind element';
export const documentObjectModelBind = prepareActionWithPayloadCreator<DocumentObjectModelBindPayload>(documentObjectModelBindType);

const createDocumentObjectModelBindCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectPayload<DocumentObjectModelBindPayload>(action);
    const element = document.getElementById(payload.id);
    if (element) {
      setElementBinding(element, payload);
    }
    if (action.strategy) {
      return strategySuccess(action.strategy);
    } else {
      return action;
    }
  });

export const documentObjectModelBindQuality = createQuality(
  documentObjectModelBindType,
  defaultReducer,
  createDocumentObjectModelBindCreator
);

// eslint-disable-next-line complexity
const setElementBinding = (element: HTMLElement, payload: DocumentObjectModelBindPayload) => {
  const { binding } = payload;
  switch (binding.eventBinding) {
    case elementEventBinding.onabort: {
      element.onabort = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onafterprint: {
      window.onafterprint = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onbeforeprint: {
      window.onbeforeprint = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onblur: {
      element.onblur = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncanplay: {
      element.oncanplay = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncanplaythrough: {
      element.oncanplaythrough = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onchange: {
      element.onchange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onclick: {
      element.onclick = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncontextmenu: {
      element.oncontextmenu = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncopy: {
      element.oncopy = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncuechange: {
      element.oncuechange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oncut: {
      element.oncut = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondblclick: {
      element.ondblclick = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondrag: {
      element.ondrag = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondragend: {
      element.ondragend = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondragenter: {
      element.ondragenter = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondragover: {
      element.ondragover = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondrop: {
      element.ondrop = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ondurationchange: {
      element.ondurationchange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onemptied: {
      element.onemptied = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onended: {
      element.onended = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onerror: {
      element.onerror = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onfocus: {
      element.onfocus = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onhashchange: {
      window.onhashchange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.oninput: {
      element.oninput = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onkeydown: {
      element.onkeydown = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onkeyup: {
      element.onkeyup = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onload: {
      element.onload = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onloadeddata: {
      element.onloadeddata = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onloadedmetadata: {
      element.onloadedmetadata = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onloadstart: {
      element.onloadstart = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onmessage: {
      window.onmessage = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onmousedown: {
      element.onmousedown = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onmouseout: {
      element.onmouseout = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onmouseup: {
      element.onmouseup = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onoffline: {
      window.onoffline = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ononline: {
      window.ononline = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onpagehide: {
      window.onpagehide = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onpageshow: {
      window.onpageshow = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onpaste: {
      element.onpaste = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onpause: {
      element.onpause = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onplaying: {
      element.onplaying = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onpopstate: {
      window.onpopstate = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onprogress: {
      element.onprogress = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onratechange: {
      element.onratechange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onreset: {
      element.onreset = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onresize: {
      window.onresize = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onscroll: {
      element.onscroll = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onseeked: {
      element.onseeked = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onseeking: {
      element.onseeking = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onstalled: {
      element.onstalled = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onsubmit: {
      element.onsubmit = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onsuspend: {
      element.onsuspend = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ontimeupdate: {
      element.ontimeupdate = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.ontoggle: {
      element.ontoggle = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onunload: {
      window.onunload = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onvolumechange: {
      element.onvolumechange = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onwaiting: {
      element.onwaiting = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    case elementEventBinding.onwheel: {
      element.onwheel = () => {
        payload.action$.next(refreshAction(payload.binding.action));
      };
      break;
    }
    default: {
      break;
    }
  }
};
