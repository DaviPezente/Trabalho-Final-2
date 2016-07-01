'use strict';

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('ToDoController', ['$scope', 'growl', 'ToDo',
    function($scope, growl, ToDo) {
        $scope.user = principal;
        $scope.newToDoDescription = '';
        $scope.itemToEdit = null;

        $scope.items = ToDo.query();

        $scope.addItem = function() {
            var item = new ToDo({description: $scope.newToDoDescription});
            item.$save(
                    function(data) {
                        // Sucesso.
                        $scope.items.push(data);
                        $scope.newToDoDescription = '';
                    },
                    function(error) {
                        // Erro.
                        growl.addErrorMessage(error.data.pop().message);
                    });
        };

        $scope.editItem = function(item) {
            $scope.itemToEdit = item;
            $scope.itemBackup = angular.extend({}, item);
        };

        $scope.commitEditItem = function(item) {
            item.$update(
                    function() {
                        // Sucesso.
                        $scope.itemToEdit = null;
                    },
                    function(error) {
                        // Erro.
                        growl.addErrorMessage(error.data.pop().message);
                    });
        };

        $scope.revertEditing = function(item) {
            $scope.items[$scope.items.indexOf(item)] = $scope.itemBackup;
            $scope.itemToEdit = null; 
        };

        $scope.removeItem = function(item) {
            item.$remove(function() {
                $scope.items.splice($scope.items.indexOf(item), 1);
            });
        };
    }]);