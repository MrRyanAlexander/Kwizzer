//starts wrap annonymous 
(function(){

(function(){

var Kwizzer = {};
Kwizzer.WEBSITE = 'http://kwizzer.parseapp.com';
Kwizzer.CREATOR = 'Ryan Alexander';
Kwizzer.CONTACT = 'ryan@ryan-alex.com';
Kwizzer.VERSION = '0.0.1';

console.log("Thanks for trying out Kwizzer v",Kwizzer.VERSION);
console.log("If you have any questions you can email me at ",Kwizzer.CONTACT);
console.log("If something is wrong click here",Kwizzer.WEBSITE);


/* 
      There are many abstractions that simplify the job of a JavaScript programmer. This project is based on the idea and my
      own personal belief that this language is actually very simple to work with and that you don't really need to reuse a
      framework that someone else hand coded. 

      Why have all that extra code in your work anyway? 

      Below is the Hello World that this project is based on.  

      function obj(div, text){
        this.title = document.createElement(div);
        this.title.innerText = text;
        document.body.appendChild(this.title);
      }

      var init = new obj("div", "Hello World");                      
*/

/**************************
I have intentionally used some strange stuff in this project to show the following :

- different ways to create and ecapsulate objects, vars, functions, constructors, etc...

- the scope, how to use self to access the global properties and more...

- that is really isn't that hard to hand code some of these things on your own...

& if you find this helpful, please let me know... Thanks :)
***************************************************/

var Model = Kwizzer.Model = {
  //main model data
  data : function (method, url, id, sync, data, callback) {
    if (id !== null)
    {
      url = url+id;
    }
    Kwizzer.Model.asycXMLload(method, url, sync, data, function(theData){
      Kwizzer.Model.parseData(theData, function(theData){
        callback(theData);
      }, function(error){
        console.log("Something is wrong; flying glass");
      });
      
    }, function(error) {
      console.log("Something is all jacked up; beware of magic!");
    });
  },
  //parses model data
  parseData : function (data, cb) {
    var json =  JSON.parse(data);
    cb(json)//sets up a callback
  },
  //loads model data
  asycXMLload : function(method, url, sync, data, callback) {
    var xmlhttp;
    /*http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery*/
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var response;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           if(xmlhttp.status == 200){
            //var data = xmlhttp.responseText;
            //Kwizzer.Model.parseData(data);
            if(method === 'GET') {
              callback(xmlhttp.responseText);
              //response = xmlhttp.responseText;
            }else{
              console.log("completed...");
            }
           }
           else if(xmlhttp.status == 400) {
            console.log('There was an processiong your request');
            //Kwizzer.Model.didNotGetData(xmlhttp.error);
           } else {
            console.log("There was an processiong your request")
            //Kwizzer.Model.didNotGetData(xmlhttp.error);
           }  
        }
    }
    
    if (method == 'POST') {
      xmlhttp.open(method, url, sync);
      xmlhttp.setRequestHeader('Content-type', 'application/json');
      xmlhttp.send(JSON.stringify(data));
    }else if (method == 'PUT') {
      xmlhttp.open(method, url, sync);
      xmlhttp.setRequestHeader('Content-type', 'application/json');
      xmlhttp.send(JSON.stringify(data));
    }else if (method == 'DELETE') {
      xmlhttp.open(method, url, sync);
      xmlhttp.send();
    }else{//must be get
      xmlhttp.open(method, url, sync);
      xmlhttp.send();
    }
  }
};
var KwizView = Kwizzer.KwizView = {
  
  loadView : function (kwiz,index) {
    //private //Constructor
    function Kwiz(data,index) {
      var self = this;                                                                  //keeps the scope

      this.index = 0;                                                                   //start the index
      this.ONE =  1;                                                                    //1 value constant
      this.ZERO =  0;                                                                   //0 value constant

      this.id = data.kwiz.objectid;                                                     //sets the object id 
      //this.getsLocalStorage = localStorage.getItem(JSON.parse(kwiz.id));              //gets the local saved data
      //this.setsLocalStorage = localStorage.setItem(kwiz.id, JSON.stringify(kwiz));    //sets the save data locally
      this.creationData = data.kwiz.date;                                               //sets the created at date
      this.questions = data.kwiz.questions;                                             //sets the questions; w/choices

      /* 
        A quick note: The order the elements are create in and appended to one another in, is VERY important.
        Notice the order and that in some cases the elements are being appended to one another before being
        filled with content. This is because the DOM needs to know what elements exist and in what order they 
        need to appear, before it knows what content to fill them with. Attributes can be set after any element
        is created because the DOM doesn't use this data to make changes. To kick off the element creation, the 
        first thing to do is make sure the top parent element is emmpty. Here, all that needs to be done is
        setting the homes main element html to an empty string and off it goes. 
      */

      this.home = document.getElementById("main");                                      //gets the existing home element
      this.home.innerHTML = ""                                                          //removes left overs in main
     
      this.title = document.createElement("h1");                                        //creates the title elemenet
      this.title.setAttribute("class", "title");
      this.title.setAttribute("id", "title");
      this.title.innerText = data.kwiz.title;
      this.home.appendChild(this.title);
      
      this.form = document.createElement("form");                                       //creates the form element                                              
      this.form.setAttribute("class", "kwiz")
      this.form.setAttribute("id", "kwizForm");                                         
      this.home.appendChild(this.form);

      this.question = document.createElement("h2");                                     //creates the question element                                              
      this.question.setAttribute("class", "kwiz");
      this.question.setAttribute("id", "question");

      if ( !this.questions[this.index] ){                                               //initial load check for question
        this.question.innerText = "No Question";
      }else if ( !this.questions[this.index][this.ZERO] ){
        this.question.innerText = "No Question";
      }else{
        this.question.innerText = this.questions[this.index][this.ZERO];
      }
      this.form.appendChild(this.question);

      this.choiceEL = document.createElement("ul");                                     //creates the choice element
      this.choiceEL.setAttribute("id", "choices");
      this.form.appendChild(this.choiceEL);

      if (!this.questions[this.index]) {
        //skips the whole if for loop because their aren't even questions
        this.choice = document.createElement("li");
        this.choice.setAttribute("class", "kwiz choice");
        this.choice.setAttribute("id", "choice");
        this.choice.innerText = "Why take a kwiz without questions? Cick PREV or NEXT";
        this.choiceEL.appendChild(this.choice);                                             //makes sure there is a question
      }else{  
        //makes sure there are choices with the question
        if (!this.questions[this.index][this.ONE]) {
          //skips creating the choice objects array because their aren't any to create
          this.choice = document.createElement("li");
          this.choice.setAttribute("class", "kwiz choice");
          this.choice.setAttribute("id", "choice");
          this.choice.innerText = "There don't seem to be any choices.";
          this.choiceEL.appendChild(this.choice);
        }else{
          //shortens access to all the choices for code below
          this.choices = this.questions[this.index][this.ONE];
          //then creates the choice objects array
          for(c in this.choices) {
            this.choice = document.createElement("li");
            this.choice.setAttribute("class", "kwiz choice");
            this.choice.setAttribute("id", "choice"+c);
            this.choice.setAttribute("txtans", c);
            this.choice.innerText = this.choices[c];
            this.choiceEL.appendChild(this.choice);
            //registers click hander
            this.choice.onclick = function(e) { 
              e.preventDefault();
              var answer;
              if (e.srcElement === undefined){
                answer = e.originalTarget.attributes.txtans.value;
              } else {
                answer = e.srcElement.attributes.txtans.textContent;
              }
              alert(answer);
            }
          }
        }
      }

      this.prevBtn = document.createElement("input");                                  //creates the previous question button
      this.prevBtn.setAttribute("class", "kwiz btn prev");
      this.prevBtn.setAttribute("id", "prev");
      this.prevBtn.setAttribute("type", "button");
      this.prevBtn.setAttribute("value", "PREV");
      this.form.appendChild(this.prevBtn);

      this.prevBtn.onclick = function(e) { 
        e.preventDefault();
        if(self.index > self.ZERO){
          self.index--;
          self.update();
        }                                         //registers click handler
      }

      this.nextBtn = document.createElement("input");                                 //creates the next question button
      this.nextBtn.setAttribute("class", "kwiz btn prev"); 
      this.nextBtn.setAttribute("id", "next");
      this.nextBtn.setAttribute("type", "button");
      this.nextBtn.setAttribute("value", "NEXT");
      this.form.appendChild(this.nextBtn);

      this.nextBtn.onclick = function(e) { 
        e.preventDefault();
        if(!self.questions[self.index]) {
          //no questions left
          console.log("blank");
        }else if(self.index < self.questions[self.index].length) {
          self.index++;
          self.update();
        }                                         //registers click handler
      }  

      this.update = function() {
        //update question
        self.question.innerText = self.questions[self.index][self.ZERO];
        //resets the innerHTML of the UL
        self.choiceEL.innerText = '';
        //creates the new choice object list
        for (c in self.questions[self.index][self.ONE]){
          self.choice = document.createElement("li");
          self.choice.setAttribute("class", "kwiz choice");
          self.choice.setAttribute("id", "choice"+c);
          self.choice.setAttribute("txtans", c);
          self.choice.innerText = self.questions[self.index][self.ONE][c];
          self.choiceEL.appendChild(self.choice);
          //registers click hander
          self.choice.onclick = function(e) { 
            e.preventDefault();
            var answer;
            if (e.srcElement === undefined){
              answer = e.originalTarget.attributes.txtans.value;
            } else {
              answer = e.srcElement.attributes.txtans.textContent;
            }
            alert(answer);
          }
        }                                                    //updates the question and choices
      }
    }                                                                                 //end constructor
    var _kwiz = new Kwiz(kwiz, index);                                                //instansiates the prototype
    Object.preventExtensions(_kwiz);                                                  //disables extentions
  },
  saveAnswer : function () {

  },
  destroy : function (nodes) {
    //remove all the html
    document.body.getElementById("main").innerHTML = "";
    //try to destroy all the nodes
    if (nodes) {
      nodes = null || undefined;
    }
  }, 

  removeView : function () {
    //since everything created in code appends to the 
    //div with the id="main", all self needs to happe
    document.getElementById("question").innerHTML = "";
    document.getElementById("choices").innerHTML = "";
  }
}; 
var KwizzezView = Kwizzer.KwizzezView = {

  loadView : function (data) {

    function kList(data){
      this.kwizzes = data.kwizzes;
      this.kwiz = document.getElementById("main");

      for(k in this.kwizzes) {
        this.kwizzesEL = document.createElement("li");
        this.kwizzesEL.setAttribute("class", "link");
        this.kwizzesEL.setAttribute("href", "/kwizzez/"+data.kwizzes[k].objectId);
        this.kwizzesEL.setAttribute("objectId", data.kwizzes[k].objectId);
        this.kwizzesEL.setAttribute("index", k);

        this.kwizzesEL.innerText = data.kwizzes[k].title;
        this.kwiz.appendChild(this.kwizzesEL);

        this.kwizzesEL.onclick = function(e) { 
          e.preventDefault();
          var id;
          var index;
          if (e.srcElement === undefined){
            id = e.originalTarget.attributes.objectid.value;
            index = parseInt(e.originalTarget.attributes.index.value);
          } else {
            id = e.srcElement.attributes.objectid.value;
            index = parseInt(e.srcElement.attributes.index.value);
          }
          //window.location = "http://kwizzer.parseapp.com"+e.srcElement.attributes.href.textContent;
          Kwizzer.Controller.routeView(Kwizzer.KwizzezView, Kwizzer.KwizView,'GET', id, index, null); 
        }
      }
    }
    var _kList = new kList(data);                                                  //instansiates the prototype
    Object.preventExtensions(_kList);

  },
  removeView : function () {
    document.getElementById("main").innerHTML = ""
  } 
};    
var Controller = Kwizzer.Controller = {
  //configures initial state
  initialize : function() {
    Kwizzer.Controller.routeView(null, Kwizzer.KwizzezView, 'GET', null, null);
  },
  //routes incoming view requests
  routeView : function(oldView, newView, method, id, index, data) {
    Kwizzer.Controller.routeData(method, id, data, function(theData){
      if (oldView !== null){
        oldView.removeView();// = null;
      }
      newView.loadView(theData, index);
    });
  }, 
  //routes incoming data requests
  routeData : function(method, id, data, callback) {
    //method = get, post,put,delete
    //theData : null,
    //(method, url, id, sync, data, callback)
    if (method === 'GET' && id == null){
      Kwizzer.Model.data('GET', '/kwizzez', null, true, null, function(theData){
        callback(theData);
      }, function(/*error*/) {
        console.log("get failed");
      });
    }else if(method === 'GET' && id != null){
      Kwizzer.Model.data('GET', '/kwizzez/', id , true, null, function(theData){
        callback(theData);
      }, function(/*error*/) {
        console.log("get by id failed");
      });
    }else if(method === 'POST'){
      var modelData = {title:"Hello 1046", question:"What city do you choose?", choices:["Baltimoe","Knoxville","Miami"], answer:"Miami"};
      Kwizzer.Model.data('POST', '/kwizzez/new', null, true, modelData, function(response){
        callback(response);//response should be blank
      }, function(error) {
        console.log("post failed");
      });
    }else if(method === 'PUT' && id != null){
      //when set to PUT, everything works accept the ARRAY won't update?
      var modelData = {title:"Hello 1046", question:"What city do you choose?", choices:["Baltimoe","Knoxville","Miami"], answer:"Miami"};
      Kwizzer.Model.data('PUT', '/kwizzez/', id, true, modelData, function(response){
        callback(response);//response should be blank
      }, function(error) {
        console.log("put failed");
      });
    }else if(method === 'DELETE' && id != null){
      Kwizzer.Model.data('DELETE', '/kwizzez/', id, true, modelData, function(response){
        callback(response);//response should be blank
      }, function(error) {
        console.log("delete failed");
      });
    }else{
      console.log("method parameter required; try again");
    }
  }
};

Kwizzer.Controller.initialize();

})();

})();
//ends  wrap annonymous