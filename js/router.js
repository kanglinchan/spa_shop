define( function(require, exports, module){
	var $ = require('jquery');

	function router(config){	
		this.config = {
			defaulComponent : 'home',
		}
		$.extend(this.config, config);
		
	}

	router.prototype.init = function(){	
		//保存this引用
		var _that = this;

		//初始化时加载默认组件
		require.async('./'+this.config.defaulComponent, function(com){
			 try { 
			 	//保存当前组件返回的引用；
			 	_that.currentComponent =  new com();
			 }catch(error){
			 	if( error.message == "component is not a constructor" ){
						alert( '默认组件加载错误' );
					}
			 }
		})

		//哈希变化时重新加载组件;	
		$(window).on('hashchange', function(){			
			var componentName = location.hash.replace('#', '');
			
			//当哈希为空时加载默认组件
			if( componentName == '' ){
				componentName = _that.config.defaulComponent;
			}

			 //异步加载模块		
			require.async('./'+componentName, function( component ){		

					//hash变化时注销当前组件
					_that.currentComponent.destroy&& _that.currentComponent.destroy();

					//保存新的组件对象
					if( component ){
						_that.currentComponent = new component();
					}
				   	console.dir( _that.currentComponent );				
				
			})
		})
	}

	module.exports = router;
} )
