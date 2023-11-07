const GOAL = '--goal';
const PORT = '--port';

// eslint-disable-next-line no-shadow
export enum commandLineInterfaceGoals {
  simulate = 'simulate',
  staticDeployment = 'staticDeployment',
  dynamicDeployment = 'dynamicDeployment',
  none = 'none'
}

export const commandLineInterfaceDetermineGoal = (args: string[]): commandLineInterfaceGoals => {
  let start = false;
  console.log('CHECK ARGS', args);
  for (const arg of args) {
    if (!start && arg === GOAL) {
      start = true;
    } else if (start && arg.indexOf('--') === -1) {
      // console.log('Checked arg', arg);
      switch (arg) {
      case commandLineInterfaceGoals.simulate: {
        return commandLineInterfaceGoals.simulate;
      }
      case commandLineInterfaceGoals.staticDeployment: {
        return commandLineInterfaceGoals.staticDeployment;
      }
      case commandLineInterfaceGoals.dynamicDeployment: {
        return commandLineInterfaceGoals.dynamicDeployment;
      }
      default: {
        return commandLineInterfaceGoals.none;
      }
      }
    }
  }
  return commandLineInterfaceGoals.none;
};

export const commandLineInterfaceDeterminePort = (args: string[]): number => {
  let start = false;
  for (const arg of args) {
    if (!start && arg === PORT) {
      start = true;
    } else if (start && arg.indexOf('--') === -1) {
      const possiblePort = Number(arg);
      if (!Number.isNaN(possiblePort)) {
        return 8080;
      } else {
        return possiblePort;
      }
    }
  }
  return 8080;
};