import React, { Component, createRef } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles';
import SvgBurger from '../../assets/images/burger-menu.svg';
import OpenedMenu from './OpenedMenu';

import lang from '../Languages';

import { connect } from 'react-redux';
import { setRestaurant } from '../redux_components/actions';

import SendCommand from '../screens/Modals/SendCommand';

import Cart from '../../assets/images/cart.svg';
import GoBack from '../../assets/images/goBack.svg';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
        }
        this.refSendCommandModal = createRef();
    }

    cartButton() {
        if (this.props.cart) {
            return (
                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => { this.refSendCommandModal.current.toggleModal() }}>
                        <Cart />
                        <Text style={{ paddingLeft: 10, color: '#fff' }}>{lang.strings.command}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        if (this.props.cartHeader) {
            return (
                <View style={styles.mainHeaderContainer}>
                    <SendCommand table_id = {this.props.table_id} restaurant_id = {this.props.restaurant_id} ref={this.refSendCommandModal} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <GoBack />
                        <Text style={styles.goBack}>{lang.strings.back}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else
            return (
                <View>
                    <View style={styles.mainHeaderContainer}>
                        <SendCommand table_id = {this.props.table_id} restaurant_id = {this.props.restaurant_id} ref={this.refSendCommandModal} />

                        {this.props.goBack ?
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                <GoBack />
                                <Text style={styles.goBack}>{lang.strings.back}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Dashboard')}>
                                <Image style={{ width: '35%', height: 50, resizeMode: 'contain' }} source={require('../../assets/images/logo.png')} />
                            </TouchableWithoutFeedback>
                        }

                        {this.cartButton()}

                        <TouchableOpacity style={{ padding: 8, paddingLeft: 30, alignItems: 'flex-end' }} onPress={() => this.props.onOpenMenu()}>
                            <SvgBurger width="20" height="20" />
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});
const mapDispatchToProps = dispatch => ({
    setRestaurant: (data) => dispatch(setRestaurant(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);