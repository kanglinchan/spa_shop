define( function(require, exports, module){

	function product (){
		this.cfg =    {
			sd: 'sba',
		}
	}
	product.prototype = {
		kk: function(){
			//alert( this.cfg.sd );
			return this;
		}
	}

	module.exports = product;
} )