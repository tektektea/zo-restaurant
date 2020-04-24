import {CREATE_TABLE, DELETE_TABLE, UPDATE_TABLE} from "../constant/constant";

const tableData={
    tables:[],
}
export const authReducer=(state=tableData,action)=>{

    switch (action.name) {
        case CREATE_TABLE:
            return {...state};
        case UPDATE_TABLE:
            return {...state};
        case DELETE_TABLE:
            return  {...state}
        default:
            return {...state}

    }
}
