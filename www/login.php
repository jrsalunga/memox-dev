<?php
include_once('../lib/initialize.php');
$session->is_logged_in() ? redirect_to("index"): "";
?>
<!DOCTYPE HTML>
<html lang="en-ph">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">

<title>MemoXpress Inc - Login</title>
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

<script src="js/common.js"></script>
<script src="js/app-menu.js"></script>
<script src="js/main-ui.js"></script>
<script src="js/app-ui.js"></script>


<!--
<script src="../js/category.js"></script>
<script src="../js/app-menu.js"></script>

-->


<script type="text/javascript">
	
	function checkLogin(data){
		
		if(data.status==='ok'){
			
			console.log('success logging in');
			$("#msgbox").fadeTo(200,0.1,function() {
				$(this).html('&nbsp;&nbsp;Logging in...&nbsp;&nbsp;')
				       .addClass('messageboxok')
					   .fadeTo(900,1,
							function() {
								document.location='index';
							});
			});
							
		} else {
			
			console.log('failed logging in');
			$("#msgbox").fadeTo(200,0.1,function() {
				$(this).html('&nbsp;&nbsp;Invalid username/password&nbsp;&nbsp;')
				 	   .addClass('messageboxerror')
					   .fadeTo(1000,1);
			});
		}
	}
	
	
	
	function AuthUser() {
		
		var form = $("#frm_login");
		
		
		
		var formData = form.formToJSON();	
		
		console.log(formData);
		
		$("#msgbox").removeClass().html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').addClass('messagebox').delay(3000).fadeIn(1000);
		
		
		$.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: 'api/AuthUserLogin',
	        dataType: "json",
	        data: formData,
	        success: function(data, textStatus, jqXHR){
				checkLogin(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	         	console.log('problem encounter while sending data');   
	        }
    	});
		
	}

$(document).ready(function() {

	
	$(".fb_submit").on('click', function(){
		AuthUser();			
	});
		
	$(".fb_dialog_shadow").draggable({handle:"h1",containment:"#c-login-container"});
}); 
</script>
<style>
.login-container {
	position:relative;
} 

.fb_dialog_shadow {
    background: none repeat scroll 0 0 rgba(82, 82, 82, 0.7);
    border-radius: 8px 8px 8px 8px;
    left: 50%;
    margin-left: -200px;
    padding: 10px;
    position: absolute;
    top: 30px;
    width: 400px;
}
.fb_dialog {
    background-color: #FFFFFF;
    border: 1px solid #39599C;
    height: 100%;
    width: 100%;
}
.fb_dialog_header {
    background-color: #6B86B5;
    color: #FFFFFF;
    cursor: move;
    font-family: "Lucida Grande",Verdana,Geneva,sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 5px;
}
.fb_dialog_body {
    color: #555555;
    padding: 20px;
}
.fb_dialog_body input[type="text"], input[type="password"] {
    color: #555555;
    font-family: "lucida grande",tahoma,arial,sans-serif;
    font-size: 16px;
   
    padding: 3px;
}
.fb_submit {
    background-color: #5B74A8;
    background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zf/r/_IKHHfAgFQe.png");
    background-position: 0 -98px;
    background-repeat: no-repeat;
    border-color: #29447E #29447E #1A356E;
    border-style: solid;
    border-width: 1px;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Arial,Helvetica,sans-serif;
    font-size: 13px;
    font-weight: bold;
    line-height: normal !important;
    padding: 2px 6px;
    text-align: center;
    text-decoration: none;
    vertical-align: top;
    white-space: nowrap;
}
label {
    color: #3B5998;
}
.messagebox {
    background: url("../images/ajax-loader.gif") no-repeat scroll center center rgba(0, 0, 0, 0);
}
.messagebox_bg {
    height: 20px;
}
.messageboxok {
    background: none repeat scroll 0 0 #C9FFCA;
    border: 1px solid #349534;
    color: #008000;
    font-weight: bold;
    padding: 3px 10px;
    width: auto;
}
.messageboxerror {
    background: none repeat scroll 0 0 #F7CBCA;
    border: 1px solid #CC0000;
    color: #CC0000;
    font-weight: bold;
    padding: 3px;
    width: auto;
}
</style>
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
		<div class="login-container">
        			<div class="fb_dialog_shadow">
                    	<div class="fb_dialog">
                        	<h1 class="fb_dialog_header">Login</h1>
                            <div class="fb_dialog_body">
                            	<form id="frm_login" method="post" action="">
                                	<table width="100%" cellspacing="10" cellpadding="5" border="0">
                                    <tbody>
                                        <tr>
                                            <td align="center" colspan="2">
                                                <div id="msgbox">     </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="32%" align="right">
                                            	<label for="username">Username:</label>
                                            </td>
                                            <td width="68%">
                                            	<input id="username" class="input" type="text" name="username">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">
                                            	<label for="password">Password:</label>
                                            </td>
                                            <td>
                                            	<input id="password" class="input" type="password" name="password">
                                            </td>
                                        </tr>
                                        <tr>
                                        <td></td>
                                        <td></td>
                                        </tr>
                                        <tr>
                                        	<td>  </td>
                                        	<td>
                                            <!-- <input class="fb_submit" type="submit" value="Log In"> -->
                                            <button type="button" class="fb_submit">Log In</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                   
                   	</div>
        </div>
	</div>  
	

</body>
</html>