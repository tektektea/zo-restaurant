import React, {Component} from 'react';
import {Button, Card, Icon, Image, Input} from "react-native-elements";
import {ActivityIndicator, StyleSheet} from "react-native";
import {ELEVATION, RADIUS} from "../../utils/Dimensions";
import {GRAY, PRIMARY, WHITE} from "../../utils/Colors";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
    },
    container: {
        borderRadius: RADIUS,
        elevation: ELEVATION,
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: WHITE,
        margin: 16,
        padding: 20,
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

class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({loading: false})
            this.save();
        }, 3000);
        if (this.state.loading) {
        } else {
            this.save();

        }
    }

    save = () => {
        const {navigation} = this.props;
        navigation.push("Login")
    };

    render() {
        const url = require('../../assets/background/material_bg.jpg');

        return (
            <Image containerStyle={styles.background} source={url}>
                {this.state.loading ?
                    <ActivityIndicator style={{alignSelf: "center"}} size={"large"} color={"tomato"}/>

                    :
                    <>
                        <Card title={"Configuration"} containerStyle={styles.container}>
                            <Input
                                containerStyle={styles.formItem}
                                label={"Name"}
                                placeholder='Restaurant Name'
                                leftIcon={
                                    <Icon
                                        color={GRAY}
                                        type={"ionicon"}
                                        name='md-restaurant'
                                        size={20}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.formItem}
                                multiline={true}
                                numberOfLines={3}
                                label={"Address"}
                                placeholder='Address'
                                leftIcon={
                                    <Icon
                                        color={GRAY}
                                        type={"ionicon"}
                                        name='ios-pin'
                                        size={20}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.formItem}
                                label={"Contact"}
                                placeholder='Contact'
                                leftIcon={
                                    <Icon
                                        color={GRAY}
                                        type={"font-awesome"}
                                        name='phone'
                                        size={20}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.formItem}
                                label={"Website"}
                                placeholder='Website url'
                                leftIcon={
                                    <Icon
                                        color={GRAY}
                                        type={"material-community"}
                                        name='web'
                                        size={20}
                                    />
                                }
                            />

                            <Button type={"outline"} raised={true} title={"Save"} onPress={this.save}/>
                        </Card>
                    </>
                }


            </Image>

        );
    }
}

export default Loading;
