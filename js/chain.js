define( function(require, exports, module){
	function chain(fn){
		this.fn = fn;
		this.successor = null;
		alert( fn);
	};

	chain.prototype = {
		execute: function(){
			var ret = this.fn.apply( this, arguments );
			if( ret === 'nextSuccessor' ){
				return this.successor && this.successor.execute.apply( this.successor, arguments );
			}
		},

		setNextSuccessor: function( successor ){
			this.successor = successor;
		},

		next: function(){
			return this.successor && this.successor.execute.apply( this.successor, arguments );
		},
	}

	module.exports = chain;
} )










		