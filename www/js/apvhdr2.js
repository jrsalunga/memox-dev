	var ModalSettings = Backbone.Model.extend({});
	var modalSettings = new ModalSettings();
	

	var Apvdtl = Backbone.Model.extend({
		urlRoot: '../api/s/apvdtl',
		defaults: {
			itemid: '',
			amount: 0
		}
	});

	Apvdtls = Backbone.Collection.extend({
		model: Apvdtl,
		initialize: function(){
			
		},
		saveAll: function(apvdtl) {

	        _.each(removedModel, function(item){
	        	item.destroy();
	        } );
	        
	        removedModel = [];

	        _.each(this.models, function(apvdtl) {
	            apvdtl.set({'apvhdrid': apvhdr.get('id')}, {silent: true});
	       		apvdtl.save();
	        });
	    },
	    onAddModel: function(model){
			//console.log('set apvhdrid');	
			model.set({'apvhdrid': apvhdr.get('id')}, {silent: true});
		},
		getFieldTotal: function(field){
			return this.reduce(function(memo,value){
				return memo + parseFloat(value.get(field))
			}, 0)
		}
		
	});
	
	

	var Apvhdr = Backbone.Model.extend({
		urlRoot: "../api/s/apvhdr",
		initialize: function(){

			this.on('change:id', function(){
				this.id = this.get('id');
			}, this);
			
			this.apvdtls = new Apvdtls();
			
		},
		defaults: {
			refno: '',
			date: '',
			supplierid: '',
			supprefno: '',
			porefno: '',
			terms: '',
			totamount: '',
			balance: '',
			notes: '',
			posted: '',
			cancelled: '',
			printctr: '',
			totline: ''
		}, 
		validation: {
			apvhdr: {
		    	required: true,
				msg: 'Please enter a value'
		   	},
		   	itemid: {
		    	required: true,
				msg: 'Please enter a account number'
		   	}	
		},
		blank: function(){
			this.clear();
			return this.defaults;
		}
	});
	var apvhdr = new Apvhdr();



	



	var ParentChildModal = Backbone.View.extend({
		el: '.modal-dialog',
		initialize: function(){



			//this.templateParent = _.template($('#modal-apvhdr-tpl').html());
			this.templateChild = _.template($('#modal-apvdtls-tpl').html());
			this.templateItems = _.template($('#modal-items-tpl').html());
			this.render();
		},
		render: function(){


			//this.$el.find('.modal-body-parent').html(this.templateParent());
			this.$el.find('.modal-body-child').html(this.templateChild());
			this.$el.find('.modal-body-item').html(this.templateItems());

			$(".table-model #date").datepicker({"dateFormat": "yy-mm-dd",
				select: function(event, ui){
				
				}
			});
			return this;
		}
	});




















var DataGridView = Backbone.View.extend({
		el: '.tb-data',
		initialize: function(){
			this.model.on('destroy',this.removeRow, this);

			this.settings = this.options.settings;
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

			this.settings.set({mode: 'edit', text: 'Edit Record'});
			//console.log(this.options.settings.toJSON());
			var id = $(e.currentTarget).parent().parent().parent().data('id');
			this.model.set({'id':id});
			this.model.fetch();
			this.model.apvdtls.url = '../api/txn/v/apvdtl/apvhdr/'+ this.model.get('id');
			this.model.apvdtls.fetch();
			/*
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				},
				success: function(model, respone){
					//console.log(respone)
					//that.renderToFormForEdit(respone);

					//var apvhdrView = new ParentChildModal({model: apvhdr, collection: apvdtls});
					apvdtls.reset();
					apvdtls.url = '../api/txn/apvdtl/apvhdr/'+ model.get('id');
					apvdtls.fetch();			
				}	
			});	
			*/
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$(".modal").modal('show');  
			
		},
		rowDelete: function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = this;

			this.settings.set({mode: 'delete', text: 'Delete Record'});
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

 






$(document).ready(function() {

	
	
	/*
	var apvhdrView = new ParentChildModal({model: apvhdr, collection: apvdtls}) ;

	var detailView = new ModalDetailView({model: apvhdr, collection: apvdtls});
	detailView.render();

	var formDetailView = new FormDetailView({model: apvdtl, collection: apvdtls});
	formDetailView.render();

	apvhdr.set({
		refno: '00001',
		date: '2013-07-17',
		terms: 5,
		balance: 100.90,
		totline: 4,
		totamount: 20.20 
	});

	apvhdrView.populate();

	apvdtls.add([
		{
			itemid: '2d39aa80235411e3979cc0188508f93c',
			amount: 1
		},
		{
			itemid: '2f23e8bc22b911e3b8cbc0188508f93c',
			amount: 5249.99
		},
		{
			itemid: '63890fd622c211e3b8cbc0188508f93c',
			amount: 11.12
		},
		{
			itemid: '09b0054c22b611e3b8cbc0188508f93c',
			amount: 11.10
		}

	]);
	//console.log(apvhdr.items);
	//console.log(apvhdr.toJSON());
	*/


});
	