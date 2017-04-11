const http=require('http');
const nodeio=require('node.io');
const fs=require('fs');

const path=require('path');
const express=require('express');
const app=express();
const server=http.Server(app);
const router=require('express').Router();
const port=8080;

const x=[];
var foo={};
var arr=[];
var res=[];
let headers=[];
headers=['currencypair','ms','bidbigfig','bidpts','offerbigfig','offerpts','high','low','open'];
//console.log(typeof headers);
app.use(express.static(__dirname+'/public'));

app.get('/',function(request,response){
	//response.render('index.html');
	response.sendFile('index.html');
});



app.get('/data',function(request,response){
	//const envelopeFunction=function(){
	nodeio.scrape(function() {
    	this.get('http://webrates.truefx.com/rates/connect.html?f=csv', function(err, data) {
    		if(err){
    			console.log("Error! Could not fetch data!");
    		}
        	const lines = data.split('\n');  //splitting rows
        	lines.pop();
        	lines.pop();
        	//console.log(lines.length);

        	x.push(lines);
        	console.log(x);
        	var line=[];
        	for (var line, i = 0, l = lines.length; i < l; i++) {  ///this works. parses each row
            	line=lines[i].split(',');
            	//console.log(line);
            	for(let j=0;j<line.length;++j){
					var temp={}; 
				//temp={headers[j],elem[j]};
					temp[headers[j]]=line[j];
					res.push(temp);
				}
        	}
   			for(var i=0;i<res.length;++i){
				console.log("this"+res[i]);
			}
     		//fs.writeFileSync("webdata.json", res) ;     //writes to file
     		response.send(res);
        });
    });

});

/*const networkHandler=http.createServer((request,response)=>{
	console.log("res"+res);
	response.end(""+res);
});
*/
server.listen(port,(err)=>{
	if(err){
		return console.log("Oops! Something happened. Cannot proceed!");
	}
	console.log("The server is running on port "+port);
});