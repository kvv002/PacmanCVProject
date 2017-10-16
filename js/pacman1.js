	"use strict";
		
		   var W=600;
		   var H=600;
		   var w=30;
		   var h=30;
		  
			var ret=false;
			var  d=30;		  
		   var topA=w;
		   var leftA=w;
		   var topB=200;
		   var leftB=300;
		   
			var divTop=0,divLeft=0,xyz,go=10,fitRow=false,fitColumn=false,overlapRow=false,overlapColumn=false;
			var row= Math.floor(topA/d);
			var column=Math.floor(leftA/d);
			var nextRow=row,nextColumn=column, nextColumn2=column,nextRow2=row;
		  var r,c,board;
		  
		  var pixels=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], [1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0]];
						
						
		function main(event){
						
						//var left_obstacle=leftA%d,top_obstacle=topA%d,right_obstacle=(leftA+w)%d,bottom_obstacle=(topA+h)%d;
						fitRow=false,fitColumn=false,overlapRow=false,overlapColumn=false;
						row= Math.floor(topA/d);
						column=Math.floor(leftA/d);
					
						
						if(leftA%d==0)
							fitColumn=true;
						else
							overlapColumn=true;
						
						if(topA%d==0)
							fitRow=true;
						else
							overlapRow=true;
						
						
					switch (event.keyCode) {
				//moving left
					case 37:
					if(leftA-go>=0){
						//if(fitRow==true && fitColumn==true)
							
						
						
						//if obj is not fitting row wise it will affect 2 rows.
						 if(fitRow==false){
							//nextColumn=column-1;
							nextRow=row;
							nextRow2=nextRow+1;
						}
						else
							nextColumn=column-1;
					}
						break;
						//top
					case 38:
					if(topA-go>=0){
					//	if(fitRow==true && fitColumn==true)
						
						if(fitColumn==false){
							//nextRow=row-1;
							nextColumn=column;
							nextColumn2=nextColumn+1;
						}
						
						else if(fitRow==false)
								nextRow=row;
						else
								nextRow=row-1;
						
						}
					
						break;
						//right
					case 39:
						if(leftA+w+go<=W){
							//if(fitRow==true && fitColumn==true)
								nextColumn=column+1;
						
						if(fitRow==false){
								//nextColumn=column+1;
								nextRow=row;
								nextRow2=nextRow+1;
							
						}
						}
						break;
						//down
					case 40:
					 if(topA+h+go<=H){
						// if(fitRow==true && fitColumn==true)
									nextRow=row+1;
						 if(fitColumn==false){
								//nextRow=row+1;
								nextColumn=column;
								nextColumn2=nextColumn+1;
						 }
						
						}
						
						
						break;
				}
					//window.alert("current row- "+row+" current column- "+column+" || next row- "+nextRow+" next column- "+nextColumn);
					//window.alert(pixels[nextRow][nextColumn]);
					
					if(pixels[nextRow][nextColumn]==0 && overlapColumn==false && overlapRow==false){
						
						move(event);
					}
					else if(pixels[nextRow][nextColumn]==0 && overlapRow==true && pixels[nextRow2][nextColumn]==0){
						move(event);
					}
					else if(pixels[nextRow][nextColumn]==0 && overlapColumn==true && pixels[nextRow][nextColumn2]==0){
						move(event);
					}
					else
					{
						window.alert(pixels[nextRow][nextColumn]);
						nextRow=row;
						nextColumn=column;
						
						
					}
					
					//window.alert("current row- "+row+" current column- "+column+" || next row- "+nextRow+" next column- "+nextColumn);
					//window.alert("topA "+topA+" leftA "+leftA);
					

							
				}
						
						
						
		   
		function move(event) {

					
				switch (event.keyCode) {
				//moving left
					case 37:
					if(leftA-go>=0){
						leftA=leftA-go;
						}
						break;
						//top
					case 38:
					if(topA-go>=0){
						topA=topA-go
				
						}
					
						break;
						//right
					case 39:
						if(leftA+w+go<=W){
						leftA=leftA+go;
						}
						break;
						//down
					case 40:
					 if(topA+h+go<=H){
						topA=topA+go;

						}
						
						
						break;
				}
				
				
				
						
						document.getElementById("ball").style.left = leftA+ "px";
						document.getElementById("ball").style.top = topA+ "px";
						//ret=Intersect(topA,leftA,topB,leftB,d);
						
						//if(ret==true)
						
		}
		
		function creatObstacles(){
			//document.write("hey there");

						for( r = 0; r < pixels.length; r++) {
							
									for( c = 0; c < pixels.length; c++) {
										 board = document.createElement('div');
										 board.className="blah";
										 board.id="R"+r+"C"+c;
										 board.style.width=d+"px";
										 board.style.height=d+"px";
										
										 board.style.border="1px solid black";
										board.style.boxSizing="border-box"
										 board.style.float="left";
										 if(pixels[r][c]==1){
													
													board.style.backgroundColor="#ff6666";
												}
										 document.getElementById('container').appendChild(board);
										  
										 
									}
			
			
						}
						
	
			
		
		}
	function Intersect(topA,leftA,d){

		
			
		/* var bottomA=topA+d-1;
		   var rightA=leftA+d-1;
		   
		   var bottomB=topB+d-1;
		   var rightB=leftB+d-1;
				
			
				if(leftA==leftB && topA==topB &&rightB==rightA &&bottomA==bottomB){
					return true;
					
				}
				else if(rightA>leftB && leftA<leftB && topA==topB && bottomA==bottomB){
					return true;
				}
				else if(leftA<rightB && leftA>leftB && topA==topB && bottomA==bottomB){
					
					return true;
				}
				else if(bottomA>topB && bottomA<bottomB &&leftA==leftB && rightB==rightA)
					return true;
				
				else if(topA<bottomB && bottomA>bottomB && leftA==leftB && rightB==rightA )
					return true;
				else
					return false;*/
			
			
		}
		
