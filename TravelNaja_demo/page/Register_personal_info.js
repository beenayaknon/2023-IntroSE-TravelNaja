import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements';
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
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 30
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

        const postListRef = ref(db, 'User-account/' + userId);
        update(postListRef, {
            ...route.params,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            favoriteCar: favoriteCar,
            favoriteHotel: favoriteHotel
        });

        navigation.navigate('Register_payment_info', {
            userId: userId
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{
                paddingTop: 50,
                backgroundColor: '#372948',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25
            }}>
                <Text style={styles.headerText}>Personal Information</Text>
            </View>
            <View style={{
                padding: 35,
                marginTop: 10
            }}>
            <Input
                label="First name"
                value={firstName}
                onChangeText={(text) => {
                    setFirstName(text);
                    setFirstNameError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                labelStyle={{
                    color: '#372948'
                }}
                placeholder={'firstname'}

            />
            <Text style={styles.errorText}>{firstNameError}</Text>

            <Input
                label="Last name"
                value={lastName}
                onChangeText={(text) => {
                    setLastName(text);
                    setLastNameError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={'lastname'}
                labelStyle={{
                    color: '#372948'
                }}
            />
            <Text style={styles.errorText}>{lastNameError}</Text>

            <Input
                label="Mobile"
                value={mobile}
                onChangeText={(text) => {
                    setMobile(text);
                    setMobileError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={'0999999999'}
                labelStyle={{
                    color: '#372948'
                }}
            />
            <Text style={styles.errorText}>{mobileError}</Text>

            <Input
                label="Favorite Car"
                value={favoriteCar}
                onChangeText={(text) => {
                    setFavoriteCar(text);
                    setFavoriteCarError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={'e.g., Sedan'}
                labelStyle={{
                    color: '#372948'
                }}
            />

            <Input
                label="Favorite Hotel"
                value={favoriteHotel}
                onChangeText={(text) => {
                    setFavoriteHotel(text);
                    setFavoriteHotelError('');
                }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder={'e.g., Resorts'}
                labelStyle={{
                    color: '#372948'
                }}
            />


            <Button
                title='Next'
                onPress={handleNext}
                buttonStyle={{
                    backgroundColor: '#372948',
                    padding: 10,
                    marginBottom: 20,
                    borderRadius: 50,
                }}
                titleStyle={{
                    color: '#ffffff',
                    fontSize: 18,
                }}
            />
            </View>
        </ScrollView>
    );
};

export default Register_personal_info;
