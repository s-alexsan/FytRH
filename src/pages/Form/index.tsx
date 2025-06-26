import React from "react";
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";

import {
    View, Text, TouchableOpacity, KeyboardAvoidingView,
    ActivityIndicator, TouchableWithoutFeedback, Keyboard,
    TextInput, Platform, ScrollView, Image
} from "react-native";

import Recaptcha from "react-native-recaptcha-that-works";

import style from "./styles";
import logo from "../../images/logo.png";
import imgHeader from "../../images/header-01.png";

import { Translate, Lang } from "../../utils/translate";

let recording = new Audio.Recording();
let player = new Audio.Sound();
let interval = setInterval(() => {}, 1000);
let startTiming = (new Date()).getTime();
const translate = new Translate()

export default function Form() {
    // Definição de tipos
    type FileData = {
        id: string,
        mimeType: string,
        name: string,
        uri: string,
        size: number
    };
    type audioKey = "standby" | "playing" | "recording" | "recorded";
    type errorKey = "captcha" | "maxfile" | "form" | "";

    const audioLabel = {
        "standby": translate.audioStatusStandBy,
        "playing": translate.audioStatusPlaying,
        "recording": translate.audioStatusRecording,
        "recorded": translate.audioStatusRecordEnd
    };

    const errorLabel = {
        "captcha": translate.errorCaptcha,
        "maxfile": translate.errorMaxFileSize,
        "form": translate.errorForm
    }

    // Estados de tradução
    const [selectLang, setSelectLang] = React.useState("pt_br" as Lang);

    // Estados de gerenciamento de funções
    const [error, setError] = React.useState("");
    const [errorIndex, setErrorIndex] = React.useState("" as errorKey);
    const [timing, setTiming] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [audioStatusIndex, setAudioStatusIndex] = React.useState("standby" as audioKey);
    const [audioStatus, setAudioStatus] = React.useState(audioLabel[audioStatusIndex][selectLang]);
    const [isRecording, setIsRecording] = React.useState(false);
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    // Estados de itens do formulário
    const [name, setName] = React.useState("");
    const [unit, setUnit] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [audioURI, setAudioURI] = React.useState("");
    const [enterprise, setEnterprise] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [files, setFiles] = React.useState([] as Array<FileData>);

    const workRecaptcha: any = React.useRef();

    function okCaptcha(token: any) {
        execute();
    }

    function rejectCaptcha() {
        setErrorIndex("captcha");
        setError(translate.errorCaptcha[selectLang]);
    }

    async function send() {
        workRecaptcha.current.open();
    }
    function handleError(error: unknown) {
        setErrorIndex("captcha");
        setError(translate.errorCaptcha[selectLang]);
    }

    async function execute() {
        setLoading(true);
        let formError = false;
        try {
            // Computa inputs e monta o form data
            const attachments: string[] = [];
            files.forEach(item => attachments.push(item.uri));
            if(audioURI != "") {
                attachments.push(audioURI);
            }

            // Valida campos obrigatórios
            if(name.length == 0 || enterprise.length == 0) {
                formError = true;
                setErrorIndex("form");
                throw new Error(translate.errorForm[selectLang]);
            }

            // Recupera data e hora do device
            const dt = new Date();
            const sendDate = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;

            // Envia e-mail
            const mail = await MailComposer.composeAsync({
                subject: `${enterprise} - ${unit} - ${name} - ${category} - ${sendDate}`,
                recipients: ["TalkToYourHRFyT@gmail.com"],
                //body: `Solicitante: ${name}\nEmpresa: ${enterprise}\nUnidade: ${unit}\nCategoria: ${category}\n${description}`,
                body: `Categoria: ${category}\n${description}`,
                attachments: attachments
            });

            // Reseta os campos de input
            setError("");
            setFiles([]);
            setTiming(0);
            setAudioURI("");
            setCategory("");
            setErrorIndex("");
            setDescription("");
            setIsRecording(false);
            setAudioStatusIndex("standby");
            setAudioStatus(translate.audioStatusStandBy[selectLang]);

            // Reseta campos de controle
            recording = new Audio.Recording();
            player = new Audio.Sound();

        } catch(error: any) {
            if(!formError) setErrorIndex("");
            setError(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function startRecord() {
        if(permissionResponse?.status !== "granted") {
            await requestPermission();
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
        });

        if(isRecording) return;
 
        try {
            await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await recording.startAsync();
            setAudioStatusIndex("recording");
            setAudioStatus(translate.audioStatusRecording[selectLang]);
            setIsRecording(true);

            setTiming(0);
            clearInterval(interval);
            startTiming = (new Date()).getTime();
            interval = setInterval(() => updateRecord(), 1000);
        } catch(error) {
            console.log(error);
        }
    }

    async function updateRecord() {
        const currentTime = ((new Date()).getTime() - startTiming) / 1000;
        if(currentTime >= 60) {
            endRecord();
        } else {
            setTiming(prev => prev + 1);
        }
    }

    async function endRecord() {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({allowsRecordingIOS: false});

        const uri = recording.getURI();
        if(uri) setAudioURI(uri);

        setIsRecording(false);
        setAudioStatusIndex("recorded");
        setAudioStatus(translate.audioStatusRecordEnd[selectLang]);
        recording = new Audio.Recording();

        clearInterval(interval);
    }

    async function play() {
        if(isRecording || audioURI == "") {
            return;
        }

        try {
            let playerStatus = await player.getStatusAsync();
            if(!playerStatus.isLoaded) {
                await player.loadAsync({uri: audioURI}, {}, true);
                await player.playAsync();
                setAudioStatusIndex("playing");
                setAudioStatus(translate.audioStatusPlaying[selectLang]);

            } else {
                if(!playerStatus.isPlaying) {
                    player = new Audio.Sound();
                    await player.loadAsync({uri: audioURI}, {}, true);
                    await player.playAsync();
                    setAudioStatusIndex("playing");
                    setAudioStatus(translate.audioStatusPlaying[selectLang]);
                }
            }
        } catch(error) {
            console.log(error)
        }
    }

    async function uploadFile(startCamera=false) {
        // Inicia a API para fazer a seleção de arquivo
        let result;
        setError("");
        setErrorIndex("");
        const fileData = {name: "", size: 0};

        try {
            if (startCamera) {
                // Solicita permissão de câmera
                const { granted } = await ImagePicker.requestCameraPermissionsAsync();
                if (!granted) {
                    alert("Permissão de câmera não concedida.");
                    return;
                }

                setLoading(true);

                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images
                });

                if (result.canceled || !result.assets || result.assets.length === 0 || !result.assets[0].uri) {
                    return;
                }

                fileData.name = result.assets[0].fileName ?? "";
                fileData.size = result.assets[0].fileSize ?? 0;

            } else {
                setLoading(true); // <-- ESSENCIAL

                result = await DocumentPicker.getDocumentAsync({
                    type: "*/*",
                    copyToCacheDirectory: true
                });

                if (result.canceled || !result.assets || result.assets.length === 0 || !result.assets[0].uri) {
                    return;
                }

                fileData.name = result.assets[0].name ?? "";
                fileData.size = result.assets[0].size ?? 0;
            }

        } catch (error) {
            console.error("Erro ao carregar arquivo:", error);
            alert("Ocorreu um erro ao carregar o arquivo.");
        } finally {
            setLoading(false); // <-- Agora será sempre chamado
        }


        // Caso o arquivo já exista, impede nova adição
        const exist = files.find(item => item.name == fileData.name);
        if(exist) return;

        // Recupera dados existentes e verifica se o tamanho máximo foi obedecido
        const data = [...files];
        const currentSize = data.reduce((acc, item) => acc + item.size, 0);
        if(currentSize + fileData.size > (15 * 1000 * 1000)) {
            setError(translate.errorMaxFileSize[selectLang]);
            setErrorIndex("maxfile");
            return;
        }

        data.push({
            mimeType: result.assets[0].mimeType ?? "",
            name: fileData.name,
            size: fileData.size,
            uri: result.assets[0].uri,
            id: `${(new Date()).getTime()}-${fileData.name}`
        });
        setFiles(data);
    }

    async function removeFile(id: string) {
        const exist = files.findIndex(item => item.id == id);
        if(exist != -1) {
            const data = [...files];
            data.splice(exist, 1)
            setFiles(data);
        }
    }

    async function openCamera() {
        const status = await Camera.requestCameraPermissionsAsync();
        if(status.granted) {
            
        }
    }

    function changeLanguage(lang: Lang) {
        setSelectLang(lang);
        setAudioStatus(audioLabel[audioStatusIndex][lang]);
        if(errorIndex != "") {
            setError(errorLabel[errorIndex][lang]);
        }
    }

    return (
        <KeyboardAvoidingView style={[style.appContent]} behavior={Platform.OS == "ios" ? "padding" : "height"}>

            {loading && <View style={style.loadingContent}>
                <ActivityIndicator size="large" />
            </View>}

            <Recaptcha
                ref={workRecaptcha}
                siteKey="6LdoSsspAAAAAGM0OHY7Wjd-90yKSYdSWJMdOukr"
                baseUrl="https://fyt.intelligentsystems.com.br"
                onVerify={okCaptcha}
                onExpire={rejectCaptcha}
                onError={handleError}
                size="invisible"
            />

            <View style={style.header}>
                <Image source={logo} style={style.headerLogo} />
                <Text style={style.headerText}>{translate.headerTitle[selectLang]}</Text>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={style.formContent}>

                <View style={style.flagContainer}>
                    <TouchableOpacity onPress={() => changeLanguage("pt_br")}>
                    <Image
                        source={{ uri: 'https://flagcdn.com/w40/br.png' }}
                        style={style.flag}
                    />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changeLanguage("en")}>
                    <Image
                        source={{ uri: 'https://flagcdn.com/w40/us.png' }}
                        style={style.flag}
                    />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => changeLanguage("es")}>
                    <Image
                        source={{ uri: 'https://flagcdn.com/w40/es.png' }}
                        style={style.flag}
                    />
                    </TouchableOpacity>
                </View>

                    <Text style={style.label}>{translate.labelName[selectLang]}</Text>
                    <TextInput
                        onChangeText={text => setName(text)}
                        style={style.input}
                        keyboardType="default"
                        placeholder="Ex.: João Alberto"
                        value={name}
                        maxLength={50}
                    />

                    <Text style={style.label}>{translate.labelEnterprise[selectLang]}</Text>
                    <TextInput
                        onChangeText={text => setEnterprise(text)}
                        style={style.input}
                        keyboardType="default"
                        placeholder="Ex.: Empresa Nacional Ltda"
                        value={enterprise}
                        maxLength={50}
                    />

                    <Text style={style.label}>{translate.labelUnit[selectLang]}</Text>
                    <TextInput
                        onChangeText={text => setUnit(text)}
                        style={style.input}
                        keyboardType="default"
                        placeholder="Ex.: Unidade da Zona Sul"
                        value={unit}
                        maxLength={50}
                    />

                    <Text style={style.label}>{translate.labelCategory[selectLang]}</Text>
                    <View style={style.contentSelect}>
                        <Picker selectedValue={category} onValueChange={(value, index) => setCategory(value)} style={style.select}>
                            <Picker.Item label={translate.optionCategorySelect[selectLang]} value="" />
                            <Picker.Item label={translate.optionCategoryBenefits[selectLang]} value="Benefícios" />
                            <Picker.Item label={translate.optionCategoryIncome[selectLang]}value="Pagamentos-Dúvidas" />
                            <Picker.Item label={translate.optionCategoryClocking[selectLang]} value="Ponto-Dúvidas" />
                            <Picker.Item label={translate.optionCategoryDocuments[selectLang]} value="Documentos" />
                            <Picker.Item label={translate.optionCategoryVacation[selectLang]} value="Férias" />
                            <Picker.Item label={translate.optionCategoryLeadership[selectLang]} value="Liderança-Orientações" />
                            <Picker.Item label={translate.optionCategoryTrainings[selectLang]} value="Cursos e Treinamentos" />
                            <Picker.Item label={translate.optionCategorySuggestions[selectLang]} value="Reclamações e Sugestões" />
                            <Picker.Item label={translate.optionCategoryOther[selectLang]} value="Outros" />
                        </Picker>
                    </View>

                    {/*<Text style={style.label}>Informe o título para o chamado</Text>
                    <TextInput
                        onChangeText={text => setTitle(text)}
                        style={style.input}
                        keyboardType="default"
                        placeholder="Ex.: Consultar período de férias"
                        value={title}
                        maxLength={50}
                    />*/}

                    <Text style={style.label}>{translate.labelDescription[selectLang]}</Text>
                    <TextInput
                        onChangeText={text => setDescription(text)}
                        style={style.input}
                        keyboardType="default"
                        placeholder="Ex.: Gostaria de saber quando poderei solicitar férias"
                        value={description}
                        multiline={true}
                        numberOfLines={5}
                    />

                    <Text style={style.label}>{translate.labelAudio[selectLang]}</Text>

                    <View style={style.audioContent}>
                        <Text style={style.audioContentStatus}>{audioStatus} {timing}s</Text>

                        <View style={style.audioContentButtons}>
                            <TouchableOpacity onPress={isRecording ? endRecord : startRecord} style={style.audioButton}>
                                <Feather name="mic" size={18} color="#fff" />
                                {/*<Text style={style.audioButtonText}>{isRecording ? "Parar" : "Gravar"}</Text>*/}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={play} style={style.audioButton}>
                                <Feather name="play" size={18} color="#fff" />
                                {/*<Text style={style.audioButtonText}>Ouvir</Text>*/}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={style.uploadFileRow}>
                        <Text style={style.labelUploadFile}>{translate.labelUploadFile[selectLang]}</Text>

                        <View style={style.uploadButtonsView}>
                            <TouchableOpacity onPress={() => uploadFile(true)} style={style.updloadButton}>
                                <Feather name="camera" size={18} color="#fff" />
                                {/*<Text style={style.uploadButtonText}>Novo arquivo</Text>*/}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => uploadFile()} style={style.updloadButton}>
                                <Feather name="paperclip" size={18} color="#fff" />
                                {/*<Text style={style.uploadButtonText}>Novo arquivo</Text>*/}
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <View>
                        {files.map((item, i) => (
                            <View style={style.filesRow} key={item.id}>
                                <Text>{item.name} ({(item.size / 1000000).toFixed(2)} MB)</Text>
                                <TouchableOpacity onPress={() => removeFile(item.id)}>
                                    <FontAwesome name="trash-o" size={17} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <Text style={style.textError}>{error}</Text>

                </ScrollView>
            </TouchableWithoutFeedback>

            <TouchableOpacity style={style.sendButton} onPress={send}>
                <Text style={style.textButton}>Enviar</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}