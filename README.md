A working example - http://kwizzer.parseapp.com/ 

I'm using Parse.com and Express.js for the backend

The parse/cloud folder contains the server side Express.js code
The parse/public folder contains the client side Kwizzer.js code

There are many abstractions that simplify the job of a JavaScript programmer. This project is based on my desire
to build a single page webApp without any abstract frameworks. This entire project is pure JavaScript. 

Why have all that extra code in your work anyway? 

Below is the Hello World that this project is based on.  

	function obj(div, text){
    	this.title = document.createElement(div);
    	this.title.innerText = text;
		document.body.appendChild(this.title);
	}

	var init = new obj("div", "Hello World"); 

I have provided more details in comments of Kwizzer.js

**Intially I just wanted to rebuild the quiz I started last year

https://github.com/MrRyanAlexander/Quiz

