import React, { Component, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from '../styles';
import lang from '../Languages';

import FooterCart from '../../assets/images/footerCart.svg';

export default class CartFooter extends Component {
    constructor(props) {
        super(props);
        this.total = 120;
        this.currency = 'LEI';
        this.state = {
            products: [],
        }
        
    }

    componentDidMount() {
        if (this.props.products)
            this.setState({products: this.props.products});
    }

    updateCart(product) {
        var products = this.state.products;
        products.push(product);
        this.setState({products: products});
    } 

    render() {
        return (
            (this.state.products.length ?
                (
                    <Animatable.View
                        useNativeDriver={true}
                        animation={this.state.products.length ? 'fadeInLeft' : 'fadeOutRight'}
                        style={{ flexDirection: 'row', width: '100%', height: 60, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#E32340' }}>

                        <TouchableOpacity products = {this.state.products}
                            onPress={() => this.props.navigation.navigate('Cart')}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FooterCart />
                            <Text style={[styles.footerCartText, { paddingLeft: 10 }]}>{lang.strings.openCart}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.footerCartText}>{lang.strings.total}: </Text>
                            <Text style={styles.footerCartText}>{this.total} {this.currency}</Text>
                        </View>
                    </Animatable.View>
                )
                :
                    <></>
            )
        )
    }
}