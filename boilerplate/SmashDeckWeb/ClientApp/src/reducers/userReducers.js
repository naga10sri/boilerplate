﻿
export function userReducer(state = {}, action) {
    switch (action.type) {
        case "USER":
            return action.payload;
        default:
            return state;
    }
}