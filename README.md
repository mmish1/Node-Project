# Node-Project

I have implemented both client and server side through node js. 

1. Run "npm install" in the command prompt to install all the dependencies in the package.json file.
2. Run "node app" on the command prompt.
3. Go to localhost:8080 and open the browser console. Every 20 seconds, the data is updated as can be seen here.

File - app.js
On the server side, I have used the "node.io" module to scrape data from the URL given. I then parse the data and store it
as key-value pairs in an array 'res'. I am also using the "app" module to pass this data to the client.

File - index.html
Every 20 seconds, an AJAX call is made to the server and the contents displayed in the browser's console.
