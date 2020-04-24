import React, {Component} from 'react';
import {Button, Card, Divider, Icon, Input} from "react-native-elements";
import {StyleSheet} from "react-native";
import {ELEVATION} from "../../utils/Dimensions";
import {GRAY, WHITE} from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        elevation: ELEVATION,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: WHITE,
        margin: 16,
        padding: 20
    },
    formItem: {
        marginBottom: 3,
        marginTop: 3,
    },
    divider: {
        height: 1,
        backgroundColor: GRAY,
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },

});

class AuthSetting extends Component {
    static navigationOptions = (props) => ({
        headerTitle: "Text"
    });

    render() {
        const AppName = "Demo";
        const note = "Demo is the name of your restaurant";
        return (
            <Card title={"Set up Password"} style={styles.container}>

                <Input
                    containerStyle={styles.formItem}
                    label={"Password"}
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            type={"material"}
                            name='user'
                            size={24}
                        />
                    }
                />
                <Input
                    containerStyle={styles.formItem}
                    label={"Confirm Password"}
                    placeholder='Confirm Password'
                    leftIcon={
                        <Icon
                            type={"material"}
                            name='user'
                            size={24}
                        />
                    }
                />
                <Divider style={styles.divider}/>

                <Button raised={true} title={"Save"} onPress={() => this.props.navigation.navigate("Main")}/>

            </Card>
        )
    }
}

export default AuthSetting;
