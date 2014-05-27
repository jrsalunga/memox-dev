<?php
include_once('../../lib/initialize.php');

global $database;

$ctr = 1;
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
		
		$model = Model::find_by_sql("SELECT * FROM model WHERE code = '".$data[2]."'");
		$model = array_shift($model);
		echo "<br />";
		//echo var_dump($model);
		//$brand = array_shift($brand);
		//echo $brand->id . "<br />\n";
		//echo "<br />";
		//echo "Brand : ". $brand->code ."<br>";
		//echo "Model : ". $data[2] ."<br>";
		
		//echo "Brand : ". Brand::row($model->brandid, 0) ."<br>";
		//echo "Model : ". Model::row($model->id,0) ."<br>";
		

		
		
		$product = new Product();
		$product->code = str_pad($ctr, 10, "0", STR_PAD_LEFT);
		$product->descriptor = $data[0];
		$product->brandid = $model->brandid;
		$product->modelid = $model->id;
		$product->typeid = $data[1];
		$product->serialized = $data[4];
		$product->prodcatid = '06129F75CE8F11E3A340C0188508F93C';
		$product->uom = $data[5];
		
		
		echo "Code : ". $product->code ."<br>";
		echo "Descriptor : ". $product->descriptor ."<br>";
		echo "Brand : ". Brand::row($product->brandid,1) ."<br>";
		echo "Model : ". Model::row($product->modelid,1) ."<br>";
		echo "Brandid : ". $product->brandid ."<br>";
		echo "Modelid : ". $product->modelid ."<br>";
		echo "Typeid : ". $product->typeid ."<br>";
		echo "Serialized : ". $product->serialized ."<br>";
		echo "Prodcatid : ". $product->prodcatid ."<br>";
		echo "Uom : ". $product->uom ."<br>";

		
		
		
		//echo $product->toJSON();
		
		//echo $product->save() ? 'Saved!':'Error!';
		echo "<br />";
		echo "<br />";
		$ctr++;
		
    }
    fclose($handle);
}

?>