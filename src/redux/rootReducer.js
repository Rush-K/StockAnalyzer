import { combineReducers } from "redux";
import dailyChartReducer from './DailyChart/reducer';


const rootReducer = combineReducers({
    dailyChart: dailyChartReducer
});

export default rootReducer;