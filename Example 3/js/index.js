var _dur = .5;
var _distance = -300;
var _frame_dur = 3;
var myTimer;

window.onload = function() {
  
  var $panel1 = document.getElementById("panel1");
  var $panel2 = document.getElementById("panel2");
  var $panel3 = document.getElementById("panel3");
  var $panel4 = document.getElementById("panel4");
  var $panel1Text1 = document.getElementById("panel1h1");
  var $panel1Text2 = document.getElementById("panel1h2");
  var $panel2Text1 = document.getElementById("panel2h1");
  var $panel2Text2 = document.getElementById("panel2h2");
  var $panel3Text1 = document.getElementById("info");
  var $panel4Text1 = document.getElementById("panel4h1");
  var $panel4Text2 = document.getElementById("panel4h2");
  var $panel4Text3 = document.getElementById("panel4h3");
  var $panel4Text4 = document.getElementById("panel4h4");
  var $cta = document.getElementById("cta");
  var $device = document.getElementById("device");
  
  
 fristFrame();
  
 function fristFrame(){
   init("set", $panel1, 0);
   init("inOutLeft", $panel1Text1, 0);
   init("inOutLeft", $panel1Text2, .3);
   setTimer(_frame_dur, secondFrame)
  };
  
  function secondFrame(){
    init("set", $panel2, 0);
    init("inOutLeft", $panel2Text1, 0);
    init("inOutLeft", $panel2Text2, .3);
    setTimer(_frame_dur, thirdFrame); 
  };
  
  
  function thirdFrame(){
    init("set", $panel3, 0);
    init("inOutLeft", $panel3Text1, 0.3);
    setTimer(_frame_dur, fourthFrame); 
  };

  function fourthFrame(){
    init("set", $panel4, 0);
    init("inLeft", $panel4Text1, 0.3);
    init("inLeft", $panel4Text2, .6);
    init("inLeft", $panel4Text3, 0.9);
    init("inRight", $device, 1.2);
    init("fadeIn", $cta, 1.5);
    init("inLeft", $panel4Text4, 1.8);
  };


}


/* ///////////////////   communly animates used in the banners, applied with
////////////////////// */

function init(nameEvent, _target, _delay){
 
   switch(nameEvent){
       
    case "set":
       TweenLite.set(_target, {top:-1});
       TweenLite.from(_target, 1, {css:{alpha:0}});
     break;
       
     case "fadeIn":
       TweenLite.from(_target, 1, {delay:_delay, css:{alpha:0}});
       break;
       
     case "fadeInOut":
       TweenLite.from(_target,_dur,{_alpha:0, delay:_delay});
		  TweenLite.to(_target,_dur,{_alpha:0, delay:_dur +_delay, overwrite:0});
     break;
       
     case	"inOutLeft":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut});
			TweenLite.to(_target,_dur,{delay:_frame_dur+_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut, overwrite:0});
		break;
       
       case	"inLeft":
		  TweenLite.from(_target,_dur,{delay:_delay, autoAlpha:0, left:_distance, ease:Strong.easeOut});
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
    myTimer = setTimeout (function () {go(nextFunction)}, _time * 1000);
		
  }

	function go(nextFunction){ 
    nextFunction =  nextFunction();
		} 