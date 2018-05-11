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
					document.getElementById("authTitle").style.display="block";
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("passwordConf").style.display="none";
					document.getElementById("messageText").style.display="inline";
					document.getElementById("valify").style.display="none";
					document.getElementById("reload").style.display="none";
					document.getElementById("regist").style.display="block";
					document.getElementById("cancel").style.display="block";
					authTitle.textContent = "Welcome, "+user.email+" ! ";	
				}
				else
				{
					document.getElementById("authTitle").style.display="block";
					document.getElementById("messageText").style.display="block";
					document.getElementById("email").style.display="none";
					document.getElementById("password").style.display="none";
					document.getElementById("passwordConf").style.display="none";
					document.getElementById("valify").style.display="none";
					document.getElementById("reload").style.display="block";
					document.getElementById("regist").style.display="none";
					document.getElementById("cancel").style.display="none";
					authTitle.textContent = "Please activate your account from Valification Email";
					messageText.textContent = "Then, please push \"valified\".";	
					//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
				}		
			}		
			else
			{			
				document.getElementById("authTitle").style.display="block";
				document.getElementById("email").style.display="block";
				document.getElementById("password").style.display="block";
				document.getElementById("passwordConf").style.display="block";
				document.getElementById("messageText").style.display="none";
				document.getElementById("valify").style.display="block";
				document.getElementById("reload").style.display="none";
				document.getElementById("regist").style.display="none";
				document.getElementById("cancel").style.display="block";
				messageText.textContent = "Welcome to ColorSizeMe ! ";							
			}	
	});
}

function checkSamePassWord(password, passwordConf)
{	
	if(password != "")
	{
		if(password === passwordConf)
		{
			return true;
		}
	}
	return false;
	
}
	
//Set functions for Log in, Sign in, and Log out.
function execute(id)
{
	//Get email and password from UI
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var passwordConf = document.getElementById('passwordConf').value;
	var messageText = document.getElementById('messageText');
	
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		if(id == "regist" && user.displayName == null)//execute when pushed Log in button
		{			
			//location.href = "/signup.html";
			location.href = "/testRegist.html";
		}
	  } else {
		if(id == "valify")//execute when pushed Sign in button
		{
			if(!checkSamePassWord(password, passwordConf))
			{
				alert("Please check Password and Confirmation Password");
				location.reload(false);
			}
			else
			{
				firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {

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
			/*
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
			  */
			}
		}
	});
	
	if(id == "reload")//execute when pushed Log in button
	{			
		location.reload(true);
	}
	else if(id == "cancel")//execute when pushed Log in button
	{			
		location.href = "/index.html";
	}
}