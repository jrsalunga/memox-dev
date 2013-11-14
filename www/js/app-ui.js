//$(function(){
	
		
	var obj = {user:"Administrator" , state: 'nav', id:"73494398182b11e2ad9f5404a67007de", render:true};
	
	var App = Backbone.Model.extend({
			initialize : function(){
				
			},
			toggleState: function(){
				this.get('state') === 'initial' ? this.set({'state': 'nav'}) : this.set({'state': 'initial'});
			},
			toggleAnimate: function(){
				this.get('render') === true ? this.set({'render': false}) : this.set({'render': true});
			},
			setState: function(state){
				this.set({'state': state});
			}
		});

	var app = new App(obj);
	
	var AppHeaderView = Backbone.View.extend({
			className : 'h-main-container',
			//template : _.template($('#header-tpl').html()),
			initialize: function(){
				this.template = _.template($('#header-tpl').html());
				this.model.on('change', this.render, this);
			},
			render: function(){
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			}
		});
	
	var AppView = Backbone.View.extend({
			el: 'body',
			className: 'state-nav',
			events:{
				'click [data-state]' : 'changeState',
				'click .splitter' : 'toggleSplitter'
			},
			initialize: function(){
				
				if(this.model.get('render')==false){
					this.model.on('change', this.render, this);
				}
				
				//this.loadMenus();
				
				//this.template = _.template($('#body-template').html());
			},		
			render: function(){
				
				this.$el.html(this.template(this.model.toJSON()));	
				
				// append the header
				var appHeaderView = new AppHeaderView({model: app});
				$("#h").html(appHeaderView.render().el);
				
				var menus = new Menus();
				menus.fetch();
				console.log(menus)
				var menusView = new MenusView({model: menu, collection: menus});
				console.log(menusView);

				$("#nav-container").html(menusView.render().el);
						
				
				return this;
			}, 
			changeState: function(e){
				e.preventDefault();
				var state = $(e.currentTarget).data("state");
				this.model.setState(state);
				this.renderState();	 
			},
			toggleSplitter : function(e){
				e.preventDefault();
				this.model.toggleState();	
				this.renderState();	
			},
			renderState: function(){		
				this.$el // or  $('body') or 'body'
			  	.removeClass(
					function(i, c) {	
						var m = c.match(/state\d+/g);
						if(m != null) {
							return m.join(" ");
						 } else {
							return c;
						}
					})
				.addClass('state-' + this.model.get('state'));	
			},
			loadMenus: function(nav, subnav){
				var menus = new Menus();
				menus.fetch();
	
				var menusView = new MenusView({model: menu, collection: menus});
				//console.log(menusView);

				$("#nav-container").html(menusView.render().el);	
			}
		});


	var ModalView = Backbone.View.extend({
		el: ".modal",
		initialize: function(){
			
		},
		events: {
			'click #mdl-btn-save': 'mdlSave'
		},
	    render: function() {
	    	
	        this.$('.modal').html(this.template(this.model.toJSON()));
	        return this;
    	},
		mdlSave : function(){

		}
	})
	
	

	
	var Router = Backbone.Router.extend({
			routes: {
				"":"index",
				":table":"getTable"	,
				"location": "showCategory",
				"property/:proprtyid/:modelid": "showProductProperty",
				"view/:proprtyid/:modelid": "viewProductProperty"
			},
			index: function(){
			
				console.log("index");
			},
			showCategory: function(){
				
				console.log("category");
			},
			getTable: function(table){
				
				function capitaliseFirstLetter(string){
				    return string.charAt(0).toUpperCase() + string.slice(1);
				}

				$('.tb-data-container').html('<table class="tb-data" cellpadding="0" cellspacing="0" width="100%"></table>');
				
				switch(table){
					case 'matcat':
					    console.log('this is matcat');
					    var matcat = new Matcat();
						var matcatModalView = new MatcatModal({ model: matcat});
						matcatModalView.render();
						var matcatDataGridView = new DataGridView({model: matcat});
						oTableMatcat();

						$('#tlbr-new').on('click', function(){
							//$(".modal .modal-title").text('Add');
							matcatModalView.modalTitle.text('Add Record');
							matcatModalView.clearForm();
							    btn = '<button type="button" id="modal-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>';
					        btn += '<button type="button" id="modal-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>';
					        btn += '<button type="button" id="modal-btn-cancel" class="btn btn-default model-btn-cancel" data-dismiss="modal">Cancel</button>';
					        $('.modal-footer').html(btn);  
						});
						break;
					case 'itemcat':
						console.log('this is material');
						var itemcat = new Itemcat();
						var itemcatModalView = new ItemcatModal({ model: itemcat});
						itemcatModalView.render();
						
						var itemcatDataGridView = new DataGridView({model: itemcat});

						$('#tlbr-new').on('click', function(){
							//$(".modal .modal-title").text('Add');
							itemcatModalView.modalTitle.text('Add Record');
							itemcatModalView.clearForm();
							btn = '<button type="button" id="modal-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>';
					        btn += '<button type="button" id="modal-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>';
					        btn += '<button type="button" id="modal-btn-cancel" class="btn btn-default model-btn-cancel" data-dismiss="modal">Cancel</button>';
					        $('.modal-footer').html(btn);  
						});

						oTableItemcat();
						
						
						break;
					case 'item':
						console.log('this is item');
						break;
					case 'material':
						console.log('this is itemcat');
						break;	
					default:

						break;
				}
							
					
						
				$(".form-container").html('cdsdhjhh');
				
				//console.log($("from").formToJSON());
			},
			showProductProperty: function(productid, modelid){
				console.log("showProductProperty");
				var aData;

				
				var xbtn = $(".toolbar").html();
				var btn = '<button title="Create New Record" type="button" class="toolbar-minibutton" id="tlbr-propback">';
				btn += '<div class="tlbr-propback">Back</div></button>';
				$(".toolbar").html(btn);
				$(".tb-data-container").html('');

				$.ajax({
			        type: 'GET',
			        contentType: 'application/json',
					url: '../api/property/all/'+productid+'/'+modelid,
			        dataType: "json",
			        async: false,
			        //data: formData,
			        success: function(data, textStatus, jqXHR){
						aData = data; 			
			        },
			        error: function(jqXHR, textStatus, errorThrown){
			            alert(textStatus + 'Failed on fetching model property data');
			        }
		    	});

				//console.log(aData);
		    	//console.log(_.where(aData, {propcat: 'General'}));
				//console.log(_.pluck(aData, 'propcat'));
				//console.log(_.groupBy(aData, 'propcat'));	

				var group = _.groupBy(aData, 'propcat');

				var content = '';
				content += '<table cellspacing="0" cellpadding="5" class="prod-property">'	
				
				_.each(group, function(propcats, key){
					
					content += '<tr><td rowspan="'+ propcats.length +'">'+ key + '</td>';			
						
						var ctr = 1;
						_.each(propcats, function(propcat, key){
							
							if(ctr==1){
								content += '<td>'+ propcat.property +'</td><td>'+ propcat.propdesc +'</td>';
							} else {
								content += '<tr><td>'+ propcat.property +'</td><td>'+ propcat.propdesc +'</td></tr>';
							}
							ctr++;
						});

					content += '</tr>';	
				});
				content += '</table>';

				//console.log(content);

				$(".tb-data-container").html(content);

				$('.toolbar').on('click', '#tlbr-propback', function(){
					//$(".tb-data-container").html('<table class="tb-data" cellpadding="0" cellspacing="0" width="100%"></table>');
					//$(".toolbar").html(xbtn);
					window.location = 'product';
				});


				



				//var sortedGroup = _.sortBy(group, 'propcatord');

				//console.log(sortedGroup);			
			},
			viewProductProperty: function(productid, modelid){
				console.log('viewProductProperty');


				var aData, aProduct;

				$.ajax({
			        type: 'GET',
			        contentType: 'application/json',
					url: '../api/property/all/'+productid+'/'+modelid,
			        dataType: "json",
			        async: false,
			        //data: formData,
			        success: function(data, textStatus, jqXHR){
						aData = data; 			
			        },
			        error: function(jqXHR, textStatus, errorThrown){
			            alert(textStatus + 'Failed on fetching model property data');
			        }
		    	});


				var group = _.groupBy(aData, 'propcat');

				var propContent = '';
				propContent += '<table class="prod-property">'	
				
				_.each(group, function(propcats, key){	
					propContent += '<tr><td rowspan="'+ propcats.length +'">'+ key + '</td>';			
						var ctr = 1;
						_.each(propcats, function(propcat, key){
							if(ctr==1){
								propContent += '<td>'+ propcat.property +'</td><td>'+ propcat.propdesc +'</td>';
							} else {
								propContent += '<tr><td>'+ propcat.property +'</td><td>'+ propcat.propdesc +'</td></tr>';
							}
							ctr++;
						});
					propContent += '</tr>';	
				});
				propContent += '</table>';

				var tpl = _.template('');

		    	//var prod = new Product();
		    	//prod.set({id: productid});
		    	//prod.fetch();

		    	$.ajax({
			        type: 'GET',
			        contentType: 'application/json',
					url: '../api/t/product/'+productid,
			        dataType: "json",
			        async: false,
			        //data: formData,
			        success: function(data, textStatus, jqXHR){
						aProduct = data; 			
			        },
			        error: function(jqXHR, textStatus, errorThrown){
			            alert(textStatus + 'Failed on fetching model property data');
			        }
		    	});	
		    	console.log(aProduct);

		    	var prodContent = '<div class="product-profile"><h3>'+ aProduct.brand +' '+ aProduct.model +'</h3>';
		    	prodContent += '<div class="product-profile-lpane">';
		    	prodContent += '<div class="img-holder">';
		    	prodContent += '<img src="../images/products/'+ aProduct.picfile +'"></div>';
		    	prodContent += '<ul>';
		    	prodContent += '<li>'+ aProduct.code +'</li>';
		    	prodContent += '<li>'+ aProduct.descriptor +'</li>';
		    	prodContent += '<li>'+ aProduct.category +'</li>';
		    	prodContent += '<li>'+ aProduct.type +'</li>';
		    	prodContent += '';
		    	prodContent += '';
		    	prodContent += '</ul>';
		    	prodContent += '</div><div class="product-profile-rpane"></div>'; 
		    	prodContent += '</div><div style="clear: both;"></div>';

		    	$('#mdl-view-product .modal-body').html(prodContent);
		    	$('.product-profile-rpane').html(propContent);


		    	$('#mdl-view-product').modal('show');
		    	
			}
		});


	
	
	
	
	//console.log(appView.el);
	
$(document).ready(function(e) {
	

	
	
	
});
	
	
	
	
