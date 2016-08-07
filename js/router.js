define( function(require, exports, module){
	var $ = require('jquery');

	function router(config){	
		this.config = {
			defaulComponent :'home',
			currentComponent:null,
		}
		$.extend(this.config, config);
		
	}

	router.prototype.init = function(){	
		//保存this引用
		var _that = this;

		//初始化时加载默认组件
		/*require.async('./'+this.config.defaulComponent, function(com){
			 try { 
			 	//保存当前组件返回的引用；
			 	_that.currentComponent =  new com();
			 }catch(error){
			 	if( error.message == "component is not a constructor" ){
						alert( '默认组件加载错误' );
					}
			 }
		})*/
		this.loadPage();


		//哈希变化时重新加载组件;	
		$(window).on('hashchange', $.proxy(this.loadPage, this));

	}

	router.prototype.loadPage = function(){			
			var path = location.hash.replace(/#/, '');
			var params = path.split('-');
			var componentName = params.shift();

			//当哈希为空时加载默认组件
			if( componentName == '' ){
				componentName = this.config.defaulComponent;
			}else{
				componentName = componentName.match(/[\w]+/)[0];
			}


			console.log(componentName );
			 //异步加载模块		
			require.async('./'+componentName, $.proxy( function( component ){		

									
					if( typeof( this.currentComponent )  != 'undefined' ){
						//hash变化时注销当前组件
						this.currentComponent.destroy&& this.currentComponent.destroy();
					}
					//保存新的组件对象
					this.currentComponent =  new component( params );
					console.dir( component );
				
			}, this) );
		}



	module.exports = router;
} )
