window.onload = function()
{	
			//alert(document.getElementById("email").value);

	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{		
			if(user.emailVerified)
			{
				loginState.textContent = "Log Out";
				messageText.textContent = "Welcome, "+user.email+" ! ";	
			}
			else
			{
				loginState.textContent = "Log Out";
				messageText.textContent = "Please activate your account on Valification Email. Or, please Sign in another account";	
				//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
			}		
		}		
		else
		{			
			messageText.textContent = "";	
			loginState.textContent = "Log In";						
		}	
	});		
}

function loginFunction(state)
{			
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user) 
		{		
			if(user.emailVerified)
			{
				if(state == "Log Out")
				{
					logOutConf();
				}	
			}
			else
			{
				messageText.textContent = "Please activate your account on Valification Email. Or, please Sign in another account";	
				//alert("Please activate your account on Valification Email.\n Or, please Sign in another account");
			}		
		}		
		else
		{			
			login = window.open("/login.html","Log In","width=960,height=600,scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,directories=no,resizable=yes");
			login.focus();
		}	
	});						
}


function logOutConf()
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
