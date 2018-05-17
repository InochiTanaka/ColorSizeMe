function accountDel()
{	
	if(window.confirm('Your account will be deleted, and lose all data. \nDo you continue the process?')){	
		
		firebase.auth().onAuthStateChanged(function(user) {
			
			alert("executed");
			//var database = firebase.database();
			//var userId = user.uid;
			
			alert(user);
			/*
			firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
				
			  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
			  
			  
			  alert(username);
			});*/
			/*
			firebase.database().ref('users/' + userId).remove().then(function()
			{	
				alert("Done");
			}).catch(function(error)
			{
				alert(error);
			});*/
			
			/*
			var pw = document.getElementById('pw').value;
			var credential = firebase.auth.EmailAuthProvider.credential(
						user.email	//user.email, 
						,pw 	//userProvidedPassword
			); 
			
			user.reauthenticateWithCredential(credential).then(function() {
			  // User re-authenticated.
			  	user.delete().then(function() {
				  alert("Your account had been deleted");
				}).catch(function(error) {
					alert(error);
				});
			}).catch(function(error) {
			  // An error happened.
			  alert(error);
			});
			*/
			
		});
	}
}