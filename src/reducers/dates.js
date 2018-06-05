import moment from 'moment';

const INITIAL_STATE = {
  startDate: '1970-01-01',
  endDate: moment().format('YYYY-MM-DD')
};

export function setDate(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    case "SET_BOTH_DATES":
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate
      }
    default:
      return state;
  }
};
