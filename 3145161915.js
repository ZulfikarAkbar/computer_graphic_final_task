var start = false;
var ctx;
var canvasState = 1; //point = 1, line = 2, rectangle = 3
var origX = 0;
var origY = 0;
var pixelWidth = 15;

function setWidth(selObj) {
	pixelWidth = parseInt(selObj.value);
}

function setColor(selObj) {
    ctx.fillStyle=selObj.value;
}

function drawPixel(x, y) {
	ctx.fillRect(x * pixelWidth, y * pixelWidth, pixelWidth, pixelWidth);
}

//Tugas kalian adalah mengubah 2 fungsi berikut
function drawLine(x1, y1, x2, y2) {
	//bresenhem
	var dx = Math.abs(x2-x1);
	var dy = Math.abs(y2-y1);
	var double_dy = dy*2;
	var double__dy_min_dx = (dy-dx)*2;
	var p = (2*dy)-dx;
	var X_;
	if(x1>x2){
		x=x2; y=y2; X_=x1;
	}else{
		x=x1; y=y1; X_=x2;
	}
	drawPixel(x,y);
	while(x<X_){
		x++;
		if(p>0){
			y++;
			p+=double__dy_min_dx;
		}else{
			p+=double_dy;
		}
		drawPixel(x,y)
	}
    alert("Gambar garis dari (" + x1 + ", " + y1 + ") hingga (" + x2 + ", " + y2 + ")");
}

function drawRectangle(x1, y1, x2, y2) {
	drawLine(x1, y1, x2, y1);
	drawLine(x1, y1, x1, y2);
	drawLine(x2, y1, x2, y2);
	drawLine(x1, y2, x2, y2);
    alert("Gambar persegi panjang dari (" + x1 + ", " + y1 + ") hingga (" + x2 + ", " + y2 + ")");
}

//Batas akhir yang diedit
//Jangan mengubah selain kedua fungsi di atas

function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function setPoint() {
	canvasState = 1;
    start = false;
	document.getElementById("the_state").innerHTML = "&nbsp;POINT&nbsp;";
}

function setLine() {
	canvasState = 2;
    start = false;
	document.getElementById("the_state").innerHTML = "&nbsp;LINE&nbsp;";
}

function setRectangle() {
	canvasState = 3;
    start = false;
	document.getElementById("the_state").innerHTML = "&nbsp;RECTANGLE&nbsp;";
}

function init() {
	var CANVAS=document.getElementById("the_canvas");
	CANVAS.width=window.innerWidth;
	CANVAS.height=window.innerHeight - 30;
	ctx = CANVAS.getContext("2d");
	CANVAS.onmousedown = function(e){
		var xx = Math.trunc(e.x / pixelWidth);
		var yy = Math.trunc(e.y / pixelWidth);
		if(canvasState == 1) {
			drawPixel(xx, yy);
		} else if(!start) {
			start = true;
			origX = xx;
			origY = yy;
		} else {
			start = false;
			if(canvasState == 2) {
				drawLine(origX, origY, xx, yy);
			} else if(canvasState == 3) {
				drawRectangle(origX, origY, xx, yy);
			}
		}
	};
}

