import {useEffect, useState} from "react";
import './TimeGrid.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {updatePersonalTimeData, updateRankOnly, updateTimeOnly} from "../store.js";

const TimeGrid = ({days, timeRange, selectedPriority, setEdited}) => {
    const [hourCount, setHourCount] = useState(16);
    const [startHour, setStartHour] = useState(9);
    const [endHour, setEndHour] = useState(24);

    const daySet = daySets(days);
    const dayLabel = dayLabelSet(days);
    const times = timeSet(days);
    const ranks = rankSet(days);

    useEffect(() => {
        setHourCount(getTimeRange(timeRange));
        setStartHour(getStartHour(timeRange));
        setEndHour(getEndHour(timeRange));
    }, [days, timeRange]);

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
                <TimeScale hourCount={hourCount} startHour={startHour} endHour={endHour}/>
                <GridCells
                    days={days} //굳이 days를 통으로 줄 필요가 없는 듯
                    timeSet={times}
                    rankSet={ranks}
                    hourCount={hourCount}
                    selectedPriority={selectedPriority}
                    setEdited={setEdited}
                    startHour={startHour}
                    endHour={endHour}
                />
            </div>
        </div>
    );
};

const TimeScale = ({hourCount, startHour, endHour}) => {
    // const hours = Array.from({length: hourCount}, (_, i) => i + startHour);
    //
    // return (
    //     <div className="time-scale">
    //         {hours.map(hour => (
    //             <div key={hour} className="time-slot">
    //                 {hour}
    //             </div>
    //         ))}
    //     </div>
    // );
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

    console.log('hours', hours)

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
                //         <div key={hour} className="time-slot">
                //     {hour.toString().length < 4 ? hour + ':00' : hour}
                //     {/*{hour}:00*/}
                // </div>
            )
            }

        </div>
    )
        ;
};

const GridCells = ({days, startHour, endHour, hourCount, timeSet, rankSet, selectedPriority, setEdited}) => {
    // const [times, setTimes] = useState([]);
    const [times, setTimes] = useState(timeSet);
    const [ranks, setRanks] = useState(rankSet);
    const daySet = daySets(days);

    let personalTimeData = useSelector((state) => state.personalTimeData);
    let dispatch = useDispatch();

    // useEffect(() => {
    //     //setTimes(timeSet);
    //     //setRanks(rankSet)
    // }, [days, rankSet, timeSet]);


    useEffect(() => {
        const newTimeSet = new Array(0);
        days.map((eachDay) => {
            newTimeSet.push(eachDay.time);
        })
        const newRankSet = new Array(0);
        days.map((eachDay) => {
            newRankSet.push(eachDay.rank);
        })

        setTimes(newTimeSet)
        setRanks(newRankSet)
    }, [days]);


    const [isDragging, setIsDragging] = useState(false); // 드래그 상태
    const [checkingRule, setCheckingRule] = useState(true);

    const handleCellClickOne = (dayIndex, hourIndex) => {
        setEdited(true);
        let newTimes = [...times];
        let newRanks = [...ranks];
        if (newTimes[dayIndex][hourIndex === '1']) {
            newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '0' + newTimes[dayIndex].substring(hourIndex + 1);
            newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + '0' + newRanks[dayIndex].substring(hourIndex + 1);
        } else {//false면 check
            newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '1' + newTimes[dayIndex].substring(hourIndex + 1);
            newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + selectedPriority + newRanks[dayIndex].substring(hourIndex + 1);
        }
        setTimes(newTimes);
        setRanks(newRanks);

        dispatch(updateTimeOnly(newTimes));
        dispatch(updateRankOnly(newRanks));
    };

    const handleCellClick = (dayIndex, hourIndex) => {
        setEdited(true);
        let newTimes = [...times];
        let newRanks = [...ranks];
        if (checkingRule) {//true면 uncheck
            newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '0' + newTimes[dayIndex].substring(hourIndex + 1);
            newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + '0' + newRanks[dayIndex].substring(hourIndex + 1);
        } else {//false면 check
            newTimes[dayIndex] = newTimes[dayIndex].substring(0, hourIndex) + '1' + newTimes[dayIndex].substring(hourIndex + 1);
            newRanks[dayIndex] = newRanks[dayIndex].substring(0, hourIndex) + selectedPriority + newRanks[dayIndex].substring(hourIndex + 1);
        }
        setTimes(newTimes);
        setRanks(newRanks);

        dispatch(updateTimeOnly(newTimes));
        dispatch(updateRankOnly(newRanks));
    };
    const handleMouseDown = (dayIndex, hourIndex) => {
        setIsDragging(true);
        if (times[dayIndex][hourIndex] === '1') {
            setCheckingRule(true);
        } else {
            setCheckingRule(false);
        }
        handleCellClick(dayIndex, hourIndex);
    };
    const handleMouseEnter = (dayIndex, hourIndex) => {
        if (isDragging) {
            handleCellClick(dayIndex, hourIndex);
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
        setCheckingRule(!checkingRule);
    }


    // let hourCellCount = (hourCount * 2);
    let hourCellCount = Math.floor(endHour - startHour) * 2;

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
            // gridTemplateRows: `repeat(${hourCount * 2}, 1fr)`
        }} onMouseUp={handleMouseUp}>

            {Array.from({length: daySet.length}).map((_, dayIndex) => (
                // 각 날짜마다 세로로 30분 단위 셀 생성
                Array.from({length: hourCellCount}).map((_, hourIndex) => {
                // Array.from({length: hourCount * 2}).map((_, hourIndex) => {
                        const cellName = `grid-cell-${daySet[dayIndex]}-${hourIndex}`
                        let cellColor = "#ffffff";
                        const checked = times[dayIndex][hourIndex];
                        const rank = ranks[dayIndex][hourIndex];
                        if (checked === "1" && rank === "0") {
                            cellColor = "#FFC553";
                        }
                        if (checked === "1" && rank === "1") {
                            cellColor = "#FEA666";
                        }
                        if (checked === "1" && rank === "2") {
                            cellColor = "#FDBAAB";
                        }

                        return (
                            <div
                                key={`${dayIndex}-${hourIndex}`}
                                className={cellName}
                                style={{backgroundColor: cellColor, border: '1px dotted #c6c6c6'}}
                                onClick={()=> handleCellClickOne(dayIndex, hourIndex)}
                                onMouseDown={() => handleMouseDown(dayIndex, hourIndex)} // 드래그 시작
                                onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)} // 드래그 중
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

function getEndHour(timeRange) {
    const endHour = Number.parseInt(timeRange.slice(4, 8));
    console.log('getendHour', endHour)
    console.log('getendHour', endHour / 100)
    return (endHour / 100);
}

TimeGrid.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};
GridCells.propTypes = {
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TimeGrid;