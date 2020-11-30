var dog, happyDog, database, foodS, foodStock;



function preload()
{

  dogImg = loadImage("images/Dog.png");
  hdogImg = loadImage("images/happydog.png");
}


function setup() {
	createCanvas(500, 500);
  

  dog = createSprite(280, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  database = firebase.database();

  var foodStockPos = database.ref('food');
  foodStockPos.on("value", readStock);

}



//draw function
function draw() {  
 background(46, 139, 87);

  //text
  textSize(20);
  fill("white");
  text("Food left: " + foodS,350,65);
  text("Note: Press the UP_ARROW key to feed Drago milk!",20,20);


  //up_arrow key
  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(hdogImg);
  }


  drawSprites();

}




//function for reading the values from DB
function readStock(data){

  foodS =  data.val();
}


//function to write the values in the DB
 function writeStock(x){

    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }

     database.ref('/').update({
       food:x       
     }) 
}

