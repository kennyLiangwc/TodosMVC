(function(angular){
	//创建模板
	var app = angular.module('todoApp.todoCtrl',['ngRoute']);
	//配置路由
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/:status?',{
			templateUrl:'view.html',
			controller:'todoController'
		})
	}])



//创建控制器模块
	app.controller('todoController',['$scope','$location','todoSrv','$routeParams',function($scope,$location,todoSrv,$routeParams){
		// console.log(todoSrv.test);
		// $scope.dataList = [
		// 	{'id':0,'name':'吃饭','isCompleted':false},
		// 	{'id':1,'name':'睡觉','isCompleted':true},
		// 	{'id':2,'name':'打豆豆','isCompleted':false}
		// ]
		//展示内容
		$scope.dataList = todoSrv.getData();

		//添加数据
		// // var id;
		$scope.newTast = '';
		$scope.add = function(){
			// console.log($scope.newTast);
			//数据为空不添加
			if(!$scope.newTast){
				return;
			}
			// //id
			// if($scope.dataList.length === 0){
			// 	id = 0;
			// }else {
			// 	//判断最后一个id的值再加上1
			// 	id = $scope.dataList[$scope.dataList.length - 1].id +1;
			// }
			// $scope.dataList.push({id:id,name:$scope.newTast,isCompleted:false});
			todoSrv.addData($scope.newTast);
			$scope.newTast = '';
		}

		//删除数据
		$scope.remove = function(id){
			// for(var i = 0; i < $scope.dataList.length; i++){
			// 	if($scope.dataList[i].id === id){
			// 		$scope.dataList.splice(i, 1);
			// 	}
			// }
			todoSrv.removeData(id);	
		}

		//修改
		$scope.updataId = -1;
		$scope.updata = function(id){
			$scope.updataId = id;
			// console.log($scope.updataId)
		}

		//保存数据
		$scope.save = function(){
			$scope.updataId = -1;
			todoSrv.saveData();
		}

		//全选
		$scope.selAll = false;
		$scope.selectAll = function(){
			// for(var i = 0; i < $scope.dataList.length; i++){
			// 	$scope.dataList[i].isCompleted = $scope.selAll;
			// }
			todoSrv.selectAll($scope.selAll);
		}

		//清除
		$scope.clear = function(){
			// var temp = [];
			// for(var i = 0; i < $scope.dataList.length; i++){
			// 	if(!$scope.dataList[i].isCompleted){
			// 		temp.push($scope.dataList[i]);
			// 	}
			// }
			// $scope.dataList.length = 0;
			// [].push.apply($scope.dataList,temp);
			todoSrv.clear();
		}
		//监视勾选
		$scope.$watch('dataList',function(newValue,oldValue){
			if(newValue === oldValue) return;
			// console.log(newValue)
			todoSrv.saveData();
		},true);
		//显示
		$scope.isShow = function(){
			for(var i = 0; i < $scope.dataList.length; i++){
				var toda = $scope.dataList[i];
				if(toda.isCompleted){
					return true;
				}
			}
			return false;
		}

		//数目
		$scope.getCount = function(){
			var count = 0;
			$scope.dataList.forEach(function(value) {
				// value 就是当前元素
				if(!value.isCompleted) {
					count += 1;
				}
			});

			return count;
		}


		//过滤器
		$scope.status = {};
		$scope.CheckAll = function(){
			$scope.status = {};
		}
		$scope.CheckCompleted = function(){
			$scope.status = {isCompleted:true};
		}
		$scope.CheckActive = function(){
			$scope.status  = {isCompleted:false};
		}

		console.log($routeParams);

		// $scope.$watch('location.url()',function(newValue){	
			switch($routeParams.status) {
				case '':
					$scope.status = {};
					break;
				case 'active':
					$scope.status  = {isCompleted:false};
					break;
				case 'completed':
					$scope.status = {isCompleted:true};
					break;
			}

		//根据URL变化显示相应的任务
		// $scope.location = $location;	//
		// $scope.$watch('location.url()',function(newValue){	
		// 	switch(newValue) {
		// 		case '/':
		// 			$scope.status = {};
		// 			break;
		// 		case '/active':
		// 			$scope.status  = {isCompleted:false};
		// 			break;
		// 		case '/completed':
		// 			$scope.status = {isCompleted:true};
		// 			break;
		// 	}
		// });

	}]);


})(angular);