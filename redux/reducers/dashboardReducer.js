import {CREATE_TABLE, DASHBOARD_COUNT, DELETE_TABLE, ERROR, UPDATE_TABLE} from "../constant/constant";

const dashboardData={
    customerCount: 0,
    itemCount: 0,
    error:""
}
export const dashboardReducer=(state=dashboardData,action)=>{

    switch (action.type) {
        case DASHBOARD_COUNT:
            return {...action.payload};
        case UPDATE_TABLE:
            return {...state};
        case DELETE_TABLE:
            return  {...state}
        case ERROR:
            return {
                error:action.payload
            }
        default:
            return {...state}

    }
}
