import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
    Keyboard, TextInput, TouchableOpacity, ActivityIndicator
} from "react-native";

import style from "./styles";

export default function Login() {
    const navigate = useNavigation();
    const [error, setError] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function validate(cachePhone:string|null=null) {
        setLoading(true);
        try {
            const phoneNumber = cachePhone ?? phone;
            if(phoneNumber != "28999563439") {
                throw Error("Telefone não cadastrado, contate o administrador do sistema em fdaher@intelligentsystems.com.br para mais detalhes");
            }

            await AsyncStorage.setItem("phone", phoneNumber);

            setError("");
            navigate.reset({
                index: 0,
                routes: [{name: "Form" as never}]
            })

        } catch(error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function verify() {
        try {
            const value = await AsyncStorage.getItem("phone");
            if(value) {
                setPhone(value);
                validate(value);
            }
        } catch(error) {}
    }

    React.useEffect(() => {
        verify()
    }, []);

    return (
        <KeyboardAvoidingView style={[style.appContent, style.loginArea]} behavior={Platform.OS == "ios" ? "padding" : "height"}>

            {loading && <View style={style.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>

                    <Text>Informe o seu número de telefone com DDD</Text>
                    <TextInput
                        onChangeText={text => setPhone(text)}
                        style={style.input}
                        keyboardType="number-pad"
                        placeholder="Ex.: 11999887766"
                        value={phone}
                        maxLength={11}
                    />

                    <TouchableOpacity style={style.button} onPress={() => validate()}>
                        <Text style={style.textButton}>Validar</Text>
                    </TouchableOpacity>

                    <Text style={style.textError}>{error}</Text>

                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}