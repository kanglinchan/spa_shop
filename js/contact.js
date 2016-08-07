define(function(require, exports, module){
	$ = require('jquery');
	var widget = require('./widget');


	function contact(){
		var instance = new contactPage();
		instance.init();
		return instance;
	}

	var contactPage = function(){
		this.config ={
			"container":'#content'
		}
	}
	contactPage.prototype = $.extend({}, new widget(), {
		renderUI:function(){
			this.boundingBox = $('<div class="contact"><h1>'+
				"E-Mail:601168226@qq.com"+
				'</h1></div>');
		},

		init:function(){
			this.render($(this.config.container));
		}

	});

	module.exports = contact;
	
})