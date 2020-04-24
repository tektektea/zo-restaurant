import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from "react-native";
import {ListItem} from "react-native-elements";
import {WHITE} from "../../utils/Colors";
import {ELEVATION} from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: WHITE,
        flexDirection: "row",
        elevation: ELEVATION
    },
    expression: {
        fontSize: 24
    },
    result: {
        fontSize: 24,
        fontWeight: "bold"
    }
});
const History = (props) => {

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({item, index}) => (
        <ListItem
            onPress={() => props.onSelected(index)}
            key={item.id}
            title={item.expression}
            subtitle={item.result}
            bottomDivider
            rightIcon={{
                size: 28,
                iconStyle: {padding: 10},
                name: "delete",
                onPress: () => props.onClearHistory()
            }}
        />
    );

    return (<FlatList keyExtractor={keyExtractor} data={props.history} renderItem={renderItem}/>);

};


History.defaultProps = {
    history: [],
    onClearHistory: () => alert('clear history'),
    onSelected: () => alert('selected')
};

History.propTypes = {
    history: PropTypes.array,
    onClearHistory: PropTypes.func,
    onSelected: PropTypes.func
};

export default History;
