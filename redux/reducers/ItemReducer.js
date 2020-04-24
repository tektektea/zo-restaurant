import {CREATE_ITEM, DELETE_ITEM, ERROR, FETCH_ITEM, UPDATE_ITEM} from "../constant/constant";

const itemData = {
    items: [],
    error: "",
    success:""
};
export const itemReducer = (state = itemData, action) => {
    const id = action.payload ? action.payload.id : null;

    switch (action.type) {
        case FETCH_ITEM:
            return {...state,items:action.payload};
        case CREATE_ITEM:
            return {
                ...state,
                items: action.payload,
            };

        case UPDATE_ITEM:
            return {
                ...state,
                items: action.payload,
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: action.payload,
            };
        case ERROR:
            return {
                ...state,
                error:action.payload
            }
        default:
            return {...state, success: "",error: ""}

    }
};
