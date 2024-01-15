window.addEventListener('load',main,false);
function main() { 
	const pause_button = document.getElementById('Pause')
	prt = [];

	var b;
	var dt; 
	var cm;
	var l_right;
	var l_left;
	var vx_dot;
	var vy_dot;
	
	var sp = 1; 
	var flag = 0;
	var time = 0;
	
	var ctx = cnv.getContext('2d');
	var h = cnv.height;
	var w = cnv.width;
		
	function switchdt() {
		switch (flag) {
			case 0: {
				flag = 1;
				sp = 0;
				pause_button.value = 'Продолжить'
				break;
			}
			case 1: {
				flag = 0;
				sp = 1;
				pause_button.value = 'Пауза'
			}
		}
	}	
	Pause.onclick = function () { switchdt();}
	
	reload.onclick = function() {
		clearInt(interv);
		Update();
	}	
	function Update() { 
		N = 50;
		cm = 1000;
		a = 16;
		dt0 = 0.01;
		beta = 1;
		fps = parseInt(document.getElementById('FPS').value);
		count(N, a);
		time = 0;
		a = Math.pow(Math.pow(prt[2].y - prt[1].y, 2) + Math.pow(prt[2].x - prt[1].x, 2), 1/2);
		interv = setInterval(control, 1000 / fps);
	}	
	function count(NUM, dist) {
		var len = (NUM - 1) * dist;
		for (var i = 0; i < NUM; i++) { 
			b = [];
			b.x = 200 + dist * i; 
			b.y = 100;
			b.vx = 0;
			b.vy = 0;
			b.vx_dot = 0;
			b.vy_dot = 0;
			prt[i] = b; 
		}
	}	
	// Метод Эйлера
	function Euler() {  
		dt = dt0 * sp;
		for (var i = 0; i < N - 5; i++) { 
			if(time < 300 * dt)
			{
				prt[N - 1].y = 100 - 30 * Math.cos(7 * time); 
				prt[N - 2].y = 100 - 30 * Math.cos(7 * time);
				prt[N - 3].y = 100 - 30 * Math.cos(7 * time);
				prt[N - 4].y = 100 - 30 * Math.cos(7 * time);
				prt[N - 5].y = 100 - 30 * Math.cos(7 * time);
			}
			if(i == 0) {
				l_right = Math.pow(Math.pow(prt[1].x - prt[0].x, 2) + Math.pow(prt[1].y - prt[0].y, 2), 1/2);
			} else {
				l_right = Math.pow(Math.pow(prt[i + 1].x - prt[i].x, 2) + Math.pow(prt[i + 1].y - prt[i].y, 2), 1/2); 
				l_left = Math.pow(Math.pow(prt[i].x - prt[i - 1].x, 2) + Math.pow(prt[i].y - prt[i - 1].y, 2), 1/2); 
			}
			
			if (l_right < a) {
				del_l_right = 0; 
			} else {  
				del_l_right = (l_right - a);
			}
			if (i != 0){
				if (l_left < a) {
				del_l_left = 0;
			} else { 
				del_l_left = (l_left - a);
			}
			}
			if (i == 0) {
				vx_dot = cm * (del_l_right * (prt[1].x - prt[0].x) / l_right) - beta * prt[0].vx;
				vy_dot = cm * (del_l_right * (prt[1].y - prt[0].y) / l_right) - beta * prt[0].vy;
			} else {
				vx_dot = cm * (del_l_right * (prt[i + 1].x - prt[i].x) / l_right - del_l_left * (prt[i].x - prt[i - 1].x) / l_left) - beta * prt[i].vx;
				vy_dot = cm * (del_l_right * (prt[i + 1].y - prt[i].y) / l_right - del_l_left * (prt[i].y - prt[i - 1].y) / l_left) - beta * prt[i].vy;
			}
			prt[i].vx_dot = vx_dot;
			prt[i].vy_dot = vy_dot;
			prt[i].vx += vx_dot * dt;
			prt[i].vy += vy_dot * dt;
		}

		for (var i = 0; i< N - 1; i++) { 
			prt[i].x += prt[i].vx * dt;
			prt[i].y += prt[i].vy * dt;
		}
		time += dt;		
	}	

	function draw() { 
		ctx.clearRect(0, 0, w, h);
		for (var i = 0; i < N; i++) { 
			ctx.beginPath();
			ctx.arc(prt[i].x, prt[i].y, 8, 0, 2 * Math.PI);
			ctx.strokeStyle = "blue";
			ctx.stroke();
		}
	}
	function control() { 
		Euler(); 
		draw();
	}
	function clearInt(intrv) { 
		clearInterval(intrv);
	}
	FPS.oninput = function () { 
		fps = parseInt(document.getElementById('FPS').value);
		clearInt(interv);
	}	
	function UpdateCoeffs() {
		N = 50;
		cm = 1000;
		a = 16;
		dt0 = 0.01;
		beta = 1;
	}
	UpdateCoeffs();
	Update();
}