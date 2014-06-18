var _ = require('underscore');
var Kwiz = Parse.Object.extend('Kwiz');

// Display all kwizzes.
exports.index = function(req, res) {
  var query = new Parse.Query(Kwiz);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.send({kwizzes: results});
  },
  function() {
    res.send(500, 'Failed loading kwizzes');
  });
};

// Display a form for creating a new kwiz.
// Create a new kwiz with specified title , questions and set of answers/keys.
exports.new = function(req, res) {
  var kwiz = new Kwiz();
  //using the body parser; extract the data from the body
  kwiz.save(_.pick(req.body, 'title', 'question', 'choices', 'answer')).then(function() {
    res.send("created a kwiz");
  },
  function() {
    res.send(500, 'Failed to create kwiz');
  });
};

/*NOTICE---EVERYTHING BELOW THIS LINE MAY BE BROKEN---code is reused from other projects*/

//I will move this line until it reaches the end, at which point it will get deleted

// Show a given kwiz based on specified id.
exports.show = function(req, res) {
  var kwizQuery = new Parse.Query(Kwiz);
  var foundKwiz;
  kwizQuery.get(req.params.id).then(function(kwiz) {
    if (kwiz) {
      foundKwiz = kwiz;
      //query for any data attached to the kwiz object
      var Comment = Parse.Object.extend('Comment');
      var commentQuery = new Parse.Query(Comment);
      commentQuery.equalTo('kwiz', kwiz);
      commentQuery.descending('createdAt');
      return commentQuery.find();
    } else {
      return [];
    }
  }).then(function(comments) {
    res.send({
      kwiz: foundKwiz//,
      //comments: comments
    });
  },
  function() {
    res.send(500, 'Failed finding the specified kwiz to show');
  });
};

// Display a form for editing a specified kwiz.
exports.edit = function(req, res) {
  var query = new Parse.Query(Kwiz);
  query.get(req.params.id).then(function(kwiz) {
    if (kwiz) {
      res.send({ 
        kwiz: kwiz
      })
    } else {
      res.send('specified kwiz does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding kwiz to edit');
  });
};

// Update a kwiz based on specified id, title and body.
exports.update = function(req, res) {
  var kwiz = new Kwiz();
  kwiz.id = req.params.id;
  kwiz.save(_.pick(req.body, 'title', 'question', 'a','b','c','d', 'answer')).then(function() {
    res.send(200, 'Saved kwiz');
  },
  function() {
    res.send(500, 'Failed saving kwiz');
  });
};

// Initial call should be deleteRecursive(objects, 0, function() {...});
// Invokes callback after all items in objects are deleted.
// Only works if number of objects is small (to avoid Cloud Code timeout).
var deleteRecursive = function(objects, index, callback) {
  if (index >= objects.length) {
    callback();
  } else {
    objects[index].destroy().then(function() {
      deleteRecursive(objects, index + 1, callback);
    });
  }
}

// Delete a kwiz corresponding to the specified id.
exports.delete = function(req, res) {
  var kwiz = new Kwiz();
  kwiz.id = req.params.id;

  // Also delete kwiz's comments by chaining destroy calls.
  // Assumption: there will be a small number of comments per kwiz.
  var query = new Parse.Query(Parse.Object.extend('Comment'));
  query.equalTo("kwiz", kwiz);
  query.find().then(function(results) {
    deleteRecursive(results, 0, function() {
      // After all comments are deleted, delete the kwiz itself.
      kwiz.destroy().then(function() {
        res.send(200, 'Successfully deleted kwiz');
      },
      function() {
        res.send(500, 'Failed deleting kwiz');
      });
    });
  },
  function() {
    res.send(500, 'Failed finding comments for kwiz');
  });
};
