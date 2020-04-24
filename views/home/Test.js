import React, {Component} from 'react';
import {View, Text, ScrollView} from "react-native";

class Test extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex:1,
                backgroundColor:"green"
            }}>
                <Text>tesddf</Text>

                <View style={{
                    position:"absolute",
                    bottom:0
                }}>
                    <Text>ted</Text>
                </View>

            </ScrollView>
        );
    }
}

export default Test;
