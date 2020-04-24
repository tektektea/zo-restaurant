import React, {Component} from 'react';
import {Icon, Text} from "react-native-elements";
import {ToastAndroid, View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import {GRID_STYLE} from "../styles/gridStyle";
import Table from "./Table";
import {PopMenu} from "../../controls/PopMenu";
import {connect} from "react-redux";
import {all, createTable, deleteTable, updateTable} from "../../redux/actions/tableActions";
import {ConfirmDialog} from "../../controls/ConfirmDialog";
import {PADDING} from "../../utils/Dimensions";
import {WHITE} from "../../utils/Colors";


class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTable: null,

            openNew: false,
            openDelete: false,
            openEdit: false,
            openOption: false,
        }
    }

    componentDidMount(): void {
        const {all} = this.props;
        all()
            .then(msg => console.log(msg))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    }

    onSearch = (value) => {
        console.log(value)
    };

    showMenu = (selectedTable) => {
        this.setState({selectedTable, openOption: true})
    };
    createTable = (table) => {
        const {createTable} = this.props;
        this.setState({openNew: false});
        createTable(table)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    updateTable = (table) => {
        const {updateTable} = this.props;
        this.setState({openEdit: false});
        updateTable(table)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };
    deleteTable = () => {
        const {selectedTable} = this.state;
        const {deleteTable} = this.props;
        this.setState({openDelete: false});
        deleteTable(selectedTable.id)
            .then(msg => ToastAndroid.show(msg, ToastAndroid.SHORT))
            .catch(error => ToastAndroid.show(error, ToastAndroid.SHORT))
    };

    renderItemView = (table) => {
        return (
            <>
                <View title={table.name} style={[GRID_STYLE.itemContainer, {backgroundColor: "#fff", padding: 16}]}>
                    <View style={GRID_STYLE.row}>
                        <Text style={GRID_STYLE.title}>
                            {table.name}
                        </Text>
                        <Icon
                            iconStyle={{padding: 10}}
                            name='md-more'
                            type='ionicon'
                            color='gray'
                            onPress={() => this.showMenu(table)}
                        />
                    </View>

                    <Text style={GRID_STYLE.caption}>
                        {table.description}
                    </Text>
                </View>
            </>
        )
    };
    onMenuItemPressed = (name) => {
        this.setState({openOption: false});
        switch (name) {
            case 'Edit':
                this.setState({openEdit: true});
                break;
            case 'Delete':
                this.setState({openDelete: true});
                break;
            default:
                break;
        }

    };

    render() {
        const {openDelete, selectedTable, openEdit, openNew, openOption} = this.state;
        const {tables, error, success} = this.props;

        const menu = [
            {name: "Edit", icon: "edit", onPress: this.onMenuItemPressed},
            {name: "Delete", icon: "trash", onPress: this.onMenuItemPressed},
        ];
        return (
            <View style={{flex: 1, backgroundColor: "#f4f4f4"}}>
                <View style={{
                    flexDirection: "row",
                    padding: PADDING,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: WHITE,
                    elevation: 1
                }}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 20, color: "gray"}}>List of Table</Text>
                    <Icon name={"search"} type={"font-awesome"} iconStyle={{padding: 10}} color={"gray"}/>
                </View>
                <FlatGrid items={tables}
                    // itemContainerStyle={styles.content}
                    // itemDimension={120}
                    // spacing={10}
                          renderItem={({item}) => this.renderItemView(item)}

                />

                <Icon
                    containerStyle={{position: "absolute", bottom: 60, right: 40}}
                    raised
                    name='md-add'
                    type='ionicon'
                    onPress={() => this.setState({openNew: true})}/>

                {openNew && <Table open={openNew}
                                   onClose={() => this.setState({openNew: false})}
                                   onCreate={this.createTable}/>}

                {openEdit && <Table open={openEdit}
                                    mode={"edit"}
                                    table={selectedTable}
                                    onClose={() => this.setState({openEdit: false})}
                                    onCreate={this.updateTable}/>}

                {openDelete && <ConfirmDialog open={openDelete}
                                              title={"Delete"}
                                              description={"Do you want to delete ?"}
                                              onConfirm={() => this.deleteTable()}
                                              onClose={() => this.setState({openDelete: false})}/>}
                {openOption && <PopMenu onClose={() => this.setState({openOption: false})}
                                        open={openOption}
                                        title={"Menu"}
                                        description={"Choose an action"}
                                        menus={menu}/>}


            </View>
        );
    }
}

const mapStateToProps = state => ({
    tables: state.tableData.tables,
});

const mapDispatchToProps = {
    createTable,
    updateTable,
    deleteTable,
    all
};


export default connect(mapStateToProps, mapDispatchToProps)(Tables);
