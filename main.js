var xs = 64;
var ys = 64;


var list = document.getElementById('list');
var area = document.getElementById('area');
var field = document.getElementById('field');
var osd = document.getElementById('osd');

var frame = document.createElement('div');

frame.setAttribute('class', 'hidden');
osd.appendChild(frame);

var mx = 0;
var my = 0;
var mx1 = 0;
var my1 = 0;
var mdx = 0;
var mdy = 0;
var p0x = 0;
var p0y = 0;
var mb = false;
var shift = false;
var ctrl = false;
var selected_obj = 0;
var dragged_obj = false;
var dgx = 0;
var dgy = 0;

['GMK_BASE1','SA_BASE1'].forEach(function(name) {
	elem = document.getElementById(name);
	elem = add_resource(elem.src, name);
})

var x = document.getElementById('preset');
x.addEventListener('change', handleOptionSelect, false);

var scripts = document.body.getElementsByTagName('script');
var j = 0;
for (var i = 0; i < scripts.length; i++) {
	var f = scripts[i].getAttribute('src');
	var s = /.*\/(.*)\.json$/.exec(f);
	if (s) {
		var option = document.createElement('option');
		option.text = s[1];
		option.value = j;
		x.add(option);
		j++;
	}
}


document.getElementById('files').addEventListener('change', handleFileSelect, false);

area.addEventListener('dragover', handleDragOverarea, false);
area.addEventListener('drop', handleDropElement, false);

document.addEventListener('keyup', handleKeyUp, false)
document.addEventListener('keydown', handleKeyDown, false)

area.addEventListener('mousedown', handleMouseDown, true);
document.addEventListener('mouseup', handleMouseUp, false);
document.addEventListener('mousemove', handleMouseMove, false);

frame.onmousedown = disableDragging;
area.onmousedown = disableDragging;
field.onmousedown = disableDragging;

document.getElementById('export').onclick = exportAll;

deserialize(sets[0]);

function disableDragging(e) {
	e.preventDefault();
}

function exportAll() {
	s = '[\n';

	var len = field.childNodes.length;
	for (var count = 0; count < len; count++) {
		var obj = field.childNodes[count];
		var x = obj.offsetLeft;
		var y = obj.offsetTop;

		s += '  {"n":' + count + ', "x":' + x + ', "y":' + y + '}';

		if (count < len - 1)
			s += ',';

		s += '\n';
	}

	s += ']\n';

	alert(s, 'Export');
}

function handleDragStart(e) {

	dragged_obj = this;

	dgx = this.offsetLeft - e.pageX - list.scrollLeft;
	dgy = this.offsetTop - e.pageY - list.scrollTop;

//	alert(dx + " " + dy);

//	e.dataTransfer.effectAllowed = 'move';
//	e.dataTransfer.setData('text/html', this.innerHTML);
}

function add_resource(src, title, w, h) {
	var elem = document.createElement('li');

	//var obj = document.createElement('img');
	//obj.setAttribute('src', src);
	//obj.setAttribute('title', title);

	var obj = document.createElement('div');
	obj.setAttribute('title', title);

	//obj.innerHTML = title;

	//obj.setAttribute('src', src);
	
	//obj.setAttribute('background-image', 'url("images/'+title+'.png")');

	//obj.style.backgroundSize = '64px 64px';

	//tint = 'linear-gradient(to bottom, #ff0, #ff0)';

	//obj.style.backgroundImage = tint+','+'url("images/'+title+'.png")';

	//obj.style.backgroundImage = 'linear-gradient(to bottom, #ff0, #ff0)';

	obj.setAttribute('draggable', 'true');
	obj.setAttribute('class', 'sprite');
	obj.addEventListener('dragstart', handleDragStart, false);

	var txt = document.createElement('div');
	txt.setAttribute('class','sprite-text');
	obj.appendChild(txt);


	elem.appendChild(obj);
	list.firstChild.appendChild(elem);
	return obj;
}

function load_files1(files) {
		var count = 0;
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match('image.*')) {
			continue;
		}

		try {
			var reader = new FileReader();
			reader.onload = (function(theFile) {
			  return function(e) {
				var elem = document.createElement('li');
				var obj = document.createElement('img');
				obj.setAttribute('src', e.target.result);
				obj.setAttribute('title', theFile.name);
				obj.setAttribute('draggable', 'true');
				obj.setAttribute('class', 'sprite');
				obj.addEventListener('dragstart', handleDragStart, false);
				elem.appendChild(obj);
				list.firstChild.appendChild(elem);

				console.log('Loaded ' + theFile.name);

				count++;
			  };
			})(f);

			reader.readAsDataURL(f);

		} catch (err) {
			msg = err.message;
		}
	}

	if (count) {
		list.scrollTop = list.scrollHeight;
		logger.scrollTop = logger.scrollHeight;
	}
}


function load_files(files) {
	var count = 0;

	for (var i = 0, f; f = files[i]; i++) {

		try {
			var reader = new FileReader();

			var file = files[0];
			var start = 0;
			var stop = file.size - 1;

			var reader = new FileReader();

			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					var json = evt.target.result;
					data = JSON.parse(json);
					deserialize(data);
				}
			};

			var blob = file.slice(start, stop + 1);
			reader.readAsBinaryString(blob);

		} catch (err) {
			console.log(err.message);
		}
	}
}


function handleFileSelect(evt) {
  load_files(evt.target.files);
}

function handleOptionSelect(evt) {
	var x = document.getElementById('preset');
	deserialize(sets[x.options[x.selectedIndex].value]);
}

function handleDropZone(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	load_files(evt.dataTransfer.files);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = dragged_obj ? 'move' : 'copy';
}

function handleDragOverarea(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('list');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleDropZone, false);

function getObjectPosition(object) {
  var left = 0;
  var top = 0;

  var o = object;

  while (object.offsetParent) {
	left += object.offsetLeft;
	top += object.offsetTop;
	object = object.offsetParent;
  }

  left += object.offsetLeft;
  top += object.offsetTop;

  left -= o.scrollLeft;
  top -= o.scrollTop;

  return {
	  x : left,
	  y : top
  };
}

function selectObject(obj) {
	obj.classList.add('selected');
}

function deselectObject(obj) {
	obj.classList.remove('selected');
}

function isSelected(obj) {
	return obj.classList.contains('selected');
}

function countSelected() {
	var res = 0;
	field.childNodes.forEach(function(obj) { if (isSelected(obj)) res++; });
	return res;
}

function moveSelected(dx, dy) {
	field.childNodes.forEach(function(obj) {
		if (isSelected(obj)) {
			var x = obj.offsetLeft + dx;
			var y = obj.offsetTop + dy;
			obj.style.left = x + 'px';
			obj.style.top = y + 'px';
		}
	});
}

function deleteSelected() {
	var obj = field.firstChild;
	while (obj) {
		var last = obj;
		obj = obj.nextSibling;
		if (isSelected(last)) {
			field.removeChild(last);
		}
	}
}

function copySelection() {
	field.childNodes.forEach(function(obj) {
		if (isSelected(obj)) {
			var x = obj.offsetLeft;
			var y = obj.offsetTop;
			clone = addSprite(obj, x, y, false);
			deselectObject(obj);
			selectObject(clone);
		}
	});
}

function deselectAll() {
	field.childNodes.forEach(function(obj) { obj.classList.remove('selected'); });
}

function valueInRange(value, vmin, vmax) { 
	return (value >= vmin) && (value <= vmax);
}

function rectOverlap(Ax1,Ay1,Ax2,Ay2,Bx1,By1,Bx2,By2) {
	var xOverlap = valueInRange(Ax1, Bx1, Bx2) || valueInRange(Bx1, Ax1, Ax2);
	var yOverlap = valueInRange(Ay1, By1, By2) || valueInRange(By1, Ay1, Ay2);
	return xOverlap && yOverlap;
}

function selectByRect(x1, y1, x2, y2, doSelect) {
	var last = null;
	field.childNodes.forEach(function(obj) {
		px1 = obj.offsetLeft;
		py1 = obj.offsetTop;
		px2 = obj.clientWidth + px1;
		py2 = obj.clientHeight + py1;
		if (rectOverlap(px1,py1,px2,py2,x1,y1,x2,y2)) {
			if (doSelect) selectObject(obj);
			last = obj;
		}
	});
	return last;
}

function snap(x) {
	var g = xs/4;
	return Math.round(x/g)*g;
}

function snapToGrid() {
	if (selected_obj) {

		obj = selected_obj;
		x = obj.offsetLeft;
		y = obj.offsetTop;
		x1 = snap(x);
		y1 = snap(y);
		var dx = x1-x;
		var dy = y1-y;

		field.childNodes.forEach(function(obj) {
			if (isSelected(obj)) {
				x = obj.offsetLeft + dx;
				y = obj.offsetTop + dy;
				obj.style.left = x + 'px';
				obj.style.top = y + 'px';
			}
		});
	}
}

function handleMouseUp(e) {
	mb = false;
	frame.setAttribute('class','hidden');
	snapToGrid();
}

function moveToFront(elem) {
	var obj = field.firstChild;
	while (obj) {
		var last = obj;
		obj = obj.nextSibling;
		if (last == elem)
			field.removeChild(last);
	}
	field.appendChild(elem);
}

function doubleClick(e) {
	e.preventDefault();
	//moveToFront(this);
	//alert('doubleclicked!');

	field.childNodes.forEach(function(obj) {
		if (isSelected(obj)) {
			moveToFront(obj);
		}
	});
}


function addSprite(elem, x, y, center) {
	
	var obj = elem.cloneNode(true);

	//var obj = document.createElement('img');
	//obj.setAttribute('src', elem.src);
	//obj.setAttribute('class', 'elem');

	obj.style.position = 'absolute';

	obj.setAttribute('draggable', 'false');


	obj.onmousedown = disableDragging;
	if (center) {
		x -= obj.width / 2;
		y -= obj.height / 2;
	}

	obj.style.left = x + 'px';
	obj.style.top = y + 'px';
	field.appendChild(obj);

	obj.ondblclick = doubleClick;

	return obj;
}


function handleMouseDown(e) {
	mdx = mx;
	mdy = my;
	mb = true;

	//test if we clicked on object
	obj = selectByRect(mx, my, mx, my, false);

	selected_obj = obj;

	if (!obj) {
		if (!ctrl)
			deselectAll();
		return false;
	}


	if (ctrl) {

		if (isSelected(obj))
			deselectObject(obj);
		else
			selectObject(obj);
	}

	else if (shift) { 
		copySelection();
	}

	else if ( !isSelected(obj) ) {
		deselectAll();
		selectObject(obj);
	}

	return false;
}


function handleMouseMove(e) {
	pos = getObjectPosition(area);

	mx = e.pageX - pos.x;
	my = e.pageY - pos.y;

	if (mb) {
		if (selected_obj) {
			var dx = mx - mx1;
			var dy = my - my1;
			moveSelected(dx, dy);

		} else {
			var x1 = mdx;
			var y1 = mdy;
			var x2 = mx;
			var y2 = my;
			if (x1 > x2) { var tmp = x1; x1 = x2; x2 = tmp; }
			if (y1 > y2) { var tmp = y1; y1 = y2; y2 = tmp; }
			frame.style.left = x1 + 'px';
			frame.style.top = y1 + 'px';
			frame.style.width = (x2 - x1) + 'px';
			frame.style.height = (y2 - y1) + 'px';
			frame.setAttribute('class','frame');

			if (!ctrl)
				deselectAll();

			selectByRect(x1,y1,x2,y2, true);
		}
	}

	mx1 = mx;
	my1 = my;

	return false;
}

function handleKeyUp(e) {
	shift = false;
	ctrl = false;
}

function handleKeyDown(e) {
	var dx = 0; 
	var dy = 0;

	switch (e.keyCode) {
		case 46: deleteSelected(); break;
		case 38: dy--; break;
		case 40: dy++; break;
		case 39: dx++; break;
		case 37: dx--; break;
		case 16: shift = true; break;
		case 17: ctrl = true; break;
	}

	if (dx || dy) {
		moveSelected(dx, dy);
		return false;
	}
}

function handleDropElement(e) {

	mb = false;
	pos = getObjectPosition(area);
	mx = e.pageX - pos.x;
	my = e.pageY - pos.y;

	e.stopPropagation();
	e.preventDefault();

	if (dragged_obj) {
		addSprite(dragged_obj, mx + dgx - 1, my + dgy - 1, false);
		dragged_obj = null;
	}
}

function hex2rgba(hex) {
	var r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16),
		a = 0.75;//parseInt(hex.slice(7, 9), 16);
	return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

function add_keycap(x, y, prop, caption) {
	var obj = addSprite(elem, x*xs,y*ys, false);
	w = prop.w * xs;
	h = prop.h * ys;

	txt = obj.firstChild;

	obj.style.width = txt.style.width = w + 'px';
	obj.style.height = h + 'px';
	txt.style.height = (h-9) + 'px';

	txt.style.fontSize = (prop.f+11) +'px';

	obj.style.backgroundSize = w+'px '+h+'px';
	obj.style.color = prop.t;

	var multiply_mode = false;

	if (multiply_mode) { // slow!
		obj.style.backgroundColor = prop.c;
		obj.style.backgroundBlendMode = 'multiply';
	} else {
		var url = 'url("images/SA_BASE2.png")';
		var rgba = hex2rgba(prop.c);
		obj.style.backgroundImage = 'linear-gradient(to bottom, '+rgba+', '+rgba+')'+','+url;
	}

	txt.innerHTML = caption;
	obj.title = prop.p;
}

function deserialize(data) {

	var node = field;
	while (node.hasChildNodes()) node.removeChild(node.lastChild);

	var caption = null;
	var x0 = 0.5;
	var y0 = 0.5;
	var x = x0;
	var y = y0;
	var prop = {c:0,t:0,p:0,a:0,f:0,x:0,y:0,sm:'',w:1,h:1,c:'#ffffff',t:'#000000'};
	var s = 64;
	info = {name:'', author:''};

	data.forEach(function(o) {
		if (Array.isArray(o)) {
			o.forEach(function(e) {
				if (typeof e == 'string') {
					caption = e;
					add_keycap(x,y,prop,caption);
					x += prop.w;
					prop.w = 1;
					prop.h = 1;
				} else {
					Object.keys(e).forEach(function(key) { prop[key] = e[key]; });
					x += prop.x;
					y += prop.y;
					prop.x = 0;
					prop.y = 0;
				}
			});
			x = x0;
			y += 1.0;
		} else {
			info = o;
		}
	});

	s = (info.name ? info.name: '') + (info.author?', Autor: '+info.author:'');
	document.getElementById('info').innerHTML = s;
}

