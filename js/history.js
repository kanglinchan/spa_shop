define(function(require, exports, module){
	$ = require('jquery');
	var widget = require('./widget');


	function history(){
		var instance = new historyPage();
		instance.init();
		return instance;
	}

	var historyPage = function(){
		this.config ={
			"container":'#content'
		}
	}
	historyPage.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="history">'+
'<div class="history_header">'+
'<h2>历程</h2>'+
'<p>history</p>'+
'</div>'+
'<div class="history_postBody">'+
'<div>'+
'<p>现代，包饰的兴起与服装的演变有着密切的联系。自从十八世纪末，附有衣带的波浪型裙子被修身的衣服取代后，女士们便纷纷去寻找可以装载个人物品的 袋子。第一个鱼网状的小袋乘势而起，这种束上长绳的小袋便于拿在手上，成为名副其实的"包饰"。几百年来，时装配件的潮流犹如时装一般，日新月异，变个不 停。而它的地位也逐渐上升，成为女士们衣着打扮中不可缺少的一部分，例如包饰。基于不同的潮流文化，不同的时代状况，不同的场合，女人的包饰已演变出变幻 无穷的形式。'+
'</p>'+
'</div>'+
'<div class="history_postBody_pic">'+
'<img src="./img/history.png" alt="">'+
'</div>'+
'<ul class="history_postBody_listWrap clearfix">'+
'<li>'+
'<img src="./img/history01.jpg" alt="">'+
'<p>二十世纪中，女士都以名牌挂帅，包饰成为了身份与权贵的象征。中期以后，人们的生活被电脑充斥着。手提电脑的兴起，令宽阔的信差袋、相机袋成为了年轻人的宠儿。后期，包饰的世界变得更缤纷多采，有简约主义的盛行，有中国的刺绣热，更有动物皮毛的应用，例如蛇皮、豹皮、鳄鱼皮等</p>'+
'</li>'+
'<li>'+
'<img src="./img/history02.jpg" alt="">'+
'<p>30年代，好莱坞电影的空间发展，它们对时尚的流行产生了巨大的影响。包饰有了流线型的外型和好的柜架，朴实的材质，古朴而典雅。</p>'+
'</li>'+
'<li>'+
'<img src="./img/history03.jpg" alt="">'+
'<p>充满硝烟的40年代，包饰设计最为强调实用性，而实用主义的潮流更受到军用设计的影响，挎在肩头的包风靡一时，因为可以用来装防毒面具定额配给的票据和身份证等最为实用的行头。硝烟纷飞的战争岁月虽给人们带来极大痛苦，但它却促使包饰向平民化和简单化。</p>'+
'</li>'+
'</ul>'+
'</div>'+
'</div>'+
'</div>');
		},

		init:function(){
			this.render($(this.config.container));
		}

	});

	module.exports = history;
	
})