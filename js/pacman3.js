	"use strict";
		
		   var W=600;
		   var H=600;
		   var w=30;
		   var h=30;
		  
			var ret=false;
		    var  d=30;		  
		   var topA=w;
		   var leftA=w;
		 var topM,leftM,monster0,monster1,monster2,monster3,rowM,columnM;
		   var up=38 ,down=40, right=39,left=37,direction=null;
			var divTop=0,divLeft=0,xyz,go=10,fitRow=false,fitColumn=false,overlapRow=false,overlapColumn=false;
			var row,column;
			var nextRow=row,nextColumn=column, nextColumn2=column,nextRow2=row;
			var nextRowM,nextColumnM,nextColumn2M,nextRow2M;
			
			var checkmove;
		    var r,c,board,i;
			var monster =new Array(4);
			
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
						
		function main(direction){
						
						fitRow=false,fitColumn=false,overlapRow=false,overlapColumn=false;
						row=Math.floor(topA/d);
						column=Math.floor(leftA/d);
								nextRow=row;
								nextColumn=column;
						
						if(leftA%d==0)
							fitColumn=true;
						else
							overlapColumn=true;
						
						if(topA%d==0)
							fitRow=true;
						else
							overlapRow=true;
						
						
						findnext(direction);

						if(overlapColumn==true || overlapRow==true){
							findnext2(direction);
						}
						else{
							
						    nextRow2=nextRow;
							nextColumn2=nextColumn;
						}
						
						checkmove=canMove();	

						if(checkmove==true){
							move(direction);
							document.getElementById('R'+row+'C'+column).style.visibility = "hidden";	
						}
						else{
								nextRow=row;
								nextColumn=column;
								
						}
						
				}
				
		
	var myVar=setInterval(autoMove,70);	
	
	function autoMove(){
			main(direction);
		}
			
	document.addEventListener('keydown', function(event)
			{
			direction = event.keyCode;
			 
			 
		}); 
		
		
						
		function findnext(direction){
		
			switch (direction) {
				
					case left:  nextColumn=column-1;
					
								if(nextColumn<0)
									nextColumn=19;
								
								break;
					
					case up:	nextRow=row-1;
					
								if(nextRow<0)
								   nextRow=19;
								break;
						
					case right: nextColumn=column+1;
					
								if(nextColumn>19)
							      nextColumn=0;
								
								break;
						
					case down: nextRow=row+1;
					
							   if(nextRow>19)
							     nextRow=0;
								break;
			}
						
		}
		
		function findnext2(direction){
			
					switch (direction) {
					
						case left:
									//if obj is not fitting row wise it will affect 2 rows.
									if(overlapRow==true){	
										nextRow=row;
										nextRow2=nextRow+1;
									}
									if(overlapColumn==true)
										nextColumn=column;									
									break;
							
						case up:	
									if(overlapRow==true)
										nextRow=row;
									if(overlapColumn==true){
								
										nextColumn=column;
										nextColumn2=nextColumn+1;
									}
						
									break;
							
						case right:
		
									if(overlapRow==true){
										nextRow=row;
										nextRow2=nextRow+1;
								
									}
							
									break;
							
						case down:
									if(overlapColumn==true){
								
										nextColumn=column;
										nextColumn2=nextColumn+1;
									}
							
									break;
					}
					
		}
		
		function canMove(){

			
			     if(cellMatrix[nextRow][nextColumn]==1)	
						return false;
					if(overlapRow==true && cellMatrix[nextRow2][nextColumn]==1)
					   return false;

					if(overlapColumn==true && cellMatrix[nextRow][nextColumn2]==1){
						return false;
					}
				else
					 return true;
			
			
		}			
		   
		function move(direction) {
		
				switch (direction) {
			
					case left: if(leftA-go<0)  //checking if we have reached borders.
									leftA=W;
								
								leftA=leftA-go;
								ball.style.transform="rotate(180deg) rotateX(180deg)" 
								break;
					
					case up: if(topA-go<0)
								topA=H;
							
							 topA=topA-go
							 ball.style.transform="rotate(-90deg)"
						
							 break;
				
					case right:if(leftA+w+go>W)
								  leftA=0;
							  
							  leftA=leftA+go;
								ball.style.transform="rotate(0deg)" 
								break;
		
					case down:if(topA+h+go>H)
							     topA=0;
							  topA=topA+go;
							  ball.style.transform="rotate(90deg)"

							  break;
				}

						
						document.getElementById("ball").style.left = leftA+ "px";
						document.getElementById("ball").style.top = topA+ "px";

						
		}

		function creatObstacles(){

						for( r = 0; r < cellMatrix.length; r++) {
							
									for( c = 0; c < cellMatrix.length; c++) {
										 board = document.createElement('div');
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
						//createMonsters();
						monster0=new Monster(180,240);
						monster1=new Monster(180,270);
						monster2=new Monster(210,240);
						monster3=new Monster(210,270);
						
		
		}
		
		
		function Monster(leftM,topM){
					
			/*for(i=0;i<monster.length;i++){
				monster[i]=new Object();

				monster[i].leftM=window.getComputedStyle(document.getElementById('mo'+i)).getPropertyValue("left");
				monster[i].topM =window.getComputedStyle(document.getElementById('mo'+i)).getPropertyValue("top");
				
			}*/
			this.leftM=leftM;
			this.topM=topM;
			
			
			
			
		}
	
