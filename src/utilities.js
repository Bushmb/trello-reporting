const convertReportCards = (data) => {
  const statusMap = {
    activeMemberCount: 'Members',
    licensedMemberCount: 'Licensed Members',
    inactiveMemberCount: 'Inactive Member',
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
  console.log(items);
}