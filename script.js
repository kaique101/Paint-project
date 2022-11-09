//initial data
currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;


let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//Events
document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click',colorClickEvent);
});
screen.addEventListener('mousedown',mouseDownEvent);
screen.addEventListener('mousemove',mouseMoveEvent);
screen.addEventListener('mouseup',mouseUpEvent);
document.querySelector('.clear').addEventListener('click',clearScreen);
//Functions

function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');// this is to choose the different colors in the HTML based on the data-color
    currentColor = color;
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
};

function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft; // Page x and page Y is going to show the position of the mouse and this offset is to remove the position of the whole page and allow to draw only on canvas tag
    mouseY = e.pageY - screen.offsetTop;    
};
function mouseMoveEvent(e){
    if(canDraw===true){ 
        draw(e.pageX, e.pageY)
    }
}
function mouseUpEvent(){
    canDraw = false;
};
function draw (x,y){
    let pointX = x - screen.offsetLeft; //these two is just to get the position
    let pointY = y - screen.offsetTop;

    ctx.beginPath();       // this part is drawing itself
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX,pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};