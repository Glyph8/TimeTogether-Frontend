# 할 일

## where2meet done따라 when2meet done 활성화 조건걸기

## 그룹 우상단 메뉴 클릭시 그룹원 관리메뉴(그룹장 여부따라 다른 표기)

## 캘린더 로드 시 형식 예상할것. 그룹시간표 merge 하듯 각각 다른 사람들 내용처럼 반복해서 들어올 것

## 시간표 데이터 받아서 출력하는 부분 점검

## 저장하기 버튼 상태 조정하기

## 세팅된 내 시간표 여부 따라 내 시간표 추가하기 / 수정하기 변경

## 연결 대비 연결요청부분과 더미 간단 스왑가능하게 == 변수명만 좀 바꾸면 될듯?
## colorbar, 그룹시간표 색상 차이 문제
## 연결 대비해서 ip 상수화


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

