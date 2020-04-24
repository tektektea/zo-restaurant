import React, {Component} from 'react';
import {Avatar, Icon, ListItem, Text} from "react-native-elements";
import {FlatList, StyleSheet, ToastAndroid, View} from "react-native";
import {GRAY, WHITE} from "../../utils/Colors";
import {MARGIN, PADDING, RADIUS} from "../../utils/Dimensions";
import Item from "./Item";
import {PopMenu} from "../../controls/PopMenu";
import {ConfirmDialog} from "../../controls/ConfirmDialog";
import {all, createItem, deleteItem, updateItem} from "../../redux/actions/itemActions";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4"
    },
    content: {
        margin: 16,
        padding: 16,
        backgroundColor: WHITE,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RADIUS,
        padding: PADDING,
        margin: MARGIN,
    },
    searchBar: {
        borderWidth: 2,
        borderRadius: 6,
        width: "auto",
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: "#f4f4f4",
        borderColor: GRAY,
    }
});

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            openNew: false,
            openEdit: false,
            openDelete: false,
            openSort: false,
            openMenu: false
        }
    }

    componentDidMount(): void {
        const {all} = this.props;
        all()
    }

    keyExtractor = (item, index) => item.id.toString();

    onSearch = (value) => {
        console.log(value)
    };
    onItemPress = (selectedItem) => {
        this.setState({selectedItem, openMenu: true})
    };

    renderItemView = ({item}) => {

        return (
            <>
                <ListItem
                    key={item.id}
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={<Avatar rounded title={item.name.substring(0, 1)}/>}
                    rightTitle={'\u20B9' + item.price}
                    bottomDivider
                    rightIcon={{
                        size: 28,
                        iconStyle: {padding: 10},
                        name: "md-more",
                        type: "ionicon",
                        onPress: () => this.onItemPress(item)
                    }}
                />

            </>
        )
    };

    createItem = (item) => {
        const {createItem} = this.props;
        this.setState({openNew: false});
        createItem(item)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };
    updateItem = (item) => {
        const {updateItem} = this.props;
        this.setState({openEdit: false});
        updateItem(item)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };
    deleteItem = () => {
        const {deleteItem} = this.props;
        const {selectedItem} = this.state;
        this.setState({openDelete: false});
        if (selectedItem) {
            deleteItem(selectedItem.id)
                .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
                .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
        }
    };
    onMenuItemPressed = (menu) => {
        this.setState({openMenu: false});
        switch (menu) {
            case 'Edit':
                this.setState({openEdit: true});
                break;
            case "Delete":
                this.setState({openDelete: true});
                break;
        }
    };

    onSortItemPressed = (item) => {
        this.setState({openSort: false});
        switch (item) {
            case 'Item':
                break;
            case '':
                break;
            default:
                break;
        }
    };

    render() {
        const {selectedItem, openEdit, openSort, openDelete, openMenu, openNew} = this.state;
        const {items, error, success} = this.props;
        const menus = [
            {name: "Edit", icon: "edit", onPress: this.onMenuItemPressed},
            {name: "Delete", icon: "trash", onPress: this.onMenuItemPressed},
        ];
        const sortMenu = [
            {name: "Edit", icon: "edit", onPress: this.onSortItemPressed},
            {name: "Delete", icon: "trash", onPress: this.onSortItemPressed},
        ];
        return (
            <>
                <View style={styles.container}>

                    <View style={{
                        flexDirection: "row",
                        padding: PADDING,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: WHITE,
                        elevation: 1
                    }}>
                        <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>List of
                            item/food</Text>
                        {/*<Icon name={"search"} type={"font-awesome"} iconStyle={{padding: 10}} color={"gray"}/>*/}
                    </View>
                    {/*}/>*/}
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={items}
                        renderItem={this.renderItemView}
                    />
                    <Icon onPress={() => this.setState({openNew: true})}
                          raised={true} name={"md-add"}
                          type={"ionicon"}
                          containerStyle={{position: "absolute", bottom: 50, right: 40}}/>


                </View>

                {openNew && <Item onCreate={this.createItem}
                                  open={openNew}
                                  onClose={() => this.setState({openNew: false})}/>}
                {openEdit && <Item mode={"edit"}
                                   item={selectedItem}
                                   onCreate={this.updateItem}
                                   open={openEdit}
                                   onClose={() => this.setState({openEdit: false})}/>}

                {openMenu && <PopMenu title={"Menu"} description={"Choose an option"}
                                      menus={menus}
                                      onClose={() => this.setState({openMenu: false})}
                                      open={openMenu}/>}

                {openSort && <PopMenu title={"Sort"} description={"Choose an option"}
                                      menus={sortMenu}
                                      onClose={() => this.setState({openSort: false})}
                                      open={openSort}/>}

                {openDelete && <ConfirmDialog title={"Delete Item"}
                                              description={"Do you want to delete?"}
                                              open={openDelete}
                                              onConfirm={this.deleteItem}
                                              onClose={() => this.setState({openDelete: false})}/>}


            </>
        );
    }
}

const mapStateToProps = state => ({
    items: state.itemData.items,
});
const mapDispatchToProps = {
    createItem, updateItem, deleteItem, all
};
// const mapDispatchToProps = (dispatch) => ({
//     all: () => dispatch(all()),
//     createItem: (item) => dispatch(createItem(item)),
//     updateItem: (item) => dispatch(updateItem(item)),
//     deleteItem: (id) => dispatch(deleteItem(id)),
// });
export default connect(mapStateToProps, mapDispatchToProps)(Items);
