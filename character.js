function charCreate(characterInitObj)
{
	console.log("Initializing current character...");
	//characterInitObj = Crafty.e("2D, DOM, female, Keyboard, SpriteAnimation, charimg, persist, player")//Character, the most important part of the game. Is female and has attr charimg.
	characterInitObj.addComponent("2D, DOM, female, Keyboard, SpriteAnimation, charimg, persist, player")
			.attr(//sets width, height, x, y, and z.
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 90,
			_toward2:"0?540",
			_speed: 2,
			_tempy: 1,
			_playertile: tilearray[210]
		})
			.animate("walk_down", 1, 0, 8)//Walks down
			.animate("walk_up", 10, 0, 17)
			//.animate("shovel", 9, 0, 3)//Uses shovel
			.bind("EnterFrame", function ()//Whenever the frame starts and the characterInitObj is in the frame
		{	
			$(".charimg").each(function(index)
			{
				if(characterInitObj._tempy > 0)
				{
					if($(this).hasClass('hair'))
					{
						characterInitObj._hair.addComponent('worn');
						if($(this).hasClass('blue'))
							characterInitObj._hair.sprite(1,1,0,0);
						else if($(this).hasClass('brown'))
							characterInitObj._hair.sprite(1,2,0,0);
						else if($(this).hasClass('blonde') &&($(this).hasClass('hair01')))
							characterInitObj._hair.sprite(1,0,0,0);
						else if($(this).hasClass('blonde') &&($(this).hasClass('hair02')))
							characterInitObj._hair.sprite(1,5,0,0);
						else if($(this).hasClass('blonde') &&($(this).hasClass('hair03')))
							characterInitObj._hair.sprite(1,6,0,0);
						else if($(this).hasClass('blonde') &&($(this).hasClass('hair04')))
							characterInitObj._hair.sprite(1,7,0,0);
						else if($(this).hasClass('purple') &&($(this).hasClass('hair02')))
							characterInitObj._hair.sprite(1,8,0,0);
						else if($(this).hasClass('purple') &&($(this).hasClass('hair03')))
							characterInitObj._hair.sprite(1,9,0,0);
						else if($(this).hasClass('purple') &&($(this).hasClass('hair04')))
							characterInitObj._hair.sprite(1,10,0,0);
						else if($(this).hasClass('red'))
							characterInitObj._hair.sprite(1,4,0,0);
						else
							characterInitObj._hair.sprite(1,3,0,0);
					}
					if($(this).hasClass('shirt'))
					{
						characterInitObj._shirt.addComponent('worn');
						if($(this).hasClass('blue'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(9,0,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 0, 8);
							characterInitObj._shirt.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('green'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(9,1,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 1, 8);
							characterInitObj._shirt.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('pink'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(9,2,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 2, 8);
							characterInitObj._shirt.animate("walk_up", 10, 2, 17);	
						}
						else if($(this).hasClass('red'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(9,3,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 3, 8);
							characterInitObj._shirt.animate("walk_up", 10, 3, 17);	
						}
					}
					if($(this).hasClass('pants'))
					{
						characterInitObj._pants.addComponent('worn');
						if($(this).hasClass('blue'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(9,0,0,0);
							characterInitObj._pants.animate("walk_down", 1, 0, 8);
							characterInitObj._pants.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('black'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(9,1,0,0);
							characterInitObj._pants.animate("walk_down", 1, 1, 8);
							characterInitObj._pants.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('white'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(9,2,0,0);
							characterInitObj._pants.animate("walk_down", 1, 2, 8);
							characterInitObj._pants.animate("walk_up", 10, 2, 17);	
						}
					}
					if($(this).hasClass('shoe'))
					{
						characterInitObj._shoe.addComponent('worn');
						if($(this).hasClass('black'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(9,0,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 0, 8);
							characterInitObj._shoe.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('blue'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(9,1,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 1, 8);
							characterInitObj._shoe.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('red'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(9,2,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 2, 8);
							characterInitObj._shoe.animate("walk_up", 10, 2, 17);	
						}
					}
						characterInitObj._face.sprite(999,999,999,999);
						//characterInitObj._toward = false;
				}
				else
				{
					if($(this).hasClass('hair'))
					{
						characterInitObj._hair.addComponent('worn');
						if($(this).hasClass('blue'))
							characterInitObj._hair.sprite(0,1,0,0);
						else if($(this).hasClass('brown'))
							characterInitObj._hair.sprite(0,2,0,0);
						else if($(this).hasClass('hair01blonde'))
							characterInitObj._hair.sprite(0,0,0,0);
						else if($(this).hasClass('hair02blonde'))
							characterInitObj._hair.sprite(0,5,0,0);
						else if($(this).hasClass('hair03blonde'))
							characterInitObj._hair.sprite(0,6,0,0);
						else if($(this).hasClass('hair04blonde'))
							characterInitObj._hair.sprite(0,7,0,0);
						else if($(this).hasClass('hair02purple'))
							characterInitObj._hair.sprite(0,8,0,0);
						else if($(this).hasClass('hair03purple'))
							characterInitObj._hair.sprite(0,9,0,0);
						else if($(this).hasClass('hair04purple'))
							characterInitObj._hair.sprite(0,10,0,0);
						else if($(this).hasClass('hair02turq'))
							characterInitObj._hair.sprite(0,11,0,0);
						else if($(this).hasClass('hair03turq'))
							characterInitObj._hair.sprite(0,12,0,0);
						else if($(this).hasClass('hair04turq'))
							characterInitObj._hair.sprite(0,13,0,0);
						else if($(this).hasClass('red'))
							characterInitObj._hair.sprite(0,4,0,0);
						else
							characterInitObj._hair.sprite(0,3,0,0);
					}
					if($(this).hasClass('face'))
					{
						characterInitObj._face.addComponent('worn');
						if($(this).hasClass('face01'))
							characterInitObj._face.sprite(0,0,0,0);
						else if($(this).hasClass('face02'))
							characterInitObj._face.sprite(0,1,0,0);
						else if($(this).hasClass('face03'))
							characterInitObj._face.sprite(0,2,0,0);
						else
							characterInitObj._face.sprite(0,3,0,0);
						
					}
					if($(this).hasClass('shirt'))
					{
						characterInitObj._shirt.addComponent('worn');
						if($(this).hasClass('blue'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(0,0,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 0, 8);
							characterInitObj._shirt.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('green'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(0,1,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 1, 8);
							characterInitObj._shirt.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('pink'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(0,2,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 2, 8);
							characterInitObj._shirt.animate("walk_up", 10, 2, 17);	
						}
						else if($(this).hasClass('red'))
						{
							if(!characterInitObj._shirt.isPlaying())
								characterInitObj._shirt.sprite(0,3,0,0);
							characterInitObj._shirt.animate("walk_down", 1, 3, 8);
							characterInitObj._shirt.animate("walk_up", 10, 3, 17);	
						}
					}
					if($(this).hasClass('pants'))
					{
						characterInitObj._pants.addComponent('worn');
						if($(this).hasClass('blue'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(0,0,0,0);
							characterInitObj._pants.animate("walk_down", 1, 0, 8);
							characterInitObj._pants.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('black'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(0,1,0,0);
							characterInitObj._pants.animate("walk_down", 1, 1, 8);
							characterInitObj._pants.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('white'))
						{
							if(!characterInitObj._pants.isPlaying())
								characterInitObj._pants.sprite(0,2,0,0);
							characterInitObj._pants.animate("walk_down", 1, 2, 8);
							characterInitObj._pants.animate("walk_up", 10, 2, 17);	
						}
					}
					if($(this).hasClass('shoe'))
					{
						characterInitObj._shoe.addComponent('worn');
						if($(this).hasClass('black'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(0,0,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 0, 8);
							characterInitObj._shoe.animate("walk_up", 10, 0, 17);	
						}
						else if($(this).hasClass('blue'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(0,1,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 1, 8);
							characterInitObj._shoe.animate("walk_up", 10, 1, 17);	
						}
						else if($(this).hasClass('red'))
						{
							if(!characterInitObj._shoe.isPlaying())
								characterInitObj._shoe.sprite(0,2,0,0);
							characterInitObj._shoe.animate("walk_down", 1, 2, 8);
							characterInitObj._shoe.animate("walk_up", 10, 2, 17);	
						}
					}
				}
			});
			
			if (characterInitObj._toward)//if toward is not null or false
			{
				if (this.y < characterInitObj._toward.split("?")[1] - 100) 
				{
					this.y += characterInitObj._speed/2;//set y
					characterInitObj._tempy = -1;
				}
				else if (this.y > characterInitObj._toward.split("?")[1] - 100)
				{
					this.y -= characterInitObj._speed/2;
					characterInitObj._tempy = 1;
				}
					
				if (this.x < characterInitObj._toward.split("?")[0])//Split by the question mark
				{
					this.x += characterInitObj._speed;//x/y is 2:1, so do x by 2.
					this.trigger("NewDirection",//Trigger NewDirection events for each player subitem(like clothes and face) so we don't leave them behind
					{
						x: 1,//x:1 means to go right
						y: characterInitObj._tempy
					});
					characterInitObj._hair.trigger("NewDirection",
					{
						x: 1,
						y: characterInitObj._tempy
					});
					characterInitObj._face.trigger("NewDirection",
					{
						x: 1,
						y: characterInitObj._tempy
					});
					characterInitObj._shirt.trigger("NewDirection",
					{
						x: 1,
						y: characterInitObj._tempy
					});
					characterInitObj._pants.trigger("NewDirection",
					{
						x: 1,
						y: characterInitObj._tempy
					});
					characterInitObj._shoe.trigger("NewDirection",
					{
						x: 1,
						y: characterInitObj._tempy
					});
				}
				else if (this.x > characterInitObj._toward.split("?")[0])
				{
					this.x -= characterInitObj._speed;
					this.trigger("NewDirection",
					{
						x: -1,//x:-1 means go left
						y: characterInitObj._tempy
					});
					characterInitObj._hair.trigger("NewDirection",
					{
						x: -1,
						y: characterInitObj._tempy
					});
					characterInitObj._face.trigger("NewDirection",
					{
						x: -1,
						y: characterInitObj._tempy
					});
					characterInitObj._shirt.trigger("NewDirection",
					{
						x: -1,
						y: characterInitObj._tempy
					});
					characterInitObj._pants.trigger("NewDirection",
					{
						x: -1,
						y: characterInitObj._tempy
					});
					characterInitObj._shoe.trigger("NewDirection",
					{
						x: -1,
						y: characterInitObj._tempy
					});
				}
				else
				{
					/**this.stop();//if there is no towards, stop moving
					if(tempy > 0)
						this.sprite(9, 0, 0, 0);//Set the sprite to idle
					else
						this.sprite(0, 0, 0, 0);**/
				}
				if(characterInitObj._playertile)
				{
					if (characterInitObj._playertile.has('grass')) 
						characterInitObj._playertile.sprite(0, 2, 0, 0);//Set the yellow grass sprite
					else 
						characterInitObj._playertile.sprite(1, 2, 0, 0);//Set yellow dirt sprite
				}
					
				bacon = false;

				if (this.x == characterInitObj._toward.split("?")[0] && this.y == characterInitObj._toward.split("?")[1] - 100) 
				{
					if(this.x != characterInitObj._playertile.x || this.y != characterInitObj._playertile.y - 100)
						characterInitObj._toward = characterInitObj._playertile.x + "?" + characterInitObj._playertile.y;
					else
					{
						characterInitObj._toward2 = characterInitObj._toward;
						characterInitObj._toward = false;//Set toward to false if the conditions say we're there.
						this.stop();
						characterInitObj._pants.stop();
						characterInitObj._shirt.stop();
						characterInitObj._shoe.stop();
						
						if(characterInitObj._tempy > 0)
						{
							this.sprite(9,0,0,0);
							if(characterInitObj._shirt.has('worn'))
								characterInitObj._shirt.sprite(9,0,0,0);
							if(characterInitObj._pants.has('worn'))
								characterInitObj._pants.sprite(9,0,0,0);
							if(characterInitObj._shoe.has('worn'))
								characterInitObj._shoe.sprite(9,0,0,0);
						}
						else
						{
							this.sprite(0,0,0,0);
							if(characterInitObj._pants.has('worn'))
								characterInitObj._pants.sprite(0,0,0,0);
							if(characterInitObj._shirt.has('worn'))
								characterInitObj._shirt.sprite(0,0,0,0);
							if(characterInitObj._shoe.has('worn'))
								characterInitObj._shoe.sprite(0,0,0,0);
						}
							
						bacon = true;
						characterInitObj._speed = 2;
					}
				}
			}
			else//reset tiles if we're done moving toward them
			{
				if (characterInitObj._playertile.has('grass')) 
					characterInitObj._playertile.sprite(0, 0, 0, 0);
				else 
					characterInitObj._playertile.sprite(1, 0, 0, 0);
			}
		})
			.bind('KeyDown', function (e)
			{
				if (e.keyCode === Crafty.keys['J'])
				{
					characterInitObj.x = 0;
					characterInitObj.y = 0;
				}
			})
			.bind("NewDirection", function (d)//When direction is changed. If this we need to flip the sprite on the x axis, we do that here.
		{
			if (d.x < 0) 
				this.unflip();
			else 
				this.flip();
				
			if(!this.isPlaying('walk_down') && characterInitObj._tempy < 0)
			{
				this.stop().animate('walk_down', 60, -1);
				if(characterInitObj._shirt.has('worn'))
					characterInitObj._shirt.stop().animate('walk_down', 60, -1);
				if(characterInitObj._pants.has('worn'))
					characterInitObj._pants.stop().animate('walk_down', 60, -1);
				if(characterInitObj._shoe.has('worn'))
					characterInitObj._shoe.stop().animate('walk_down', 60, -1);
			}
			else if(!this.isPlaying('walk_up') && characterInitObj._tempy > 0)
			{
				this.stop().animate('walk_up', 60, -1);
				if(characterInitObj._shirt.has('worn'))
					characterInitObj._shirt.stop().animate('walk_up', 60, -1);
				if(characterInitObj._pants.has('worn'))
					characterInitObj._pants.stop().animate('walk_up', 60, -1);
				if(characterInitObj._shoe.has('worn'))
					characterInitObj._shoe.stop().animate('walk_up', 60, -1);
			}
		});
		
		characterInitObj._hair = Crafty.e("2D, DOM, hair, Keyboard, Controls, SpriteAnimation, persist")//Sets up hair
			.attr(
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 101
		})
			.bind("EnterFrame", function ()
		{
			this.x = characterInitObj.x;
			this.y = characterInitObj.y;
		})
			.bind("NewDirection", function (d)
		{
			if (d.x < 0) this.unflip();
			if (d.x > 0) this.flip();
		});

		characterInitObj._face = Crafty.e("2D, DOM, face, Keyboard, Controls, SpriteAnimation, persist")
			.attr(
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 100
		})
			.bind("EnterFrame", function ()
		{
			this.x = characterInitObj.x;
			this.y = characterInitObj.y;
		})
			.bind("NewDirection", function (d)
		{
			if (d.x < 0) this.unflip();
			if (d.x > 0) this.flip();
		});

		characterInitObj._shirt = Crafty.e("2D, DOM, shirt, Keyboard, Controls, SpriteAnimation, persist")
			.attr(
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 100
		})
			.bind("EnterFrame", function ()
		{
			this.x = characterInitObj.x;
			this.y = characterInitObj.y;
		})
			.bind("NewDirection", function (d)
		{
			if (d.x < 0) this.unflip();
			if (d.x > 0) this.flip();
		});
		
		characterInitObj._pants = Crafty.e("2D, DOM, pants, Keyboard, Controls, SpriteAnimation, persist")
			.attr(
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 100
		})
			.bind("EnterFrame", function ()
		{
			this.x = characterInitObj.x;
			this.y = characterInitObj.y;
		})
			.bind("NewDirection", function (d)
		{
			if (d.x < 0) this.unflip();
			if (d.x > 0) this.flip();
		});
		
		characterInitObj._shoe = Crafty.e("2D, DOM, shoe, Keyboard, Controls, SpriteAnimation, persist")
			.attr(
		{
			w: 135,
			h: 135,
			x: 0,
			y: 0,
			z: 100
		})
			.bind("EnterFrame", function ()
		{
			this.x = characterInitObj.x;
			this.y = characterInitObj.y;
		})
			.bind("NewDirection", function (d)
		{
			if (d.x < 0) this.unflip();
			if (d.x > 0) this.flip();
		});
		
	//return characterInitObj;
}