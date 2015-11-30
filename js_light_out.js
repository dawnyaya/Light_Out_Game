
var matrix;
var n = 5;     //n * n matrix
var width = 70;
var height = 70;
var on = "C:/Users/yayayouknow/Desktop/light_on.png";
var off = "C:/Users/yayayouknow/Desktop/light_off.png";
var count_on = 0;

function getTable() {
	var table = document.getElementById("table");
	table.innerHTML = "";
	var win_text = document.getElementById("win_word");
	win_text.innerHTML = "";
	matrix = new Array(n);
	for(i = 0; i < n; i++) {
		matrix[i] = new Array(n);
	}
	
	for(i = 0; i < n; i++) {
		for(j = 0; j < n; j++) {
			matrix[i][j] = Math.round(Math.random());
			var cur = document.createElement("img");
			cur.setAttribute("id", "img" + i + j);
			if(matrix[i][j] == 1) {
				cur.setAttribute("src", on);
				count_on++;
			}
			else {
				cur.setAttribute("src", off);
			}
			cur.setAttribute("width", width);
			cur.setAttribute("height", height);
			cur.setAttribute("onClick", "javascript:change(" + i + "," + j + ");");
			table.appendChild(cur);
		}
		var br = document.createElement("br");
		table.appendChild(br);
	}
}

function change(i, j) {
	change_helper(i, j);
	if(i - 1 >= 0) {
		change_helper(i - 1, j);
	}
	if(i + 1 < n) {
		change_helper(i + 1, j);
	}
	if(j - 1 >= 0) {
		change_helper(i, j - 1);
	}
	if(j + 1 < n) {
		change_helper(i, j + 1);
	}
	if(count_on == 0) {
		win();
	}
}

function change_helper(i, j) {
	var cur = document.getElementById("img" + i + j);
	if(matrix[i][j] == 1) {
		cur.setAttribute("src", off);
		matrix[i][j] = 0;
		count_on--;
	}
	else {
		cur.setAttribute("src", on);
		matrix[i][j] = 1;
		count_on++;
	}
}

function win() {
	var win_text = document.getElementById("win_word");
	win_text.innerHTML = "<p class='bigRed'>You win<p>";
	for(i = 0; i < n; i++) {
		for(j = 0; j < n; j++) {
			var cur = document.getElementById("img" + i + j);
			cur.onclick = null;
		}
	}
}