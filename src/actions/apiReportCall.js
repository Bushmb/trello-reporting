import { convertReportData } from '../utils/convertData';

const ITEMS_HAVE_ERROR = 'ITEMS_HAVE_ERROR';
export function itemsHaveError(bool) {
    return {
        type: ITEMS_HAVE_ERROR,
        hasError: bool
    };
}

const ITEMS_ARE_LOADING = 'ITEMS_ARE_LOADING';
export function itemsAreLoading(bool) {
    return {
        type: ITEMS_ARE_LOADING,
        isLoading: bool
    };
}

const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData() {

    return (dispatch, getState) => {

        const startDate = getState().setDate.startDate;
        const endDate = getState().setDate.endDate;

        const url = `https://www.gcumedia.com/sample-data/api/reporting/activeMemberCount-licensedMemberCount-inactiveMemberCount-deletedBoardCount-activeBoardCount-archivedBoardCount/start/${startDate}/end/${endDate}`;

        dispatch(itemsAreLoading(true));

        fetch(url)
          .then((response) => {
              if (response.status !== 200) {
                  throw Error(response.statusText);
              }

              dispatch(itemsAreLoading(false));

              return response;
          })
          .then((res) => (res.json()))
          .then((result) => {
            const formattedResult = convertReportData(result);
            dispatch(itemsFetchDataSuccess(formattedResult))
          })
          .catch(() => dispatch(itemsHaveError(true)));
    };
}