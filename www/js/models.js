var Brand = Backbone.Model.extend({
	urlRoot: "../api/s/brand",
	defaults: {
		code: '',
		descriptor: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var brand = new Brand();


var Model = Backbone.Model.extend({
	urlRoot: "../api/t/model",
	defaults: {
		code: '',
		descriptor: '',
		brandid: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var model = new Model();


var Propcat = Backbone.Model.extend({
	urlRoot: "../api/s/propcat",
	defaults: {
		code: '',
		descriptor: '',
		ordinal: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var propcat = new Propcat();


var Property = Backbone.Model.extend({
	urlRoot: "../api/t/property",
	defaults: {
		code: '',
		descriptor: '',
		propcatid: '',
		ordinal: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var property = new Property(); 


var Itemcat = Backbone.Model.extend({
	urlRoot: "../api/s/itemcat",
	defaults: {
		code: '',
		descriptor: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var itemcat = new Itemcat();
//var itemcat = new Itemcat({code: '001', descriptor: 'Ply Board'});

var Item = Backbone.Model.extend({
	urlRoot: "../api/t/item",
	defaults: {
		code: '',
		descriptor: '',
		itemcatid: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});

var item = new Item(); 



var Prodcat = Backbone.Model.extend({
	urlRoot: "../api/s/prodcat",
	defaults: {
		code: '',
		descriptor: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var prodcat = new Prodcat();

var Product = Backbone.Model.extend({
	urlRoot: "../api/t/product",
	defaults: {
		code: '',
		descriptor: '',
		typeid: '',
		type: '',
		matcatid: '',
		uom: '',
		longdesc: '',
		onhand: '',
		minlevel: '',
		maxlevel: '',
		unitprice: '',
		reorderqty: '',
		floorprice: '',
		avecost: ''
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
})
var product = new Product();


var Supplier = Backbone.Model.extend({
	urlRoot: "../api/v/supplier",
	defaults: {
		code: '',
		descriptor: '',
		payee: '',
		cperson: '',
		ctitle: '',
		terms: '',
		balance: '',
		address: '',
		phone: '',
		fax: '',
		mobile: '',
		email: '',
		notes: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	}
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var supplier = new Supplier();


var Bank = Backbone.Model.extend({
	urlRoot: "../api/s/bank",
	defaults: {
		code: '',
		descriptor: '',
		acctno: ''
	}, 
	validation: {
		code: {
	    	required: true,
			msg: 'Please enter a value'
	   	},
	   	acctno: {
	    	required: true,
			msg: 'Please enter a account number'
	   	}	
	},
	unset: function(attr, options) {
	  (options || (options = {})).unset = true;
	  return this.set(attr, null, options);
	},
	blank: function(){
		this.clear();
		return this.defaults;
	}
});
var bank = new Bank();





var ModalSettings = Backbone.Model.extend({
	defaults: {
		mode: 'add',
		text: 'Add Record'
	}
});
var modalSettings  = new ModalSettings();