import {Text, StyleSheet,TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import React from "react";
import {WHITE} from "../../utils/Colors";
import {ELEVATION, PADDING, RADIUS} from "../../utils/Dimensions";

const styles=StyleSheet.create({
    container:{
        display:"flex",
        flex:1,
        alignItems:"stretch",
        justifyContent:"center"
    },
    content:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flex: 1,
        elevation:ELEVATION,
        padding:PADDING,
        backgroundColor:WHITE,
        borderRadius:RADIUS
    }
})
export const CustomerTile=({customer,onRemove,pressAdd})=>{
    let view=null;
    if (!customer) {
        view=<TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <Button onPress={pressAdd} type={"clear"} title={"Add customer"} icon={{name:"add",type:"material"}}/>
            </View>
        </TouchableOpacity>
    }else{
        view=(
            <TouchableOpacity style={styles.container}>
                <View style={styles.content}>
                    <Text style={{fontWeight:"bold"}}>{customer.name}</Text>
                    <Text>{customer.contact}</Text>
                    <Button onPress={()=>onRemove(customer)} type={"clear"} title={"Remove"} icon={{name:"close",type:"material"}}/>
                </View>
            </TouchableOpacity>
        )
    }
    return view
}
