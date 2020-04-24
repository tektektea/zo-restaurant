
import React from 'react';
import PropTypes from 'prop-types';
import {View} from "react-native";
import {Icon} from "react-native-elements";

const ControlPanel = (props) => (
    <View className="control-panel my-2 mx-1">
        <Icon size={34} iconStyle={{padding:10}} name={"history"} disabled={!props.anyHistory} onPress={props.onToggleHistory}>
        </Icon>
    </View>
);

ControlPanel.defaultProps = {
    anyHistory: false,
    onToggleHistory: () => alert('toggle history')
};

ControlPanel.propTypes = {
    anyHistory: PropTypes.bool,
    onToggleHistory: PropTypes.func
};

export default ControlPanel;
