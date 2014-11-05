//////////////////////////////////////////////////////////////////////////////////////////
///
///  Banner Library v1.0
///  Moxie Team
///  
///  Contact information: 
///  Juan Lara | skype:juanlaran - Gabriel Aguilar | skype:gab.webdesign
///
//////////////////////////////////////////////////////////////////////////////////////////

(function(window, undefined){
    
    'use strict';

    //Global Vars
    var myTimer;

    var motionLibrary = {
        options : {},
        configOptions : function(){
    		motionLibrary.options.duration = configOptions.duration || .5;
    		motionLibrary.options.distance = configOptions.distance || -300;
    		motionLibrary.options.frame_dur = configOptions.frame_dur || 3;
        },
        initialAnimations : function(){
            firstFrame();
            motionLibrary.checkTabStatus();
        },
        animations : function(nameEvent, _target, _delay, _easing){

            var targetElement = document.querySelector(_target);

            if(!_easing || null){
                _easing = Strong.easeOut;
            }

            switch(nameEvent){

                case "set":
                    TweenLite.set(targetElement, {top:0, left:0});
                    TweenLite.from(targetElement, 1, {css:{alpha:0}});
                    break;

                case "fadeIn":
                    TweenLite.to(targetElement, 1, {delay:_delay, css:{alpha:1}});
                    break;

                case "fadeOut":
                    TweenLite.to(targetElement, 1, {delay:_delay, css:{alpha:0}});
                    break;

                case "fadeInOut":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{_alpha:0, delay:_delay});
                    TweenLite.to(targetElement,motionLibrary.options.duration,{_alpha:0, delay:motionLibrary.options.duration +_delay, overwrite:0});
                    break;

                case "inOutLeft":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.options.distance, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.options.duration,{delay:motionLibrary.options.frame_dur+_delay, autoAlpha:0, left:motionLibrary.options.distance, ease:_easing, overwrite:0});
                    break;

                case "inOutRight":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.options.distance * -1, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.options.duration,{delay:motionLibrary.options.frame_dur+_delay, autoAlpha:0, left:motionLibrary.options.distance * -1, ease:_easing, overwrite:0});
                    break;

                case "inLeft":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.options.distance, ease:_easing});
                    break;

                case "inRight":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.options.distance * -1, ease:_easing});
                    break;

                case "inOutUp":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.options.distance, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.options.duration,{delay:motionLibrary.options.frame_dur+_delay, autoAlpha:0, top:motionLibrary.options.distance, ease:_easing, overwrite:0});
                    break;

                case "inUp":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.options.distance, ease:_easing});
                    break;

                case "inRight":
                    TweenLite.from(targetElement,motionLibrary.options.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.options.distance * -1, ease:_easing});
                    break;

                default:
                    break;
            } 
        },
        setTimer : function(_time, nextFunction){
            _time = _time + 1;
            myTimer = setTimeout (function(){
                motionLibrary.go(nextFunction);
            }, _time * 1000);
        },
        go : function(nextFunction){ 
            nextFunction =  nextFunction();
        },
        checkTabStatus : function(){
            var myInt = setInterval(myFunc, 300);
            var stateKey, eventKey, 
                keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
                };

            var vis = (function(){
                for (stateKey in keys) {
                    if (stateKey in document) {
                        eventKey = keys[stateKey];
                        break;
                    }
                }

                return function(c) {
                    if (c) document.addEventListener(eventKey, c);
                    return !document[stateKey];
                }
            })();


            function myFunc(){
              if(vis()){    
                    // before the tab gains focus again, very important!
                    setTimeout(function(){           
                   TweenLite.ticker.useRAF(true);
                    },300);     
                } else{
                   TweenLite.ticker.useRAF(false);
                }
            };
        }
    };

    var servicesLibrary = {
    	addListener : function(arrayElements){
    		for (var i = 0; i < arrayElements.length; i++) {
    			var elementToAdd = document.querySelector(arrayElements[i].element);
    			elementToAdd.addEventListener(arrayElements[i].eventType, arrayElements[i].functionToCall, false);
    		}
    	},
        functionWhenClick : function(){
            console.log('clicked 1');
        },
        displayMap : function(canvasID, longitud, latitud, markerTitle, zoom){
            var studioLocation = new google.maps.LatLng(longitud, latitud);
            map = new google.maps.Map(document.getElementById(canvasID), {
                center: studioLocation,
                zoom: zoom
            });

            var marker = new google.maps.Marker({
              position: studioLocation,
              map: map,
              title: markerTitle
            });
        }
    };

    var doubleClickEvents = {
    	initializer : function(){
			if(!Enabler.isInitialized()){ 
				Enabler.addEventListener(studio.events.StudioEvent.INIT, doubleClickEvents.functionsWhenInit);
			}

			if(!Enabler.isPageLoaded()){ 
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, doubleClickEvents.functionsWhenPageLoaded);
			}
    	},
        functionsWhenInit : function(){
            servicesLibrary.addListener(elementsToRegister);
            motionLibrary.configOptions();
        },
        functionsWhenPageLoaded : function(){
            motionLibrary.initialAnimations();
        },
        exitEvent : function(){
            //Doubleclick Exit Event
            console.log('')
        }
    };

    //Register Objects to Window
    window.servicesLibrary = servicesLibrary;
    window.motionLibrary = motionLibrary;
    window.doubleClickEvents = doubleClickEvents;

})(window);