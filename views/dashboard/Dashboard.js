import React, {useEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {PRIMARY, WHITE} from "../../utils/Colors";
import {ELEVATION, MARGIN, PADDING} from "../../utils/Dimensions";
import {CardInfo, InfoView} from "./InfoVIew";
import {BarChart, Grid} from 'react-native-svg-charts'
import {countPayable, getOrderChart} from "../../redux/actions/orderActions";
import {all as countCustomer} from "../../redux/actions/customerActions";
import {all as countItem} from "../../redux/actions/itemActions";
import {connect} from "react-redux";
import PieWithLabel from "../../controls/PieWithLabel";

const styles = StyleSheet.create({
    container: {display: "flex"},
    headWrapper: {
        flexDirection: "row",
        padding: PADDING,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: WHITE,
        elevation: ELEVATION
    },
    row: {display: "flex", flexDirection: "row"},
    title: {flex: 1, fontWeight: "bold", margin: MARGIN, fontSize: 20, color: "gray"},
    bodyWrapper: {alignItems: "center", backgroundColor: "#f4f4f4", flex: 1},
    card: {width: 300, height: 300}

});
const Dashboard = ({countCustomer, countItem, orderChartData, orderPieData, sales, balanceDue, customerCount, itemCount, payableCount, countPayable, getOrderChart, navigation}) => {
    const fill = PRIMARY;

    useEffect(() => {
        countCustomer();
        countItem();
        getOrderChart();
        countPayable()

    }, []);
    return (
        <ScrollView style={styles.container}>

            <View style={styles.headWrapper}>
                <Text style={styles.title}>Dashboard</Text>
            </View>
            <View style={styles.row}>
                <InfoView action={{onPress: () => navigation.navigate("Items"), text: "View more"}}
                          icon={{backgroundColor: "red", color: PRIMARY, name: "restaurant", type: "fontawesome"}}
                          title={"Items"} label={itemCount}
                          caption={"Total number of food item registered"}/>
                {/*<InfoView icon={{name: "eye"}} title={"No of Customer"} caption={10}/>*/}
            </View>
            <View style={styles.row}>
                <InfoView action={{text: "View more", onPress: () => navigation.navigate("Customers")}}
                          icon={{color: "tomato", name: "users"}} title={"Customers"}
                          caption={"Total number of customer registered"}
                          label={customerCount}/>
                {/*<InfoView icon={{name: "eye"}} title={"No of Customer"} caption={10}/>*/}
            </View>
            <View style={styles.row}>
                <InfoView action={{text: "View more", onPress: () => navigation.navigate("Orders")}}
                          icon={{color: PRIMARY, name: "shopping-cart"}} title={"Order due"}
                          caption={"Payable order"}
                          label={payableCount}/>
                {/*<InfoView icon={{name: "eye"}} title={"No of Customer"} caption={10}/>*/}
            </View>
            {/*<View style={styles.row}>*/}
            {/*    <InfoView action={{text: "View more"}} icon={{name: "money"}} title={"Payment"} caption={120}/>*/}
            {/*    /!*<InfoView icon={{name: "eye"}} title={"No of Customer"} caption={10}/>*!/*/}
            {/*</View>*/}

            <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={styles.title}>Chart for recent Order</Text>

                <View style={styles.row}>
                    <BarChart
                        style={{height: 300, width: "95%"}}
                        data={orderChartData}
                        svg={{fill}}
                        contentInset={{top: 30, bottom: 30}}
                    >
                        <Grid/>

                    </BarChart>
                </View>


            </View>
            <Text style={[styles.title,{alignSelf:"center"}]}>Net Sales vs Balance Due</Text>
            <View style={styles.row}>
                <CardInfo title={"Net Sales"} caption={"\u20B9" + sales}/>
                <CardInfo title={"Balance Due"} caption={"\u20B9" + balanceDue}/>
            </View>
            <View style={styles.row}>
                <PieWithLabel data={orderPieData}/>
            </View>



        </ScrollView>
    );
};
const mapStateToProps = state => ({
    customerCount: state.customerData.customers ? state.customerData.customers.length : 0,
    itemCount: state.itemData.items ? state.itemData.items.length : 0,
    orderChartData: state.orderData.orderChartData ? state.orderData.orderChartData : [],
    orderPieData: state.orderData.orderPieData ? state.orderData.orderPieData : [],
    payableCount: state.orderData.payableCount ? state.orderData.payableCount : 0,
    sales: state.orderData.sales ? state.orderData.sales : 0,
    balanceDue: state.orderData.balanceDue ? state.orderData.balanceDue : 0
});
const mapDispatchToProps = {
    countCustomer, countItem, getOrderChart, countPayable
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


