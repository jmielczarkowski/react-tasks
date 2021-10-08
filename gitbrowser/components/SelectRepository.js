/**
 * Selection of repository necessary to browse issues.
 */

const { Octokit } = require("@octokit/core");

import React, { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View, Alert, NetInfo } from 'react-native';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { IsPathCorrect } from '../helpers/regexValidator';
import * as App from '../App';

export const SelectRepository = ({ navigation }) => {
    const [value, onChangeText] = useState('githubtraining/training-manual');
    const [isFetching, onFetchingChanged] = useState(false);

    let responseIssues = null;
    let issues = null;
    let fetchError = false;
    let nextButtonText = "Press Here!";
    let infoText = "Please enter GitHub username and repository below:";
    let sampleText = "username/repository";
    let nextInfoText = "Find repository and try show issues(s)";
    let helpDefaultText = "githubtraining/training-manual";
    let alertTitle = "Alert";
    let alertMessage = "Please use correct pattern: username/repository";
    let alertNoIssuesMessage = "No issues found for provided repository";
    let alertErrorMessage = "Unknown error. Try again or check username or repository";
    let onNextPressed = async () => {

        try {
            onFetchingChanged(true);
            issues = null;
            responseIssues = null;
            fetchError = null;

            if (IsPathCorrect(value)) {
                // Fetch online data and proceed to next page.
                await fetchIssuesAsync();
                
                if (responseIssues)
                    navigation.navigate(App.SCREEN_ISSUELIST, { issues: responseIssues });
                else if (fetchError)
                    Alert.alert(alertTitle, alertErrorMessage);
                else
                    Alert.alert(alertTitle, alertNoIssuesMessage);
            }
            else {
                Alert.alert(alertTitle, alertMessage);
            }
        }
        catch (error) {
            console.error("Exception on next button");
            console.error(error);
        }
        finally {
            onFetchingChanged(false);
        }
    };

    async function fetchIssuesAsync() {
        issues = await callFetchUsingTimeout(5);
    };

    function callFetchUsingTimeout(timeInSeconds) {
        return new Promise(function (resolve) {
            let query = 'GET /repos/' + value + '/issues';
            const octokit = new Octokit();
            octokit
                .request(query)
                .then((response) => {
                    responseIssues = response.data.map(function (item) {
                        return ({ id: item.id, state: item.state, title: item.title, body: item.body });
                    });
                })
                .catch((error) => {
                    console.error("Exception while requesting issues");
                    console.error(error);
                    fetchError = true;
                });

            setTimeout(() => {
                resolve(issues);
            }, timeInSeconds * 1000);
        })
    };

    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.absoluteCenter}>{isFetching && (
                <ActivityIndicator />)}
            </View>
            <View style={styles.sectionCenter}>
                <Text style={styles.textCenter}>{infoText}</Text>
                <TextInput
                    editable={!isFetching}
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
    absoluteCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        borderBottomWidth: 1
    },
    textCenter: {
        textAlign: 'center',
    }
});
