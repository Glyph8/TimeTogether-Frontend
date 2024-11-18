import {useEffect, useState} from "react";
import './TimeGrid.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {updatePersonalTimeData, updateTimeOnly} from "../store.js";

const TimeGrid = ({ days, timeRange, selectedPriority}) => {
    const [hourCount, setHourCount] = useState(16);
    const [startHour, setStartHour] = useState(9);
    const daySet = daySets(days);
    const dayLabel = dayLabelSet(days);
    const times = timeSet(days);
    const ranks = rankSet(days);

    useEffect(() => {
        setHourCount(getTimeRange(timeRange));
        setStartHour(getStartHour(timeRange));
    }, [days, timeRange]);

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
                <TimeScale hourCount={hourCount} startHour={startHour}/>
                <GridCells
                    days = {days} //굳이 days를 통으로 줄 필요가 없는 듯
                    timeSet={times}
                    rankSet={ranks}
                    hourCount={hourCount}
                    selectedPriority={selectedPriority}
                />
            </div>
        </div>
    );
};

const TimeScale = ({ hourCount , startHour }) => {
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

const GridCells = ({ days, hourCount, timeSet, rankSet, selectedPriority }) => {
    // const [times, setTimes] = useState([]);
    const [times, setTimes] = useState(timeSet);
    const [ranks, setRanks] = useState(rankSet);
    const daySet = daySets(days);

    let personalTimeData = useSelector((state)=> state.personalTimeData);
    let dispatch = useDispatch();

    useEffect(() => {
        //setTimes(timeSet);
        //setRanks(rankSet)
    }, [days, rankSet, timeSet]);

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
                    const rank = ranks[dayIndex][hourIndex];

                    if(checked === "1" && rank === "0"){
                        cellColor = "#FFC553";
                    }
                    if(checked === "1" && rank === "1"){
                        cellColor = "#FEA666";
                    }
                    if(checked === "1" && rank === "2"){
                        cellColor = "#FDBAAB";
                    }

                    return(
                        <div
                            key={`${dayIndex}-${hourIndex}`}
                            className={cellName}
                            style={{backgroundColor: cellColor, border: '1px dotted #c6c6c6'}}

                            onClick={() => {
                                let newTimes = [...times];
                                let newRanks = [...ranks];
                                console.log("check 여부", checked);
                                console.log("rank 값", rank);

                                if (checked === "1") {
                                    newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '0' + newTimes[dayIndex].substring(hourIndex + 1);
                                    newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + '0' + newRanks[dayIndex].substring(hourIndex + 1);
                                }
                                if (checked === "0") {

                                    newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '1' + newTimes[dayIndex].substring(hourIndex + 1);
                                    newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + selectedPriority + newRanks[dayIndex].substring(hourIndex + 1);
                                }
                                setTimes(newTimes);
                                setRanks(newRanks);
                                // dispatch(updatePersonalTimeData(newTimes));
                                // dispatch(updateTimeOnly(newTimes));
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

function rankSet(daysData) {
    let ranks = new Array(0);
    daysData.map((eachDay) => {
        ranks.push(eachDay.rank);
    })
    return ranks;
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

TimeGrid.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};
GridCells.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TimeGrid;