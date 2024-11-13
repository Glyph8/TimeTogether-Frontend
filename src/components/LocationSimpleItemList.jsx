import React from "react";
import "./LocationSimpleItemList.css";
import LocationSimpleItem from "./LocationSimpleItem";

const LocationSimpleItemList = ({
  locations,
  selectedLocationIds,
  onSelectLocation,
}) => {
  return (
    <ul className="location-list">
      {locations.map((location) => (
        <LocationSimpleItem
          key={location.locationId}
          locationId={location.locationId}
          locationName={location.locationName}
          url={location.locationUrl}
          attendanceCount={4} // 서버에서 받아오는 데이터
          totalMembers={5} // 그룹의 총 인원 수
          isSelected={selectedLocationIds === location.locationId}
          onSelect={() => onSelectLocation(location.locationId)}
        />
      ))}
    </ul>
  );
};

export default LocationSimpleItemList;
