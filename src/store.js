import {configureStore, createSlice} from "@reduxjs/toolkit";
import personalTimetable from "./components/PersonalTimetable.jsx";

let selectedGroupTimes = createSlice({
    name : 'selectedGroupTime',
    initialState: '09002400',

    reducers:{
        setGroupTimes(state, action){
            console.log(action.payload);
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
            console.log(action.payload);
            return action.payload;
        },
        updateTimeValues(state, action) {
            return state.map(day => ({
                ...day,
                time: action.payload[state.indexOf(day)] || day.time
            }));
        },
    }
})

let timeOnlyData = createSlice({
    name: "timeOnlyData",
    initialState: [],

    reducers: {
        updateTimeOnly(state, action) {
            console.log(action.payload);
            return action.payload;
        },
    }
})

export let {updatePersonalTimeData, updateTimeValues} = personalTimeData.actions
export let {updateTimeOnly} = timeOnlyData.actions
export let {setGroupTimes} = selectedGroupTimes.actions


export default configureStore({
    reducer: {
        personalTimeData: personalTimeData.reducer,
        timeOnlyData: timeOnlyData.reducer,
        selectedGroupTimes: selectedGroupTimes.reducer,
    },
});
