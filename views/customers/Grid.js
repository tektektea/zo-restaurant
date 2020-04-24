import React, {Component} from 'react'
import {FlatList, ScrollView} from 'react-native'
import Detail from "./Detail";

export default class Grid extends Component {
    constructor(props) {
        super(props)
    }

    viewOrderDetail = (order) => console.log(order);
    renderCard = (customer) => (
        <Detail key={customer.id} customer={customer} onOrderPressed={this.viewOrderDetail}/>
    );

    handleYup(card) {
        console.log(`Yup for ${card.name}`)
    }

    handleNope(card) {
        console.log(`Nope for ${card.name}`)
    }

    handleMaybe(card) {
        console.log(`Maybe for ${card.name}`)
    }

    render() {
        const {customers} = this.props;
        return (
            <ScrollView>

                <FlatList data={customers} renderItem={({item}) => this.renderCard(item)}
                          horizontal={true}
                          collapsable={true}
                          style={{width: "100%", height: '100%'}}
                />
            </ScrollView>

        )
    }
}


