define(function(require, exports, module){
	$ = require('jquery');
	var widget = require('./widget');


	function service(){
		var instance = new servicePage();
		instance.init();
		return instance;
	}

	var servicePage = function(){
		this.config ={
			"container":'#content'
		}
	}
	servicePage.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $("<div class=\"service\">"+
"<div class=\"service_banner\">"+
"</div>"+
"<div class=\"service_header\">"+
"<h2>关于Baobao</h2>"+
"<p>service US</p>"+
"</div>"+
"<div class=\"service_postBody\">"+
"<ul class=\"clearfix\">"+
"<li>"+
"<a href=\"\">"+
"<img src=\"./img/service-pic.png\" alt=\"\">"+
"<h3>牛皮包的优点</h3>"+
"<p>真皮包括：全青皮，半青皮，腊变皮，黄牛皮，水牛皮，二层皮，猪皮。全青皮：即全粒面革，它由上等的原料皮加工而成，伤残较少，皮面上保留完好的天然状态。</p>"+
"</a>"+
"</li>"+
"<li>"+
"<a href=\"\">"+
"<img src=\"./img/service-pic.png\" alt=\"\">"+
"<h3>牛皮包的优点</h3>"+
"<p>真皮包括：全青皮，半青皮，腊变皮，黄牛皮，水牛皮，二层皮，猪皮。全青皮：即全粒面革，它由上等的原料皮加工而成，伤残较少，皮面上保留完好的天然状态。</p>"+
"</a>"+
"</li>"+
"<li>"+
"<a href=\"\">"+
"<img src=\"./img/service-pic.png\" alt=\"\">"+
"<h3>牛皮包的优点</h3>"+
"<p>真皮包括：全青皮，半青皮，腊变皮，黄牛皮，水牛皮，二层皮，猪皮。全青皮：即全粒面革，它由上等的原料皮加工而成，伤残较少，皮面上保留完好的天然状态。</p>"+
"</a>"+
"</li>"+
"</ul>"+
"</div>"+
"</div>");
		},

		init:function(){
			this.render($(this.config.container));
		}

	});

	module.exports = service;
	
})