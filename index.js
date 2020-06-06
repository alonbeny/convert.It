
let unitList = [];
let fromUnit;
let toUnit;

function loadUnitConfigFromXML(fileName) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) 
      {
        readUnitsFromXML(this);
      }
    };
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();
  }
  
function readUnitsFromXML(xml)
{

    let parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml.responseText, "text/xml");
    let unitsXML = xmlDoc.getElementsByTagName("unit");

    for (var element of unitsXML) 
    {
        var unit = {
            name: element.getElementsByTagName("name")[0].childNodes[0].nodeValue,
            symbol: element.getElementsByTagName("symbol")[0].childNodes[0].nodeValue,
            ratio: parseFloat(element.getElementsByTagName("ratio")[0].childNodes[0].nodeValue),
            offset: parseFloat(element.getElementsByTagName("offset")[0].childNodes[0].nodeValue)
        }
        unitList.push(unit);
    }
    // Sorting units by ratio
    unitList.sort((u1, u2) => { return u1.ratio - u2.ratio });

    // Generating dropdowns
    createToDropdownMenu("to");
    createToDropdownMenu("from");

    setFromUnit(unitList[0].name);
    setToUnit(unitList[1].name);
}

function createToDropdownMenu(elementId) {
    for (var unit of unitList) {
        var treeFrom = document.createDocumentFragment();
        var link = document.createElement("a");
        link.setAttribute("id", unit.name);
        link.setAttribute("class", "dropdown-item");
        link.setAttribute("href", "#");

        if (elementId == "to") {
            link.setAttribute("onclick", "setToUnit(\"" + unit.name + "\")");
        }
        if (elementId == "from") {
            link.setAttribute("onclick", "setFromUnit(\"" + unit.name + "\")");
        }

        link.innerHTML = unit.name + " [" + unit.symbol + "]";
        treeFrom.appendChild(link);
        document.getElementById(elementId).appendChild(treeFrom);
    }
}

function searchUnitByName(unitName) {
    return unitList.find((u) => (u.name == unitName));
}

function setFromUnit(unitName) {
    fromUnit = searchUnitByName(unitName);
    document.getElementById("from-unit-title").innerHTML = "From: " + fromUnit.name + " [" + fromUnit.symbol + "]";
}

function setToUnit(unitName)
{
    toUnit = searchUnitByName(unitName);
    document.getElementById("to-unit-title").innerHTML = "To: " + toUnit.name + " [" + toUnit.symbol + "]";
}

function convertIt() {
    var userInput = parseFloat(document.getElementById("value").value);
    var calcResult = convert(fromUnit, toUnit, userInput);
    document.getElementById("result").value = calcResult;

    // Handle cookies
    var history = getHistory();

    var current = {
        category: category,
        from: userInput,
        fromUnit: "[" + toUnit.symbol + "]",
        to: calcResult,
        toUnit: "[" + toUnit.symbol + "]"
    };

    // unshift adds elements to the start of an array
    history.unshift(current);
    history = history.slice(0, 20);
    setCookie("history", JSON.stringify(history), 365);
}

function convert(fromUnit, toUnit, userInput) {
    var res = (userInput-fromUnit.offset) * fromUnit.ratio / toUnit.ratio + toUnit.offset;
    return res;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getHistory() {
    var historyString = getCookie("history");
    var history;
    try {
        history = JSON.parse(historyString);
    }
    catch (e) {
        history = [];
    }
    return history;
}

function renderHistoryTable() {
    var row = document.getElementById("history-row");
    var history = getHistory();

    // hide history row if no history found
    if (history.length == 0) {
        row.style.display = "none";
    }

    //else, build row for each history element
    else {
        var frag = document.createDocumentFragment();
        for (i = 0; i < history.length; i++) {
            hisElement = history[i];
            var tr = document.createElement("tr");
            var col1 = document.createElement("td");
            col1.innerHTML ="<strong>" + hisElement.category + "</strong>";
            var col2 = document.createElement("td");
            col2.innerHTML = hisElement.from;
            var col3 = document.createElement("td");
            col3.innerHTML = hisElement.fromUnit;
            var col4 = document.createElement("td");
            col4.innerHTML = hisElement.to;
            var col5 = document.createElement("td");
            col5.innerHTML = hisElement.toUnit;

            tr.appendChild(col1);
            tr.appendChild(col2);
            tr.appendChild(col3);
            tr.appendChild(col4);
            tr.appendChild(col5);

            frag.appendChild(tr);
        }
        document.getElementById("history-table-content").appendChild(frag);
    }
}

