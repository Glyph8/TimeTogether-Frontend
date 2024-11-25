import TimeGrid from '././TimeGrid.jsx';
import {useEffect, useState} from "react";

const PersonalTimetable = ({days, timeRange, priorityOn, setEdited}) => {
    const [selectedPriority, setSelectedPriority] = useState(2);

    return (
        <div className="personal-timetable">
            <div className="personal-timetable-header">
                <h3 className="section-title">내 시간표</h3>
                <p className="section-description">가능한 시간대를 드래그해서 표시해주세요.</p>
                {priorityOn && (
                    <div className="priority-buttons">
                        {[0, 1, 2].map((priority) => (
                            <div key={priority} className="priority-item">
                                <button
                                    onClick={() => setSelectedPriority(priority)}//우선순위 -1로 0 1 2 처리
                                    className={`priority-button ${selectedPriority === priority ? 'selected' : ''}`}
                                />
                                <span className={`priority-text ${selectedPriority === priority ? 'selected' : ''}`}>
                                    {priority + 1}순위
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <TimeGrid days={days} timeRange={timeRange} selectedPriority={selectedPriority} setEdited={setEdited}/>
        </div>
    );
};


export default PersonalTimetable;


