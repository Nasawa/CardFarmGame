window.onload = function ()//once the window is loaded
{	
	$("#speakeasy").mouseover(function ()
	{
		$("#chatarea").getNiceScroll().show();
	});

	$("#speakeasy").mouseout(function ()
	{
		setTimeout(function(){$("#chatarea").getNiceScroll().hide();}, 2000);
	});
	
	$("#chatarea").niceScroll({cursorcolor:"#222222", autohidemode: false});
	
    var quickbarstring = "<footer class='quickbarfooter'>Moo</footer>"//inits the string to edit later

    Crafty.init();//Starts Crafty. No other Crafty commands works if this isn't done.
	//Crafty.viewport.x = 0;//Makes sure the x of the viewport is 0. This may need to be changed -- the isometric triangle alg starts  at a weird spot.
    //var playertile;//Makes playertile, the tile that the player x and y are associated with.
    //var toward;//Boolean. Determines whether or not the player needs to move.
	
	Crafty.settings.modify("autoPause", false);
	Crafty.unbind('Pause');
	
	Crafty.audio.add("bgm01", "bgm/bgm01.mp3");
	//Crafty.audio.play("bgm01", -1);
	$(window).blur(function()
	{
		//alert("blurred");
		//Crafty.pause();
		//$(alert("!")).keydown();
		Crafty.audio.pause("bgm01");
		pause = true;
		//alert("!");
		if(Crafty.isPaused())
		{
			Crafty.pause();
			console.log("Unpaused!");
		}
	});
	
	$(window).focus(function()
	{
		if(pause)
			if(music)
				Crafty.audio.unpause("bgm01");
	});
	
	Crafty.scene("loading", function()
	{
		Crafty.e("2D, DOM, Image, bg")
		.attr({w:width, h:height, x:0, y:0})
		.image("img/loading.png");
		Crafty.load(["img/papyrus.jpg", "img/tiles2.png", "img/femaleanimsheet.png", "img/maleframepixelskin.png", "img/shirtanimsheet.png"], function()
		{
			Crafty.scene("playerFarm");
		});
	});
	
	Crafty.scene("loading");
	
	
	Crafty.scene("playerFarm", function()
	{
		achieve("25pts! Game Start!");
		
		//$("body").append("<div class='rain'>Moo</div>");
		
		/**
		The following are sprite initiations.
		The init works in this way:
		Crafty.sprite('Square image size (for instance 128x128)', 'image path' {images names/locs});
		So below:
		Crafty.sprite(128, "img/tiles2.png",
		{
			grass:  [0,0,1,1],
			stone   [1,0,1,1],
			tilled: [2,0,1,1]
		}
		does this:
		Make a Crafty Sprite of 128x128px from 'img/tiles2.png'.
		With this, make grass at 0, 0 with width 128 and height 128.
		Make stone at 128, 0 with width 128 and height 128.
		Make tilled at 256, 0, with width 128 and height 128.
		**/
		Crafty.sprite(200, "img/clock.png",
		{
			clock: [0,0,0,0]
		});

		Crafty.sprite(128, "img/tiles2.png",
		{
			grass: [0, 0, 1, 1],
			stone: [1, 0, 1, 1],
			tilled: [2, 0, 1, 1]
		});

		Crafty.sprite(135, "img/femaleanimsheet.png",
		{
			female: [0, 0, 0, 0]
		});

		Crafty.sprite(135, "img/maleframepixelskin.png",
		{
			male: [0, 0, 0, 0]
		});

		Crafty.sprite(135, "img/tomatosheet2.png",
		{
			tomatoSprout: [0, 0, 0, 0]
		});
		
		Crafty.sprite(1920, "img/raind.png",
		{
			rainSprite: [0,0,0,0]
		});

		//Crafty.sprite(135, "img/hard-femaleslacksblack.png",
		Crafty.sprite(135, "img/pantsanimsheet.png",
		{
			pants: [-1, -1, -1, -1]
		});
		
		Crafty.sprite(135, "img/shoeanimsheet.png",
		{
			shoe: [-1, -1, -1, -1]
		});

		//Crafty.sprite(135, "img/hard-femaletshirtblue.png",
		Crafty.sprite(135, "img/shirtanimsheet.png",
		{
			shirt: [-1, -1, -1, -1]
		});

		Crafty.sprite(135, "img/hairsheet2.png",
		{
			hair: [-1, -1, -1, -1]
		});

		Crafty.sprite(135, "img/facesheet2.png",
		{
			face: [-1, -1, -1, -1]
		});

		Crafty.sprite(135, "img/jack.png",
		{
			jack: [0, 0, 0, 0]
		});
		
		clock = Crafty.e("2D, DOM, clock, Mouse, MouseFace")
		.origin('center')
		.attr(
		{
			w: 200, h: 200, x:-100, y:-100, z:9999, curAngle:0, clocktimer:0
		})
		.bind("EnterFrame", function ()
		{
			if(this.clocktimer == 60)
			{
				this.curAngle++;
				this.rotation = this.curAngle;
				this.clocktimer = 0;
			}
			this.clocktimer++;
			this.x = -100 - Crafty.viewport.x;
			this.y = -100 - Crafty.viewport.y;
		});
		
		$(".clock").attr("id", "clock");
		
		lumberjack = Crafty.e("2D, DOM, jack, Mouse, Keyboard")//Make 'entity' lumberjack with classes 2D, DOM, jack(defined in sprites), Mouse, and Keyboard.
		//Mouse allows for things like MouseUp. Keyboard allows for keyboard functionality. These methods will not work without them.
			.attr(
		{
			w: 135,
			h: 135,
			x: 10,
			y: 10,
			z: 90
		})
			.bind("MouseUp", function (e)//If the mouse is released on him, do this stuff.
		{
			if (e.mouseButton == Crafty.mouseButtons.LEFT)//If it's the left button
			{//show the menu
				toggleinventory();
				multichat("What brings you to this neck of the woods?", lumberjack._name, lumberjack._fontcolor);
			}
		});

		lumberjack._name = "Jack Forrester";
		lumberjack._cfid = "jack";
		lumberjack._fontcolor = "970000";
		lumberjack.addComponent("jack");
		
		charCreate(character);
		
		character._name = cName;
		character._cfid = "player";
		character._fontcolor = "FF0000";
		fontcolor = "FF0000";
		character.addComponent(cName);

		//});
		
		/*Crafty.e("2D, DOM, Color, bg")
		.attr({w:width, h:height, x:0, y:0})
		.bind("EnterFrame", function()
		{
			this.x = 0 - Crafty.viewport.x;
			this.y = 0 - Crafty.viewport.y;
		})
		.color("#D2A08C");*/
		
		//var iso = Crafty.isometric.size(128);//Old tile system. Let's leave this, just in case.
		var over = false;//boolean for if mouse is over or not
		var z = 0;//Boolean for z. Do I use this? Whatev.
		Crafty.e("2D, DOM, TiledMapBuilder")//Use the tiledMapBuilder library to create the isodiamond.
		.createWorld(source, function(map)//Create the world.
		{
			//map.x+=3000;//Set the x to move everything over. Still trying to fix the offset.
			//There's a slight glitch with subsequent layers taking mouse-al priority. May need to compress non-blocked tiles to a single layer.
			for(var i = 0; i < map.getLayer('Grass').length; i++)//For every grass tile
			{
				map.getLayer('Grass')[i].addComponent("grass, tile, Mouse, Keyboard");//add these components so we can work with it
				tilearray.push(map.getLayer('Grass')[i]);//and add it to the tilearray.
			}
		});
		for(var i = 0; i < tilearray.length; i++)//for every tile
		{
			var tile = tilearray[i];//set a temp var
			//tile.x+=1000;//STILL ACCOUNTING FOR DAMN ISODIAMOND
			//var tile = Crafty.e("2D, DOM, tomatoSprout, Mouse, Keyboard")//Artifact. Leave just in case.
			//.attr('z',i+1 * y+1).areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])//Artifact.
			//.attr('z', i + 1 * y + 1)//Artifact.
			tile.areaMap([64, 0], [128, 32], [128, 96], [64, 128], [0, 96], [0, 32])//This is stolen. Sets some sort of map for the tiles. Too scared to remove.
				.unbind("EnterFrame")//Removes EnterFrame in an attempt to fix the dirty render.
				.bind("MouseUp", function (e)//When the mouse goes over it
			{
				if (e.mouseButton == Crafty.mouseButtons.LEFT)
				{
					setTimeout(function(){pushPosition(character)}, 25);
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////On Tile Click Start -- Clifton Zone
					if ($('.shovel').hasClass('active'))//If the shovel is active on the quickbar
					{
						var t = this;// The this scope gets screwed up. Need to hold it here.
						if (this.has('grass'))//if it has the grass component
						{
							character.animate('shovel', 10, 1);//do the shovel animation
							//setTimeout(function ()//set a timeout to match up with the shovel anim. Don't want to dig up the tile til we move the shovel!
							//{
								this.toggleComponent('grass', 'stone');//go from grass to stone (stone is shovel - I tried changing it, bad things happen)
							//}, 50);//Do this 50ms from now. This is just a base figure, needs to be adjusted.
							$('.shovel').removeClass('active');
						}
					}
					if ($('.shovel').hasClass('permActive'))//If the shovel is active on the quickbar
					{
						var t = this;// The this scope gets screwed up. Need to hold it here.
						if (this.has('grass'))//if it has the grass component
						{
							character.animate('shovel', 10, 1);//do the shovel animation
							//setTimeout(function ()//set a timeout to match up with the shovel anim. Don't want to dig up the tile til we move the shovel!
							//{
								this.toggleComponent('grass', 'stone');//go from grass to stone (stone is shovel - I tried changing it, bad things happen)
							//}, 50);//Do this 50ms from now. This is just a base figure, needs to be adjusted.
						}
					}
					
					if ($('.wateringcan').hasClass('active'))//If the shovel is active on the quickbar
					{
						var t = this;// The this scope gets screwed up. Need to hold it here.
						if (this.has('stone'))//if it has the grass component
						{
							//character.animate('shovel', 10, 1);//do the shovel animation
							//setTimeout(function ()//set a timeout to match up with the shovel anim. Don't want to dig up the tile til we move the shovel!
							//{
								this.toggleComponent('grass', 'stone');//go from grass to stone (stone is shovel - I tried changing it, bad things happen)
							//}, 50);//Do this 50ms from now. This is just a base figure, needs to be adjusted.
							$('.wateringcan').removeClass('active');
						}
					}
					if ($('.wateringcan').hasClass('permActive'))//If the shovel is active on the quickbar
					{
						var t = this;// The this scope gets screwed up. Need to hold it here.
						if (this.has('stone'))//if it has the grass component
						{
							//character.animate('shovel', 10, 1);//do the shovel animation
							//setTimeout(function ()//set a timeout to match up with the shovel anim. Don't want to dig up the tile til we move the shovel!
							//{
								this.toggleComponent('grass', 'stone');//go from grass to stone (stone is shovel - I tried changing it, bad things happen)
							//}, 50);//Do this 50ms from now. This is just a base figure, needs to be adjusted.
						}
					}
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////On Tile Click End -- Clifton Zone
					if (bacon)//if the bacon var is true, meaning the menu is not up
					{
						if (this.has("grass"))
						{
							this.sprite(0, 0, 1, 1);//Unshow the lined sprite
						}
						else
						{
							this.sprite(1, 0, 1, 1);
						}
						if(character._playertile)
						{
							if (character._playertile.has("grass"))
							{
								character._playertile.sprite(0, 0, 1, 1);//Unshow the lined sprite
							}
							else
							{
								character._playertile.sprite(1, 0, 1, 1);
							}
						}
						if(((tilearray.indexOf(character._playertile)/20) +"").split(".")[1] == ((tilearray.indexOf(this)/20) +"").split(".")[1])
						{
							if(!character._toward)
								character._toward = this.x + "?" + this.y;//Go toward x and y
							character._playertile = this;//Sets new playertile
						}
						else
						{
							var _adjacent = Math.abs((this.x - (character._playertile.x))) * 1.0;
							var _opposite = Math.abs((this.y - (character._playertile.y))) * 1.0;
							var _hypoten = Math.sqrt((_adjacent * _adjacent) + (_opposite * _opposite));
							var _angle = (Math.cos(_adjacent / _hypoten)).toFixed(2);//do math to get the angle of the hypoteneuse
							if (_angle == .63)//if that angle is 63
							{
								if(!character._toward)
									character._toward = this.x + "?" + this.y;//Go toward x and y
								character._playertile = this;//Sets new playertile
							}
							else
							{
								var tileindex = tilearray.indexOf(character._playertile);
								var tileindexfloor = Math.floor(tileindex / 20) * 20;
								var displacement = tileindex - tileindexfloor;
								for(var i = 0; i < 20; i++)
								{
									if((((tileindexfloor + i)/20)+"").split(".")[1] == ((tilearray.indexOf(this)/20)+"").split(".")[1])
									{
										if(!character._toward)
											character._toward = tilearray[tileindexfloor + i].x + "?" + tilearray[tileindexfloor + i].y;										
										character._playertile = this;
										return;
									}
								}
							}
						}
						
					}
					else
					{
						if(this == character._playertile)
							character._speed = 4;
					}
				}
			})
			//.bind("EnterFrame")
			.bind("MouseOver", function ()//If the mouse is over
			{
				if (this.has("grass"))
				{
					this.sprite(0, 1, 1, 1);//Show the sprite with the lines, to make it clear
				}
				else
				{
					this.sprite(1, 1, 1, 1);
				}
				this.over = true;
			})
				.bind("MouseOut", function ()//If the mouse leaves
			{
				if (this.has("grass"))
				{
					this.sprite(0, 0, 1, 1);//Unshow the lined sprite
				}
				else
				{
					this.sprite(1, 0, 1, 1);
				}
				this.over = false;
			})
				.bind('KeyDown', function (e)
			{
				if (e.keyCode === Crafty.keys['SPACE'])
				{
					if (this.over) 
						this.toggleComponent("stone", "grass");
						
					notice("Tile changed using mystical dev powers!");
				}
				if (e.keyCode === Crafty.keys['Z'])//if you press z
				{
					if (this.over)//if the tile is selected (to make it only do it once, not tile number of times
					{
						toggleinventory();
					}
				}
				if (e.keyCode === Crafty.keys['M'])//If you press m, move the character to the selected tile
				{
					if (this.over)
					{
						character.x = this.x;
						character.y = this.y;
						character._toward = this.x + "?" + this.y;
						if (character._playertile.has('grass')) 
							character._playertile.sprite(0, 0, 0, 0);
						else 
							character._playertile.sprite(1, 0, 0, 0);
						character._playertile = this;
					}
				}
				if (e.keyCode === Crafty.keys['P'])//Log the character x and y in console for debug reasons
				{
					if (this.over)
					{
						console.log(character.x + "\n" + character.y +"\n"+ tilearray.indexOf(this));
					}
				}
				if(e.keyCode === Crafty.keys['R'])
				{
					if(this.over)
					{
						//for(var k = 0; k < width; k+=50)
						{
							//for(var j = 0; j < height; j+=50)
							if(weather == "sunny")
							{
								var k = j = 0;
								Crafty.e("2D, DOM, weather, rain, rainSprite, SpriteAnimation")
								.attr({x: 0 - Crafty.viewport.x + k, y: 0 - Crafty.viewport.y + j, w: 1920, h: 1080})
								.animate("rainmove", 0, 0, 3)
								.animate('rainmove', 40, -1)
								.bind("EnterFrame", function()
								{
									this.x = 0 - Crafty.viewport.x;
									this.y = 0 - Crafty.viewport.y;
								});
								weather = "rainy";
							}
							else
							{
								$(".weather").remove();
								weather = "sunny";
							}
						}
					}
				}
				if (e.keyCode === Crafty.keys['C'])//Show char create screen
				{
					if (this.over)
					{
						if (bacon)
						{
							$("footer").hide();//hide footer
							$("#clockdiv").hide();//hide clock
							cchtml.attr(//set the x and y
							{
								x: 0 - Crafty.viewport.x,
								y: 0 - Crafty.viewport.y,
								w: width,
								h: height,
								z: 150
							});
							$(".cccontainer").show("fold", null, 1000, function (){});//show the CharCreateContainer
							menuStuff();//Do menu stuff
							$(".container").css("z-index", 10);//set the z index of container, just in case
							$(".mhtml").css("z-index", 10);//set z index of mhtml just in case
							bacon = false;//menu showing
						}
						else//reset and reshow everything
						{
							bacon = true;
							$(".container").css("z-index", 150);
							$(".mhtml").css("z-index", 151);
							$(".cccontainer").hide("fold", null, 1000, function ()
							{});
							$("footer").show();
							$("#clockdiv").show();
						}
						$(".inventory").draggable();
					}
				}
				if (e.keyCode === Crafty.keys['T'])//Plant tomato
				{
					if (this.over)
					{
						var tomato = Crafty.e("2D, DOM, tomatoSprout, bud, Mouse, Keyboard")//Set tomato classes
							.attr(
						{
							w: 135,
							h: 135,
							x: this.x,
							y: this.y,
							z: this.z + 1
						})
							.bind('MouseOver', function ()
						{
							this.over = true;
						})
							.bind('MouseOut', function ()
						{
							this.over = false;
						})
							.bind("MouseUp", function (m)
						{
							if (m.mouseButton == Crafty.mouseButtons.RIGHT)//On right click, if you're close enough, and it's ripe, harvest the tomato
							{
								if ((character.x >= this.x - 100 && character.x <= this.x + 100) || (character.y <= this.y - 100 && character.y >= this.y + 100))
								{
									if (this.has('ripefruit'))
									{
										this.sprite(1, 1, 0, 0);
										this.toggleComponent('ripe', 'ripefruit');
										var done = false;
										$(".quickbar").each(function (i)//For each quickbar slot
										{
											if (!done) 
											{
												if($(this).hasClass('tomato'))
												{
													if(tomatocount < 25)
													{
														$(this).qtip(
														{
															position: {at: 'center', my: 'center'}, 
															content:{text: ++tomatocount},
															show: {ready:true, event: false},
															hide: false,
															style:{classes: 'itemcount'}
														});
														done = true;
													}
													else
														done = true;
												}
											}
										});
										$(".quickbar").each(function (i)//For each quickbar slot
										{
											if (!done) 
												{
												//if ($(this).hasClass('tomato'))
												{
												//	$(this).addClass('empty');
												}
												if ($(this).hasClass('empty'))//if it's empty, tomato that sumbitch
												{
													$(this).removeClass('empty');
													$(this).attr('src', 'img/tomatoitem.png');
													$(this).addClass('tomato item');
													$(this).title = "Ripe Tomato";
													done = true;
													notice("Tomato get!");
													tomatocount++;
												}
											}
										});
										done = false;
									}
								}
							}
						})
							.bind('KeyDown', function (k)
						{
							if (this.over) 
							{
								if (k.keyCode === Crafty.keys['T'])//Toggle tomato growth (good source of calcium with milk)
								{
									if (this.has('bud'))
									{
										this.sprite(0, 1, 0, 0);
										this.toggleComponent('bud', 'grow1');
									}
									else if (this.has('grow1'))
									{
										this.sprite(1, 1, 0, 0);
										this.toggleComponent('ripe', 'grow1');
									}
									else if (this.has('ripe'))
									{
										this.sprite(1, 0, 0, 0);
										this.toggleComponent('ripe', 'ripefruit');
									}
									else
									{
										this.sprite(1, 1, 0, 0);
										this.toggleComponent('ripe', 'ripefruit');
									}
								}
							}
						});
					}
				}
			});
		}

	   // iso.place(i, y, 0, tile); Artifact. Let's leave this here a while.

		character._playertile = tilearray[210];
		//iso.place(1, 1, 10, character);
		character.x = 0;
		character.y = 540;

		//iso.place(30, 30, 10, lumberjack);
		lumberjack.x = -190;//Sets lumberjack stuff
		lumberjack.y = 260;

		mhtml = Crafty.e("HTML")//Sets mhtml stuff.
			.attr(
		{
			x: 0 - Crafty.viewport.x,
			y: 0 - Crafty.viewport.y,
			w: 0,
			h: 0,
			z: 150
		})
			.bind("EnterFrame", function()
			{
				this.x = 0 - Crafty.viewport.x;
				this.y = 0 - Crafty.viewport.y;
			})
			.addComponent("mhtml")
			.replace(inventorystring);//Magic that makes it work
		$(".container").hide("fold", null, 1, function (){});//Autohide.

		cchtml = Crafty.e("HTML")
			.attr(
		{
			x: 0 - Crafty.viewport.x,
			y: 0 - Crafty.viewport.y,
			w: 0,
			h: 0,
			z: 150
		})
			.replace(charcreatescreen);//Magic.
		$(".cccontainer").hide("fold", null, 1, function ()
		{});

		//Crafty.viewport.scale(1.0);//Used to change the scale
		//Crafty.viewport.x -= 800;//Used to change the viewport x
		Crafty.viewport.clampToEntities = false;
		Crafty.viewport.follow(character, 0, 0);//Follows the character

		$(".inventory").draggable();//Makes sure inventory class is draggable

		$("#footerarrow").hide("fold", null, 1, function ()//autohide footer arrow
		{});

		if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
		{
			Crafty.viewport.scale(0.8);
			Crafty.viewport.follow(character, width * .0001, height * .000000001);//Follows the character
			//height = $(window).height();
			//width = $(window).width();
			//width = width / .6;
			//height = height / .6;
			alert("Mobile app!");
		}//if mobile, do some silly stuff**/
		$("*").qtip({position: {at: "right top", my: "left top"}, style: {classes: 'qtip-dark'}});
	});
	
	loaditems();
};