import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../components/config';
import { ref, set, push, get, update } from 'firebase/database';

const Register_personal_info = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || {};

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [favoriteCar, setFavoriteCar] = useState('');
    const [favoriteHotel, setFavoriteHotel] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [favoriteCarError, setFavoriteCarError] = useState('');
    const [favoriteHotelError, setFavoriteHotelError] = useState('');

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
        if (!firstName) {
            setFirstNameError('Please fill in the first name field');
            return;
        }
        if (!lastName) {
            setLastNameError('Please fill in the last name field');
            return;
        }
        if (!mobile) {
            setMobileError('Please fill in the mobile field');
            return;
        }

        if (!/^[A-Za-z]+$/.test(firstName)) {
            setFirstNameError('First name should not contain numbers (0-9) or special characters');
            return;
        }

        if (!/^[A-Za-z]+$/.test(lastName)) {
            setLastNameError('Last name should not contain numbers (0-9) or special characters');
            return;
        }

        if (!/^\d+$/.test(mobile)) {
            setMobileError('Please enter only numbers (0-9)');
            return;
        }

        if (mobile.length != 10) {
            setMobileError('Mobile number should have 10 digits');
            return;
        }

        const postListRef = ref(db, 'User-account/'+userId);
        update(postListRef, {
            ...route.params,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            favoriteCar: favoriteCar,
            favoriteHotel: favoriteHotel
        });

        // Navigate to the next page
        navigation.navigate('Register_payment_info', {
            userId: userId
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Text style={styles.headerText}>Personal Information</Text>

                <Input
                    label="First name"
                    value={firstName}
                    onChangeText={(text) => {
                        setFirstName(text);
                        setFirstNameError('');
                    }}
                    placeholder={'  firstname'}
                />
                <Text style={styles.errorText}>{firstNameError}</Text>

                <Input
                    label="Last name"
                    value={lastName}
                    onChangeText={(text) => {
                        setLastName(text);
                        setLastNameError('');
                    }}
                    placeholder={'  lastname'}
                />
                <Text style={styles.errorText}>{lastNameError}</Text>

                <Input
                    label="Mobile"
                    value={mobile}
                    onChangeText={(text) => {
                        setMobile(text);
                        setMobileError('');
                    }}
                    placeholder={'  0999999999'}
                />
                <Text style={styles.errorText}>{mobileError}</Text>

                <Input
                label="Favorite Car"
                value={favoriteCar}
                onChangeText={(text) => {
                    setFavoriteCar(text);
                    setFavoriteCarError('');
                }}
                placeholder={'  e.g., Sedan'}
            />

            <Input
                label="Favorite Hotel"
                value={favoriteHotel}
                onChangeText={(text) => {
                    setFavoriteHotel(text);
                    setFavoriteHotelError(''); 
                }}
                placeholder={'  e.g., Resorts'}
            />


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

export default Register_personal_info;
