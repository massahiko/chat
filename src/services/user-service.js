import * as firebase from 'firebase';
import { errorMessageService } from './error-message'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC1vH6XlMRQVJpZWQ--tMRyK_1KKGtAQ8Y",
    authDomain: "mychat-d93ad.firebaseapp.com",
    databaseURL: "https://mychat-d93ad.firebaseio.com",
    projectId: "mychat-d93ad",
    storageBucket: "mychat-d93ad.appspot.com",
    messagingSenderId: "883409263657"
};

firebase.initializeApp(firebaseConfig);

export const userService = {

    signUp: (userModel) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(
                userModel.email,
                userModel.password
            ).then(credential => {
                resolve(credential);
            }).catch(error => {
                var messageToShow = "Ocorreu um erro inesperado.";
                console.log(error.message);
                switch (error.message) {
                    case "The email address is badly formatted.":
                        messageToShow = errorMessageService.getErrorByName("invalid_email", "en-us");
                        break;
                    case "The password must be 6 characters long or more.":
                        messageToShow = errorMessageService.getErrorByName("passowrd_min_6_digits", "en-us");
                        break;
                    default:
                        messageToShow = "Ocorreu um erro inesperado"
                        break;
                }
                reject(messageToShow);
            });
        });
    },

    login: (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(credentials => {
                    resolve(credentials)
                }).catch(error => {
                    reject(error);
                })
        })
    }
}