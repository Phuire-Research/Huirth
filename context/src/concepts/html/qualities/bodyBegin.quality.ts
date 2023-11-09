/* eslint-disable max-len */
import {
  ActionType,
  MethodCreator,
  createMethod,
  createQuality,
  defaultReducer,
  prepareActionWithPayloadCreator,
  selectPayload,
  strategySuccess,
} from 'stratimux';

import { createPageId, userInterface_appendCompositionToPage } from '../../../model/userInterface';

export type HtmlBodyBeginPayload = { pageName: string };
export const htmlBodyBeginType: ActionType = 'Html create Body Begin';
export const htmlBodyBegin = prepareActionWithPayloadCreator<HtmlBodyBeginPayload>(htmlBodyBeginType);

const createHtmlBodyMethodCreator: MethodCreator = () =>
  createMethod((action) => {
    const payload = selectPayload<HtmlBodyBeginPayload>(action);
    if (action.strategy) {
      return strategySuccess(
        action.strategy,
        userInterface_appendCompositionToPage(action.strategy, {
          id: '',
          boundSelectors: [],
          action: htmlBodyBegin(payload),
          html: /*html*/ `
  <body id="${createPageId(payload.pageName)}">
    `,
        })
      );
    }
    return action;
  });

export const htmlBodyBeginQuality = createQuality(htmlBodyBeginType, defaultReducer, createHtmlBodyMethodCreator);
