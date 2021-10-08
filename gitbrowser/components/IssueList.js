/**
 * Listing on infinite scroll list issues from repository.
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View, TouchableOpacity, NetInfo, FlatList } from 'react-native';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import * as App from '../App';

export const IssueList = ({ navigation, route }) => {

    let source = route.params.issues;
    let loadNumber = 10;

    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(loadNumber);
    const [dataSource, setDataSource] = useState(source.slice(0, offset));
    const [isListEnd, setIsListEnd] = useState(false);
    const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

    const getMoreData = () => {
        let newOffset = offset + loadNumber;
        if (!loading && !isListEnd) {
            setLoading(true);
            setOffset(newOffset);
            setDataSource(source.slice(0, newOffset));   
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

    const getListFooter = () => {
        return (
            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator
                        color="black"
                        style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    };

    const getItemSeparatorView = () => {
        return (
            <View style={styles.itemSeparatorStyle} />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={dataSource}
                initialNumToRender={loadNumber}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={getItemSeparatorView}
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
    itemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#000000',
    },
    itemStyle: {
        justifyContent: "center",
        height: 100
    },
    itemTextStyle: {
        textAlign: 'center',
        marginLeft: 16,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});