import {configureStore, createSlice} from "@reduxjs/toolkit";
import personalTimetable from "./components/PersonalTimetable.jsx";

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
            return state.map((user, userIndex) => {
                return {
                    ...user,
                    days: user.days.map((day, dayIndex) => {
                        return {
                            ...day,
                            time: action.payload[dayIndex] || day.time  // new time을 기존 time에 맞게 적용
                        };
                    })
                };
            });
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


export default configureStore({
    reducer: {
        personalTimeData: personalTimeData.reducer,
        timeOnlyData: timeOnlyData.reducer,
    },
});
