<?php
// If it's going to need the database, then it's 
// probably smart to require it before we start.
require_once(ROOT.DS.'classes'.DS.'database.php');

class ProdpropProperty extends DatabaseObject{
	
	protected static $table_name="vprodpropproperty";
	protected static $db_fields = array('id', 'code' ,'product' ,'property_code' ,'property' ,'propcatid' ,'propertyid' ,'productid' ,'prodprop' ,'property_category');
	
	/*
	* Database related fields
	*/
	public $id;
	public $code;
	public $product;
	public $property_code;
	public $property;
	public $propcatid;
	public $propertyid;
	public $productid;
	public $prodprop;
	public $property_category;
	

	
}



