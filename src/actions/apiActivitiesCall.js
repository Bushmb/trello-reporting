import { convertActivitiesData } from "../utils/convertData";

const ACTIVITIES_HAVE_ERROR = 'ACTIVITIES_HAVE_ERROR';
export function activitiesHaveError(bool) {
  return {
    type: ACTIVITIES_HAVE_ERROR,
    hasError: bool
  };
}

const ACTIVITIES_ARE_LOADING = 'ACTIVITIES_ARE_LOADING';
export function activitiesAreLoading(bool) {
  return {
    type: ACTIVITIES_ARE_LOADING,
    isLoading: bool
  };
}

const ACTIVITIES_FETCH_DATA_SUCCESS = 'ACTIVITIES_FETCH_DATA_SUCCESS';
export function activitiesFetchDataSuccess(activities) {
  return {
    type: ACTIVITIES_FETCH_DATA_SUCCESS,
    activities
  };
}

export function activitiesFetchData() {
  
  return (dispatch, getState) => {

    dispatch(activitiesAreLoading(true));

    const startDate = getState().setDate.startDate;
    const endDate = getState().setDate.endDate;

    const url = `https://www.gcumedia.com/sample-data/api/reporting/actionCounts/start/${startDate}/end/${endDate}`;

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(activitiesAreLoading(false));

        return response;
      })
      .then(res => res.json())
      .then(result => {
        const formattedResult = convertActivitiesData(result);
        dispatch(activitiesFetchDataSuccess(formattedResult));
      })
      .catch(() => dispatch(activitiesHaveError(true)));
  };
}
