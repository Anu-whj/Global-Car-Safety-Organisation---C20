//creates the following global variables : car, wall, carstate, crashsound, carImage, carpic.
var car, wall, carstate, racingsound,crashsound, carImage, carpic ;

//loads the following sounds and images.
function preload(){
  soundFormats('mp3', 'ogg');
  racingsound = loadSound('racing-cars-sounds.mp3');
  crashsound = loadSound('car-crash-sound-eefect.mp3');
  carImage = loadImage('CarSimulator.jpg')
}

function setup() {
  //creates the canvas and gives it the size.
  createCanvas(1600,400);
  
  //creates the header of the simulator and gives it a specific image.
  carpic = createSprite(650,60,100,100);
  carpic.addImage(carImage);
  
  //creates the car and assigns it the color.
  car = createSprite(45, 395, 60, 60);
  car.shapeColor = "white";
    
  //creates a wall.
  wall = createSprite(1350, 200, 60, 400);
  wall.shapeColor = color(80, 80, 80);
}

function draw() {
    //gives the background colour.
    background("black"); 

    //prints the following text on the screen.
    text("Press the SPACE key to start the Car", 540, 150);

    if(keyDown("space")){
      //calls the restart function, assigns the speed, the velocity X, the weight, the colour,the state and the sound for the car when the SPACE key is pressed.
      restart();
      car.speed = random(30, 95);
      car.velocityX = car.speed;
      car.weight = random(400, 1500);
      carstate = "start";
      car.shapeColor = "white";
      racingsound.play();
    }

    //makes the car to halt when the car collides with the wall. 
    if (wall.x - car.x < wall.width/2 + car.width/2) {
      racingsound.stop();
      car.velocityX = 0;
      car.x = wall.x - (wall.width/2 + car.width/2);
      carstate = "halt";
    }
    
    //gives the formula for the deformation of the car,
    car.deformation = (0.5*car.weight*car.speed * car.speed/22500); 

    //assigns the sound, colour and the text based on the type of the deformation of the car(line 59:75)  
    if((car.deformation>180) && (carstate === "halt")) {
      crashsound.play();        
      car.shapeColor = color(255, 0, 0);
      text("Lethal!!!",1270,300);
    }
    else if ((car.deformation>=80) && (car.deformation<=180) && (carstate === "halt")) {
      car.shapeColor = color(230, 230, 0);
      text("Average",1270,300);
    } 
    else if((car.deformation<80) && (carstate === "halt")) {
      car.shapeColor = color(0, 255, 0);
      text("Good",1270,300);
    }
   
    //draws the sprites.  
    drawSprites();
}

//performs the specific function when the restart function is called.
function restart(){
   crashsound.stop();
   if(keyDown("space")){
   car.x = 45;
   car.y = 395;
   car.shapeColor = "white";
    }
}