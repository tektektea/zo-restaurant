import {CREATE_TABLE, DELETE_TABLE, ERROR, FETCH_TABLE, UPDATE_TABLE} from "../constant/constant";
import {FAKE_TABLE} from "../../data/fake";

const tableData = {
    tables: [],
    success:"",
    error:"",
};
export const tableReducer = (state = tableData, action) => {

    switch (action.type) {
        case FETCH_TABLE:
            return {...state,tables:action.payload, success: "",error: ""};

        case CREATE_TABLE:
            return {
                ...state,
                tables: action.payload,
            };

        case UPDATE_TABLE:
            return {
                ...state,
                tables: action.payload,
            };
        case DELETE_TABLE:
            return {
                ...state,
                tables: action.payload,
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {...state,success: "",error: ""}

    }
};
