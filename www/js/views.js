
_.extend(Backbone.Validation.callbacks, {
		valid: function(view, attr, selector) {
			var input = view.$('[' + selector + '=' + attr + ']');
			input.next('span.error').remove();
			
			console.log('valid');
	  	},
	  	invalid: function(view, attr, error, selector) {
			var input = view.$('[' + selector + '=' + attr + ']');
			//console.log(input);
			input.next('span.error').remove();
			var span = '<span class="error">'+ error +'</span>';
			input.addClass('invalid');
			input.focus();
			input.after(span);
			
			console.log('invalid');
	  	}
	});





var ModalBodyView = Backbone.View.extend({
	el: '.modal-dialog',
	initialize: function() {
		// Initialize 
		//Backbone.Validation.bind(this);
		//this.modalTitle = this.$('.modal-title');
		//this.model.on('change', this.render, this);
		//this.options.settings.on('change', this.modalChangeMode, this);
		
        //this.template = _.template($('#modal-itemcat-tpl').html());
        //this.template2 = _.template($('#modal-itemcat-readonly-tpl').html());

    },
    events: {
    	'click .model-btn-save': 'modalSave',
    	'click .model-btn-save-blank': 'modalSave',
    	'click .model-btn-delete': 'modalDelete',
    	'click .model-btn-cancel': 'modalCancel',
    	'click .model-btn-yes': 'modalConfirmDelete',
    	'blur input': 'checkValidity',
    	//'blur input': 'updateModel', kelangan mo pa ito gawin about validationError
    	'change select': 'checkValidity',
    	'keyup [required]': 'checkValidity',
    	'blur textarea': 'checkValidity',
    	'keyup #code': 'toUpper'	
    },
	toUpper: function(e){
	
		return $(e.currentTarget).val($(e.currentTarget).val().toUpperCase());	   
    },
    render: function() {
    	//console.log(this.collection);
    	var mode = this.model.get('mode');
        if(mode==='delete'){
        	this.$('.modal-body').html(this.template2(this.model.toJSON()));
        } else {
        	this.$('.modal-body').html(this.template(this.model.toJSON()));
        }
        this.modalChangeTitle();
        return this;
        
    },
    modalSave: function(){

   		var that = this;
		var data = this.$el.find('.table-model').serializeObject2();
		var isnew = false;
			
		if(this.model.isNew()){
			isnew = true;
		}

		this.model.set(data, {silent: true});

		if(this.model.isValid(true)){
			clear_alert();
			this.model.unset('mode', {silent: true}); //remove the added model field
			this.model.unset('text', {silent: true}); 
			console.log(this.model.toJSON());
			this.model.save({},{
		  		success: function(model, respone){
		  			if(respone.status==='error'){
		  				set_alert2(respone.status, 'Oh snap!', respone.message);
		  			} else if(respone.status==='warning'){
		  				set_alert2(respone.status, 'Warning!', respone.message);
		  			} else {
		  				if(isnew){
		  					console.log(respone);
		  					addTableData2(respone);
							set_alert2('success','Well done!', 'Success on saving!');
						} else {
							updateTableData3(respone)
							set_alert2('success','Yeay!', 'Success on updating!');
						}
		  			}

		  			//console.log(that.model.toJSON());
					that.clearForm();
					//console.log(that.model.toJSON());
				}	
		  	});
		} else {
			console.log("invalid :"+ this.model.validationError);
		}
    },
    clearForm: function(){
    	this.model.blank(); // added next line because model.clear delete all attrib
    	this.$el.find('.table-model').clearForm();
    },
    modalConfirmDelete: function(){
    var that = this;
    	this.model.destroy({
    		success: function(model, response) {
    			//oTable.fnDeleteRow($('tr#'+ that.model.get('id')));	
		  		//oTable.fnDraw();
		  		set_alert('success','Yeay!', 'Success on deleting '+ model.get('code') +'!');	
		  		}
			});
    },
    modalChangeMode: function(){
    	this.modalChangeTitle();
    },
    modalChangeTitle: function(){
    	this.$('.modal-title').text(this.model.get('text'));      	
    	
    	var btn, mode = this.model.get('mode');

        if(mode=='delete'){
        	btn = '<p style="display: inline; float: left; margin: 10px 0; color: #3B5998;">Are you sure you want to delete this record?</p>';
        	btn += '<button type="button" id="modal-btn-yes" class="btn btn-primary model-btn-yes" data-dismiss="modal">Yes</button>';
          	btn += '<button type="button" id="modal-btn-no" class="btn btn-default model-btn-no" data-dismiss="modal" >No</button>';
        
          	//this.$('.modal-footer').html(btn);
        } else {
          	btn = '<button type="button" id="modal-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>';
          	btn += '<button type="button" id="modal-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>';
          	btn += '<button type="button" id="modal-btn-cancel" class="btn btn-default model-btn-cancel" data-dismiss="modal">Cancel</button>';
        	
        	//this.$('.modal-footer').html(btn);
        }
        this.$('.modal-footer').html(btn);  
        
    },
    checkValidity: function(e){
    		var input = $(e.currentTarget);
			
			var input = $(e.currentTarget);
			var req = this.$('input[required]');


			req.each(function(){
				
				if($(this).val()==''){
					console.log($(this).val());
				}
			});

			if(req){
				req.each(function(){
					if($(this).val()==''){
						$(".model-btn-save").attr('disabled','disabled');	
						$(".model-btn-save-blank").attr('disabled','disabled');
					} else {
						$(".model-btn-save").removeAttr('disabled');
						$(".model-btn-save-blank").removeAttr('disabled');
					}
				});
				/*
				if(req.val()==''){
					
					this.$(".model-btn-save").attr('disabled','disabled');	
					this.$(".model-btn-save-blank").attr('disabled','disabled');
				} else {
					this.$(".model-btn-save").removeAttr('disabled');
					this.$(".model-btn-save-blank").removeAttr('disabled');
				}*/
			} else {
				this.$(".model-btn-save").removeAttr('disabled');
				this.$(".model-btn-save-blank").removeAttr('disabled');
			}	
			
	},
	valid: function(){
    	clear_alert();
    	set_alert('success','Yeaps!','success on validating!')
  	},
  	invalid: function(){
    	clear_alert();
    	set_alert('error','Ooh no!','Error on validating!')
  	},
  	updateModel: function(el){
	    var $el = $(el.target);
	    console.log($el);
	    //this.model.set($el.attr('name'), $el.val());
  	}

});

var DataGridView = Backbone.View.extend({
		el: '.tb-data',
		initialize: function(){
			this.model.on('destroy',this.removeRow, this);
		},
		events: {
			//'click tr[data-id]': 'rowSelect',
			//'dblclick tr[data-id]': 'rowDblclick',
			'click .select-all': 'selectAll',
			'click .row-edit': 'rowEdit',
			'click .row-delete': 'rowDelete'
		},
		rowSelect: function(e){
			clear_alert();
			var id = $(e.currentTarget).data('id');
			this.model.set({'id':id});	
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				}	
			});	
		},
		rowDblclick: function(e){
			console.log('row Dblclick');
		},
		removeRow: function(){
			oTable.fnDeleteRow($('tr#'+ this.model.get('id')));	
		},
		selectAll: function(e){
			var $checkboxes = $("tbody tr td:first-of-type input[type=checkbox]");
			if($(e.currentTarget).is("input:checked")){
				$checkboxes.prop('checked',true);
			} else {
				$checkboxes.prop('checked',false);
			}
		},
		rowEdit: function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = this;
			var tb = $(".table-model").data('table');
			console.log(tb);
			//tb = capitaliseFirstLetter(tb);
			//this.model.set({mode: 'edit', text: tb + ': Edit Record'});
			this.model.set({mode: 'edit', text: 'Edit Record'});
			//console.log(this.options.settings.toJSON());
			var id = $(e.currentTarget).parent().parent().parent().data('id');

			
			
			this.model.set({'id':id});	
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				},
				success: function(model, respone){
					that.renderToFormForEdit(respone);
				}	
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$(".modal").modal('show');  
			
		},
		rowDelete: function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = this;

			this.model.set({mode: 'delete', text: 'Delete Record'});
			//console.log(this.options.settings.toJSON());
			var id = $(e.currentTarget).parent().parent().parent().data('id');
			this.model.set({'id':id});	
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				}	
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$(".modal").modal('show');
			
		},
		renderToFormForEdit: function(data){
			for(key in data){
				if(key.substr(key.length - 2) === 'id'){
					$(".table-model").find('#'+key+' option[value='+data[key]+']').attr('selected', 'selected');
				}
			}
		},
		renderToFormForDelete: function(data){
			for(key in data){
				if(key.substr(key.length - 2) === 'id' || key =='type'){
					var opt = $(".table-model").find('#'+key+' option[value='+data[key]+']').text();
					console.log(key);
					$(".table-model-delete").find('#'+key).val(opt);
				}
			}
		}
	});



var BrandModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-brand-tpl').html());
        this.template2 = _.template($('#modal-brand-readonly-tpl').html());
	}
});

var ModelModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-model-tpl').html());
        this.template2 = _.template($('#modal-model-readonly-tpl').html());
	}
});

var PropcatModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-propcat-tpl').html());
        this.template2 = _.template($('#modal-propcat-readonly-tpl').html());
	}
});

var PropertyModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-property-tpl').html());
        this.template2 = _.template($('#modal-property-readonly-tpl').html());
	}
});

var ItemcatModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-itemcat-tpl').html());
        this.template2 = _.template($('#modal-itemcat-readonly-tpl').html());
	}
});

var ItemModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-item-tpl').html());
        this.template2 = _.template($('#modal-item-readonly-tpl').html());
	}
});

var ProdcatModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-matcat-tpl').html());
        this.template2 = _.template($('#modal-matcat-readonly-tpl').html());
	}
});

var ProductModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-material-tpl').html());
        this.template2 = _.template($('#modal-material-readonly-tpl').html());
	}
});

var SupplierModal = ModalBodyView.extend({
	initialize: function() {
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-supplier-tpl').html());
        this.template2 = _.template($('#modal-supplier-readonly-tpl').html());
	}
});

var BankModal = ModalBodyView.extend({
	initialize: function() {
		Backbone.Validation.bind(this);
		this.modalTitle = this.$('.modal-title');
		this.model.on('change', this.render, this);
		this.template = _.template($('#modal-bank-tpl').html());
        this.template2 = _.template($('#modal-bank-readonly-tpl').html());
        this.model.on('validated:valid', this.valid, this);
    	this.model.on('validated:invalid', this.invalid, this);
	}
});











//////////////// from model.js

var ModelpropView = Backbone.View.extend({
		tagName: 'tr',
		initialize: function(){

			this.model.on('remove', this.removeMe, this);
			this.model.on('destroy', this.render, this);
			this.model.on('change', this.render, this);
			
			this.template = _.template('<td> <%=category%> '+
				'<div class="tb-data-action" data-property="<%=property%>">'+
				'<a class="row-delete" data-id="" href="#">&nbsp;</a>'+
				'<a class="row-edit" data-id="" href="#">&nbsp;</a>'+
				'</div></td>'+
				'<td> <%=property%> </td>' +
				'<td> <%=value%> </td>');
		},
		events: {
			'dblclick td:first-of-type' : "clickMe"
			//'click .row-edit': "editMe"
			//'click .row-delete': "removeMe"
		},
		render: function(){			
			var that = this;
			//item.url = '../api/s/item/'+  this.model.get('itemid');


			property.set({id: this.model.get('propertyid')});
			property.fetch({
				success: function(model, respone){
					var data = {
		                "category": model.get('propcat'),
		                "property": model.get('descriptor'),
		                "value": that.model.get('descriptor') //or code
		            }

		            that.$el.html(that.template(data));
				}
			});
			return this;
		},
		clickMe: function(e){
			console.log("dsfsafsdadfafafa");
		},
		removeMe: function(){

			this.$el.remove();
			removedModel.push(this.model);
		},
		editMe: function(e){
			e.preventDefault();
			$("#mdl-detail-save-item").text('Save Changes');

			this.index;
			//var index = this.collection.indexOf(this.model);
			this.index = $(e.currentTarget).closest('tr').index();
			//console.log(this.model.toJSON());

			this.renderToForm();

			$('.table-detail .collection-index').val(this.index);

		}
	});


	var ModelpropsView = Backbone.View.extend({
		el: '.items-tbody',
		initialize: function(){
			//console.log(this.collection);

			this.collection.on('reset', this.addAll, this);
			this.collection.on('add', this.addOne, this);
		},
		events: {
			'click .row-edit': "editMe",
			'click .row-delete': "removeMe"
		},
		render: function(){
			this.addAll();
			return this;
		},
		addOne: function(modelprop){

			var modelpropView = new ModelpropView({model: modelprop});
			this.$el.append(modelpropView.render().el);
			//return this;
		},
		addAll: function(){
			this.collection.forEach(this.addOne, this);
		},
		editMe: function(e){
			e.preventDefault();
			$("#mdl-detail-save-item").text('Save Changes');

			var idx = $(e.currentTarget).closest('tr').index();
			var itemName = $(e.currentTarget).parent().data('property');
			var m = this.collection.at(idx);

			this.renderToForm(m);

			$('.modal-table-detail .search-detail').val(itemName);

		},
		removeMe: function(e){
			e.preventDefault();
			var idx = $(e.currentTarget).closest('tr').index();
			var m = this.collection.at(idx);

			this.collection.remove(m); // ApvdtlView.removeMe triggered
		},
		renderToForm: function(model){
			var attrs = { }, k;
	        for(k in model.attributes) {
	            attrs[k] = model.attributes[k];

	            $('.modal-table-detail #'+k).val(attrs[k])    
	        }
		}
	});


///// for the 2nd child in product.js
var ModelpropView2 = Backbone.View.extend({
		tagName: 'tr',
		initialize: function(){

			this.model.on('remove', this.removeMe, this);
			this.model.on('destroy', this.render, this);
			this.model.on('change', this.render, this);
			
			this.template = _.template('<td> <%=category%> </td>'+
				//'<div class="tb-data-action" data-property="<%=property%>">'+
				//'<a class="row-delete" data-id="" href="#">&nbsp;</a>'+
				//'<a class="row-edit" data-id="" href="#">&nbsp;</a>'+
				//'</div></td>'+
				'<td> <%=property%> </td>' +
				'<td> <%=value%> </td>');
		},
		events: {
			'dblclick td:first-of-type' : "clickMe"
			//'click .row-edit': "editMe"
			//'click .row-delete': "removeMe"
		},
		render: function(){			
			var that = this;
			//item.url = '../api/s/item/'+  this.model.get('itemid');


			property.set({id: this.model.get('propertyid')});
			property.fetch({
				success: function(model, respone){
					var data = {
		                "category": model.get('propcat'),
		                "property": model.get('descriptor'),
		                "value": that.model.get('descriptor') //or code
		            }

		            that.$el.html(that.template(data));
				}
			});
			return this;
		},
		clickMe: function(e){
			console.log("dsfsafsdadfafafa");
		},
		removeMe: function(){

			this.$el.remove();
			removedModel.push(this.model);
		},
		editMe: function(e){
			e.preventDefault();
			$("#mdl-detail-save-item").text('Save Changes');

			this.index;
			//var index = this.collection.indexOf(this.model);
			this.index = $(e.currentTarget).closest('tr').index();
			//console.log(this.model.toJSON());

			this.renderToForm();

			$('.table-detail .collection-index').val(this.index);

		}
	})


var ModelpropsView2 = Backbone.View.extend({
		el: '.items-tbody2',
		initialize: function(){
			//console.log(this.collection);

			this.collection.on('reset', this.addAll, this);
			this.collection.on('add', this.addOne, this);
		},
		render: function(){
			this.$el.html('');
			this.addAll();
			return this;
		},
		addOne: function(modelprop){

			var modelpropView2 = new ModelpropView2({model: modelprop});
			this.$el.append(modelpropView2.render().el);
			//return this;
		},
		addAll: function(){
			this.collection.forEach(this.addOne, this);
		}
	});





$(document).ready(function(e) {

	
	
	
});