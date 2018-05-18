window.onload = function()
{

	//alert(user.email);

}

function create(data)
{
	//alert($(data).val());
	
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user)
		{
			user.updateProfile({
			  displayName: data,
			  //photoURL: "https://example.com/jane-q-user/profile.jpg"
			}).then(function() {
			  // Update successful.
			  //alert("Pushed displayName");
			  //location.href = "/index.html" ;	
			}).catch(function(error) {
			  //alert("Mistook to push displayName");
			});
		}
		else
		{
			alert("You need to login before register your info.");
		}
	});	

}

function upload(photo)
{
	//alert($(data).val());
	
	firebase.auth().onAuthStateChanged(function(user)
	{
		if(user)
		{
			user.updateProfile({
			  photoURL: photo,
			}).then(function() {
			  // Update successful.
			}).catch(function(error) {
			  // An error happened.
			});
		}
		else
		{
			alert("You need to login before register your info.");
		}
	});	

}