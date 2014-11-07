if (typeof(Enabler) != undefined && typeof(TweenLite) != undefined &&  typeof(CSSPlugin) != undefined && typeof(Swiper) != undefined && typeof(motionLibrary) != undefined) {
    var mySwiper = new Swiper('.swiper-container',{
        grabCursor: true
    })

    var linksArray = document.querySelectorAll('.link');
    for (var i = 0; i < linksArray.length; i++) {
        linksArray[i].addEventListener('click', function(e){
            var parent = e.target.id;
            Enabler.counter('Click tag en el '+parent+' slide');
            console.log('Click tag en el '+parent+' slide')
        }, false);
    };

    doubleClickEvents.initializer();

    var elementsToRegister = [
        {eventType: "click", element: "#cta", functionToCall: firstExpand},
        {eventType: "click", element: "#close1", functionToCall: closeFirstExpand},
        {eventType: "click", element: "#close2", functionToCall: closeSecondExpand},
        {eventType: "click", element: "#cta-map", functionToCall: secondExpand},
        {eventType: "click", element: "#cta-shop", functionToCall: externalWebsite},
        {eventType: "click", element: "#directions", functionToCall: GetDirectionMap}
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
        Enabler.counter('Open Second Expanded');
        servicesLibrary.displayMap('canvasMap', 9.613217002140066, -84.62669495162959, 16);
        motionLibrary.animations("set", "#map", 0);
        motionLibrary.animations("fadeIn", "#map", 0);
    }

    function closeSecondExpand(){
        Enabler.counter('Close Second Expanded');
        motionLibrary.animations("fadeOut", "#map", 0);
    }

    function externalWebsite(){
        var url = 'goes Verizon'; 
        Enabler.exit(url);
    }

    function GetDirectionMap(){
        Enabler.counter('goes to directions');
    }


    function firstFrame(){
        motionLibrary.animations("set", "#panel5", 0);
        motionLibrary.animations("inLeft", "#panel5h1", 0); 
        motionLibrary.animations("inUp", "#panel5h4", .1); 
        motionLibrary.animations("inRight", "#panel5h2", .3); 
        motionLibrary.animations("inLeft", "#panel5h3", .4); 
        motionLibrary.animations("fadeIn", "#cta", .8);
        motionLibrary.animations("inRight", "#device2", .5); 
        motionLibrary.animations("inRight", "#shadow2", .5); 
    }
}else{
    console.log('No cargo una libreria!');

    console.log("TweenLite = "+ typeof(TweenLite));
    console.log("Enabler = "+ typeof(Enabler));
    console.log("CSSPlugin = "+ typeof(CSSPlugin));
    console.log("Swiper = "+ typeof(Swiper));
    console.log("motionLibrary = "+ typeof(motionLibrary));
}