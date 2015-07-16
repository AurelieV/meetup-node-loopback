module.exports = function(TodoItem) {
  TodoItem.check = function(id, next) {
    TodoItem.findById(id, {}, function(err, item){
      if (err || !item) {next(err);}
      item.updateAttributes({'doneDate': new Date(), 'isDone': true}, next);
    });
  };

  TodoItem.remoteMethod('check',
    {
      http: {path: '/check', verb: 'post'},
      accepts: [{arg:'id', type:'string', required: true}],
      returns: {arg: 'item', type: 'object'}
    }
  );

  TodoItem.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    if (req.accessToken) {
      req.body.userId = req.accessToken.userId;
    }
    next();
  });

  TodoItem.validatesUniquenessOf('task', {message: 'your task name is not unique'});

};
