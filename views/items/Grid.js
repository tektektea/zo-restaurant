import React, {Component} from 'react';
import {Header, SearchBar} from "react-native-elements";
import {StyleSheet} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {FlatGrid} from "react-native-super-grid";
import {WHITE} from "../../utils/Colors";
import {ELEVATION} from "../../utils/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    content: {
        margin:16,
        padding:16,
        backgroundColor:WHITE,
        elevation:ELEVATION
    }
});
const fake = [
    {name: "chow", description: "ingredient description", price: 30},
    {name: "Chana", description: "ingredient description", price: 30},
    {name: "Chhawhchhi", description: "ingredient description", price: 30},
    {name: "Nghaum", description: "ingredient description", price: 30},
];

class Grid extends Component {

    onSearch = (value) => {
        console.log(value)
    };

    render() {
        const {search} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Header centerComponent={
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.onSearch}
                        value={search}
                    />
                }/>
                <FlatGrid items={fake}
                          itemContainerStyle={styles.content}
                          itemDimension={120}
                          spacing={10}

                />

            </SafeAreaView>
        );
    }
}

export default Grid;
