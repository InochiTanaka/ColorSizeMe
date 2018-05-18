function accountDel()
{	
	if(window.confirm('Your account will be deleted, and lose all data. \nDo you continue the process?')){	
		
		firebase.auth().onAuthStateChanged(function(user) {
			
			var userId = user.uid;	
			
			var pw = document.getElementById('pw').value;
			var credential = firebase.auth.EmailAuthProvider.credential(
						user.email	//user.email, 
						,pw 	//userProvidedPassword
			); 
			
			user.reauthenticateWithCredential(credential).then(function() {
				
			firebase.database().ref('takenusernames/' + userId).remove().then(function()
			{	
				alert("Done/ takenusernames");
			}).catch(function(error)
			{
				alert(error);
			});
			
			firebase.database().ref('users/' + userId).remove().then(function()
			{	
				alert("Done/ users");
			}).catch(function(error)
			{
				alert(error);
			});
				
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
		});
	}
}