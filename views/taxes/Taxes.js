import React, {Component} from 'react';
import {FlatList, StyleSheet, ToastAndroid, View} from "react-native";
import {PADDING} from "../../utils/Dimensions";
import {WHITE} from "../../utils/Colors";
import {Avatar, Icon, ListItem, Text} from "react-native-elements";
import {PopMenu} from "../../controls/PopMenu";
import {ConfirmDialog} from "../../controls/ConfirmDialog";
import Tax from "./Tax";
import {all, createTax, deleteTax, updateTax} from "../../redux/actions/taxActions";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4"
    }
});

class Taxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            openCreate: false,
            openEdit: false,
            openConfirm: false,
            selectedTax: null,

            success: "",
            error: ""
        }
    }

    componentDidMount(): void {
        this.props.all()
            .then(msg=>console.log(msg))
            .catch(error => ToastAndroid.show(error,ToastAndroid.SHORT))
    }

    onPressRow = (selectedTax) => {
        this.setState({selectedTax, showMenu: true})
        // showMenu();
    };
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem
            key={item.id}
            title={item.name}
            subtitle={item.percent + "%"}
            leftAvatar={<Avatar rounded title={item.name.substring(0, 1)}/>}
            bottomDivider
            rightIcon={{
                size: 28,
                iconStyle: {padding: 10},
                name: "md-more",
                type: "ionicon",
                onPress: () => this.onPressRow(item)
            }}
        />
    );
    onMenuItemPressed = (menu) => {
        this.setState({showMenu: false});
        switch (menu) {
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
    createTax = (tax) => {
        const {createTax} = this.props;
        this.setState({openCreate: false});
        createTax(tax)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };
    updateTax = (tax) => {
        const {updateTax} = this.props;
        this.setState({openEdit: false});
        tax.percent = parseFloat(tax.percent);
        updateTax(tax)
            .then(msg=>ToastAndroid.show(msg,ToastAndroid.SHORT))
            .catch(error=>ToastAndroid.show(error,ToastAndroid.SHORT))
    };
    deleteTax = () => {
        const {deleteTax} = this.props;
        const {selectedTax} = this.state;
        this.setState({openConfirm: false});

        if (selectedTax) {
            deleteTax(selectedTax.id)
                .then(msg=>ToastAndroid.show(msg,ToastAndroid.SHORT))
                .catch(error => ToastAndroid.show(error,ToastAndroid.SHORT))
        }
    };

    render() {
        const {taxes, error, success} = this.props;
        const {selectedTax, showMenu, openCreate, openEdit, openConfirm} = this.state;
        const menus = [
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
                    elevation: 1,
                    height: 55,
                }}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>Taxes</Text>
                </View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={taxes}
                    renderItem={this.renderItem}
                />

                <Icon containerStyle={{position: "absolute", bottom: 40, right: 40}}
                      name={"md-add"} type={"ionicon"} raised={true}
                      onPress={() => this.setState({openCreate: true})}/>

                {openCreate && <Tax mode={"create"}
                                    onClose={() => this.setState({openCreate: false})}
                                    open={openCreate}
                                    onCreate={this.createTax}/>}

                {openEdit && <Tax mode={"edit"}
                                  tax={selectedTax}
                                  onClose={() => this.setState({openEdit: false})}
                                  open={openEdit}
                                  onCreate={this.updateTax}/>}

                {showMenu && <PopMenu title={"Menu"}
                                      description={"Choose an action"}
                                      open={showMenu}
                                      menus={menus}
                                      onClose={() => this.setState({showMenu: false})}/>}

                {openConfirm && <ConfirmDialog title={"Delete"}
                                               description={"Do you want to delete?"}
                                               open={openConfirm}
                                               onConfirm={this.deleteTax}
                                               onClose={() => this.setState({openConfirm: false})}/>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    taxes: state.taxData.taxes,
});

const mapDispatchToProps = {
    createTax, updateTax, deleteTax, all
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
