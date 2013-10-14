<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class Apvhdr extends DatabaseObject{
	
	protected static $table_name="apvhdr";
	protected static $db_fields = array('id', 'refno' ,'date' ,'supplierid' ,'supprefno' ,'porefno' ,'terms' ,'totamount' ,'balance' ,'notes' ,'posted' ,'cancelled' ,'printctr' ,'totline' );
	
	/*
	* Database related fields
	*/
	public $id;
	public $refno;
	public $date;
	public $supplierid;
	public $supprefno;
	public $porefno;
	public $terms;
	public $totamount;
	public $balance;
	public $notes;
	public $posted;
	public $cancelled;
	public $printctr;
	public $totline;
	

	
}



