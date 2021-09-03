import { UPDATE_DAY, SAVE_DATA } from "./types";

export const updateDay = (day) => {
    return {
        type: UPDATE_DAY,
        payload: day
    }
}

export const saveData = (series) => {
    return {
        type: SAVE_DATA,
        payload: series
    }
}