alert("A pirate stuck on an island, and its raining rocks. help him to escape. score 100 and yoo will win");
/*
    Thank to Arb Rahim Badsa for his support and help in debugging "tons" of problems
*/
/*
Notes : 

1. Arb is great coder, I mean ofc he is.

2. images are collected from Google, obv.

3. If you see any bugs or have any suggestions, tell me in comments or in private messages. I'm all way available

4. Collision function may have some bugs, I'm sorry for that.

*/

//game vars
let window_width = window.innerWidth;
let window_height = window.innerHeight;
let game_over = false;
let loader_div;
let score_board;
let score = 0;
let restart_div;
let restart_btn;

//-------------------------------------------------------------------------------------------------

//images
let bg;
let sur_img;
let player_img = [];

//-------------------------------------------------------------------------------------------------

//Player variables
let player_x;
let player_y;
let player_height;
let player_width;
let old_x = 10;
let lr = 0;

//-------------------------------------------------------------------------------------------------

//stone variables
let stone_x;
let stone_y;
let no_of_stones = 10;
let enemyImages = [];
let e = [];

//-------------------------------------------------------------------------------------------------

/*
  class player to make player
*/
class Player{
  show(x, y, w, h){
    if (x+40 < 0){x = 0}
    if (x-50 > window_width - player_width) {x = window_width - player_width;}
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = player_img;

    if (old_x < this.x){lr = 0;}
    if (old_x > this.x){lr = 1;}
    old_x = x;
    //rect(this.x, this.y, this.w, this.h);
    image(this.img[lr], this.x, this.y, this.w, this.h);
  }
}
//player ends
//-------------------------------------------------------------------------------------------------

/*
    stone class to create stones
*/
class Stone{
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = random(40, 70);
    //this.w = 50;
    //this.h = 50;
    this.velocity = map(this.size, 40, 70, 1, 2.5);
    this.img = enemyImages[1];
  }
  
  show(){
    fill(0);
    //ellipse(this.x, this.y, this.size, this.size);
    //rect(this.x, this.y, this.size, this.size);
    image(this.img, this.x, this.y, this.size, this.size);
  }
  
  update(){
    this.y = this.y + this.velocity;
  }
  
}
//stone ends
//-------------------------------------------------------------------------------------------------

/*
  preload to load stuff before game loads
*/
function preload(){
  //loading variables
  loader_div = document.getElementById('loader');
  score_board = document.getElementById('score');
  restart_div = document.getElementById('restart');
  restart_btn = select("#rebtn");

  //loading surface image
  sur_img = loadImage('https://dl.dropbox.com/s/oq0y59e2h4p1efw/burled-beach-corian-countertop-samples-c930-15202bh-64_1000.jpg?raw=1');
  
  //loading background
  bg = loadImage('https://dl.dropbox.com/s/0c63rnfr1u4csfr/game-background-vector-19.jpg?raw=1');
  
  //loading player character
  player_img[0] = loadImage('https://dl.dropbox.com/s/ddg3xzi6tkrko4w/pirate-royalty-free-game-art.png?raw=1');
  player_img[1] = loadImage('https://dl.dropbox.com/s/3ptxzmgd1dnyyre/pirateleft.png?raw=1');
  
  //loading stone images
  enemyImages[0] = loadImage('https://dl.dropbox.com/s/22aofztbcfj7e96/8-2-rock-png-picture-thumb.png?raw=1');
  enemyImages[1] = loadImage('https://dl.dropbox.com/s/c7565s7hr372pbi/stone_PNG13573.png?raw=1');
}
//preload ends
//-------------------------------------------------------------------------------------------------

/*
  function that starts and restarts the game
*/
function start(){
  game_over = false;
  loader_div.style.display = "none";
  score_board.style.display = "block";
  restart_div.style.display = "none";


  p = new Player();
  player_y = height-170;
  player_height = 140;
  player_width = 100;
  for (i = 0; i < no_of_stones; i++){
      stone_x = random(width);
      stone_y = random(-300, 50);
      e[i] = new Stone(stone_x, stone_y);
  }
}
//start ends
//-------------------------------------------------------------------------------------------------

/*
  setup function
*/
function setup(){  
  createCanvas(window_width, window_height);
  start();
}
//setup ends
//-------------------------------------------------------------------------------------------------

/*
  draw function
*/
function draw(){
  background(bg);
  noStroke();
  
  //surface
  noStroke();
  noFill();
  rect(0, height-80, width, 80);
  
  //player
  player_x = mouseX-50;
  fill(255, 255, 255, 50);
  p.show(player_x, player_y, player_width, player_height);
  
  for (i = 0; i < e.length; i++){
      if (e[i].y >= height-70){
        e[i].x = random(width);
        e[i].y = e[i].y - height;
        score++; 
        score_board.innerText = score;
      }
      e[i].show();
      e[i].update();
      collider(e[i]);
      if (game_over == true){
        restart_div.style.display = "flex";
        score = 0;
        score_board.innerText = "0";
        score_board.style.display = "none";
        restart_btn.mousePressed(start);
      }
  }
  let w = win();
  if(w){ 
     score_board.style.display = "none"; document.getElementById('win').style.display = "flex";
  noLoop();
  } 
  
  //image(enemyImages[0], 0, 0);
  
}
//draw ends
//-------------------------------------------------------------------------------------------------

/*
  Function to check collision
*/
function collider(enemy){
  /*if (enemy.y+enemy.size-20 > player_y){
    game_over = true;
  }*/
  if ((enemy.y+enemy.size)-35 >= player_y && (enemy.y+enemy.size)-55 <= player_y){
    if (enemy.x+enemy.size-30 > player_x && enemy.x < player_x+player_width-40){
      game_over = true;
    }
  }
  else if ((enemy.y+enemy.size)-55 >= player_y){
    if (enemy.x+enemy.size-45 > player_x && enemy.x < player_x+player_width-55){
      game_over = true;
    }
  }
}
//collision ends
//-------------------------------------------------------------------------------------------------

function win(){
    if (score >= 100){
        return true;
    }
}