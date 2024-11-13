import TimeGrid from '././TimeGrid.jsx';
import {useEffect, useState} from "react";

const PersonalTimetable = ({days, timeRange}) => {
    const [saveBtn, setAddSaveBtn] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    const [newDays, setNewDays] = useState(days);//기존 days에서 개인이 변경한 값이 반영된 days

    useEffect(() => {

    }, []);

    return (
        <div className="personal-timetable">
            <div className="personal-timetable-header">
                <h3 className="section-title">내 시간표</h3>
            </div>
            <TimeGrid days={days} timeRange={timeRange} isEditable={isEditable}/>
            {
                saveBtn ? <div className="calender-priority-btn">
                    <button className="load-calender-btn">캘린더 불러오기</button>
                    <button className="select-priority">우선순위 선택하기</button>
                </div> : null
            }

            <button className="add-personal-timeBtn" onClick={()=>{
                if(!saveBtn){//'내 시간표 추가하기' 누른 경우
                    setIsEditable(true); //클릭해서 시간표 수정 가능해짐.
                }
                else {
                    setIsEditable(false);//저장하기 누른 경우
                    //바뀐 내용을 내보내야함.
                }
                setAddSaveBtn(!saveBtn);
            }}>{
                saveBtn ? <p className="save-btn">저장하기</p> : (
                    <p>내 시간표 추가하기</p>
                )
            }</button>
        </div>
    );
};


export default PersonalTimetable;