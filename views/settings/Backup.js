import React, {Component} from 'react';
import {View,StyleSheet} from "react-native";
import {Card,Button} from "react-native-elements";

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f4f4f4"
    }
})
class Backup extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Card title={"Back up and restore"}>
                    <Button containerStyle={{marginBottom:20}} raised={true} type={"outline"} icon={{name:"cloud-download",type:"font-awesome",color:"gray"}} title={"Backup"}/>
                    <Button raised={true} type={"outline"} icon={{name:"cloud-upload",type:"font-awesome",color:"gray"}} title={"Recover"}/>
                </Card>
            </View>
        );
    }
}

export default Backup;
