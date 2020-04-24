import {ToastAndroid} from "react-native";
import React from "react";

const Toaster = ({message, visible}) => {
    if (visible) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
        return null;
    }
    return null;
};
export default Toaster
