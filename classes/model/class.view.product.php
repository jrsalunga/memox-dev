<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class vProduct extends DatabaseObject{
	
	protected static $table_name="vproduct";
	protected static $db_fields = array('id', 'code' ,'brand' ,'model' ,'descriptor' ,'category' ,'type' ,'onhand' ,'minlevel' ,'maxlevel' ,'reorderqty' ,'unitprice' ,'floorprice' ,'avecost' ,'brandid' ,'modelid' ,'prodcatid' ,'typeid' ,'serialized' ,'uom' ,'longdesc' ,'picfile');
	
	/*
	* Database related fields
	*/
	public $id;
	public $code;
	public $brand;
	public $model;
	public $descriptor;
	public $category;
	public $type;
	public $onhand;
	public $minlevel;
	public $maxlevel;
	public $reorderqty;
	public $unitprice;
	public $floorprice;
	public $avecost;
	public $brandid;
	public $modelid;
	public $prodcatid;
	public $typeid;
	public $serialized;
	public $uom;
	public $longdesc;
	public $picfile;

	
}

