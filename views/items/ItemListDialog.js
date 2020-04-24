import React, {useEffect} from 'react';
import {Avatar, Button, ListItem, Overlay, Text} from "react-native-elements";
import {FlatList, StyleSheet, ToastAndroid, View} from "react-native";
import {connect} from "react-redux";
import {all} from "../../redux/actions/itemActions";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1
    },
    title: {
        fontSize: 21,
        paddingTop: 10,
        paddingLeft: 10,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: "100"
    }
});


const ItemListDialog = ({open, all, items, onClose, onSelect}) => {

    // useEffect(() => all().then(msg=>console.log(msg)).catch(error => ToastAndroid.show(error,ToastAndroid.SHORT)),[]);

    // all()
    const onPressItem = (item) => {
        let lineOrder = {
            item: item.name,
            qty: 1,
            price:item.price,
            amount: item.price
        };
        onSelect(lineOrder)
    };
    const keyExtractor = (index) => index.toString();

    const renderItem = (item) => (
        <ListItem
            key={item.name}
            onPress={() => onPressItem(item)}
            title={item.name}
            subtitle={'\u20B9' + item.price}
            leftAvatar={<Avatar rounded title={item.name.substring(0, 1)}/>}
            bottomDivider
            rightIcon={{name: "angle-right", type: "font-awesome", onPress: () => onPressItem(item)}}
        />
    );

    return (
        <>
            <Overlay isVisible={open}
                     width={320}
                     height={500}
                     borderRadius={6}
            >
                <View style={styles.container}>
                    {/*<Text h4={true}>Select Food</Text>*/}
                    <Text style={styles.title}>List of Item/Food</Text>
                    <Text style={styles.subtitle}>Please select item/food from below</Text>
                    {/*<Input leftIcon={{name:"search",type:"font-awesome",color:"gray"}}*/}
                    {/*       containerStyle={{*/}
                    {/*           borderWidth:2,*/}
                    {/*           borderRadius:6,*/}
                    {/*           borderColor:GRAY*/}
                    {/*       }}*/}
                    {/*        placeholder={"Search Item"}*/}
                    {/*/>*/}
                    {items.length === 0 &&
                    <Text style={{paddingLeft: 10, paddingTop: 100}}>No item/food available : Please add
                        item/food</Text>}
                    <FlatList
                        keyExtractor={(item, index) => keyExtractor(index)}
                        data={items}
                        renderItem={({item}) => renderItem(item)}
                    />
                </View>
                <Button onPress={onClose} type={"clear"} style={{position: "absolute", bottom: 10}} title={"close"}/>
            </Overlay>

        </>
    )

};

// List.propTypes = {
//     customers: PropTypes.array.isRequired
// };
const mapStateToProps = state => ({
    items: state.itemData.items
});
const mapDispatchToProps = {
    all
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemListDialog);
