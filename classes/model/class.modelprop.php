<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class Modelprop extends DatabaseObject{
	
	protected static $table_name="modelprop";
	protected static $db_fields = array('id', 'modelid' , 'propertyid', 'descriptor');
	
	/*
	* Database related fields
	*/
	public $id;
	public $modelid;
	public $propertyid;
	public $descriptor;
	

	public static function find_all($order=NULL) {
		if(empty($order) || $order==NULL) {
			return parent::find_by_sql("SELECT * FROM ".static::$table_name. " ORDER BY descriptor ASC");
		} else {
			return parent::find_by_sql("SELECT * FROM ".static::$table_name." ".$order);
		}
  	}
}



