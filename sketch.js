var score =0;
var gun,bluebubble,redbubble, bullet;

var gunImg,bubbleImg, bulletImg, blastImg;
var planet1, planet1Img;

var redBubbleGroup, redBubbleGroup, bulletGroup;
var astronaut, astronautImg;


var life =3;
var score=0;
var gameState=1

function preload(){
  //Pistola
  gunImg = loadImage("gun.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  //aliens
  blueBubbleImg = loadImage("Alien_idle1.png")
  redBubbleImg = loadImage("Alien_idle2.png")
  //Planetas
  planet1Img= loadImage("planet1.png")
  //Backgrounds
  backImg=loadImage("background.jpeg");
  backImg2= loadImage("back3.jpeg")

  astronautImg = loadImage("Astronaut_Idle1.png", "Astronaut_Idle2.png")

}
function setup() {
  createCanvas(windowWidth, windowHeight);

  planet1= createSprite(1000, 300, 100,30);
  planet1.addImage(planet1Img)
  planet1.velocityX=-1
  planet1.scale=0.3

  astronaut= createSprite(200,300,100,100);
  astronaut.addImage(astronautImg)
  astronaut.scale=3.2
 

  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=2

  gun.x = astronaut.x+30;
  gun.y = astronaut.y;

  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backImg);

  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-400,20)

  if(gameState===1){

   
    if(keyDown("right_arrow")){
      gun.x=gun.x+2
      astronaut.x = astronaut.x+2; 
 
    
    }
    if(keyDown("left_arrow")){
      gun.x=gun.x-2
      astronaut.x = astronaut.x-2;
    
    }
    if(keyDown("up_arrow")){
      gun.y=gun.y-2
      astronaut.y = astronaut.y-2;
    
    }
    if(keyDown("down_arrow")){
      gun.y=gun.y+2
      astronaut.y = astronaut.y+2;
    
    }
    if(keyDown("space")){
      shootBullet();
    }

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    
  

    if(score> 5){
      background(backImg2)
    }

  

    if (blueBubbleGroup.collide(planet1)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(planet1)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 4;
  bluebubble.velocityX = -2;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 4;
  redbubble.velocityX = -2;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, 300, 50,20)
  bullet.y= gun.y
  bullet.x = gun.x
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg)
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Fin del juego`,
        text: "¡Ups perdiste el juego!",
        text: "Tu puntuación es " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Gracias por jugar"
      });
    }
  
}
