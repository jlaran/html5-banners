var _dur = .5;
var _distance = -300;
var _frame_dur = 3;
var myTimer;

window.onload = function() {
  
  var $panel1 = document.getElementById("panel1");
  var $panel2 = document.getElementById("panel2");
  var $panel3 = document.getElementById("panel3");
  var $panel4 = document.getElementById("panel4");
  var $panel5 = document.getElementById("panel5");
  
  var $panel1Text1 = document.getElementById("panel1h1");
  var $panel1Text2 = document.getElementById("panel1h2");
  var $panel1Text3 = document.getElementById("panel1h3");
  var $panel1Text4 = document.getElementById("panel1h4");
  
  var $panel2Text1 = document.getElementById("panel2h1");
  var $panel2Text2 = document.getElementById("panel2h2");
  
  var $panel3Text1 = document.getElementById("panel3h1");
  var $panel3Text2 = document.getElementById("panel3h2");
  
  var $panel4Text1 = document.getElementById("panel4h1");
  var $panel4Text2 = document.getElementById("panel4h2");
  
  var $panel5Text1 = document.getElementById("panel5h1");
  var $panel5Text2 = document.getElementById("panel5h2");
  var $panel5Text3 = document.getElementById("panel5h3");
  var $panel5Text4 = document.getElementById("panel5h4");
  var $cta = document.getElementById("cta");
  var $device1 = document.getElementById("device1");
  var $device2 = document.getElementById("device2");
  var $shadow = document.getElementById("shadow");
  var $shadow2 = document.getElementById("shadow2");
  
  window.addEventListener('beforeunload', function(event) {
        console.log('I am the 1st one.');
      })
  
      window.addEventListener('unload', function(event) {
        console.log('I am the 3rd one.');
   })
  
 firstFrame();
  
 function firstFrame(){
   init("set", $panel1, 0);
   init("inOutLeft", $panel1Text1, 0);
   init("inOutLeft", $panel1Text2, .1);
   init("inOutUp", $panel1Text3, .2);
   init("inOutLeft", $panel1Text4, .3);
   init("inOutRight", $device1, .4);
   init("inOutRight", $shadow, .3);
   setTimer(_frame_dur, secondFrame);
  };
  
  function secondFrame(){
    
    init("fadeOut", $panel1, 0);
    init("set", $panel2, 0);
    init("inOutLeft", $panel2Text1, 0);
    init("inOutLeft", $panel2Text2, .2);
    setTimer(_frame_dur, thirdFrame); 
  };
  
  
  function thirdFrame(){
    init("set", $panel3, 0);
    init("inOutLeft", $panel3Text1, 0.3);
    init("inOutLeft", $panel3Text2, 0.4);
    setTimer(_frame_dur, fourthFrame);
  };

  function fourthFrame(){
    init("set", $panel4, 0);
    init("inOutLeft", $panel4Text1, 0);
    init("inOutLeft", $panel4Text2, .3);
    setTimer(_frame_dur, fifthFrame);
  };

  function fifthFrame(){
    init("fadeOut", $panel2, 0);
    init("set", $panel5, 0);
    init("inLeft", $panel5Text1, 0);
    init("inUp", $panel5Text4, .1);
    init("inRight", $panel5Text2, .3);
    init("inLeft", $panel5Text3, .4);
    init("fadeIn", $cta, .8);
    init("inRight", $device2, .5);
    init("inRight", $shadow2, .4);
  };

}

Enabler.isInitialized()

function clicked(){
  
  var ClickTag;
  window.open(ClickTag, "_blank")
  
}


/* ///////////////////   communly animates used in the banners, applied with
////////////////////// */

function init(nameEvent, _target, _delay){
 
   switch(nameEvent){
       
    case "set":
       TweenLite.set(_target, {top:0, left:0});
       TweenLite.from(_target, 1, {css:{alpha:0}});
       
     break;
       
     case "fadeIn":
       TweenLite.from(_target, 1, {delay:_delay, css:{alpha:0}});
       break;
       
     case "fadeOut":
       TweenLite.to(_target, 1, {delay:_delay, css:{alpha:0}});
       break;
       
     case "fadeInOut":
       TweenLite.from(_target,_dur,{_alpha:0, delay:_delay});
		  TweenLite.to(_target,_dur,{_alpha:0, delay:_dur +_delay, overwrite:0});
     break;
       
     case	"inOutLeft":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut});
			TweenLite.to(_target,_dur,{delay:_frame_dur+_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut, overwrite:0});
		break;
       
       case	"inOutRight":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance * -1, ease:Strong.easeOut});
			TweenLite.to(_target,_dur,{delay:_frame_dur+_delay, autoAlpha:0, left:_distance * -1, ease:Strong.easeOut, overwrite:0});
		break;
       
       case	"inLeft":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut});
		break;
       case	"inRight":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance * -1, ease:Strong.easeOut});
		break;
       case	"inOutUp":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, top:_distance, ease:Strong.easeOut});
		  TweenLite.to(_target,_dur,{delay:_frame_dur+_delay, autoAlpha:0, top:_distance, ease:Strong.easeOut, overwrite:0});
		break;
       
       case	"inUp":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, top:_distance, ease:Strong.easeOut});
		break;
       
       case	"inRight":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance * -1, ease:Strong.easeOut});
		break;
       
       default:
		  break;
       
   } 
  
}

  function setTimer(_time, nextFunction){
	
	  _time = _time + 1;
    window.clearTimeout(myTimer)
    myTimer = window.setTimeout (function () {go(nextFunction)}, _time * 1000);
		
  }

	function go(nextFunction){ 

       nextFunction =  nextFunction();
}


// If true, start function. If false, listen for INIT.
if (Enabler.isInitialized()) {
    enablerInitHandler();
} else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
}

function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.
}
