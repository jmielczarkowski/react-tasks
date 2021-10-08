/**
 * Selection of repository necessary to browse issues.
 */

import React, { useState } from 'react';
import { Button, Text, TextInput, View, Alert } from 'react-native';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { IsPathCorrect } from '../helpers/regexValidator';
import * as App from '../App';

export const SelectRepository = ({ navigation }) => {

    const[value, onChangeText] = useState('igrgurina/Inventory.Xamarin');

    let nextButtonText = "Press Here!";
    let infoText = "Please enter GitHub username and repository below:";
    let sampleText = "username/repository";
    let nextInfoText = "Find repository and try show issues(s)";
    let helpDefaultText = "igrgurina/Inventory.Xamarin";
    let alertTitle = "Alert";
    let alertMessage = "Please use correct pattern: username/repository"

    let onNextPressed = () => {   
        if(IsPathCorrect(value)) {
            // todo: Check connectivity.
            // todo: Get data online.
            // todo: Navigate to next page.

            navigation.navigate(App.SCREEN_ISSUELIST, { list: 'items' })
        }
        else {
            Alert.alert(alertTitle, alertMessage);
        }          
    };

    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.sectionCenter}>
                <Text style={styles.textCenter}>{infoText}</Text>
                <TextInput
                    style={styles.inputStyle}
                    multiline={false}
                    defaultValue={helpDefaultText}
                    onChangeText={text => onChangeText(text)}
                    value={value} />
                <Text style={styles.textCenter}>{sampleText}</Text>
            </View>
            <View style={styles.sectionBottom}>
                <Text style={styles.textCenter}>{nextInfoText}</Text>
                <Button
                    title={nextButtonText}
                    onPress={onNextPressed}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionCenter: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 36
    },
    sectionBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginVertical: 36,
    },
    inputStyle: {
        textAlign: 'center',
        marginVertical: 36,
        marginHorizontal: 8,
        borderbottomColor: '#000000',
        borderBottomWidth: 1
    },
    textCenter: {
        textAlign: 'center',
    }
});