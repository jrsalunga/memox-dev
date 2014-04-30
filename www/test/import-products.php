<?php
include_once('../../lib/initialize.php');

global $database;


$row = 1;
if (($handle = fopen("csv/products.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "$num fields in line $row: </br>";
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . " - ";
        }
		
		$desc = explode(' ', $data[0]);
		
		echo "<br />";
		echo var_dump($desc);
		
		//$brand = Brand::find_by_sql("SELECT * FROM brand WHERE code = '".$data[2]."'");
		//$brand = array_shift($brand);
		//echo $brand->id . "<br />\n";
		echo "<br />";
		echo "Brand : ". $desc[0] ."<br>";
		echo "Model : ". $desc[1] ."<br>";
		
		
		$product = new Product();
		$product->descriptor = $data[1];
		$product->typeid = $data[4];
		$product->prodcatid = '06129F75CE8F11E3A340C0188508F93C';
		$product->uom = $data[5];
		
		
		
		//echo $product->toJSON();
		
		//echo $product->save() ? 'Saved!':'Error!';
		echo "<br />";
		echo "<br />";
		
		
    }
    fclose($handle);
}

?>