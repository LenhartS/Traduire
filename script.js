window.onload = makeRequest;
var xhr = false;
var xhr2 = false;
//var grps = new Array();
var grps = [];
var grps2 = new Array();
var wrds = [];
var wrds2 = new Array();
var wrds2Eng = new Array();
var wrds2Frch = new Array();
var buttonnode = new Array();
var whichBut = -1;
var d = 0;

//array splice to remove element and splice the array back together - don't leave a hole
//var indexToRemove = 0;
//var numberToRemove = 1;
//arr.splice(indexToRemove, numberToRemove);

//random number between 0 and X
//var randomnumber=Math.floor(Math.random()*11)
//where 11 dictates that the random number will fall between 0-10. To increase the range to, say, 100, simply change 11 to 101 instead.

function makeRequest() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr) {
		xhr.onreadystatechange = showContents;
		xhr.open("GET", "DBQuery.php", true);
		xhr.send(null);
	}
	else {
		document.getElementById("updateArea").innerHTML = "Sorry but I could not create an XMLHttpRequest";
	}
}
	
function showContents() {
	if (xhr.readyState == 4) {
	if (xhr.status == 200) {
		var outMsg = xhr.responseText;
	}
	else {
		var outMsg = "There was a problem with the request " + xhr.status;
	}
	
	//document.getElementById("updateArea").innerHTML = outMsg;
	grps.push(outMsg);
	grps = JSON.parse(grps);
	grps.splice(0, 0, 'Click to Select');   //this inserts a new element in array starting at (first) zero, the 2nd zero is ??, and the value to be inserted is last
	document.getElementById("lostBox").innerHTML += '<select id="listBoxisHere" name="listBoxisHere" onChange="onListBoxChange()">';
	for (var i=0;i<grps.length;i++)
	{ 
		var option = document.createElement('option')
		document.getElementById("listBoxisHere").appendChild(option);
		option.value = grps[i];
		option.appendChild(document.createTextNode(grps[i]));
	}
	}
}

function onListBoxChange() {
	d = document.getElementById("listBoxisHere").value;
	//alert(d);
	document.getElementById("paraInLostBox").innerHTML = "";
	document.getElementById("form1").innerHTML = "";
	document.getElementById("paraInLostBox").innerHTML += d + "<br /> ";
	document.getElementById("transBox").innerHTML = "";
	makeRequest2();
}	

function makeRequest2() {
	if (window.XMLHttpRequest) {
		xhr2 = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr2) {
		xhr2.onreadystatechange = showContents2;
		//alert("d = " + d);
		url = "DBWordsQuery.php?Grp=" + d; //after ? add a variable name  and a value d
		//alert("url = " + url);
		xhr2.open("GET", url, true);
		// $url = "index.php?variable1=".$var1."?variable2=".$var2;  here is how to add more than one variable
		xhr2.send(null);
	}
	else {
		document.getElementById("WordsBox").innerHTML = "Sorry, but I couldn't create an XMLHttpRequest";
	}
}

	
function showContents2() {
	if (xhr2.readyState == 4) {
	if (xhr2.status == 200) {
	//alert("readyState and status = " + xhr2.readyState + "   " + xhr2.status);
	var outMsg2 = xhr2.responseText;
	//alert("outMsg2 = " + outMsg2);
	wrds2.length = 0;
	wrds2Eng.length = 0;
	wrds2Frch.length = 0;
	wrds2 = JSON.parse(outMsg2);
	var j = wrds2.length/2;
	for (var i=0;i<wrds2.length/2;i++) {
		wrds2Eng[i] = wrds2[i];
		wrds2Frch[i] = wrds2[j+i];
	}

	document.getElementById("form1").innerHTML = "";
	for (var i=0;i<wrds2Eng.length;i++) {
		buttonnode[i]= document.createElement('input');
		buttonnode[i].setAttribute('type','button');
		buttonnode[i].setAttribute('name',i);
		buttonnode[i].setAttribute('value',wrds2Eng[i]);
		buttonnode[i].onclick = wrdBut;
		document.getElementById("form1").appendChild(buttonnode[i]);
	}
}
}
}

function wrdBut(evt) {
	whichBut = evt.target.name;
	//alert ("which but = " + whichBut);
	document.getElementById("transBox").innerHTML = "";
	document.getElementById("transBox").innerHTML += "<br />" + "The translation is: " + wrds2Frch[whichBut] + "<br />";
	document.getElementById("form1").innerHTML = "";
	for (var i=0;i<wrds2Eng.length;i++) {
		buttonnode[i]= document.createElement('input');
		buttonnode[i].setAttribute('type','button');
		buttonnode[i].setAttribute('name',i);
		buttonnode[i].setAttribute('value',wrds2Eng[i]);
		buttonnode[i].onclick = wrdBut;
		document.getElementById("form1").appendChild(buttonnode[i]);
	}
}


