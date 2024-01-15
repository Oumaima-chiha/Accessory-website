// ReceiptService.js
import httpClient from './axiosInterceptor'; // Adjust the import path accordingly
import * as FileSystem from 'expo-file-system';
import {Platform} from "react-native";
import {shareAsync} from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                })
                .catch(e => console.log(e));
        } else {
            shareAsync(uri);
        }
    } else {
        shareAsync(uri);
    }
}
const downloadReceipt = async (orderId) => {
    try {

        const accessToken = await AsyncStorage.getItem('accessToken'); // Corrected space in 'accessToken'

        if (!accessToken)
        {
            return;
        }

        // Make API call to download receipt
        const response = await httpClient.get(`pay/receipt/${orderId}`);
        const filename = "receipt.pdf";
        const result = await FileSystem.downloadAsync(
            `${process.env.EXPO_PUBLIC_API_URL}pay/receipt/${orderId}`,
            FileSystem.documentDirectory + filename,
            {
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            }
        );

        // Log the download result
        console.log(result);
        // Save the downloaded blob to a file in the app's file system

        await saveFile(result.uri, filename, result.headers["Content-Type"])
        // Return the fileUri so that it can be used externally

    } catch (error) {
        console.error('Error downloading receipt:', error.message);
        throw error; // Propagate the error to the calling code
    }
};

export default
    downloadReceipt ;
