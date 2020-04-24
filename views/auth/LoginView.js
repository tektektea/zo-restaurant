import React, {Component} from 'react';
import {Avatar, Button, Divider, Icon, Image, Input, Text} from "react-native-elements";
import {View,StyleSheet} from "react-native";
import {ELEVATION, PADDING, RADIUS} from "../../utils/Dimensions";
import {GRAY, PRIMARY, WHITE} from "../../utils/Colors";
import PinView from "../../controls/PinView";

const styles=StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flex:1,
    },
    center:{
       alignSelf:"center"
    },
    divider:{
       height: 1,
       backgroundColor: GRAY,
       marginTop:10,
       marginBottom:10
    },
    icon:{
        margin:16,
        height:100,
        width: 100,
        alignSelf: "center",
        backgroundColor:WHITE,
        elevation: ELEVATION
    },
    content:{
        borderRadius:RADIUS,
        backgroundColor:"transparent",
        justifyContent:"flex-start",
        padding:16,
        marginTop: 40,
        marginBottom: 90
    }
})
class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginError:"",
            pattern:"1234"
        }
    }

    componentDidMount(): void {
        this.props.navigation.navigate("Main")
    }

    checkPattern=(val)=>{
        const {pattern} = this.state;
        if (pattern === val.join("")) {
            this.setState({loginError:""})
            this.props.navigation.navigate("Main")
        }else{
            this.setState({loginError:"Unauthorized"})
        }
    }
    render() {
        const url=require('../../assets/background/material_bg.jpg');
        const avatarUrl=require('../../assets/background/material_bg.jpg')
        const AppName = "Demo";
        const note = "Demo is the name of your restaurant";
        const {pattern, loginError} = this.state;
        return (
            <Image  source={url} containerStyle={styles.container}>

                <View style={styles.content}>
                    <Avatar containerStyle={styles.icon}
                            size={"xlarge"}
                        rounded
                        icon={{name:"shop",type:"entypo",color:PRIMARY}}
                    />
                    <PinView onComplete={this.checkPattern} size={pattern.length} error={loginError}/>

                    {/*<Text style={styles.center} h4={true}>{AppName}</Text>*/}

                    {/*<Input*/}
                    {/*    ty*/}
                    {/*    label={"Password"}*/}
                    {/*    placeholder='Password'*/}
                    {/*    leftIcon={*/}
                    {/*        <Icon*/}
                    {/*            color={GRAY}*/}
                    {/*            type={"material"}*/}
                    {/*            name='lock'*/}
                    {/*            size={24}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*/>*/}
                    {/*/!*<Divider style={styles.divider}/>*!/*/}
                    {/*<Button raised={true}  title={"login"} onPress={()=>this.props.navigation.navigate("Main")}/>*/}
                    {/*<Button containerStyle={{marginTop:20}}  raised={true}  title={"Set up Restaurant"} onPress={()=>this.props.navigation.navigate("Register")}/>*/}
                </View>

            </Image>
        )
    }
}

export default LoginView;
