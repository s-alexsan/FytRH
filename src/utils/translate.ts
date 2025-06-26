interface Languages {
    pt_br: string;
    es: string;
    en: string;
}

export type Lang = "pt_br" | "es" | "en";

export class Translate {

    headerTitle: Languages = {
        pt_br: "Fale com seu RH",
        es: "Habla con tu RH",
        en: "Talk to your HR"
    }

    labelName: Languages = {
        pt_br: "Digite seu nome",
        es: "Ingrese su nombre",
        en: "Enter your name"
    }

    labelEnterprise: Languages = {
        pt_br: "Informe a sua empresa",
        es: "Ingrese su empresa",
        en: "Enter your company"
    }

    labelUnit: Languages = {
        pt_br: "Informe a unidade/filial que você trabalha, se houver",
        es: "Indique su unidad/sucursal si aplica",
        en: "Enter your branch/unit if applicable"
    }

    labelCategory: Languages = {
        pt_br: "Qual o motivo de sua solicitação?",
        es: "¿Cuál es el motivo de su solicitud?",
        en: "What is the reason for your request?"
    }

    labelDescription: Languages = {
        pt_br: "Faça aqui sua solicitação",
        es: "Haga aquí su solicitud",
        en: "Make your request here"
    }

    labelAudio: Languages = {
        pt_br: "Deseja enviar um áudio? Máximo de 60 segundos.",
        es: "¿Desea enviar un audio? Máximo 60 segundos.",
        en: "Would you like to send an audio? Maximum of 60 seconds."
    }

    labelUploadFile: Languages = {
        pt_br: "Anexos (15 MB no máximo)",
        es: "Archivos adjuntos (máximo 15 MB)",
        en: "Attachments (maximum 15 MB)"
    }

    labelSendButton: Languages = {
        pt_br: "Enviar",
        es: "Enviar",
        en: "Send"
    }

    optionCategorySelect: Languages = {
        pt_br: "Selecione...",
        es: "Seleccione...",
        en: "Select..."
    }

    optionCategoryIncome: Languages = {
        pt_br: "Pagamentos-Dúvidas",
        es: "Pagos-Dudas",
        en: "Payments-Doubts"
    }

    optionCategoryBenefits: Languages = {
        pt_br: "Benefícios",
        es: "Beneficios",
        en: "Benefits"
    }

    optionCategoryClocking: Languages = {
        pt_br: "Ponto-Dúvidas",
        es: "Registro-Dudas",
        en: "Clocking-Doubts"
    }

    optionCategoryDocuments: Languages = {
        pt_br: "Documentos",
        es: "Documentos",
        en: "Documents"
    }

    optionCategoryVacation: Languages = {
        pt_br: "Férias",
        es: "Vacaciones",
        en: "Vacation"
    }

    optionCategoryLeadership: Languages = {
        pt_br: "Liderança-Orientações",
        es: "Liderazgo-Orientaciones",
        en: "Leadership-Guidance"
    }

    optionCategoryTrainings: Languages = {
        pt_br: "Cursos e Treinamentos",
        es: "Cursos y Entrenamientos",
        en: "Courses and Trainings"
    }

    optionCategorySuggestions: Languages = {
        pt_br: "Reclamações e Sugestões",
        es: "Reclamos y Sugerencias",
        en: "Complaints and Suggestions"
    }

    optionCategoryOther: Languages = {
        pt_br: "Outros",
        es: "Otros",
        en: "Others"
    }

    errorCaptcha: Languages = {
        pt_br: "Ocorreu um erro na validação do Recaptcha",
        es: "Se produjo un error en la validación de Recaptcha",
        en: "There was an error with the Recaptcha validation"
    }

    errorMaxFileSize: Languages = {
        pt_br: "Você pode adicionar no máximo 15 MB de arquivos.",
        es: "Puede agregar un máximo de 15 MB de archivos.",
        en: "You can add a maximum of 15 MB of files."
    }
    
    errorForm: Languages = {
        pt_br: "Os campos nome e empresa são obrigatórios",
        es: "Los campos nombre y empresa son obligatorios",
        en: "The name and company fields are required"
    }

    audioStatusStandBy: Languages = {
        pt_br: "Aguardando...",
        es: "Esperando...",
        en: "Waiting..."
    }

    audioStatusRecording: Languages = {
        pt_br: "Gravando...",
        es: "Grabando...",
        en: "Recording..."
    }

    audioStatusRecordEnd: Languages = {
        pt_br: "Gravado!",
        es: "Grabado!",
        en: "Recorded!"
    }

    audioStatusPlaying: Languages = {
        pt_br: "Reproduzindo...",
        es: "Reproduciendo...",
        en: "Playing..."
    }
}
