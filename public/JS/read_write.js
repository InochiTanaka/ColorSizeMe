var config = {
    apiKey: "AIzaSyAggze2rZ60EcMihQwYTEoIjRyBqyYVkgA",
    authDomain: "colorsizeme-demo.firebaseapp.com",
    databaseURL: "https://colorsizeme-demo.firebaseio.com",
    projectId: "colorsizeme-demo",
    storageBucket: "colorsizeme-demo.appspot.com",
    messagingSenderId: "838251688484"
};
firebase.initializeApp(config);

var database = firebase.database();
var diffe = 0.39370;

/*Restricts input number boxes to a max 2 decimal places doc onLoad()*/
$(document).ready(() => {	
    /*$('form[id=MT]').find('input[type=number]').attr( {
        maxlength : 5,

                 $('form[id=2]') // get the form with id = 2
                .find('input[name=message]') // locate the input element with attribute name = message
                /.val()
                .attr("value"); //  get the attribute = value
    });*/

    $('input[type=number]').attr( {
        step : 0.01,
        min : 10,
        max : 500,
        maxlength : 5,
        value : 0
    });

	$('input[type="number"]').on('input', () => {
        this.value = parseFloat(this.value).toFixed(2);
    });

});


// Converter
// from centi -> inches
function centi_converter(input) {
    for (var key of Object.keys(input)) {
        input[key] = (input[key] * diffe);
    }
    return input
};

//from inches -> centi
function inches_converter(input) {
    for (var key of Object.keys(input)){
        input[key] = (input[key] / diffe);
    }
    return input;
};

/////////////////////////////////////////////////////////////////////////

// Read data once
function read() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    });
}

//returns value of input text box
function getIDValue(id) {
    return document.getElementById(id).value;
}

function submitForm() {
    
	console.log('submitForm');
	var uid = firebase.auth().currentUser.uid;
    

    /*USE THIS CODE ONCE DATA-BINDING POSSIBLE TO UPDATE SIZES... (DO THIS ON OTHER FUNCTION)*/
    /*var user_in_userRecords = db.child('users/'+userID);
    console.log(user_in_userRecords);
    user_in_userRecords.once("value")
        .then(function(snapshot) {
            userExists = snapshot.exists(); //either it exists or THROWS NULL.
            console.log(userExists);
            console.log(snapshot.val());
            });
    if (userExists == null) {
        alert("User data does not exist. Please check credentials!");
    } else {
        //This one will download under the user node if it exists, including the 
        //user sizes. NOTE: Let user only update EMAIL address????
        /*db.child('users/'+ uid).update({
        email : 'asaness@yahoo.ca',
        size : 10.0*/
    //}

	var gender  = getIDValue('gender');
    var brand = getIDValue('leBrand');
    var measurement = getIDValue('measure');
    var type = getIDValue('type');
    console.log(uid + ' sex: ' + gender + ' brand: ' + brand + ' type: ' + type + ' meas: ' + measurement);
    writeNewPost(uid, gender, brand, type, measurement);
}

function getMaleTopValues() {
    postData = { shoulder : 0, chest : 0, back : 0, waist : 0, sleeve : 0, back_length : 0};
    postData.shoulder = parseFloat(getIDValue('MTshoulder'));
    postData.chest  = parseFloat(getIDValue('MTchest'));
    postData.back = parseFloat(getIDValue('MTback'));
    postData.waist  = parseFloat(getIDValue('MTwaist'));
    postData.sleeve  = parseFloat(getIDValue('MTsleeve'));
    postData.back_length = parseFloat(getIDValue('MTbacklength'));
    return postData;
}

function getMaleBottomValues() {
    postData = { hip : 0, outseam : 0, inseam : 0, waist : 0, knee : 0, thigh : 0, calf : 0 };
    postData.hip  = parseFloat(getIDValue('MBhip'));
    postData.outseam  = parseFloat(getIDValue('MBoutseam'));
    postData.inseam = parseFloat(getIDValue('MBinseam'));
    postData.waist= parseFloat(getIDValue('MBwaist'));
    postData.knee = parseFloat(getIDValue('MBknee'));
    postData.thigh = parseFloat(getIDValue('MBthigh'));
    postData.calf = parseFloat(getIDValue('MBcalf'));
    return postData;
}

function getFemaleTopValues() {
    postData = {bust : 0, arm_length : 0, hip : 0, waist : 0, body_length : 0};
    postData.bust  = parseFloat(getIDValue('FTbust'));
    postData.arm_length = parseFloat(getIDValue('FTarm'));
    postData.hip = parseFloat(getIDValue('FThip'));
    postData.waist  = parseFloat(getIDValue('FTwaist'));
    postData.body_length= parseFloat(getIDValue('FTbody'));
    return postData;
}

function getFemaleBottomValues() {
    postData = { outseam : 0, inseam : 0, hip : 0, waist : 0, thigh : 0, calf : 0, knee :0 }
    postData.outseam = parseFloat(getIDValue('FBoutseam'));
    postData.inseam = parseFloat(getIDValue('FBinseam'));
    postData.waist = parseFloat(getIDValue('FBwaist'));
    postData.thigh = parseFloat(getIDValue('FBthigh'));
    postData.hip = parseFloat(getIDValue('FBhip'));
    postData.calf = parseFloat(getIDValue('FBcalf'));
    postData.knee = parseFloat(getIDValue('FBknee'));
    return postData;

}
// Updating or Deleting
function writeNewPost(uid, gender, brand, type, measurement) {
    var postData = { };
    if (gender == 'male') {
        if (type == 'top') { //MALE_TOP DEFAULT
            postData = getMaleTopValues();
            if (measurement == 'inch') {
                //do nothing.
            } else { //MALE_TOP CONVERT
                postData = centi_converter(postData);
            }
        } else {
            postData = getMaleBottomValues();
            if (measurement == 'inch') {
                //Do nothing
            } else { //MALE_BOTTOM CONVERT
                postData = centi_converter(postData);
            }
        }
    } else { //Females
        if (type == 'top') { //FEMALE_TOP DEFAULT
            postData = getFemaleTopValues();
			if (measurement == 'inch') {

			} else { //CONVERT FEMALE_TOP
                postData = centi_converter(postData);
			}
        } else { //FEMALE_BOTTOM DEFAULT
            postData = getFemaleBottomValues();
			if(measurement == 'inch') {

			} else { //CONVERT FEMALE_BOTTOM
                postData = centi_converter(postData);
			}
		}
	}

    console.log(postData + "at 176");
	
	//Set data into sizes/uid {measurements}and market/citytown {measurements, uid : userid}
    var sizesRef = database.ref().child('sizes/'+uid);
	
	//get geo-location of user
	var citytown, country;
	var usersRef = db.ref().child('users/' + uid + '/public_use').once('value')
	.then(function(snapshot) {
		citytown = snapshot.val().citytown;
		country = snapshot.val().country;
	});
	var lastMeasuresRef = db.ref().child('users/' + uid +'/recent_measures');
	var geoRef = db.ref().child('users/' + country + '/' citytown);
	
	var time = Firebase.ServerValue.TIMESTAMP;
	
	//push data to specified paths.
    lastMeasuresRef.set(postData);
    sizesRef.push(postData, uid);
	geoRef.push(postData, uid, time);
	
    //return firebase.database().ref().set(updates);

    /*var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;*/
}
