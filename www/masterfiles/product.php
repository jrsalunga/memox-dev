<?php
include_once('../../lib/initialize.php');
!$session->is_logged_in() ? redirect_to("../../login"): "";
?>
<!DOCTYPE html>
<html lang="en-ph">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">

<title>MemoXpress Inc - Product</title>
<link rel="shortcut icon" type="image/x-icon" href="../images/memoxpress-favicon.jpg" />

<link rel="stylesheet" href="../css/bootstrap.css">
<link rel="stylesheet" href="../css/styles-ui.css">
<link rel="stylesheet" href="../css/main-ui.css">


<script src="../js/vendors/jquery-1.10.1.min.js"></script>
<script src="../js/vendors/jquery-ui-1.10.3.js"></script>
<!--
<script src="../js/vendors/jquery-ui-1.10.3.js"></script>
<script src="../js/vendors/jquery-1.9.1.js"></script>
<script src="js/vendors/underscore-min.js"></script>
<script src="js/vendors/backbone-min.js"></script>
-->
<script src="../js/vendors/underscore-min.js"></script>
<script src="../js/vendors/backbone-min.js"></script>
<script src="../js/vendors/bootstrap.min.js"></script>

<script src="../js/vendors/jquery.dataTables.min.js"></script>
<script src="../js/vendors/backbone-validation-min.js"></script>
<script src="../js/vendors/NumberFormat154.js"></script>
<script src="../js/vendors/moment.2.1.0-min.js"></script>
<script src="../js/vendors/accounting.js"></script>
<script src="../js/vendors/jquery.filedrop.js"></script>
<script src="../js/vendors/upload-image.js"></script>
<script src="../js/common.js"></script>
<script src="../js/app-menu.js"></script>
<script src="../js/main-ui.js"></script>
<script src="../js/app-ui.js"></script>
<script src="../js/category.js"></script>
<script src="../js/models.js"></script>
<script src="../js/collections.js"></script>
<script src="../js/views.js"></script>
<script src="../js/product.js"></script>

<!--
<script src="../js/app-menu.js"></script>

-->










<script type="text/template" id="modal-product-tpl">
	<form id="frm-mdl-product" name="frm-mdl-product" class="table-model" data-table="product" action="" method="post">
		
		
		
				<table cellpadding="5px" cellspacing="0" border="0" style="float: left; margin-top: 20px;">
					<tbody>
						<tr>
							<td><label for="code">Code: </label></td>
							<td><input type="text" name="code" id="code" maxlength="20" required></td>
						</tr>
						<tr>
							<td><label for="brandid">Brand: </label></td>
							<td>
								<select name="brandid" id="brandid">
								<?php
									$brands = Brand::find_all();					
									foreach($brands as  $brand) {                        
									   echo "<option value=\"".$brand->id."\">". $brand->descriptor ."</option>";
									}
								?>
                       			</select>
							</td>
						</tr>
						<tr>
							<td><label for="modelid">Model: </label></td>
							<td><select name="modelid" id="modelid"></select></td>
						</tr>
						<tr>
							<td><label for="descriptor">Descriptor: </label></td>
							<td><input type="text" name="descriptor" id="descriptor" maxlength="50" class="m-input" required></td>
						</tr>
						<tr>
							<td><label for="prodcatid">Category: </label></td>
							<td>
								<select name="prodcatid" id="prodcatid">
								<?php
									$prodcats = Prodcat::find_all();					
									foreach($prodcats as  $prodcat) {                        
									   echo "<option value=\"".$prodcat->id."\">". $prodcat->descriptor ."</option>";
									}
								?>
                       			</select>
							</td>
						</tr>
						<tr>
							<td><label for="typeid">Type: </label></td>
							<td>
								<select name="typeid" id="typeid">
									<option value="1">Product</option>
									<option value="2">Service</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="toogle-serialized">Serialized: </label></td>
							<td>
								<input id="toogle-serialized" class="toggle" type="checkbox" data-input="serialized">
								<input id="serialized" type="hidden" value="0" name="serialized">
							</td>
						</tr>
						
						<tr>
							<td><label for="onhand">Onhand: </label></td>
							<td><input type="text" name="onhand" id="onhand" maxlength="15" class="number" readonly></td>
						</tr>
						<tr>
							<td><label for="minlevel">Min Level: </label></td>
							<td><input type="text" name="minlevel" id="minlevel" maxlength="20" class="number"></td>
						</tr>
						<tr>
							<td><label for="maxlevel">Max Level: </label></td>
							<td><input type="text" name="maxlevel" id="maxlevel" maxlength="20" class="number"></td>
						</tr>
						<tr>
							<td><label for="reorderqty">Reorder Qty: </label></td>
							<td><input type="text" name="reorderqty" id="reorderqty" maxlength="20" class="number"></td>
						</tr>
						<tr>
							<td><label for="unitprice">Unit Price: </label></td>
							<td><input type="text" name="unitprice" id="unitprice" maxlength="20" class="currency"></td>
						</tr>
						<tr>
							<td><label for="floorprice">Floor Price: </label></td>
							<td><input type="text" name="floorprice" id="floorprice" maxlength="20" class="currency"></td>
						</tr>
						<tr>
							<td><label for="longdesc">Long Description: </label></td>
							<td><textarea id="longdesc" class="m-input" placeholder="notes" name="longdesc"></textarea></td>
						</tr>
						<tr>
							<!--<td><label for="picfile">Image Filename: </label></td> -->
							<td><input type="hidden" name="picfile" id="picfile" maxlength="50" class="m-input" ></td>
						</tr>
					</tbody>
				</table>
				<div class="dropbox-container">
					<div id="dropbox" class="prod-image">
						<span class="message">Drop images here to upload. <br />
						<i>(they will only be visible to you)</i>
						</span>
					</div>
					<label for="file_upload" class="lbl-file_upload">Upload</label> 
					<input type="file" id="file_upload" name="file_upload" style="display: none" />
				</div>
				<div class="dropbox-container2">
					<div id="dropbox2">
						<div style="text-align: center;">
						<span class="imageHolder">
						<img src="">
						<span class="uploaded"></span>
						</span>
						</div>
					</div>
				</div>
				<div class="prod-image_after">&nbsp;</div>
				
		 	
		
		
 	</form>
</script>



<script type="text/template" id="modal-prodprops-tpl">
	<table class="modal-tb-detail" cellpadding="0" cellspacing="0" width="100%" border="0">
	<thead>
		<tr>
			<th>Category</th>
			<th>Property</th>
			<th>Value
	<tbody class="items-tbody">
	
	</tbody>
	</table>
</script>




<script type="text/template" id="modal-items-tpl">
<form class="modal-table-detail">
	<input type="hidden" name="id" id="id">
	<input type="hidden" name="propertyid" id="propertyid">
	
	<input type="text" class="search-detail" placeholder="Search property">
	<input type="text" name="descriptor" id="descriptor" placeholder="Property value">
	<button type="button" id="mdl-detail-save-item" class="btn btn-primary btn-sm">Add</button>
<!--	<button type="button" id="mdl-detail-cancel-item" class="btn btn-default btn-sm">Cancel</button>  -->
</form>
</script>



<script>
var oTable;

function log( message ) {
     //  $( "<div>" ).text( message ).appendTo( "#log" );
	$("#log").text(message);
	//$( "#log" ).scrollTop( 0 );
}
function itemSearch(){
	 $(".search-detail").autocomplete({
            source: function( request, response ) {
                $.ajax({
					type: 'GET',
					url: "../api/search/vproperty",
                    dataType: "json",
                    data: {
                        maxRows: 25,
                        q: request.term
                    },
                    success: function( data ) {
                        response( $.map( data, function( item ) {
                            return {
                                label: item.code + ' - ' + item.descriptor,
                                value: item.code,
								id: item.id
                            }
                        }));
                    }
                });
            },
            minLength: 2,
            select: function( event, ui ) {
				//console.log(ui);
                log( ui.item ? "Selected: " + ui.item.label : "Nothing selected, input was " + this.value);
	
				$("#propertyid").val(ui.item.id); /* set the selected id */
				
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$("#propertyid").val('');  /* remove the id when change item */
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            },
			messages: {
				noResults: '',
				results: function() {}
			}
			
       });
}

$(document).ready(function(e) {
	
	
	
	//$('#mdl-frm-product').modal('show');
	//$(".modal .modal-title").text('Add Product');
	
	// $('#productTab a:last').tab('show')
	
	var appRouter = new Router();
	var appView = new AppView({model: app});
	
	
	var productView = new ParentChildModal({model: product, collection: prodprops});
	
	
	
	
	
	var detailView = new ModalDetailView({model: product, collection: prodprops});
	detailView.render();
	

	var formDetailView = new FormDetailView({model: prodprop, collection: prodprops});
	formDetailView.render();
	
	
	var productDataGridView = new DataGridView({model: product, collection: prodprops});
	
	
	$('#mdl-view-product').on('hidden.bs.modal', function () {
  		appRouter.navigate('', {trigger: false});
	});

	$('#tlbr-new').on('click', function(){
		/*
		productView.modalTitle.text('Add Record');
		productView.clearForm();
		
		btn = '<button type="button" id="modal-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>';
        btn += '<button type="button" id="modal-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>';
        btn += '<button type="button" id="modal-btn-cancel" class="btn btn-default model-btn-cancel" data-dismiss="modal">Cancel</button>';
        $('.modal-footer').html(btn);  
		*/
		
		productView.appendBlank();
	});

	//Backbone.history.start({pushState: true, root: 'masterfiles/product/'});
	Backbone.history.start();
	
	
	
	
	
	itemSearch();
	
	
	
	oTable = $('.tb-data').dataTable( {
        "sPaginationType": "full_numbers",
		"bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "../api/datatables/v/product",
		"aaSorting": [[ 1, "asc" ]],
		"fnHeaderCallback":  function( nHead, aData, iStart, iEnd, aiDisplay ) { 
				//var title = [,"Code","Descriptor"];
				//console.log(title.length);
				for(i=0; i<=$('th', nHead).length-1; i++) {
					$('th', nHead).removeAttr('style');
				}				
		},
		"aoColumns": [
			//{   "sTitle": "<input type='checkbox' class='select-all'></input>","mDataProp": null, "sWidth": "20px", "sDefaultContent": "<input type='checkbox' ></input>", "bSortable": false},
            { "mData": "code",  "sTitle": "Code",
				"mRender": function ( data, type, full ) {
							
							return data+'<div class="tb-data-action"><a class="row-delete" href="#">&nbsp;</a><a class="row-edit" href="#">&nbsp;</a><a class="row-view" href="#view/'+ full.id +'/'+ full.modelid +'">&nbsp;</a></div>';
				}
			},
			{ "mData": "brand",  "sTitle": "Brand" },
			{ "mData": "model",  "sTitle": "Model" },
            { "mData": "descriptor",  "sTitle": "Descriptor" },
			{ "mData": "category",  "sTitle": "Category" },
            { "mData": "type",  "sTitle": "Type" },
            
            { "mData": "onhand",  "sTitle": "Onhand", "sClass":"number" },
            { "mData": "minlevel",  "sTitle": "Min Level", "sClass":"number" },
            { "mData": "maxlevel",  "sTitle": "Max Level", "sClass":"number" },
            { "mData": "reorderqty",  "sTitle": "Reorder Qty", "sClass":"number" },
			{ "mData": "unitprice",  "sTitle": "Unit Price", "sClass":"currency" },
            { "mData": "floorprice",  "sTitle": "Floor Price", "sClass":"currency"},
 
			],
		"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

	            $(nRow).attr("data-id", aData.id);
				$(nRow).attr("id", aData.id);

                $('td:eq(12), td:eq(10),td:eq(11)', nRow).addClass("currency").each(function(){
                    $(this).toCurrency();
                });
                
                $('td:eq(6),td:eq(7), td:eq(8),  td:eq(9)' , nRow).addClass("number").each(function(){
					//console.log($(this));
                    $(this).toInt();
                });
				
				
        },
		"fnFooterCallback": function( nFoot, aData, iStart, iEnd, aiDisplay ) {
		 // nFoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+iStart;
		}
		
    });
	
	
	
	
	
	
	
	
	$("#tlbr-new").on('click', function(){
			$("#mdl-frm-category .modal-title").text('Add Products');
	});
	
	$("#tlbr-refresh-datatable").on('click', function(){
			oTable.fnDraw();
	});
	$("#tlbr-refresh-datatable2").on('click', function(){
			oTable.fnDraw();
	});
	$(".tlbr-refresh").on('click', function(){
			oTable.fnDraw();
	});
	
	
	
});
</script>

</head>
<body id="app-body" class="state-nav">
<div id="container">
	<header id="h">
		<div id="h-main">
            <div id="h-main-logo">
                <img src="../../images/memoxpress.jpg">
                <div class="comp-name">
                	<h1>MemoXpress</h1>
                </div>
            </div>
            <div id="h-main-user">
                <div>
                    <a href="#">Administrator</a>
                    <a class="logout" href="../../logout">Sign out</a>
                </div>
                <img src="../images/silhouette36.png">
            </div>
        </div>
        <div style="clear: both; ">
            <div id="h-nav">
                <div id="h-nav-container"></div>
            </div>
            <div id="h-subnav">
                <div id="h-subnav-container"></div>
            </div>
        </div>
        
	</header>
	
	<div role="main" class="animated">
	<div>
		<div role="navigation" class="animated">
	  	
		<div id="nav-container">
        	<nav class="main-nav">
            	<div id="menu0" class="nav active">
           			<div class="bb">
            			<div class="Sj"></div>
           				<div class="yb"></div>
            			<div class="kk">Masterfiles</div>
            		</div>
                    <ul class="fd">
                        <li><a href="brand">Brands</a></li>
                        <li><a href="model">Models</a></li>
                        <li><a href="propcat">Properties Category</a></li>
                        <li><a href="property">Properties</a></li>
                        <li><a href="prodcat">Products Category</a></li>
                        <li class="active"><a href="product">Products</a></li>
                        <li><a href="itemcat">APV Items Category</a></li>
                        <li><a href="item">APV Items</a></li>
                        <li><a href="supplier">Suppliers</a></li>
                        <li><a href="bank">Banks</a></li>
                    </ul>
            	</div>
                <div id="menu1" class="nav deactive">
               		<div class="bb">
                        <div class="Sj"></div>
                        <div class="yb"></div>
                        <div class="kk">Transactions</div>
               		</div>
                    <ul class="fd">
                   		<li><a href="../transactions/apvhdr">Accounts Payable</a></li>
                        <li><a href="../masterfiles/check.php">check</a></li>
                        <li><a href="../masterfiles/invoice.php">invoice</a></li>
                    </ul>
                </div>
                <div id="menu2" class="nav deactive">
                    <div class="bb">
                        <div class="Sj"></div>
                        <div class="yb"></div>
                    	<div class="kk">reports</div>
                	</div>
                	<ul class="fd"> </ul>
                </div>
                <div id="menu3" class="nav deactive">
                    <div class="bb">
                        <div class="Sj"></div>
                        <div class="yb"></div>
                        <div class="kk">utilities</div>
                    </div>
                	<ul class="fd"> </ul>
                </div>
            </nav>
        </div>
	  	
	  	<p><a data-state="initial" href="#">Close</a></p>
	  	</div>
	  	
	  	<div role="sidebar" class="animated">
	  		<h3>Sidebar</h3>
	  		<p>This is the sidebar content.</p>
	  		<p class="main-ui-close"><a data-state="initial" href="#">Close</a></p>
	  	</div>
	  	
	  	<div role="content" class="animated">
	  		<div class="splitter" > </div>
			<div class="stage">
			<!-------------- stage ---------------------------->
			
			<header>
            	<div class="mod-name">
                	<h1>Products</h1>
                    <nav id="breadcrum">
						<ul>
							<li><a href="../">Home</a></li>
							<li><a href="../../masterfiles">Masterfiles</a></li>
							<li>Products</li>
						</ul>
                    </nav>
                </div>
            </header>
        	<section>
            	<!--
            	<nav class="navbar navbar-default">
            		<div class="navbar-header">
                    	<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                      		<span class="sr-only">Toggle navigation</span>
                      		<span class="icon-bar"></span>
                      		<span class="icon-bar"></span>
                      		<span class="icon-bar"></span>
                    	</button>
                  	</div>
                    <div class="collapse navbar-collapse navbar-ex1-collapse">
                        <ul class="nav navbar-nav">
                          <li class="active"><a href="#">New</a></li>
                          <li><a href="#">Delete</a></li>
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                              <li><a href="#">Action</a></li>
                              <li><a href="#">Another action</a></li>
                              <li><a href="#">Something else here</a></li>
                              <li><a href="#">Separated link</a></li>
                              <li><a href="#">One more separated link</a></li>
                            </ul>
                          </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                          <li><a href="#">Link</a></li>
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                              <li><a href="#">Action</a></li>
                              <li><a href="#">Another action</a></li>
                              <li><a href="#">Something else here</a></li>
                              <li><a href="#">Separated link</a></li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                </nav>
                -->
            	<div class="toolbar-container">
                	<div class="toolbar">
                    	<!--
                    	<button id="tlbr-new" class="toolbar-minibutton" data-target="#mdl-frm-itemcat" data-toggle="modal" type="button" title="Create New Record">New</button>
                        <button id="tlbr-refresh-datatable" class="toolbar-minibutton" type="button" title="Refresh Datatable">Refresh</button>
                        -->
                        <button id="tlbr-new" class="toolbar-minibutton" data-target="#mdl-frm-product" data-toggle="modal" type="button" title="Create New Record"><div class="tlbr-new">&nbsp;</div></button>
                        <button id="tlbr-refresh-datatable" class="toolbar-minibutton" type="button" title="Refresh Datatable"><div class="tlbr-refresh">&nbsp;</div></button>
                        
                        <!--
                        <button id="tlbr-delete" class="toolbar-minibutton disabled" type="button" >Delete</button>
                        <button id="tlbr-edit" class="toolbar-minibutton" data-target="#mdl-frm-category" data-toggle="modal" type="button">Edit</button>
                        -->
                    </div>
                </div>
                <div class="form-alert"></div>
                
                <!-------------- from-container ---------------------------->
                <!--
                <div class="form-container">
                <div class="row">
  					<div class="col-xs-6 col-sm-4 col-md-4" style="background-color:#666699;">col-xs-6 .col-sm-4 .col-md-4</div>
  					<div class="col-xs-6 col-sm-4 col-md-4" style="background-color:#FF9;">.col-xs-6 .col-sm-4 .col-md-4</div>
				</div>
                <div class="row">
  					<div class="col-sm-4 col-md-4" style="background-color:#F1C40F;">col-md-4</div>
  					<div class="col-sm-4 col-md-4" style="background-color:#F39C12;">col-md-4</div>
				</div>
                
                <div id="frm-alert"></div>
               	<form id="frm-itemcat" name="frm-itemcat" class="table-model" data-table="itemcat" action="" method="post">	
                	<table cellpadding="0" cellspacing="0" border="0">
                    	<tbody>
                        	<tr>
                            	<td><label for="code">Code:</label></td>
                                <td><input type="text" name="code" id="code" maxlength="20" required></td>
                            </tr>
                            <tr>
                            	<td><label for="descriptor">Descriptor:</label></td>
                                <td><input type="text" name="descriptor" id="descriptor" maxlength="50" class="m-input"></td>
                            </tr>
                            <tr>
                            	<td>&nbsp;</td>
                                <td style="padding-top: 5px;">  		
                                  	<button type="button" id="frm-btn-save" class="btn btn-primary model-btn-save" disabled>Save</button>
                                    <button type="button" id="frm-btn-delete" class="btn btn-primary model-btn-delete" disabled>Delete</button>
                                 	<button type="button" id="frm-btn-cancel" class="btn btn-default model-btn-cancel" disabled>Clear</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                </div>
                <!-------------- end from-container ---------------------------->	
                
                
                <div class="tb-data-container">
                	<table class="tb-data" cellpadding="0" cellspacing="0" width="100%">
		                       <!-- <thead>
		                          <tr>
                                  	 
		                              <th>Code</th>
		                              <th>Descriptor</th>
                                      <th>Type</th>
                                    
		                            </tr>
		                        </thead>
		                        <tbody>
		                          <tr>
                                  	  
		                              <td>Jefferson</td>
		                              <td>Raga</td>
                                      <td>Salunga</td>
                                    
		                          </tr>
                                  
		                        </tbody>
                                
                                <tfoot>
                                	<tr>
                                    	<td>Code</td>
                                        <td>Brand</td>
                                        <td>Model</td>
                                        <td>Descriptor</td>
                                        <td>Category</td>
                                        <td>Type</td>
                                        <td>Onhand</td>
                                        <td>Min Level</td>
                                        <td>Max Level</td>
                                        <td>Reorder Qty</td>
                                        <td>Unit Price</td>
                                        <td>Floor Price </td>
                                    </tr>
                                </tfoot>
                            	-->										  
	                        </table>
                </div>
            </section>
			
			<!-------------- end stage ---------------------------->
			<div style="height: 300px; "></div>	
			</div>
	  	</div>

	</div>
	</div>  
	<div role="presentations" class="padded animated">
	  	<h3>Presentation</h3>
	  	<p>This is the presentation content.</p>
	  	<p><a data-state="initial" href="#">Switch to 'Initial' state</a></p>
	</div>
</div>


 <div class="modal fade" id="mdl-frm-product" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
			<div class="modal-parent-child">
            
            	<ul class="nav nav-tabs" id="productTab">
                  <li class="active"><a href="#tab-general" data-toggle="tab">General</a></li>
                  <li><a href="#tab-property" data-toggle="tab">Properties</a></li>
                  <li><a href="#tab-model-property" data-toggle="tab">Model Properties</a></li>                 
                </ul>
                
                <div class="tab-content">
                    <div class="tab-pane active" id="tab-general">
                        <div class="modal-body-parent">
                		</div>
                    </div>
                    <div class="tab-pane" id="tab-property">
                    	
                        <div class="modal-body-child" style="margin-top: 20px;">
                        </div>
                        <div class="modal-body-item">
                        </div>
                    </div>
                    <div class="tab-pane" id="tab-model-property">
                    	
                        <div class="modal-body-child2" style="margin: 20px 0;">
                        <table class="modal-tb-detail" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Property</th>
                                <th>Value</th>
                        	</tr>
                        <tbody class="items-tbody2">
                        </tbody>
                        </table>
                        </div>
                        
                    </div>
                </div>
                
                
                
           	</div>
        </div>
        <div class="modal-footer">
          <!--
          <button type="button" id="mdl-btn-save" class="btn btn-primary model-btn-save" data-dismiss="modal" disabled>Save</button>
          <button type="button" is="mdl-btn-save-blank" class="btn btn-primary model-btn-save-blank" disabled>Save &amp; Blank</button>
          <button type="button" id="mdl-btn-save" class="btn btn-default model-btn-cancel" data-dismiss="modal" disabled>Cancel</button>
        	-->
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
  
  
  <div class="modal fade" id="mdl-view-product" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:700px;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">View Product</h4>
        </div>
        <div class="modal-body">
			
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->


</body>
</html>