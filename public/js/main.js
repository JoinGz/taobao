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

window.onload = function(){
	(function(){
		var a = g(".search-bottom")[0];
		//var alla = a.getElementsByTagName("a");
		//console.log(alla);
		var ajax = new XMLHttpRequest();
		ajax.open("POST","./APi/alldata.php");
		ajax.send();
		ajax.onreadystatechange = function (){
			if(ajax.readyState==4&&ajax.status==200){
				//console.log(ajax.responseText)
				var str = ajax.responseText;
				var obj = JSON.parse(str); //由JSON字符串转换为JSON对象
				//console.log(obj.searchbottom[1])
				var resultStr = template('template',obj);
				//console.log(resultStr);
				a.innerHTML=resultStr;
				
			}
		}
	})()
}
