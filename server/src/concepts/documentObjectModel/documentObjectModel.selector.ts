/*<$
For the graph programming framework Stratimux and the huirth Project, generate a model that would enable all functionality required for the User Interface base concept.
$>*/
/*<#*/
import { select } from 'stratimux';
import { DocumentObjectModelState, documentObjectModelName } from './documentObjectModel.concept';

export const documentObjectModelSelectBindingQue = select.createConceptKeyedSelector<DocumentObjectModelState>(documentObjectModelName, 'bindingQue');
/*#>*/