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
				bmb.innerHTML = "<img src=" + datajson.bt[1].url + " />";

				var resultStr1 = template('pic', datajson);
				var cg = g(".cg")[0];
				cg.innerHTML = resultStr1;
				lunbo("lunbo");
				var resultStr3 = template('shop', datajson);
				var shop = g(".hor")[0].children[0];
				shop.innerHTML = resultStr3;
				var resultStr4 = template('icon', datajson);
				var icon = g(".theapp")[0].children[0];
				icon.innerHTML = resultStr4;

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
		var timer = setInterval(autoPlay, 5000);

		ulFather.onmouseenter = function() {
			clearInterval(timer);
		}
		ulFather.onmouseleave = function() {
			timer = setInterval(autoPlay, 5000);
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

function lunbo(ele) {
	var id = document.getElementById(ele);
	var ul = id.getElementsByClassName("imgs")[0];
	var banner = id.getElementsByClassName("gz-banner")[0];
	var li = ul.getElementsByTagName("li");
	var liwidth = ul.getElementsByTagName("li")[0].offsetWidth;
	var n = 0;
	var em = g("#em");
	var b = 1;
	var button = id.getElementsByClassName("gz-button")[0];
	//console.log(button)
	var buttonl = button.children[0];
	var buttonr = button.children[1];
	var lilast = li[0].cloneNode(true);
	ul.appendChild(lilast);
	ul.style.width = liwidth * li.length + "px";
	//console.log(li.length)
	function autoPlay1() {
		n++;
		b++;
		if(n > li.length - 1) {
			ul.style.left = "0px";
			n = 1;

		}
		if(b > li.length - 1) {
			b = 1
		}
		em.innerHTML = b;
		animation(ul, -n * liwidth, 30);

	}
	var tt = setInterval(autoPlay1, 3000);
	buttonl.onclick = function() {
		n--;
		b--;
		if(n < 0) {

			n = li.length - 2;
			ul.style.left = -(li.length - 1) * liwidth + "px";

		}
		if(b < 1) {
			b = 6
		}
		em.innerHTML = b;
		animation(ul, -n * liwidth, 30);

	}
	buttonr.onclick = function() {
		autoPlay1();
	}
	banner.onmouseenter = function() {
		clearInterval(tt)
	}
	banner.onmouseleave = function() {
		tt = setInterval(autoPlay1, 3000);
	}

}

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

function hover(ele) {
	var outbox = g(ele)[0];
	var hovertop = outbox.getElementsByClassName("bt")[0].children[0].children;
	var hoverbottom = outbox.getElementsByClassName("bb")[0].children;
	for(var i = 0; i < hovertop.length; i++) {
		hovertop[i].index = i;
		hovertop[i].bool = true;
		hovertop[i].onmouseenter = function() {
			var jj = this.index;
			//console.log(this.index)
			if(this.bool) {
				this.bool = false;
				var hoverajax = new XMLHttpRequest();
				hoverajax.open("POST", "./APi/hover.php");
				hoverajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				hoverajax.send("index1=" + jj);
				hoverajax.onreadystatechange = function() {
					if(hoverajax.status == 200 && hoverajax.readyState == 4) {
						var str = hoverajax.responseText;
						var datajson2 = JSON.parse(str);
						var resultStr2 = template('hovershow', datajson2);
						hoverbottom[jj].innerHTML = resultStr2;

					}
				}
			}

			for(var j = 0; j < hoverbottom.length; j++) {
				hoverbottom[j].style.display = "none";

			}
			hoverbottom[jj].style.display = "block";
		}
	}

}
hover(".br-b");
//background 修改
var jinlinbg = g(".smallbox")[0].getElementsByTagName("span");
//console.log(jinlinbg)
for(var i = 0; i < jinlinbg.length; i++) {
	jinlinbg[i].style.background = "url(./public/images/jinlin.png) 0px " + (-i * 44) + "px no-repeat";
}

var bodyheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var twobox = g(".twobox")[0];
twobox.a = true;
//var boxtop = twobox.offsetTop;
//var scrollbool = true;
var three = g(".three")[0];
//var threeboxtop = three.offsetTop;
three.a = true;
//window.onscroll = function() {
//	var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
//	if(scrollbool) {
//		if(bodyheight > boxtop || scrolltop + bodyheight > boxtop) {
//			scrollbool = false;
//			var tryajax = new XMLHttpRequest();
//			tryajax.open("GET", "./APi/newHTML.php");
//			tryajax.send();
//			tryajax.onreadystatechange = function() {
//				if(tryajax.status = 200 && tryajax.readyState == 4) {
//					var str = tryajax.responseText;
//					//console.log(str);
//					//twobox = g(".twobox")[0];
//					twobox.innerHTML = str;
//
//				}
//			}
//		}
//	}
//
//}
var search211 = g(".search")[0];
var searchpar = search211.parentElement;
var toptopfather = searchpar.parentElement;
var title = g(".title")[0];
var titletop = g(".title")[0].offsetTop;
var img211 = g(".logoimg")[0];
var navbar = g(".navbar")[0];
var navbarheight = navbar.offsetTop;
window.onscroll = function() {
	scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	if(scrolltop > titletop) {
		toptopfather.className = "white clearfloat fixed";
		title.style.marginTop = "131px";
		img211.src = "public/images/logo2.png";
	} else {
		toptopfather.className = "white clearfloat";
		title.style.marginTop = "0px";
		img211.src = "public/images/logo.png";
	}
	gundong(twobox, bodyheight, scrolltop);
	gundong(three, bodyheight, scrolltop);
	if(scrolltop > navbarheight - 85) {
		navbar.style.position = "fixed";
		navbar.style.top = "85px";
	} else {
		navbar.style.position = "absolute";
		navbar.style.top = "837px";
	}

}

function gundong(ele, bodyheight, scrolltop) {
	var boxtop = ele.offsetTop;
	if(ele.a) {
		if(bodyheight > boxtop || scrolltop + bodyheight > boxtop) {
			ele.a = false;
			var tryajax = new XMLHttpRequest();
			tryajax.open("GET", "./APi/newHTML.php");
			tryajax.send();
			tryajax.onreadystatechange = function() {
				if(tryajax.status = 200 && tryajax.readyState == 4) {
					var str = tryajax.responseText;
					//console.log(str);
					//twobox = g(".twobox")[0];
					ele.innerHTML = str;

				}
			}
		}
	}
}
gundong(twobox, bodyheight, 0);
gundong(three, bodyheight, 0);
//右边导航栏点击反应
var color = ["#8d7afb", "#f05", "#a8c001", "#ff4400"];
var navli = navbar.getElementsByTagName("li");
var boxbox = g(".twobox");
for(var i = 0; i < navli.length; i++) {
	navli[i].index = i;
	navli[i].style.color = color[i];

	switch(i) {
		case 0:
			navli[i].onclick = function() {
				scrollbox(0, 30);
			}
			break;
		case 1:
			navli[i].onclick = function() {
				scrollbox(twobox, 30);
			}
			break;
		case 2:
			navli[i].onclick = function() {
				scrollbox(three, 30);
			}
			break;
		case 3:
			navli[i].onclick = function() {
				scrollbox(0, 30);
			}
			break;
	}

}

function scrollbox(ele, ms) {
	clearInterval(time);

	if(ele == 0) {
		var time = setInterval(function() {
			var step = (0 - scrolltop) / 5;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			scrolltop = scrolltop + step;
			window.scrollTo(0, scrolltop);
			if(Math.abs(0 - scrolltop) <= Math.abs(step)) {
				window.scrollTo(0, 0);
				clearInterval(time);
			}

		}, ms)
	} else {
		ele.offsetTop1 = ele.offsetTop - 50;
		var time = setInterval(function() {
			var step = (ele.offsetTop1 - scrolltop) / 5;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			scrolltop = scrolltop + step;
			window.scrollTo(0, scrolltop);
			if(Math.abs(ele.offsetTop1 - scrolltop) <= Math.abs(step)) {
				window.scrollTo(0, ele.offsetTop1);
				clearInterval(time);
			}

		}, ms)
	}

}