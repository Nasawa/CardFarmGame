inventorystring = "<div class='container'>\
<br/>\
<center>\
<div class='menu'>\
<br/>\
&nbsp;\
<div class='charaside'>\
<div class='redundant'><img src='img/gaia.png' id='character' class='pushed charasideimg'/></div><br/><br/><br/><br/><br/><br/><br/>\
<button class='pushed' id='swapbutton' onmousedown='swap();'>View Tree</button>\
</div>\
<div class='top'>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<br/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<br/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<img src='' onmousedown='itemclick(this.id)' title='Empty slot' id='' class='pushed empty inventory'/>\
<br/>\
<br/>\
<br/>\
<br/>\
<br/>\
<br/>\
<br/>\
<br/>\
</div>\
<div class='bottom'>\
<textarea id='description'>" + desc + "</textarea>\
 <br/>\
 <br/>\
 <br/>\
 <br/>\
 <br/>\
 <br/>\
 <br/>\
 <div id='invenexit' onclick='toggleinventory()'>X</div>\
 <br/>\
 </div>\
 </div>\
 </center>\
 <br/>\
</div>";

appareltreestring = "<table class='appareltreetable'>\
<tr>\
<td>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring0'/><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring1'/><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring2'/><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring3'/><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring4'/><br/>\
</td>\
<td>\
<center>\
<img class='treeslot hairslot' onmousedown='itemclick(this.id)' id='hairslot'/><img class='treeslot hatslot' onmousedown='itemclick(this.id)' id='hatslot'/><br/>\
<img class='treeslot earringslot onmousedown='itemclick(this.id)' id='earringslot'' /><img class='treeslot faceslot' onmousedown='itemclick(this.id)' id='faceslot'/><img class='treeslot faceapparelslot' onmousedown='itemclick(this.id)' id='faceapparelslot'/><br/>\
<img class='treeslot facialhairslot' onmousedown='itemclick(this.id)' id='facialhairslot'/><img class='treeslot necklaceslot' onmousedown='itemclick(this.id)' id='necklaceslot'/><br/>\
<img class='treeslot back1slot' onmousedown='itemclick(this.id)' id='back1slot'/><img class='treeslot shirtslot' onmousedown='itemclick(this.id)' id='shirtslot'/><img class='treeslot back2slot' onmousedown='itemclick(this.id)' id='back2slot'/><br/>\
<img class='treeslot gloveslot' onmousedown='itemclick(this.id)' id='gloveslot'/><img class='treeslot waistslot' onmousedown='itemclick(this.id)' id='waistslot'/><br/>\
<img class='treeslot pantsslot' onmousedown='itemclick(this.id)' id='pantsslot'/><br/>\
<img class='treeslot shoeslot' onmousedown='itemclick(this.id)' id='shoeslot'/><br/>\
</center>\
</td>\
<td>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring5' /><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring6' /><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring7' /><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring8' /><br/>\
<img class='treeslot ring' onmousedown='itemclick(this.id)' id='ring9' /><br/>\
</td>\
</tr>\
</table>\
<button class='pushed' id='swapbutton' onmousedown='swap();'>View Character</button>";

charcreatescreen = "<div class='cccontainer'>\
	<br/>\
	&nbsp;\
	<div class='leftside'>\
		<div class='charasideleft pushed'>\
			<center>\
			<img src='img/jillcolor.png' id='character' class='pushed2 charasideimg female'/>\
			</center>\
		</div>\
		<div class='categories pushed'>\
			<center>\
			<div class='category sunny'>\
				 <div class='categorytext'>\
					Climate\
				</div>\
			</div>\
			<div class='category facey'>\
				 <div class='categorytext'>\
					Face\
				</div>\
			</div>\
			<div class='category hairy'>\
				 <div class='categorytext'>\
					Hair\
				</div>\
			</div>\
			<div class='category shirty' >\
				<div class='categorytext'>\
					Apparel\
				</div>\
			</div>\
			</center>\
		</div>\
	</div>\
	<center>\
	<div class='top1 pushed'>\
		<div class='topleft'>\
			<input type='text' class='nameinput' placeholder='Enter Character Name'></input>\
			<br/><br/>\
			<input type='text' class='farminput' placeholder='Enter Farm Name'></input>\
		</div>\
		<img class='topright gender female pushed2' id='genderselect' onmousedown='itemclick(this.id)' src='img/femalesign.png'>\
	</div>\
	<div class='bottom1 pushed'>\
		<div class='category'>\
			<div class='categorytext'>\
				Desert\
			</div>\
		</div>\
		<div class='category'>\
			<div class='categorytext'>\
				Island\
			</div>\
		</div>\
		<div class='category'>\
			<div class='categorytext'>\
				Tropical\
			</div>\
		</div>\
	</div>\
	</center>\
</div>";