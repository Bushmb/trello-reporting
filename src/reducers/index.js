import { combineReducers } from "redux";
import { items, itemsHaveError, itemsAreLoading } from "./items";
import { activities, activitiesHaveError, activitiesAreLoading } from "./activities";
import { setDate } from './dates';

export default combineReducers({
  items,
  itemsHaveError,
  itemsAreLoading,
  activities,
  activitiesHaveError,
  activitiesAreLoading,
  setDate
});
