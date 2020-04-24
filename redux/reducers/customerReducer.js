import {CREATE_CUSTOMER, DELETE_CUSTOMER, ERROR, FETCH_CUSTOMER, UPDATE_CUSTOMER} from "../constant/constant";

const customerData = {
    customers: [],
    customer:null,
    error: "",
    success: ""
};
export const customerReducer = (state = customerData, action) => {
    const id = action.payload ? action.payload.id : null;

    switch (action.type) {
        case FETCH_CUSTOMER:
            return {...state,customers:action.payload};
        case CREATE_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
            };

        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: action.payload,
            };
        case DELETE_CUSTOMER:
            const filter = state.customers.filter(item => item.id !== action.payload);
            return {
                ...state,
                customers: filter,
            };

        case ERROR:
            return {
                error: action.payload
            }
        default:
            return {...state, success: "", error: ""}

    }
};
