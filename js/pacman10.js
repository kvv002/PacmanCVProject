	"use strict";
		
/* monsters and pacman moving perfectly*/		
		var W=600, H=600, w=30,h=30,d=30,topA=w, leftA=w;
		//timer for pacman and monsters are separate.
		   var setTimer=0,INTERVAL=100,setTimerM=0,INTERVALM=80,pacmanStart,monStart,monstersOut=false,door=330;
			var ret=false,life=3,format=[];		  
		 
		   var up=38 ,down=40, right=39,left=37;
			var go=10,i=0,x=0,firsttime=0,score=1;
			var totalfood=198;
			
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
	
	var monsters=[];
	monsters[0]=new actor("mo0","monster",undefined,undefined,210,270,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
	monsters[1]=new actor("mo1","monster",undefined,undefined,210,240,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
	monsters[2]=new actor("mo2","monster",undefined,undefined,180,270,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
	monsters[3]=new actor("mo3","monster",undefined,undefined,180,240,undefined,undefined,undefined,undefined,undefined,undefined,false,false);						
	
/*first function called my onload()*/
	function createBoard(){
		
		document.addEventListener("keydown",function() { keyPress(event,pacman); },true);
		document.getElementById('scores').innerHTML= score;
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
											board.style.backgroundImage= "url(./img/food.png)";
										
										}
											
										 document.getElementById('container').appendChild(board);  
										 
									}
			
			
						}
						
					var	 pacman=new actor("pacman","pacman",undefined,undefined,30,30,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
					moveMon(pacman,monsters[0],monsters[1],monsters[2],monsters[3]);

					
						
		
		}

/* Automatic movement of pacman*/
	function keyPress(event,pacman){
		pacman.direction = event.keyCode;
		if (setTimer == 0)
		{
			 pacmanStart = setInterval(function() { PacmanMovement(pacman); },INTERVAL);
			setTimer = 1;
		}
		else 
			checkForObstacle(pacman);
	}
/*Automatic movement of monster*/
	function moveMon(pacman,monster0,monster1,monster2,monster3){	
		if (setTimerM== 0)
		{
			monStart = setInterval(function() { MonMovement(pacman,monster0); MonMovement(pacman,monster1); MonMovement(pacman,monster2); MonMovement(pacman,monster3);  },INTERVALM);
			setTimerM = 1;
		}
		else{
			MonMovement(monster0);
			}
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
		
	function MonMovement(pacman,monster){
	var iteration=0,ret=false;	
		
		if(firsttime==0){
			format=randomArray();
			monsters[0].direction=format[0];
			monsters[1].direction=format[0];
			//monsters[2].direction=format[0];
			//monsters[3].direction=format[0];			
			firsttime=1;
		}
		else{
			
			 findOpposite(monster);
			 format.length = 0;
			 format[3]=monster.oppositeDirection
			 format=randomArray();
			 monster.direction=format[0];
			 
			 while(checkForObstacle(monster)==true){
					iteration++;
					monster.direction =format[iteration];
			}
			
			move(monster);
		}	
		ret=Intersect(pacman,monster);
		if(ret==true){
			pacman.topA=30;
			pacman.leftA=30;
			life--;
			if(life==0){
				alert("GAME OVER!!!! SCORE:"+score);
				clearInterval(pacmanStart);
				clearInterval(monStart);
				location.reload();
			}
			else{
				alert(life+" lives left");
	
			}
		}
		
		
	
	}
	function PacmanMovement(pacman){
		var obstaclePresent,ret=false,i=0;
		obstaclePresent=checkForObstacle(pacman);
		if(obstaclePresent==false){
			//check if a movement of pacman intersects with any of the monsters
		   while(i<4 && ret==false){
				ret=Intersect(pacman,monsters[i]);
				i++;
			}
			// if it intersects, decrement the life of pacman or restart the game
			if(ret==true){
				pacman.topA=30;
				pacman.leftA=30;
				life--;
				if(life==0){
					alert("GAME OVER!!!! SCORE:"+score);
					clearInterval(pacmanStart);
					clearInterval(monStart);
					location.reload();
				}
				else{
					alert(life+" lives left");
					//clearInterval(pacmanStart);

				}
			}
			else{
				move(pacman);
				if(document.getElementById('R'+pacman.row+'C'+pacman.column).style.visibility!="hidden"){
					document.getElementById('R'+pacman.row+'C'+pacman.column).style.visibility = "hidden";
					var audio = new Audio('./img/pacman_chomp.wav');
					audio.play();
					score++;
					document.getElementById('scores').innerHTML= score;
				}
			}	
			
		}
		
		
		
	}
	function checkForObstacle(actor){
					var ret=false,i=0;
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
							return false;
							
						}
						else{
								actor.nextRow=actor.row;
								actor.nextColumn=actor.column;								
								
								return true;
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
	
		}
		
		
		function Intersect(actor,monsters){
		
		 var bottomA=actor.topA+d-1;
		   var rightA=actor.leftA+d-1;
		
			
		   var bottomB=monsters.topA+d-1;
		   var rightB=monsters.leftA+d-1;
				
			
				if(actor.leftA==monsters.leftA && actor.topA==monsters.topA &&rightB==rightA &&bottomA==bottomB){
					return true;
					
				}
				else if(rightA>monsters.leftA && actor.leftA<monsters.leftA && actor.topA==monsters.topA && bottomA==bottomB){
					return true;
				
				}
				else if(actor.leftA<rightB && actor.leftA>monsters.leftA && actor.topA==monsters.topA && bottomA==bottomB){
					
					return true;
					
				}
				else if(bottomA>monsters.topA && bottomA<bottomB &&actor.leftA==monsters.leftA && rightB==rightA){
					return true;
					
				}
				else if(actor.topA<bottomB && bottomA>bottomB && actor.leftA==monsters.leftA && rightB==rightA ){
					return true;
					
				}
				else
					return false;
			
		   
		   
		}
