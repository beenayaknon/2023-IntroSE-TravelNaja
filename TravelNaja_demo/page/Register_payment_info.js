import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
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
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateErrorMM, setExpiryDateErrorMM] = useState('');
    const [expiryDateErrorYY, setExpiryDateErrorYY] = useState('');
    const [cvvError, setCVVError] = useState('');

    const theme = {
        Button: {
            raised: true,
        },
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 35
        },
        headerText: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        errorText: {
            color: 'red',
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

        if (!expiryDateYY) {
            setExpiryDateErrorMM('Please fill in the expiry date field');
            return;
        }

        if (!cvv) {
            setCVVError('Please fill in the CVV field');
            return;
        }

        if (cardNumber.length != 16) {
            setCardNumberError(' Card number should have 16 digits');
            return;
        }

        // Check if card number contains only numeric characters
        if (!/^\d+$/.test(cardNumber)) {
            setCardNumberError('Card number should only contain numbers (0-9)');
            return;
        }

        // Check if CVV contains only numeric characters
        if (!/^\d+$/.test(cvv)) {
            setCVVError('CVV should only contain numbers (0-9)');
            return;
        }

        const postListRef = ref(db, 'User-account/' + userId);
        update(postListRef, {
            ...route.params,
            cardNumber: cardNumber,
            expiryDateMM: expiryDateMM,
            expiryDateYY: expiryDateYY,
            cvv: cvv
        });

        // If all fields are filled, navigate to the next page
        navigation.navigate('Menu');
        Alert.alert('Success', 'Your application has been submitted successfully.');
    };

    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Text style={styles.headerText}>Payment Information</Text>

                {/* card number input */}
                <Input
                    label="Card Number"
                    value={cardNumber}
                    onChangeText={(text) => {
                        setCardNumber(text);
                        setCardNumberError(''); // Clear error when user starts typing
                    }}
                    placeholder={'  1234 5678 9012 3456'}
                />
                <Text style={styles.errorText}>{cardNumberError}</Text>

                {/* expiry date input */}
                <Input
                    label="Expiry Date"
                    value={expiryDateMM}
                    onChangeText={(text) => {
                        setExpiryDateMM(text);
                        setExpiryDateErrorMM(''); // Clear error when user starts typing
                    }}
                    placeholder={'  MM'}
                />
                <Text style={styles.errorText}>{expiryDateErrorMM}</Text>

                <Input
                    value={expiryDateYY}
                    onChangeText={(text) => {
                        setExpiryDateYY(text);
                        setExpiryDateErrorYY(''); // Clear error when user starts typing
                    }}
                    placeholder={'  YY'}
                />
                <Text style={styles.errorText}>{expiryDateErrorYY}</Text>

                {/* CVV input */}
                <Input
                    label="CVV"
                    value={cvv}
                    onChangeText={(text) => {
                        setCVV(text);
                        setCVVError(''); // Clear error when user starts typing
                    }}
                    placeholder={'  123'}
                />
                <Text style={styles.errorText}>{cvvError}</Text>

                <Button
                    title='Next'
                    onPress={handleNext}
                    buttonStyle={{
                        backgroundColor: '#8C472F'
                    }}
                />

            </ScrollView>
        </ThemeProvider>
    );
};

export default Register_payment_info;
