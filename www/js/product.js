var removedModel = [];
var date = new Date();





var ModelSelectView = Backbone.View.extend({
	tagName: 'option',
	initialize: function(){
		this.model.on('change', this.render, this);
	},
	render: function(){
		
		if(product.get('modelid') == this.model.get('id')){
			this.$el.attr('selected', 'selected');
		}

		this.$el.val(this.model.get('id'));
		this.$el.html(this.model.get('descriptor'));
		return this;
	}
});

var ModelSelectsView = Backbone.View.extend({
	el: '#modelid',
		initialize: function(){
			this.collection.on('reset', this.addAll, this);
			this.collection.on('add', this.addOne, this);
		},
		render: function(){
			this.$el.html('');
			this.addAll();
			return this;
		},
		addOne: function(model){
			var modelSelectView = new ModelSelectView({model: model});
			this.$el.append(modelSelectView.render().el);
		},
		addAll: function(){
			this.collection.forEach(this.addOne, this);
		}


});




Prodprops = Backbone.Collection.extend({
	model: Prodprop,
	initialize: function(){
		//this.on('add', this.isNewModel, this);
	},
	saveAll: function(prodprop) {

        _.each(removedModel, function(item){
        	item.destroy();
        } );
        
        removedModel = [];
        //console.log(product.toJSON());
        _.each(this.models, function(prodprop) {

        	//console.log(prodprop.changedAttributes());
        	//console.log(prodprop.changed);
        	if(prodprop.isNew()){
        		prodprop.set({'productid': product.get('id')}, {silent: true});
       			prodprop.save({},{
	       			success: function(model, respone){
	       				
	       			}
       			});
        	} else {
        		if(!prodprop.changedAttributes()){
	        		console.log('not changed');
	        	} else {
	        		console.log('changed');
	        		prodprop.set({'productid': product.get('id')}, {silent: true});
	       			prodprop.save({},{
		       			success: function(model, respone){
		       				
		       			}
	       			});
	        	}
        	}
        	

           
        });

        
    }
});
var prodprops = new Prodprops();





	var ProdpropView = Backbone.View.extend({
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

		},
		templateData: function(){
			// rewrite model to render for view
			var attrs = { }, k;
	        for(k in this.model.attributes) {
	            attrs[k] = this.model.attributes[k];
	            if(k === 'amount') {
	            	attrs[k] = accounting.formatMoney(attrs[k],{symbol:""});
	            } else if(k==='itemid'){
	            	//i = new Item({id: attrs[k]});
	            	item.set({id: attrs[k]});
	            	item.fetch({
	            		success: function(model, respone){
	            			//console.log(respone.descriptor);
	            			//var d = respone.descriptor;
	            		}
	            	});	

	            	
	            }
	        }
	        //console.log(attrs);
        	return attrs;
		}
	});


	var ProdpropsView = Backbone.View.extend({
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
		addOne: function(prodprop){

			var prodpropView = new ProdpropView({model: prodprop});
			this.$el.append(prodpropView.render().el);
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
			console.log(itemName);
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





var	ParentChildModal = Backbone.View.extend({
		//el: '.modal-parent-child',
		el: '#mdl-frm-product .modal-dialog',
		initialize: function(){
			
			this.modalTitle = this.$('.modal-title');
			var items = this.collection;
			items.on('change', this.childChanged, this);
			items.on('add', this.childAdd, this);
			items.on('remove', this.childChanged, this);
			items.on('reset', this.clearItemsBody, this);
			
			//this.populate();
			this.model.on('change:code', this.populate, this);
			this.model.on('change:brandid', this.renderBrandSelector, this);
			this.model.on('change:descriptor', this.renderDescriptor, this);
			this.model.on('change:modelid', this.loadModelProps, this);
			//this.model.on('change:totamount', this.repopulateAmount, this);
			this.model.on('change:mode', this.checkMode, this);


			this.templateParent = _.template($('#modal-product-tpl').html());
			this.templateChild = _.template($('#modal-prodprops-tpl').html());
			this.templateItems = _.template($('#modal-items-tpl').html());
			this.render();
			//this.renderModelSelector();

		},
		showfields: {
			id: 'id',
			code: 'Code',
			brand: 'Brand',
			model: 'Model',
			descriptor: 'Descriptor',
			category: 'Category',
			type: 'Type',
			onhand: 'Onhand',
			minlevel: 'Min Level',
			maxlevel: 'Max Level',
			reorderqty: 'Reorder Qty',
			unitprice: 'Unit Price',
			avecost: 'Ave Cost'
		},
	    events: {
	    	'click .model-btn-save': 'modalSave',
	    	'click .model-btn-save-blank': 'modalSave',
	    	'click .model-btn-delete': 'modalDelete',
	    	'click .model-btn-cancel': 'modalCancel',
	    	'click #modal-btn-delete-yes': 'modalConfirmDelete',
	    	'click input[type=checkbox].toggle': 'toggleSerialized',
	    	'blur .table-model input': 'checkValidity',
	    	//'blur input': 'updateModel', kelangan mo pa ito gawin about validationError
	    	'change select': 'checkValidity',
	    	'blur textarea': 'checkValidity',
	    	'change #brandid': 'renderModelSelector',
	    	'change #modelid': 'renderModelDescriptor',
	    	'keyup #code': 'toUpper'
	    },
	    toUpper: function(e){
	    	//console.log('to upper');
	    	return $(e.currentTarget).val($(e.currentTarget).val().toUpperCase());
	    },
		render: function(){

			
			this.$el.find('.modal-body-parent').html(this.templateParent());
			this.$el.find('.modal-body-child').html(this.templateChild());
			
			this.$el.find('.modal-body-item').html(this.templateItems());

			
			

			var dropbox = this.$el.find('#dropbox');
			message = $('.message', dropbox);	
			
			dropbox.filedrop({
				// The name of the $_FILES entry:
				fallback_id: 'file_upload',
				paramname:'pic',
				
				maxfiles: 5,
		    	maxfilesize: 2,
				url: 'post_file.php',
				uploadFinished:function(i,file,response){
					$.data(file).addClass('done');
					// response is the JSON object that post_file.php returns
					console.log(file);
					$('#picfile').val(file.name);
				},
		    	error: function(err, file) {
					switch(err) {
						case 'BrowserNotSupported':
							showMessage('Your browser does not support HTML5 file uploads!');
							break;
						case 'TooManyFiles':
							alert('Too many files! Please select 5 at most! (configurable)');
							break;
						case 'FileTooLarge':
							alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
							break;
						default:
							break;
					}
				},	
				// Called before each upload is started
				beforeEach: function(file){
					if(!file.type.match(/^image\//)){
						alert('Only images are allowed!');
						
						// Returning false will cause the
						// file to be rejected
						return false;
					}
				},	
				uploadStarted:function(i, file, len){
					createImage(file);
				},
				progressUpdated: function(i, file, progress) {
					$.data(file).find('.progress').width(progress);
				}
		    	 
			});
		
			var template = '<div class="preview">'+
								'<span class="imageHolder">'+
									'<img />'+
									'<span class="uploaded"></span>'+
								'</span>'+
								'<div class="progressHolder">'+
									'<div class="progress"></div>'+
								'</div>'+
							'</div>'; 

			function createImage(file){

				var preview = $(template), 
					image = $('img', preview);
					
				var reader = new FileReader();
				
				image.width = 100;
				image.height = 100;
				
				reader.onload = function(e){
					
					// e.target.result holds the DataURL which
					// can be used as a source of the image:
					
					image.attr('src',e.target.result);
				};
				
				// Reading the file as a DataURL. When finished,
				// this will trigger the onload function above:
				reader.readAsDataURL(file);
				
				message.hide();
				//preview.appendTo(dropbox);
				preview.appendTo(dropbox).prev(preview).remove();
				
				
				// Associating a preview container
				// with the file, using jQuery's $.data():
				
				$.data(file,preview);
			}

			function showMessage(msg){
				message.html(msg);
			}
		
			var file_select = $('#file_upload');
			
			file_select.on('change', function(){
				var oFile = document.getElementById('file_upload').files[0];
				console.log(oFile);
			});

			this.modalChangeTitle();
			return this;
		},
		renderModelSelector: function(e){
			var that = this;
			var brandid = $('#brandid').val();
			console.log(brandid);
			

			if(brandid!=undefined){
				var modelsSelector = new Models();
				modelsSelector.url = '../api/s/model?brandid='+ brandid;
				modelsSelector.fetch({
					success: function(collection, respone){
						var model = collection.at(0).get('descriptor');
						var brand = $("#brandid option:selected").text();
						
						// issue: fill desc if no desc OR overwrite existing?
						if(that.model.get('descriptor')==undefined || that.model.get('descriptor')==''){
							that.model.set({descriptor: brand +' '+ model});
						}	
					}
				});
			}
			
			
			var modelSelectsView = new ModelSelectsView({collection: modelsSelector});
			modelSelectsView.render();	

			//if(_.isEmpty(e))

			//console.log($(e.currentTarget).closest("#descriptor"));
		},
		renderModelDescriptor: function(e){
			var brand = $("#brandid option:selected").text();
			var model = $('option:selected', e.currentTarget).text();
			this.model.set({descriptor: brand +' '+ model});

			//console.log($('option:selected', e.currentTarget).val());
			this.model.set({descriptor: brand +' '+ model});
			
			// fires this.loadModelProps()
			this.model.set({modelid: $('option:selected', e.currentTarget).val()}); 
		},
		renderDescriptor: function(){
			// render to DOM every: model.on('change:descriptor')

			
			this.$el.find('.table-model #descriptor').val(this.model.get('descriptor'));	
		},
		checkMode: function(){
			var mode = this.model.get('mode');
			
		        if(mode=='delete'){
		        	
		        	this.modelInputsDisable();
		        	this.dataActionHide();
		        } else {
		        	
		        	this.modelInputsEnable();
		        	this.dataActionShow();
		        }

		    this.modalChangeTitle();
		},
		populate: function(){
			var that = this;
			
			this.btnSaveDisable();
			
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
				attrs[k] = product.attributes[k];
				//console.log(k+' - '+attrs[k]);
		        if(k=='modelid'){
		        	//if(this.model)
		        	this.renderModelSelector();
		        } else if(k=='serialized'){
		        	
		        	if(attrs[k] == 0){
		        		this.$el.find(".table-model #toogle-"+k).prop('checked', false);
		        	} else {
		        		this.$el.find(".table-model #toogle-"+k).prop('checked', true);
		        	}
		        } else {
		       		//console.log(k+' - '+attrs[k]);
		       		this.$el.find(".table-model #"+k).val(this.model.get(k));
		       		
		       		if(k=='picfile'){
		       			var template;
		       			if(_.isEmpty(attrs[k])){
		       				template = '<span class="message">'+
											'Drop images here to upload.<br>'+
											'<i>(they will only be visible to you)</i>'+
											'</span>';
		       			} else {
		       				template = '<div style="text-align: center;">'+
											'<span class="imageHolder">'+
												'<img src="../images/products/'+ attrs[k] +'"/>'+
												'<span class="uploaded"></span>'+
											'</span>'+
										'</div>'; 
		       			}
		       			
		       			//console.log($("#dropbox"));
		       			$("#dropbox").html(template);
		       			
		       		}
		        }   
		    }    

		    /* REPLACE BY loadModelProps()
		    if(this.model.get('modelid')!=undefined){
			    var modelprops = new Modelprops();
			    modelprops.reset();
				modelprops.url = '../api/txn/modelprop/model/'+ this.model.get('modelid');
				modelprops.fetch({
					success: function(collection, respone){
						//console.log(collection);
						var modelpropsView2 = new ModelpropsView2({collection: modelprops});
						modelpropsView2.render();
						//console.log(modelpropsView2.el);
						//that.$el.find('.items-tbody2').html(modelpropsView2.el);
					}
				});	
			}
			*/



		   


		    $('#productTab a:first').tab('show');
		},/*
		repopulateAmount: function(){
			var attrs = { }, k;
			for(k in this.model.attributes) {
				if(k === 'totamount'){
		        	//console.log(JSON.stringify(this.model.toJSON()));
		        	var x = accounting.formatMoney(this.model.get('totamount'),{symbol:""});
		        	this.$el.find("#"+k).val(x);
		        } else if(k === 'totline'){
		        	
		        	this.$el.find("#"+k).val(this.model.get('totline'));
		        }  

		    }
		},*/
	    modalChangeMode: function(){
	    	this.modalChangeTitle();
	    },
		modalChangeTitle: function(){
	    	this.$el.find('.modal-title').text(this.model.get('text')); 
	    		
	    	
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

			var input = $(e.currentTarget);
			var req = this.$('.table-model input[required]', '.table-model');

			var emptyField = this.$('[required]', '.table-model').filter(function() { 
																	return $(this).val() == ""; 
																});		
			if(emptyField.length==0){
				that.btnSaveEnable();
			} else {
				that.btnSaveDisable();
			}

			/*

			if(req){
				req.each(function(){					
					if($(this).val()==''){
						that.btnSaveDisable();	
					} else {
						that.btnSaveEnable();	
					}
				});
			} else {
				that.btnSaveEnable();
			}	
			*/
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
				//console.log(this.model.toJSON());
				this.model.unset('mode', {silent: true}); //remove the added model field
				this.model.unset('text', {silent: true}); 
				//this.model.unset('childchanged', {silent: true});
				//this.model.unset('code', {silent: true});
				this.model.unset('status', {silent: true});
				this.model.unset('message', {silent: true});
				//console.log(this.model.attributes);
				//console.log(this.model.toJSON());
				
				var childchanged = this.model.get('childchanged');
				
				this.model.save({},{
			  		success: function(model, respone){
			  			if(respone.status==='error'){
			  				//console.log(respone);
			  				//console.log(childchanged);
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
			  					var showData = that.addTableData(respone);
			  					console.log(showData);
			  					addTableData2(showData);
			  					
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
	    addTableData: function(respone){

	    	var attrs = { }, k, f;
			for(f in this.showfields) {
		         for(k in respone){
		         	if(f == k){
		         		attrs[f] = respone[f]
		         	} 
		    	}
		    }
	    	return attrs;
	    },
	    clearForm: function(){
	    	this.model.blank(); // added next line because model.clear delete all attrib
	    	var dropbox = this.$el.find('#dropbox');
	    	dropbox.html('<span class="message">Drop images here to upload.<br><i>(they will only be visible to you)</i></span>');
	    	this.collection.reset();
	    	this.$el.find('.table-model').clearForm();
    	},
    	clearItemsBody: function(){
    		this.$el.find('.items-tbody').html('');
    		//this.$el.find('.items-tbody2').html('');
    	},
    	toggleSerialized: function(e){
    		var input = $(e.currentTarget);
    		var i = input.data('input');
			
			if(input.prop('checked')){
	    		this.$el.find('#'+ i).val(1);
	    	} else {
				this.$el.find('#'+ i).val(0);
			}
    	},
    	childChanged: function(){ 
    		this.model.set({childchanged: true}, {silent:true});
    		this.btnSaveEnable();
    	},
    	childAdd: function(prodprop){
    		//console.log(prodprop.isNew());
    		if(prodprop.isNew()){
    			this.model.set({childchanged: true}, {silent:true});
    			this.btnSaveEnable();
    		}
    	},
    	modalConfirmDelete: function(){

    		var that = this;

			$.ajax({
		        type: 'GET',
		        contentType: 'application/json',
				url: '../api/txn/delete/prodprop/product/'+ this.model.get('id'),
		        dataType: "json",
		        async: false,
		        //data: formData,
		        success: function(data, textStatus, jqXHR){
					aData = data; 			
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		            alert(textStatus + 'Failed on deleteing modelprop data');
		        }
		    });

    		console.log(aData);
    		//if(aData.status == 'ok'){
    			this.model.destroy({
			    	success: function(model, respone){
			    		console.log(respone);
			    		set_alert2('success', 'Yeay', that.model.get('descriptor') + ' deleted!');
			   		}
			  	});
    		//}
		    return aData;
    	},
    	cleanModelData: function(){
    		// clean data before saving
    		this.model.unset('mode', {silent: true}); //remove the added model field
			this.model.unset('text', {silent: true}); 
			//this.model.unset('childchanged', {silent: true});
			this.model.unset('code', {silent: true});
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
    	},
    	loadModelProps: function(){
    		console.log('loadModelProps');
    		if(_.isEmpty(this.model.get('modelid'))){
    			console.log('modelid is empty');
    		} else {
    			this.$el.find('.items-tbody2').html('');
    			var modelprops = new Modelprops();
			    modelprops.reset();
				modelprops.url = '../api/txn/modelprop/model/'+ this.model.get('modelid');
				modelprops.fetch({
					success: function(collection, respone){
						//console.log(collection);
						var modelpropsView2 = new ModelpropsView2({collection: modelprops});
						modelpropsView2.render();
						//console.log(modelpropsView2.el);
						//that.$el.find('.items-tbody2').html(modelpropsView2.el);
					}
				});	
    		}
    	},
    	dataActionHide: function(){
		    $('.modal-tb-detail .tb-data-action').hide();
		    $('.items-tbody .tb-data-action').hide();
		    $('.modal-table-detail').hide();
		},
		dataActionShow: function(){
		    $('.modal-tb-detail .tb-data-action').show();
		    $('.items-tbody .tb-data-action').show();
		    $('.modal-table-detail').show();
		},
    	appendBlank: function(){
    		this.clearForm();
			this.clearItemsBody();
			this.$el.find('.items-tbody2').html('');
		   	this.dataActionShow();
		   	this.renderModelSelector();
			this.model.set({mode: 'add', text: 'Add Record'});

			//console.log(this.model);
    	},
    	modelInputsDisable: function(){
			var attrs = { }, k;
			for(k in this.model.defaults) {
		        this.$el.find(".table-model #"+k).prop( "disabled", true );
		    }

		    this.$el.find(".table-model .toggle").prop( "disabled", true );
		},
		modelInputsEnable: function(){
			var attrs = { }, k;
			for(k in this.model.defaults) {
		         this.$el.find(".table-model #"+k).prop("disabled", false );
		    }
		    this.$el.find(".table-model .toggle").prop( "disabled", false );
		},

	});


var	ModalDetailView = Backbone.View.extend({
		el: '.modal-tb-detail',
		initialize: function(){

			this.setDataId();
			this.model.on('change:id', this.setDataId, this);
			//this.collection.on('add', this.computeTotal, this);
		},
		render: function(){

			var prodpropsView = new ProdpropsView({collection: prodprops});
			prodpropsView.render();
			
			return this;
		},
		setDataId: function(){
			this.$el.attr('data-apvhdrid', this.model.get('id'));
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
						this.collection.add(data);	
					} else {
						console.log('edit to collection');
						this.collection.each(function(prodprop){
							if(data.id == prodprop.get('id')){
								var attrs = { }, k;
						        for(k in prodprop.attributes) {
						            attrs[k] = prodprop.attributes[k];
						            console.log(data[k] +'-'+ attrs[k]);
						            if(data[k] == attrs[k]){
						            	console.log('same');
						            } else {
						            	console.log('not same');
						            	prodprop.set(k, data[k]);
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

			if(this.model.get('mode') == 'edit'){

			} else {
				this.model.set({mode: 'edit', text: 'Edit Record'});
			}
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
					prodprops.reset();
					prodprops.url = '../api/txn/prodprop/product/'+ model.get('id');
					prodprops.fetch();			
				}	
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$("#mdl-frm-product").modal('show');  
			
		},
		rowDelete: function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = this;

			if(this.model.get('mode') == 'delete'){

			} else {
				this.model.set({mode: 'delete', text: 'Delete Record'});
			}
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
					prodprops.reset();
					prodprops.url = '../api/txn/prodprop/product/'+ model.get('id');
					prodprops.fetch();			
				}		
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$("#mdl-frm-product").modal('show');
			
		},
		rowView: function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = this;

			if(this.model.get('mode') == 'delete'){

			} else {
				this.model.set({mode: 'delete', text: 'Delete Record'});
			}
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
					prodprops.reset();
					prodprops.url = '../api/txn/prodprop/product/'+ model.get('id');
					prodprops.fetch();			
				}		
			});	
			//console.log(this.model.toJSON());
			//$(".modal .modal-title").text('Edit');
			$("#mdl-frm-product").modal('show');
			
		},
		/*
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
		*/
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