//<<<<< new_develop
//<<<<< Updated upstream
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

//=====
//>>>>> develop
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

//<<<<< new_develop
var navigation = responsiveNav("#nav", {
    customToggle: "#nav-toggle"
});
//=======
/*
	First search page method #1
*/
$(".radio-inline").change( ()=> {
	
	var gender = $("input[name=genderwear]:checked").val();
	var brand = $("#leBrand").val();
	var topOrBottom = $("input[name=topORbot]:checked").val();
	
	if ((gender) && (brand) && (topOrBottom)) {
			$("#submitDiv").show();
	} else {
			$("#submitDiv").hide();
	}

});

/*
	First search page method #2.
*/

function displaySubmit() {
	var gender = $("input[name=genderwear]:checked").val();
	var brand = $("#leBrand").val();
	var topOrBottom = $("#type").val();
	var measure = $("#measure").val();
	if (!measure && !topOrBottom && !brand && !gender) 
	{
		$("#submitDiv").hide();
	} 
	else {
		$("#submitDiv").show();
	}
}

/*
	First search page method #3.
*/
$("#submit1").click( ()=> {
	var gender = $("input[name=genderwear]:checked").val();
	var brand = $("#leBrand").val();
	var topOrBottom = $("input[name=topORbot]:checked").val();
	
	//hard-code server validatoin post-submit.
	if (	(gender != ('men' || 'women')) &&
			(brand != ('zara' || 'hnm')) &&
			(topOrBottom != ('top' || 'bottom')) )
	{
		window.location.href = "input.html";
	} else {
		if (gender=="men" && brand=="zara" && topOrBottom=="top")
		{window.location.href = "mzt.html";}
		else if (gender=="men" && brand=="zara" && topOrBottom=="bottom") 
		{window.location.href = "mzb.html";}
		else if (gender=="men" && brand=="hnm" && topOrBottom=="top") 
		{window.location.href = "mht.html";}
		else if (gender=="men" && brand=="hnm" && topOrBottom=="bottom") 
		{window.location.href = "mht.html";}
		else if (gender=="women" && brand=="zara" && topOrBottom=="top") 
		{window.location.href = "wzt.html";}
		else if (gender=="women" && brand=="zara" && topOrBottom=="bottom") 
		{window.location.href = "wzb.html";}
		else if (gender=="women" && brand=="hnm" && topOrBottom=="top") 
		{window.location.href = "wht.html";}
		else if (gender=="women" && brand=="hnm" && topOrBottom=="bottom") 
		{window.location.href = "whb.html";}
	}
});

//arrays for measurements (revised for '21')
var menTop = ['Armseye Circumference', 'Bicep', 'Height', 'Neck', 'Shoulder-shoulder-F', 
			    'Shoulder-length', 'Armsleeve-F', 'Armsleeve-B', 'Wrist', 'Chest', 'Waist', 'Neck-waist', 'Shoulder-length'
				];
var menBottom = ['Ankle', 'Waist', 'Waist-hip', 'Inseam',
				'outseam', 'Hips', 'Thigh', 'Calf', 'Knee', 'Crotch depth'];
var womenTop = ['Height', 'Bust', 'Shoulder-shoulder-F', 'Shoulder-elbow', 'Armsleeve-F',
				'Armsleeve-B', 'Waist', 'Neck-waist', 
				'Elbow-wrist'];
var womenBottom = ['Ankle', 'Waist', 'Waist-hip', 'Waist-knee', 'Inseam',
				'Outseam', 'Hips', 'Thigh', 'Calf', 'Knee'];

/*
	Second search page. Appends array respective to gender.
*/
function append(measurements) {
	var measures = '';
	$("#measures").empty();
	$.each(measurements, function(index, value){
		measures += '<label>'+value+'</label> <input type="number" id="'+value+'"><br>';
	});

	$("#measures").append(measures).show();
	$('input[type=number]').attr( {
        step : 0.01,
        min : 10,
        max : 500,
        maxlength : 5,
        value : 0
    });

	//model getting values like this... but right #id element.
	//or parseFloat($(#id).val().toFixed(2));
	$('input[type="number"]').on('input', () => {
        this.value = parseFloat(this.value).toFixed(2);
    });
}

/*
	Gets right 'sex' array.
*/
$("._type").change( ()=> {
	var sex	= $("#_sex").text().toLowerCase();
	var downUP = $("#_tb").text().toLowerCase();
	$("#measurement").show();
	measurements = [ ];
	if (sex == 'men' && downUP == 'top') {
		measurements = menTop;
		append(measurements);
	} else if (sex == 'men' && downUP == 'bottom') {
		measurements = menBottom;
		append(measurements);
	} else if (sex == 'women' && downUP == 'top') {
		measurements = womenTop;
		append(measurements);
	} else if (sex == 'women' && downUP == 'bottom') {
		measurements = womenBottom;
		append(measurements);
	}
});


/*
	Second search page method #2.
*/
$("#submit2").click( ()=> {
	//DO STUFF TO SUBMIT SEARCH QUERY FORM.
});

/*
	Second search page method #3. 
	Loads categories based on span elements.
*/
$(document).ready( ()=> {

	var downUP = $("#_tb").text().toLowerCase();
	var sex	= $("#_sex").text().toLowerCase();
	var brand = $("#_brand").text();
	var categories; 
	var options =  '<option disabled selected value> -- select an option -- </option>';

	//athletic for sports, jogging. denim for pants/jeans. shirts: tank/tops 
	//sweatshirts: cardigans...
	if (sex == 'men' && downUP == 'top')
	{
		categories = [
			'athletic', 'basics' , 'blazers', 'jackets', 'polos', 'seasonal', 'shirts', 'suits', 'sweatshirts', 'swimwear'];
	} else if (sex == 'men' && downUP == 'bottom') {
		categories = [ 'athletic', 'basics', 'denim', 'shorts', 'trousers', 'swimwear', 'underwear'];
	} else if (sex == 'women' && downUP == 'top') {
		categories = [ 'athletic', 'basics', 'blazers', 'collectionWear', 'jackets & coats', 
						'maternity', 'nightwear', '+PLUS', 'shirts', 'suits', 'sweatshirts','swimwear'];
	} else if (sex == 'women' && downUP == 'bottom') {
		categories = [ 'athletic', 'basics', 'denim', '+PLUS', 'shorts & skirts', 'tights', 'trousers', 'swimwear', 'underwear'];
	}

	$.each(categories, function(index, value){
		options += '<option value="'+value+'">'+value+'</option>';
	});
	$("._type").html(options);
});


function displayCategories(){
	
    //var x = document.getElementById("gender").selectedIndex;
	var gender = $("input[name=genderwear]:checked").val();
    
	var brand = $("#leBrand").val();
	var topOrBottom = $("input[name=topORbot]:checked").val();
	
	if ((gender) && (brand) && (topOrBottom)) {
			$("#measurement").show();
			$("#submitDiv").hide();
	} else {
			$("#measurement").hide();
			$("#submitDiv").hide();
	}

}


/////////
//>>>>> develop
// Temp Switching user role function

function switchRole()
{
	var role = document.getElementById('userRole').value;
	alert(role);
}
//<<<<<<< new_develop
//>>>>>>> Stashed changes
//=======
//>>>>>>> develop
