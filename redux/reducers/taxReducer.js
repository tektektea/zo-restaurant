import {CREATE_TAX, DELETE_TAX, ERROR, FETCH_TAX, UPDATE_TAX} from "../constant/constant";

const taxData = {
    taxes: [],
    success: "",
    error: "",
};
export const taxReducer = (state = taxData, action) => {

    switch (action.type) {
        case FETCH_TAX:
            return {...state,taxes:action.payload, success: "", error: ""};

        case CREATE_TAX:
            return {
                ...state,
                taxes: action.payload,
                success: "Tax created successfully",
                error: ""
            };

        case UPDATE_TAX:
            return {
                ...state,
                taxes: action.payload,
                success: "Tax updated successfully",
                error: ""
            };
        case DELETE_TAX:
            return {
                ...state,
                taxes: action.payload,
                success: "Tax Deleted successfully",
                error: ""
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return {...state, success: "", error: ""}

    }
};
