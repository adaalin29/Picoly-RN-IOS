import React, { Component, createRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';

import lang from '../Languages';

import styles from '../styles';
import Header from '../components/Header';

import ConfirmCommand from './Modals/ConfirmCommand';

import CartItem from '../components/CartItem';

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            otherDetailsMessage: null,
            products:[],
        }

        // this.products = [
        //     { id: 0, title: lang.strings.potatoStew, description: lang.strings.potatoStewDescription, quantity: 2, price: 15 },
        //     { id: 1, title: lang.strings.plainWater, description: '', quantity: 2, price: 10 },
        //     { id: 2, title: lang.strings.potatoStew, description: lang.strings.potatoStewDescription, quantity: 2, price: 15 },
        //     { id: 3, title: lang.strings.plainWater, description: '', quantity: 3, price: 10 },
        // ];

        this.total = 50.00;
        this.currency = 'LEI';
        this.refConfirmCommandModal = createRef();
    }
    componentDidMount(){
        alert(this.props.products);
    }

    flatListHeader() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.cartTitle}>nume masa</Text>
            </View>

        )
    }

    flatListFooter() {
        return (
            <>
                <Text style={styles.otherDetails}>{lang.strings.otherDetails}</Text>
                <TextInput
                    style={styles.otherDetailsInput}
                    multiline={true}
                    numberOfLines={3}
                    value={this.state.otherDetailsMessage}
                    onChangeText={text => this.setState({ otherDetailsMessage: text })}>
                </TextInput>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
                    <Text style={styles.cartTotal}>{lang.strings.total}:</Text>
                    <Text style={styles.cartTotalPrice}>{this.total} {this.currency}</Text>
                </View>

                <TouchableOpacity style={styles.sendButton} onPress={() => { this.refConfirmCommandModal.current.toggleModal() }}>
                    <Text style={styles.sendButtonText}>{lang.strings.sendOrder}</Text>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ConfirmCommand ref={this.refConfirmCommandModal} />

                <Header navigation={this.props.navigation} onOpenMenu={() => this.openMenu()} cartHeader={true} />

                <FlatList
                    ListHeaderComponent={this.flatListHeader()}
                    style={{ backgroundColor: '#fff' }}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.products}
                    renderItem={({ item }) => <CartItem title={item.title} description={item.description} quantity={item.quantity} price={item.price} />}
                    ListFooterComponent={this.flatListFooter()}
                />
            </View>
        )
    }
}