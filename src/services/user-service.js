import * as firebase from 'firebase';
import { errorMessageService } from './error-message';
import { AsyncStorage } from "react-native";


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
const USER_STORAGE_NAME = "USER_DATA";

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
                    var userObject = {
                        email: email,
                        uid: credentials.user
                    }
                    userService
                        .setUser(userObject)
                        .then(() => {
                            resolve(credentials)
                        });
                }).catch(error => {
                    reject(error);
                })
        })
    },

    sendMessage(message) {
        var newMessage = {
            message: message,
            date: new Date().toISOString()
        }

        return new Promise((resolve, reject) => {
            userService.getUser().then(user => {
                newMessage = {
                    ...newMessage,
                    uid: user.uid
                }

                firebase
                    .database()
                    .ref("messages") /*Referência a tabela ou cria uma nova caso ela não exista*/
                    .push(newMessage, (error) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(true);
                    })
            })
        })
    },

    getMessage: () => {
        return firebase
            .database()
            .ref("messages")
    },

    setUser: (usermodel) => {
        return new Promise((resolve, reject) => {
            AsyncStorage
                .setItem(USER_STORAGE_NAME, JSON.stringify(usermodel))
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }, getUser: () => {
        return new Promise((resolve, reject) => {
            AsyncStorage
                .getItem(USER_STORAGE_NAME)
                .then(user => {
                    resolve(JSON.parse(user))
                        .catch(error => {
                            reject(error)
                        });
                })
        })
    }
}
