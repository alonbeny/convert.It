
let distanceConversionMap = new Map();
let distanceSymbolsMap = new Map();
var numberOfConversionRows = 1;


function Unit(from,value)
{
    this.from = from;
    this.value = value;
}
function Symbols(name, value)
{
    this.value = value;
    this.name = name;
}

function loadXMLDocForDistance() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) 
      {
        readDistanceFromXml(this);
      }
    };
    xmlhttp.open("GET", "distanceConfig.xml", true);
    xmlhttp.send();
  }
  
function readDistanceFromXml(xml)
{

    var xmlDoc = xml.responseText;
    let dom = new DOMParser();
    let baseElement = doc.getElementsByTagName("base");
    for (i = 0; i < baseElement.length; i++)
    {
        var unit = new Unit(baseElement[i].getAttribute("from"), baseElement[i].getAttribute("ratio"));
        distanceConversionMap.set(unit.from, unit.value);
        console.log("from: " + unit.from + " ratio: "+ distanceConversionMap.get(unit.from));
    }
    let symbolsList = doc.getElementsByTagName("symbol");
    for (j = 0; j < symbolsList.length; j++) {
        var symbol = new Symbols(symbolsList[j].getAttribute("name"), symbolsList[j].getAttribute("value"));
        distanceSymbolsMap.set(symbol.name, symbol.value);
        console.log("Name: " + symbol.name + " symbol: " + distanceSymbolsMap.get(symbol.name));

    }
    var keys = distanceConversionMap.keys();
    for (var key of keys) {
        var tree = document.createDocumentFragment();
        var tree2 = document.createDocumentFragment();
        var link1 = document.createElement("a");
        var link1 = document.createElement("a");
        link1.setAttribute("id", distanceConversionMap.get());
        link1.setAttribute("class", "dropdown-item");
        link1.setAttribute("href", "#");
        link1.innerHTML = key + distanceSymbolsMap.get(key); 
        var link = document.createElement("a");
        link.setAttribute("id", distanceConversionMap.get());
        link.setAttribute("class", "dropdown-item");
        link.setAttribute("href", "#");
        link.innerHTML = key + distanceSymbolsMap.get(key); 
        tree.appendChild(link1);
        tree2.appendChild(link);
        document.getElementById("from").appendChild(tree);
        document.getElementById("to").appendChild(tree2);
    }
    
}


function loadXMLDocForTemperature() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            readTemperatureFromXml(this);
        }
    };
    xmlhttp.open("GET", "temperatureConfig.xml", true);
    xmlhttp.send();
    // readUnitsFromXml(xmlhttp)
}

function readTemperatureFromXml(xml) {

    var xmlDoc = xml.responseText;
    let dom = new DOMParser();
    let doc = dom.parseFromString(xmlDoc, "application/xml");
    //DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    //Document doc = dbf.newDocumentBuilder().parse(new InputSource(new StringReader(xmlDoc)));  
    let baseElement = doc.getElementsByTagName("base");
    for (i = 0; i < baseElement.length; i++) {
        var unit = new Unit(baseElement[i].getAttribute("from"), baseElement[i].getAttribute("ratio"));
        temperatureConversionMap.set(unit.from, unit.value);
        console.log("from: " + unit.from + " ratio: " + temperatureConversionMap.get(unit.from));
    }
    let symbolsList = doc.getElementsByTagName("symbol");
    for (j = 0; j < symbolsList.length; j++) {
        var symbol = new Symbols(symbolsList[j].getAttribute("name"), symbolsList[j].getAttribute("value"));
        temperatureSymbolsMap.set(symbol.name, symbol.value);
        console.log("Name: " + symbol.name + " symbol: " + temperatureSymbolsMap.get(symbol.name));

    }
    var keys = temperatureConversionMap.keys();
    for (var key of keys) {
        var tree = document.createDocumentFragment();
        var tree2 = document.createDocumentFragment();
        var link1 = document.createElement("a");
        var link1 = document.createElement("a");
        link1.setAttribute("id", temperatureConversionMap.get());
        link1.setAttribute("class", "dropdown-item");
        link1.setAttribute("href", "#");
        link1.innerHTML = key + temperatureSymbolsMap.get(key);
        var link = document.createElement("a");
        link.setAttribute("id", distanceConversionMap.get());
        link.setAttribute("class", "dropdown-item");
        link.setAttribute("href", "#");
        link.innerHTML = key + temperatureSymbolsMap.get(key);
        tree.appendChild(link1);
        tree2.appendChild(link);
        document.getElementById("from").appendChild(tree);
        document.getElementById("to").appendChild(tree2);
    }

}


function convertDistance(from, to, value) {

    if (from != to) {
        var res = (distanceConversionMap.get(from) / distanceConversionMap.get(to)) * value;
        alert(res);
    }
    else {
        alert("You cannot convert from the same unit");
    }
}

function convertTemperature(from,to,value) {
    var delat = -32;
    if (from != to) {
        if (from == "Fahrenheit") {
            var res = (value + delta) * temperatureConversionMap.get(from);
        }
        else
        {
            var res = (value - delta) * (temperatureConversionMap.get(from) ^ -1);
        }
        alert(res);
    }
    else
    {
        alert("You cannot convert from the same unit");
    }
}

function addDistanceConversionRow() {
    var tree = document.createDocumentFragment();
    var first = document.getElementById('Row' + numberOfConversionRows);
    var itm = first.cloneNode(true);
    itm.id = "Row" + (numberOfConversionRows + 1);
    itm.getElementsByTagName('button')[0].id = "AddButton" + (numberOfConversionRows + 1); 
    document.getElementById('AddButton' + numberOfConversionRows).style.visibility = "hidden";
    document.getElementById('rows').appendChild(itm);
    numberOfConversionRows++;
}
