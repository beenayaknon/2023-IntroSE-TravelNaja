import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
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
            paddingLeft: 35,
            paddingRight: 35,
            paddingBottom: 35,
        },
        headerText: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        errorText: {
            color: 'red',
            marginTop: 5,
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
                // You may also want to navigate to another screen or perform other actions upon success
            })
            .catch((error) => {
                // Handle any errors that occur during the save operation
                console.error('Error saving data to Firebase:', error.message);
            });



    };

    return (
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Text style={styles.headerText}>Apply Travel Naja Local Guide</Text>

                <Input
                    label="First name"
                    placeholder={'  firstname'}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                {errorFirstName ? <Text style={styles.errorText}>{errorFirstName}</Text> : null}

                <Input
                    label="Last name"
                    placeholder={'  lastname'}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                {errorLastName ? <Text style={styles.errorText}>{errorLastName}</Text> : null}

                <Input
                    label="Identification number"
                    placeholder={'  9999999999999'}
                    value={idNumber}
                    onChangeText={(text) => setIdNumber(text)}
                />
                {errorIdNumber ? <Text style={styles.errorText}>{errorIdNumber}</Text> : null}

                <Input
                    label="Mobile"
                    placeholder={'  0999999999'}
                    value={mobile}
                    onChangeText={(text) => setMobile(text)}
                />
                {errorMobile ? <Text style={styles.errorText}>{errorMobile}</Text> : null}

                <Input
                    label="Email"
                    placeholder={'  email'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

                <Input
                    label="Skills"
                    placeholder={'  skills'}
                    value={skills}
                    onChangeText={(text) => setSkills(text)}
                />
                {errorSkills ? <Text style={styles.errorText}>{errorSkills}</Text> : null}

                <Input
                    label="Experiences"
                    placeholder={'  experiences'}
                    value={experiences}
                    onChangeText={(text) => setExperiences(text)}
                />
                {errorExperiences ? <Text style={styles.errorText}>{errorExperiences}</Text> : null}

                <Input
                    label="Travel Style"
                    placeholder={'  travel style'}
                    value={travelStyle}
                    onChangeText={(text) => setTravelStyle(text)}
                />
                {errorTravelStyle ? <Text style={styles.errorText}>{errorTravelStyle}</Text> : null}

                <Input
                    label="Tour program"
                    placeholder={'  tour program'}
                    value={tourProgram}
                    onChangeText={(text) => setTourProgram(text)}
                />
                {errorTourProgram ? <Text style={styles.errorText}>{errorTourProgram}</Text> : null}

                <Button
                    title='Submit'
                    onPress={handleSubmit}
                    buttonStyle={{
                        backgroundColor: '#8C472F'
                    }}
                />
            </ScrollView>
        </ThemeProvider>
    );
};

export default ApplyGuide;
