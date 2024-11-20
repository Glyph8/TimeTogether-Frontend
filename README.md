
# 할 일

## 요청 부분 준비

# /group/{groupId}/meet
- [X] 처음 그룹 선택했을 때 request
- [x] 회의 목록 response
{"groupId" : "101"}

# /group/{groupId}/meet/{title}/add
- [X] 날짜 7일 선택, 제목 입력 후 request로 전달
- [X] response 성공/실패만. 빈 시간표 프론트
{"groupId" : "101",
"title": "산협핑",
"dates": ["2024-11-13","2024-11-14","2024-11-15"] }

# /group/{groupId}/when/{title}/{type}
{"groupId" : "101","type": "offline","title": "산협프"}

# /group/{groupId}/when/{title}/{type}
{"groupId" : "101","type": "offline"}

# /group/{groupId}/when/{title}/{type}/load
{"groupId" : "101","type" : "online","title": "밴드 회식"}

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
]
}
# /group/{groupId}/when/{title}/{type}/done
{"groupId" : "101","title": "우테코","meetDT":"2024-10-09 14:30:00"}


## 저장하기로 전송하는 시간표 내용 점검
## 캘린더 불러오기 버튼 요청 준비

## 최종 결정하기 부분 UI

## 추천된 시간목록 출력부분 UI



## colorbar, 그룹시간표 색상 차이 문제

## 드래그해서 시간 조정

## 그룹 시간표 셀 별 그룹원 조회

## 그룹 메뉴 우측상단 그룹원 조회/나가기/강퇴 버튼 설정
