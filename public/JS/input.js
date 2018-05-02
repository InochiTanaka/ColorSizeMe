  var config = {
    apiKey: "AIzaSyAggze2rZ60EcMihQwYTEoIjRyBqyYVkgA",
    authDomain: "colorsizeme-demo.firebaseapp.com",
    databaseURL: "https://colorsizeme-demo.firebaseio.com",
    projectId: "colorsizeme-demo",
    storageBucket: "colorsizeme-demo.appspot.com",
    messagingSenderId: "838251688484"
  };
  firebase.initializeApp(config);


  var userID = 'fNIEZuUXaGcANLERlxzUX59I1362';
  var userEmail = 'kevin.oane@yahoo.com';


	function new_user() {
		const db = firebase.database().ref();
		var user_size = 0;

		user_info = {userEmail, user_size}
		db.child('users/'+userID).set(user_info);
	}
	
	function update_user() {
		const db = firebase.database().ref();
		/*if there are two objects in there*/
			/*if same gender, load the data*/
		db.child('users/'+ uid).update({
			email : 'asaness@yahoo.ca',
			size : 10.0
		});
	}
	
	function update_size() {
		var update_db = firebaseAdmin.database();
		var getinfo = update_db.ref('sizes');
		getinfo.orderByChild(uid);
		
		var sex = $('#gender').val();
		
	}
		
	/*
		Handles existing user-size dataset and sub-datasets.
		Also handle changes in gender if user wants to switch.
	*/
	function size_input(getGender, thereIsBottom, thereIsTop) {
		var brand = $('#brand').val(); //! USED THE RIGHT ID!
		var cloth_type = $('#type').val();
		var sex = $('#gender').val();
		
		if(sex != getGender) {
			size_init(); //! RISK FOR INFINITE LOOP!
			/*prompt */
		}
		
		if(thereIsBottom == false && thereIsTop == true && getGender == 'male') {	
			
		} else if (thereIsBottom == true && thereIsTop == false && getGender == 'male') {
		} else if (thereIsBottom == false && thereIsTop == false && getGender == 'male') {
		} else if (thereIsBottom == false && thereIsTop == true && getGender == 'female') {
		} else if (thereIsBottom == true && thereIsTop == false && getGender == 'female') {
		} else { //(thereIsBottom == false && thereIsTop == false && getGender =='male')
		}
	}
	
	function size_init() {
		const new_db = firebase.database().ref();
		var db = firebase.database();
		var cloth_type = $('#type').val();
		var sex = $('#gender').val();
		var json_data;
		
		//boolean values to check whether user has existing size measurement 
		//dataset/s
		var _userSizeEXISTS;
		var thereIsTop;
		var thereIsBottom;
		var getGender; //!ADD THIS AS ATTRIBUTE INTO DATABASE (/sizes)!
		
		var size_Exist = db.ref('sizes'+uid);
		size_Exist.once("value")
			.then(function(snapshot) {
				_userSizeEXISTS = snapshot.exists(); 
				/*DO CONTROL FLOW to identify top and bottom*/
				thereIsTop = snapshot.child("uid/"+   ).exists();
				thereIsBottom = snapshot.child("uid/"+   ).exists();
			});
		
		if(_userSizeEXISTS == true) {
			size_input(getGender, thereIsBottom, thereIsTop);
		} else {
		/*think if more input needed*/
		console.log(cloth_type);
		console.log(sex);
			if (sex == 'male' && cloth_type == 'top') {
				var back = $('back').val();
				var back_length = $('backlength').val();
				var chest = $('chest').val();
				var shoulder = $('shoulder').val();
				var sleeve = $('sleeve').val();
				var msl = $('#msleeve').val();
				new_db.child('sizes/'+uid).set({
					gender : 'male',
					MaleTop: {    back_length : 1 
								, chest_back : 2 
								, chest_front : 3 
								, shoulder : 4 
								, sleeve : 5 
								, waist : 6 
							 }				
				});
			} else if (sex == 'male' && cloth_type == 'bottom') {
				var mhip = $('Mhip').val();
				var mout = $('Moutseam').val();
				var min = $('Minseam').val();
				var mwaist = $('Mwaist').val();
				var mknee = $('Mknee').val();
				var mth = $('Mthigh').val();
				var mc = $('Mcalf').val();
				new_db.child('sizes/'+userID).set({
					gender : 'male',
					MaleBottom: { calf : 1
								, hip : 2
								, inseam : 3
								, knee : 4 
								, outseam : 5
								, thigh : 6 
								, waist : 7 
								}
				});
			} else if (sex == 'female' && cloth_type == 'top') {
					var bust = $('bust').val();
					var hip = $('fhip').val();
					var waist = $('waist').val();
					var body = $('body').val();
				new_db.child('sizes/'+userID).set({
					gender : 'female',
					FemaleTop: { arm_length : 2  
							, body_length : 4 
							, bust : 6 
							, hip : 8 
							, waist : 10
							}
				});		
			} else {
					var fhip = $('Fhip').val();
					var fout = $('Foutseam').val();
					var fin = $('Finseam').val();
					var fwaist = $('Fwaist').val();
					var fknee = $('Fknee').val();
					var fth = $('Fthigh').val();
					var fc = $('Fcalf').val();
				new_db.child('sizes/'+userID).set({
					gender : 'female',
					FemaleBottom: { calf : 9
								, hip : 8 
								, inseam : 7 
								, knee : 6 
								, outseam : 5 
								, thigh : 4 
								, waist : 3 
								}				
				});
			}
		}	
		
	}
	
	