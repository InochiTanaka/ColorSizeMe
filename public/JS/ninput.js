  var userID = 'fNIEZuUXaGcANLERlxzUX59I1362'; //temporary variable. 
  var email = 'kevin.oane@yahoo.com'; //temporary dummy variable also while auth not yet running.


	function new_user() {
		console.log("new_user()");
		//use cloud function to get uid AND email of user!
		var db = firebase.database().ref();
		FBottom = {	
					calf : 11, hip : 1, inseam : 1, 
					knee : 0, outseam : 0, thigh : 0, waist :0 
					};
		FTop = {	
					arm_length : 0, body_length : 0, 
					bust : 0, hip : 0, waist : 0
				};
		
		MBottom = {
					calf : 0, hip : 0, knee : 0, inseam : 0, outseam : 0, 
					thigh : 0, waist : 0
					};
		MTop = {	
					back : 0, back_length : 0,  chest : 0, 
					sleeve : 0, shoulder : 0, waist : 0 
				};
		male = { MBottom, MTop };
		female = { FBottom, FTop };
		
		
		size = {female, male};
		user_info = {email, size};
		db.child('users/'+userID).set(user_info);
		db.child('sizes/'+userID).set(size);
		/*
			ADD TRIGGER CODE TO CREATE 
			1. USER COPY IN SIZES using uid newSizeEntry(uid, size);
							where.. db.child('sizes/'+uid).set(size);
			2.*/
	}

	/*
		Handles existing users. If no user is found under /users collection. alert()
		Let user press signup button to call new_user function. NOT BEING USED. JUST IN CASE.
	*/
	function update_user() {
		var db = firebase.database().ref();
		var userExists;
		var user_in_userRecords = db.child('users/'+userID);
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
		}
	}

	function update_size() {
		console.log("updating");
		var new_db = firebase.database().ref();
		var getinfo = new_db.child('sizes/'+userID); /*Get First values and bind it to text input areas*/
		getinfo.on("value", function(data) {
			console.log(data);
			console.log(data.val());
			});	
		var cloth_type = $('#type').val();
		var sex = $('#gender').val();
		
		console.log(cloth_type);
		console.log(sex);
			if (sex == 'male' && cloth_type == 'top') {
				console.log("male_top");
				var tback = $('#back').val();
				console.log(tback);
				var back_l = $('#backlength').val();
				var tchest = $('#chest').val();
				var tshoulder = $('#shoulder').val();
				var slv = $('#sleeve').val();
				var w8 = $('#MTwaist').val();
				console.log(tback + '' + back_1 + '' + tchest + ''
							+ tshoulder + '' + slv + '' + w8);
				new_db.child('sizes/'+userID+'/male').update({
					gender : 'male',
					Mtop: {       back : tback
								, back_length : back_l 
								, chest : tchest
								, shoulder : tshoulder 
								, sleeve : slv 
								, waist : w8
							 }				
				}).catch(error => {
						this.errorMessage = 'Error - ' + error.message
					  });
			} else if (sex == 'male' && cloth_type == 'bottom') {
				var mhip = $('#Mhip').val();
				var mout = $('#Moutseam').val();
				var min = $('#Minseam').val();
				var mwaist = $('#MBwaist').val();
				var mknee = $('#Mknee').val();
				var mth = $('#Mthigh').val();
				var mc = $('#Mcalf').val();
				console.log(mc);
				new_db.child('sizes/'+userID+'/female').update({
					gender : 'male',
					Mbottom: { calf : mc
								, hip : mhip
								, inseam : min
								, knee : mknee
								, outseam : mout
								, thigh : mth 
								, waist : mwaist
								}
				}).catch(error => {
						this.errorMessage = 'Error - ' + error.message
					  });
			} else if (sex == 'female' && cloth_type == 'top') {
					var tbust = $('#bust').val();
					var thip = $('#FThip').val();
					var twaist = $('#FTwaist').val();
					var body = $('#body').val();
					var al = $('#arm').val();
				new_db.child('sizes/'+userID+'/female').update({
					Ftop: { arm_length : arm 
							, body_length : body
							, bust : tbust
							, hip : thip
							, waist : twaist
							}
				}).catch(error => {
						this.errorMessage = 'Error - ' + error.message
					  });
			} else if (sex == 'female' && cloth_type == 'bottom'){
					var fhip = $('#FBhip').val();
					var fout = $('#Foutseam').val();
					var fin = $('#Finseam').val();
					var fwaist = $('#FBwaist').val();
					var fknee = $('#Fknee').val();
					var fth = $('#Fthigh').val();
					var fc = $('#Fcalf').val();
				new_db.child('sizes/'+userID+'/female').update({
					FBottom: { calf : 9
								, hip : 8 
								, inseam : 7 
								, knee : 6 
								, outseam : 5 
								, thigh : 4 
								, waist : 3 
								}				
				}).catch(error => {
						this.errorMessage = 'Error - ' + error.message
					  });
			}
	
		
		//getinfo.orderByChild(uid);
		//For every successul set of information under sizes... (call
		//trigger method as follows;
		/*1. onWrite trigger to update size measurements in users/uid & sizes/uid
		  2. searches sites...as promise? then...
		  3. onCreate trigger to create entry for garment/cloth found in Zara/H&M.
		*/
	}

	
	