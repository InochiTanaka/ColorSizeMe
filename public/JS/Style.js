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
				messageText.textContent = "Welcome, "+user.email+" ! ";	
			}
			else
			{
				document.getElementById("logout").style.display="inline";
				document.getElementById("login").style.display="none";
				document.getElementById("signup").style.display="none";
				messageText.textContent = "Please activate your account on Valification Email. Or, please Sign un another account";	
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
				messageText.textContent = "Please activate your account on Valification Email. Or, please Sign in another account";	
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
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{			
		}		
		else
		{			
			login = window.open("/registration.html","Sign up","width=500dp,height=400dp,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,directories=no,resizable=yes");
			login.focus();
		}	
	});						
}

function display(){
    var x = document.getElementById("gender").selectedIndex;
    var gender = document.getElementById("gender").getElementsByTagName("option")[x].value;

    var y = document.getElementById("type").selectedIndex;
    var type = document.getElementById("type").getElementsByTagName("option")[y].value;

    if (gender == "male" && type == "top")
    {
        $("#brand").show();
        $("#measurement").show();
        
        $("#maletop").show();
        $("#malebottom").hide();
        $("#femalebottom").hide();
        $("#femaletop").hide();
    }
    else if (gender == "male" && type == "bottom")
    {
        $("#brand").show();
        $("#measurement").show();
        
        $("#maletop").hide();
        $("#malebottom").show();
        $("#femalebottom").hide();
        $("#femaletop").hide();        
    }
    else if (gender == "female" && type == "top")
    {
        $("#brand").show();
        $("#measurement").show();
        
        $("#maletop").hide();
        $("#malebottom").hide();
        $("#femalebottom").hide();
        $("#femaletop").show();
    }
    else if (gender == "female" && type == "bottom")
    {
        $("#brand").show();
        $("#measurement").show();
        
        $("#maletop").hide();
        $("#malebottom").hide();
        $("#femalebottom").show();
        $("#femaletop").hide();               
    }
}

var navigation = responsiveNav("#nav", {
    customToggle: "#nav-toggle"
});
