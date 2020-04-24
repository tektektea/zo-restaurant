import React, {useEffect} from 'react';
import {Avatar, Button, ListItem, Overlay, Text} from "react-native-elements";
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {all} from "../../redux/actions/customerActions";

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flex:1
    },
    title:{
        fontSize:21,
        paddingTop:10,
        paddingLeft:10,
        fontWeight:"bold"
    },
    subtitle:{
        fontSize: 14,
        paddingLeft:10,
        fontWeight: "100"
    }
});


const CustomerListDialog =({open,all,customers,onClose,onSelect}) => {

    // useEffect(()=>all(),[])

    const keyExtractor = (index) => index.toString();

    const renderItem = (item) => (
        <ListItem
            onPress={()=>onSelect(item)}
            title={item.name}
            subtitle={item.contact}
            leftAvatar={<Avatar rounded title={item.name.substring(0, 1)}/>}
            bottomDivider
            chevron={true}
        />
    );

        return (
            <>
                <Overlay isVisible={open}
                         width={320}
                         borderRadius={6}
                         height={450}
                >
                <View style={styles.container}>
                    <Text style={styles.title}>List of Customers</Text>
                    <Text style={styles.subtitle}>Please select customer from below</Text>

                    {customers.length===0 && <Text style={{paddingLeft:10,paddingTop:100}}>No customer available : Please add customer</Text>}

                    <FlatList
                        keyExtractor={(item,index)=>keyExtractor(index)}
                        data={customers}
                        renderItem={({item})=>renderItem(item)}
                    />
                </View>
                    <Button onPress={onClose} type={"clear"} style={{position:"absolute",bottom:10}} title={"close"}/>

                </Overlay>

            </>
        )

}

// List.propTypes = {
//     customers: PropTypes.array.isRequired
// };
const mapStateToProps=state=>({
    customers:state.customerData.customers
})

const mapDispatchToProps={
    all
}

export default connect(mapStateToProps,mapDispatchToProps) (CustomerListDialog);
