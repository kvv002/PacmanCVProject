	"use strict";
		
/* on monster and pacman move....working perfectly*/		
		var W=600, H=600, w=30,h=30,d=30,topA=w, leftA=w;
		   var setTimer=0,INTERVAL=160;
		    var setTimerM=0,INTERVALM=80;
			var ret=false;		  
		 
		   var up=38 ,down=40, right=39,left=37,directionM=null;
			var go=10;
			var one=false, i=0,x=0;
		var format=[];
		
		
		var newDirection=null,oppositeDirection=null,iteration=0;
		
			
		  var cellMatrix=[[1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
						[1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
						[1,0,1,0,0,0,0,1,0,1,1,0,0,0,0,0,0,1,0,1],
						[1,0,1,0,1,1,0,0,0,0,0,0,1,1,0,1,0,1,0,1],
						[1,0,0,0,1,0,0,1,1,1,1,0,1,1,0,0,0,0,0,1],
						[1,0,1,0,1,1,0,1,2,3,1,0,1,1,1,1,0,1,0,1],
						[1,0,1,0,1,1,0,1,4,5,0,0,0,1,1,1,0,1,0,1],
						[1,0,1,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,0,1],
						[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0],

						[1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1],
						[1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
						[1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
						[1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
						[1,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1],
						[1,0,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,1],
						[1,0,1,0,1,1,0,0,0,0,0,0,1,0,1,1,0,1,0,1],
						[1,0,1,1,1,1,0,1,0,1,1,0,0,0,1,1,1,1,0,1],
						[1,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1],
						[1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1]];
	
						var monsters=[];
						monsters[0]=new actor("mo0","monster",undefined,undefined,30,60,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
						monsters[1]=new actor("mo1","monster",undefined,undefined,180,270,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
						monsters[2]=new actor("mo2","monster",undefined,undefined,210,240,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
						monsters[3]=new actor("mo3","monster",undefined,undefined,210,270,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
	

	function createBoard(){
		document.addEventListener("keydown",function() { keyPress(event,pacman); },true);
		/*if(one==false){
			document.addEventListener("keydown",function() { moveMon(monster0); },true);
			one=true;
		}*/
		
		
						for( var r = 0; r < cellMatrix.length; r++) {
							
									for(var  c = 0; c < cellMatrix.length; c++) {
										 var board = document.createElement('div');
										 board.className="blah";
										 board.id="R"+r+"C"+c;
										 board.style.width=d+"px";
										 board.style.height=d+"px";
										
										board.style.border="1px solid black";
										 board.style.boxSizing="border-box"
										 board.style.float="left";
										
										 if(cellMatrix[r][c]==1){
													
													//board.style.backgroundColor="#ff6666";
													board.style.backgroundImage= "url(./img/bricks.jpg)";
												}
										else{
											board.style.backgroundImage= "url(./img/dot.png)";
										
										}
											
										 document.getElementById('container').appendChild(board);  
										 
									}
			
			
						}
						
					var	 pacman=new actor("pacman","pacman",undefined,undefined,30,30,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
					moveMon(monsters[0]);
					/*moveMon(monsters[1]);
					moveMon(monsters[2]);
					moveMon(monsters[3]);*/

					
						
		
		}

/*Set Interval :- Automatic movement of pacman*/
	function keyPress(event,pacman){
		pacman.direction = event.keyCode;
		if (setTimer == 0)
		{
			var pacmanStart = setInterval(function() { checkForObstacle(pacman); },INTERVAL);
			setTimer = 1;
		}
		else 
			checkForObstacle(pacman);
	}
	
	function moveMon(monster){	
		format=[];
		format=randomArray();
	
		monsters[0].direction=format[0];
		/*monster[1].direction=format[0];
		monster[2].direction=format[0];
		monster[3].direction=format[0];
		
		
		
		monster[1].direction=fromat[0];*/
		if (setTimerM== 0)
		{
			var monStart = setInterval(function() { checkForObstacle(monsters[0]); },INTERVALM);
			setTimerM = 1;
		}
		else 
			checkForObstacle(monster);
	}
	
	
	function randomArray(){
		var i=0;
		var max=4;
		if(format[3]!=undefined)
			max=3;
		while(i<max){
			var random=40-(Math.floor(Math.random() * 4)); 
			var ret=format.indexOf(random);
			if(ret==-1){
				format[i]=random;
				i++;
			}
		}
		return format;
		
		
	}
	function findOpposite(actor){
		
		switch (actor.direction) {
				
					case left: actor.oppositeDirection=right;
								
								break;
					
					case up:	actor.oppositeDirection=down;
								break;
						
					case right: actor.oppositeDirection=left;
								break;
						
					case down: actor.oppositeDirection=up;
								break;
			}
		
	}
	

	function actor(id,type,direction,oppositeDirection,topA,leftA,row,column,nextRow,nextColumn,nextRow2,nextColumn2,overlapRow,overlapColumn){
					this.id=id;
					this.type=type;
					this.direction=direction;
					this.oppositeDirection=oppositeDirection;
					this.topA=topA;
					this.leftA=leftA;
					this.row=row;
					this.column=column;
					this.nextRow=nextRow;
					this.nextColumn=nextColumn;
					this.nextRow2=nextRow2;
					this.nextColumn2=nextColumn2;
					this.overlapRow=overlapRow;
					this.overlapColumn=overlapColumn;
							
							
	}
						
	function checkForObstacle(actor){
					
					actor.overlapRow=false,actor.overlapColumn=false;
					
						actor.row=Math.floor(actor.topA/d);
						actor.column=Math.floor(actor.leftA/d);
								actor.nextRow=actor.row;
								actor.nextColumn=actor.column;
						
						if(actor.leftA%d!=0)
							actor.overlapColumn=true;
						
						if(actor.topA%d!=0)
							actor.overlapRow=true;
						
						
						findnext(actor);

						if(actor.overlapColumn==true || actor.overlapRow==true){
							findnext2(actor);
						}
						else{
							
						   actor.nextRow2=actor.nextRow;
						   actor.nextColumn2=actor.nextColumn;
						}
						
						var checkmove=canMove(actor);	

						if(checkmove==true){
							if(actor.type=="monster"){
								findOpposite(actor);
								iteration=0;
								format.length = 0;
								format[3]=actor.oppositeDirection;
							}	
							move(actor);
							if(actor.type=="monster"){
								format=randomArray();
								actor.direction=format[0];
							}
							if(actor.id=="pacman")
							document.getElementById('R'+actor.row+'C'+actor.column).style.visibility = "hidden";
								
						}
						else{
								if(actor.type=="monster"){
									iteration++;
									actor.direction =format[iteration];
								}
								actor.nextRow=actor.row;
								actor.nextColumn=actor.column;								
								
						}



						
	}
	
						
		function findnext(actor){
		
			switch (actor.direction) {
				
					case left:  actor.nextColumn=actor.column-1;
					
								if(actor.nextColumn<0)
									actor.nextColumn=19;
								
								break;
					
					case up:	actor.nextRow=actor.row-1;
					
								if(actor.nextRow<0)
								   actor.nextRow=19;
								break;
						
					case right: actor.nextColumn=actor.column+1;
					
								if(actor.nextColumn>19)
							     actor.nextColumn=0;
								
								break;
						
					case down: actor.nextRow=actor.row+1;
					
							   if(actor.nextRow>19)
							     actor.nextRow=0;
								break;
			}
						
		}
		
		function findnext2(actor){
			
					switch (actor.direction) {
					
						case left:
									//if obj is not fitting actor.row wise it will affect 2 rows.
									if(actor.overlapRow==true){	
										actor.nextRow=actor.row;
										actor.nextRow2=actor.nextRow+1;
									}
									if(actor.overlapColumn==true){
										actor.nextColumn=actor.column;
										actor.nextColumn2=actor.column;
									}
									break;
							
						case up:	
									if(actor.overlapRow==true){
										actor.nextRow=actor.row;
										actor.nextRow2=actor.row;
										
									}
									if(actor.overlapColumn==true){
								
										actor.nextColumn=actor.column;
										actor.nextColumn2=actor.nextColumn+1;
									}
						
									break;
							
						case right:
		
									if(actor.overlapRow==true){
										actor.nextRow=actor.row;
										actor.nextRow2=actor.nextRow+1;
								
									}
							
									break;
							
						case down:
									if(actor.overlapColumn==true){
								
										actor.nextColumn=actor.column;
										actor.nextColumn2=actor.nextColumn+1;
									}
							
									break;
					}
					
		}
		
		function canMove(actor){

			
			     if(cellMatrix[actor.nextRow][actor.nextColumn]==1)	
						return false;
					if(actor.overlapRow==true && cellMatrix[actor.nextRow2][actor.nextColumn]==1)
					   return false;

					if(actor.overlapColumn==true && cellMatrix[actor.nextRow][actor.nextColumn2]==1){
						return false;
					}
				else
					 return true;
			
			
		}			
		   
		function move(actor) {
		
				switch (actor.direction) {
			
					case left: if(actor.leftA-go<0)  //checking if we have reached borders.
									actor.leftA=W;
								
								actor.leftA=actor.leftA-go;
								if(actor.id=="pacman")
								 pacman.style.transform="rotate(180deg) rotateX(180deg)" ;
								break;
					
					case up: if(actor.topA-go<0)
								actor.topA=H;
							
							 actor.topA=actor.topA-go;
							 if(actor.id=="pacman")
							 pacman.style.transform="rotate(-90deg)";
						
							 break;
				
					case right:if(actor.leftA+w+go>W)
								  actor.leftA=0;
							  
							  actor.leftA=actor.leftA+go;
							  if(actor.id=="pacman")
								pacman.style.transform="rotate(0deg)"; 
								break;
		
					case down:if(actor.topA+h+go>H)
							     actor.topA=0;
							  actor.topA=actor.topA+go;
							  if(actor.id=="pacman")
							  pacman.style.transform="rotate(90deg)";

							  break;
				}

						
						document.getElementById(actor.id).style.left = actor.leftA+ "px";
						document.getElementById(actor.id).style.top = actor.topA+ "px";
						
						//document.getElementById("mo0").style.left = actor.leftA+ "px";
						//document.getElementById("mo0").style.top = actor.topA+ "px";

						
		}
