doubleClickEvents.initializer();

var elementsToRegister = [
  {eventType: "click", element: "#collapse-banner", functionToCall: "expanded" }
  ];

function firstFrame(){
  
  motionLibrary.animations("fadeIn", "#collapse-banner h1", 0);
  motionLibrary.animations("fadeIn", "#collapse-banner h2", 0.5);

}

function expanded() {
  //console.log("sds");
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
  TweenMax.to("#device1", .2, { css:{alpha:0} , delay:1})
  TweenMax.to("#device2", .5, { css:{alpha:.2, left:164}, delay:1})
  TweenMax.to("#device3", .5, { css:{alpha:.2}, delay:1.5})
  TweenMax.to("#device2", .5, { css:{alpha:0}, delay:1})
  TweenMax.to("#device4", .5, { css:{alpha:.2}, delay:1}) 
  //TweenMax.to("#device5", .5, { css:{alpha:.2}, delay:1}) 
  //TweenMax.to("#expanded-banner #info #f3_txt1", 2, { css:{alpha:1}, delay:2})
  //TweenMax.to("#expanded-banner #info #f3_txt2", 2, { css:{alpha:1}, delay:2.5})
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

function callMap(position){

    //alert("Latitude: "+position.coords.latitude);
    //alert("Longitude: "+position.coords.longitude);

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

    // for (var i = 0; i < arrayOfStores.length; i++) {
    //   var localLocation = new google.maps.LatLng(arrayOfStores[i].lat, arrayOfStores[i].lng),
    //   marker = new google.maps.Marker({
    //     position: localLocation,
    //     map: map,
    //     title: arrayOfStores[i].title
    //   });

    //   bounds.extend(marker.position);

    //   google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //     return function() {
    //       infowindow.setContent(arrayOfStores[i].title);//locations[i][0]
    //       infowindow.open(map, marker);
    //     }
    //   })(marker, i));
    // }

    map.fitBounds(bounds);
}


//AUTOCOMPLETE CODE

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

initialize();
updatePosition();

// Slider Code

//Common Vars
var sliderParentDiv = document.getElementById('slider'),
	sliderBullets = document.getElementById('bullets'),
	container = document.getElementById('container'),
	rightArrow = document.getElementById('right-arrow'),
	leftArrow = document.getElementById('left-arrow'),
	slides = document.querySelectorAll('#container div'),
	slideOffsetWidth = slides[0].offsetWidth,
	currentSlide = 1,
	marginRight = 10,
  active = false;

//Set Container Width
container.style.width = (slideOffsetWidth * slides.length) + (slides.length * marginRight+2)+'px';

for (i = 0; i < slides.length; i++) { 
    slides[i].style.marginRight = marginRight+"px";
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






















	