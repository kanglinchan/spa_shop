define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );

	function home(){
		
		
		return new component().init();
	}



	function component(){
		this.config = {
			pageSize:3,
		}
	}

	component.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			if( this.config.pageSize < 1){
				console.lgo( 'pageSize 参数错误');
				return ;
			}
			var fullPageConyent ='';
			var fullPageNavContent  = '';
			for(var i=0, len = this.config.pageSize; i<len; i++){
				fullPageConyent += '<li class="fullPage_item_'+i+'">sdddddddd</li>';
				fullPageNavContent += '<li class="fullPage_nav_item'+i+'"></li>';
			}
			this.boundingBox = $('<ul class="fullPage_container">'+fullPageConyent+'</ul>');
		
			this.fullPage_nav = $('<ui class="fullPage_nav">'+ fullPageNavContent +'</ui>');

			this.fullPage_nav.appendTo('#content');

		},

		bindUI:function(){
			var Y = 0;

			$("#content").on('scroll',function(){
				console.log($("#content").scrollTop());
			});

			this.fire('loaded');
		},

		syncUI:function(){
			this.fullPage_nav.css({
				marginTop: ($(window).height() - this.fullPage_nav.height())/2 +'px',
			});
		},

		destructor:function(){
			this.fire('destructor');
			alert('hello destroy');
		},

		init:function(config){
			$.extend(this.config, config);
			this.render($('#content'));
			return this;
		}


	});
	

	module.exports = home;
})