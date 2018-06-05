export function activitiesHaveError(state = false, action) {
  switch (action.type) {
    case "ACTIVITES_HAVE_ERROR":
      return action.hasError;

    default:
      return state;
  }
}

export function activitiesAreLoading(state = false, action) {
  switch (action.type) {
    case "ACTIVITIES_ARE_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function activities(state = [], action) {
  switch (action.type) {
    case "ACTIVITIES_FETCH_DATA_SUCCESS":
      return action.activities;

    default:
      return state;
  }
}
