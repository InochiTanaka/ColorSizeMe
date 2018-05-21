
/*Callback function to return and load results*/
$("#submit2").click( ()=> {
	var brand = $("#_brand").text().toLowerCase();
	var sex	= $("#_sex").text().toLowerCase();
	
	sex = (sex == 'men' ? 'Male' : 'Female');
	
	var botUP = $("#_tb").text().toLowerCase();
	var categ = $("._type option:selected").val().toLowerCase();
	
	var measures = { }; //temporary JSON.
	
	var searchForm = $.each($('form').serializeArray(), ()=> {
		measures[this.name] = this.value;
	});
	
	var json_items;
	if (brand == 'hnm') {
		json_items = hnm(sex, botUP, categ, searchForm); //should render html effects on return?
	}
	//PARSE AND BIND JSON HERE!
	alert('Here are results');
});  


function isMale(sex) {
	if (sex == 'male') 
		return true;
	return false;
}

function isTop(botUP) {
	if (botUP == 'top') 
		return true;
	return false;
}

function isDenim(categ) {
	if (categ == 'denim') 
		return true;
	return false;
}

var hnm = function(sex, botUP, categ, measures) { 
	const isPetite = 63.0;
	const brand = 'Hnm'; //mistake, should have been 'hnm' on firebase.
	var sizePATH;
	var which_ones;
	
	//gender-clothing categories under hnm.
	var _else = ['chest', 'inseam', 'seat-low-hip', 'waist']; //M/F
	var _denim = ['waist']; //M/F
	var _shirts = ['chest', 'waist']; //M
	
	var height = parseFloat(measures.height);

	if (isMale(sex)) { //3 options for male
		if (isDenim(categ))  
		{
			sizePATH = 'jeans';
			which_ones = _denim;
		} 
		else if (categ == 'shirts') 
		{
			sizePATH = 'shirts';
			which_ones = _shirts;
		} 
		else 
		{
			sizePATH = 'else';
		}
	} else { //4 options for female
		if (height <= isPetite) {
			sizePATH  = 'else';
			which_ones = _else;
		} else if (isDenim(categ) && (height > isPetite)) {
			sizePATH = 'jeans';
			which_ones = _denim;
		} else if (!isDenim(categ)  && (height > isPetite)) {
			sizePATH = 'else';
			which_ones = _else;
		}
	}

	//CALL TWO FUNCTIONS. find size...
	var user_size = evalSizes(sex, botUP, categ, measures, which_ones, sizePATH);
	//GET PATH with that size
	var productSizeList = getProductSizes(brand, sex, botUP, categ, user_size); //gets JSON of products sizes.
	//var products = prodMetadata(brand, sex, botUP, productSizeList); //gets JSON object of product# data for rendering.
};

/*Sets path and get everything of that clothing category of that size. Returns json object*/
function productSizeList(brand, sex, botUP, categ, user_size) {
	var json;
	var _thebrand;
	var prodListRef = firebase.database();
	json = prods.toJSON();
	prodListRef.ref('hnm_' + botUP + '_siztems/' + user_size + '/' + categ +').once(' + value + ', (prods) => {' + json + ' }');	
	return json;
}

//var evalSizes = function(brand, sex, botUP, categ, measures, which_ones, PATH) 
/*
	Sex : Male || Female
	botUP: top || bottom
	categ: what clothing user chose...
	measures : json object containing measurements by user
	which_ones : contains the measure keys needed to get user's measurement value
	sizePATH : Connects to right path in firebase containing mesaurements to compare against user data.
*/
var evalSizes = function(sex, botUP, categ, measures, which_ones, sizePATH)
{
	var DB = firebase.database();	
	var selected_measures = { };
	
	for (var v in measures) {								//get needed measure variables
		for (var i = 0; i < which_ones.length; ++i) {
			if( v == which_ones[i]) {
				selected_measures = { v : measures.v }
			}
		}
	}
	var size;
	var sizesRef = DB.ref('Hnm/" + sex + "/" + sizePATH + "').orderByChild('sizePATH').on('value',
		function(sizes) { //gives back size list
			const limit = 0.5;
				sizes.forEach(function(measuresSnap) { 				//iterate every size
					var count = 0; 									//counter variable
					if (measuresSnap.hasChildren() == 0) 			//singular measure inside
					{ //console.log( measuresSnap.key + ' ' + measuresSnap.val());
						if (sizePATH == 'jeans') {
							count = single_measure_evaluation(categ, selected_measures, measuresSnap.val(),count);					
							if (count == 0.5) {
								size = hnm_jean_upsize(measureSnap.key);
							} else if (count == 1) {
								size = measureSnap.key;
							} //do else 
					}
					else //multiple measures are inside
					{
						var multiple_count = 0;
						measuresSnap.forEach(function (measure) {				
							if (sizePATH == 'else') 
							{ //do waist
								multiple_count += multiple_measure_evaluation(sizePATH, selected_measures, key_criterion, measure.val, count);
							} 
							else if (sizePATH == 'shirts') 
							{
								multiple_count += multiple_measure_evaluation(sizePATH, selected_measures, key_criterion, measure.val, count);
							}	
						});
					}			
					}
				});
		});
	return size;
}
function multiple_measure_evaluation(sizePATH, selected_measures, key_criterion, val, count) {
	if (sizePATH == 'else') {
		var minMax = val;
		var split = minMax.split("-");  
		var arr = arr.concat(split); //[0] = min, [1] = max	
		for (var measure in selected_measures) {
			var num = parseFloat(selected_measures.key_criterion);
			if (num >= parseFloat(_arr[0]) && num <= parseFloat(_arr[1]) ) {
				count +=1
			} else if ( abs(num - parseFloat(_arr[0]) <= limit) ||
				abs(num - parseFloat(_arr[1]) <= limit) ) {
				count += 0.5;
			} 
		}
	} else if (sizePATH == 'shirts') {
		var _minMax = val;
		var _split = minMax.split("-");  
		var _arr = arr.concat(split); //[0] = min, [1] = max		
		for (var measure in selected_measures) {
			var num = parseFloat(selected_measures.key_criterion);
			if (num >= parseFloat(_arr[0]) && num <= parseFloat(_arr[1]) ) {
				count +=1
			} else if ( abs(num - parseFloat(_arr[0]) <= limit) ||
				abs(num - parseFloat(_arr[1]) <= limit) ) {
				count += 0.5;
			} 
		}
	}
	return count;
}	
function hnm_jean_upsize(sizeKey) {
		switch(sizeKey) { //jeans
			case 'S' : return 'M';
			case 'M' : return 'L';
			case 'L' : return 'XL';
			case 'XL' : return 'XL';
			default : break;
		}	
}

function single_measure_evaluation(single_measure, selected_measures, measuresSnap, count) {
	var num = parseFloat(selected_measures+'.'+single_measure);
	var _minMax = measureSnap.val();
	var _split = MINMAX.split("-");
	var _arr = arr.concat(_split);
	if ( num >= parseFloat(_arr[0]) && num <= parseFloat(_arr[1])  ) {
		count += 1;
	} else if ( abs(num - parseFloat(_arr[0]) <= limit) ||
		abs(num - parseFloat(_arr[1]) <= limit) ) {
		count += 0.5;
		} 
	return count;
}