//Creating variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running,monkey_Stop;
var Banana,BananaImage,bananaGroup, obstacle, obstacleImage,banana;
var FoodGroup, obstacleGroup,Obstacle,backGround,backGroundI;
var score;
var Ground;
var survivalTime=0;

//Loading animation for monkey and images for banana and obstacle groups.
function preload(){
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 // monkey_Stop=loadAnimation("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backGroundI=loadImage("jungle[1].jpg")
}

   
//Moving the ground,creating Sprite for monkey,creating Group for FoodGroup and obstacleGroup
function setup() {
  createCanvas(600,350);  
  
  backGround = createSprite(300,275,20,20)
  backGround.addImage(backGroundI);
  backGround.velocityX=-4
  backGround.scale=1
  monkey =createSprite(200,200,20,20)
  monkey.addAnimation("running",monkey_running)  
  //monkey.addAnimation("Stop",monkey_Stop)
  monkey.scale=0.1

  Ground =createSprite(300,340,900,10)
  Ground.x=Ground.width/2  
  Ground.visible=false;
    
  FoodGroup= createGroup();
  obstacleGroup= createGroup();
  
  score=0
}

//Display score, surviving time, making monkey jump, giving gravity.
function draw() {
  
if (gameState===PLAY){  
//monkey.addAnimation("running",monkey_running) 
  monkey.velocityY = monkey.velocityY +0.8
  backGround.velocityX=-4
  Obstacles();  
  Banana();  
  
 
if (backGround.x<300){
  backGround.x=backGround.width/2   
}  
//if the monkey is touching the banana it should increase the score,destroy the banana
if (FoodGroup.isTouching(monkey)){
  Score();
  score=score+2
  FoodGroup.destroyEach();
}     

if (keyDown("space")){
  monkey.velocityY=-16               
 } 

} 
 
if (obstacleGroup.isTouching(monkey)){
 gameState=END; 
}
  
if (gameState===END){  
  monkey.scale=0.1
  obstacleGroup.destroyEach();
  score=0
  survivalTime=0
  backGround.velocityX=0;
  FoodGroup.velocityX=0;
  obstacleGroup.velocityX=0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  //monkey.changeAnimation("Stop",monkey_Stop)
  
} 



  
if (keyDown("R")){
  gameState=PLAY;
  
} 
    
  monkey.collide(Ground) 
  drawSprites();
  
  stroke("White");
  textSize(20); 
  fill("white");
  text("Score:"+score,300,50);
 
  stroke("black");
  textSize(20); 
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,100,50);

}

//Defining functions for Banana and Obstacles
function Banana(){
  
  if(World.frameCount%80===0){
  banana=createSprite(570,100,20,20) 
  banana.y=Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale=0.1 
  banana.velocityX=-5;
  banana.lifetime=100;
  FoodGroup.add(banana)  
  }  
  }

function Obstacles(){
  
  if (frameCount % 300 === 0){
   Obstacle = createSprite(570,315,10,40);
   Obstacle.addImage(obstacleImage);
   Obstacle.velocityX = -6;
   Obstacle.scale=0.2
   Obstacle.lifetime=100
   var rand = Math.round(random(100,120));
   
   obstacleGroup.add(Obstacle);
  }
}

//function reset(){
  //monkey.addAnimation("running",monkey_running) 
  
//}

//if the score is 10,20,30 or 40 the size of the monkey is increase
function Score(){
 
switch(score){  
  case 10: monkey.scale=0.12  
  break;
  case 20: monkey.scale=0.13  
  break;
  case 30: monkey.scale=0.14   
  break;
  case 40: monkey.scale=0.15  
  break;
  
 }  
}