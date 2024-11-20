import {useEffect, useState} from "react";
import './TimeGrid.css';
import PropTypes from 'prop-types';

const GroupTimeGrid = ({ days, timeRange, memberCount}) => {
    const [hourCount, setHourCount] = useState(16);
    const [startHour, setStartHour] = useState(9);

    const daySet = daySets(days);
    const dayLabel = dayLabelSet(days);
    const times = timeSet(days);

    const startColor = "#e0e0e0";
    const endColor = "#4e00c9";

    useEffect(() => {
        setHourCount(getTimeRange(timeRange));
        setStartHour(getStartHour(timeRange));
    }, [timeRange]);

    return (
        <div className="time-grid" style={{ backgroundColor: '#f4f4f4' }}>
            <div className="grid-header">
                <div className="time-column"></div>
                {daySet.map((day, index) => (
                    <div key={index} className="day-column">
                        <div className="day-date">{day}</div>
                        <div className="day-label">{dayLabel[index]}</div>
                    </div>
                ))}
            </div>
            <div className="grid-content">
                <GroupTimeScale hourCount={hourCount} startHour={startHour}/>
                <GroupGridCells
                    days = {days} //굳이 days를 통으로 줄 필요가 없는 듯
                    timeSet={times}
                    hourCount={hourCount}
                    daySet = {daySet}
                    groupColorArray = {showGroupColor(startColor, endColor, memberCount)}
                />
            </div>
        </div>
    );
};

const GroupTimeScale = ({ hourCount , startHour }) => {
    const hours = Array.from({ length: hourCount }, (_, i) => i + startHour);

    return (
        <div className="time-scale">
            {hours.map(hour => (
                <div key={hour} className="time-slot">
                    {hour}:00
                </div>
            ))}
        </div>
    );
};

const GroupGridCells = ({ days, hourCount, timeSet, groupColorArray}) => {
    // const [times, setTimes] = useState([]);
    const [times, setTimes] = useState(timeSet);
    const daySet = daySets(days);
    useEffect(() => {
        setTimes(timeSet);
    }, [timeSet]);

    return (
        <div className="grid-cells" style={{
            borderRadius: '5px',
            display: 'grid',
            gridTemplateColumns: `repeat(${daySet.length}, 1fr)`,
            gridAutoFlow: 'column', //세로(시간 순)부터 셀 채우기
            gridTemplateRows: `repeat(${hourCount * 2}, 1fr)`
        }}>

            {Array.from({ length: daySet.length }).map((_, dayIndex) => (
                // 각 날짜마다 세로로 30분 단위 셀 생성
                Array.from({ length: hourCount * 2 }).map((_, hourIndex) => {
                        const cellName = `grid-cell-${daySet[dayIndex]}-${hourIndex}`
                        let cellColor = "#ffffff";
                        const checked = times[dayIndex][hourIndex];
                        if(Number.parseInt(checked) > 0){
                            cellColor = groupColorArray[checked];
                            // cellColor = "#FFC553";
                        }
                        return(
                            <div
                                key={`${dayIndex}-${hourIndex}`}
                                className={cellName}
                                style={{backgroundColor: cellColor, border: '1px dotted #c6c6c6'}}
                                onClick={() => {

                                }}
                            >

                            </div>
                        )
                    }
                )
            ))}
        </div>
    );
};


function showGroupColor(startColor, endColor, memberCount){
    let GroupColorArray = new Array(0);
    const hex = (color) => parseInt(color.slice(1), 16);
    const r1 = (hex(startColor) >> 16) & 0xff;
    const g1 = (hex(startColor) >> 8) & 0xff;
    const b1 = hex(startColor) & 0xff;

    const r2 = (hex(endColor) >> 16) & 0xff;
    const g2 = (hex(endColor) >> 8) & 0xff;
    const b2 = hex(endColor) & 0xff;


    for(let i = 0; i <= memberCount; i++){
        const factor = i / memberCount;

        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));

        GroupColorArray.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);

        //console.log("그룹시간표 컬러",i, GroupColorArray[i]);
    }
    return GroupColorArray;
}

function daySets(daysData) {
    let daySet = new Array(0);
    daysData.map((eachDay) => {
        const month = eachDay.date.split('-').at(1);
        const day = eachDay.date.split('-').at(2);
        daySet.push(`${month}/${day}`);
    })

    return daySet;
}

function dayLabelSet(daysData) {
    let dayLabels = new Array(0);
    daysData.map((eachDay) => {
        dayLabels.push(eachDay.day);
    })
    return dayLabels;
}

function timeSet(daysData) {
    let times = new Array(0);
    daysData.map((eachDay) => {
        times.push(eachDay.time);
    })
    return times;
}

function getTimeRange(timeRange) {
    const startHour = Number.parseInt(timeRange.slice(0, 4));
    const endHour = Number.parseInt(timeRange.slice(4));
    const hourRange = endHour - startHour;
    return (hourRange / 100);
}

function getStartHour(timeRange) {
    const startHour = Number.parseInt(timeRange.slice(0, 4));
    return (startHour / 100);
}

GroupTimeGrid.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};
GroupGridCells.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GroupTimeGrid;