<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class vProperty extends DatabaseObject{
	
	protected static $table_name="vproperty";
	protected static $db_fields = array('id', 'code' , 'descriptor', 'propcat', 'ordinal', 'propcatid');
	
	/*
	* Database related fields
	*/
	public $id;
	public $code;
	public $descriptor;
	public $propcat;
	public $ordinal;
	public $propcatid;
	
	
	
	public static function find_all($order=NULL) {
		if(empty($order) || $order==NULL) {
			return parent::find_by_sql("SELECT * FROM ".static::$table_name. " ORDER BY ordinal ASC, descriptor ASC");
		} else {
			return parent::find_by_sql("SELECT * FROM ".static::$table_name." ".$order);
		}
  	}
	
	
}

