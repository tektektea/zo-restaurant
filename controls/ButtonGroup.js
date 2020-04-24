import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {PADDING} from "../utils/Dimensions";
import {Icon} from "react-native-elements";
import {GRAY} from "../utils/Colors";

const styles=StyleSheet.create({
    container:{
        width:"auto",
        height:"auto",
        display:"flex",
        flexDirection:"row",
        // borderWidth:2,
        justifyContent:"center",
        alignItems:"center",
        // borderColor:"#333",
        alignSelf: "flex-end",
        borderRadius:6
    }
})

const ButtonGrouper=({containerStyle,icons,tintColor,selectedBtn,onPressed})=>{
    const [selected, setSelected] = useState(null);
    return(
        <View style={[styles.container,containerStyle]}>
            {
                icons.map((icon,i)=> <Icon onPress={()=>onPressed(icon.name)} iconStyle={{padding:6}} type={"entypo"} name={icon.name} size={28} color={selectedBtn===icon.name?tintColor:icon.color}/>)
            }
        </View>
    )
}
export default ButtonGrouper
