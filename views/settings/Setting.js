import React, {Component} from 'react';
import {Card, ListItem} from "react-native-elements";
import {GRAY} from "../../utils/Colors";
import Restaurant from "./Restaurant";
import {ToastAndroid} from "react-native";
import {changeProfile} from "../../redux/actions/settingAction";
import {connect} from "react-redux";

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openProfile: false
        }
    }
    changeProfile=(restaurant)=>{
        const {changeProfile} = this.props;
        this.setState({openProfile: false})
        changeProfile(restaurant)
    }

    render() {
        const {openProfile} = this.state;
        const {profile,error,success} = this.props;

        if (error || success) {
            ToastAndroid.show(error || success, ToastAndroid.SHORT);
        }
        return (
            <Card containerStyle={{borderRadius: 6}}>
                <ListItem leftIcon={{name: "md-restaurant", type: "ionicon", color: GRAY}}
                          title={"Restaurant Profile"}
                          bottomDivider={true}
                          onPress={()=>this.setState({openProfile:true})}
                          chevron={true}/>
                <ListItem leftIcon={{name: "lock-pattern", type: "material-community", color: GRAY}}
                          title={"Authentication"}
                          bottomDivider={true}
                          chevron={true}/>
                <ListItem leftIcon={{name: "ios-print", type: "ionicon", color: GRAY}}
                          title={"Printer"}
                          bottomDivider={true}
                          chevron={true}/>
                <ListItem leftIcon={{name: "ios-notifications", type: "ionicon", color: GRAY}}
                          title={"Notification"}
                          bottomDivider={true}
                          chevron={true}/>

                <ListItem leftIcon={{name: "database", type: "font-awesome", color: GRAY}}
                          onPress={() => this.props.navigation.push("Backup")}
                          title={"Back up and Restore"}
                          bottomDivider={true}
                          chevron={true}/>

                {openProfile && <Restaurant restaurant={profile}
                                            open={openProfile}
                                            onClose={() => this.setState({openProfile: false})}
                                            onChange={this.changeProfile}/>}
            </Card>

        );
    }
}
const mapStateToProps=state=>({
    profile:state.settingData.profile,
    error:state.settingData.error,
    success:state.settingData.success,
})

const mapDispatchToProps={
    changeProfile
}
export default connect(mapStateToProps,mapDispatchToProps) (Setting);
