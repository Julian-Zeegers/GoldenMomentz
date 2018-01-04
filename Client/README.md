# WotIf.WebApp
The frontend for the Wot-If? project

> Wot-If? was born out of a company called Da Vinci SEED in 2013 to:
> 
> Maximise B-BBEE contributions of clients by conceptualising, implementing and evaluating SED (Socio-Economic Development) and ED (Enterprise Development) initiatives . Wof-If? has since included SD (Supplier Development) to its portfolio. In the past 3 years, Wot-If? has incubated & accelerated numerous businesses in Diepsloot.
> 
> Mentoring, monitoring & monetizing emerging entrepreneurs to bridge people into the world of work using various programmes and showcases.'' - https://www.facebook.com/wotiftrust/

# Developers
## Set Up
### The web application
First clone this repository to anywhere on your computer. Once you have done this, move on to the instructions for NodeJS.

### NodeJS and AngularCLI
>Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world. - https://nodejs.org/en/

+ Go to https://nodejs.org/en/ and download the current version of Node (not the one that is recommended for most users).
+ Once you have installed Node, make sure that it has been added to your path by opening a new terminal and typing "node -v". This will tell you your version of Node.
+ Also make sure that npm is now added to the path by typing "npm -v" to see your version of npm.
+ Now open a terminal in the root of your copy of the Wot-If? web applcation (not in the src folder) and type "npm install". This will use the node package manager to resolve all the dependencies for the web application.
+ Now type "npm install -g @angular/cli" to allow you to use Angular commands in your terminal.

### Building a distribution folder with the Angular CLI (NOT NECESSARY FOR DEV)
Now that we have our web application and the Angualr CLI installed, we can move on to bundling our web application into something that Nginx (next step) can use.

+ Navigate to the folder which contains your web applicantion. Example: .../documents/WotIf.WebApp/
+ Open a terminal in this folder (shift + right click => open terminal here).
+ Type ng build --prod
+ This will build your web application and create a folder called dist located at .../documents/WotIf.WebApp/dist. (This is where Nginx must be set to point to).

### Nginx (NOT NECESSARY FOR DEV)
> NGINX is a free, open-source, high-performance HTTP server and reverse proxy, as well as an IMAP/POP3 proxy server. NGINX is known for its high performance, stability, rich feature set, simple configuration, and low resource consumption. - https://www.nginx.com/resources/wiki/

+ First go to http://nginx.org/en/download.html and download the latest stable version of Nginx.
+ Once you have unzipped Nginx, go to the conf folder, and edit nginx.conf to look like the following:
```
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    upstream dev-wotif  {
        server localhost:33333;
    }
    server {
        listen   8090;
        root "C:\HomeFolders\david.kroukamp\My Documents\Visual Studio 2015\Projects\WotIf.WebApp\dist";
        index index.html;
        server_name localhost;
        location / {
            try_files $uri /index.html;
        }
        location /api {
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header Host $host;
            proxy_pass http://dev-wotif;
        }
    }
}
```
+ Make sure that the root element in nginx.conf is pointing to your own local copy of the web application src folder, and not mine!
+ Open a terminal in the root of the Nginx folder, and type "start nginx". (Make sure that nginx is then running in your task manager, if not, then something is broken).
Once you have Nginx working, move on to the instructions for NodeJS and Webpack.

### Running the website
From the root of your web application folder, open up a command window and type "ng serve". This will use Angular's built-in settings for Webpack to host the web application locally.

You can navigate to the website by opening your browsing and going to http://localhost:4200 (unless you have changed the default port).

"ng serve" supports hot reloading, which means that as you make changes to the frontend code and save them, Angular will rebuild your application and automatically refresh the page in the browser.


## Logging in
Once you have your application up and running, you'll notice that navigating to http://localhost:4200 takes you to a login page. These steps explain how to create a user so that you are able to log in to the website:
+ Make sure that you have followed the instructions for the Wot-If? backend solution.
+ Run the Wot-If? backend solution.
+ In your browser, navigate to Swagger (http://localhost:33333/swagger/ui).
+ Under the "Register" controller, click on the "Register" endpoint.
+ Click the example template on the righthand side to insert the template for you. Change the values to be what you'd like.
+ Click "Try it out" to send the request to the backend and create a user.
+ You can verify that the user was created by looking in the User table in the WotIf database and checking that the entry is there.
+ You can now log in to the website using the credentials that you just used to create the user.
