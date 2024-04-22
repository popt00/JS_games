
const MAX_SCORE=3;
const GAME_WIDTH= 400, GAME_HEIGHT = 200;
const RECTANGLE_HEIGHT=100, RECTANGLE_WIDTH=10;
const START_POSITION =50;

var right_x,right_y;
var left_x,left_y;
var right_ele;
var left_ele;
var ball_ele;

const sensitivity_y=5;

const ball_radius= 5;
const ini_ball_x= GAME_WIDTH/2, ini_ball_y= GAME_HEIGHT/2;
var ball_x, ball_y;
var ball_speed;
var angle = Math.random()*Math.PI*2;

var score_left;
var score_right;
var scorezone_ele;
var ball_roll ;
function resetGame(){

    right_x=GAME_WIDTH-RECTANGLE_WIDTH;
    right_y=START_POSITION;
    left_x=0;
    left_y=START_POSITION;
    ball_speed=10;
    score_left=0;
    score_right=0;
    ball_x=ini_ball_x;
    ball_y=ini_ball_y;
    clearInterval(ball_roll);
}

var buttonName = "<img src='src/restart.jpg' id='playButton' onClick=\"play()\" >"
{/* <img src="src/play.jpg" id="playButton" onclick="play()" width="100px"> */}
function play(){
    var ns = 'http://www.w3.org/2000/svg'
    console.log("he");
    resetGame();
    let gamezone_ele = document.getElementById("gamezone");
    gamezone_ele.innerHTML="";
    document.getElementById("play_button_div").innerHTML="";

    let svg_ele = document.createElementNS(ns,'svg');
    svg_ele.setAttributeNS(null, 'width', GAME_WIDTH);
    svg_ele.setAttributeNS(null, 'height', GAME_HEIGHT);
    svg_ele.setAttributeNS(null,'fill','cyan');
    gamezone_ele.appendChild(svg_ele);

    right_ele = document.createElementNS(ns,'rect');
    right_ele.setAttributeNS(null, 'width', RECTANGLE_WIDTH);
    right_ele.setAttributeNS(null, 'height', RECTANGLE_HEIGHT);
    right_ele.style.x=right_x;
    right_ele.style.y=right_y;
    right_ele.style.fill="red";
    svg_ele.appendChild(right_ele);

    left_ele = document.createElementNS(ns,'rect');
    left_ele.setAttributeNS(null, 'width', RECTANGLE_WIDTH);
    left_ele.setAttributeNS(null, 'height', RECTANGLE_HEIGHT);
    left_ele.style.x=left_x;
    left_ele.style.y=left_y;
    left_ele.style.fill="red";
    svg_ele.appendChild(left_ele);

    ball_ele = document.createElementNS(ns,'circle');
    ball_ele.style.r= ball_radius;
    ball_ele.style.cx=ball_x;
    ball_ele.style.cy=ball_y;
    ball_ele.style.fill="blue";
    svg_ele.appendChild(ball_ele);

    // gamezone_ele.style.width="400px";
    // gamezone_ele.style.height="200px";
    // gamezone_ele.style.border= "solid 3px black";
    scoreupdate();
    ball_rolling();
}

function scoreupdate(){
    scorezone_ele= document.getElementById("scorezone");
    scorezone_ele.innerHTML= "<table>"
                    +"<tr><td>Left PLayer:</td><td>Right Player:</td></tr>"
                    +"<tr><td>"+score_left+"</td><td>"+score_right+"</td></tr>"
                    +"</table>";
    // scorezone_ele.innerHTML= "Player Left : "+ score_left+"____________________________"+ "Player Right : "+ score_right+" <br>";
}
function new_angle(){
    let p_angle= Math.random()*Math.PI*2;
    let pi= Math.PI;
    while(!((p_angle<pi/3)||(p_angle>pi-pi/3 && p_angle<pi+pi/3)|| (p_angle>2*pi+pi/3))){
        p_angle= Math.random()*Math.PI*2;
    }
    return p_angle;
}
function ball_rolling(){
    angle= new_angle();
    var interval_speed = 60;
    let start_time= new Date().getTime();
    let difference=0;
    ball_roll= setInterval(function(){
        difference = (new Date().getTime() - start_time)/10000;
        console.log(difference);
        ball_x= ball_x+ ball_speed*Math.cos(angle)*(1+difference);
        ball_y= ball_y+ ball_speed*Math.sin(angle)*(1+difference);
        if(ball_y<0){
            angle= 0-angle;
            ball_y= 0-ball_y;
        }
        if(ball_y>GAME_HEIGHT){
            angle= 0-angle;
            ball_y= 2*GAME_HEIGHT-ball_y;
        }
        if(ball_x<RECTANGLE_WIDTH){
            if(ball_y<left_y || ball_y>left_y+RECTANGLE_HEIGHT){
                score_right++;
                scoreupdate();
                if(score_right<MAX_SCORE && score_left<MAX_SCORE){
                    ball_x=ini_ball_x;
                    ball_y=ini_ball_y;
                    angle= new_angle();
                    start_time=new Date().getTime();
                }
                else{
                    let gamezone_ele = document.getElementById("gamezone");
                    gamezone_ele.innerHTML="<h2>Right Side <br> Won</h2>"+buttonName;
                    clearInterval(ball_roll);
                }
            }
            else{
                angle= Math.PI-angle;
                ball_x= 0-ball_x;
            }
        }
        if(ball_x>right_x){
            if( ball_y<right_y || ball_y>right_y+RECTANGLE_HEIGHT){
                score_left++;
                scoreupdate();
                if(score_right<MAX_SCORE && score_left<MAX_SCORE){
                    ball_x=ini_ball_x;
                    ball_y=ini_ball_y;
                    angle= new_angle();
                    start_time=new Date().getTime();
                }
                else{
                    let gamezone_ele = document.getElementById("gamezone");
                    gamezone_ele.innerHTML="<h2>Left Side <br> Won</h2>"+buttonName;
                    clearInterval(ball_roll);
                }
            }
            else{
                angle= Math.PI-angle;
                ball_x= 2*GAME_WIDTH-ball_x;
            }
        }
        ball_ele.style.cx=ball_x;
        ball_ele.style.cy=ball_y;
    }, interval_speed);
    

}

var left_up=false,left_down=false,right_up=false,right_down=false;
document.onkeyup = function(e) {
    //  document.getElementById("gamezone").innerHTML+= "<br>"+ e.keyCode;
    switch (e.keyCode){
        case 38:
            console.log("UP arrow up")
            right_up=false;
            break;
        case 40:
            console.log("DOWN arrow up")
            right_down=false;
            break;
        case 87:
            console.log("W");
            left_up=false;
            break;
        case 83:
            console.log("S");
            left_down=false;
            break;            
    }
};

document.onkeydown = function(e) {
    //  document.getElementById("gamezone").innerHTML+= "<br>"+ e.keyCode;
    switch (e.keyCode){
        case 38:
            console.log("UP arrow down");
            right_up=true;
            r_up();
            left_up=new Date().getTime();
            break;
        case 40:
            console.log("DOWN arrow down")
            right_down=true;
            r_down();
            break;
        case 87:
            console.log("W down");
            left_up=true;
            l_up();
            break;
        case 83:
            console.log("S down");
            left_down=true;
            l_down();
            break;            
    }
};

function l_up(){
    let interval_id = setInterval(function(){
        if(!left_up){
            clearInterval(interval_id);
        }
        left_y-=sensitivity_y;
        if(left_y<0)left_y=0;
        left_ele.style.y=left_y;
    },60);
}
function l_down(){
    let interval_id = setInterval(function(){
        if(!left_down){
            clearInterval(interval_id);
        }
        left_y+=sensitivity_y;
        left_y=Math.min(left_y,GAME_HEIGHT-RECTANGLE_HEIGHT);
        left_ele.style.y=left_y;
    },60);
}
function r_up(){
    let interval_id = setInterval(function(){
        if(!right_up){
            clearInterval(interval_id);
        }
        right_y-=sensitivity_y;
        if(right_y<0)right_y=0;
        right_ele.style.y = right_y;
    },60);
}
function r_down(){
    let interval_id = setInterval(function(){
        if(!right_down){
            clearInterval(interval_id);
        }
        right_y+=sensitivity_y;
        right_y=Math.min(right_y,GAME_HEIGHT-RECTANGLE_HEIGHT);
        right_ele.style.y = right_y;
    },60);
    
}
