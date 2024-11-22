
# 할 일

## 요청 부분 준비

# /group/{groupId}/meet
- [X] 처음 그룹 선택했을 때 request
- [x] 회의 목록 response
{"groupId" : "101"}

- Test1 : MeetingsPage useEffect의 whenDataResponse2 이름 변경 ::성공 이력O

# /group/{groupId}/meet/{title}/add
- [X] 날짜 7일 선택, 제목 입력 후 request로 전달 CreateNewMeet의 버튼 onclick
- [X] response 성공/실패만. 빈 시간표 프론트? 일단 회의 리스트로 돌아가기
{"groupId" : "101",
"title": "산협핑",
"dates": ["2024-11-13","2024-11-14","2024-11-15"] }
회의 리스트로 이동 -> 결정 중인 회의가 리스트에 추가됨.
- Test2 : 바로 테스트 가능 ::성공 이력O

# /group/{groupId}/when/{title}/{type} 회의 선택 시 반환.
- [x] MeetingScheduleItem.jsx 클릭이벤트에서 request
- [ ] TimeTableContent에서 response를 state로 받고, navigate.
{"groupId" : "101","type": "offline","title": "산협프"}

Q. 내 더미데이터로도 가능한지? Test2에 입력한 내용이어야하나?
- Test3 : Test1의 내용 복귀시켜서 기존 더미데이터 출력 -> 더미 회의리스트 클릭

# /group/{groupId}/when/{title}/{type}
{"groupId" : "101","type": "offline"}
- Test4 : Test3에 이어 출력된 시간 표 중 내 시간표 추가 클릭 바로 테스트 가능
url값 가져오기 기능 추가가 필요

# /group/{groupId}/when/{title}/{type}/load
{"groupId" : "101","type" : "online","title": "밴드 회식"}
- Test5 : Test4에 이어 내 시간표 추가 후, 캘린더 불러오기 클릭, 바로 테스트 가능

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

- Test6 : 내 시간표 수정 후, 저장하기 클릭
- 
# /group/{groupId}/when/{title}/{type}/done
{"groupId" : "101","title": "우테코","meetDT":"2024-10-09 14:30:00"}

- Test7 : 결정 UI 만들고, 버튼 클릭


## 저장하기로 전송하는 시간표 내용 점검

## 저장하기 후, 다시 해당 회의로 들어오면 == 개인 시간표 정보 있으면 바로 load가 아니라 [내 시간표 수정하기] 버튼클릭으로 출력하도록

## 저장하기 눌러서 회색 -> 다시 시간표 클릭해서 변동되면 캘린더 버튼 색 회색, 저장하기 색 보라 되도록 할것

## colorbar, 그룹시간표 색상 차이 문제

## 드래그해서 시간 조정

## 그룹 시간표 셀 별 그룹원 조회

## 그룹 메뉴 우측상단 그룹원 조회/나가기/강퇴 버튼 설정
