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
					document.getElementById("messageText0").style.display="inline";
					document.getElementById("messageText1").style.display="inline";
					document.getElementById("login").style.display="none";
					document.getElementById("close").style.display="block";
					messageText0.textContent = "Welcome, "+user.email+" ! ";
					messageText1.textContent = "This window will be closed on later.";					
				}
				else
				{
					document.getElementById("messageText").style.display="block";
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("login").style.display="none";
					document.getElementById("close").style.display="block";
					messageText0.textContent = "Please activate your account on Valification Email. Or, please Sign in another account";	
					messageText1.textContent = "";	
					//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
				}		
			}		
			else
			{			
				document.getElementById("email").style.display="block";
				document.getElementById("password").style.display="block";
				document.getElementById("messageText0").style.display="none";
				document.getElementById("messageText1").style.display="none";
				document.getElementById("login").style.display="block";
				document.getElementById("close").style.display="block";
				messageText0.textContent = "";
				messageText1.textContent = "";											
			}	
	});
}
	
//Set functions for Log in, Sign in, and Log out.
function login()
{
	//Get email and password from UI
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var messageText = document.getElementById('messageText');
	
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		
		setTimeout("window.opener.location.reload()",5000);
		setTimeout("if (/Chrome/i.test(navigator.userAgent)) { window.close(); } else { window.open('about:blank', '_self').close(); }",5100);
		
		}).catch(function(error) {
		alert('Failed to Login : ' + error.message);
	});	
}


