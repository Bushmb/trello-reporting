export function convertReportData(data) {

  const statusMap = {
    activeMemberCount: 'Members',
    licensedMemberCount: 'Licensed Users',
    inactiveMemberCount: 'Inactive Users',
    deletedBoardCount: 'Deleted Boards',
    activeBoardCount: 'Active Boards',
    archivedBoardCount: 'Archived Boards'
  }

  const items = Object.entries(data).map(([key, value]) => ({
    key,
    value,
    name: statusMap[key]
  }))
  
  return items
  
}


export function convertActivitiesData(data) {

  const activities = [
    { key: "Comments", name: "Comments", value: data.actionCounts.commentCard },
    { key: "Cards Created", name: "Cards Created", value: data.actionCounts.createCard },
    { key: "Cards Moved", name: "Cards Moved", value: 0 },
    { key: "Cards Duplicated", name: "Cards Duplicated", value: data.actionCounts.copyCard },
    { key: "Cards Archived", name: "Cards Archived", value: 0 },
    { key: "Cards Deleted", name: "Cards Deleted", value: data.actionCounts.deleteCard },
    { key: "Lists Created", name: "Lists Created", value: data.actionCounts.createList },
    { key: "Lists Moved", name: "Lists Moved", value: parseInt(data.actionCounts.moveListFromBoard, 10) + parseInt(data.actionCounts.moveListToBoard, 10)},
    { key: "Lists Duplicated", name: "Lists Duplicated", value: 0 },
    { key: "Lists Archived", name: "Lists Archived", value: 0 },
    { key: "Lists Deleted", name: "Lists Deleted", value: 0 },
    { key: "Unique Labels", name: "Unique Labels", value: 0 }
  ]
  
  return activities;
}