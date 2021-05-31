const firebaseConfig = {
    apiKey: "AIzaSyD7iQ7HTrC3z7-50LAA1wNbRCVIkftjQiI",
    authDomain: "proyecto-final-geo.firebaseapp.com",
    projectId: "proyecto-final-geo",
    storageBucket: "proyecto-final-geo.appspot.com",
    messagingSenderId: "406500938577",
    appId: "1:406500938577:web:5648d7c3dbb7d9b5a33970"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();