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
  motionLibrary.animations("fadeIn", "#expanded-banner", 0);
  motionLibrary.animations("fadeIn", "#expanded-banner #info", 0);

  motionLibrary.animations("fadeIn", "#expanded-banner #info #f1_txt1", 1, Strong.easeOut);
}

function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);





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
	marginRight = 10;

//Set Container Width
container.style.width = (slideOffsetWidth * slides.length) + (slides.length * marginRight+2)+'px';

for (i = 0; i < slides.length; i++) { 
    slides[i].style.marginRight = marginRight+"px";
}

//Listener for Arrows
rightArrow.addEventListener("click", nextSlide, false);
leftArrow.addEventListener("click", previewSlide, false);

console.log("Left Container: "+ container.offsetLeft);

//Functions to do
function nextSlide(){
	if (currentSlide != slides.length){
		console.log("next");
		TweenLite.to(container, 0.5, {left: "-="+ (slideOffsetWidth + 11) +"px"});
		currentSlide++;	
	}
}

function previewSlide(){
	if (currentSlide != 1){
		console.log("prev");
		TweenLite.to(container, 0.5, {left: "+="+ (slideOffsetWidth + 11) +"px"});
		currentSlide--;
	}
}






















	