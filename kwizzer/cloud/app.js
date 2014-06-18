var express = require('express');
var kwizControl = require('cloud/kwizzes.js');

//SETUP THE APP
var app = express();
app.use(express.bodyParser());

//GET API
app.get('/kwizzez', kwizControl.index);
//POST API
app.post('/kwizzez/new', kwizControl.new);

/*--BELOW THIS LINE MAY BE BROKEN --*/

//GET ID API
app.get('/kwizzez/:id', kwizControl.show);
//PROBABLY GONNA REMOVE THIS ONE
app.get('/kwizzez/:id/edit', kwizControl.edit);
//PUT ID API
app.put('/kwizzez/:id', kwizControl.update);
//DELETE ID API
app.del('/kwizzez/:id', kwizControl.delete);

app.listen();
