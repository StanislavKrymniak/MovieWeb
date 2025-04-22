import { createAction,ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { PAGER_ACTION_TYPES } from "./pager.types";

export type SetCurrentPage = ActionWithPayload<PAGER_ACTION_TYPES.SET_CURRENT_PAGE, number>

export const setCurrentPage = (nextCurrentPage:number): SetCurrentPage => 
    createAction(PAGER_ACTION_TYPES.SET_CURRENT_PAGE, nextCurrentPage)