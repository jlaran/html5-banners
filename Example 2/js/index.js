(function(window, undefined){

    var cta_dc = document.getElementById('cta_dc'),
                 collapsed_panel = document.getElementById('collapsed-panel'),
                 expanded_panel = document.getElementById('expanded-panel'),
                 closeBtn = document.getElementById('collapse_btn'),
                 vid1Container = document.getElementById('video1_container_dc'),
                 vid1 = document.getElementById('video1_dc'),
                 vid1PlayBtn = document.getElementById('video1_control_play_dc'),
                 vid1PauseBtn = document.getElementById('video1_control_pause_dc'),
                 vid1UnmuteBtn = document.getElementById('video1_control_unmute_dc'),
                 vid1MuteBtn = document.getElementById('video1_control_mute_dc'),
                 vid1ReplayBtn = document.getElementById('video1_control_replay_dc'),
                 vid1StopBtn = document.getElementById('video1_control_stop_dc');
                 mapButton = document.getElementById('btn-map'),
                 mapcanvas = document.getElementById('map-canvas'),
                 txt1Collapse = document.querySelector('#collapsed-panel h1'),
                 txt2Collapse = document.querySelector('#collapsed-panel h2'),
                 txt3Collapse = document.querySelector('#collapsed-panel h3'),
                 txt4Collapse = document.querySelector('#collapsed-panel h4'),
                 txt1Expanded = document.querySelector('#expanded-panel h1'),
                 txt2Expanded = document.querySelector('#expanded-panel h2'),
                 txt3Expanded = document.querySelector('#expanded-panel h3'),
                 isFirstTime = true;

    var banner = {
        initialize : function(){
           
            var initEnabler = (Enabler.isInitialized()) ? banner.registerEvents() : Enabler.addEventListener(studio.events.StudioEvent.INIT, banner.registerEvents);
            var loadPage =  (Enabler.isPageLoaded()) ?  banner.initialAnimations() :  Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED,banner.initialAnimations) ;
            
        },
        registerEvents : function(){
            cta_dc.addEventListener('touchEnd', banner.events.actionClickHandler, false);
            cta_dc.addEventListener('click', banner.events.actionClickHandler, false);
            closeBtn.addEventListener('touchEnd', banner.events.closeHandler, false);
            closeBtn.addEventListener('click', banner.events.closeHandler, false);
            mapButton.addEventListener('click',banner.events.mapCall, false);

            vid1PlayBtn.addEventListener('click', banner.events.pausePlayHandler, false);
            vid1PauseBtn.addEventListener('click', banner.events.pausePlayHandler, false);
            vid1ReplayBtn.addEventListener('click', banner.events.replayHandler, false);
            vid1StopBtn.addEventListener('click', banner.events.stopHandler,false);
            vid1.addEventListener('ended', banner.events.videoEndHandler, false);

            

            banner.doubleClickEvents();
        },
        doubleClickEvents : function(){
            Enabler.setExpandingPixelOffsets(0, 0,500,300);
            Enabler.addEventListener( studio.events.StudioEvent.EXPAND_START,  function() {  TweenLite.from(expanded_panel,0.5,{delay:0, left:300 , autoAlpha:0, onComplete:Enabler.finishExpand()})});
            Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_START, function() { Enabler.reportManualClose()});
            Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_FINISH, function() { Enabler.finishCollapse()});

            collapsed_panel.style.display = "block";
            expanded_panel.style.display = "none";
        },
        initialAnimations : function(){
            TweenLite.to(txt1Collapse,0.8,{delay:0.3, top:70, ease:Strong.easeOut});
            TweenLite.to(txt2Collapse,0.8,{delay:0.4,  left:0, ease:Strong.easeOut});
            TweenLite.to(txt3Collapse,0.8,{delay:0.3,  top:178, ease:Strong.easeOut});
            TweenLite.to(txt4Collapse,0.5,{delay:0.7, left:5});
        },
        events : {
            actionClickHandler : function(){
                Enabler.requestExpand();
                collapsed_panel.style.display = "none";
                expanded_panel.style.display = "block";


                vid1PauseBtn.style.visibility = 'hidden';
                vid1PlayBtn.style.visibility = 'visible';
                vid1Container.style.display = 'block';

                TweenLite.from(txt1Expanded,0.8,{delay:0.3, autoAlpha:0, top:0, ease:Strong.easeOut});
                TweenLite.from(txt2Expanded,0.8,{delay:0.4, autoAlpha:0, left:-100, ease:Strong.easeOut});
                TweenLite.from(txt3Expanded,0.8,{delay:0.3, autoAlpha:0, top:500, ease:Strong.easeOut});
              
            },
            closeHandler : function() {
                Enabler.reportManualClose();
                collapsed_panel.style.display = "block";
                expanded_panel.style.display = "none";

                Enabler.stopTimer('panel_1 Expansion');
                //Pause Video
                vid1.pause();
                mapcanvas.style.display = 'none';
            },
            mapCall :  function(e){
                banner.events.stopHandler();
                banner.locationService();
                vid1Container.style.display = 'none';
                mapcanvas.style.display = 'block';
                mapButton.style.display = 'none';
            },
            stopHandler : function (e){
                Enabler.counter('EVENT_VIDEO_STOP');
                //set video's first frame
                vid1.currentTime = 0;
                //Pause film
                vid1.pause();
                //Show required buttons
                vid1PauseBtn.style.visibility = 'hidden';
                vid1PlayBtn.style.visibility = 'visible';

                isFirstTime = false;
            },
            pausePlayHandler : function(e){
                banner.events.replayVideoHandler();

                //alert(e);
                if (vid1.paused) {
                    //If Paused then Play
                    vid1.play();
                    //Show Pause button and hide Play button
                    vid1PauseBtn.style.visibility = 'visible';
                    vid1PlayBtn.style.visibility = 'hidden';
                } else {
                    //If not paused then Pause
                    vid1.pause();
                    //Show Play button and hide Pause button
                    vid1PauseBtn.style.visibility = 'hidden';
                    vid1PlayBtn.style.visibility = 'visible';
                }
            },
            replayHandler : function(e){
                //set video's first frame
                vid1.currentTime = 0;
                //Play film
                vid1.play();
                //Turn sound on
                vid1.volume = 1.0;
                //Show required buttons
                vid1PauseBtn.style.visibility = 'visible';
                vid1MuteBtn.style.visibility = 'visible';
            },
            videoEndHandler : function(e){
                vid1.currentTime = 0;
                vid1.pause();

                isFirstTime = false;

                vid1PauseBtn.style.visibility = 'hidden';
                vid1PlayBtn.style.visibility = 'visible';
            },
            replayVideoHandler : function(e){
              if(!isFirstTime){
                if(vid1.volume == 0.0){
                  banner.muteUnmuteHandler();  
                }
              }
            }
        },
        locationService : function(){
            var studioLocation = new google.maps.LatLng(9.927128, -84.08201199999999 );
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: studioLocation,
                zoom: 13
            });

            var marker = new google.maps.Marker({
              position: studioLocation,
              map: map,
              title: 'Studio 10'
            });
        }
    }

    banner.initialize();
})(window);