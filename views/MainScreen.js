import React, {Component} from 'react';
import {Text,Header} from "react-native-elements";
import {View} from "react-native";

class MainScreen extends Component {
    componentDidMount(): void {
        // const {navigation} = this.props;
        // navigation.openDrawer();
    }

    render() {
        return (
            <View>

                <Text>
                    Main
                </Text>
            </View>
        );
    }
}
// MainScreen.navigationOptions={
//         header:(
//             <Header
//                 placement="left"
//                 leftComponent={{ icon: 'menu', color: '#fff' }}
//                 centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
//                 rightComponent={{ icon: 'home', color: '#fff' }}
//             />
//         )
// }

export default MainScreen;
