import React, { Component } from 'react'
import {StyleSheet,View} from 'react-native'
import NumberFormat from "react-number-format";
import {ListItem, Text, Button, Icon} from "react-native-elements";
import {PADDING} from "../../utils/Dimensions";
import {GRAY, WHITE} from "../../utils/Colors";

const styles=StyleSheet.create({
    container:{
        padding:0,
        display:"flex",
        flexDirection:"row",
        alignContent:"flex-start",
        justifyContent:"flex-start",
    },
    title:{
        padding:PADDING,
        backgroundColor:WHITE,
        elevation:3,
        borderRadius:3,
        alignSelf: "stretch",
        fontSize: 18,
        fontWeight: "bold"
    },
    subtitle:{
        alignSelf:"flex-start",
        fontSize:14,
        fontWeight:"100"
    },
    left:{
        margin:0,
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flex:1,
        height:"100%"

    },
    right:{
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        justifyContent:"center",
    },
    rightBtn:{
        margin:0,
        padding:0,
        alignSelf:"flex-end"
    }
})
const TaxesList=({taxes,onRemove})=> {

    return (
        <View style={{flex:1}}>
                <Text style={styles.title}>Taxes</Text>
            {taxes.map((item, index) => {
                return (
                    <ListItem key={index}
                              containerStyle={{padding:3}}
                              title={item.name}
                              bottomDivider={true}
                              rightElement={(
                                  <View style={styles.right}>

                                              <NumberFormat fixedDecimalScale={true} decimalScale={2} value={item.percent} displayType={'text'}
                                                            renderText={value => <Text style={{padding:4}}>{value}</Text>}
                                                            suffix={"%"}/>
                                                            <Icon iconStyle={{padding:6}} name={"ios-trash"} color={"tomato"} onPress={()=>onRemove(index)} type={"ionicon"} />
                                          </View>
                              )}/>

                )
            })}
        </View>

    )
}
export default TaxesList
