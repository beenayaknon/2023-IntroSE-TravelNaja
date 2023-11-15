import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../components/config';
import { ref, set, push, get, update } from 'firebase/database';

const Register_payment_info = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDateMM, setExpiryDateMM] = useState('');
    const [expiryDateYY, setExpiryDateYY] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardholder, setCardholder] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateErrorMM, setExpiryDateErrorMM] = useState('');
    const [expiryDateErrorYY, setExpiryDateErrorYY] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [cardHolderError, setCardholderError] = useState('');

    const theme = {
        Button: {
            raised: true,
        },
    };

    const styles = StyleSheet.create({
        container: {
            padding: 35,
            backgroundColor: '#ffffff'
        },
        errorText: {
            color: 'red',
        },
        inputContainer: {
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingLeft: 20,
            borderColor: '#FFFFFF',
        },
        inputStyle: {
            marginLeft: 10,
        },
        headerText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#372948',
            textAlign: 'center',
            marginBottom: 30
        },
        inputContainerShort: {
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingLeft: 20,
            borderColor: '#FFFFFF',
            width: '40%'
        }
    });

    const handleNext = () => {
        if (!cardNumber) {
            setCardNumberError('Please fill in the card number field');
            return;
        }
        if (!expiryDateMM) {
            setExpiryDateErrorMM('Please fill in the expiry date field');
            return;
        }

        if (expiryDateMM.length != 2 || !/^\d+$/.test(expiryDateMM)) {
            setExpiryDateErrorMM('Should be MM format (e.g. 05, 10)');
            return;
        }

        if (!expiryDateYY) {
            setExpiryDateErrorYY('Please fill in the expiry date field');
            return;
        }

        if (expiryDateYY.length != 2 || !/^\d+$/.test(expiryDateYY)) {
            setExpiryDateErrorYY('Should be YY format (e.g. 05, 10)');
            return;
        }

        if (!cvv) {
            setCVVError('Please fill in the CVV field');
            return;
        }

        if (!cardholder) {
            setCardholderError('Please fill in the Cardholder name');
            return;
        }

        // Check if card number contains only numeric characters
        if (!/^\d+$/.test(cardNumber || cardNumber.length != 16)) {
            setCardNumberError('Card number should contain 16 digits (0-9)');
            return;
        }

        // Check if CVV contains only numeric characters
        if (!/^\d+$/.test(cvv)) {
            setCVVError('CVV should only contain numbers (0-9)');
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(cardholder)) {
            setCardholderError('Cardholder name should not contain numbers or special characters');
            return;
        }

        const postListRef = ref(db, 'User-account/' + userId);
        update(postListRef, {
            ...route.params,
            cardNumber: cardNumber,
            expiryDateMM: expiryDateMM,
            expiryDateYY: expiryDateYY,
            cvv: cvv,
            cardholder: cardholder
        });

        navigation.navigate('Profile', {
            userId: userId
        });
        Alert.alert('Success', 'Your application has been submitted successfully.');
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.headerText}>Payment Information</Text>

            <Input
                label="Card Number"
                value={cardNumber}
                onChangeText={(text) => {
                    setCardNumber(text);
                    setCardNumberError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'1234567891011121'}
            />
            <Text style={styles.errorText}>{cardNumberError}</Text>


            <Input
                label="Expiry Date"
                value={expiryDateMM}
                onChangeText={(text) => {
                    setExpiryDateMM(text);
                    setExpiryDateErrorMM('');
                }}
                inputContainerStyle={styles.inputContainerShort}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'MM'}
            />
            <Text style={styles.errorText}>{expiryDateErrorMM}</Text>

            <Input
                value={expiryDateYY}
                onChangeText={(text) => {
                    setExpiryDateYY(text);
                    setExpiryDateErrorYY('');
                }}
                inputContainerStyle={styles.inputContainerShort}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'YY'}
            />
            <Text style={styles.errorText}>{expiryDateErrorYY}</Text>


            <Input
                label="CVV"
                value={cvv}
                onChangeText={(text) => {
                    setCVV(text);
                    setCVVError('');
                }}
                inputContainerStyle={styles.inputContainerShort}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'123'}
            />
            <Text style={styles.errorText}>{cvvError}</Text>

            <Input
                label="Cardholder Name"
                value={cardholder}
                onChangeText={(text) => {
                    setCardholder(text);
                    setCardholderError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'Cardholder name'}
            />
            <Text style={styles.errorText}>{cardHolderError}</Text>

            <Button
                title='Next'
                onPress={handleNext}
                buttonStyle={{
                    backgroundColor: '#372948',
                    padding: 10,
                    marginTop: 20,
                    borderRadius: 50,
                }}
                titleStyle={{
                    color: '#ffffff',
                    fontSize: 18,
                }}
            />
        </ScrollView>
    );
};

export default Register_payment_info;
