import React, {Component} from 'react';
import {Avatar, Icon, ListItem} from "react-native-elements";
import {FlatList, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import {PopMenu} from "../../controls/PopMenu";
import {ConfirmDialog} from "../../controls/ConfirmDialog";
import Customer from "./Customer";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


class List extends Component {
    constructor(props) {
        super(props);
        this.state={
            showMenu:false,
            openConfirm:false,
            openEdit:false,
        }
    }

    onPressRow = (selectedCustomer) => {
        const {selectCustomer, showMenu} = this.props;
        selectCustomer(selectedCustomer);
        showMenu();
    };
    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem
            key={item.id}
            title={item.name}
            subtitle={item.contact}
            leftAvatar={<Avatar rounded title={item.name.substring(0, 1)}/>}
            bottomDivider
            rightIcon={{size:28,iconStyle:{padding:10},name: "md-more", type: "ionicon", onPress: () => this.onPressRow(item)}}
        />
    );



    render() {
        const {customers} = this.props;
        return (
            <>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={customers}
                    renderItem={this.renderItem}
                />

            </>
        )
    }

}

List.propTypes = {
    customers: PropTypes.array.isRequired,
    showMenu:PropTypes.func.isRequired,
    selectCustomer:PropTypes.func.isRequired,
};

export default List;
