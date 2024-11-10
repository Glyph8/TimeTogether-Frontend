import TimeGrid from '././TimeGrid.jsx';
import {useEffect, useState} from "react";

const PersonalTimetable = ({days, timeRange}) => {
    const [saveBtn, setAddSaveBtn] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div className="personal-timetable">
            <div className="personal-timetable-header">
                <h3 className="section-title">내 시간표</h3>
            </div>
            <TimeGrid days={days} timeRange={timeRange}/>
            {
                saveBtn ? <div className="calender-priority-btn">
                    <button className="load-calender-btn">캘린더 불러오기</button>
                    <button className="select-priority">우선순위 선택하기</button>
                </div> : null
            }

            <button className="add-personal-timeBtn" onClick={()=>{
                setAddSaveBtn(!saveBtn);
            }}>{
                saveBtn ? <p>저장하기</p> : (
                    <p>내 시간표 추가하기</p>
                )
            }</button>
        </div>
    );
};


export default PersonalTimetable;