var mainStore;
var closeShop1;
var closeShop2;
var tempString = '';
var tempStringNear = '';
//local storage items: mainStore, closeShop1, closeShop2, activeSearchTerm, activeMainSearch, activeNearSearch, activeNearSearchString, shoppingCart, cartLoc1Code, cartLoc2Code, cartLoc3Code

function searchStore(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            var results = JSON.parse(this.responseText);
            //console.log(results);
            var tempString = '';
            for(let i = 0; i < results.length; i++){
                tempString += ("<li><a href='search.html' id='" + results[i][0] + "' data-Address='" + results[i][2]+"' data-closeShop1='" + results[i][3] + "' data-closeShop2='" + results[i][4] + "'  onClick='selectStore(this.id)'>"+results[i][1]+"</a></li>");
                //href='search.html' tempString += ("<li id='" + results[i][0] + "' data-Address='" + results[i][2]+"' data-closeShop1=" + results[i][3] + "' data-closeShop2='" + results[i][4] + "'><a href='search.html' onClick='selectStore(this.id)'>"+results[i][1]+"</a></li>");
                //console.log(tempString);
            }
            document.getElementById("myUL").innerHTML = tempString;
        }
    };
    xmlhttp.open("GET", "http://litcartphp-env.eba-jwm3ay9c.us-east-2.elasticbeanstalk.com/LIT_store_php.php", true);
    xmlhttp.send();
}

function selectStore(currentID){
    var thisElement = document.getElementById(currentID);
    var closeElement1 = document.getElementById(document.getElementById(currentID).getAttribute("data-closeShop1"));
    var closeElement2 = document.getElementById(document.getElementById(currentID).getAttribute("data-closeShop2"));
    mainStore = {id:thisElement.getAttribute("id"),name:thisElement.innerHTML,address:thisElement.getAttribute("data-Address")};
    closeShop1 = {id:closeElement1.getAttribute("id"),name:closeElement1.innerHTML,address:closeElement1.getAttribute("data-Address")};
    closeShop2 = {id:closeElement2.getAttribute("id"),name:closeElement2.innerHTML,address:closeElement2.getAttribute("data-Address")};
    window.localStorage.setItem("mainStore", JSON.stringify(mainStore));
    window.localStorage.setItem("closeShop1", JSON.stringify(closeShop1));
    window.localStorage.setItem("closeShop2", JSON.stringify(closeShop2));
    window.localStorage.setItem("shoppingCart","");
    window.localStorage.setItem("cartLoc1Code","");
    window.localStorage.setItem("cartLoc2Code","");
    window.localStorage.setItem("cartLoc3Code","");
    window.localStorage.setItem("activeSearchTerm","");
    window.localStorage.setItem("activeMainSearch",""); 
    window.localStorage.setItem("activeNearSearch","");
    window.localStorage.setItem("activeNearSearchString","");
}

function locationUpdate(){
    document.getElementById("locale").innerHTML = JSON.parse(window.localStorage.getItem("mainStore")).name;
}

function searchProductsMain(){
    //clear everything on the page first
    document.getElementById("productCardContainer").innerHTML = '';
    tempString = '';
    //get stuff
    var searchTerm = document.getElementById('itemSearch').value;
    window.localStorage.setItem("activeSearchTerm",searchTerm);
    var results;
    if(searchTerm != ''){
        var store = JSON.parse(window.localStorage.getItem("mainStore"));
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                results = JSON.parse(this.responseText);
                tempString = '';
                for(let i = 0; i < results.length; i++){
                    var colour = '';
                    if(results[i][3]<35){
                        colour = "red";
                    } else if(results[i][3]>=35 && results[i][3] <100){
                        colour = "yellow";
                    } else {
                        colour = "green";
                    }

                    tempString += ("<div class='card' id='prod" + store.id + results[i][0] + "' data-prodName='" + results[i][1] + "' data-Price='" + results[i][2] + "' data-Quantity='" + results[i][3] + "' data-restockDate='" + results[i][4] + "' data-Location='" + store.id + "'>");
                    tempString += ("<section><span class='phead'>" + results[i][1] + "</span><button onclick='moreDetails()' class='plus' style='float:right;'><i class='fa fa-plus'></i></button>");
                    tempString += ("<p class='pcontent'> Next Stock Arriving: " + results[i][4] + "</p><span id='color" + store.id + results[i][0] + "' style='background-color:" + colour + ";padding:10px;border:1px solid #ccc;float:right;'> </span></section>");
                    tempString += ("<section id='toggle' style='display:none;margin-top:2px;'><p class='pcontent'> Price: " + results[i][2] + "</p><p class='pcontent'> Qty: " + results[i][3] + "</p></section>");
                    tempString += ("<button class='button' style='font-size:3vw;padding:5px 100px;margin-top:10px;' onclick='selectProduct(\"prod" + store.id + results[i][0] + "\")'>Add To Cart</button></div>");
                }
                document.getElementById("productCardContainer").innerHTML = tempString;
                window.localStorage.setItem("activeMainSearch", tempString);
            }
        };
        xmlhttp.open("GET", "http://litcartphp-env.eba-jwm3ay9c.us-east-2.elasticbeanstalk.com/LIT_product_php.php?query="+searchTerm.toUpperCase()+"&store="+store.id, true);
        xmlhttp.send();
    }
}

function checkSearchTermNear(){
    if(window.localStorage.getItem("activeSearchTerm") != window.localStorage.getItem("activeNearSearch")){
        searchProductsNear();
        window.localStorage.setItem("activeNearSearch", window.localStorage.getItem("activeSearchTerm"));
    } else {
        document.getElementById("productCardContainerNear").innerHTML = window.localStorage.getItem("activeNearSearchString");
    }
}

function searchProductsNear(){
    //clear everything on the page first
    document.getElementById("productCardContainerNear").innerHTML = '';
    tempStringNear = '';
    //get stuff
    searchProductNearCore(JSON.parse(window.localStorage.getItem("closeShop1")));
    searchProductNearCore(JSON.parse(window.localStorage.getItem("closeShop2")));
    document.getElementById("productCardContainerNear").innerHTML = tempStringNear;
    window.localStorage.setItem("activeNearSearchString", tempStringNear);
}

function searchProductNearCore(targetStore){
    var results;
    if(window.localStorage.getItem("activeSearchTerm") != ''){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                results = JSON.parse(this.responseText);
                for(let i = 0; i < results.length; i++){
                    var colour = '';
                    if(results[i][3]<35){
                        colour = "red";
                    } else if(results[i][3]>=35 && results[i][3] <100){
                        colour = "yellow";
                    } else {
                        colour = "green";
                    }

                    tempStringNear += ("<div class='card' id='prod" + targetStore.id + results[i][0] + "' data-prodName='" + results[i][1] + "' data-Price='" + results[i][2] + "' data-Quantity='" + results[i][3] + "' data-restockDate='" + results[i][4] + "' data-Location='" + targetStore.id + "'>");
                    tempStringNear += ("<section><span class='phead'>" + results[i][1] + "</span><button onclick='moreDetails()' class='plus' style='float:right;'><i class='fa fa-plus'></i></button>");
                    tempStringNear += ("<p class='pcontent'>" + targetStore.name + "</p>");
                    tempStringNear += ("<span id='color' style='background-color:" + colour + ";padding:10px;border:1px solid #ccc;float:right;'> </span><p class='pcontent'> Next Stock Arriving: " + results[i][4] + "</p></section>");
                    tempStringNear += ("<section id='toggle' style='display:none;margin-top:2px;'><p class='pcontent'> Price: " + results[i][2] + "</p><p class='pcontent'> Qty: " + results[i][3] + "</p></section>");
                    tempStringNear += ("<button class='button' style='font-size:3vw;padding:5px 100px;margin-top:10px;' onclick='selectProduct(\"prod" + targetStore.id + results[i][0] + "\")'><a href='search.html' style='color:white;text-decoration:none'>Add to Cart</a></button></div>");
                }
                document.getElementById("productCardContainerNear").innerHTML = tempStringNear;
                window.localStorage.setItem("activeNearSearchString", tempStringNear);
            }
        };
        xmlhttp.open("GET", "http://litcartphp-env.eba-jwm3ay9c.us-east-2.elasticbeanstalk.com/LIT_product_php.php?query="+window.localStorage.getItem("activeSearchTerm").toUpperCase()+"&store="+targetStore.id, true);
        xmlhttp.send();
    }
}

function restoreMain(){
    if(window.localStorage.getItem("activeSearchTerm") != ""){
        document.getElementById("productCardContainer").innerHTML = window.localStorage.getItem("activeMainSearch");
        document.getElementById("itemSearch").value = window.localStorage.getItem("activeSearchTerm");
    }
}

function selectProduct(currentID){
    var prodID = document.getElementById(currentID).getAttribute('id');
    var prodName = document.getElementById(currentID).getAttribute('data-prodName');
    var Price = document.getElementById(currentID).getAttribute('data-Price');
    var Quantity = document.getElementById(currentID).getAttribute('data-Quantity');
    var restockDate = document.getElementById(currentID).getAttribute('data-restockDate');
    var Location =  document.getElementById(currentID).getAttribute('data-Location');

    var colour = '';
    if(Quantity < 35){
        colour = "red";
    } else if(Quantity >= 35 && Quantity < 100){
        colour = "yellow";
    } else {
        colour = "green";
    }
    var tempCartBuildString = '';
    tempCartBuildString += ("<div class='card'><section><span class='phead'>" + prodName + "</span>");
    tempCartBuildString += ("<button onclick='moreDetails(\"toggle" + prodID + "\")' class='plus' style='float:right;'><i class='fa fa-plus'></i></button>");
    tempCartBuildString += ("<p class='pcontent'> Next Stock Arriving: " + restockDate + "</p>");
    tempCartBuildString += ("<span id='color" + prodID + "' style='background-color:" + colour + ";padding:10px;border:1px solid #ccc;float:right;'> </span></section>");
    tempCartBuildString += ("<section id='toggle" + prodID + "' style='display:none;margin-top:2px;'><p class='pcontent'> Price: $" + Price + "</p>");
    tempCartBuildString += ("<p class='pcontent'> Qty: " + Quantity + "</p></section>");
    tempCartBuildString += ("<button class='button' onclick='deleteProduct(\"" + prodID + "\",\"" + Location + "\")'>Delete</button></div>");
    if(Location == JSON.parse(window.localStorage.getItem("mainStore")).id){
        var tempCartString = window.localStorage.getItem("cartLoc1Code");
        tempCartString += tempCartBuildString;
        window.localStorage.setItem("cartLoc1Code",tempCartString);
        document.getElementById("productCardContainer").innerHTML = "";
        document.getElementById("itemSearch").value = "";
    } else if(Location == JSON.parse(window.localStorage.getItem("closeShop1")).id){
        var tempCartString = window.localStorage.getItem("cartLoc2Code");
        tempCartString += tempCartBuildString;
        window.localStorage.setItem("cartLoc2Code",tempCartString);
        document.getElementById("productCardContainerNear").innerHTML = "";
    } else if(Location == JSON.parse(window.localStorage.getItem("closeShop2")).id){
        var tempCartString = window.localStorage.getItem("cartLoc3Code");
        tempCartString += tempCartBuildString;
        window.localStorage.setItem("cartLoc3Code",tempCartString);
        document.getElementById("productCardContainerNear").innerHTML = "";
    }

    var tempobj = {id:prodID,name:prodName,price:Price,quantity:Quantity,restockDate:restockDate,location:Location,code:tempCartBuildString};
    if(localStorage.getItem("shoppingCart") != ""){
        var temparray = JSON.parse(localStorage.getItem("shoppingCart"));
    } else {
        var temparray = [];
    }
    temparray.push(tempobj);
    localStorage.setItem("shoppingCart",JSON.stringify(temparray));


    localStorage.setItem("activeSearchTerm","");
    localStorage.setItem("activeMainSearch","");
    localStorage.setItem("activeNearSearch","");
    localStorage.setItem("activeNearSearchString","");
}

function buildCart(){
    var mainStoreArr = JSON.parse(localStorage.getItem("mainStore"));
    var closeShop1Arr = JSON.parse(localStorage.getItem("closeShop1"));
    var closeShop2Arr = JSON.parse(localStorage.getItem("closeShop2"));
    document.getElementById("location1Header").innerHTML = mainStoreArr.name;
    document.getElementById("location1Address").innerHTML = mainStoreArr.address;
    document.getElementById("location2Header").innerHTML = closeShop1Arr.name;
    document.getElementById("location2Address").innerHTML = closeShop1Arr.address;
    document.getElementById("location3Header").innerHTML = closeShop2Arr.name;
    document.getElementById("location3Address").innerHTML = closeShop2Arr.address;
    if(localStorage.getItem("cartLoc1Code") != ""){
        document.getElementById("location1Cart").innerHTML = localStorage.getItem("cartLoc1Code");
    } else {
        document.getElementById("location1Header").style.display = "none";
        document.getElementById("location1Address").style.display = "none";
    }
    if(localStorage.getItem("cartLoc2Code") != ""){
        document.getElementById("location2Cart").innerHTML = localStorage.getItem("cartLoc2Code");
    } else {
        document.getElementById("location2Header").style.display = "none";
        document.getElementById("location2Address").style.display = "none";
    }
    if(localStorage.getItem("cartLoc3Code") != ""){
        document.getElementById("location3Cart").innerHTML = localStorage.getItem("cartLoc3Code");
    } else {
        document.getElementById("location3Header").style.display = "none";
        document.getElementById("location3Address").style.display = "none";
    }
}

function deleteProduct(prodID){
    tempArray = JSON.parse(localStorage.getItem("shoppingCart"));
    var i = -1;
    var tempID;
    var tempLocation;
    var tempCode;
    do{
        i++;
        tempID = tempArray[i].id;
        tempLocation = tempArray[i].location;
        tempCode = tempArray[i].code;
    }
    while(tempID != prodID);

    if(tempLocation == JSON.parse(localStorage.getItem("mainStore")).id){
        var tempLoc = "cartLoc1Code";
        var destLoc = "location1Cart";
    } else if(tempLocation == JSON.parse(localStorage.getItem("closeShop1")).id){
        var tempLoc = "cartLoc2Code";
        var destLoc = "location2Cart";
    } else if(tempLocation == JSON.parse(localStorage.getItem("closeShop2")).id){
        var tempLoc = "cartLoc3Code";
        var destLoc = "location3Cart";
    }
    
    var tempString = localStorage.getItem(tempLoc).replace(tempCode,"");
    localStorage.setItem(tempLoc, tempString);
    tempArray.splice(i,1);
    localStorage.setItem("shoppingCart", JSON.stringify(tempArray));
    document.getElementById(destLoc).innerHTML = localStorage.getItem(tempString);
}