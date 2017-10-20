function g(abc) {
	var first = abc.charAt(0);
	var end = abc.slice(1);
	if(first == "#") {
		return document.getElementById(end);
	} else if(first == ".") {
		//console.log(end);
		return document.getElementsByClassName(end);
	} else {
		end = abc;
		return document.getElementsByTagName(end);
	}
}

function changBg() {
	var a = g(".search-up")[0];
	var alla = a.getElementsByTagName("a");
	for(var i = 0; i < alla.length; i++) {
		alla[i].index = i;
		alla[i].onclick = function() {
			for(var j = 0; j < alla.length; j++) {
				//alla[j].style.background ="white";
				alla[j].className = "";
			}
			if(this.index == "1") {
				//this.style.background = "rgba(255, 0, 54, 1)";
				this.className = "rmbg";
			} else {
				//this.style.background = "#f40";
				this.className = "getbg";
			}
		}
	}
}

changBg();

//搜索栏js

(function() {
	var input = g("#search");
	var inputfather = g(".search-middle")[0];
	//var value = input.value;
	var ul = g(".searchend")[0];
	input.onfocus = function() {
		inputfather.children[1].style.display = "none";
		inputfather.children[2].style.display = "none";

	}
	input.onblur = function() {
		var value = input.value;
		if(value === "") {
			inputfather.children[1].style.display = "block";
			inputfather.children[2].style.display = "block";
		} else {
			ul.style.display = "none";
		}
	}
	input.onkeyup = function() {
		var value = input.value;
		if(value) {
			var ajax = new XMLHttpRequest();
			ajax.open("GET", "./APi/search.php?value=" + value);
			ajax.send();
			ajax.onreadystatechange = function() {
				if(ajax.readyState == 4 && ajax.status == 200) {
					var str = ajax.responseText;
					var arr = str.split(",");
					var newarr = [];
					for(var i = 0; i < arr.length; i++) {
						if(arr[i].indexOf(value) === 0) {
							newarr.push("<li>" + arr[i] + "</li>");
							if(ul[0]) {
								ul[0].removeChild(ul[0]);
							}
						}
					}
					if(newarr.length === 0) {
						ul.style.display = "none";
						return;
					}
					ul.style.display = "block";
					ul.style.border = "1px solid #969896";
					var newstr = newarr.join("");
					ul.innerHTML = newstr;
				}
			}
		}
		if(value.length === 0) {
			ul.style.display = "none";
			return;
		}

	}

})()

window.onload = function() {
	(function() {
		var a = g(".search-bottom")[0];
		//var button = g(".gz-button")[0].children[0];
		var ul = g(".imgs")[0];
		var li = ul.children;
		var ulFather = ul.parentElement;
		var imgwidth = ul.children[0].offsetWidth;
		var n = 0;
		var b = 0;
		var buttonli = g(".gz-hover")[0].children[0].children;
		var left = g(".gz-button")[0].children[0];
		var right = g(".gz-button")[0].children[1];
		//datajson 返回的json数据
		var datajson;
		var bmr = g(".bm-r")[0];
		var bmt = bmr.children[0];
		var bmb = bmr.children[2];

		var ajax = new XMLHttpRequest();
		ajax.open("POST", "./APi/alldata.php");
		ajax.send();
		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4 && ajax.status == 200) {
				//console.log(ajax.responseText)
				var str = ajax.responseText;
				datajson = JSON.parse(str);
				//由JSON字符串转换为JSON对象
				//console.log(obj.searchbottom[1])
				var resultStr = template('template', datajson);
				//console.log(datajson);
				a.innerHTML = resultStr;
				li[0].innerHTML = "<img src=" + datajson.banner[0].url + " />";
				var newli = ul.children[0].cloneNode(true);
				ul.appendChild(newli);
				bmt.innerHTML = "<img src=" + datajson.bt[0].url + " />";
				bmb.innerHTML = "<img src=" + datajson.bt[1].url + " />"
			}
		}

		

		function autoPlay() {
			n++;
			b++;
			if(n > li.length - 1) {
				ul.style.left = "0px";
				n = 1;
			}
			//var ajax = new XMLHttpRequest();
			//ajax.open("GET", "./APi/alldata.php");
			//ajax.send();
			//ajax.onreadystatechange = function() {
			//if(ajax.readyState == 4 && ajax.status == 200) {
			//var str = ajax.responseText;
			//var datajson = JSON.parse(str);
//			var num = n;
//			if(num > li.length - 2) {
//				num = 0
//			};
//			var url = datajson.banner[num].url;
//			li[n].innerHTML = "<img src=" + url + " alt='1'/>";
			ajax1();
			//}
			//}
			animation(ul, -n * imgwidth, 30);
			if(b > li.length - 2) {
				b = 0;
			}
			for(var i = 0; i < buttonli.length; i++) {
				buttonli[i].className = "";
			}
			buttonli[b].className = "getbg";
		}
		var timer = setInterval(autoPlay, 2000);

		ulFather.onmouseenter = function() {
			clearInterval(timer);
		}
		ulFather.onmouseleave = function() {
			timer = setInterval(autoPlay, 2000);
		}
		left.onclick = function() {
			n--;
			b--;

			var num = n;
			if(n < 0) {
				ul.style.left = -(li.length - 1) * imgwidth + "px";
				n = li.length - 2;
				num = n;
			}
			var url = datajson.banner[num].url;
			li[n].innerHTML = "<img src=" + url + " alt='1'/>";

			animation(ul, -n * imgwidth, 30);
			if(b < 0) {
				b = 4;
			}
			for(var i = 0; i < buttonli.length; i++) {
				buttonli[i].className = "";
			}
			buttonli[b].className = "getbg";
		}
		right.onclick = function() {
			autoPlay();
		}
		for(var i = 0; i < buttonli.length; i++) {
			buttonli[i].index = i;
			buttonli[i].onclick = function() {
				n = b = this.index;
				ajax1();
				animation(ul, -n * imgwidth, 30);
				for(var i = 0; i < buttonli.length; i++) {
					buttonli[i].className = "";
				}
				this.className = "getbg";
			}
		}

		function ajax1() {
			var num = n;
			if(num > li.length - 2) {
				num = 0
			};
			var url = datajson.banner[num].url;
			li[n].innerHTML = "<img src=" + url + " alt='1'/>";
		}

	})()

}

function lunbo(ele){
	var id = document.getElementById(ele);
	var ul = id.getElementsByClassName("imgs")[0];
	var li = ul.getElementsByTagName("li");
	var liwidth = ul.getElementsByTagName("li")[0].offsetWidth;
	var n=0;
	var b=0;
	
	var lilast=li[0].cloneNode(true);
	ul.appendChild(lilast);
	ul.style.width = liwidth*li.length+"px";
	console.log(li.length)
	function autoPlay1(){
		n++;
		b++;
		if(n>li.length-1){
			ul.style.left="0px";
			n=1;
		}
		animation(ul,-n*liwidth,30);
		if(b>li.length-2){
			b=0;
		}
		
	}
	setInterval(autoPlay1,2000)
}
lunbo("lunbo")
function animation(ele, mb, time) {
			clearInterval(ele.time);
			var speed = mb > ele.offsetLeft ? 50 : -50;
			ele.time = setInterval(function() {
				var val = mb - ele.offsetLeft;
				ele.style.left = speed + ele.offsetLeft + "px";
				if(Math.abs(val) < Math.abs(speed)) {
					ele.style.left = mb + "px";
					clearInterval(ele.time);
				}

			}, time)
		}