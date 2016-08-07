define( function(require, exports, module){

	var $ = require('jquery');
	var widget = require('./widget');

	function productNews( ){
		this.config = {
			title:'新闻',
			desc:'news',
			news:{
				pic:'./img/news.jpg',
				title:'手提牛皮包再多东西都可以分类置放了',
				date:'2015-12-07',
				desc:'表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的'
			},
			newsList:[{
				date:'2015-12-07',
				title:'软牛皮包的鉴别方式有哪些'
			},{
				date:'2015-12-07',
				title:'如何清洗这是我想要的，软面大容量的包。'
			},{
				date:'2015-12-07',
				title:'软牛皮包的鉴别方式有哪些'
			},{
				date:'2015-12-07',
				title:'棕色牛皮包搭配什么样的衣服更时尚，更好看'
			},{
				date:'2015-12-07',
				title:'软牛皮包的鉴别方式有哪些'
			},]
		}
	}

	productNews.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="productNews"></div>');

			titleBox = $('<div class="productNews_title">'+
									'<h3>'+this.config.title+'</h3>'+
									'<p>'+this.config.desc+'</p>'+
								'</div>');
			contentWrap = $('<div class="productNews_contents"></div>');

			contentLeft = $('<div class="productNews_contents_left">'+
									'<img src="'+this.config.news.pic+'" alt="">'+
									'<h4>'+this.config.news.title+'</h4>'+
									'<p class ="date">'+this.config.news.date+'</p>'+	
									'<p class ="description">'+this.config.news.desc+'</p>'+
									'<button>'+
										'<div></div>'+
										'<span>More</span>'+
									'</button>'+
								'</div>');

			contentRight = $('<ul class="productNews_contents_right"></ul>');

			this.config.newsList.forEach(function(data){
				$('<li>'+
					'<div></div>'+
					'<p><span class="date">'+data.date+'</span>'+data.title+'</p>'+
				'</li>')
				.appendTo(contentRight );
			});

			contentWrap.append(contentLeft).append(contentRight);

			this.boundingBox.append(titleBox).append(contentWrap);

		},


		bindUI:function(){
			var self = this;

			var timeId = null;

			$('.productNews_contents_left').hover(function() {
				timeId = window.setTimeout($.proxy(function(){
					$('h4',this).css({'color': '#ff072a'});
					$('button div',this).animate({width: '100%'},'speed');
					$('button').css({'color': '#fff'});
				},this), 200)
			}, function() {
				window.clearTimeout(timeId);
				$('h4',this).css({'color': '#444'});
				$('button div',this).animate({width: '0%'},'speed');
				$('button').css({'color': '#7b7b7b'});
			});


			$('.productNews_contents_right li').hover(function() {
				timeId = window.setTimeout($.proxy(function(){
					$('div',this).animate({height: '100%'},'speed');
					$('p',this).css({color: '#fff'});
				},this), 200)
			}, function() {
				window.clearTimeout(timeId);
				$('div',this).animate({'height': '0%'},'speed');
				$('p',this).css({color: '#7b7b7b'});
			});

		},

		init:function(config){
			$.extend( this.config, config);
			var container = this.config.container || 'body';
			this.render( $(container) );
		}
	});

	module.exports = productNews;
})