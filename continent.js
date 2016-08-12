var fs = require('fs');
var filedata = fs.readFileSync("gdp.csv");
   var datatoString=filedata.toString();
   var myArray= datatoString.split('\r\n');
   var header=myArray[0].split(',');
   var row=myArray.length;
   var col=header.length;
   var jArray=[];
   var Cont_Array=[];
   var pop15 = header.indexOf("Population (Millions) 2015");
   var gdp15 = header.indexOf("GDP Billions (USD) 2015");
   var pop13 = header.indexOf("Population (Millions) 2013");
   var gdp13 = header.indexOf("GDP Billions (USD) 2013");
   var ppp13 = header.indexOf("Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013");
   var continents = [
     ["Asia","Africa","Australia","NorthAmerica","SouthAmerica","Europe"],
     ["China","India","Indonesia","Japan","Republic of Korea","Saudi Arabia"],
     ["South Africa"],
     ["Australia"],
     ["Canada","Mexico","USA"],
     ["Argentina","Brazil"],
     ["France","Germany","Italy","Russia","Turkey","United Kingdom","European Union"]];

pop = [0,0,0,0,0,0];
gdp = [0,0,0,0,0,0];
console.log(continents.length);

/*---------------Aggregating population and gdp based on continents-------------------*/
for (var j = 0; j < continents.length; j++) {
for (var k = 0; k < continents[j].length; k++) {
  for (var i = 1; i < row-1; i++) {
    var myNewLine=myArray[i].split(',');
    if(myNewLine[0] === continents[j][k]){
        pop[j-1] = parseFloat(pop[j-1]) + parseFloat(myNewLine[pop15]);
        gdp[j-1] = parseFloat(gdp[j-1]) + parseFloat(myNewLine[gdp15]);
    }
  }
}
}
/*-----------------Converting aggregte data to json file---------------------*/
var obj1 = {};
for (var i = 0; i < continents[0].length; i++) {
  cont_key = 'Continent';
  cont_value = continents[0][i];
  pop_key = 'Population';
  pop_value = pop[i];
  gdp_key = 'GDP 2015';
  gdp_value = gdp[i];
  obj1[cont_key] = cont_value;
  obj1[pop_key] = pop_value;
  obj1[gdp_key] = gdp_value;
  Cont_Array.push(obj1);
var obj1 = {};

}
  console.log(Cont_Array);
  fs.writeFile( "aggregate.json", JSON.stringify( Cont_Array ), "utf8");

  c2j(pop13,"pop.json");
  c2j(gdp13,"gdp.json");
   c2j(ppp13,"ppp.json");


   /*----------function to convert csv to json file--------------*/
   function c2j(index,filename){
   jArray=[];
   var i=0,j=0;
   for (i = 1; i < row-3; i++) {
      var obj = {};
      var myNewLine=myArray[i].split(',');
      for (j = 0; j< col; j++) {
        key = header[0];
        value = myNewLine[0];
        key1 = header[index];
        value1 = myNewLine[index];
        obj[key] = value;
        obj[key1] = value1;
      };
        jArray.push(obj);

};
jArray.sort(function(a,b){
  return parseFloat(b[key1])-parseFloat(a[key1]);
})

console.log( jArray);
fs.writeFile( filename, JSON.stringify( jArray ), "utf8");

}
