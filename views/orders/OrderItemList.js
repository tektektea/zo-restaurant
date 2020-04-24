import React from 'react'
import {StyleSheet, View} from 'react-native'
import NumberFormat from "react-number-format";
import {Icon, ListItem, Text} from "react-native-elements";
import {PADDING} from "../../utils/Dimensions";
import {GRAY, WHITE} from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 0,
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
        justifyContent: "flex-start",
    },
    title: {
        marginTop:10,
        elevation:3,
        padding:PADDING,
        borderRadius:3,
        backgroundColor:WHITE,
        alignSelf: "stretch",
        fontSize: 18,
        fontWeight: "bold"
    },
    subtitle: {
        alignSelf: "flex-start",
        fontSize: 14,
        fontWeight: "100"
    },
    left: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flex: 1,
        height: "100%"

    },
    right: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
    },
    rightBtn: {
        margin: 0,
        padding: 0,
        alignSelf: "flex-end"
    }
});
const OrderItemList = ({orders, onRemove}) => {

    return (
        <View style={{flex: 1}}>
            <Text style={styles.title}>Orders</Text>
            {orders.map((item, index) => {
                return (
                    <ListItem
                        key={index}
                        containerStyle={{padding: 6}}
                        title={item.item}
                        bottomDivider={true}
                        subtitle={item.price}
                        rightElement={(
                            <View style={styles.right}>

                                <NumberFormat decimalScale={2} value={item.amount} displayType={'text'}
                                              thousandSeparator={true}
                                              renderText={value => <Text style={{padding: 4}}>{value}</Text>}
                                              prefix={'₹'}/>
                                <Icon name={"ios-trash"} color={"tomato"} onPress={() => onRemove(index)}
                                      type={"ionicon"}/>
                            </View>
                        )}/>

                )
            })}
        </View>

    )
};
export default OrderItemList
