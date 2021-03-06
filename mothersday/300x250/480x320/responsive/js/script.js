var dimentions = [0,0,480,320];
doubleClickEvents.initializer("expandible", dimentions);

var elementsToRegister = [
    {eventType: "click", element: "#collapse-banner", functionToCall: "expanded"},
    {eventType: "click", element: "#getLocation", functionToCall: "updatePosition"},
    {eventType: "click", element: "#FF #footer-cta", functionToCall: "loadMap"},
    {eventType: "click", element: "#ff-cta", functionToCall: "shopGift"},
    {eventType: "click", element: "#get-direction-button", functionToCall: "getDirectionsExit"},
    {eventType: "keypress", element: "#autocomplete", functionToCall: "searchMap"},
    {eventType: "click", element: "#route", functionToCall: "searchMap"},
    {eventType: "click", element: "#generalClose", functionToCall: "GeneralClose"}
];

function firstFrame(){
    motionLibrary.animations("fadeIn", "#collapse-banner h1", 0);
    motionLibrary.animations("fadeIn", "#collapse-banner h2", 0.5);
}

function expanded() {
    Enabler.requestExpand();
    motionLibrary.animations("fadeIn", "#expanded-banner", 0);
    TweenMax.to("#device1", 3, {bottom:"62%", ease:Strong.easeOut, delay:.5});
    TweenMax.to("#shadow", 3, {bottom:"42%", ease:Strong.easeOut, delay:.5});
    TweenMax.to("#expanded-banner #f1_txt1", 2, { opacity:1, delay:.5, onComplete:frame2});
}

function frame2() {
    TweenMax.to("#expanded-banner #f1_txt1", .5, { opacity:0, delay:1});
    TweenMax.to("#device1", 2, {bottom:"49%", ease:Strong.easeInOut, delay:2});
    TweenMax.to("#shadow", 2, {bottom:"22%", ease:Strong.easeInOut, delay:2});
    TweenMax.to("#expanded-banner #f2_txt1", 2, { opacity:1, delay:3.5, onComplete:frame3});
}

function frame3() {
    TweenMax.to("#expanded-banner #f2_txt1", .5, { opacity:0, delay:1});
    TweenMax.to("#expanded-banner #f2_txt2", .7, { opacity:0, delay:1});
    TweenLite.set("#persp", {perspective:2800});
    TweenMax.to("#device1", 1, {left:"63%", rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5});
    TweenMax.to("#shadow", 1, {left:"51%", rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5});
    TweenMax.to("#device1", 0.01, {opacity:0, delay:2.1});
    TweenLite.set("#persp2", {perspective:2800});
    TweenMax.to("#device2", 1, {left:"63%", rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5});
    TweenMax.to("#device2", 0.1, {opacity:1, delay:2});
    TweenMax.to("#device2", 1.5, {bottom:"83%", ease:Expo.easeInOut, delay:2});
    TweenMax.to("#shadow", 1.5, {opacity:0, bottom:"-65%", ease:Expo.easeInOut, delay:2});
    TweenMax.to("#logo", 1, { opacity:1, delay:3});
    TweenMax.to("#expanded-banner #f3_txt1", .5, { left: "4.5%", opacity:1, delay:3.2});
    TweenMax.to("#expanded-banner #f3_txt2", .7, { left: "4.5%", opacity:1, delay:3.4});
    TweenMax.to("#expanded-banner #f3_txt3", .7, { left: "4.5%", opacity:1, delay:3.6});
    //TweenMax.to("#shadow", 1, {left:485, ease:Sine.easeInOut, delay:5.7});
    TweenMax.to("#expanded-banner #f3_txt1", .5, { left: "-30%", opacity:0, delay:5.5});
    TweenMax.to("#expanded-banner #f3_txt2", .4, { left: "-30%", opacity:0, delay:5.7});
    TweenMax.to("#expanded-banner #f3_txt3", .3, { left: "-30%", opacity:0, delay:5.9});
    TweenMax.to("#device2", 0.00001, { rotationY:180, ease:Power2.easeInOut, transformOrigin:"right bottom", delay:6.1});
    TweenMax.to("#device2", 0.00001, { left:"-10%", bottom:"83%", scaleX:0.95, scaleY:1, delay:6.1, onComplete:frame4});
    
    //TweenLite.set("#persp2", {perspective:2250});
    //TweenMax.to("#persp2", 0.5, {height:"1240px", delay:6.1});
    TweenMax.to("#device2", 1, {rotationY:135, scaleX:0.95, scaleY:1, ease:Power4.easeOut, transformOrigin:"right bottom", delay:6.1});
    TweenMax.to("#bordeDevice", .4, { right:"-28%", bottom:"9.5%", delay:6.2 });
    TweenMax.to("#bordeDevice", .4, { opacity: 1, delay:6 });
}

function frame4(){
    TweenMax.to("#FF", 0, { opacity:1});
    TweenMax.to("#ff_txt1", .5, { left: 12, opacity:1, delay:0.2});
    TweenMax.to("#ff_txt2", .5, { left: 12, opacity:1, delay:.3}); 
    TweenMax.to("#ff_txt3", .5, { left: 12, opacity:1, delay:.4});
    TweenMax.to("#ff_txt4", .5, { left: 12, opacity:1, delay:.5})
    TweenMax.to("#ff-cta", .5, { opacity:1, delay:.7 });  
    TweenMax.to("#ff_txt5", .5, { opacity:1, delay:.9});
    TweenMax.to("#footer-cta", .5, { opacity:1, delay:1});
}

function GeneralClose() {
    Enabler.requestCollapse();
    Enabler.reportManualClose();
    TweenMax.set("#expanded-banner", {opacity:0, display:'none'});
    TweenMax.set("#map", {opacity:0, display:'none'});
    motionLibrary.resetWhenCloseOrExit();
    mapAdded = false;
    mapLoaded = false;
    isMapCreated = false;
    document.getElementById("map-canvas").innerHTML = "";
    searchInput.value = "";
}

function shopGift(){
    Enabler.requestCollapse();
    Enabler.exit('ClickTag Shop Gift');
    TweenMax.set("#expanded-banner", {opacity:0, display:'none'});
    motionLibrary.resetWhenCloseOrExit();
}


// Map Code

var mapAdded = false,
    mapLoaded = false,
    isMapCreated = false,
    locationColumn = 'Address',
    tableId = '16vNUgk-hiwwIzq1wuSCyYFqnKHdIqfRh3umdbdnR',
    circles,
    zipCode,
    address,
    layer,
    geocoder,
    mapContainer = document.getElementById('map'),
    LatLngList = [],
    convertInd = 0,
    bounds,
    searchInput = document.getElementById('autocomplete');


function getDirectionsExit() {
    Enabler.requestCollapse();
    Enabler.exit('Get Directions Exit', 'http://www.verizonwireless.com/vzw/storelocator/store-list-result.jsp?allow=1&result=verizon&q=' + searchInput.value);
    TweenMax.set("#expanded-banner", {opacity:0, display:'none'});
    motionLibrary.resetWhenCloseOrExit();
}

function updatePosition(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(printlocation);
    } else { 
        alert("Geolocation is not supported by this browser");
    }
}


function printlocation(position) {
  var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map.panTo(center);
}

function loadMap(){
    motionLibrary.animations("fadeIn", "#map", 0.5);

    if (mapAdded == false && mapLoaded == false){
        setMap();
        mapAdded = true;
        Enabler.counter('Map Load');
    } else {
        zoomToAddress();
        Enabler.counter('Search for address');
    }
}


function convertAddress(address) {
    geocoder.geocode({
        address: address
    }, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            var resultLoc = results[0].geometry.location;
            var nearLat = resultLoc[Object.keys(resultLoc)[0]];
            var nearLng = resultLoc[Object.keys(resultLoc)[1]];

            LatLngList.push(new google.maps.LatLng(nearLat, nearLng));

            if (convertInd === 3) {
                bounds = new google.maps.LatLngBounds();
                for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
                    bounds.extend(LatLngList[i]);
                }
                map.setCenter(bounds.getCenter());
                map.fitBounds(bounds);

                LatLngList = [];
                convertInd = 0;
                bounds = null;
            } else {
                convertInd++;
            }
        }
    })
}

function searchCallback(arr) {
    for(var i = 0; i < arr.rows.length; i++) {
        convertAddress(arr.rows[i][0]);
    }
}

var zoomToAddress = function() {
    geocoder.geocode({
        address: address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // OPTIONAL: run spatial query to find results within bounds.
            var resultLoc = results[0].geometry.location;
            var nearLat = resultLoc[Object.keys(resultLoc)[0]];
            var nearLng = resultLoc[Object.keys(resultLoc)[1]];
            var where = 'ST_DISTANCE(' + locationColumn + ', LATLNG(' + nearLat + ', ' + nearLng +'))';

            var xmlhttp = new XMLHttpRequest();
            var url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20Address%20' +
                'FROM%2016vNUgk-hiwwIzq1wuSCyYFqnKHdIqfRh3umdbdnR%20ORDER%20BY%20' + where + '%20LIMIT%204' +
                '&key=AIzaSyCsUfW1UjOAmWTIQA2OkX1WQollfHDii-A';

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    searchCallback(myArr);
                }
            };
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    });
};

function setMap() {
    var defaultCenter = new google.maps.LatLng(40.7127837, -74.00594130000002);
    var defaultZoom = 8;

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    address = searchInput.value;

    google.maps.event.addListener(map, 'tilesloaded', function(evt) {
        if(!isMapCreated) {
            geocoder = new google.maps.Geocoder();

            layer = new google.maps.FusionTablesLayer({
                query: {
                    select: locationColumn,
                    from: tableId
                },
                map: map
            });

            zoomToAddress();
        }
        
        mapAdded = true;
        mapLoaded = true;
        isMapCreated = true;
    });
}

function searchMap (e) {
    address = searchInput.value;
    if (!e) e = window.event;

    if(e.target.hasClass('search')) {
        loadMap();
        return false;
    } else {
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13' && searchInput.value != '') {
            loadMap();
            return false;
        } else if (keyCode == '13' && searchInput.value == ''){
          alert("Please enter a valid direction");
        }
    }
}

// Return a boolean for one class
Element.prototype.hasClass = function (className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};
