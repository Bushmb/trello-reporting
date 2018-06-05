import moment from 'moment';

const INITIAL_STATE = {
  startDate: '1970-01-01',
  endDate: moment().format('YYYY-MM-DD'),
  displayDate: 'All Time'
};

export function setDate(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
        displayDate: `${action.startDate} to Current`
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
        displayDate: `Start to ${action.endDate}`
      };
    case "SET_BOTH_DATES":
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
        displayDate: `${action.startDate} to ${action.endDate}`
      }
    default:
      return state;
  }
};
