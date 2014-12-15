jQuery(function($) {
 
    $("a.topopup").click(function() {
        loading(); // loading
        setTimeout(function() { // then show popup, deley in .5 second
            loadPopup(); // function show popup 
        }, 500); // .5 second
        return false;
    });
 
    /* event for close the popup */
    $("div.close").hover(
        function() {
            $('span.ecs_tooltip').show();
        },
        function() {
            $('span.ecs_tooltip').hide();
        }
    );
 
    $("div.close").click(function() {
        disablePopup(); // function close pop up
    });
 
    $(this).keyup(function(event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup(); // function close pop up
        }
    });
 
    $("div#backgroundPopup").click(function() {
        disablePopup(); // function close pop up
    });
 
    $('a.livebox').click(function() {
        alert('Hello World!');
        return false;
    });
 
    /************** start: functions. **************/
    function loading() {
        $("div.loader").show();
    }
 
    function closeloading() {
        $("div.loader").fadeOut('normal');
    }
 
    var popupStatus = 0; // set value
 
    function loadPopup() {
        if (popupStatus == 0) { // if value is 0, show popup
            closeloading(); // fadeout loading
            $("#toPopup").fadeIn(0500); // fadein popup div
            $("#backgroundPopup").css("opacity", "0.2"); // css opacity, supports IE7, IE8
            $("#backgroundPopup").fadeIn(0001);
            popupStatus = 1; // and set value to 1
        }
    }
 
    function disablePopup() {
            if (popupStatus == 1) { // if value is 1, close popup
                $("#toPopup").fadeOut("normal");
                $("#backgroundPopup").fadeOut("normal");
                popupStatus = 0; // and set value to 0
            }
        }
        /************** end: functions. **************/




}); // jQuery End
 
$(function() {
  
    $('#slides2').slidesjs({
        width: 940,
        height: 528,
        navigation: false,
        start: 3,
        callback: {
            loaded: function(){
          
            }
        }
 
    });
 
});
 
var isVisible = true;
var lastSensor06 = false;
var lastSensor05 = false;
var lastSensor04 = false;
var lastSensor03 = false;
var lastSensor02 = false;
var lastSensor01 = false;

function GotoSlide(slidenum){
    $('a[data-slidesjs-item="' + slidenum + '"]').trigger('click');
}
 

var socket = io.connect('http://localhost:8081');

socket.on('sensordata', function(data) {
 
    if (data.lastSensor01 == 0) {
     
            console.log('page 0');
            GotoSlide('1');
        } else if (data.lastSensor01 == 1) {
       
            console.log('page 1');
            GotoSlide('0');
           
        };
 


    if (lastSensor02 == data.sensor02) {
 
        if (data.lastSensor02 == 1) {
          
            GotoSlide('2');
            console.log('page 2');
        } else if (data.lastSensor02 == 0) {
    
            GotoSlide('1');
            console.log('page2 1');
      
        };
 
    }

   
 
});

