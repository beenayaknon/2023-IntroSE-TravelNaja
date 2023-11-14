import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { ref, set, push, get, update } from 'firebase/database';
import { db } from '../components/config';

const ApplyGuide = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [skills, setSkills] = useState('');
    const [experiences, setExperiences] = useState('');
    const [travelStyle, setTravelStyle] = useState('');
    const [tourProgram, setTourProgram] = useState('');

    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorIdNumber, setErrorIdNumber] = useState('');
    const [errorMobile, setErrorMobile] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSkills, setErrorSkills] = useState('');
    const [errorExperiences, setErrorExperiences] = useState('');
    const [errorTravelStyle, setErrorTravelStyle] = useState('');
    const [errorTourProgram, setErrorTourProgram] = useState('');

    const theme = {
        Button: {
            raised: true,
        },
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ffffff'
        },
        headerText: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        errorText: {
            color: 'red',
        },
        inputContainer: {
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingLeft: 20,
            borderColor: '#FFFFFF',
            paddingRight: 20
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
        }
    });

    const handleSubmit = () => {
        if (!firstName) {
            setErrorFirstName('Please enter your first name');
            return;
        }

        if (!lastName) {
            setErrorLastName('Please enter your last name');
            return;
        }

        if (!/^[A-Za-z]+$/.test(firstName)) {
            setErrorFirstName('First name should not contain numbers (0-9) or special characters');
            return;
        }

        if (!/^[A-Za-z]+$/.test(lastName)) {
            setErrorLastName('Last name should not contain numbers (0-9) or special characters');
            return;
        }

        if (!idNumber) {
            setErrorIdNumber('Please enter your identification number');
            return;
        }

        if (!/^\d+$/.test(idNumber)) {
            setErrorIdNumber('Please enter only numbers (0-9)');
            return;
        }

        if (!mobile) {
            setErrorMobile('Please enter your mobile number');
            return;
        }

        if (!/^\d+$/.test(mobile)) {
            setErrorMobile('Please enter only numbers (0-9)');
            return;
        }

        if (mobile.length != 10) {
            setErrorMobile('Mobile number should have 10 digits');
            return;
        }

        if (!email) {
            setErrorEmail('Please enter your email');
            return;
        }

        if (!skills) {
            setErrorSkills('Please enter your skills');
            return;
        }

        if (!experiences) {
            setErrorExperiences('Please enter your experiences');
            return;
        }

        if (!travelStyle) {
            setErrorTravelStyle('Please enter your travel style');
            return;
        }

        if (!tourProgram) {
            setErrorTourProgram('Please enter your tour program');
            return;
        }

        const postListRef = ref(db, 'Register-guide/');
        const newPostRef = push(postListRef);
        const newPostKey = newPostRef.key;
        set(newPostRef, {
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            mobile: mobile,
            email: email,
            skills: skills,
            experiences: experiences,
            travelStyle: travelStyle,
            tourProgram: tourProgram,
            guideID: newPostKey
        })
            .then(() => {
                // Data successfully saved
                navigation.navigate('Menu');
                Alert.alert('Success', 'Your application has been submitted successfully.');
            })
            .catch((error) => {
                console.error('Error saving data to Firebase:', error.message);
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
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: 30
                }}>Apply Travel Naja Local Guide</Text>
            </View>

            <View style={{
                padding: 35,
                marginTop: 10
            }}>
                <Input
                    label="First name"
                    placeholder={'firstname'}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorFirstName ? <Text style={styles.errorText}>{errorFirstName}</Text> : null}

                <Input
                    label="Last name"
                    placeholder={'lastname'}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorLastName ? <Text style={styles.errorText}>{errorLastName}</Text> : null}

                <Input
                    label="Identification number"
                    placeholder={'9999999999999'}
                    value={idNumber}
                    onChangeText={(text) => setIdNumber(text)}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorIdNumber ? <Text style={styles.errorText}>{errorIdNumber}</Text> : null}

                <Input
                    label="Mobile"
                    placeholder={'0999999999'}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorMobile ? <Text style={styles.errorText}>{errorMobile}</Text> : null}

                <Input
                    label="Email"
                    placeholder={'email@mail.com'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

                <Input
                    label="Skills"
                    placeholder={'skills'}
                    value={skills}
                    onChangeText={(text) => setSkills(text)}
                    inputContainerStyle={{ ...styles.inputContainer, height: 100 }}
                    inputStyle={{ ...styles.inputStyle, textAlignVertical: 'top' }}
                    multiline={true}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorSkills ? <Text style={styles.errorText}>{errorSkills}</Text> : null}

                <Input
                    label="Experiences"
                    placeholder={'experiences'}
                    value={experiences}
                    onChangeText={(text) => setExperiences(text)}
                    inputContainerStyle={{ ...styles.inputContainer, height: 100 }}
                    inputStyle={{ ...styles.inputStyle, textAlignVertical: 'top' }}
                    multiline={true}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorExperiences ? <Text style={styles.errorText}>{errorExperiences}</Text> : null}

                <Input
                    label="Travel Style"
                    placeholder={'travel style'}
                    value={travelStyle}
                    onChangeText={(text) => setTravelStyle(text)}
                    inputContainerStyle={{ ...styles.inputContainer, height: 100 }}
                    inputStyle={{ ...styles.inputStyle, textAlignVertical: 'top' }}
                    multiline={true}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorTravelStyle ? <Text style={styles.errorText}>{errorTravelStyle}</Text> : null}

                <Input
                    label="Tour program"
                    placeholder={'tour program'}
                    value={tourProgram}
                    onChangeText={(text) => setTourProgram(text)}
                    inputContainerStyle={{ ...styles.inputContainer, height: 100 }}
                    multiline={true}
                    inputStyle={{ ...styles.inputStyle, textAlignVertical: 'top' }}
                    labelStyle={{
                        color: '#372948'
                    }}
                />
                {errorTourProgram ? <Text style={styles.errorText}>{errorTourProgram}</Text> : null}

                <Button
                    title='Submit'
                    onPress={handleSubmit}
                    buttonStyle={{
                        backgroundColor: '#372948',
                        padding: 10,
                        elevation: 0,
                        marginBottom: 20,
                        borderRadius: 50
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default ApplyGuide;
