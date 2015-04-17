doubleClickEvents.initializer();

var elementsToRegister = [
    {eventType: "click", element: "#collapse-banner", functionToCall: "expanded"},
    {eventType: "click", element: "#getLocation", functionToCall: "updatePosition"},
    {eventType: "click", element: "#FF #footer-cta", functionToCall: "loadMap"},
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
  TweenMax.from("#shadow", 3, {top:"-50px", ease:Strong.easeOut})
  TweenMax.to("#expanded-banner #info #f1_txt1", 2, { opacity:1, onComplete:frame2})
}

function frame2() {
  TweenMax.to("#expanded-banner #info #f1_txt1", .5, { opacity:0, delay:1})
  TweenMax.to("#device1", 2, {top:"-120", ease:Strong.easeInOut, delay:2})
    TweenMax.to("#shadow", 2, {top:"315", ease:Strong.easeInOut, delay:2})
  TweenMax.to("#expanded-banner #info #f2_txt1", 2, { opacity:1, delay:3.5})
  TweenMax.to("#expanded-banner #info #f2_txt2", 2, { opacity:1, delay:3.7, onComplete:frame3})
}

function frame3() {
  TweenMax.to("#expanded-banner #info #f2_txt1", .5, { opacity:0, delay:1})
  TweenMax.to("#expanded-banner #info #f2_txt2", .7, { opacity:0, delay:1})
  TweenLite.set("#persp", {perspective:1000})
  TweenMax.to("#device1", 1, {left:155, rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5})
  TweenMax.to("#shadow", 1, {left:100, rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5})
  TweenMax.to("#device1", 0.01, {opacity:0, delay:2.1})
  TweenLite.set("#persp2", {perspective:1000})
  TweenMax.to("#device2", 1, {left:155, rotationY:180, ease:Power2.easeInOut, transformOrigin:"center bottom", delay:1.5})
  TweenMax.to("#device2", 0.1, {opacity:1, delay:2}) 
  TweenMax.to("#device2", 1.5, {top:60, ease:Circ.easeOut, delay:3})
  TweenMax.to("#shadow", 1.5, {opacity:0, top:500, ease:Circ.easeOut, delay:3})
  TweenMax.to("#logo", 1, { opacity:1, delay:5})
  TweenMax.to("#expanded-banner #info #f3_txt1", .5, { left: 12, opacity:1, delay:5})
  TweenMax.to("#expanded-banner #info #f3_txt2", .7, { left: 12, opacity:1, delay:5.1})
  TweenMax.to("#expanded-banner #info #f3_txt3", .7, { left: 12, opacity:1, delay:5.2})
  TweenMax.to("#device2", 0.6, {left:320, ease:Sine.easeOut, delay:6.5})
  TweenMax.to("#shadow", 0.6, {left:320, ease:Sine.easeOut, delay:6.5})
  TweenMax.to("#expanded-banner #info #f3_txt1", .5, { left: -25, opacity:0, delay:6.5})
  TweenMax.to("#expanded-banner #info #f3_txt2", .4, { left: -25, opacity:0, delay:6.6})
  TweenMax.to("#expanded-banner #info #f3_txt3", .3, { left: -25, opacity:0, delay:6.7})
  TweenLite.set("#persp2", {perspective:500})
  TweenMax.to("#device2", 1, {top:40, left:-25, scaleX:0.65, scaleY:0.92, rotationY:135, ease:Power4.easeOut, transformOrigin:"right bottom", delay:7, onComplete:frame4})

}

function frame4(){
TweenMax.to("#logo", 0, { opacity:1, delay:1.2});
TweenMax.to("#FF", .8, { opacity:1, delay:0.2});
TweenMax.to("#device6", .8, { left: 185, opacity:1, delay:0.2});
TweenMax.to("#ff_txt1", .5, { left: 12, opacity:1, delay:0.5});
TweenMax.to("#ff_txt2", .5, { left: 12, opacity:1, delay:0.8}); 
TweenMax.to("#ff_txt3", .5, { left: 12, opacity:1, delay:1});
TweenMax.to("#ff_txt4", .5, { left: 12, opacity:1, delay:1.2})
TweenMax.to("#ff-cta", 1, { opacity:1, delay:1.8 });  
TweenMax.to("#ff_txt5", 1, { opacity:1, delay:1.8})
TweenMax.from("#footer-cta", 1, { opacity:1, delay:1.8 });   

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
    conexion = new XMLHttpRequest(),
    zipCode,
    stateName,
    cityName,
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