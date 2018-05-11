function repair()
{
	var auth = firebase.auth();
	var emailAddress = document.getElementById('email').value;

	auth.sendPasswordResetEmail(emailAddress).then(function() {
		// Email sent.
		alert("Password Reset Email had been sent");
		
		if (/Chrome/i.test(navigator.userAgent)) 
		{ 
			window.close(); 
		} 
		else
		{
			window.open('about:blank', '_self').close(); 
		}
		
	}).catch(function(error) {
		alert("Error sending Password Reset Email : "+error.message);
	});

}