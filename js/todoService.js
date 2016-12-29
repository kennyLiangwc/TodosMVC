(function(angular) {

    // 创建服务的目的：主要用于对重复业务的封装，达到复用的目的
    //
    angular.module('todoApp.todoSrv', []).service('todoSrv', ['$window', function($window) {
        // this.test = 'aa';
        var storage = $window.localStorage;
        //获取任务列表
        var dataStr = storage.getItem('todo');
        //将任务列表转化为对象
        var dataList = JSON.parse(dataStr || '[]');

        //暴露dataList
        this.getData = function() {
                return dataList;
            }
            //添加数据的方法
        this.addData = function(newTast) {
                var id;
                //id
                if (dataList.length === 0) {
                    id = 0;
                } else {
                    //判断最后一个id的值再加上1
                    id = dataList[dataList.length - 1].id + 1;
                }
                dataList.push({ id: id, name: newTast, isCompleted: false });

                //将数据储存到本地存储
                this.saveData();

            }
            //保存数据
        this.saveData = function() {
            storage.setItem('todo', JSON.stringify(dataList));
        }

        //删除数据
        this.removeData = function(id) {
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id === id) {
                    dataList.splice(i, 1);
            		this.saveData();
            		return;
                }
            }
        }
        //全选
        this.selectAll = function(selAll){
        	for(var i = 0; i < dataList.length; i++){
				dataList[i].isCompleted = selAll;
			}
			this.saveData();
        }
       
        //清楚
        this.clear = function(){
        	var temp = [];
			for(var i = 0; i < dataList.length; i++){
				if(!dataList[i].isCompleted){
					temp.push(dataList[i]);
				}
			}
			dataList.length = 0;
			[].push.apply(dataList,temp);
			this.saveData();
        }


    }]);

})(angular)
