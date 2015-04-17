doubleClickEvents.initializer();

var elementsToRegister = [
    {eventType: "click", element: "#collapse-banner", functionToCall: "expanded"},
    {eventType: "click", element: "#getLocation", functionToCall: "updatePosition"},
    //{eventType: "click", element: "#FF #footer-cta", functionToCall: "loadMap"},
    {eventType: "click", element: "#ff-cta", functionToCall: "shopGift"},
    {eventType: "click", element: "#get-direction-button", functionToCall: "getDirectionsExit"},
    {eventType: "keypress", element: "#autocomplete", functionToCall: "searchMap"}
];

function firstFrame(){
    motionLibrary.animations("fadeIn", "#collapse-banner h1", 0);
    motionLibrary.animations("fadeIn", "#collapse-banner h2", 0.5);
}

function expanded() {
  motionLibrary.animations("fadeIn", "#expanded-banner", 0)
  motionLibrary.animations("fadeIn", "#expanded-banner #info", 0)
  TweenMax.from("#device1", 3, {top:"-500px", ease:Strong.easeOut})
  TweenMax.to("#expanded-banner #info #f1_txt1", 2, { opacity:1, onComplete:frame2})
}

function frame2() {
  TweenMax.to("#device1", 2, {top:"0", ease:Strong.easeInOut, delay:2})
  TweenMax.to("#expanded-banner #info #f1_txt1", .5, { opacity:0, delay:1})
  TweenMax.to("#expanded-banner #info #f2_txt1", 2, { opacity:1, delay:3.5})
  TweenMax.to("#expanded-banner #info #f2_txt2", 2, { opacity:1, delay:3.7, onComplete:frame3})
}

function frame3() {
  TweenMax.to("#expanded-banner #info #f2_txt1", .5, { opacity:0, delay:1})
  TweenMax.to("#expanded-banner #info #f2_txt2", .7, { opacity:0, delay:1})
  
  TweenMax.to("#device1", 0.5, { left:115, delay:1})
  //TweenMax.to("#device1", 0.5, { scaleX:0.8, delay:1})
  TweenMax.to("#logo", .8, { opacity:1, delay:1.2})
  TweenMax.to("#device2", 0.1, { opacity:1, delay:1.24})
  TweenMax.to("#deviceBlur01", 0.1, { opacity:1, delay:1.26})
  TweenMax.to("#device3", 0.1, { opacity:1, delay:1.30})
  TweenMax.to("#device4", 0.1, { opacity:1, delay:1.34})
  TweenMax.to("#deviceBlur02", 0.1, { opacity:1, delay:1.36})
  TweenMax.to("#device5", 0.1, { opacity:1, delay:1.40})
  
  TweenMax.to("#expanded-banner #info #f3_txt1", .5, { left: 12, opacity:1, delay:2})
  TweenMax.to("#expanded-banner #info #f3_txt2", .7, { left: 12, opacity:1, delay:2.1})
  TweenMax.to("#expanded-banner #info #f3_txt3", .7, { left: 12, opacity:1, delay:2.2})
  
  TweenMax.to("#device1", 0.1, { opacity:0, delay:1.3})
  TweenMax.to("#device2", 0.1, { opacity:0, delay:1.3})
  TweenMax.to("#deviceBlur01", 0.1, { opacity:0, delay:1.3})
  TweenMax.to("#device3", 0.1, { opacity:0, delay:1.3})
  TweenMax.to("#device4", 0.1, { opacity:0, delay:1.34})
  TweenMax.to("#deviceBlur02", 0.1, { opacity:0, delay:1.38})
  TweenMax.to("#device5", 0.8, { top:40, delay:2.2})
  
  TweenMax.to("#expanded-banner #info #f3_txt1", .5, { left: -150, opacity:0, delay:4})
  TweenMax.to("#expanded-banner #info #f3_txt2", .7, { left: -150, opacity:0, delay:4.1})
  TweenMax.to("#expanded-banner #info #f3_txt3", .7, { left: -150, opacity:0, delay:4.2})
  TweenMax.to("#device5", 0.8, { left:"300px", delay:4.2, onComplete:frame4})
  
}

function frame4(){
TweenMax.to("#logo", 0, { opacity:1, delay:1.2})
  TweenMax.to("#device6", .8, { left: 185, opacity:1, delay:0.2})
  TweenMax.to("#FF #ff_txt1", .5, { left: 12, opacity:1, delay:0.4})
  TweenMax.to("#expanded-banner #FF #ff_txt2", .7, { left: 12, opacity:1, delay:0.5})
  
  
  TweenMax.from("#FF #footer", 1, { top:460, delay:2, ease:Strong.easeOut})   
}

function shopGift(){
  window.open('http://www.verizonwireless.com/smartphones/samsung/','_blank');
}

// function loadMap(){
//   motionLibrary.animations("fadeIn", "#map", 0.5);
//   updatePosition();
//   buildSlidesSize();
// }


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
    //Enabler.requestCollapse();
    //Enabler.exit('Get Directions Exit', 'http://www.verizonwireless.com/vzw/storelocator/store-list-result.jsp?allow=1&result=verizon&q=' + searchInput.value);
    window.open('http://www.verizonwireless.com/vzw/storelocator/store-list-result.jsp?allow=1&result=verizon&q=' + searchInput.value);
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
  //updatePosition();
  if(!mapLoaded) {
      setMap();
  }else {
      zoomToAddress();
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

    if(e.target.hasClass('search-icon')) {
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