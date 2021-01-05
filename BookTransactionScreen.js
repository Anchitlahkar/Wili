import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions1=async()=>{
        const {status} = Permissions.askAsync(Permissions.CAMERA)
        
        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState: 'clicked',
            scanned: false,
        })
    }

    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })

    }
render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    return( 
        <View style={styles.mainStyle}>
            <Text style={styles.displayText}>
                { hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission" }
            </Text>
    
            <TouchableOpacity onPress={this.getCameraPermissions1} style={styles.ButtonStyle}>
                <Text style={styles.displayText}>Scan QR Code</Text>
            </TouchableOpacity>
        </View>
        );
    }
}


const styles = StyleSheet.create({
    mainStyle:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ButtonStyle:{
        backgroundColor: 'blue',
        padding: 10,
        margin: 10
    },
    displayText:{
        fontSize: 15,
        textDecorationLine: "underline"
    }
})