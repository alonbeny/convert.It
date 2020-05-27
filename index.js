"use strict";

let meter       = new Map();


function Meter(from,value)
{
    this.from = from;
    this.value = value;
}
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) 
      {
        readUnitsFromXml(this);
      }
    };
    xmlhttp.open("GET", "config.xml", true);
    xmlhttp.send();
  }
  
function readUnitsFromXml(xml)
{
    var xmlDoc = xml.responseXML;
    
    x = xmlDoc.getElementsByTagName("base");
    for (i = 0; i< x.length; i++) {
        alert(x[i].childNodes[0].nodeValue);
    }

    /*
    var meters = new Meter("kilo",1000);
    meter.set(meters.from,meters.value);
    //alert(meter.get(meters.from));
    console.log(meters);
    */
}