var right_x=390,right_y=75;
var left_x=0,left_y=75;

var right_ele;
var left_ele;
var ball_ele;

const game_width= 400, game_height = 200;
const rect_hei=100, rect_wid=10;
const sensitivity_y=5;

const ball_radius= 5;
const ini_ball_x= game_width/2, ini_ball_y= game_height/2;
var ball_x=game_width/2, ball_y= game_height/2;
var ball_speed=10;
var angle = Math.random()*Math.PI*2;

var score_left=0;
var score_right=0;
var scorezone_ele;
const max_score=5;

function play(){
    var ns = 'http://www.w3.org/2000/svg'
    console.log("he");
    let gamezone_ele = document.getElementById("gamezone");
    gamezone_ele.innerHTML="";

    let svg_ele = document.createElementNS(ns,'svg');
    svg_ele.setAttributeNS(null, 'width', game_width);
    svg_ele.setAttributeNS(null, 'height', game_height);
    svg_ele.setAttributeNS(null,'fill','cyan');
    gamezone_ele.appendChild(svg_ele);

    right_ele = document.createElementNS(ns,'rect');
    right_ele.setAttributeNS(null, 'width', rect_wid);
    right_ele.setAttributeNS(null, 'height', rect_hei);
    right_ele.style.x=right_x;
    right_ele.style.y=right_y;
    right_ele.style.fill="red";
    svg_ele.appendChild(right_ele);

    left_ele = document.createElementNS(ns,'rect');
    left_ele.setAttributeNS(null, 'width', rect_wid);
    left_ele.setAttributeNS(null, 'height', rect_hei);
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
    gamezone_ele.style.border= "solid 3px black";
    scoreupdate();
    ball_rolling();
}

function scoreupdate(){
    scorezone_ele= document.getElementById("scorezone");
    scorezone_ele.innerHTML= "Player Left : "+ score_left+"_________________________________"+ "Player Right : "+ score_right+" <br>";
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
    var ball_roll = setInterval(function(){
        difference = (new Date().getTime() - start_time)/10000;
        console.log(difference);
        ball_x= ball_x+ ball_speed*Math.cos(angle)*(1+difference);
        ball_y= ball_y+ ball_speed*Math.sin(angle)*(1+difference);
        if(ball_y<0){
            angle= 0-angle;
            ball_y= 0-ball_y;
        }
        if(ball_y>game_height){
            angle= 0-angle;
            ball_y= 2*game_height-ball_y;
        }
        if(ball_x<rect_wid){
            if(ball_y<left_y || ball_y>left_y+rect_hei){
                score_right++;
                scoreupdate();
                if(score_right<max_score && score_left<max_score){
                    ball_x=ini_ball_x;
                    ball_y=ini_ball_y;
                    angle= new_angle();
                    start_time=new Date().getTime();
                }
                else{
                    let gamezone_ele = document.getElementById("gamezone");
                    gamezone_ele.innerHTML="Right Won";
                    clearInterval(ball_roll);
                }
            }
            else{
                angle= Math.PI-angle;
                ball_x= 0-ball_x;
            }
        }
        if(ball_x>right_x){
            if( ball_y<right_y || ball_y>right_y+rect_hei){
                score_left++;
                scoreupdate();
                if(score_right<max_score && score_left<max_score){
                    ball_x=ini_ball_x;
                    ball_y=ini_ball_y;
                    angle= new_angle();
                    start_time=new Date().getTime();
                }
                else{
                    let gamezone_ele = document.getElementById("gamezone");
                    gamezone_ele.innerHTML="Left Won";
                    clearInterval(ball_roll);
                }
            }
            else{
                angle= Math.PI-angle;
                ball_x= 2*game_width-ball_x;
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
        left_y=Math.min(left_y,game_height-rect_hei);
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
        right_y=Math.min(right_y,game_height-rect_hei);
        right_ele.style.y = right_y;
    },60);
    
}