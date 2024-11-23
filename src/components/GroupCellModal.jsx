import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setGroupCellModal} from "../store.js";

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9999;`;

const ModalWrap = styled.div`
    width: 280px;
    height: fit-content;
    border-radius: 15px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 40px;
`;

const Title = styled.div`
    text-align: center;
    font-size: 16px;
    font-weight: bold;

    padding: 10px;
`;

const Section = styled.div`
    margin-bottom: 20px;

    & > .header {
        font-size: 14px;
        //font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }

    & > .member-list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > .member {
            //display: flex;
            //align-items: center;
            //text-align: center;
            //justify-content: space-between;
            font-size: 14px;
            font-weight: bold;

            & > .rank {
                font-weight: bold;
                color: #f39c12;
            }
        }
    }
`;

function GroupCellModal({timetableData}) {
    const okMember = ['user1'];
    const notOkMember = ['user2'];

    const dayIndex = useSelector(state => state.dayIndexData);
    const hourIndex = useSelector(state => state.hourIndexData);

    const rowCount = timetableData.users[0].days.length;
    const colCount = timetableData.users[0].days[0].time.length;

    const cellMemberArray
        = Array.from(
        Array(rowCount), () => new Array(colCount).fill(''))

    timetableData.users.map((member, userIndex) => {
        //member.userId 각 user별 이름, 시간표 정보
        const userId = member.userId;
        //member.days
        member.days.map((day, dIndex) => {//한 유저의 days정보 원소 day 가 date,day,time,rank를 가진다.
            for (let h = 0; h < day.time.length; h++) {
                if (day.time[h] === '1') {
                    // cellMemberArray[dIndex][h] += `,${member.userId}|${day.rank[h]}`;
                    cellMemberArray[dIndex][h] += `${member.userId}|${day.rank[h]},`;
                }
            }
        })
    })

    const titleDate = timetableData.users[0].days[dayIndex].date.slice(5, 10);
    const titleWeekDay = timetableData.users[0].days[dayIndex].day.slice(0, 1);
    let startHour = Number.parseInt(timetableData.groupTimes.slice(0, 2));
    let startMin = Number.parseInt(timetableData.groupTimes.slice(2, 4));
    startHour += Math.floor(hourIndex / 2);
    startMin += (hourIndex % 2) * 3;
    if (startMin > 60) {
        startHour += 1;
    }

    const modalTitle = `${titleDate} (${titleWeekDay}) ${startHour.toString()}:${startMin.toString()}0`
    //"1000 2200"
    console.log('modalTitle: ', modalTitle)

    const dispatch = useDispatch();

    // const members = cellMemberArray[dayIndex][hourIndex].split(',');
    //
    // members.map((mem)=>{
    //     const userName = mem.split('|').at(0)
    //     const userRank = mem.split('|').at(1)
    // })

    const members = cellMemberArray[dayIndex][hourIndex]
        .split(",")
        .filter((mem) => mem);

    const okMembers = members.filter(
        (mem) => mem.split("|").at(1) !== undefined
    );
    const notOkMembers = timetableData.users
        .map((member) => member.userId)
        .filter((id) => !okMembers.some((mem) => mem.includes(id)));


    return (
        <Overlay className='overay-group-modal'
                 onClick={() => {
                     dispatch(setGroupCellModal(false));
                 }}>
            <ModalWrap className='modal-wrap-group'>
                <Title>{modalTitle}</Title>
                <div className='ok-notok-list' style={{
                    display:'flex',
                    justifyContent:'center',
                }}>
                <Section>
                    <div className="header">시간 돼요</div>
                    <div className="member-list" style={{alignItems:'center'}}>
                        {okMembers.map((mem, index) => {
                            const [userName, userRank] = mem.split("|");
                            return (
                                <div className="member" key={index} style={{display:'flex'}}>
                                    {userRank !== '0' && <div className="rank" style={{paddingRight: '10px'}}>{userRank}순위</div>}
                                    <div>{userName}</div>
                                </div>
                            );
                        })}
                    </div>
                </Section>

                <Section>
                    <div className="header">시간 안 돼요</div>
                    <div className="member-list">
                        {notOkMembers.map((name, index) => (
                            <div className="member" key={index}>
                                <div>{name}</div>
                            </div>
                        ))}
                    </div>
                </Section>
                </div>
            </ModalWrap>
        </Overlay>
    )
}


export default GroupCellModal;