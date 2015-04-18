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
    var customConfigOptions = {};

    var motionLibrary = {
        defaultOptions : {
            duration: .5,
            distance: 0,
            frame_dur: 0
        },
        configOptions : function(){
            customConfigOptions.isExpandible = customConfigOptions.isExpandible || false;
    		motionLibrary.defaultOptions.duration = customConfigOptions.duration || .5;
    		motionLibrary.defaultOptions.distance = customConfigOptions.distance || -300;
    		motionLibrary.defaultOptions.frame_dur = customConfigOptions.frame_dur || 3;
        },
        initialAnimations : function(){
            //motionLibrary.handleFrames();
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
                    TweenLite.to(targetElement, .2, {delay:_delay, css:{alpha:1}});
                    targetElement.style.display = 'block';
                    break;

                case "fadeOut":
                    TweenLite.to(targetElement, .4, {delay:_delay, css:{alpha:0}});
                    setTimeout (function(){
                        targetElement.style.display = 'none';
                    }, (_delay*400) + 1000);
                    break;

                case "fadeInOut":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{_alpha:0, delay:_delay});
                    TweenLite.to(targetElement,motionLibrary.defaultOptions.duration,{_alpha:0, delay:motionLibrary.defaultOptions.duration +_delay, overwrite:0});
                    break;

                case "inOutLeft":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.defaultOptions.duration,{delay:motionLibrary.defaultOptions.frame_dur+_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance, ease:_easing, overwrite:0});
                    break;

                case "inOutRight":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance * -1, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.defaultOptions.duration,{delay:motionLibrary.defaultOptions.frame_dur+_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance * -1, ease:_easing, overwrite:0});
                    break;

                case "inLeft":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance, ease:_easing});
                    break;

                case "inRight":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance * -1, ease:_easing});
                    break;

                case "inTop":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.defaultOptions.distance, ease:_easing});
                    break;

                case "inBottom":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.defaultOptions.distance * -1, ease:_easing});
                    break;

                case "inOutUp":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.defaultOptions.distance, ease:_easing});
                    TweenLite.to(targetElement,motionLibrary.defaultOptions.duration,{delay:motionLibrary.defaultOptions.frame_dur+_delay, autoAlpha:0, top:motionLibrary.defaultOptions.distance, ease:_easing, overwrite:0});
                    break;

                case "inUp":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, top:motionLibrary.defaultOptions.distance, ease:_easing});
                    break;

                case "inRight":
                    TweenLite.from(targetElement,motionLibrary.defaultOptions.duration,{delay:_delay, autoAlpha:0, left:motionLibrary.defaultOptions.distance * -1, ease:_easing});
                    break;

                default:
                    break;
            } 
        },
        handleFrames : function(){
            console.log("animation frames: "+animationFrames.length);
            for (var i = 0; i < 1; i++) {
                for (var k = 0; k < animationFrames[i].length; k++) {
                    motionLibrary.animations(animationFrames[i][k].animationType, animationFrames[i][k].element, animationFrames[i][k].delay);
                    if (i < animationFrames.length){
                        //motionLibrary.setTimer(motionLibrary.options.frame_dur, secondFrame);
                        
                    };
                };
            };
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
        },
        resetWhenCloseOrExit : function(){
            TweenMax.set("div", {clearProps:"all"});
            TweenMax.set("span", {clearProps:"all"});
            TweenMax.set("p", {clearProps:"all"});
            TweenMax.set("h1", {clearProps:"all"});
            TweenMax.set("h2", {clearProps:"all"});
            TweenMax.set("h3", {clearProps:"all"});
            TweenMax.set("h4", {clearProps:"all"});
            TweenMax.set("a", {clearProps:"all"});
            TweenMax.set("input", {clearProps:"all"});
            TweenMax.set("canvas", {clearProps:"all"});

            TweenMax.killAll();

            firstFrame();
        }
    };

    var servicesLibrary = {
    	addListener : function(arrayElements){
    		for (var i = 0; i < arrayElements.length; i++) {
    			var elementToAdd = document.querySelector(arrayElements[i].element),
                    functionToDO = eval(arrayElements[i].functionToCall);
    			elementToAdd.addEventListener(arrayElements[i].eventType, functionToDO, false);
    		}
    	},
        functionWhenClick : function(){
            console.log('clicked 1');
        },
        displayMap : function(canvasID, longitud, latitud, zoom, markerTitle){
            var studioLocation = new google.maps.LatLng(longitud, latitud),
            map = new google.maps.Map(document.getElementById(canvasID), {
                center: studioLocation,
                zoom: zoom
            });

            var marker = new google.maps.Marker({
              position: studioLocation,
              map: map,
              title: markerTitle
            });
        },
        selectID : function(IdToSelect){
            return document.getElementById(IdToSelect);
        },
        selectClass : function(classToSelect){
            return document.querySelectorAll(classToSelect);
        }
    };

    var doubleClickEvents = {
        initializer : function(expandibleType, dimentions){
            if(!Enabler.isInitialized()){ 
                Enabler.addEventListener(studio.events.StudioEvent.INIT, doubleClickEvents.functionsWhenInit);
            } 

            if(!Enabler.isPageLoaded()){ 
                Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, doubleClickEvents.functionsWhenPageLoaded);
            }

            if(expandibleType == "expandible"){
                Enabler.setExpandingPixelOffsets(dimentions[0], dimentions[1], dimentions[2], dimentions[3], false, false);
                Enabler.setStartExpanded(false);
                //Enabler.setIsMultidirectional(true);
                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_START,  function() {Enabler.finishExpand()});
                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_FINISH,  function() { });
                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_START, function() {Enabler.finishCollapse()});
                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_FINISH, function() { });
            } else {
                console.log("Not Expandible");
            }

        },
        functionsWhenInit : function(){
            servicesLibrary.addListener(elementsToRegister);
            if(elementsToRegister == undefined || elementsToRegister == null){
                console.log('si entro al array')
            };
        },
        functionsWhenPageLoaded : function(){
            motionLibrary.configOptions();
            motionLibrary.initialAnimations();
        },
    };

    //Register Objects to Window
    window.servicesLibrary = servicesLibrary;
    window.motionLibrary = motionLibrary;
    window.doubleClickEvents = doubleClickEvents;

})(window);