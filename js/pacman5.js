	"use strict";
		
		   var W=600, H=600, w=30,h=30,d=30,topA=w, leftA=w;
		   var setTimer=0,INTERVAL=160;
		    var setTimerM=0,INTERVALM=160;
			var ret=false;		  
		 
		   var up=38 ,down=40, right=39,left=37,directionM=null;
			var go=10;
			var one=false;
		
			
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
	
						var	 monster0=new actor("mo0",undefined,180,240,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
	

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
						
					var	 pacman=new actor("pacman",undefined,30,30,undefined,undefined,undefined,undefined,undefined,undefined,false,false);
					moveMon(monster0);

						//createMonsters();
						/*monster0=new Monster(180,240);
						monster1=new Monster(180,270);
						monster2=new Monster(210,240);
						monster3=new Monster(210,270);*/
					//var monster =new Array(4);
					

					
					//moveMon(monster0);
					
						
		
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
	
	function moveMon(monster0){
					var random=Math.random();
					random=random*100;
					if(random>=0 && random<=24)
						directionM=up;
					else if(random>=25 && random<=49)
						directionM=left;
					else if(random>=50 && random<=74)
						directionM=right;
					else if(random>=75 && random<=100)
						directionM=down;
		monster0.direction = directionM;
		if (setTimerM== 0)
		{
			var monStart = setInterval(function() { checkForObstacle(monster0); },INTERVALM);
			setTimerM = 1;
		}
		else 
			checkForObstacle(monster0);
	}


	function actor(id,direction,topA,leftA,row,column,nextRow,nextColumn,nextRow2,nextColumn2,overlapRow,overlapColumn){
					this.id=id;
					this.direction=direction;
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
							move(actor);
							if(actor.id=="pacman")
							document.getElementById('R'+actor.row+'C'+actor.column).style.visibility = "hidden";
								
						}
						else{
								actor.nextRow=actor.row;
								actor.nextColumn=actor.column;								
								
						}
						
						var random=Math.random();
								random=random*100;
								if(random>=0 && random<=24)
								directionM=up;
								else if(random>=25 && random<=49)
								directionM=left;
								else if(random>=50 && random<=74)
								directionM=right;
								else if(random>=75 && random<=100)
								directionM=down;
								monster0.direction = directionM;
						
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
									if(actor.overlapColumn==true)
										actor.nextColumn=actor.column;									
									break;
							
						case up:	
									if(actor.overlapRow==true)
										actor.nextRow=actor.row;
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
