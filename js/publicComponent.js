define( function(require, exports, module){

	var $ = require('jquery');

	function publicComponent( cfg ){
		this.config = {
			components : ['header','footer'],
			current : 0,
			layout: [ 'header','content','footer' ]
		}

		$.extend(this.config,cfg );

	}

	publicComponent.prototype = $.extend({}, {
		requirePublicComponent:function(){
			var _that =this;
			if( this.config.components[this.config.current] ){
				console.log('./'+ this.config.components[this.config.current]);
				require.async('./'+this.config.components[this.config.current], function(component){ //递归异步加载模块
					var cp = new component();
					//调用下一个公共模块;
					_that.config.current++;
					_that.requirePublicComponent();
				});
								
			}else{
				return this;//成功加载全部模块 返回 true；
			}
		},

		setLayout:function(){
			$body = $(document.body);
			for( var i =0, len =this.config.layout.length; i<len; i++ ){
			  $body.append('<div id='+ this.config.layout[i] +'></div>');
			}
			return this;
		}
	});
	

	module.exports = publicComponent;
} )