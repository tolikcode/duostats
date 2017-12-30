import { SetMyUsernameAction } from './setMyUsername';
import { RequestLearningChartAction, ReceiveLearningChartAction } from './prepareLearningChart';
import { SaveUserAction } from './saveUser';

export type ActionTypes =
  | SetMyUsernameAction
  | RequestLearningChartAction
  | ReceiveLearningChartAction
  | SaveUserAction;
