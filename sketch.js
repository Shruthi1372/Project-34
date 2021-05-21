//Create variables here
var dog;
var happyDog,database,foodS,foodStock;

function preload()
{
	//load images here
  dogPic = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();
  dog = createSprite(250,300);
  dog.addImage(dogPic);
  dog.scale=0.2;

 foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  //add styles here
  textSize(20);
    fill("black");
    text("food remaining:"+ foodS,150,200);
    textSize(15);
    text(" Note:Press UP_ARROW key to feed the dog!" ,5 , 20 );
    
    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDog);
    }
}

function writeStock(x) {

  if (x<=0) {
    x=0;
  }else {
    x=x+1;
  }

  database.ref('/').update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
  
}



