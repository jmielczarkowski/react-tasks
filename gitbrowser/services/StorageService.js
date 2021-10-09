/**
 * Saving and loading persistence data.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_COMMENTS = 'IssueComments';

export default class StorageService {

    static saveComments = async (id, comments) => {
        try {
            await AsyncStorage.setItem(KEY_COMMENTS + id, comments)
        } catch (error) {
            console.error('Failed to save comments');
        }
    }

    static readComments = async (id) => {
        try {
            return await AsyncStorage.getItem(KEY_COMMENTS + id)
        } catch (error) {
            console.error('Failed to fetch the data from storage');
        }
    }
}
