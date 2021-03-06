var found;
var cookiearray;
var refreshIntervalId;
var DB = firebase.database();
window.onload = function () {
        cookiearray = document.cookie.split(':');
    }
    /*Callback function to return and load results*/
$("#submit2").click(() => {
    refreshIntervalId = setInterval(function () {
        var brand = cookiearray[1];
        var sex = cookiearray[0];
        var gender = (sex == 'men' ? 'Male' : 'Female');
        var botUP = cookiearray[2];
        var categ = $("._type option:selected").val().toLowerCase();
        var measures = {}; //temporary JSON.
        var searchForm = $.each($('form').serializeArray(), () => {
            measures[this.name] = this.value;
        });
        var unitMeasurement = $("#measure option:selected").val();
        if (unitMeasurement == 'centimeter') {
            searchForm = centi_converter(searchForm);
        }
        var json_items;
        if (brand == 'hnm') {
            my_size = hnm(gender, botUP, categ, searchForm); //should render html effects on return?
        }
        if (my_size != null) {
            document.cookie = brand + ":" + gender + ":" + botUP + ":" + categ + ":" + my_size;
            window.location.href = "clothes.html";
        }
        //
        //PARSE AND BIND JSON HERE!
    }, 300);
});
// Converter
// from centi -> inches
function centi_converter(input) {
    const cmIN = 0.393701;
    input.forEach(key => {
        key.value *= cmIN;
        key.value = key.value.toFixed(2);
    })
    return input;
};

function isMale(sex) {
    if (sex == 'Male') return true;
    return false;
}

function isTop(botUP) {
    if (botUP == 'top') return true;
    return false;
}

function isDenim(categ) {
    if (categ == 'denim') return true;
    return false;
}

function hnm(sex, botUP, categ, measures) {
    const isPetite = 63.0;
    const brand = 'Hnm'; //mistake, should have been 'hnm' on firebase.
    var sizePATH;
    var criteria;
    //gender-clothing categories under hnm.
    var _else = ['chest', 'waist', 'hip', 'inseam']; //M/F
    var _denim = ['waist']; //M/F
    var _shirts = ['chest', 'waist']; //M
    //var height = parseFloat(measures.height);
    if (isMale(sex)) { //3 options for male
        if (isDenim(categ)) {
            sizePATH = 'jeans';
            criteria = _denim.slice(0);
        }
        else if (categ == 'shirts') {
            sizePATH = 'shirts';
            criteria = _shirts.slice(0, 2);
        }
        else if (botUP == 'top') {
            sizePATH = 'else';
            criteria = _else.slice(0, 2);
        }
        else if (botUP == 'bottom') {
            sizePATH = 'else';
            criteria = _else.slice(2, 4);
        }
    }
    else { //4 options for female
        if (isDenim(categ)) {
            sizePATH = 'jeans';
            criteria = _denim.slice(0);
        }
        else if (isTop(botUP)) {
            sizePATH = 'else';
            criteria = _else.slice(0, 2);
        }
        else if (!isTop(botUP)) {
            sizePATH = 'else';
            criteria = _else.slice(2, 4); //decide if hip to be added...
        }
    }
    //CALL TWO FUNCTIONS. find size...
    evalSizes(sex, botUP, categ, measures, criteria, sizePATH);
    //GET PATH with that size
    //var productSizeList = getProductSizeList(brand, sex, botUP, categ, found); //gets JSON of products sizes.
    //var products = prodMetadata(brand, sex, botUP, productSizeList); //gets JSON object of product# data for rendering.
    return found;
}
var removeElement = ((array, element) => {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
});
var copyValues = ((criteria, measures) => {
    const copy = {};
    measures.forEach(key => {
        /*if(measures[key] != undefined) {
        	copy[key] = measures[key];
        }*/
        for (var i = 0; i < criteria.length; i++) {
            if (criteria[i] == key.name) {
                copy[key.name] = key.value;
                //this.criteria = removeElement(this.criteria, criteria[i]);
            }
        }
    })
    return copy;
});
/*
	Sex : Male || Female
	botUP: top || bottom
	categ: what clothing user chose...
	measures : json object containing measurements by user
	which_ones : contains the measure keys needed to get user's measurement value
	sizePATH : Connects to right path in firebase containing mesaurements to compare against user data.
*/
const limit = 0.5;
var evalSizes = function (sex, botUP, categ, measures, criteria, sizePATH) {
    var selected_measures = copyValues(criteria, measures);
    var size; //'Hnm/" + sex + "/" + sizePATH + "'
    var promises = [];
    promises.push(DB.ref('Hnm/' + sex + '/' + sizePATH).once('value'));
    // Wait for all promises to resolve
    Promise.all(promises).then(function (sizes) {
        //gives back size list
        var fit = {};
        //console.log(sizesRef.toString());
        sizes[0].forEach(function (measuresSnap) { //iterate every size
            var count = 0; //counter variable for single-measures
            var multiple_count = 0; //variables for multiple measures per size.
            if (measuresSnap.hasChildren() == 0) //singular measure inside
            { //console.log( measuresSnap.key + ' ' + measuresSnap.val());
                if (sizePATH == 'jeans') { //categ?
                    count = single_measure_evaluation('waist', selected_measures, measuresSnap, count);
                    if (count == 0.5) {
                        size = hnm_jean_upsize(measuresSnap.key);
                    }
                    else if (count == 1) {
                        size = measuresSnap.key;
                    } //do else 
                }
            }
            else //multiple measures are inside i.e. else & tshirts.
            {
                measuresSnap.forEach(function (measure) { // each size consisting of > 1 measure variables...
                    multiple_count += multiple_measures_eval(botUP, categ, criteria, multiple_count, measure, selected_measures, sizePATH);
                });
                var poss_size = measuresSnap.key;
                if (multiple_count != 0) {
                    if (jQuery.isEmptyObject(fit)) {
                        fit = {
                            [poss_size]: multiple_count
                        }
                        size = Object.keys(fit)[0];
                    }
                    else if (parseFloat(Object.values(fit)) < multiple_count) {
                        fit = {
                            [poss_size]: multiple_count
                        }
                        size = Object.keys(fit)[0];
                    }
                    /*else if (fit.poss_size == multiple_count) {
                                               continue;
                                               }
                                           }*/
                }
            }
        });
        if (size == null) {
            alert("Sorry, there are no clothes that match your measurement!");
            clearInterval(refreshIntervalId);
        }
        else {
            found = size;
        }
        //return size;  
    });
}

function hnm_jean_upsize(sizeKey) {
    switch (sizeKey) { //jeans
    case 'S':
        return 'M';
    case 'M':
        return 'L';
    case 'L':
        return 'XL';
    case 'XL':
        return 'XL';
    default:
        break;
    }
}

function single_measure_evaluation(single_measure, selected_measures, measuresSnap, count) {
    var _arr = [];
    var num = parseFloat(selected_measures[single_measure]);
    var _minMax = measuresSnap.val();
    var _split = _minMax.split("-");
    _arr = _arr.concat(_split);
    if (num >= parseFloat(_arr[0]) && num <= parseFloat(_arr[1])) {
        count += 1;
    }
    else if (Math.abs(num - parseFloat(_arr[0])) <= limit || Math.abs(num - parseFloat(_arr[1])) <= limit) {
        count += 0.5;
    }
    return count;
}

function multiple_measures_eval(botUP, categ, criteria, multiple_count, measure, selected_measures, sizePATH) {
    for (var i = 0; i < criteria.length; ++i) {
        var _arr = [];
        var num = parseFloat(selected_measures[criteria[i]]);
        var _minMax = measure.val();
        var _split = _minMax.split("-");
        _arr = _arr.concat(_split);
        if (num >= parseFloat(_arr[0]) && num <= parseFloat(_arr[1])) {
            multiple_count += 1;
        }
        else if (Math.abs(num - parseFloat(_arr[0])) <= limit || Math.abs(num - parseFloat(_arr[1])) <= limit) {
            multiple_count += 0.5;
        }
        // else if not above... then get max of lower size and min NEXT SIZE... 
        // save previous value and compare to next...
        return multiple_count;
    }
}