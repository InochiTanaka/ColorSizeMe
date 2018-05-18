function jumpToLocate(param)
{
	param = param.substring(1);
	location.href = param;
}

function jumpToIndex()
{
	location.href = "/";
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
