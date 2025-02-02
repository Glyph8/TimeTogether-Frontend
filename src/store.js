import {configureStore, createSlice} from "@reduxjs/toolkit";
import personalTimetable from "./components/PersonalTimetable.jsx";

let timeSlots = createSlice({
    name: "timeSlots",
    initialState: [
        {id: 1, label: '1순위', date: '-', time: '-', dataFormat: '-'},
        {id: 2, label: '2순위', date: '-', time: '-',dataFormat: '-'},
        {id: 3, label: '3순위', date: '-', time: '-',dataFormat: '-'},
        {id: 4, label: '선택', data: '-', time: '-', dataFormat: '-'},
    ],

    reducers:{
        setFirstDate(state, action){
            state[0].date = action.payload;
        },
        setFirstTime(state, action){
            state[0].time = action.payload;
        },
        setFirstDataFormat(state, action){
            state[0].dataFormat = action.payload;
        },

        setSecondDate(state, action){
            state[1].date = action.payload;
        },
        setSecondTime(state, action){
            state[1].time = action.payload;
        },
        setSecondDataFormat(state, action){
            state[1].dataFormat = action.payload;
        },

        setThirdDate(state, action){
            state[2].date = action.payload;
        },
        setThirdTime(state, action){
            state[2].time = action.payload;
        },
        setThirdDataFormat(state, action){
            state[2].dataFormat = action.payload;
        },

        setChooseDate(state, action){
            state[3].date = action.payload;
        },
        setChooseTime(state, action){
            state[3].time = action.payload;
        },
        setChooseDataFormat(state, action){
            state[3].dataFormat = action.payload;
        },

    }
})

let groupCellModal = createSlice({
    name: "groupCellModal",
    // initialState: true,
    initialState: false,

    reducers:{
        setGroupCellModal(state, action){
            return action.payload;
        }
    }
})

let groupTimesData = createSlice({
    name : 'groupTimesData',
    initialState: '07001200',

    reducers:{
        setGroupTimesData(state, action){
            return action.payload;
        }
    }
})

let dayIndexData = createSlice({
    name: "dayIndexData",
    initialState: 0,

    reducers:{
        setDayIndexData(state, action){
            return action.payload;
        }
    }
})
let hourIndexData = createSlice({
    name: "hourIndexData",
    initialState: 0,

    reducers:{
        setHourIndexData(state, action){
            return action.payload;
        }
    }
})


let personalTimeData = createSlice({
    name: "personalTimeData",
    initialState:
        [

        ],

    reducers: {
        updatePersonalTimeData(state, action) {
            console.log('store의 personalTimeData 설정 : ',action.payload);
            return action.payload;
        },

        updateTimeValues(state, action) {
            // return state.map(day => ({
            //     ...day,
            //     time: action.payload[state.indexOf(day)] || day.time
            // }));

            return state.map((day, index) => ({
                ...day,
                time: action.payload[index] || day.time
            }));
        },
        updateRankValues(state, action) {
            // return state.map(day => ({
            //     ...day,
            //     rank: action.payload[state.indexOf(day)] || day.rank
            // }));
            return state.map((day, index) => ({
                ...day,
                rank: action.payload[index] || day.rank
            }));
        },
    }
})

let timeOnlyData = createSlice({
    name: "timeOnlyData",
    initialState: [],

    reducers: {
        updateTimeOnly(state, action) {
            return action.payload;
        },
    }
})

let rankOnlyData = createSlice({
    name: "rankOnlyData",
    initialState: [],

    reducers: {
        updateRankOnly(state, action) {
            return action.payload;
        },
    }
})

export let {updatePersonalTimeData, updateTimeValues, updateRankValues} = personalTimeData.actions
export let {updateTimeOnly} = timeOnlyData.actions
export let {updateRankOnly} = rankOnlyData.actions
export let {setDayIndexData} = dayIndexData.actions
export let {setHourIndexData} = hourIndexData.actions
export let {setGroupCellModal} = groupCellModal.actions
export let {setFirstDate, setFirstTime, setFirstDataFormat,
    setSecondDate, setSecondTime, setSecondDataFormat,
setThirdDate, setThirdTime, setThirdDataFormat,
setChooseDate, setChooseTime, setChooseDataFormat} = timeSlots.actions
export let {setGroupTimesData} = groupTimesData.actions


export default configureStore({
    reducer: {
        personalTimeData: personalTimeData.reducer,
        timeOnlyData: timeOnlyData.reducer,
        rankOnlyData: rankOnlyData.reducer,
        dayIndexData: dayIndexData.reducer,
        hourIndexData: hourIndexData.reducer,
        groupCellModal: groupCellModal.reducer,
        timeSlots: timeSlots.reducer,
        groupTimesData: groupTimesData.reducer,
    },
});
