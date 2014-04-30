<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class vApvdtl extends DatabaseObject{
	
	protected static $table_name="vapvdtl";
	protected static $db_fields = array('id', 'apvhdrid' ,'account' ,'accountid', 'amount' );
	
	/*
	* Database related fields
	*/
	public $id;
	public $apvhdrid;
	public $account;
	public $accountid;
	public $amount;

	

	

	
}



