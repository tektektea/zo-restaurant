import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, Card, Text} from "react-native-elements";
import {MARGIN, PADDING} from "../../utils/Dimensions";
import {WHITE} from "../../utils/Colors";
import {DateButton} from "../../controls/DateButton";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import {deleteOrder, rangeOrders} from "../../redux/actions/orderActions";
import OrderReport from "./OrderReport";
import {connect} from "react-redux";
import {PopMenu} from "../../controls/PopMenu";
import {ConfirmDialog} from "../../controls/ConfirmDialog";

const styles = StyleSheet.create({
    container: {flex: 1},
    headWrapper: {
        flexDirection: "row",
        padding: PADDING,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: WHITE,
        elevation: 1
    },
    title: {flex: 1, fontWeight: "bold",margin:MARGIN, fontSize: 20, color: "gray"},
    bodyWrapper: {alignItems: "center", backgroundColor: "#f4f4f4", flex: 1},
    card: {width: 300, height: 300}

});

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFrom: false,
            openTo: false,

            openOption:false,
            openConfirm:false,

            from_date: new Date(),
            to_date: new Date()
        }
    }

    searchOrder = (from, to) => {
        const {rangeOrders} = this.props;
        rangeOrders(from, to)
    };

    onPressOrder = (selectedOrder) => this.setState({selectedOrder,openOption:true});

    deleteItem=()=>{
        const {selectedOrder} = this.state;
        const {deleteOrder} = this.props;
        deleteOrder(selectedOrder.invoice_no);
    }
    onMenuItemPressed=(menu)=>{
        this.setState({openOption:false})
        switch (menu) {
            case 'Delete':
                this.setState({openConfirm:true})
                break;
            default:
                break;
        }
    }
    render() {
        const {from_date, to_date, openTo, openFrom,openOption,openConfirm} = this.state;
        const {reports} = this.props;
        const menus = [
            {name: "Payment", icon: "money", onPress: this.onMenuItemPressed},
            {name: "Cancel", icon: "close", onPress: this.onMenuItemPressed},
            {name: "Delete", icon: "trash", onPress: this.onMenuItemPressed},
        ];
        return (
            <View style={styles.container}>

                {reports.length === 0 && <>
                    <View style={styles.headWrapper}>
                        <Text style={styles.title}>Report</Text>
                    </View>
                    <View style={styles.bodyWrapper}>
                        <Card containerStyle={styles.card} title={"Choose between date"}>
                            <DateButton onPress={() => this.setState({openFrom: true})}
                                        containerStyle={{margin: 10}}
                                        label={"From"}
                                        value={moment(from_date).format("Do MMM YYYY")}/>

                            <DateButton onPress={() => this.setState({openTo: true})}
                                        containerStyle={{margin: 10}}
                                        label={"To"}
                                        value={moment(to_date).format("Do MMM YYYY")}/>

                            <Button
                                onPress={() => this.searchOrder(from_date, to_date)}
                                raised={true}
                                type={"outline"}
                                title={"Search"}/>
                        </Card>
                    </View>
                </>}

                {reports.length > 0 && <OrderReport onPressOrder={this.onPressOrder} orders={reports}/>}

                {openFrom && <DateTimePicker value={from_date}
                                             mode={"date"}
                                             display="default"
                                             onChange={(event, f) => this.setState({openFrom: false, from_date: f})}/>}
                {openTo && <DateTimePicker value={to_date}
                                           mode={"date"}
                                           display="default"
                                           onChange={(event, t) => this.setState({openTo: false, to_date: t})}/>}

                {openOption && <PopMenu title={"Menu"}
                                        description={"Choose an action"}
                                        open={openOption}
                                        menus={menus}
                                        onClose={() => this.setState({openOption: false})}/>}

                {openConfirm && <ConfirmDialog title={"Delete Item"}
                                              description={"Do you want to delete?"}
                                              open={openConfirm}
                                              onConfirm={this.deleteItem}
                                              onClose={() => this.setState({openConfirm: false})}/>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    reports: state.orderData.reports
});
const mapDispatchToProps = {
    rangeOrders,
    deleteOrder
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);
