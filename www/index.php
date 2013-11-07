<!DOCTYPE HTML>
<html lang="en-ph">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">

<title>MemoXpress Inc</title>
<link rel="shortcut icon" type="image/x-icon" href="../images/memoxpress-favicon.jpg" />

<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/styles-ui.css">
<link rel="stylesheet" href="css/main-ui.css">


<script src="js/vendors/jquery-1.10.1.min.js"></script>
<script src="js/vendors/jquery-ui-1.8.min.js"></script>
<!--
<script src="../js/vendors/jquery-1.9.1.js"></script>
<script src="js/vendors/underscore-min.js"></script>
<script src="js/vendors/backbone-min.js"></script>
-->
<script src="js/vendors/underscore-min.js"></script>
<script src="js/vendors/backbone-min.js"></script>
<script src="js/vendors/bootstrap.min.js"></script>
<script src="js/vendors/backbone-forms.min.js"></script>
<script src="js/vendors/backbone-forms-list.min.js"></script>
<script src="js/vendors/jquery.dataTables.min.js"></script>
<script src="js/vendors/backbone-validation-min.js"></script>
<script src="js/common.js"></script>
<script src="js/otable.js"></script>
<script src="js/app-menu.js"></script>
<script src="js/main-ui.js"></script>
<script src="js/app-ui.js"></script>

<script src="js/models.js"></script>
<script src="js/views.js"></script>
<!--
<script src="../js/category.js"></script>
<script src="../js/app-menu.js"></script>

-->


<script>



$(document).ready(function(e) {
	
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
            	<div id="menu0" class="nav deactive">
           			<div class="bb">
            			<div class="Sj"></div>
           				<div class="yb"></div>
            			<div class="kk">Masterfiles</div>
            		</div>
                    <ul class="fd">
                        <li><a href="masterfiles/brand">Brands</a></li>
                        <li><a href="masterfiles/model">Models</a></li>
                        <li><a href="masterfiles/prodcat">Products Category</a></li>
                        <li><a href="masterfiles/product">Products</a></li>
                    	<li><a href="masterfiles/propcat">Properties Category</a></li>
                        <li><a href="masterfiles/property">Properties</a></li>
                        <li><a href="masterfiles/itemcat">Items Category</a></li>
                        <li><a href="masterfiles/item">Item</a></li>
                        <li><a href="masterfiles/supplier">Supplier</a></li>
                        <li><a href="masterfiles/bank">Bank</a></li>
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
                    	<div class="kk">Reports</div>
                	</div>
                	<ul class="fd"> </ul>
                </div>
                <div id="menu3" class="nav deactive">
                    <div class="bb">
                        <div class="Sj"></div>
                        <div class="yb"></div>
                        <div class="kk">Utilities</div>
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
                	<h1>Dashboard</h1>
                    <nav id="breadcrum">
						<ul>
							<li>Home</li>
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
                        -->
                        <!--
                        <button id="tlbr-delete" class="toolbar-minibutton disabled" type="button" >Delete</button>
                        <button id="tlbr-edit" class="toolbar-minibutton" data-target="#mdl-frm-category" data-toggle="modal" type="button">Edit</button>
                        -->
                    </div>
                </div>
                <div class="form-alert"></div>
                
                <!-------- tb-data-container ------------------->
                <div class="tb-data-container">
                	
                </div>
                 <!-------- end: tb-data-container ------------------->
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


 <div class="modal fade" id="mdl-frm-itemcat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title"></h4>
        </div>
        <div class="modal-body">
			
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

<script type="text/template" id="modal-itemcat-tpl">
	<form id="frm-mdl-itemcat" name="frm-mdl-itemcat" class="table-model" data-table="itemcat" action="" method="post">	
    	<table cellpadding="5px" cellspacing="0" border="0">
        	<tbody>
            	<tr>
                	<td><label for="code">Code: </label></td>
                    <td><input type="text" name="code" id="code" maxlength="20" value="<%= code %>" required></td>
            	</tr>
                <tr>
                	<td><label for="descriptor">Descriptor:</label></td>
                    <td><input type="text" name="descriptor" id="descriptor" maxlength="50" class="m-input" value="<%= descriptor %>"></td>
         		</tr>
        	</tbody>
    	</table>
 	</form>
</script>

<script type="text/template" id="modal-itemcat-readonly-tpl">
	<table cellpadding="5px" cellspacing="0" border="0">
	<tbody>
		<tr>
			<td>Code:</td>
			<td><strong><%= code %></strong></td>
		</tr>
		<tr>
			<td>Descriptor:</td>
			<td><strong><%= descriptor %></strong></td>
		</tr>
		</tbody>
	</table>
</script>




<script type="text/template" id="menu-tpl">
	<div class="bb">
		<div class="Sj"></div>
		<div class="yb"></div>
		<div class="kk"><%= name %></div>
	</div>
	<ul class="fd">
		<% _.each(sub, function(element){ %>
			
			<li><a href="<%= element.name %>.php" ><%= element.name %></a></li>
		<% }) %>
	</ul>
</script>



</html>