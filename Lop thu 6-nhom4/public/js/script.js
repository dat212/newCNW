var app = angular.module('app',[]);

app.controller('myCtrl', ['$scope', function($scope) {

    loadCharmAndColor();
    loadOrder();

    $scope.formInvalid = function(){
        var order = $scope.order;
        var result = order.cart.length < 1  || order.receiver == '' || order.phone == '' || order.address == '';
        return result;
    }

    $scope.selectColor = function(color) {
        $scope.colors.forEach(function(item) {
            item.isSelected = false;
        });
        color.isSelected = true;
        $scope.selectedColorId = color.id;
    };

    

    $scope.remove = function(item) {
        var itemIndex = $scope.order.cart.indexOf(item);
        $scope.order.cart.splice(itemIndex, 1);
    };

    $scope.addToCart = function(type) {
        var item = {
            colorId: $scope.selectedColorId,
            
            name: $scope.name,
            type: type,
            color: $scope.colors[$scope.selectedColorId - 1].description,
        };

       

        $scope.order.cart.push(item);
    }

    $scope.submit = function() {
        if ($scope.order.cart.length < 1) return;        
    };

    function loadOrder() {
        $scope.selectedColorId = 1;
        
            $scope.name = 'No name';
            $scope.order = {
            phone: '',
            note: '',
            address: '',
            cart: []
        };
        selectCharmAndColor();
    }

    function loadCharmAndColor() {
        $scope.colors = [{
            id: 1,
            description: 'Xanh cốm'
        }, {
            id: 2,
            description: 'Vàng'
        }, {
            id: 3,
            description: 'Cam'
        }, {
            id: 4,
            description: 'Hồng'
        }, {
            id: 5,
            description: 'Da bò'
        }, {
            id: 6,
            description: 'Xám'
        }, {
            id: 7,
            description: 'Lục bảo'
        }, {
            id: 8,
            description: 'Xanh da trời'
        }, {
            id: 9,
            description: 'Nâu'
        }, {
            id: 10,
            description: 'Xanh đen'
        }, {
            id: 11,
            description: 'Đỏ'
        }, {
            id: 12,
            description: 'Đen'
        }, {
            id: 13,
            description: 'Xanh biển'
        }, {
            id: 14,
            description: 'Đỏ đô'
        }, {
            id: 15,
            description: 'Tím'
        }];

        
    }

    function selectCharmAndColor() {
        $scope.colors.forEach(function(item) {
            item.isSelected = item.id == $scope.selectedColorId;
        });

    }

}]);

app.directive('productChoice', function() {
  return {
    restrict: 'E',
    templateUrl: 'product-choice.html'
  };
});

app.directive('orderForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'order-form.html'
  };
});