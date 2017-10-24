import { SetMyUsernameAction } from "./setMyUsername";
import { RequestUserAction, ReceiveUserAction } from "./fetchUser";

export type ActionTypes =
    | SetMyUsernameAction
    | RequestUserAction
    | ReceiveUserAction;