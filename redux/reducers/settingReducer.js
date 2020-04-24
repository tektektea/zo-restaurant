import {CHANGE_PROFILE} from "../constant/constant";

const settingData = {
    profile: undefined,
    error: "",
    success: ""
};
export const settingReducer = (state = settingData, action) => {
    switch (action.type) {
        case CHANGE_PROFILE:

            return {...state,profile: action.payload,error:"",success:""};

        default:
            return {...state}

    }
};
