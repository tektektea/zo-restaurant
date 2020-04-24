import React, {Component} from 'react';
import {Icon, Text} from "react-native-elements";
import {StyleSheet, ToastAndroid, View} from "react-native";
import List from "./List";
import Customer from "./Customer";
import {PADDING} from "../../utils/Dimensions";
import {PRIMARY, WHITE} from "../../utils/Colors";
import ButtonGrouper from "../../controls/ButtonGroup";
import {all, createCustomer, deleteCustomer, updateCustomer} from "../../redux/actions/customerActions";
import {PopMenu} from "../../controls/PopMenu";
import {connect} from "react-redux";
import {ConfirmDialog} from "../../controls/ConfirmDialog";
import {getCustomerOrders} from "../../redux/actions/orderActions";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "stretch",
        backgroundColor: "#f4f4f4"
    }
});

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedBtn: "list",
            openNew: false,
            openEdit: false,
            showMenu: false,
            openConfirm: false,

            selectedCustomer: null
        }
    }

    componentDidMount(): void {
        const {all} = this.props;
        all()
            .then(msg => console.log(msg))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))

    }

    deleteCustomer = () => {
        const {selectedCustomer} = this.state;
        const {deleteCustomer} = this.props;
        this.setState({openConfirm: false});
        if (selectedCustomer) {
            deleteCustomer(selectedCustomer.id)
                .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
                .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
        }
    };
    updateCustomer = (customer) => {
        const {updateCustomer} = this.props;
        this.setState({openEdit: false});
        updateCustomer(customer)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    selectCustomer = (selectedCustomer) => {
        this.setState({selectedCustomer})
    };
    showMenu = () => {
        this.setState({showMenu: true})
    };

    displayCustomerDetail = () => {
        const {selectedCustomer} = this.state;
        const {navigation} = this.props;
        getCustomerOrders(selectedCustomer.id);
        navigation.push("CustomerDetail", {customer: selectedCustomer});
    };
    onMenuItemPressed = (menu) => {
        this.setState({showMenu: false});
        switch (menu) {
            case 'Orders':
                this.displayCustomerDetail();
                break;
            case 'Edit':
                this.setState({openEdit: true});
                break;
            case 'Delete':
                this.setState({openConfirm: true});
                break;
            default:
                throw new Error("no option")
        }
    };

    onCreate = (customer) => {
        const {createCustomer} = this.props;
        this.setState({openNew: false});
        createCustomer(customer)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    render() {
        const {selectedCustomer, openConfirm, showMenu, openEdit, openNew, selectedBtn} = this.state;
        const {customers} = this.props;
        const menus = [
            {name: "Orders", icon: "list-alt", onPress: this.onMenuItemPressed},
            {name: "Edit", icon: "edit", onPress: this.onMenuItemPressed},
            {name: "Delete", icon: "trash", onPress: this.onMenuItemPressed},
        ];
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    padding: PADDING,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: WHITE,
                    elevation: 1
                }}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>Customers</Text>
                    <ButtonGrouper icons={[{name: "list", color: "gray"}, {name: "grid", color: "gray"}]}
                                   onPressed={(selectedBtn) => this.setState({selectedBtn})}
                                   selectedBtn={selectedBtn}
                                   tintColor={PRIMARY}
                    />
                </View>


                {selectedBtn === "list" &&
                <List selectCustomer={this.selectCustomer}
                      showMenu={this.showMenu}
                      customers={customers} {...this.props} />}

                {/*{selectedBtn === "grid" && <Grid customers={customers} {...this.props} />}*/}

                <Icon containerStyle={{position: "absolute", bottom: 40, right: 40}}
                      name={"md-add"} type={"ionicon"} raised={true}
                      onPress={() => this.setState({openNew: true})}/>


                {openNew && <Customer mode={"create"} onCreate={this.onCreate} open={openNew}
                                      onClose={() => this.setState({openNew: false})}/>}
                {openEdit && <Customer mode={"edit"}
                                       onCreate={this.updateCustomer}
                                       open={openEdit}
                                       customer={selectedCustomer}
                                       onClose={() => this.setState({openEdit: false})}/>}

                {showMenu && <PopMenu title={"Menu"}
                                      description={"Choose an action"}
                                      open={showMenu}
                                      menus={menus}
                                      onClose={() => this.setState({showMenu: false})}/>}

                {openConfirm && <ConfirmDialog title={"Delete"}
                                               description={"Do you want to delete?"}
                                               open={openConfirm}
                                               onConfirm={this.deleteCustomer}
                                               onClose={() => this.setState({openConfirm: false})}/>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customerData.customers,
});
const mapDispatchToProps = {
    createCustomer, updateCustomer, deleteCustomer, all
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
