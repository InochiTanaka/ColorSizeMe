function moveToIndex(){
	
	location.href = "/index.html";
}

function closeAndreload()
{
	window.opener.location.reload(false);
	
	if (/Chrome/i.test(navigator.userAgent)) 
	{ 
		window.close(); 
	} 
	else 
	{ 
		window.open('about:blank', '_self').close(); 
	}
}
