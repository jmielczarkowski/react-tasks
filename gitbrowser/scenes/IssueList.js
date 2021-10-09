/**
 * Listing on infinite scroll list issues from repository.
 */

import * as App from '../App';
import React, { useState } from 'react';
import { Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { rowSeparatorView } from '../components/atoms/rowSeparatorView';

export const IssueList = ({ navigation, route }) => {

    let source = route.params.issues;
    let loadNumber = 20;

    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(loadNumber);
    const [issueListSource, setIssueListSource] = useState(source.slice(0, offset));
    const [isListEnd, setIsListEnd] = useState(false);
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

    const getMoreData = () => {
        let newOffset = offset + loadNumber;
        if (!loading && !isListEnd) {
            setLoading(true);
            setOffset(newOffset);
            setIssueListSource(source.slice(0, newOffset));
            setTimeout(() => {
                if (newOffset >= source.length) {

                    // No need to load more items.
                    setIsListEnd(true);
                }
                setLoading(false);
            }, 1500);

        }
    };

    const getItemView = ({ item }) => {
        let itemText = 'Id: ' + item.id;
        let itemTitle = 'Title: ' + item.title.toUpperCase();

        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => getItem(item)}>
                <Text style={styles.itemTextStyle}>{itemText}</Text>
                <Text style={styles.itemTextStyle}>{itemTitle}</Text>
            </TouchableOpacity>
        );
    };

    const getItem = (item) => {
        navigation.navigate(App.SCREEN_ISSUEDETAILS, { issue: item });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={issueListSource}
                initialNumToRender={loadNumber}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={rowSeparatorView}
                renderItem={getItemView}
                onEndReached={() => setCallOnScrollEnd(true)}
                onMomentumScrollEnd={() => {
                    callOnScrollEnd && getMoreData()
                    setCallOnScrollEnd(false);
                }}
                onEndReachedThreshold={0.01}
            />
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    itemStyle: {
        justifyContent: 'center',
        height: 100
    },
    itemTextStyle: {
        textAlign: 'center',
        marginLeft: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});