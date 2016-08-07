define( function( require, exports, module ){


	var chain = require('./chain');
	var $ = require('jquery');
	function widget(){
		this.boundingBox = null;
		//事件列表
		this.listenList = {};
	}

	widget.prototype = {
		//订阅事件
		on : function(type, handler){
			if( typeof this.listenList[type] == 'undefined' ){
				this.listenList[type] = [];
			}
			this.listenList[type].push(handler);
			return this;
		},

		//触发事件
		fire: function( type, data ){
			if( this.listenList[type] instanceof Array ){
				var listenLists = this.listenList[type];
				for( var i=0 , length=listenLists.length; i<length; i++ ){
					listenLists[i](data);
				}
			}
		},


		//获取数据
		getdata:function(){},
		//渲染组件结构接口
		renderUI: function(){},
		//绑定组件事件接口
		bindUI: function(){},
		//同步组件界面接口
		syncUI: function(){},
		//注销组件接口
		destructor: function(){},

		//渲染组件
		render: function( container ){
			
			this.getdata();
			this.renderUI();
			$( container || document.body ).append( this.boundingBox );
			this.bindUI();
			this.syncUI();
			this.fire('completed');
			this.listenList['completed'] = [];		
		},

		//注销组件
		destroy: function(){
			this.fire('destrutor');
			this.listenList['destrutor'] = [];
			console.log(this.listenList);
			this.destructor();			
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	}

	module.exports = widget;
} )