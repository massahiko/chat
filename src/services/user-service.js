import * as firebase from 'firebase';

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
                reject(error.message);
            });
        });
    }
}