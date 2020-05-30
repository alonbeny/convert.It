
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
            ratio: Number(element.getElementsByTagName("ratio")[0].childNodes[0].nodeValue)
        }
        unitList.push(unit);
    }
    // Sorting units by ratio
    unitList.sort((u1, u2) => { return u1.ratio - u2.ratio });

    // Generating dropdowns
    createToDropdownMenu("to");
    createToDropdownMenu("from");

    fromUnit = unitList[0];
    toUnit = unitList[1];
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

function setToUnit(unitName)
{
    fromUnit = searchUnitByName(unitName);
}

function setFromUnit(unitName) {
    toUnit = searchUnitByName(unitName);
}

function convertIt() {
    var userInput = document.getElementById("value").value;
    var calcResult = convert(fromUnit, toUnit, userInput);
    document.getElementById("result").value = calcResult;

}

function convert(fromUnit, toUnit, userInput) {
    var res = userInput * fromUnit.ratio / toUnit.ratio;
    return res;
}