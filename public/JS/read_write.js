var database = firebase.database();
var diffe = 0.39370;

// Converter
// from centi to inches
function centi_converter(input) {
    var centimeter = input;
    return centimeter * diffe;
};

//from inches to centi
function inches_converter(input) {
    var inches = input;
    return inches / diffe;
};

/////////////////////////////////////////////////////////////////////////

// Read data once
function read() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    });
}

// Updating or Deleting
function writeNewPost() {
	var uid = firebase.auth().currentUser.uid;
	var username = (snapshot.val() && snapshot.val().username); //!
	var gender  = document.getElementById('gender');
	var brand = document.getElementById('brand');
	var measurement = document.getElementById('measurement');
    if (gender == 'male') {
        if (type == 'top') { //MALE_TOP DEFAULT
            if (measurement == 'inches') {
                // A post entry.
                var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
                    shoulder: $('#shoulder').value(),
                    chest: $('#chest').value(),
                    back: $('#back').value(),
                    waist: $('#waist').value(),
                    sleeve: $('#sleeve').value(),
                    backLength: $('#backlength').value()
                };
            } else { //MALE_TOP CONVERT
                var shoulder = centi_converter($('#shoulder').value());
                var chest = centi_converter($('#chest').value());
                var back = centi_converter($('#back').value());
                var waist = centi_converter($('#waist').value());
                var sleeve = centi_converter($('#sleeve').value());
                var backLength = centi_converter($('#backlength').value());
                var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
                    shoulder: shoulder,
                    chest: chest,
                    back: back,
                    waist: waist,
                    sleeve: sleeve,
                    backLength: backLength
                };
            }
        } else {
            if (measurement == 'inches') {
                // A post entry.
                var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
                    hip: $('#hip').value(),
                    outseam: $('#outseam').value(),
                    inseam: $('#inseam').value(),
                    waist: $('#waist').value(),
                    knee: $('#knee').value(),
                    thigh: $('#thigh').value(),
                    calf: $('#calf').value()
                };
            } else { //MALE_BOTTOM CONVERT
                var converted_hip = centi_converter($('#hip').value());
                var converted_outseam = centi_converter($('#outseam').value());
                var converted_inseam = centi_converter($('#inseam').value());
                var converted_waist = centi_converter($('#waist').value());
                var converted_knee = centi_converter($('#knee').value());
                var converted_thigh = centi_converter($('#thigh').value());
                var converted_calf = centi_converter($('#calf').value());
                var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
                    hip: converted_hip,
                    outseam: converted_outseam,
                    inseam: converted_inseam,
                    waist: converted_waist,
                    knee: converted_knee,
                    thigh: converted_thigh,
                    calf: converted_calf
                };
            }
        }
    } else { //Females
		if (type == 'top') { //FEMALE_TOP DEFAULT
			if (measurement == 'inches') {
				var postData = {
					author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
					bust = $('#bust').value(),
					armLength = $('#armLength').value(),
					hip = $('#hip').value(),
					waist = $('#waist').value(),
					bodyLength = $('#bodylength').value()
				};
			} else { //CONVERT FEMALE_TOP
				var bust = centi_converter($('#bust').value());
				var armLength = centi_converter($('#armLength').value());
				var hip = centi_converter($('#hip').value());
				var waist = centi_converter($('#waist').value());
				var bodyLength = centi_converter($('#bodylength').value());
				var postData = {
					author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
					bust: bust,
					armLength: armLength,
					hip: hip,
					waist: waist,
					bodyLength: bodyLength,
				};
			
			}
		} else { //FEMALE_BOTTOM DEFAULT
			if(measurement == 'inches') {
				var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
					outseam: $('#outseam').value(),
					inseam: $('#inseam').value(),
					hip: $('#hip').value(),
					waist: $('#waist').value(),
					thigh: $('#thigh').value(),
					calf: $('#calf').value(),
					knee: $('#knee').value()
				};
			} else { //CONVERT FEMALE_BOTTOM
				var	outseam = centi_converter($('#outseam').value());
				var	inseam = centi_converter($('#inseam').value());
				var	hip = centi_converter($('#hip').value());
				var	waist = centi_converter($('#waist').value());
				var	thigh = centi_converter($('#thigh').value());
				var	calf = centi_converter($('#calf').value());
				var	knee = centi_converter($('#knee').value());
				var postData = {
                    author: username,
                    uid: uid,
                    gender: gender,
                    type: type,
                    brand: brand,
					outseam: outseam,
					inseam: inseam,
					hip: hip,
					waist: waist,
					thigh: thigh,
					calf: calf,
					knee: knee					
				};
			}
		}
	}

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
