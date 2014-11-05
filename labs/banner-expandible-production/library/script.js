if (typeof(Enabler) != undefined && typeof(TweenLite) != undefined &&  typeof(CSSPlugin) != undefined && typeof(Swiper) != undefined && typeof(motionLibrary) != undefined) {
    var mySwiper = new Swiper('.swiper-container',{
        grabCursor: true
    })

    var linksArray = document.querySelectorAll('.link');
    for (var i = 0; i < linksArray.length; i++) {
        linksArray[i].addEventListener('click', function(e){
            var parent = e.target.id;
            Enabler.reportCustomVariableCount1('Click tag en el '+parent+' slide');
        }, false);
    };

    doubleClickEvents.initializer();

    var elementsToRegister = [
        {eventType: "click", element: "#cta", functionToCall: firstExpand},
        {eventType: "click", element: "#close1", functionToCall: closeFirstExpand},
        {eventType: "click", element: "#close2", functionToCall: closeSecondExpand},
        {eventType: "click", element: "#cta-map", functionToCall: secondExpand},
        {eventType: "click", element: "#cta-shop", functionToCall: externalWebsite}
    ];


    // var customConfigOptions = {};

    function firstExpand(){
        Enabler.requestExpand();
        motionLibrary.animations("set", "#expandible", 0);
        motionLibrary.animations("fadeIn", "#expandible", 0);
        motionLibrary.animations("inRight", "#close1", .3);
        motionLibrary.animations("inLeft", "#cta-shop", .3);
        motionLibrary.animations("inRight", "#cta-map", .3);
    }

    function closeFirstExpand(){
        Enabler.requestCollapse();
        motionLibrary.animations("fadeOut", "#expandible", 0);
        firstFrame();
    }

    function secondExpand(){
        Enabler.reportCustomVariableCount1('Open Expand second');
        servicesLibrary.displayMap('canvasMap', 9.613217002140066, -84.62669495162959, 16);
        motionLibrary.animations("set", "#map", 0);
        motionLibrary.animations("fadeIn", "#map", 0);
    }

    function closeSecondExpand(){
        Enabler.reportCustomVariableCount1('Close Expand second');
        motionLibrary.animations("fadeOut", "#map", 0);
    }

    function externalWebsite(){
        var url = 'http://www.verizonwireless.com'; 
        Enabler.exit(url);
        window.open(url);
    }


    function firstFrame(){
        motionLibrary.animations("set", "#panel5", 0);
        motionLibrary.animations("inLeft", "#panel5h1", 0); //- left
        motionLibrary.animations("inUp", "#panel5h4", .1); //- top
        motionLibrary.animations("inRight", "#panel5h2", .3); //- left
        motionLibrary.animations("inLeft", "#panel5h3", .4); //- left
        motionLibrary.animations("fadeIn", "#cta", .8);
        motionLibrary.animations("inRight", "#device2", .5); //- left
        motionLibrary.animations("inRight", "#shadow2", .5); //- left
    }
}else{
    console.log('No cargo una libreria!');

    console.log("TweenLite = "+ typeof(TweenLite));
    console.log("Enabler = "+ typeof(Enabler));
    console.log("CSSPlugin = "+ typeof(CSSPlugin));
    console.log("Swiper = "+ typeof(Swiper));
    console.log("motionLibrary = "+ typeof(motionLibrary));
}