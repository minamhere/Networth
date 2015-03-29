angular.module('paycheckCalculator', [])
  .controller('PaycheckController', function() {
    var paycheck = this;
    paycheck.filingStatuses = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}];
 
    paycheck.addTodo = function() {
      paycheck.todos.push({text:paycheck.todoText, done:false});
      paycheck.todoText = '';
    };
 
   
 
   
    };
  });