/* 
	author: istockphp.com
*/



jQuery(function($) {

	$("a.topopup").click(function() {
			loading(); // loading
			setTimeout(function(){ // then show popup, deley in .5 second
				loadPopup(); // function show popup 
			}, 500); // .5 second
	return false;
	});
	
	/* event for close the popup */
	$("div.close").hover(
					function() {
						$('span.ecs_tooltip').show();
					},
					function () {
    					$('span.ecs_tooltip').hide();
  					}
				);
	
	$("div.close").click(function() {
		disablePopup();  // function close pop up
	});
	
	$(this).keyup(function(event) {
		if (event.which == 27) { // 27 is 'Ecs' in the keyboard
			disablePopup();  // function close pop up
		}  	
	});
	
	$("div#backgroundPopup").click(function() {
		disablePopup();  // function close pop up
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
		if(popupStatus == 0) { // if value is 0, show popup
			closeloading(); // fadeout loading
			$("#toPopup").fadeIn(0500); // fadein popup div
			$("#backgroundPopup").css("opacity", "0.2"); // css opacity, supports IE7, IE8
			$("#backgroundPopup").fadeIn(0001); 
			popupStatus = 1; // and set value to 1
		}	
	}
		
	function disablePopup() {
		if(popupStatus == 1) { // if value is 1, close popup
			$("#toPopup").fadeOut("normal");  
			$("#backgroundPopup").fadeOut("normal");  
			popupStatus = 0;  // and set value to 0
		}
	}
	/************** end: functions. **************/
}); // jQuery End



$(function() {
  $('#slides').slidesjs({
    width: 940,
    height: 528,
    navigation: false

  });

  $('#slides1').slidesjs({
    width: 940,
    height: 528,
    navigation: false,
    

  });

  /*
    To have multiple slideshows on the same page
    they just need to have separate IDs
  */
  $('#slides2').slidesjs({
    width: 940,
    height: 528,
    navigation: false,
    start: 3,
   
  });



});



    function relayOn() {      

     $('#intro').css("visibility", "visible");
     console.log('called relayOn');



     }

    function relayOff() {      

      $('#intro').css("visibility", "hidden");
      console.log('called relayOff');
    }

    function relay1On() {      
      $('#alphabet').css("visibility", "visible");
      console.log('called relay1On');
   
     }

    function relay1Off() {      
     $('#alphabet').css("visibility", "hidden");
     console.log('called relay1Off');
  
    }

    function relay2On() {      

      console.log("audio off");
     }

    function relay2Off() {      

     $('#audio').append('<embed id="embed_player" src="audio/zod.m4a" autostart="true" hidden="true"></embed>');
     console.log("audio on");
     $('#alphabet').css("visibility", "visible");
  
    }



    //node.js socket io
var socket = io.connect('http://localhost');
  socket.on('sensordata', function (data) {
    
    if(data.sensor06 == true){
      relayOn();
    } else if (data.sensor06 == false){
      relayOff();
    };

    if(data.sensor05 == true){
      relay1On();
    } else if (data.sensor05 == false){
      relay1Off();
    };

    
    // Sensor02 = data.sensor02;
    // Sensor03 = data.sensor03;
    // Sensor04 = data.sensor04;
    // Sensor05 = data.sensor05;
    // Sensor06 = data.sensor06;
  
  });

///
    // function refresh() {

    //       $.get('/arduino/digital/2/', function(json_response){
    //             console.log(json_response);  
    //             if (json_response === "0"){
    //                 relayOff();
    //                 console.log("OFF");

    //             } else{
    //               relayOn();
    //               console.log("ON");


    //             }          
                
    //           }
    //         ); 
          
          
    //       $.get('/arduino/digital/4/', function(json_response){
    //             console.log(json_response);  
    //             if (json_response === "0"){
    //                 relay1Off();
    //                 console.log("OFF1");

    //             } else{

    //               relay1On();
    //               console.log("ON1");
    //             }          
                
    //           }
    //         ); 

    //       $.get('/arduino/analog/2/', function(json_response){
    //             console.log(json_response); 
    //             var n = parseInt(json_response);
    //             console.log(n);
    //             if (n === 0){
    //               //if n=== 0
    //                 relay2On();
    //                 console.log("ON2");

    //             } else{
    //               relay2Off();
    //               console.log("OFF2");
    //             }          
                
    //           }
    //         ); 

    //     } 

    //   window.setInterval(refresh, 250);