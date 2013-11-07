var removedModel = [];
var date = new Date();




///// transfered to collections.js
/*
Modelprops = Backbone.Collection.extend({
	model: Modelprop,
	initialize: function(){
		//this.on('add', this.isNewModel, this);
	},
	saveAll: function(modelprop) {

        _.each(removedModel, function(item){
        	item.destroy();
        } );
        
        removedModel = [];
        //console.log(product.toJSON());
        _.each(this.models, function(modelprop) {

        	
        	if(modelprop.isNew()){
        		modelprop.set({'modelid': model.get('id')}, {silent: true});
       			modelprop.save({},{
	       			success: function(model, respone){
	       				
	       			}
       			});
        	} else {
        		if(!modelprop.changedAttributes()){
	        		console.log('not changed');
	        	} else {
	        		console.log('changed');
	        		modelprop.set({'modelid': model.get('id')}, {silent: true});
	       			modelprop.save({},{
		       			success: function(model, respone){
		       				
		       			}
	       			});
	        	}
        	}
        	

           
        });

        
    }
});
var modelprops = new Modelprops();

*/




////// tranfered to views.js
/*
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


*/


var	ParentChildModal = Backbone.View.extend({
		//el: '.modal-parent-child',
		el: '.modal-dialog',
		initialize: function(){
			
			this.modalTitle = this.$('.modal-title');
			var items = this.collection;
			items.on('change', this.childChanged, this);
			items.on('add', this.childAdd, this);
			items.on('remove', this.childChanged, this);
			items.on('reset', this.clearItemsBody, this);
			
			//this.populate();
			this.model.on('change:code', this.populate, this);
			//this.model.on('change:brandid', this.renderBrandSelector, this);
			//this.model.on('change:descriptor', this.renderDescriptor, this);
			//this.model.on('change:totamount', this.repopulateAmount, this);
			this.model.on('change:mode', this.checkMode, this);


			this.templateParent = _.template($('#modal-model-tpl').html());
			this.templateChild = _.template($('#modal-modelprops-tpl').html());
			this.templateItems = _.template($('#modal-items-tpl').html());
			this.render();
			

		},
	    events: {
	    	'click .model-btn-save': 'modalSave',
	    	'click .model-btn-save-blank': 'modalSave',
	    	'click .model-btn-delete': 'modalDelete',
	    	'click .model-btn-cancel': 'modalCancel',
	    	'click .model-btn-yes': 'modalConfirmDelete',
	    	//'click input[type=checkbox].toggle': 'toggleSerialized',
	    	'keyup input': 'checkValidity',
	    	'blur .table-model input': 'checkValidity',
	    	//'blur input': 'updateModel', kelangan mo pa ito gawin about validationError
	    	'change select': 'checkValidity'
	    	//'blur textarea': 'checkValidity',
	    	//'change #brandid': 'renderModelSelector',
	    	//'change #modelid': 'renderModelDescriptor'
	    },
		render: function(){
			
			this.$el.find('.modal-body-parent').html(this.templateParent());
			this.$el.find('.modal-body-child').html(this.templateChild());
			this.$el.find('.modal-body-item').html(this.templateItems());

			this.modalChangeTitle();
			return this;
		},
		checkMode: function(){
			var attrs = { }, k;
			for(k in this.model.attributes) {
		        var mode = this.model.get('mode');
		        if(mode==='delete' || mode==='posting'){
		        	this.$el.find("#"+k).prop( "disabled", true );
		        	this.$el.find('.modal-tb-detail .tb-data-action').hide();
		        	
		        	console.log($('.modal-tb-detail .tb-data-action'));

		        	$('.modal-table-detail').hide();

		        	this.$el.find("#"+k).prop( "disabled", true );
		        	
		        } else {
		        	this.$el.find("#"+k).prop( "disabled", false );
		        	this.$el.find('.modal-tb-detail .tb-data-action').show();
		        	
		        	$('.modal-table-detail').show();
		        	
		        	this.$el.find("#"+k).prop( "disabled", false );
		        }    
		    }

		    this.modalChangeTitle();
		},
		populate: function(){
			var mode = this.model.get('mode');
		        if(mode==='delete'){
		        	//this.$el.find("#"+k).prop( "disabled", true );
		        	//this.$el.find(".toggle").prop( "disabled", true );
		        } else {
		        	//this.$el.find("#"+k).prop( "disabled", false );
		        	//this.$el.find(".toggle").prop( "disabled", false );
		        }

			var attrs = { }, k;
			for(k in this.model.attributes) {
				//attrs[k] = product.attributes[k];

		       	this.$el.find(".table-model #"+k).val(this.model.get(k));
		    }    


		    $('#modelTab a:first').tab('show');
		},
	    modalChangeMode: function(){
	    	this.modalChangeTitle();
	    },
		modalChangeTitle: function(){
	    	this.$('.modal-title').text(this.model.get('text'));  	
	    	
	    	var btn, mode = this.model.get('mode');

	        if(mode=='delete'){
	        	btn = '<p style="display: inline; float: left; margin: 10px 0; color: #3B5998;">Are you sure you want to delete this record?</p>';
	        	btn += '<button type="button" id="modal-btn-delete-yes" class="btn btn-primary model-btn-yes" data-dismiss="modal">Yes</button>';
	          	btn += '<button type="button" id="modal-btn-delete-no" class="btn btn-default model-btn-no" data-dismiss="modal" >No</button>';
	        
	          	//this.$('.modal-footer').html(btn);
	        } else if(mode=='posting'){

                btn = '<p style="display: inline; float: left; margin: 10px 0; color: #3B5998;">'
                btn += 'You are about to POST this transaction.';
                btn += 'Posted transactions may not be unposted; use adjusting transactions to reverse.';
                btn += '<br>Are you really sure?';
                btn += '</p>';
	        	btn += '<button type="button" id="modal-btn-post-yes" class="btn btn-primary model-btn-yes" data-dismiss="modal">Yes</button>';
	          	btn += '<button type="button" id="modal-btn-post-no" class="btn btn-default model-btn-no" data-dismiss="modal" >No</button>';
	        } else {
	          	btn = '<button type="button" id="modal-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>';
	          	btn += '<button type="button" id="modal-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>';
	          	btn += '<button type="button" id="modal-btn-cancel" class="btn btn-default model-btn-cancel" data-dismiss="modal">Cancel</button>';
	        	
	        	//this.$('.modal-footer').html(btn);
	        }
	        this.$('.modal-footer').html(btn);  
    	},
    	checkValidity: function(e){
    		var that = this;

			//var input = $(e.currentTarget);
			var req = this.$('.table-model input[required]', '.table-model');

			if(req){
				req.each(function(){
					if($(this).val()==''){
						//$(".model-btn-save").attr('disabled','disabled');	
						//$(".model-btn-save-blank").attr('disabled','disabled');
						that.btnSaveDisable();
					} else {
						//$(".model-btn-save").removeAttr('disabled');
						//$(".model-btn-save-blank").removeAttr('disabled');
						that.btnSaveEnable();
					}
				});
			} else {
				that.btnSaveEnable();
				//this.$(".model-btn-save").removeAttr('disabled');
				//this.$(".model-btn-save-blank").removeAttr('disabled');
			}	
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
				console.log(this.model.toJSON());
				this.model.unset('mode', {silent: true}); //remove the added model field
				this.model.unset('text', {silent: true}); 
				//this.model.unset('childchanged', {silent: true});
				//this.model.unset('code', {silent: true});
				this.model.unset('status', {silent: true});
				this.model.unset('message', {silent: true});
				//console.log(this.model.attributes);
				console.log(this.model.toJSON());
				
				var childchanged = this.model.get('childchanged');
				
				this.model.save({},{
			  		success: function(model, respone){
			  			if(respone.status==='error'){
			  				console.log(respone);
			  				console.log(childchanged);
			  				if(respone.code == '504' && childchanged == true){
			  				//if(respone.code == '504'){
			  					that.collection.saveAll();
			  					
			  					set_alert2('success','Well done!', 'property changes has been saved!');
			  				} else {
			  					set_alert2(respone.status, 'Oh snap!', respone.message);	
			  				}
			  				
			  			} else if(respone.status==='warning'){
			  				set_alert2(respone.status, 'Warning!', respone.message);
			  			} else {
			  				if(isnew){
			  					console.log(respone);
			  					addTableData2(respone);
			  					
								set_alert2('success','Well done!', 'Success on saving!');
							} else {
								updateTableData3(respone);
								set_alert2('success','Yeay!', 'Success on updating!');
							}

							that.collection.saveAll();
			  			}
					}	
			  	});
				
			} else {
				console.log("invalid :"+ this.model.validationError);
			}

			this.model.set({childchanged: false}, {silent: true});
	    },
	    clearForm: function(){
	    	this.model.blank(); // added next line because model.clear delete all attrib
	    	
	    	this.collection.reset();
	    	this.$el.find('.table-model').clearForm();
    	},
    	clearItemsBody: function(){
    		this.$el.find('.items-tbody').html('');
    	},
    	childChanged: function(){ 
    		this.model.set({childchanged: true}, {silent:true});
    		this.checkValidity(); 
    		//this.btnSaveEnable();
    	},
    	childAdd: function(modelprop){
    		console.log(modelprop.isNew());
    		if(modelprop.isNew()){
    			this.model.set({childchanged: true}, {silent:true});
    			this.checkValidity(); 
    			//this.btnSaveEnable();
    		}
    		
    	},
    	cleanModelData: function(){
    		// clean data before saving
    		this.model.unset('mode', {silent: true}); //remove the added model field
			this.model.unset('text', {silent: true}); 
			//this.model.unset('childchanged', {silent: true});
			//this.model.unset('code', {silent: true});
			this.model.unset('status', {silent: true});
			this.model.unset('message', {silent: true});
    	},
    	btnSaveEnable: function(){
    		$(".model-btn-save").prop('disabled', false);	
			$(".model-btn-save-blank").prop('disabled', false);
    	},
    	btnSaveDisable: function(){
    		$(".model-btn-save").attr('disabled', true);	
			$(".model-btn-save-blank").attr('disabled', true);
    	}

	});


var	ModalDetailView = Backbone.View.extend({
		el: '.modal-tb-detail',
		initialize: function(){

			this.setDataId();
			this.model.on('change:id', this.setDataId, this);
			//this.collection.on('add', this.computeTotal, this);
		},
		render: function(){

			var modelpropsView = new ModelpropsView({collection: modelprops});
			modelpropsView.render();
			
			return this;
		},
		setDataId: function(){
			this.$el.attr('data-modelid', this.model.get('id'));
		},
		computeTotal: function(){
			var that = this;
			var totqty = 0;
			this.span = this.$el.children('tfoot').find('span.total');

			
		}
	});


var	FormDetailView = Backbone.View.extend({
		el: '.modal-table-detail',
		initialize: function(){
			
		},
		events: {
			'click #mdl-detail-save-item': 'saveItem',
			'click #mdl-detail-cancel-item': 'cancelItem'
		},
		saveItem: function(){
			modelIndex = this.$el.find('.collection-index').val();
			if(_.isEmpty(modelIndex)){
				this.addItem();
			} else {
				this.updateItem(modelIndex);
			}

		},
		updateItem: function(idx){

			var m = this.collection.at(idx);
			var data = {
				//"id": $('.table-detail #id').val(),
				"qty": parseInt($('.table-detail #qty').val()),
				"unitcost": parseFloat($('.table-detail #unitcost').val())
			}
			m.set(data);
			console.log(m.toJSON());
		},
		addItem: function(){

			var data = this.$el.serializeObject2();
			
			console.log(data);

			if(_.isEmpty(data)){
				console.log('empty');
				$(".search-detail").focus();
			} else {
				if(!data.propertyid || !data.descriptor){
					if(!data.propertyid){
						this.$(".search-detail").val('');
						this.$(".search-detail").focus();
					} else {
						this.$("#descriptor").focus();
					}
				} else {
					
					if(data.id==undefined || data.id==''){
						console.log('add to collection');
						data['id'] = guid();
						console.log(data);
						this.collection.add(data);	

						$(".search-detail-icon").removeClass("success");
					} else {
						console.log('edit to collection');
						this.collection.each(function(modelprop){
							//console.log(modelprop.toJSON());
							if(data.id == modelprop.get('id')){
								var attrs = { }, k;
						        for(k in modelprop.attributes) {
						            attrs[k] = modelprop.attributes[k];
						            console.log(data[k] +'-'+ attrs[k]);
						            if(data[k] == attrs[k]){
						            	console.log('same');
						            } else {
						            	console.log('not same');
						            	modelprop.set(k, data[k]);
						            }
						           
						        }
							}
						}, this);
						//this.collection.set(data);
					}
					

					this.clearForm();
					$(".search-detail").focus();
					$("#mdl-detail-save-item").text('Add');
				}
			}

			
		},
		cancelItem: function(e){
			this.clearForm();
			$("#mdl-detail-save-item").text('Add');
		},
		clearForm: function(){
			this.$el.clearForm()
		},
		renderToForm: function(data){
			console.log(data);
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

			this.model.set({mode: 'edit', text: 'Edit Model Record'});
			//console.log(this.options.settings.toJSON());
			var id = $(e.currentTarget).parent().parent().parent().data('id');
			this.model.set({'id':id});	
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				},
				success: function(model, respone){
					//console.log(respone)
					//that.renderToFormForEdit(respone);

					//var apvhdrView = new ParentChildModal({model: apvhdr, collection: apvdtls});
					modelprops.reset();
					modelprops.url = '../api/txn/modelprop/model/'+ model.get('id');
					modelprops.fetch();			
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

			this.model.set({mode: 'delete', text: 'Delete Model Record'});
			//console.log(this.options.settings.toJSON());
			var id = $(e.currentTarget).parent().parent().parent().data('id');
			this.model.set({'id':id});	
			this.model.fetch({
				beforeSend: function(){
					//console.log('fetching: '+ id);
				},
				success: function(model, respone){
					//console.log(respone)
					//that.renderToFormForEdit(respone);

					//var apvhdrView = new ParentChildModal({model: apvhdr, collection: apvdtls});
					modelprops.reset();
					modelprops.url = '../api/txn/modelprop/model/'+ model.get('id');
					modelprops.fetch();			
				}		
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$(".modal").modal('show');
			
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