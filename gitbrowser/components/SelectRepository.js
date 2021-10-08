/**
 * Selection of repository necessary to browse issues.
 */

import React from 'react';
import { Button, TextInput, View } from 'react-native';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
export const SelectRepository = ({ navigation }) => {
    let nextButtonTitle = "Try show issues(s)";
    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.sectionCenter}>
                <TextInput
                value="Tutaj podaj tekst"
                />
            </View>
            <View style={styles.sectionBottom}>
                <Button
                    title={nextButtonTitle}
                    onPress={() =>
                        navigation.navigate('...', { name: '...' })
                    }
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
        marginBottom: 36
    }
});