

var Models = Backbone.Collection.extend({
	model: Model
});
var models = new Models();






// model.js
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