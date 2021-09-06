import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles';
import lang from '../../Languages';

import Cancel from '../../../assets/images/cancel.svg';

export default class ConfirmCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    toggleModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.toggleModal() }}>

                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.75)' }}>
                    <View style={{ width: '80%', backgroundColor: '#FFF', padding: 30, borderRadius: 5 }}>
                        <TouchableOpacity onPress={() => this.toggleModal()} style={{ alignSelf: 'flex-end', paddingBottom: 50 }}>
                            <Cancel />
                        </TouchableOpacity>
                        <Text style={styles.cartModalTitle}>{lang.strings.confirmCommand}</Text>
                        <Text style={styles.cartModalMessage}>{lang.strings.checkCommand}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 100 }}>
                            <TouchableOpacity
                                style={[styles.cartModalButton, { marginRight: 10 }]}
                                onPress={() => { this.toggleModal() }}>

                                <Text style={styles.cartModalButtonText}>{lang.strings.no}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cartModalButton}
                                onPress={() => { this.toggleModal() }}>

                                <Text style={styles.cartModalButtonText}>{lang.strings.yes}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </Modal>
        )
    }
}