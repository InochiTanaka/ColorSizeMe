//Initial setup form
//If user is in login, show only logout button.
//If user is in logout, show except logout button.
window.onload = function(){
			firebase.auth().onAuthStateChanged(function(user)
			{
				if(user) 
				{				
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("userID").style.display="inline";
					document.getElementById("logout").style.display="inline";
					document.getElementById("login").style.display="none";
					document.getElementById("newuser").style.display="none";
					
					var email = document.getElementById('email').value;
					userID.textContent = "Welcome, "+email+" ! ";		
				}
				else
				{			
					document.getElementById("email").style.display="inline";
					document.getElementById("password").style.display="inline";
					document.getElementById("userID").style.display="none";
					document.getElementById("logout").style.display="none";
					document.getElementById("login").style.display="inline";
					document.getElementById("newuser").style.display="inline";
					userID.textContent = "";							
				}
			});
		}
	
//Set functions for Log in, Sign in, and Log out.
function execute(id)
{
	//Get email and password from UI
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var userID = document.getElementById('userID');

	if(id == "newuser")//execute when pushed Sign in button
	{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(function(error) {
			alert('Failed to register : ' + error.message);
		});
	}
	else if(id == "login")//execute when pushed Log in button
	{			
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			alert('Failed to Login : ' + error.message);
		});		
	}
	else if(id == "logout")//execute when pushed Log out button
	{
		//Check login/logout
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
			
				firebase.auth().signOut()
				.catch(function(error) {
					alert('Failed to Logout : ' + error.message);
				});		
			}
		});
	}
}