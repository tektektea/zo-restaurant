import React  from "react";
import {Icon} from "react-native-elements";

export default LeftHeader=({icon,onPress})=>{
    return(
        <Icon name={icon} onPress={onPress}/>
    )
}
