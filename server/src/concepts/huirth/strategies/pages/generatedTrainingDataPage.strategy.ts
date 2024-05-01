/*<$
For the graph programming framework Stratimux and a Concept huirth, generate a Page Strategy Creator that will unify Sidebar, DataSet, Footer, and Header Action Strategy Component Stitches into a Page Composition.
$>*/
/*<#*/
import { createActionNode, createStrategy } from 'stratimux';
import {
  ActionStrategyComponentStitch,
  PageStrategyCreators,
  userInterface,
  userInterface_createPage
} from '../../../../model/userInterface';
import { userInterfaceCreatePageStrategy } from '../../../userInterface/strategies.ts/createPage.strategy';
import { huirthFooterStitch } from '../components/footer.strategy';
import { huirthHeaderStitch } from '../components/header.strategy';
import { huirthSidebarComponentStitch } from '../components/sidebar.strategy';
import { huirthDataSetEnd } from '../../qualities/components/dataSet/dataSetEnd.quality';
import { huirthDataSetContent } from '../../qualities/components/dataSet/dataSetContent.quality';
import { huirthDataSetBegin } from '../../qualities/components/dataSet/dataSetBegin.quality';

export const huirthGeneratedTrainingDataPageStrategy = (pageTitle: string): PageStrategyCreators => {
  const title = pageTitle;
  return () => () => {
    const pageData = userInterface_createPage({
      title,
      conceptAndProps: [],
      cachedSelectors: [],
      compositions: [],
      cachedComponentSelectors: []
    });

    return userInterfaceCreatePageStrategy(
      title,
      pageData,
      [
        huirthSidebarComponentStitch,
        huirthGeneratedTrainingDataStrategyStitch,
        huirthFooterStitch
      ],
      huirthHeaderStitch
    );
  };
};

export const huirthGeneratedTrainingDataStrategyStitchTopic = 'huirth Generated Training Data Strategy Component Stitch';
export const huirthGeneratedTrainingDataStrategyStitch: ActionStrategyComponentStitch = (payload) => {
  const stephuirthDataSetEnd = userInterface.createComponent(huirthDataSetEnd(payload));
  const stephuirthDataManagerContent = userInterface.createComponent(huirthDataSetContent(payload), stephuirthDataSetEnd);
  const stephuirthDataSetBegin = userInterface.createComponent(huirthDataSetBegin(payload), stephuirthDataManagerContent);
  return [
    stephuirthDataSetEnd,
    createStrategy({
      topic: `huirth Generated ${payload.pageTitle} Training Data Strategy Stitch`,
      initialNode: stephuirthDataSetBegin,
    })
  ];
};
/*#>*/