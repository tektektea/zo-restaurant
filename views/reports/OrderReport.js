import {FlatList, View} from "react-native";
import {PADDING} from "../../utils/Dimensions";
import {GRAY, WHITE} from "../../utils/Colors";
import {Icon, ListItem, Text} from "react-native-elements";
import React from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import {connect} from "react-redux";
import {clearReport} from "../../redux/actions/orderActions";

const OrderReport = ({orders,clearReport,onPressOrder}) => {
    const keyExtractor = (index) => index.toString();
    const renderItem = (item) => (
        <ListItem
            key={item.invoice_no}
            title={"Invoice No:#" + item.invoice_no}
            subtitle={moment(item.invoice_date).format("Do MMM YYYY")}
            bottomDivider
            rightTitle={
                <NumberFormat decimalScale={2} fixedDecimalScale={true} value={item.netAmount}
                              displayType={'text'}
                              thousandSeparator={true}
                              renderText={value => <Text style={{padding: 4}}>Net Amount: {value}</Text>}
                              prefix={'₹'}/>
            }
            rightIcon={{name: "md-more", iconStyle: {padding: 6}, type: "ionicon", onPress: () => onPressOrder(item)}}
        />
    );


    return (
        <View style={{flex: 1, margin: 0, backgroundColor: "#f4f4f4"}}>
            <View style={{
                flexDirection: "row",
                padding: PADDING,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: WHITE,
                elevation: 1
            }}>
                <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>Search Result</Text>
                <Icon iconStyle={{padding: 6}} name={"filter"} type={"material-community"} color={GRAY}
                      onPress={() => clearReport()}/>
            </View>
            <FlatList
                keyExtractor={(item, index) => keyExtractor(index)}
                data={orders}
                renderItem={({item}) => renderItem(item)}
            />

        </View>

    )
};
const mapDispatchToProps={
    clearReport
}

export default connect(null,mapDispatchToProps) (OrderReport)
