# 할 일

## 온라인 미팅으로 변경한 경우 어디서 탭 클릭 못하게

## 

## 사용자의 UserName은 어디서 불러오는가? -> when type 요청으로 받아올 때, 사용자 이름 받아오게

## timetableDTO 적용된 부분 확실히

## when 요청 update 전송데이터 배열에 date time rank 담아서

## 연결 대비 연결요청부분과 더미 간단 스왑가능하게 == 변수명만 좀 바꾸면 될듯?

## 연결 대비해서 ip 상수화

## 결정된 회의를 캘린더에 등록되었을 때, 시간값이 디폴트에서 안바뀐듯?


- dummy table 통일
- "2024-11-13",
  "2024-11-14",
  "2024-11-15"
- grouptimes 0700 1200


login, oauth ip주소 설정


## 요청 부분 준비

# /group/{groupId}/meet
- [X] 처음 그룹 선택했을 때 request
- [x] 회의 목록 response
  {"groupId" : "101"}

- Test1 : MeetingListPage useEffect의 whenDataResponse2 이름 변경 ::성공 이력O

# /group/{groupId}/meet/{title}/add
- [X] 날짜 7일 선택, 제목 입력 후 request로 전달 CreateNewMeet의 버튼 onclick
- [X] response 성공/실패만. 빈 시간표 프론트? 일단 회의 리스트로 돌아가기
  {"groupId" : "101",
  "title": "산협핑",
  "dates": ["2024-11-13","2024-11-14","2024-11-15"] }
  회의 리스트로 이동 -> 결정 중인 회의가 리스트에 추가됨.
- Test2 : 바로 테스트 가능 ::성공 이력O CreateNewMeet.jsx의 버튼 onclick

# /group/{groupId}/when/{title}/{type} 회의 선택 시 반환.
- [x] TimeTableContent.jsx useEffect에서 request
- [ ] TimeTableContent에서 response를 받아서 GroupTimetable, PersonalTimetable, GroupCellModal로 각각 전달
  {"groupId" : "101","type": "offline","title": "산협프"}

Q. 내 더미데이터로도 가능한지? Test2에 입력한 내용이어야하나?
- Test3 : MeetingListPage의 Test1의 내용 복귀시켜서 기존 더미데이터 출력 -> 
- TimeTableContent의 useEffect 주석해제
- 더미 회의리스트 목록 중 Test2에 기입한 내용으로 title : test 클릭


# /group/{groupId}/when/{title}/add
{"groupId" : "101","type": "offline"}
- Test4 : Test3에 이어 출력된 시간 표 중 내 시간표 추가 클릭 바로 테스트 가능
  url값 가져오기 기능 추가가 필요

-> response로 빈 시간표 받기?? 이 부분 상의가
지금은 그룹시간표 중 자신의 이름 시간표를 불러와서 출력하고, 없으면 빈 시간표를 프론트에서 만듬
이 방법이 사용되려면 meeting title add로 만든 시간표가 빈 시간표이면 OK

그리고 내가 저장하기를 누르면 내 이름 + 내가 만든 시간표 정보가 전송되고, 저장,
해당 미팅의 시간표 정보에 추가되어야함

-> 지금은 빈 시간표를 내 시간표 추가하기로 돌려받음.
마찬가지의 작용인지?


# /group/{groupId}/when/{title}/{type}/load
{"groupId" : "101","type" : "online","title": "밴드 회식"}
- Test5 : Test4에 이어 내 시간표 추가 후, 캘린더 불러오기 주석 해제 후 클릭

# /group/{groupId}/when/{title}/{type}/update
{"message": "요청에 성공했습니다.","httpStatus": "OK","groupId": "101","type": "online",
"days":[{
"date":"2024-10-09",
"day":"수요일",
"time":"00001110", //15분 단위이므로 2시간일때 8개
"rank":"00001210"
},
{
"date":"2024-10-10",
"day":"목요일",
"time":"11100000",
"rank":"13100000"
},
{
"date":"2024-10-11",
"day":"금요일",
"time":"00110000",
"rank":"00130000"
}
]}

- Test6 : 내 시간표 수정 후, 저장하기 클릭 바로 가능
-
# /group/{groupId}/when/{title}/{type}/done
{"groupId" : "101","title": "우테코","meetDT":"2024-10-09 14:30:00"}

- Test7 : 버튼 클릭 바로 가능

