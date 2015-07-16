angular.module('app', ['lbServices'])
.run( function($rootScope, TodoItem) {
   $rootScope.items = TodoItem.find({});

    $rootScope.check = function(item) {
      TodoItem.check({id: item.id}, {}, function(itemUpdated){
        item.isDone = true;
      });
    };

    $rootScope.create = function(name) {
      TodoItem.create({task: name}, function(item){$rootScope.items.push(item);});
    }
});
