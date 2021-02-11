
var game, gameState;
var BG, level1BG, level1bac,level1bac2;
var BGMusic, JumpSound, DragonRoar;
var Ground1, Ground2, Ground3, Ground4;
var Ground, fakeGround, Hill;
var MonskeyIdle, Monskey,MonskeyWalkR,MonskeyWalkL,MonskeyJump,Monsk;
var MonskeyGroup, edges;
var GoblinWalking, GoblinIdle, Enemy1, Enemy2;
var DragonFlyingL;
var obstacleGroup;



function preload() {
  BGMusic = loadSound("Sounds/MenuMusic.mp3");
  BG = loadImage("Images/MenuPG.jpg");
  level1BG = loadImage("Images/Level 1 Bg.jpg");

  Ground1 = loadImage("Images/Ground 1.png");
  Ground2 = loadImage("Images/Ground 2.png");
  Ground3 = loadImage("Images/Ground 3.png");
  Ground4 = loadImage("images/Ground 4.png");
  
  MonskeyIdle = loadAnimation("Images/Idle 1.png","Images/Idle 2.png","Images/Idle 3.png");
  MonskeyWalkR = loadAnimation("Images/Walking 1.png","Images/Walking 2.png","Images/Walking 3.png","Images/Walking 4.png","Images/Walking 5.png","Images/Walking 6.png","Images/Walking 7.png","Images/Walking 8.png","Images/Walking 9.png","Images/Walking 10.png","Images/Walking 11.png")
  MonskeyWalkL = loadAnimation("Images/Walking 1 L.png","Images/Walking 2 L.png","Images/Walking 3 L.png","Images/Walking 4 L.png","Images/Walking 5 L.png","Images/Walking 6 L.png","Images/Walking 7 L.png","Images/Walking 8 L.png","Images/Walking 9 L.png","Images/Walking 10 L.png","Images/Walking 11 L.png")
  MonskeyJump = loadAnimation("Images/Jump 1.png","Images/Jump 2.png","Images/Jump 3.png","Images/Jump 4.png","Images/Jump 3.png","Images/Jump 2.png","Images/Jump 1.png");
  GoblinWalkingR = loadAnimation("Images 2/Goblin 1.png","Images 2/Goblin 2.png","Images 2/Goblin 3.png","Images 2/Goblin 4.png","Images 2/Goblin 5.png","Images 2/Goblin 6.png","Images 2/Goblin 7.png")
  GoblinWalkingL = loadAnimation("Images 2/Goblin 1L.png","Images 2/Goblin 2L.png","Images 2/Goblin 3L.png","Images 2/Goblin 4L.png","Images 2/Goblin 5L.png","Images 2/Goblin 6L.png","Images 2/Goblin 7L.png");
  DragonFlyingL = loadAnimation("Images 2/Dragon L1.png","Images 2/Dragon L2.png","Images 2/Dragon L3.png");
  Fireball = loadAnimation("Images/Small Fireball.png","Images/Medium Fireball.png","Images/Big Fireball.png")
  

  // Sound effects
  JumpSound = loadSound("Sounds/Jump Sound.mp3");
  DragonRoar = loadSound("Sounds/Dragon Sound.mp3");
}

function setup() {
  createCanvas(1600,400);
 

  game = new Game();
  //game.start();
 // gameState = "start";
  game.start();
  gameState = "start";

  level1bac = createSprite(800,200,20,20);
  level1bac.addImage(level1BG);
  level1BG.resize(1600,800);
 

  ///////////////////////////////////////
  Ground = createSprite(600,370,500,20);
  Ground.addImage("Ground3",Ground2);
  //Ground.debug = true;
  Ground.setCollider("rectangle",0,0,400,50);

  obstacleGroup = createGroup();
  enemyGroup = createGroup();


  
 
  Monskey = createSprite(150,360,40,40);
  Monskey.addAnimation("Idle",MonskeyIdle);
  Monskey.debug = true;
  Monskey.setCollider("rectangle",0,0,40,40);

  fakeGround = createSprite(150,365,40,10);
  fakeGround.visible = false;
  
  edges = createEdgeSprites();  





  
}

function draw() {

  

  // for transition
  if(keyDown("space")) {
   game.level1();
   gameState = "level1"
  
  }

  if(gameState === "level1"){
    BGMusic.stop(); 
    fakeGround.x = Monskey.x;
  
    // for moving right
   if(keyWentDown(RIGHT_ARROW)) {
    Monskey.velocityX = 5;
    Monskey.addAnimation("Walks",MonskeyWalkR);
    Monskey.changeAnimation("Walks");
    Ground.velocityX = -5;
    //console.log("Right arrow key is pressed"); 
  }else if(keyWentUp(RIGHT_ARROW)) {
    Monskey.velocityX = 0;
    Monskey.changeAnimation("Idle");
    Ground.velocityX = 0;
  }

  // For moving left
  if(keyWentDown(LEFT_ARROW)) {
    Monskey.velocityX = -10;
    Monskey.addAnimation("WalksLeft",MonskeyWalkL);
    Monskey.changeAnimation("WalksLeft"); ;
  } else if(keyWentUp(LEFT_ARROW)) {
    Monskey.velocityX = 0;
    Monskey.changeAnimation("Idle");
  }

  
  // For jumping
  if(keyWentDown(UP_ARROW) || keyWentDown(UP_ARROW) && keyWentDown(RIGHT_ARROW)) { 
    Monskey.velocityY = -15;
    Monskey.addAnimation("Jump",MonskeyJump);
    Monskey.changeAnimation("Jump");    
    JumpSound.play();
   } 
  

 

   // Monskey barrier of Y 
   if(Monskey.y < 207) {
     Monskey.velocityY = 0;
   }

   // The gravity of Monskey
   Monskey.velocityY = Monskey.velocityY + 1;

  if(Monskey.collide(fakeGround)) {
    Monskey.velocityY = 0;
  } else if (Monskey.collide(obstacleGroup) && Monskey.y > 320) {
    Monskey.velocityX = 0;
  }
  
  // for resetting ground
  if(Ground.x < 0) {
      Ground.x = Ground.width/2;
    }



  }
   
  Monskey.collide(edges[0]);

  if(Monskey.x >=1400) {
    Monskey.velocityX = -5;
    Ground.velocityX = -10;
   
  } 

 // if(enemyGroup.setVelocityXEach == -5) {
  // // Fireball = createSprite(Enemy2.x,Enemy2.y,20,20); findout how to shoot fireballs. Try to make big collider box of dragon and make a monskey ground.
  ///}



  //setTimeout(,5000);

  spawnEnemy();
  spawnHill();


  
  drawSprites();
  // to display menu page
  if(gameState === "start") {
    background(BG);
 
}

}

function spawnHill() {
  if(Monskey.x % 700 === 0 && Monskey.velocityX === 5) {
  Hill = createSprite(1700,303,300,200);
  AngleHill = createSprite(1702,340,100,100);
  //AngleHill.debug = true;
  AngleHill.visible = false;
  AngleHill.rotation = 45;
  Hill.addImage(Ground4);
  Hill.setCollider("rectangle",-85,15,180,100);
  obstacleGroup.add(Hill);
  obstacleGroup.add(AngleHill);
  //Hill.debug = true;

} if(Monskey.velocityX === 5) {
  obstacleGroup.setVelocityXEach(-5);
} else if(Monskey.velocityX === -5) {
  obstacleGroup.setVelocityXEach(-10);
} else {
  obstacleGroup.setVelocityXEach(0);
}
}

function spawnEnemy() {
    var rand = random(-3,-5);
    var randomHeight = random(200,100);

    Enemy = Math.round(random(1,2));
    switch(Enemy) {
      case 1: 
              if(World.frameCount % 100 === 0) {
              Enemy1 = createSprite(1700,350,40,40);
              Enemy1.addAnimation("WalingL",GoblinWalkingL);  
              Enemy1.velocityX = rand; 
              Enemy1.depth = 3;
              }
        break;
      case 2: 
              if(World.frameCount % 200 === 0) {
              Enemy2 = createSprite(1800,randomHeight,40,40);
              Enemy2.addAnimation("FlyingL",DragonFlyingL);
              DragonRoar.play();
              enemyGroup.add(Enemy2);
              enemyGroup.setVelocityXEach(-5);
              }
        break;
      default: break;


    }

 // }
    
  

}