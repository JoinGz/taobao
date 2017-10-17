function g(abc) {
	var first = abc.charAt(0);
	var end = abc.slice(1);
	if(first == "#") {
		return document.getElementById(end);
	} else if(first == ".") {
		console.log(end);
		return document.getElementsByClassName(end);
	} else {
		end = abc;
		return document.getElementsByTagName(end);
	}
}

function changBg() {
		var a = g(".search-up")[0];
		var alla = a.getElementsByTagName("a");
		for(var i =0 ;i<alla.length; i++){
			alla[i].index = i;
			alla[i].onclick = function(){
				for(var j =0 ;j<alla.length;j++){
					//alla[j].style.background ="white";
					alla[j].className="";
				}
				if(this.index=="1"){
					//this.style.background = "rgba(255, 0, 54, 1)";
					this.className="rmbg";
				}else{
					//this.style.background = "#f40";
					this.className="getbg";
				}
			}
		}
	}

changBg();

var input = g("#search");
input.onkeydown=function(){
	var inputfather = document.getElementsByClassName("search-middle")[0];
	inputfather.children[1].style.display = "none";
	inputfather.children[2].style.display = "none";
	
}
input.onkeyup=function(){
	var value = input.value;
	if(value===""){
		var inputfather = document.getElementsByClassName("search-middle")[0];
		inputfather.children[1].style.display = "block";
	inputfather.children[2].style.display = "block";
	}
}
