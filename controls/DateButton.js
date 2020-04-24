import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import {GRAY, PRIMARY} from "../utils/Colors";
import {PADDING} from "../utils/Dimensions";

const styles=StyleSheet.create({
    container:{
        display:"flex",
        borderColor:PRIMARY,
        borderRadius:3,
        borderWidth:2,
        padding:PADDING,
    },
    label:{
        color: GRAY
    },
    value:{
        fontWeight:"bold",
        color:PRIMARY
    }
})
export const DateButton=({label,value,onPress,containerStyle})=>{

    return(
        <TouchableOpacity onPress={()=>onPress()} style={[styles.container,containerStyle]}>

            <Text style={styles.label}>
                {label}
            </Text>
            <Text style={styles.value}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}
