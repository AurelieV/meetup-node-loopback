angular.module('app', ['lbServices'])
.run( function($rootScope, TodoItem) {
   $rootScope.items = TodoItem.find({});
});
