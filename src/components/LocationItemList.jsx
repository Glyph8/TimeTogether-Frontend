import React from "react";
import LocationItem from "./LocationItem";
import "./LocationItemList.css";

const LocationItemList = ({
  locations,
  selectedLocationIds,
  onSelectLocation,
  onDeleteLocation,
  totalMembers,
}) => {
  return (
    <ul className="location-list">
      {locations.map((location) => (
        <LocationItem
          key={location.groupWhereId}
          locationId={location.groupWhereId}
          locationName={location.groupLocationName}
          url={location.groupWhereUrl}
          attendanceCount={location.count} // 서버에서 받아오는 데이터
          totalMembers={totalMembers} // 그룹의 총 인원 수
          isSelected={selectedLocationIds.includes(location.locationId)}
          onSelect={() => onSelectLocation(location.locationId)}
          onDelete={() => onDeleteLocation(location.locationId)}
        />
      ))}
    </ul>
  );
};

export default LocationItemList;
