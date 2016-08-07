define(function(require, exports, module){
	$ = require('jquery');
	var widget = require('./widget');


	function news(){
		var instance = new newsPage();
		instance.init();
		return instance;
	}

	var newsPage = function(){
		this.config ={
			"container":'#content'
		}
	}
	newsPage.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="news">'+
'<div class="news_banner">'+
'</div>'+
'<div class="news_header">'+
'<h2>新闻</h2>'+
'<p>news</p>'+
'</div>'+
'<ul class="news_category">'+
'<li><a class="active" href="">全部</a></li>'+
'<li><a href="">工业</a></li>'+
'</ul>'+
'<ul class="news_List_wrap">'+
'<li>'+
'<img src="./img/01.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/02.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/03.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/04.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/05.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/06.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'<li>'+
'<img src="./img/01.jpg" alt="">'+
'<div class="news_List_item_right">'+
'<h3>手提牛皮包再多东西都可以分类置放了。</h3>'+
'<p class="date">2015-12-07</p>'+
'<p class="news_List_item_description">表面软软滑滑的，手感不错，走线整齐，各条拉链顺滑。“肚量”大，分层多，再多东西都可以分类置放了。这是我想要的，软面大容量的包</p>'+
'<button>'+
'<div></div>'+
'<p>MORE</p>'+
'</button>'+
'</div>'+
'</li>'+
'</ul>'+
'</div>');
		},

		init:function(){
			this.render($(this.config.container));
		}

	});

	module.exports = news;
	
})