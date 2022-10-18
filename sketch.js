var spaceImg, space;
var panetImg, planet, planetGroup, planet1, planet2, planet3;
var climberImg, climber, climbersGroup;
var nave, naveImg;
var gameOver, gameOverImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
    spaceImg = loadImage("espacio.png");
    climberImg = loadImage("climber.png");
    naveImg = loadImage("cohete.png");
    planet1 = loadImage("Planeta 1.png");
    planet2 = loadImage("Planeta2.png");
    planet3 = loadImage("Planeta3.png");
    gameOverImg = loadImage("game-over.png");
    
}

function setup() {
    createCanvas(600,600);
    space = createSprite(600,300);
    space.addImage("space",spaceImg);
    space.velocityY = 1;

    planetGroup = new Group();
    climbersGroup = new Group();
    invisibleBlockGroup = new Group();

    nave = createSprite(200,200,50,50);
    nave.scale = 0.025;
    nave.addImage("cohete", naveImg);


}

function draw() {
    background(255);
    if(space.y > 400 ){
         space.y = 300
       } 
     if (gameState === "play") {
       if(keyDown("left_arrow")){
           nave.x = nave.x - 3;
       }
       if(keyDown("right_arrow")){
           nave.x = nave.x + 3;
       }
       if(keyDown("space")){
          nave.velocityY = -10;
       }
     
     nave.velocityY = nave.velocityY + 0.8;
         spawnPlanets();
        if(climbersGroup.isTouching(nave)){
         nave.velocityY = 0;
       }
       if(invisibleBlockGroup.isTouching(nave) || nave.y > 600){
         nave.destroy();
         gameState = "end"
       }
       if (gameState === "end"){
     gameOver = createSprite (230,250, 20, 29)
     gameOver = addImage(gameOverImg);
     gameOver.sacle = 5
      }
     
     drawSprites();
   }
}
function spawnPlanets() {
if (frameCount % 260 === 0) {
 planet = createSprite(200, 50)
 planet.scale = 0.2
 var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: planet.addImage(planet1);
              break;
      case 2: planet.addImage(planet2);
              break;
      case 3: planet.addImage(planet3);
             break;
      default: break;
     }
        var climber = createSprite(200,15);
        var invisibleBlock = createSprite(200,70);
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;

        climber.addImage(climberImg);
        planet.velocityY = 1;
        climber.velocityY = 1;
        invisibleBlock.velocityY = 1;

        nave.depth = planet.depth;
        nave.depth =1;
        planet.lifetime = 800;
        climber.lifetime = 800;
        invisibleBlock.lifetime = 800;
        planetGroup.add(planet);
        invisibleBlock.debug = true;
        //invisibleBlock.setCollider("circle",0,0,invisibleBlock.width,invisibleBlock.height);
        
        climbersGroup.add(climber);
        climber.visible = false;
        invisibleBlockGroup.add(invisibleBlock);
  
    }

}