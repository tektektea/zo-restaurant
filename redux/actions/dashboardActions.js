import {DASHBOARD_COUNT, ERROR} from "../constant/constant";
import realmInstance from "../../schema";

export const countModels=()=>dispatch=>{
    try {
        realmInstance.write(() => {
            const customerCount = realmInstance.objects('Customer').length;
            const itemCount = realmInstance.objects('Item').length;
            dispatch({
                type:DASHBOARD_COUNT,
                payload: {
                    customerCount,
                    itemCount
                }
            })
        })
    }catch (e) {
        dispatch({
            type:ERROR,
            payload:e.toString()
        })
    }
}
