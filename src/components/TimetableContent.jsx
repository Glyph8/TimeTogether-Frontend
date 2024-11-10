import GroupTimetable from './GroupTimetable.jsx';
import PersonalTimetable from '././PersonalTimetable.jsx';
import './TimetableContent.css';

import {useEffect, useState} from "react";


const TimetableContent = ({activeTab}) => {
    const [days, setDays] = useState([]);
    const [timeRange, setTimeRange] = useState("");

    useEffect(() => {
        const response = {
                code: 200,
                message: "요청에 성공하였습니다.",
                requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                groupTimes: "07002000", //오전 7시 - 오전 9시
                // groupTimes: "07000900", //오전 7시 - 오전 9시
                type: "online",
                days: [
                    {
                        date: "2024-10-09",
                        day: "수요일",
                        time: "00100100010000010000111001010000",
                        rank: "00300000", //0은 시간이 정해지지 않아서 순위가 매겨지지 않았다는 것을 의미
                    },
                    {
                        date: "2024-10-10",
                        day: "목요일",
                        time: "11100011100111110000000000000111",
                        rank: "00000000",
                    },
                    {
                        date: "2024-10-11",
                        day: "금요일",
                        time: "00000001111100011110011111001111",
                        rank: "00000000",
                    },
                ],
            };
            setTimeRange(response.groupTimes);
            setDays(response.days);
    }, []);

    return (
        <div className="timetable-content">
            <GroupTimetable days={days} timeRange={timeRange}/>
            <PersonalTimetable days={days} timeRange={timeRange}/>
        </div>
    );
};


export default TimetableContent;