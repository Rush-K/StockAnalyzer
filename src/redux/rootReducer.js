import { combineReducers } from "redux";
import dailyChartReducer from './DailyChart/reducer';

export const CLEAR_DATA = 'CLEAR_DATA';

export const clearData = () => {
    return {
        type: CLEAR_DATA
    }
}

const appReducer = combineReducers({
    dailyChart: dailyChartReducer
});

const rootReducer = (state, action) => {
    if (action.type === CLEAR_DATA) {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;