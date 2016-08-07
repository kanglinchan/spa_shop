define(function(require, exports, module){
	var $ = require('jquery');
	var widget = require('./widget');

	function productService(){
		this.config = {
			title:{
				zh:'产品服务',
				en:'product Service'
			},
			contents:[{
				number:'01',
				title:'牛皮包怎么保养',
				pic:'./img/b2.png',
				desc:'每周使用碧丽珠作出保养和护理；清洁皮具时要用柔软的棉布及皮具蜡擦清理,这样就不会伤害皮面，凡皮具都不要直接放在水中清洗'
			},{
				number:'02',
				title:'牛皮包怎么保养',
				pic:'./img/b2.png',
				desc:'每周使用碧丽珠作出保养和护理；清洁皮具时要用柔软的棉布及皮具蜡擦清理,这样就不会伤害皮面，凡皮具都不要直接放在水中清洗'
			}]

		}
	}

	productService.prototype = $.extend({}, new widget(), {
		renderUI: function(){
			this.boundingBox = $('<div class="productService"><div>');

			this.titleBox = $(' <div class="productService_title">'+
									'<h3>产品服务</h3>'+
									'<p>product Service</p>'+
									'<div></div>'+
								'</div> ');

			this.bottomBox = $('<button class="productService_more">More</button>');


			var serviceBox = '';
			for(var i=0, len = this.config.contents.length; i<len; i++){
				serviceBox += '<li class="productService_item">'+
										'<div class="productService_item_no">'+
									 		'<div class="productService_item_progress"></div>'+
									 		this.config.contents[i].number+
								 		'</div>'+
								 	'<div class="productService_item_content">'+
								 		'<img src="'+this.config.contents[i].pic+'" alt="">'+
								 		'<h2 class="productService_item_tilte">'+
									 		this.config.contents[i].title+
									 	'</h2>'+
									 	'<p class="productService_item_description">'+
									 		this.config.contents[i].desc+
									 	'</p>'+
								 	'</div>'+				 	
								'</li>';
			}
			this.serviceWrapBox = $('<ul class="productService_wrap clearfix">'+serviceBox+'</ul>');
			
			this.boundingBox
			.append( this.titleBox )
			.append( this.bottomBox )
			.append( this.serviceWrapBox );
		},

		bindUI:function(){
			var self = this;

				var timer = null;

				
				$('.productService_item').hover( function(){
					timer = setTimeout($.proxy(function(){
						this.style.cursor = 'pointer';
						$('.productService_item_content',this).animate({'marginTop':'-40'}, '1s');
						$('.productService_item_progress',this).animate({'width':'100%'}, '1s');
						$('.productService_item_no',this).css({'color':'#ff072a'});
						$('.productService_item_tilte',this).css({'color':'#ff072a'});
					},this) ,150);
				}, function() {
					clearTimeout(timer);
					$('.productService_item_content',this).animate({'marginTop':'0'}, '1s');
					$('.productService_item_progress',this).animate({'width':'0%'}, '1s');
					$('.productService_item_no',this).css({'color':'#929292'});
					$('.productService_item_tilte',this).css({'color':'#595959'});
				});	


				$(".productService_more").hover(function() {
					$(this).css('backgroundColor','#ff072a');
					this.style.cursor = 'pointer';
				}, function() {
					$(this).css('backgroundColor','#333');
				});
			
		},

		init:function(config){
			$.extend(this.config, config);
			var container = this.config.container || 'body';
			this.render( $(container) );
		}
	});


	module.exports = productService;
	
})

