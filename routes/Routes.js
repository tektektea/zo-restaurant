import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import LoginView from "../views/auth/LoginView";
import AuthSetting from "../views/auth/AuthSetting";
import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Header, Icon} from "react-native-elements";
import SideNav from "../controls/SideNav";
import Tables from "../views/tables/Index";
import Customers from "../views/customers/Index";
import Items from "../views/items/Index";
import Loading from "../views/auth/Loading";
import NewOrder from "../views/orders/NewOrder";
import Home from "../views/home/Home";
import RecentOrders from "../views/orders/RecentOrders";
import Detail from "../views/customers/Detail";
import Setting from "../views/settings/Setting";
import Report from "../views/reports/Report";
import Dashboard from "../views/dashboard/Dashboard";
import Backup from "../views/settings/Backup";
import Taxes from "../views/taxes/Taxes";

const AuthStack = createStackNavigator({
    Loading: {
        screen: Loading,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginView,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: AuthSetting,
        navigationOptions: {
            headerTitle: "Setup Lock"
        }
    },
});
const HomeRoute = createBottomTabNavigator({
    Dashboard: {
        screen: Dashboard
    },
    NewOrder: {
        screen: Home,
        displayName: "New Order"
    },
    Orders: {
        screen: RecentOrders,
        displayName: "Recent orders"
    },

}, {
    defaultNavigationOptions: ({navigation}) => ({

        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let iconName;
            switch (routeName) {
                case 'NewOrder':
                    iconName = 'shopping-cart';
                    break;
                case 'Orders':
                    iconName = 'list-alt';
                    break;
                case 'Dashboard':
                    iconName = "dashboard";
                    break;
                default:
                    iconName = "user";
                    break;
            }

            // You can return any component that you like here!
            return <Icon type={"font-awesome"} name={iconName} size={18} color={tintColor}/>;
        },
    }),
    tabBarOptions: {
        activeTintColor: "#2089dc",
        inactiveTintColor: "gray",
        style: {
            elevation: 5
        }
    }
});

const MainRoute = createDrawerNavigator({
    // Dashboard: {
    //     screen: MainScreen,
    // },
    Home: {
        title: "Dawr",
        screen: HomeRoute,
        icon: () => <Icon name={"store"} type={"material-community"}/>
    },
    Items: {
        screen: Items
    },
    Tables: {
        screen: Tables
    },
    Customers: {
        screen: Customers
    },
    Taxes: {
        screen: Taxes
    },
    Report: {
        screen: Report
    }
}, {
    initialRouteName: "Home",
    drawerBackgroundColor: "#f4f4f4",
    drawerType: "slide",
    contentComponent: (props) => <SideNav {...props}/>,

});
// const CustomerStack=createStackNavigator({
//     Main:MainRoute,
// })
const SettingStack = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: {
            header: null
        }
    },
    Backup: {
        screen: Backup,
        navigationOptions: {
            header: null
        }
    },
    Lock: {
        screen: Backup,
        navigationOptions: {
            header: null
        }
    }
});
const MainStack = createStackNavigator({
    App: {
        screen: MainRoute,
        navigationOptions: ({navigation}) => ({
            header: (
                <Header
                    style={{marginTop: 0}}
                    collapsable={true}
                    placement="center"
                    leftComponent={{
                        iconStyle: {padding: 10},
                        icon: 'align-right',
                        type: "foundation",
                        color: '#fff',
                        size: 28,
                        onPress: () => navigation.toggleDrawer()
                    }}
                    centerComponent={{text: 'Thingpui dawr', style: {fontSize: 18, fontWeight: "bold", color: '#fff'}}}
                    rightComponent={{
                        onPress: () => navigation.push("Setting"),
                        icon: 'gear', type: "font-awesome", color: '#fff'
                    }}
                />
            )
        })
    },
    CustomerDetail: {
        screen: Detail,
        navigationOptions: ({navigation}) => ({
            header: (
                <Header
                    style={{marginTop: 0}}
                    collapsable={true}
                    placement="center"
                    centerComponent={{
                        text: navigation.state.params.customer ? navigation.state.params.customer.name + "'s Order" : "Orders",
                        style: {fontSize: 18, fontWeight: "bold", color: '#fff'}
                    }}
                    leftComponent={{
                        onPress: () => navigation.pop(),
                        iconStyle: {padding: 10}, icon: 'angle-left', type: "font-awesome", color: '#fff'
                    }}
                />
            )
        })
    },
    Setting: {
        screen: SettingStack,
        navigationOptions: ({navigation}) => ({
            header: (
                <Header
                    style={{marginTop: 0}}
                    collapsable={true}
                    placement="center"
                    centerComponent={{text: 'Setting', style: {fontSize: 18, fontWeight: "bold", color: '#fff'}}}
                    leftComponent={{
                        onPress: () => navigation.pop(),
                        iconStyle: {padding: 10}, icon: 'angle-left', type: "font-awesome", color: '#fff'
                    }}
                />
            )
        })
    },
});

const AppRoute = createSwitchNavigator({
    Auth: AuthStack,
    Main: MainStack
});

export default createAppContainer(AppRoute);


