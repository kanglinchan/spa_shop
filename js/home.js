define(function(require, exports, module){
	var $ =require( 'jquery' );
	var widget = require( './widget' );
	require('./mouseWheel')($);
	require('./jquery.easing')($);

	function home(){
				
		return new component().init();
	}



	function component(){
		this.config = {
			pageSize:6,
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
		
			this.fullPage_nav = $('<ul class="fullPage_nav">'+ fullPageNavContent +'</ul>');

			this.fullPage_nav.appendTo('body');

		},

		bindUI:function(){
			var _that = this;
			var contentH = $("#content").height();
			var count = 0;

			$('#content').css("overflow",'hidden');

			$(".fullPage_container li").css('height',contentH);
			var done = true;
			$("#content").mouseWheel(function(event){
				event.preventDefault()
				if( done ){
					done = false;
					count++;
					if( count >= _that.config.pageSize ){
						count = _that.config.pageSize -1;
					}
					$(this).animate({"scrollTop":count * contentH },800 , 'easeOutBounce', function(){
						done = true;
					})
					$( 'li',_that.fullPage_nav ).each(function(index, el) {
						$(this).removeClass('active');
					});
					$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
				}

				
				
			},function( event ){
				event.preventDefault();
				if(done){
					done = false;
					count--;
					if( count < 0 ){
						count = 0;
					}
					$(this).animate({"scrollTop":count * contentH }, 800, 'easeOutBounce',function(){
						done = true;
					});
					$( 'li',_that.fullPage_nav ).each(function(index, el) {
						$(this).removeClass('active');
					});
					$('li:eq( '+count+' )',_that.fullPage_nav).addClass('active');
				}
				
			});

			this.fire('loaded');
		},

		syncUI:function(){
			this.fullPage_nav.css({
				marginTop: ($(window).height() - this.fullPage_nav.height())/2 +'px',
			});

			$('li:first', this.fullPage_nav ).addClass('active');
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