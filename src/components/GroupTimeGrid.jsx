import {useEffect, useState} from "react";
import './TimeGrid.css';
import PropTypes from 'prop-types';
import GroupCellModal from "./GroupCellModal.jsx";
import MeetingsPage from "../pages/MeetingsPage.jsx";
import {useDispatch} from "react-redux";
import store, {setChooseDate, setChooseTime, setDayIndexData, setGroupCellModal, setHourIndexData} from "../store.js";

const GroupTimeGrid = ({days, timeRange, memberCount}) => {
    // console.log('groupTimeGrid data props', days);

    const [hourCount, setHourCount] = useState(16);
    const [startHour, setStartHour] = useState(9);
    const [endHour, setEndHour] = useState(24);

    const daySet = daySets(days);
    const dayLabel = dayLabelSet(days);
    let times = timeSet(days);
    // const [times, setTimes] = useState([]);

    const startColor = "#e0e0e0";
    const endColor = "#4e00c9";

    useEffect(() => {
        setHourCount(getTimeRange(timeRange));
        setStartHour(getStartHour(timeRange));
        setEndHour(getEndHour(timeRange));
    }, [timeRange]);

    // useEffect(() => {
    //     times = timeSet(days);
    // }, []);
    //

    return (
        <div className="time-grid" style={{backgroundColor: '#f4f4f4'}}>
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
                <GroupTimeScale hourCount={hourCount} startHour={startHour} endHour={endHour}/>
                {/*{console.log('grid에서는',times)}*/}
                <GroupGridCells
                    days={days} //굳이 days를 통으로 줄 필요가 없는 듯
                    timeSet={times}
                    hourCount={hourCount}
                    daySet={daySet}
                    groupColorArray={showGroupColor(startColor, endColor, memberCount)}
                    startHour={startHour}
                    endHour={endHour}
                />

            </div>
        </div>
    );
};

const GroupTimeScale = ({hourCount, startHour, endHour }) => {
    const hours = [];
    let currentHour = Math.floor(startHour); // 시작 시간의 시간 부분
    let currentMinutes = startHour % 1 === 0.3 ? 30 : 0; // 시작 시간의 분 부분 (30분 단위)

// 반복문: 현재 시간이 끝 시간을 초과하지 않을 때까지 진행
    while (currentHour < endHour ||
    (currentHour === Math.floor(endHour) &&
        currentMinutes <= (endHour % 1 === 0.3 ? 30 : 0))) {
        // 시작 시간의 첫 시간에 대해 30분만 포함
        if ((currentHour === Math.floor(startHour) && currentMinutes === 30) ||
            (currentHour > Math.floor(startHour))) {
            const hourString = currentHour.toString().padStart(2, '0');
            const minuteString = currentMinutes.toString().padStart(2, '0');
            hours.push(`${hourString}:${minuteString}`);
        }

        // 30분 단위로 증가
        currentMinutes += 30;
        if (currentMinutes === 60) {
            currentMinutes = 0;
            currentHour += 1;
        }
    }

    // console.log('hours', hours)

    return (
        <div className="time-scale">
            {hours.map((hour, index) =>
                (
                        (hour.toString().slice(3,4) !== '3' || index === 0 || index === hours.length-1) ? (
                                <div key={hour} className="time-slot-half">
                                    {hour}
                                </div>
                            ) :
                            (
                                <div key={hour} className="time-slot-half">
                                    {/*{hour}*/}
                                </div>
                            )
                )
                )
            }

        </div>
    )
        ;
};

const GroupGridCells = ({days, hourCount, timeSet, groupColorArray, startHour, endHour}) => {
    const [times, setTimes] = useState(timeSet);
    const daySet = daySets(days);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(timeSet).length !== 0)
            setTimes([...timeSet]);
    }, [timeSet]);

    let hourCellCount = (hourCount * 2);

    if (!Number.isInteger(startHour)) {//시작시간이 1시간 단위가 아닌 경우
        hourCellCount += 1;
    }
    if (!Number.isInteger(hourCount)) {//시간구간이 1시간 단위가 아닌 경우
        hourCellCount += 1;
    }

    return (
        <div className="grid-cells" style={{
            borderRadius: '5px',
            display: 'grid',
            gridTemplateColumns: `repeat(${daySet.length}, 1fr)`,
            gridAutoFlow: 'column', //세로(시간 순)부터 셀 채우기
            gridTemplateRows: `repeat(${hourCellCount}, 1fr)`
        }}>

            {
                times.length !== 0 ?
                    (
                        Array.from({length: daySet.length}).map((_, dayIndex) => (
                            // 각 날짜마다 세로로 30분 단위 셀 생성
                            Array.from({length: hourCellCount}).map((_, hourIndex) => {
                            // Array.from({length: hourCount * 2}).map((_, hourIndex) => {
                                    const cellName = `grid-cell-${daySet[dayIndex]}-${hourIndex}`
                                    let cellColor = "#ffffff";
                                    const checked = times[dayIndex][hourIndex];
                                    if (Number.parseInt(checked) > 0) {
                                        cellColor = groupColorArray[Number.parseInt(checked)];
                                        // cellColor = "#FFC553";
                                    }
                                    return (
                                        <div
                                            key={`${dayIndex}-${hourIndex}`}
                                            className={cellName}
                                            style={{backgroundColor: cellColor, border: '1px dotted #c6c6c6'}}
                                            onClick={() => {
                                                console.log('그룹타임그리드 체크드', checked)
                                                // days[dayIndex][hourIndex]

                                                console.log('days', days)

                                                const convertIndexToTimeRange = (index, startHour) => {
                                                    let baseHour = startHour + Math.floor(index / 2); // index를 시간 기준으로 변환
                                                    const startMinute = index % 2 === 0 ? "00" : "30"; // 0: 정각, 1: 30분
                                                    const nextHour = startHour + Math.floor((index + 1) / 2);
                                                    const endMinute = (index + 1) % 2 === 0 ? "00" : "30";

                                                    if (baseHour < 10) {
                                                        return `0${baseHour}:${startMinute}`;
                                                    } else {
                                                        return `${baseHour}:${startMinute}`;
                                                    }
                                                };

                                                dispatch(setChooseDate(days[dayIndex].date));
                                                dispatch(setChooseTime(convertIndexToTimeRange(hourIndex, startHour)));

                                                console.log(store.getState().timeSlots)

                                                //그룹 시간표 셀 클릭 시 해당타임 인원 조회
                                                dispatch(setDayIndexData(dayIndex));
                                                dispatch(setHourIndexData(hourIndex));
                                                dispatch(setGroupCellModal(true));
                                            }}
                                        >
                                        </div>
                                    )
                                }
                            )
                        ))

                    ) : null

            }
        </div>
    );
};


function showGroupColor(startColor, endColor, memberCount) {
    // memberCount += 1;

    // const startColor = "#e0e0e0";
    // const endColor = "#4e00c9";

    let GroupColorArray = new Array(0);
    const hex = (color) => parseInt(color.slice(1), 16);
    const r1 = (hex(startColor) >> 16) & 0xff;
    const g1 = (hex(startColor) >> 8) & 0xff;
    const b1 = hex(startColor) & 0xff;

    const r2 = (hex(endColor) >> 16) & 0xff;
    const g2 = (hex(endColor) >> 8) & 0xff;
    const b2 = hex(endColor) & 0xff;

    for (let i = 0; i <= memberCount; i++) {
        const factor = i / (memberCount);
        // const factor = i / (memberCount - 1);

        // console.log(`factor = ${i} / ${memberCount} - 1 = ${factor}`)

        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));

        GroupColorArray.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);

        // console.log("그룹시간표 컬러",i, GroupColorArray[i]);
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

function getEndHour(timeRange) {
    const endHour = Number.parseInt(timeRange.slice(4, 8));

    return (endHour / 100);
}

GroupTimeGrid.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};
GroupGridCells.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GroupTimeGrid;