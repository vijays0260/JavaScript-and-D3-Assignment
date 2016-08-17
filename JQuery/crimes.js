const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
input: fs.createReadStream('crime.csv')
});
var counter = 0;
var jArray=[];
var header=[];
var arr=[];
var ind;
var final_obj={};
var index_countryname,index_Description,index_year,index_value;
var uv = 0;
var av = 0;


rl.on('line', function (line) {
if (counter === 0)
{
header=line.split(',');
index_Description = header.indexOf('Description');
index_year = header.indexOf('Year');

 counter = 1;
}

  var myNewLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);




if((myNewLine[index_Description] =="OVER $500"||myNewLine[index_Description] =="$500 AND UNDER"))
{
  //console.log("+++++++++++++++");

  if(arr.length==0)
  {

    var objj={};
    objj["year"]=myNewLine[index_year];
    //console.log(myNewLine[3]);
    if(myNewLine[index_Description]=="$500 AND UNDER")
    {
      objj["Under"]=uv++;
      objj["Above"]=0;

      //console.log(objj);
    }
    else if(myNewLine[index_Description]=="OVER $500")
    {
      objj["Above"]=av++;
      objj["Under"]=0;


    }
    arr.push(objj);
    //console.log(arr);
  }
  else
  {

    for(ind=0;ind<arr.length;ind++)
    {

      if(arr[ind].year==myNewLine[index_year])
      {
        if(myNewLine[index_Description]=="$500 AND UNDER")
        {
          arr[ind]["Under"]=uv++;
        }
        else if(myNewLine[index_Description]=="OVER $500")
        {
          arr[ind]["Above"]=av++;
        }
        break;
      }
    }
    if(ind==arr.length)
    {
      var objj={};
      objj["year"]=myNewLine[index_year];
      if(myNewLine[index_Description]=="$500 AND UNDER")
      {
        objj["Under"]=uv++;
        objj["Above"]=0;
      }
      else if(myNewLine[index_Description]=="OVER $500")
      {
        objj["Above"]=av++;
        objj["Under"]=0;
      }
      arr.push(objj);
    }
  }
}

});

rl.on('close', function (){

arr.sort(function(a,b){
  return a.year-b.year;
});
console.log(arr);
var obj2=JSON.stringify(arr);
//console.log(obj2);
fs.writeFile('second1.json',obj2);

var newObj= new Object();
for(i=0;i<arr.length;i++)
{ //console.log(i);
  newObj[i+1]=arr[i];
   //console.log(obj);
}

console.log(newObj);
var obj2=JSON.stringify(newObj);
//console.log(obj2);
fs.writeFile('second.json',obj2);

});
