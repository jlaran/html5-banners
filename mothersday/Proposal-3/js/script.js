doubleClickEvents.initializer();

var elementsToRegister = [
    {eventType: "click", element: "#collapse-banner", functionToCall: "expanded"},
    {eventType: "click", element: "#getLocation", functionToCall: "loadMapDC"},
    {eventType: "click", element: "#FF #footer-cta", functionToCall: "loadMapDC"},
    {eventType: "click", element: "#ff-cta", functionToCall: "shopGift"},
    {eventType: "click", element: "#route", functionToCall: "getRoute"},
    {eventType: "click", element: "#get-direction-button", functionToCall: "getDirection"}
];

function firstFrame(){
    motionLibrary.animations("fadeIn", "#collapse-banner h1", 0);
    motionLibrary.animations("fadeIn", "#collapse-banner h2", 0.5);
}

function expanded() {
  motionLibrary.animations("fadeIn", "#expanded-banner", 0)
  motionLibrary.animations("fadeIn", "#expanded-banner #info", 0)
  TweenMax.from("#device1", 3, {top:"-500px", ease:Strong.easeOut})
  TweenMax.to("#expanded-banner #info #f1_txt1", 2, { css:{alpha:1}})
  TweenMax.to("#expanded-banner #info #f1_txt2", 2, { css:{alpha:1}, delay:2, onComplete:frame2})
}

function frame2() {
  TweenMax.to("#device1", 2, {top:"-93", ease:Strong.easeInOut, delay:2})
  TweenMax.to("#expanded-banner #info #f1_txt1", .5, { css:{alpha:0}, delay:1})
  TweenMax.to("#expanded-banner #info #f1_txt2", .5, { css:{alpha:0}, delay:1.5})
  TweenMax.to("#expanded-banner #info #f2_txt1", 2, { css:{alpha:1}, delay:3.5, onComplete:frame3})
}

function frame3() {
  TweenMax.to("#expanded-banner #info #f2_txt1", 2, { css:{alpha:0} , delay:1})
  
  TweenMax.to("#device1", 1, { left:115, delay:1})
  TweenMax.to("#device1", 1, { scaleX:0.65, delay:1.3})
  TweenMax.to("#device1", 1, { css:{alpha:0}, delay:1.5})
  TweenMax.to("#device2", .8, { css:{alpha:.8}, delay:1.5})
  
  TweenMax.to("#device2", 1, { left:165, delay:2})
  TweenMax.to("#device2", 2, { scaleX:0.5, delay:2})

  TweenMax.to("#device2", .8, { css:{alpha:0}, delay:2.2})
  TweenMax.to("#device3", .8, { css:{alpha:.5}, delay:2.5})

  TweenMax.to("#device3", 1, { left:195, delay:2.8})
  TweenMax.to("#device3", 1, { scaleX:0.2, delay:2.8})
  TweenMax.to("#device3", .8, { css:{alpha:0}, delay:3})
  TweenMax.to("#device4", .8, { css:{alpha:1}, delay:3})
  TweenMax.to("#device4", 1, { left:241, delay:3.2}) 
  
  TweenMax.to("#device4", .8, { css:{alpha:0}, delay:3.5}) 
  TweenMax.to("#device5", .8, { css:{alpha:1}, delay:3.8}) 
  
  TweenMax.from("#device5", 1, { scaleX:0.4, delay:3.5})
  TweenMax.to("#device5", .8, { css:{alpha:0}, delay:3.8})

  TweenMax.from("#device6", .8, { scaleX:0.4, delay:4})
  TweenMax.to("#device6", .8, { css:{alpha:1}, delay:4.2})  
  
  
  TweenMax.to("#device6", 2, { top:63, delay:4.4, ease:Strong.easeOut}) 
  TweenMax.to("#expanded-banner #info #f3_txt1", 2, { css:{alpha:1}, delay:4.6})
  TweenMax.to("#expanded-banner #info #f3_txt2", 2, { css:{alpha:1}, delay:4.8, onComplete:frame4})
  TweenMax.to(".logo", .8, { css:{alpha:1}, delay:5})
}

function frame4(){
  TweenMax.to("#expanded-banner #info #f3_txt1", .5, { css:{alpha:0}, delay:1})
  TweenMax.to("#expanded-banner #info #f3_txt2", .5, { css:{alpha:0}, delay:1})
  TweenMax.to("#device6", .8, { css:{alpha:0, left:184, top:30}, delay:1}) 
  TweenMax.to("#device7", .8, { css:{alpha:1}, delay:1.4}) 
  TweenMax.to("#FF", .8, { css:{alpha:1}, delay:2}) 
  TweenMax.to("#FF #ff_txt1", .8, { css:{alpha:1}, delay:2.3}) 
  TweenMax.to("#FF #ff_txt2", .8, { css:{alpha:1}, delay:2.6})
  TweenMax.to("#FF #ff_txt3", .8, { css:{alpha:1}, delay:2.9})  
  TweenMax.to("#FF #ff-cta", .8, { css:{alpha:1}, delay:3.1})
  TweenMax.to("#FF #ff_txt4", .8, { css:{alpha:1}, delay:3.3})  
  TweenMax.from("#FF #footer", 1, { top:460, delay:2, ease:Strong.easeOut})   
}

function shopGift(){
  window.open('http://www.verizonwireless.com/smartphones/samsung/','_blank');
}

function loadMap(){
  motionLibrary.animations("fadeIn", "#map", 0.5);
  updatePosition();
  buildSlidesSize();
}

function getDirection(){
  window.open('http://www.verizonwireless.com/vzw/storelocator/store-list-result.jsp?allow=1&result=verizon&q=10003','_blank');
}

// Map Code

var placeSearch, 
    autocomplete, 
    autocompleteInput = document.getElementById('autocomplete'),
    loaderSpin = document.getElementById('loaderSpin'),
    ctaDirections = document.getElementById('ctaDirection'),
    componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    },
    products,
    layoutContent,
    slideContainer,
    slidesNumber,
    circles,
    zipCode,
    address,
    layer,
    geocoder,
    tableId = '16vNUgk-hiwwIzq1wuSCyYFqnKHdIqfRh3umdbdnR',
    conexion = new XMLHttpRequest(),
    locationColumn = 'Address',
    zipCode,
    stateName,
    cityName,
    mapAdded = false, 
    mapLoaded = false,
    isMapCreated = false,
    arrayOfStores = [];


function updatePosition(){


  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callMap);
    } else { 
        alert("Geolocation is not supported by this browser");
    }
}

function getRoute(){
    window.open('waze://?ll=9.927731,-84.08900&navigate=yes');
}

var arrayOfStores = [
    {
        "title": "1. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.927731, 
        "lng": -84.08900
    },
    {
        "title": "2. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.947731, 
        "lng": -84.08900
    },
    {
        "title": "3. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.927731, 
        "lng": -84.05900
    }
];

//////////////// DC functions

function loadMapDC () {
    if(!mapAdded) {
        //Enabler.loadScript('http://maps.google.com/maps/api/js?v=3.exp&sensor=false&callback=setMap');
        mapLoaded = true;
        mapAdded = true;
        setMap()
    } else {
        if(!mapLoaded) {
            setMap();
        }else {
            zoomToAddress();
        }
    }
    document.getElementById("map").style.display = 'block';
}

var LatLngList = [];
var convertInd = 0;
var bounds;

function setMap() {
    console.log('entro')
    var defaultCenter = new google.maps.LatLng(40.7127837, -74.00594130000002);
    var defaultZoom = 8;

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: defaultCenter,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            streetViewControl: false,
            zoom: 8
    });

    address = autocomplete;

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
        isMapCreated = true;
         console.log(layer)
    });
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

function searchCallback(arr) {
    for(var i = 0; i < arr.rows.length; i++) {
        convertAddress(arr.rows[i][0]);
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

//////////////// DC functions

function callMap(position){

    var bounds = new google.maps.LatLngBounds(),
        infowindow = new google.maps.InfoWindow(),
        centerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: centerLocation,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            streetViewControl: false,
            zoom: 8
        });

    for (var i = 0; i < arrayOfStores.length; i++) {
      var localLocation = new google.maps.LatLng(arrayOfStores[i].lat, arrayOfStores[i].lng),
      marker = new google.maps.Marker({
        position: localLocation,
        map: map,
        title: arrayOfStores[i].title
      });

      bounds.extend(marker.position);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(arrayOfStores[i].title);//locations[i][0]
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

    map.fitBounds(bounds);
}


//AUTOCOMPLETE CODE

initialize();

function initialize() {
    var options = { 
      types: ['geocode'],
      componentRestrictions: {country: "us"}
    }

    autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInAddress();
    });
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      if(addressType == 'locality'){
        cityName = val;
      }else if(addressType == 'administrative_area_level_1'){
        stateName = val;
      }else if(addressType == 'postal_code'){
        zipCode = val;
      }
    }
  }

  if ((cityName && stateName) || zipCode) {
    console.log(cityName +" "+ stateName);
  }else{
    alert('Please enter a valid State and City from the US');
  }
}

// Slider Code
//Common Vars
var sliderParentDiv = document.getElementById('slider'),
	sliderBullets = document.getElementById('bullets'),
	container = document.getElementById('container'),
	rightArrow = document.getElementById('right-arrow'),
	leftArrow = document.getElementById('left-arrow'),
  slides,
	slideOffsetWidth,
	currentSlide = 1,
	marginRight = 10,
    active = false;

//Set Content
for (var i = 0; i < arrayOfStores.length; i++) {
    container.innerHTML += '<div><p class="bold">'+arrayOfStores[i].title+'</p><p class="bold">'+arrayOfStores[i].direction+'</p><p>'+arrayOfStores[i].phone+'</p></div>';
};

function buildSlidesSize() {
    slides = document.querySelectorAll('#container div');
    slideOffsetWidth = slides[0].offsetWidth;
    //Set Container Width
    container.style.width = (slideOffsetWidth * slides.length) + (slides.length * marginRight+2)+'px';

    for (i = 0; i < slides.length; i++) { 
        slides[i].style.marginRight = marginRight+"px";
    }
}


//Listener for Arrows
rightArrow.addEventListener("click", nextSlide, false);
leftArrow.addEventListener("click", previewSlide, false);

//Functions to do
function nextSlide(){
	if (currentSlide != slides.length && active == false){
    active = true;
		TweenLite.to(container, 0.5, {left: "-="+ (slideOffsetWidth + marginRight) +"px", onComplete:function(){
      active = false;
    }});
		currentSlide++;	
	}
}

function previewSlide(){
	if (currentSlide != 1 && active == false){
    active = true;
		TweenLite.to(container, 0.5, {left: "+="+ (slideOffsetWidth + marginRight) +"px", onComplete:function(){
      active = false;
    }});
		currentSlide--;
	}
}	