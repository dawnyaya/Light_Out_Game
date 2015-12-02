var matrix;
var n = 5;     //n * n matrix
var width = 70;
var height = 70;
var on = "img/light_on.png";
var off = "img/light_off.png";
var count_on = 0;
var steps;

function getTable() {
	var table = document.getElementById("table");
	table.innerHTML = "";
	var win_text = document.getElementById("win_word");
	win_text.innerHTML = "";
	matrix = new Array(n);
	for(i = 0; i < n; i++) {
		matrix[i] = new Array(n);
	}
	generate_new_game();
	while(!can_win()) {
		generate_new_game();
	}
	
	for(i = 0; i < n; i++) {
		for(j = 0; j < n; j++) {
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
	count_steps();
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
	win_text.innerHTML = "<p class='bigRed'>You win!<p>";
	for(i = 0; i < n; i++) {
		for(j = 0; j < n; j++) {
			var cur = document.getElementById("img" + i + j);
			cur.onclick = null;
		}
	}
}

function generate_new_game() {
	count_on = 0;
	steps = -1;
	count_steps();
	for(i = 0; i < n; i++) {
		for(j = 0; j < n; j++) {
			matrix[i][j] = Math.round(Math.random());
		}
	}
}

function can_win() {
	return dfs(0);
}
function dfs(index) {
	if(index == n) {
		var M = new Array(n);
		for(var i = 0; i < n; i++) {
			M[i] = new Array(n);
			for(j = 0; j < n; j++) {
				M[i][j] = matrix[i][j];
			}
		}
		return pass_check(M);
	}
	for(var i = 0; i < n; i++) {
		if(dfs(index + 1)) {
			return true;
		}
		flip(matrix, 0, i);
		if(dfs(index + 1)) {
			flip(matrix, 0, i);
			return true;
		}
		flip(matrix, 0, i);
	}
	return false;
}

function pass_check(M) {
	var row = 0;
	while(row < n - 1) {
		for(var i = 0; i < n; i++) {
			if(M[row][i] == 1) {
				flip(M, row + 1, i);
			}
		}
		row++;
	}
	
	for(var i = 0; i < n; i++) {
		if(M[row][i] == 1) {
			return false;
		}
	}
	return true;
}

function flip(cur, i, j) {
	cur[i][j] = 1 - cur[i][j];
	if(i > 0) {
		cur[i - 1][j] = 1 - cur[i - 1][j];
	}
	if(j > 0) {
		cur[i][j - 1] = 1 - cur[i][j - 1];
	}
	if(i < n - 1) {
		cur[i + 1][j] = 1 - cur[i + 1][j];
	}
	if(j < n - 1) {
		cur[i][j + 1] = 1 - cur[i][j + 1];
	}
}

function count_steps() {
	steps++;
	document.getElementById("step").innerHTML = steps;
}

