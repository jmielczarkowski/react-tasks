/**
 * Browse issue details and allow to put comment.
 */

import React, { useState, useEffect } from 'react';
import {
    Text, SafeAreaView, Keyboard,
    TouchableWithoutFeedback, Platform,
    StyleSheet, ScrollView, View,
    FlatList, TextInput, Button, ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { rowSeparatorView } from '../components/atoms/rowSeparatorView';
import StorageService from '../services/StorageService';

export const IssueDetails = ({ route }) => {

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isSavingComment, setIsSavingComment] = useState(false);

    let issue = route.params.issue;
    let commentsText = 'List of comments:';
    let saveCommentText = 'Save comment';
    let infoText = 'Please write comment below:';
    let helpDefaultText = 'Comment...';

    useEffect(() => {
        getData()
    }, []);

    const onSaveCommentPressed = () => {
        try {
            if (!commentText)
                return;

            setIsSavingComment(true);
            saveData(issue.id);
            getData();          
        }
        catch (error) {
            console.error('Exception on saving comment');
            console.error(error);
        }
        finally {
            setTimeout(() => {
                setIsSavingComment(false);
                setCommentText('');
            }, 1000);
        }
    }

    const saveData = async (id) => {
        let updatedComments = comments;
        updatedComments.push({ id: uuid(), comment: commentText });
        const jsonValue = JSON.stringify(updatedComments);
        StorageService.saveComments(id, jsonValue);
    }

    const getData = async () => {
        try {
            const userAge = await StorageService.readComments(issue.id);
            var val = JSON.parse(userAge);
            if (userAge !== null) {
                setComments(val);
            }
        }
        catch (error) {
            console.error('Exception on saving comment');
            console.error(error);
            alert('Failed to get data from storage.');
        }
    }

    const getItemView = ({ item }) => {
        return (
            <View style={styles.itemStyle}>
                <Text style={styles.itemTextStyle}>{item.comment}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.absoluteCenter}>{isSavingComment && (
                <ActivityIndicator />)}
            </View>
            <ScrollView style={styles.sectionIssue}>
                <Text style={styles.textDescriptionn}>Id: {issue.id}</Text>
                <Text style={styles.textDescriptionn}>State: {issue.state}</Text>
                <Text style={styles.textDescriptionn}>Title: {issue.title}</Text>
                <Text style={styles.textDescriptionn}>Body: {issue.body}</Text>
            </ScrollView>
            <View style={styles.sectionCommentList}>
                <Text style={styles.textCenter}>{commentsText}</Text>
                <FlatList
                    data={comments}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={rowSeparatorView}
                    renderItem={getItemView} />
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={
                    Platform.select({
                        ios: () => 0,
                        android: () => 100
                    })()
                }
                style={styles.focusableKeyboardStyle}
            >
                <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                    <View style={styles.focusableViewStyle}>
                        <Text style={styles.textCenter}>{infoText}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            onChangeText={setCommentText}
                            helpDefaultText={helpDefaultText}
                            value={commentText} />
                        <Button
                            disabled={isSavingComment}
                            title={saveCommentText}
                            onPress={onSaveCommentPressed}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>)
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
        flexDirection: 'column',
        marginHorizontal: 8
    },
    sectionIssue: {
        flex: 1,
        marginVertical: 16
    },
    sectionCommentList: {
        flex: 0.5,
        maxHeight: 300,
        height: 300,
    },
    sectionComment: {
        marginVertical: 36,
    },
    inputStyle: {
        height: 50,
        marginVertical: 16,
        borderBottomWidth: 1
    },
    textCenter: {
        textAlign: 'center',
    },
    itemStyle: {
        justifyContent: 'center',
        height: 30
    },
    itemTextStyle: {
        textAlign: 'center',
        marginLeft: 16,
    },
    focusableKeyboardStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    focusableViewStyle: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around'
    },
});
