window.onload = function fire_base_load() {
    // Initialize Firebase
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