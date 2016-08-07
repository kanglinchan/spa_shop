define(function(require, exports, module){

	var $ = require('jquery');
	var widget = require('./widget');

	function productPage(){
		this.config = {
			container:'#content',
			contents:[{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},{
				href:'',
				picture:'./img/product.jpg',
				title:'玛丽思薇手提包',
				price:108,
			},]
		}
	}

	productPage.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="product"></div>');

			$category =$('<ul class="product_category">'+
							'<li><a class="active" href="#product">全部</a></li>'+
							'<li><a  class="product_category_male"  href="#product-male">男款</a></li>'+
							'<li><a class="product_category_female" href="#product-female">女款</a></li>'+
						'</ul>');
			$content = $('<div class="product_content"></div>');

			$contentList = $('<ul class="clearfix"></ul>');

			$(this.config.contents).each(function(index, data) {
				$contentList.append('<li>'+
										'<a href="'+data.href+'">'+
											'<i></i>'+
											'<img src="'+data.picture+'">'+
											'<div class="product_category_content_progress"></div>'+
											'<div class="product_category_content_title">'+
												'<h4>'+data.title+'</h4>'+
												'<p>价格：'+data.price+'</p>'+
											'</div>'+
										'</a>'+
									'</li>');
			});

			$content.append( $contentList );
			this.boundingBox.append( $category ).append( $content );
		},

		bindUI:function(){
			var timeId = null;
			$('.product_content li').hover(function() {
				timeId = setTimeout($.proxy(function(){
					var h = $('img',this).width() / 2;
					$('i' ,this).animate({opacity: '0.8', 'top':h+'px'},'500');
					$('h4',this).css('color','#ff072a');
					$('.product_category_content_progress', this).animate({width: '100%'},'500');
				}, this) , '200');
			}, function() {
				clearTimeout(timeId);
				$('i' ,this).animate({opacity: '0', 'top':'0px'},'500');
				$('h4',this).css('color','#565656');
				$('.product_category_content_progress', this).animate({width: '0%'},'500');
			});

/*			$('.product_category li').on('click',  $.proxy( function(event) {
				event.preventDefault();
				$()
			}, this));*/

		},

		init:function(conifg){
			var config = conifg || {};
			$.extend(this.config, config);
			if( typeof( this.config.container ) == undefined ){
				console.log('参数错误，格式：{container:selector}');
			}
			console.log( this.config );
			this.render( $(this.config.container) );
			
		}
	});
	
	function product( arguments ){
		var arguments = arguments[0];
		if( arguments == 'female' ){
			//alert('female');
			var url = 'product1.json';
			alert(url)
		}else if(arguments === 'male' ){
			alert('male');
		}else{
			alert('undefined');
		}

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		

		var	instance = new productPage();

		instance.init({'url':url});

		return instance;
	}

	module.exports = product;
})