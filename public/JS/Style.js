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
			//$("#submitDiv").hide();
	}

});

/*
	First search page method #2.
*/

function displaySubmit() {
	$("#submitDiv").show();
}

/*
	First search page method #3.
*/
$("#submit1").click( ()=> {
	var gender = $("input[name=genderwear]:checked").val();
	var brand = $("#idbrand option:selected").val();
	var topOrBottom = $("#sel2 option:selected").val();
	
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
var menTop = ['Armscye', 'Back Length', 'Bicep', 'Height', 'Neck', 'Shoulder width', 
			    'Chest', 'Waist', 'Neck-waist', 'Shoulder-length', 'Sleeve length'
				];
var menBottom = ['Ankle', 'Waist', 'Waist to Floor', 'Inseam',
				 'Hips', 'Thigh', 'Calf', 'Knee', 'Crotch Depth'];
var womenTop = ['Height', 'Bust', 'Cup Size', 'Shoulder', 'Shoulder Witdh', 'Arm Length', 
				'Back-Length', 'Waist', 'Waist', 'Hip', 
				];
var womenBottom = ['Ankle', 'Waist', 'Inseam', 'Waist to Knee', 'Hip', 'Thigh', 'Calf', 'Knee'];

var menRequired = ['Height', 'Neck', 'Chest', 'Waist', 'Hip', 'Inseam', 'Shoulder Width'];

var menOptional = ['Head', 'Armscye', 'Armscye Depth', 'Bicep', 'Arm Length', 'Sleeve Length', 'Elbow', 'Wrist', 'Thigh', 'Knee', 'Calf', 'Ankle', 'Crotch Depth', 'Crotch Length', 'Back Length', 'Shoulder', 'Upper Arm Length', 'Waist to Floor', 'Front Upper Chest Width', 'Upper Back Width'];

var womenRequired = ['Height', 'Bust', 'Cup Size', 'Waist', 'Hip', 'Inseam'];

var womenOptional = ['Head', 'Neck', 'Upper Chest', 'Lower Chest', 'Armscye', 'Bicep', 'Sleeve Length', 'Elbow', 'Wrist', 'Upper Hip', 'Thigh', 'Knee', 'Calf', 'Ankle', 'Crotch Depth', 'Croth Length', 'Back Length', 'Shoulder', 'Upper Arm Length', 'Arm Length', 'Armscye Depth', 'Bust to Bust', 'Front Bodice Length', 'Waist to Knee', 'Waist to Floor', 'Shoulder Width', 'Front Upper Chest Width', 'Upper Back Width'];

var men = menRequired.concat(menOptional); 
var women = womenRequired.concat(womenOptional); 

/*ERF
	Second search page. Appends array respective to gender.
*/
function append(measurements, sex, downUP) {
	var DB = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	var measures = '';
	$("#measures").empty();
	measures += '<form>';
	var userMeasureRef = DB.ref('users/' + userId +'/public_use/measurements').once('value', (online_measure) => {
		
		var online_copy = online_measure.toJSON(); //online_measure.val().JSON;
		
		for (var i = 0; i < measurements.length; ++i) {
			var measure = measurements[i].replace(/[ *]/g,"").toLowerCase();
			var searchParam = measurements[i].replace(/[*]/g,"").toLowerCase();
			
      measures += '<label>'+measurements[i]+'</label> <input type="number" id="'+measure.toUpperCase()+'" name="'+searchParam+'" value="'+online_copy[measure]+'"><br>';				
		}		
		
		/*$.each(measurements, function(index, value){
      measures += '<label>'+value+'</label> <input type="number" id="'+value.toLowerCase()+'" name="'+value.replace(/[ *]/g,"").toLowerCase()+'" class="'+sex+downUP+'"><br>';
		});*/
    
    measures += '</form>';
    $("#measures").append(measures).show();
	});
	
	$('input[type=number]').attr( {
        step : 0.01,
        min : 1,
        max : 500,
        maxlength : 5,
		placeholder : 0,
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
	var measureFields = [ ];
	if (sex == 'men' && downUP == 'top') {
		measureFields = menTop;
		append(measureFields, sex, downUP);
	} else if (sex == 'men' && downUP == 'bottom') {
		measureFields = menBottom;
		append(measureFields, sex, downUP);
	} else if (sex == 'women' && downUP == 'top') {
		measureFields = womenTop;
		append(measureFields, sex, downUP);
	} else if (sex == 'women' && downUP == 'bottom') {
		measureFields = womenBottom;
		append(measureFields, sex, downUP);
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
			//$("#submitDiv").hide();
	} else {
			$("#measurement").hide();
			//$("#submitDiv").hide();
	}

}

// Temp Switching user role function *INOCHI'S CODE starts here!

function switchRole()
{
	var role = document.getElementById('userRole').value;
	alert(role);
}

/*
	Display measurements information on user profile's page.
*/
function displayAll(measurements) {
	var measures = '';
	$("#measures").empty();
  
	$.each(measurements, function(index, value){
    var id = value.replace(/[ *]/g,"").toLowerCase();
    
		measures += '<div class="form-group"><label for="'+id+'">'+value+':'+'&nbsp;'+'</label><span id ="'+id+'0"></span><input type="number" id="'+id+'" name="'+value+'" value="" onkeypress="return event.charCode >= 48"  style="display:none;"></div>';
	});

	$("#measures").append(measures).show();
	$('input[type=number]:not(#age)').attr( {
        step : 0.01,
        min : 0,
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

function display(requiredMeasurement, optionalMeasurement) {
	var required = '';
	$("#required").empty();
  
	$.each(requiredMeasurement, function(index, value){
    var id = value.replace(/[ *]/g,"").toLowerCase();
    
		required += '<div class="col-sm-12 form-group"><label class="col-sm-4 control-label" for="'+id+'">'+value+'<span>*</span></label><div class="col-sm-4"><input type="number" id="'+id+'" name="'+value+'" class="form-control input-sm measurement" placeholder="0" onkeypress="return event.charCode >= 48" required></div></div><br>';
	});

	$("#required").append(required).show();
  
  var optional = '';
	$("#optional").empty();
  
	$.each(optionalMeasurement, function(index, value){
    var id = value.replace(/[ *]/g,"").toLowerCase();
    
		optional += '<div class="col-sm-12 form-group"><label class="col-sm-4 control-label" for="'+id+'">'+value+'</label><div class="col-sm-4"><input type="number" id="'+id+'" name="'+value+'" class="form-control input-sm measurement" value="0" onkeypress="return event.charCode >= 48"></div></div><br>';
	});

	$("#optional").append(optional).show();
  
	$('input[type=number]:not(#age)').attr( {
        step : 0.01,
        min : 0,
        max : 500,
        maxlength : 5,
        
  });

	//model getting values like this... but right #id element.
	//or parseFloat($(#id).val().toFixed(2));
	$('input[type="number"]').on('input', () => {
        this.value = parseFloat(this.value).toFixed(2);
  });
}