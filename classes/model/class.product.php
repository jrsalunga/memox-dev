<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class Material extends DatabaseObject{
	
	protected static $table_name="material";
	protected static $db_fields = array('id', 'code' ,'descriptor' ,'typeid' ,'matcatid' ,'uom' ,'longdesc' ,'picfile' ,'onhand' ,'minlevel' ,'maxlevel' ,'reorderqty' ,'unitprice' ,'floorprice' ,'avecost' );
	
	/*
	* Database related fields
	*/
	public $id;
	public $code;
	public $descriptor;
	public $typeid;
	public $matcatid;
	public $uom;
	public $longdesc;
	public $picfile;
	public $onhand;
	public $minlevel;
	public $maxlevel;
	public $reorderqty;
	public $unitprice;
	public $floorprice;
	public $avecost;
	
}

