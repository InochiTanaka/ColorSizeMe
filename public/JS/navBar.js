window.onload = function()
{	
			//alert(document.getElementById("email").value);

	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{		
			if(user.emailVerified)
			{
				document.getElementById("logout").style.display="inline";
				document.getElementById("login").style.display="none";
				document.getElementById("signup").style.display="none";
				messageText.textContent = "Welcome, "+user.uid+" ! ";	
				
				/*name = user.displayName;
				  email = user.email;
				  photoUrl = user.photoURL;
				  emailVerified = user.emailVerified;
				  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
								   // this value to authenticate with your backend server, if
								   // you have one. Use User.getToken() instead.*/
			}
			else
			{
				document.getElementById("logout").style.display="none";
				document.getElementById("login").style.display="inline";
				document.getElementById("signup").style.display="inline";
				messageText.textContent = "";	
				//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
			}		
		}		
		else
		{			
			messageText.textContent = "";	
			document.getElementById("logout").style.display="none";
			document.getElementById("login").style.display="inline";
			document.getElementById("signup").style.display="inline";
			loginState.textContent = "Log In";						
		}	
	});		
}

function loginFunction()
{			
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{		
			if(user.emailVerified)
			{
			}
			else
			{
				location.href = "/authentication.html" ;	
				//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
			}		
		}		
		else
		{			
			login = window.open("/login.html","Log In","width=500dp,height=400dp,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,directories=no,resizable=yes");
			login.focus();
		}	
	});						
}


function logoutFunction()
{
	if(window.confirm('Do you log out?')){
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {	
				//location.reload();			
				firebase.auth().signOut().then(user => {
					location.reload();
				 }, err => {
				alert(err);
			});
			}
		});
	}
}

function signupFunction()
{			
	/*firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{			
		}		
		else
		{	*/		
			location.href = "/authentication.html" ;		
		/*}	
	});	*/					
}