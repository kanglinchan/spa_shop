define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );
	require('./mouseWheel')($);

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

			this.fullPage_nav.appendTo('body');

		},

		bindUI:function(){
			var previouY = 0;
			var contentH = $("#content").height();
			var count = 0;

			$("#content").on('scroll',function(){
				/*console.log($(this).scrollTop());

				var diff = $(this).scrollTop() - previouY ;

				if( diff > 0){
					count++;
				}
				if( diff < 0){
					count++; 
				}
				previouY = contentH * count  + 'px';*/
				console.log(  $(this).scrollTop() );

			});

			this.fire('loaded');

			$("#content").mouseWheel();
		},

		syncUI:function(){
			this.fullPage_nav.css({
				marginTop: ($(window).height() - this.fullPage_nav.height())/2 +'px',
			});
		},

		destructor:function(){
			this.fire('destructor');
			console.log('hello destroy');
		},

		init:function(config){
			$.extend(this.config, config);
			this.render($('#content'));
			return this;
		}


	});
	

	module.exports = home;
})