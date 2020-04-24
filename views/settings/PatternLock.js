import React, {Component} from 'react';
import Card from "react-navigation-stack/src/views/StackView/StackViewCard";
import PinView from "../../controls/PinView";

class PatternLock extends Component {
    constructor(props) {
        super(props);
        this.state={
            patternLength:4
        }
    }
    onPatternSet=(pattern)=>{
        this.setState({pattern})
    }

    render() {
        const {patternLength} = this.state;
        return (
            <Card title={"Pattern Lock"}>
                <PinView size={patternLength} onComplete={this.onPatternSet}/>
            </Card>
        );
    }
}

export default PatternLock;
