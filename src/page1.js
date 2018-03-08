let b = document.getElementById("time");
setInterval(function(){
	let a = new Date;
	b.innerHTML = a.getSeconds()+"1";

}, 100);