function display(){
    var x = document.getElementById("gender").selectedIndex;
    var gender = document.getElementById("gender").getElementsByTagName("option")[x].value;

    var y = document.getElementById("type").selectedIndex;
    var type = document.getElementById("type").getElementsByTagName("option")[y].value;

    if (gender == "male" && type == "top")
    {
        $("#maletop").show();
        $("#malebottom").hide();
        $("#femalebottom").hide();
        $("#femaletop").hide();
    }
    else if (gender == "male" && type == "bottom")
    {
        $("#maletop").hide();
        $("#malebottom").show();
        $("#femalebottom").hide();
        $("#femaletop").hide();
    }
    else if (gender == "female" && type == "top")
    {
        $("#maletop").hide();
        $("#malebottom").hide();
        $("#femalebottom").hide();
        $("#femaletop").show();
    }
    else if (gender == "female" && type == "bottom")
    {
        $("#maletop").hide();
        $("#malebottom").hide();
        $("#femalebottom").show();
        $("#femaletop").hide();
    }
}