import {
    CREATE_CUSTOMER,
    CREATE_ITEM, CREATE_TABLE, CREATE_TAX, DELETE_CUSTOMER,
    DELETE_ITEM, DELETE_TABLE, DELETE_TAX, FETCH_CUSTOMER,
    FETCH_ITEM, FETCH_TABLE, FETCH_TAX,
    UPDATE_CUSTOMER,
    UPDATE_ITEM, UPDATE_TABLE, UPDATE_TAX
} from "../constant/constant";

export const changeProfile=(table)=>{
    return {
        type:CREATE_TAX,
        payload:table
    }
}
