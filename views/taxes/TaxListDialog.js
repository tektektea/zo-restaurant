import React, {useEffect} from 'react';
import {Avatar, Button, ListItem, Overlay, Text} from "react-native-elements";
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {all} from "../../redux/actions/taxActions";

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


const TaxListDialog =({open,all,taxes,onClose,onSelect}) => {

    // useEffect(()=>all().then(msg=>console.log(msg)).catch(error => console.log(error)),[])
    const keyExtractor = (index) => index.toString();

    const renderItem = (item) => (
        <ListItem
            onPress={()=>onSelect(item)}
            title={item.name}
            subtitle={item.percent+"%"}
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
                    <Text style={styles.title}>List of Tax</Text>
                    <Text style={styles.subtitle}>Please select tax from below</Text>
                    <FlatList
                        keyExtractor={(item,index)=>keyExtractor(index)}
                        data={taxes}
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
    taxes:state.taxData.taxes
})
const mapDispatchToProps={
    all
}
export default connect(mapStateToProps,mapDispatchToProps) (TaxListDialog);
