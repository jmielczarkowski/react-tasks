/**
 * Browse issue details and allow to put comment.
 */

import React, { useState } from 'react';
import {
    Text, SafeAreaView, Keyboard,
    TouchableWithoutFeedback, Platform,
    StyleSheet, ScrollView, View,
    FlatList, TextInput, Button, ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { rowSeparatorView } from '../components/atoms/rowSeparatorView';

export const IssueDetails = ({ navigation, route }) => {
    const [commentText, onCommentTextChanged] = useState('');
    const [isSavingComment, setIsSavingComment] = useState(false);

    let issue = route.params.issue;
    let commentsText = "List of comments:";
    let saveCommentText = "Save comment";
    let infoText = "Please write comment below:";
    let helpDefaultText = "Comment...";

    const array = [
        { id: '53205', comment: 'sample 1' },
        { id: '23059', comment: 'sample 2' }
    ];

    let onSaveCommentPressed = async () => {
        try {
            setIsSavingComment(true);
        }
        catch (error) {
            console.error("Exception on saving comment");
            console.error(error);
        }
        finally {
            setTimeout(() => {
                setIsSavingComment(false);
                onCommentTextChanged('');
            }, 1000);
        }
    };

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
                    data={array}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={rowSeparatorView}
                    renderItem={getItemView} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.focusableKeyboardStyle}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.focusableViewStyle}>
                        <Text style={styles.textCenter}>{infoText}</Text>
                        <TextInput
                            style={styles.inputStyle}
                            multiline={false}
                            onChangeText={onCommentTextChanged}
                            defaultValue={helpDefaultText}
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
        marginVertical: 16,
        borderBottomWidth: 1
    },
    textCenter: {
        textAlign: 'center',
    },
    itemStyle: {
        justifyContent: "center",
        height: 30
    },
    itemTextStyle: {
        textAlign: 'center',
        marginLeft: 16,
    },
    focusableKeyboardStyle: {
        flex: 1,
        justifyContent: "center"
    },
    focusableViewStyle: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
});