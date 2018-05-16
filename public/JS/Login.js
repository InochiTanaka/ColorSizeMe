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
					document.images["loginPic"].src = "../images/keyrock1.png";	
					document.getElementById("loginPic").style.display="block";	
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("messageText0").style.display="block";
					document.getElementById("messageText1").style.display="block";
					document.getElementById("repairPassword").style.display="none";
					document.getElementById("login").style.display="none";
					document.getElementById("cancel").style.display="inline-block";
					cancel.textContent = "Back to Home";
					if(user.displayName == null)
					{
						messageText0.textContent = "Welcome, Guest ! ";	
					}
					else
					{
						messageText0.textContent = "Welcome, "+user.displayName+" ! ";	
					}
					messageText1.textContent = "The screen will back to home on 5 seconds later.";					
				}
				else
				{
					document.images["loginPic"].src = "../images/keyrocko.png";	
					document.getElementById("loginPic").style.display="block";	
					document.getElementById("messageText0").style.display="block";
					document.getElementById("messageText1").style.display="none";
					document.getElementById("repairPassword").style.display="none";
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("login").style.display="none";
					document.getElementById("cancel").style.display="inline-block";
					messageText0.textContent = "Please activate your account on Valification Email.";	
					messageText1.textContent = "Or, please Sign in another account";	
					//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
				}		
			}		
			else
			{		
				document.images["loginPic"].src = "../images/keyrock0.png";	
				document.getElementById("loginPic").style.display="block";				
				document.getElementById("email").style.display="block";
				document.getElementById("password").style.display="block";
				document.getElementById("messageText0").style.display="none";
				document.getElementById("messageText1").style.display="none";
				document.getElementById("repairPassword").style.display="block";
				document.getElementById("login").style.display="inline-block";
				document.getElementById("cancel").style.display="inline-block";
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
	
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		
		setTimeout("location.href = \"/index.html\"",5000);
		
		}).catch(function(error) {
		alert('Failed to Login : ' + error.message);
	});	
}


