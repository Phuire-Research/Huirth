/*<$
For the graph programming framework Stratimux and the huirth Project, generate a model that would enable all functionality required for the User Interface base concept.
$>*/
/*<#*/
import { createConceptKeyedSelector, select } from 'stratimux';
import { DocumentObjectModelState, documentObjectModelName } from './documentObjectModel.concept';

export const documentObjectModelSelectBindingQue = createConceptKeyedSelector<DocumentObjectModelState>(
  'documentObjectModel',
  'bindingQue'
);
/*#>*/
