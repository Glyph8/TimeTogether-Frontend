import React from "react";
import "./LocationSimpleItemList.css";
import LocationSimpleItem from "./LocationSimpleItem";

const LocationSimpleItemList = ({
  locations,
  selectedLocationIds,
  onSelectLocation,
  totalNumber,
}) => {
  return (
    <ul className="location-list">
      {locations.map((location) => (
        <LocationSimpleItem
          key={location.groupWhereId}
          locationId={location.groupWhereId}
          locationName={location.groupLocationName}
          url={location.groupWhereUrl}
          attendanceCount={location.count} // 서버에서 받아오는 데이터
          totalMembers={totalNumber} // 그룹의 총 인원 수
          isSelected={selectedLocationIds === location.locationId}
          onSelect={() => onSelectLocation(location.locationId)}
        />
      ))}
    </ul>
  );
};

export default LocationSimpleItemList;
