const canvas = document.querySelector("#jsCanvas");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const btn = document.querySelector("#jsMode");

const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle="#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let paintMode = 'FILL';

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleColorClick(event){
    let color = event.target.style.backgroundColor;
    colors.forEach(color => color.style.border = "none");
    event.target.style.border = "0.5px solid black";
    ctx.strokeStyle = color;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting ){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else if(paintMode === 'PAINT'){
        ctx.lineTo(x,y)
        ctx.stroke();
        // ctx.closePath();
    }else if(paintMode === 'FILL'){
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.fill();
    }
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
if(range){
    range.addEventListener("input", handleRangeChange);
}

if(btn){
    btn.addEventListener("click", handleModeClick);
}

function handleModeClick(event){
    const mode = event.target.innerText;
    if(mode === "FILL"){
        btn.innerText = "PAINT";
        paintMode = "PAINT";
    }else{
        btn.innerText = "FILL";
        paintMode = 'FILL';
    }
}