import { UPDATE_DAY, SAVE_DATA } from "./types";

const initialState = {
    day: 0,
    series: [{
        data: []
    }]
}

const dailyChartReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_DAY:
            return {
                ...state,
                day: action.payload
            }
        case SAVE_DATA:
            return {
                ...state,
                series: action.payload
            }
        default :
            return state;            
    }
}

export default dailyChartReducer;