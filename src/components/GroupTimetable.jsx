import TimeGrid from '././TimeGrid.jsx';
import {useState} from "react";
import ColorBar from "./ColorBar.jsx";

const GroupTimetable = ({days, timeRange}) => {

    // const days = ['10/7', '10/8', '10/9', '10/10', '10/11', '10/12', '10/13'];
    // const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
    const [members, setMembers] = useState(5);
    const memberCount = members;
    const [onOffline, setOnOffline] = useState("오프라인");

    return (
        <div className="group-timetable">
            <div className="group-timetable-header">
                <div className="on-offline">{onOffline}</div>
                <h3 className="section-title">그룹 시간표</h3>
                <p className="section-description">
                    시간을 클릭하면 누가 체크했는지 볼 수 있어요.
                </p>
                <div className="color-bar-out-container">
                    <div className="color-bar-container">
                        <span className="color-bar-text">0/{members}</span>
                        <ColorBar memberCount={memberCount}></ColorBar>
                        <span className="color-bar-text">{members}/{members}</span>
                    </div>
                </div>
            </div>

            <TimeGrid days={days} timeRange={timeRange}/>
        </div>
    );
};


export default GroupTimetable;