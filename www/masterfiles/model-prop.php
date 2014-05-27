<?php
include_once('../../lib/initialize.php');
!$session->is_logged_in() ? redirect_to("../../login"): "";
$cleanUrl->setParts('modelid');
?>
<!DOCTYPE HTML>
<html lang="en-ph">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">

<title>MemoXpress Inc - Model Property</title>
<link rel="shortcut icon" type="image/x-icon" href="/images/memoxpress-favicon.jpg" />

<link rel="stylesheet" href="/css/bootstrap.css">
<link rel="stylesheet" href="/css/styles-ui.css">
<link rel="stylesheet" href="/css/main-ui.css">



<script src="/js/vendors/jquery-1.10.1.min.js"></script>
<script src="/js/vendors/jquery-ui-1.10.3.js"></script>
<!--
<script src="../js/vendors/jquery-ui-1.10.3.js"></script>
<script src="../js/vendors/jquery-1.9.1.js"></script>
<script src="js/vendors/underscore-min.js"></script>
<script src="js/vendors/backbone-min.js"></script>
-->
<script src="/js/vendors/underscore-min.js"></script>
<script src="/js/vendors/backbone-min.js"></script>
<script src="/js/vendors/bootstrap.min.js"></script>
<script src="/js/vendors/backbone-forms.min.js"></script>
<script src="/js/vendors/backbone-forms-list.min.js"></script>
<script src="/js/vendors/jquery.dataTables.min.js"></script>
<script src="/js/vendors/backbone-validation-min.js"></script>
<script src="/js/vendors/NumberFormat154.js"></script>
<script src="/js/vendors/moment.2.1.0-min.js"></script>
<script src="/js/vendors/accounting.js"></script>
<script src="/js/vendors/jquery.filedrop.js"></script>
<script src="/js/vendors/upload-image.js"></script>
<script src="/js/common.js"></script>
<script src="/js/app-menu.js"></script>
<script src="/js/main-ui.js"></script>
<script src="/js/app-ui.js"></script>
<script src="/js/category.js"></script>
<script src="/js/models.js"></script>
<script src="/js/collections.js"></script>
<script src="/js/views.js"></script>
<script src="/js/model.js"></script>





<script>

$(document).ready(function(e) {
	
	//var Options = Backbone.Model.extend({productid: '<?=$modelid?>'})
	
	var propertyListView = new PropertyListView({model: modelprop, productid: '<?=$modelid?>'});
	
	var propertyValueListView = new PropertyValueListView({model: modelprop, productid: '<?=$modelid?>'});
	console.log(propertyValueListView);
	
	
	
});
</script>

</head>
<body id="app-body" class="state-nav">
<div id="container">
	<header id="h">
		<div id="h-main">
            <div id="h-main-logo">
                <img src="/images/memoxpress.jpg">
                <div class="comp-name">
                	<h1>MemoXpress</h1>
                </div>
            </div>
            <div id="h-main-user">
                <div>
                    <a href="#">Administrator</a>
                    <a class="logout" href="/logout">Sign out</a>
                </div>
                <img src="/images/silhouette36.png">
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
                        <li><a href="/masterfiles/brand">Brands</a></li>
                        <li class="active"><a href="/masterfiles/model">Models</a></li>
                        <li><a href="/masterfiles/propcat">Properties Category</a></li>
                        <li><a href="/masterfiles/property">Properties</a></li>
                        <li><a href="/masterfiles/prodcat">Products Category</a></li>
                        <li><a href="/masterfiles/product">Products</a></li>
                        <li><a href="/masterfiles/itemcat">APV Items Category</a></li>
                        <li><a href="/masterfiles/item">APV Items</a></li>
                        <li><a href="/masterfiles/supplier">Suppliers</a></li>
                        <li><a href="/masterfiles/bank">Banks</a></li>
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
                	<h1>Model Property</h1>
                    <nav id="breadcrum">
						<ul>
							<li><a href="../">Home</a></li>
							<li><a href="../../masterfiles">Masterfiles</a></li>
							<li>Model Property</li>
						</ul>
                    </nav>
                </div>
            </header>
        	<section>
            	
            	<div class="toolbar-container">
                	<div class="toolbar">
                    	<!--
                    	<button id="tlbr-new" class="toolbar-minibutton" data-target="#mdl-frm-itemcat" data-toggle="modal" type="button" title="Create New Record">New</button>
                        <button id="tlbr-refresh-datatable" class="toolbar-minibutton" type="button" title="Refresh Datatable">Refresh</button>
                        
                        <button id="tlbr-new" class="toolbar-minibutton" data-target="#mdl-frm-model" data-toggle="modal" type="button" title="Create New Record"><div class="tlbr-new">&nbsp;</div></button>
                        <button id="tlbr-refresh-datatable" class="toolbar-minibutton" type="button" title="Refresh Datatable"><div class="tlbr-refresh">&nbsp;</div></button>
                        
                        
                        <button id="tlbr-delete" class="toolbar-minibutton disabled" type="button" >Delete</button>
                        <button id="tlbr-edit" class="toolbar-minibutton" data-target="#mdl-frm-category" data-toggle="modal" type="button">Edit</button>
                        -->
                    </div>
                </div>
                <div class="form-alert"></div>
                
                <!-------------- from-container ---------------------------->
                
                <!-------------- end from-container ---------------------------->	
                
                
                <div class="tb-data-container">
                	<table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                      		<tr>
                              	<td width="20%">
								<?php
									$model = Model::find_by_id($modelid);
									echo $model->descriptor;
								?>
                                </td>
                              	<td width="50%">
                                <?php
									$propcats = Propcat::find_all();
									echo '<ul class="propcat-list">';
									foreach($propcats as $propcat){
										echo '<li data-id="'.$propcat->id.'">'.$propcat->descriptor.'</li>';
										
										$propertys = Property::find_all_by_field_id('propcat', $propcat->id);	
										//echo '<ul class="property-list">';
										
										//$val = Property::row(2, );
										echo '<table class="property-list"><tbody>';
										foreach($propertys as $property){
											$modelprop = ModelProp::find_by_modelid_propertyid($model->id, $property->id);
											//echo '<tr data-propertyid="'.$property->id.'">';
											echo '<tr>';
											echo '<td>'.$property->descriptor.'</td>';
											echo '<td data-propertyid="'.$property->id.'">';
											echo '<input id="'.$property->id.'" type="text" class="propval" value="'.$modelprop->descriptor.'" data-id="'.$modelprop->id.'">';
											echo '<button type="button">Save</button></td>';
											echo '</tr>';
										}
										echo '</tbody></table></li>';
									}
									echo '</ul>';
								
								?>
                                </td>
                              	<td width="30%" valign="top">
                                	<ul class="property-value-list">
                                    </ul>
                                </td>            
                          	</tr>          
                        </tbody>
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


 <div class="modal fade" id="mdl-frm-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
			<div class="modal-parent-child">
            
            	<ul class="nav nav-tabs" id="modelTab">
                  <li class="active"><a href="#tab-general" data-toggle="tab">General</a></li>
                  <li><a href="#tab-property" data-toggle="tab">Properties</a></li>                 
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
                    <div class="tab-pane" id="tab-inventory">
                        
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


</body>
</html>