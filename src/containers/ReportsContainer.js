import React from "react";
import CardList from '../components/CardList';
import ActivitiesList from '../components/ActivitiesList';

const ReportsContainer = () => {
  return (
    <div>
      <div>Reports</div>
      <CardList />
      <div className="activity-log">
        <ActivitiesList />
      </div>
    </div>
  );
}

export default ReportsContainer;
