var timer = 0;
 
window.onresize = function () {
  if (timer > 0) {
    clearTimeout(timer);
  }
 
  timer = setTimeout(function () {
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user.displayName != null)
		{
			if(window.innerWidth < 769)
			{
				document.getElementById("accountMenu").style.display="none";
			}
			else
			{
				document.getElementById("accountMenu").style.display="inline-block";
			}	
		}
	});	
  }, 0);
}

window.onload = function()
{	
	//alert(document.getElementById("email").value);
	firebase.auth().onAuthStateChanged(function(user)
	{
		//alert();
		// If user auth data is exixts
		if(user) 
		{		
			//If email verifying is done:
			if(user.emailVerified)
			{
				//If user.displayName is null(means not registered yet)
				if(user.displayName == null)
				{
					document.getElementById("login").style.display="none";
					document.getElementById("signup").style.display="inline-block";
					document.getElementById("logout").style.display="inline-block";
					document.getElementById("accountMenu").style.display="none";
          //document.getElementById("users").style.display="none";
					messageText0.textContent = "Please continue \"Sign Up\" ";
					messageText1.textContent = "or";	
          $("#users").hide();					
				}
				else //If user.displayName is not null(means registered already)
				{
					document.getElementById("login").style.display="none";
					document.getElementById("logout").style.display="inline-block";
					document.getElementById("signup").style.display="none";
					document.getElementById("accountMenu").style.display="inline-block";
          //document.getElementById("users").style.display="inline-block";
					messageText0.textContent = "Welcome, "+user.displayName+" ! ";	
          $("#users").show();
					
					if(user.photoURL == null)
					{
						document.images["accountImage"].src = "../images/sampleHumanIcon.jpg";
					}
					else
					{
						document.images["accountImage"].src = user.photoURL;
					}
					/*name = user.displayName;
					  email = user.email;
					  photoUrl = user.photoURL;
					  emailVerified = user.emailVerified;
					  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
									   // this value to authenticate with your backend server, if
									   // you have one. Use User.getToken() instead.*/
				}
			}
			else //If email verrifying is not done:
			{
				document.getElementById("accountMenu").style.display="none";
				document.getElementById("login").style.display="inline-block";
				document.getElementById("signup").style.display="inline-block";
				messageText.textContent = "";	
				//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
			}		
		}		
		else //If user auth data is not exists and logout:
		{				
			document.getElementById("accountMenu").style.display="none";
			document.getElementById("login").style.display="inline-block";
			document.getElementById("logout").style.display="none";
			messageText0.textContent = "or";	
			messageText1.textContent = "";	
			document.getElementById("signup").style.display="inline-block";
      //document.getElementById("users").style.display="none";
      $("#users").hide();			
		}	
	});		
}

function loginFunction(locate)
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
			location.href = "/login.html?"+locate ;	
		}	
	});						
}


function logoutFunction()
{
	if(window.confirm('Do you want to log out?')){
    location.href = "/index.html" ;
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {	
				firebase.auth().signOut().then(function() {
					location.reload();
				}).catch(function(error) {
					alert('Failed to Logout : ' + error.message);
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
			location.href = "/auth.html" ;		
		/*}	
	});	*/					
}