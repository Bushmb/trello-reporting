// SET_START_DATE
const SET_START_DATE = 'SET_START_DATE';
export const setStartDate = startDate => ({
  type: SET_START_DATE,
  startDate
});

// SET_END_DATE
const SET_END_DATE = 'SET_END_DATE';
export const setEndDate = endDate => ({
  type: SET_END_DATE,
  endDate
});

// SET_BOTH_DATES
const SET_BOTH_DATES = 'SET_BOTH_DATES';
export const setBothDates = (startDate, endDate) => ({
  type: SET_BOTH_DATES,
  startDate,
  endDate
})


