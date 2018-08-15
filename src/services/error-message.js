import errorMessages from '../shared/common/error-messages.json'

export const errorMessageService = {
    getErrorByName: (messageName, language = "pt-br") => {
        return errorMessages[language][messageName];
    }
}