// Initialize Firebase if move this project to another Firebase project,
// need to replace to new one.
window.onload = function () {
    var config = {
        apiKey: "AIzaSyAggze2rZ60EcMihQwYTEoIjRyBqyYVkgA",
        authDomain: "colorsizeme-demo.firebaseapp.com",
        databaseURL: "https://colorsizeme-demo.firebaseio.com",
        projectId: "colorsizeme-demo",
        storageBucket: "colorsizeme-demo.appspot.com",
        messagingSenderId: "838251688484"
    };
    firebase.initializeApp(config);
};