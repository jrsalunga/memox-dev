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
				"location": "showCategory"
			},
			index: function(){
			
				//console.log("index");
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
			}
		});


	
	
	
	
	//console.log(appView.el);
	
$(document).ready(function(e) {
	

	
	
	
});
	
	
	
	
