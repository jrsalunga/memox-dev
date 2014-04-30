<?php
include_once('../../lib/initialize.php');

global $database;


$row = 1;
if (($handle = fopen("csv/models.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "<br />\n";
        }
		
		$brand = Brand::find_by_sql("SELECT * FROM brand WHERE code = '".$data[2]."'");
		$brand = array_shift($brand);
		//echo $brand->id . "<br />\n";
		
		$model = new Model();
		$model->code = $data[0];
		$model->descriptor = $data[1];
		$model->brandid = $brand->id;
		
		//echo $model->save() ? 'Saved!':'Error!';
		echo "<br />\n";
		
		
    }
    fclose($handle);
}

?>