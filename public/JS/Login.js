//Initial setup form
//If user is in login, show only logout button.
//If user is in logout, show except logout button.
window.onload = function()
{	
	firebase.auth().onAuthStateChanged(function(user)
	{
		//alert(user.isEmailVerified());
			//alert(user.emailVerified);
			
			if(user) 
			{		
				if(user.emailVerified)
				{
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("messageText").style.display="inline";
					document.getElementById("logout").style.display="none";
					document.getElementById("login").style.display="none";
					document.getElementById("newuser").style.display="none";
					messageText.textContent = "Welcome, "+user.email+" ! ";	
				}
				else
				{
					document.getElementById("messageText").style.display="block";
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("logout").style.display="inline";
					document.getElementById("login").style.display="none";
					document.getElementById("newuser").style.display="none";
					messageText.textContent = "Please activate your account on Valification Email. Or, please Sign in another account";	
					//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
				}		
			}		
			else
			{			
				document.getElementById("email").style.display="block";
				document.getElementById("password").style.display="block";
				document.getElementById("messageText").style.display="none";
				document.getElementById("logout").style.display="none";
				document.getElementById("login").style.display="block";
				document.getElementById("newuser").style.display="block";
				document.getElementById("close").style.display="block";
				messageText.textContent = "";							
			}	
	});
}
	
//Set functions for Log in, Sign in, and Log out.
function execute(id)
{
	//Get email and password from UI
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var messageText = document.getElementById('messageText');

	if(id == "newuser")//execute when pushed Sign in button
	{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		 .then(user => {

			user.sendEmailVerification().then(function() {
			  //alert("Sent Verification Email");
			  	//firebase.auth().signOut()
				//.catch(function(error) {
				//	alert('Failed to Logout : ' + error.message);
				//});				  
			}).catch(function(error) {
			  alert(error);
			});
			
		  }, err => {
			alert(err);
		  });
	}
	else if(id == "login")//execute when pushed Log in button
	{			
		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
			}).catch(function(error) {
			alert('Failed to Login : ' + error.message);
		});	
	}
	else if(id == "logout")//execute when pushed Log out button
	{
		//Check login/logout
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {	
				location.reload();			
				firebase.auth().signOut().then(user => {
					location.reload();
				 }, err => {
				alert(err);
			});
			}
		});
	}
	else if(id == "close")//execute when pushed Log in button
	{			
		window.open('about:blank','_self').close();
	}
}