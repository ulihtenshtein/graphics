var canvas = document.getElementById("graph");
var elem = document.getElementById("func-form");
var func = document.getElementById("func");
var opt = {};
var step = 0.1;
var amp = 50;
var xamp = 50;

canvas.width = window.innerWidth-20;
canvas.height = 3 * window.innerHeight / 4;
if( elem ) {
	elem.addEventListener("click", onClick, false);
}
function onClick(e) {
	var elem = e.target;
	if( elem.value == "draw" || elem.value == "clear" ) return;
	if ( elem.getAttribute('vs') ) func.value += elem.getAttribute('vs');
}

function draw() {
	
	drawAxis(opt);
	
	opt.func = new Function('x','return ' + func.value );
	drawFunc(opt);
}

function drawAxis(opt) {
	var width = opt.width = canvas.width;
	var height = opt.height = canvas.height;
	
	var y0 = opt.y0 = height / 2;
	var x0 = opt.x0 = width / 2;
	var  ctx = opt.ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(x0, 0);
	ctx.lineTo(x0, height);
	ctx.moveTo(0, y0);
	ctx.lineTo(width, y0);
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.closePath();
	drawScale(opt);
}

function drawFunc(opt) {
	var func = opt.func;
	var ctx = opt.ctx;
	ctx.beginPath();
	ctx.strokeStyle = 'blue';
	ctx.moveTo(opt.x0, opt.y0 - func(0) * amp);
	for( var i = step; i < opt.width; i += step) {
		ctx.lineTo(opt.x0 + i * xamp, opt.y0 - func(i) * amp);
	}
	ctx.moveTo(opt.x0, opt.y0 - func(0) * amp);
	for( var i = -step; i > -opt.x0; i -= step) {
		ctx.lineTo(opt.x0 + i * xamp, opt.y0 - func(i) * amp);
	}
	ctx.stroke();
	ctx.closePath();
	
}
function clean() {
	func.value = '';
	var pc = canvas.parentNode;
	pc.removeChild(canvas);
	canvas = document.createElement('canvas');
	canvas.id = 'graph';
	canvas.width = opt.width;
	canvas.height = opt.height;
	opt.ctx = canvas.getContext('2d');
	pc.appendChild(canvas);
}
function drawScale(opt) {
		var del = document.getElementById('scale').value || 1;
		var pi = Math.PI * xamp / del;
		var x = opt.x0;
		var ctx = opt.ctx;
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		for (var i = x + pi; i < opt.width; i += pi) {
			ctx.moveTo( i, 0);
			ctx.lineTo( i, opt.height);
		}
		for (var i = x - pi; i > 0; i -= pi) {
			ctx.moveTo( i, 0);
			ctx.lineTo( i, opt.height);
		}
		ctx.stroke();
		ctx.closePath();
}