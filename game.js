function loaditems()
{
	var playerinventory;
	$.getJSON('inventory.php', function(datum)
	{
		playerinventory = datum;
		$.getJSON('apparel.js', function(data)
		{
			$.each(playerinventory, function(k1, v1)
			{
				var tarray = [];
				for(var m = 0; m < v1.length; m++)
				{
					tarray[m] = v1[m];
				}
				$.each(tarray, function(m)
				{
					$.each(data, function(key, val)
					{
						if(tarray[m] == key)
						{
							$(".inventory").each(function (i)
							{
								if ($(this).hasClass('empty'))//if it's empty
								{
									var attarr = val.attributes.split(" ");
									$(this).removeClass('empty');
									$(this).attr('src', val.path);
									$(this).addClass(val.attributes);
									$(this).attr('title', val.title);
									$(this).attr('id', 'inventory'+i);
									$(this).attr('pos', val.pos);
									$(this).attr('stack', val.stack);
									$(this).attr('altid', attarr[attarr.length -1]);
									
									if($.inArray('shoe', attarr) != -1)
										$(this).attr('appareltype', 'shoe');
									else if($.inArray('hair', attarr) != -1)
										$(this).attr('appareltype', 'hair');
									else if($.inArray('pants', attarr) != -1)
										$(this).attr('appareltype', 'pants');
									else if($.inArray('shirt', attarr) != -1)
										$(this).attr('appareltype', 'shirt');
									else if($.inArray('face', attarr) != -1)
										$(this).attr('appareltype', 'face');
										
									return false;
								}
							});
						}
					});
				});
			});
		});
	});
	resetImg();
}

$(document).blur(function (event)
{
	//Crafty.unpause();
	//$(document).focus();
	//alert("!");
	event.preventDefault();
});

//setInterval(function()
//{
//	if(Crafty.isPaused())
//		Crafty.unpause();
//}, 500);

$("*").keydown( function(event)
{
	if($("#playerchat").is(":focus"))
	{
		event.stopImmediatePropagation();
		if(event.keyCode == 13)
		{
			$("#playerchat").val($("#playerchat").val().replace(regex, ''))
			if($("#playerchat").val() != "")
			{
				chat($("#playerchat").val(), character);
				var chatObj = {func: "updateChat", text: $("#playerchat").val(), name: cName, speaker: cName, color: fontcolor};
				console.log(chatObj);
				sock.send(JSON.stringify(chatObj));
				console.log('chat sent');
	
				$("#playerchat").val("");
			}
			$("#playerchat").blur();
		}
		//$("#playerchat").val($("#playerchat").val() + String.fromCharCode(event.keyCode));
	}
	else if(event.keyCode == 13)
	{
		event.stopImmediatePropagation();
		$("#playerchat").focus();
	}
});

function chat(message, speaker)
{
	if  ($("#chatarea").html() != "")
		$("#chatarea").html($("#chatarea").html() + "<br/>");
		
	$("#chatarea").html($("#chatarea").html() + "<font color='#" + fontcolor + "' face='lucida calligraphy'>" + cName + ": </font>" + message );
	$("#chatarea").getNiceScroll().resize();
	var chatarea = document.getElementById("chatarea");
	chatarea.scrollTop = chatarea.scrollHeight;
	if(speaker != character)
	{
		$("." + speaker._cfid).qtip(
		{
			content: {text: message}, 
			position: {at: "top center", my: "bottom center"},
			show: {ready:true, event: false},
			hide: {inactive: 3000},
			style: {classes: 'qtip-dark qtip-rounded qtip-shadow qtipspeechbubble'}
		});

	}
	else
	{
		$("." + cName).qtip(
		{
			content: {text: message}, 
			position: {at: "top center", my: "bottom center"},
			show: {ready:true, event: false},
			hide: {inactive: 3000},
			style: {classes: 'qtip-dark qtip-rounded qtip-shadow qtipspeechbubble'}
		});

	}
}

function multichat(message, name, color)
{
	if  ($("#chatarea").html() != "")
		$("#chatarea").html($("#chatarea").html() + "<br/>");
	$("#chatarea").html($("#chatarea").html() + "<font color='#" + color + "' face='lucida calligraphy'>" + name+ ": </font>" + message );
	$("#chatarea").getNiceScroll().resize();
	var chatarea = document.getElementById("chatarea");
	chatarea.scrollTop = chatarea.scrollHeight;
	$("." + name).qtip(
	{
		content: {text: message}, 
		position: {at: "top center", my: "bottom center"},
		show: {ready:true, event: false},
		hide: {inactive: 3000},
		style: {classes: 'qtip-dark qtip-rounded qtip-shadow qtipspeechbubble'}
	});
}

function addPlayer(name)
{
	var x = Crafty.e();
	multiCharCreate(x);
	x.addComponent(name);
	players.push(x);
	//alert(x);
	players[players.length-1]._name = name;
	players[players.length-1]._cfid = name;
	//players[players.length-1].addComponenet(name);
	//players[players.length-1]._toward = false;
	players[players.length-1]._fontcolor = "660066";
	pnames.push(name);
	console.log(name + " has logged in");
	pushPosition(character);
}

function toggleinventory()
{
	loaditems();
	if (bacon)//if menu closed
	{
		mhtml.attr(//reset menu html
		{
			x: 0 - Crafty.viewport.x,//align with the screen's current x
			y: 0 - Crafty.viewport.y,//align with the screen's current y
			w: width,//set the width to the screen's width
			h: height,//set the height to the screen's height
			z: 151//make sure it goes over the right stuff
		});
		$(".container").show("fold", null, 1000, function (){});//show the menu screen w/ container
		menuStuff();//do menu stuff
		bacon = false;//tell us the menu is open
	}
	else
	{
		bacon = true;//menu is not open
		$(".container").hide("fold", null, 1000, function (){});//hide container
	}
	$(".inventory").draggable();//The inventory stuff is draggable
}

function itemclick(id)
	{
		clicked = id;//Set var clicked as whatever id is picked for scope reasons
		desc = $(document.getElementById(id)).attr('title');

		if(id == "genderselect")//if gender select is chosen
		{
			$(document.getElementById(id)).toggleClass("female male");//swap genders
			if($(document.getElementById(id)).hasClass("female"))//if female
				$(document.getElementById(id)).attr("src", "img/femalesign.png");//set the image to female
			else
				$(document.getElementById(id)).attr("src", "img/malesign.png");//set the image to male
				
			character.toggleComponent("male", "female");//Changes the gender for characters, as well
				
		}

		/**else if(id == "clock")//pulls out the clock
		{
			if(!clockClicked)
			{
				$("#clock").animate
				(
					{
						clock._x = 0,
						clock._y = 0
					},  500, function(){}
				);
				clockClicked = true;
			}
			else
			{
				$("#clock").animate(
				{
					clock._x = -100,
					clock._y = -100
				}, 500, function(){});
				clockClicked = false;
			}
		}**/
		if(id == "inventorybutton")//if inventory button is clicked, do inventory stuff
		{
			if(bacon)
			{
				mhtml.attr({x:0 - Crafty.viewport.x, y:0 - Crafty.viewport.y, w:width, h:height, z: 151});
				$(".container").show("fold", null, 1000, function(){});
				menuStuff();
				bacon = false;
			}
			else
			{
				bacon = true;
				$( ".container" ).hide( "fold", null, 1000, function(){});
			}
			$(".inventory").draggable();
		}
		else if(id == "qbutton")
		{
			dance();//Toggle bgm
		}
		else if(id == "downarrow")//hide the footer
			$("#footerholder").hide( "fold", null, 1000, function(){$(".footerdiv").css("height","50px");$("#footerarrow").show("fold", null, 1000, function(){});});
		else if (id == "uparrow")//show the footer
			$("#footerarrow").hide("fold", null, 1000, function(){$(".footerdiv").css("height","130px");$("#footerholder").show( "fold", null, 1000, function(){});});
		
		$("#description").val(desc);//set the description
		
		if($(document.getElementById(id)).hasClass('quickbar'))//if it is part of the quickbar
		{
			if($(document.getElementById(id)).hasClass('tool'))//If it's a tool
			{
				if($(document.getElementById(id)).hasClass('active'))//If it's active
				{
					if(activeclick)
						$(document.getElementById(id)).addClass('permActive');
					else
						$('.tool').removeClass('permActive');
					$('.tool').removeClass('active');//un-active it
					activeclick = false;
				}
				else
				{
					$('.tool').removeClass('active');
					$('.tool').removeClass('permActive');
					$(document.getElementById(id)).addClass('active');//active it
					activeclick = true;
				}
			}
		}
		
		if($(document.getElementById(id)).hasClass('item') && !$(document.getElementById(id)).hasClass('quickbar'))//if it's a tool not on the quickbar
		{
			if(itemclicked)
				itemchange();//put it on the quickbar
			else
				itemclicked=true;//make it a double click
		}
		
		if($(document.getElementById(id)).hasClass('apparel'))//If it's apparel
		{
			if(apparelclicked)
				apparelchange();//put it on the player
			else
				apparelclicked=true;//make it a double click
		}
		
		if($(document.getElementById(id)).hasClass('treeslot'))//if it's on the tree
		{
			if(treeslotclicked)
				treeremove();//take it off the tree
			else
				treeslotclicked = true;//make it a double click
		}
		var titletemp = $(document.getElementById(id)).attr('title');
		$("*").qtip({position: {at: "right top", my: "left top"}, style: {classes: 'qtip-dark'}});
		$(document.getElementById(id)).attr('title', titletemp);
		
		setTimeout(function(){apparelclicked = treeslotclicked = itemclicked = activeclick = false;}, 500);//make double clicks work
};

function itemchange()//swap from menu onto quickbar
{
	menuStuff();
	var temp = $(document.getElementById(clicked)).attr('title');
	var ef = $('.empty').first();
	ef.addClass(clicked);
	ef.addClass("item");
	ef.addClass("tool");
	ef.attr('title', temp);
	$(document.getElementById(clicked)).removeClass(clicked);
	$(document.getElementById(clicked)).removeClass('item');
	$(document.getElementById(clicked)).removeClass('tool');
	$(document.getElementById(clicked)).removeClass('inventory');
	$(document.getElementById(clicked)).attr('title', 'An empty inventory slot.');
	ef.attr('src', $(document.getElementById(clicked)).attr('src'));
	$(document.getElementById(clicked)).attr('src', 'img/trans3.png');
	$(document.getElementById(clicked)).attr('id', 'null');
	ef.attr('id', clicked);
	ef.removeClass("empty");
}

function treeremove()//remove from tree
{
	menuStuff();
	var temp = clicked.replace("slot","");
	clicked = $(document.getElementById(clicked)).attr('src').replace(".png","").replace("hard-","").replace("item","");
	remover(temp);
	//$(document.getElementById(clicked)).removeClass(temp);
	
	//$(".charimg").each(function(index)
	//{
	//	if($(this).hasClass(temp) && ($(this).hasClass("apparel")))
	//		$(this).removeClass(temp);
	//	alert(clicked);
		apparelchange();
//	})
}

function resetImg()//reset the images so they don't overlap
{
	if($(".charimg").hasClass('female'))
	{
		$(".maleonly").css({"background-color":"rgba(255,0,0,.4)"});
		$(".femaleonly").css({"background-color":"rgba(0,0,0,0)"});
	}
				
	if($(".charimg").hasClass('male'))
	{
		$(".femaleonly").css({"background-color":"rgba(255,0,0,.4)"});
		$(".maleonly").css({"background-color":"rgba(0,0,0,0)"});
	}
		
	$(".removeonmenu").remove();//some things need to be removed once the menu toggles so they don't overlap
	$(".treeslot").attr('src', 'img/trans.png');//set the non-used parts of the tree to transparent
	if(!htmltempbool)//if not the tree
	{
		$(".charimg").each(function(index)
		{
			if(index == 0)//make first image the character
			{
				var charimgfromnowon = $(this).css("background-image").split('/').pop().replace(/\"|\'|\)/g,'');
				document.getElementById("character").src = "img/" + charimgfromnowon;
				inventorystring = inventorystring.replace("src='img/gaia.png'", charimgfromnowon);
			}
			else//make all other images on top
			{
				$("#character").after("<img src='img/" + $(this).attr("src").split('/').pop().replace(/\"|\'|\)/g,'').replace('item','') + "' class='charasideimg pushed2 removeonmenu'/>");
			}
		});
	}
	else
	{
		$(".charimg").each(function(index)//For each charimg type, put it in the tree
		{
			if($(this).hasClass('hair'))
				$('.hairslot').attr('src', $(this).attr('src'));
				
			if($(this).hasClass('face'))
				$('.faceslot').attr('src', $(this).attr('src'));
				
			if($(this).hasClass('shirt'))
				$('.shirtslot').attr('src', $(this).attr('src'));
				
			if($(this).hasClass('pants'))
				$('.pantsslot').attr('src', $(this).attr('src'));
				
			if($(this).hasClass('shoe'))
				$('.shoeslot').attr('src', $(this).attr('src'));
		});
	}
}

function menuStuff()//resets the menu and makes stuff work
{
	resetImg();
	$(".apparel").draggable({revert: true});
	$("#character").droppable(
	{
		accept: ".apparel",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	/**$(".charimg").droppable(
	{
		accept: ".apparel",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});**/
	
	$(".hairslot").droppable(
	{
		accept: ".hair",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".hatslot").droppable(
	{
		accept: ".hat",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".earringslot").droppable(
	{
		accept: ".earring",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".faceslot").droppable(
	{
		accept: ".face",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".faceapparelslot").droppable(
	{
		accept: ".faceapparel",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".facialhairslot").droppable(
	{
		accept: ".facialhair",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".necklaceslot").droppable(
	{
		accept: ".necklace",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".back1slot").droppable(
	{
		accept: ".back",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".shirtslot").droppable(
	{
		accept: ".shirt",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".back2slot").droppable(
	{
		accept: ".back",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".gloveslot").droppable(
	{
		accept: ".glove",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".waistslot").droppable(
	{
		accept: ".waist",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".pantsslot").droppable(
	{
		accept: ".pants",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	$(".shoeslot").droppable(
	{
		accept: ".shoe",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				apparelchange();
			}, 10);
		}
	});
	
	$(".item").draggable({revert: true});
	$(".empty").droppable(
	{
		accept: ".item",
		activeClass: "highlight",
		drop: function(event, ui)
		{
			setTimeout(function()
			{
				//var old = document.getElementById(clicked);
				itemchange();
			}, 10);
		}
	});
}

function apparelchange()
{
	var tempid = $(document.getElementById(clicked)).attr('id');
	var putter = "";
	if($('#' + tempid).attr('appareltype') == 'shoe')
		putter = character._shoe;
	else if($('#' + tempid).attr('appareltype') == 'pants')
		putter = character._pants;
	else if($('#' + tempid).attr('appareltype') == 'shirt')
		putter = character._shirt;
	else if($('#' + tempid).attr('appareltype') == 'face')
		putter = character._face;
	else if($('#' + tempid).attr('appareltype') == 'hair')
		putter = character._hair;
		
	var temparray = $('#' + tempid).attr('pos').split(',');	
	if($('#'+tempid).hasClass('charimg'))
		putter.sprite(999,999,999,999);
	else
		putter.sprite(parseInt(temparray[0], 10)+","+parseInt(temparray[1], 10)+","+parseInt(temparray[2], 10)+","+parseInt(temparray[3], 10));
	remover($('#' + tempid).attr('appareltype'));
	$('#' + tempid).toggleClass('charimg');
		
	resetImg();
}

function swap()//changes tree to charimg and vice versa
{
	if(htmltempbool)
	{
		$('.charaside').html(htmltemp);
		$('.charaside').css({"top":"30px","left":"20px"});
		htmltempbool = false;
	}
	else
	{
		htmltemp = $('.charaside').html();
		$('.charaside').html(appareltreestring);
		$('.charaside').css({"top":"20px","left":"100px"});
		htmltempbool = true;
	}
	menuStuff();
}

function remover(type)//removes types of clothes based on class
{
	$("."+type).each(function()
	{
		if(!($(this).attr('id') == (clicked)))
			$(this).removeClass('charimg');
	});
}

function dance(b)
{
	if(music)
	{
		music = false;
		pause = true;
		Crafty.audio.pause("bgm01");
		notice("BGM Disabled!");
	}
	else
	{
		music = true;
		pause = false;
		Crafty.audio.unpause("bgm01");
		notice("BGM Enabled!");
	}
}

function notice(s)
{
	if(!noticebool)
	{
		noticebool = true;
		creategrowl(s, "qtip-tipsy alert", "Notice", "top right"); 
		setTimeout(function(){noticebool = false;}, 15);
	}
}

function creategrowl(message, color, type, side) 
{
        // Use the last visible jGrowl qtip as our positioning target
        var target = $('.qtip.jgrowl:visible:last');
 
        // Create your jGrowl qTip...
        $(document.body).qtip({
            // Any content config you want here really.... go wild!
            content: {
                text: message,
                title: {
                    text: type,
					classes: color,
                    button: true
                }
            },
            position: {
                my: side,
                // Not really important...
                at: (target.length ? 'bottom' : 'top') + ' right',
                // If target is window use 'top right' instead of 'bottom right'
                target: target.length ? target : $(window),
                // Use our target declared above
                adjust: { y: 5 },
                effect: function(api, newPos) {
                    // Animate as usual if the window element is the target
                    $(this).animate(newPos, {
                        duration: 200,
                        queue: false
                    });
 
                    // Store the final animate position
                    api.cache.finalPos = newPos; 
                }
            },
            show: {
                event: false,
                // Don't show it on a regular event
                ready: true,
                // Show it when ready (rendered)
                effect: function() {
                    $(this).stop(0, 1).fadeIn(400);
                },
                // Matches the hide effect
                delay: 0,
                // Needed to prevent positioning issues
                // Custom option for use with the .get()/.set() API, awesome!
                persistent: false
            },
            hide: {
                event: false,
                // Don't hide it on a regular event
                effect: function(api) {
                    // Do a regular fadeOut, but add some spice!
                    $(this).stop(0, 1).fadeOut(400).queue(function() {
                        // Destroy this tooltip after fading out
                        api.destroy();
 
                        // Update positions
                        updateGrowls();
                    })
                }
            },
            style: {
                classes: 'jgrowl qtip-rounded ' + color,
                // Some nice visual classes
                tip: false // No tips for this one (optional ofcourse)
            },
            events: {
                render: function(event, api) {
                    // Trigger the timer (below) on render
                    timer.call(api.elements.tooltip, event);
                }
            }
        }).removeData('qtip');
    };
 
    // Make it a window property see we can call it outside via updateGrowls() at any point
    window.updateGrowls = function() {
        // Loop over each jGrowl qTip
        var each = $('.qtip.jgrowl'),
            width = each.outerWidth(),
            height = each.outerHeight(),
            gap = each.eq(0).qtip('option', 'position.adjust.y'),
            pos;
 
        each.each(function(i) {
            var api = $(this).data('qtip');
 
            // Set target to window for first or calculate manually for subsequent growls
            api.options.position.target = !i ? $(window) : [
                pos.left + width, pos.top + (height * i) + Math.abs(gap * (i-1))
            ];
            api.set('position.at', 'top right');
            
            // If this is the first element, store its finak animation position
            // so we can calculate the position of subsequent growls above
            if(!i) { pos = api.cache.finalPos; }
        });
    };
 
    // Setup our timer function
    function timer(event) {
        var api = $(this).data('qtip'),
            lifespan = 5000; // 5 second lifespan
        
        // If persistent is set to true, don't do anything.
        if (api.get('show.persistent') === true) { return; }
 
        // Otherwise, start/clear the timer depending on event type
        clearTimeout(api.timer);
        if (event.type !== 'mouseover') {
           api.timer = setTimeout(api.hide, lifespan);
       }
   }
   
   // Utilise delegate so we don't have to rebind for every qTip!
    $(document).delegate('.qtip.jgrowl', 'mouseover mouseout', timer);

function achieve(s)
{
	if(!noticebool)
	{
		noticebool = true;
		creategrowl(s, "alert", "Achievement", "top right"); 
		setTimeout(function(){noticebool = false;}, 15);
	}
}