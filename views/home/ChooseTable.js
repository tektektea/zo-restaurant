import React, {Component} from 'react';
import {Button, Icon, Text} from "react-native-elements";
import {View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import {GRID_STYLE} from "../styles/gridStyle";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ELEVATION, MARGIN, PADDING, RADIUS} from "../../utils/Dimensions";
import {all} from "../../redux/actions/tableActions";

class ChooseTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.all()
    }

    renderItemView = (table) => {
        const {onSelectTable} = this.props;
        return (
            <>
                <View title={table.name} style={[{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center",
                    elevation: ELEVATION,
                    borderRadius:RADIUS,
                    padding: PADDING,
                    margin: MARGIN,
                }, {backgroundColor: "#fff"}]}>

                    <Text style={{fontSize: 23}}>
                        {table.name}
                    </Text>
                    <Text style={GRID_STYLE.caption}>
                        {table.description}
                    </Text>
                    <Icon
                        onPress={() => onSelectTable(table.name)}
                        size={40}
                        raised={true}
                        name='ios-add'
                        type='ionicon'
                        color='#517fa4'
                    />
                </View>
            </>
        )
    };

    render() {
        const {doSkip, tables} = this.props;
        return (
            <View style={GRID_STYLE.container}>
                <FlatGrid items={tables}
                    // itemContainerStyle={styles.content}
                    // itemDimension={120}
                    // spacing={10}
                          renderItem={({item}) => this.renderItemView(item)}

                />
                <Button raised={true} type={"outline"} title={"skip"} onPress={doSkip}/>

            </View>
        );
    }
}

ChooseTable.propTypes = {
    onSelectTable: PropTypes.func.isRequired,
    doSkip: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    tables: state.tableData.tables
});
const mapDispatchToProps={
    all
}
export default connect(mapStateToProps,mapDispatchToProps)(ChooseTable);
