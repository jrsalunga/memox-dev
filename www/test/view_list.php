<?php


$vItem = "SELECT a.code, a.descriptor, b.descriptor as itemcat, a.itemcatid, a.id
FROM item a, itemcat b
WHERE a.itemcatid = b.id";

$vMaterial = "SELECT a.code, a.descriptor, a.typeid, c.descriptor as type, a.matcatid, b.descriptor as matcat, a.uom, a.longdesc, a.onhand, a.minlevel, a.maxlevel, a.reorderqty, a.avecost, a.id
FROM material a, matcat b, material_type c
WHERE a.matcatid = b.id AND a.typeid = c.code";

$vApvhdr = "SELECT a.refno, a.date, b.descriptor as supplier, a.supplierid, a.supprefno, a.porefno, a.terms, a.totamount, a.balance, a.notes, a.posted, a.cancelled, a.printctr, a.totline, a.id
FROM apvhdr a, supplier b
WHERE a.supplierid = b.id";


$vApvhdr2 = "SELECT a.refno, a.valuedate as date,
DATE_ADD(a.valuedate, INTERVAL a.terms DAY) AS due,
b.descriptor as supplier, a.supprefno, a.porefno, a.terms, a.totamount, a.balance, a.posted, a.notes, a.supplierid, a.cancelled, a.printctr, a.totline, a.id
FROM apvhdr a
LEFT JOIN supplier b
ON a.supplierid = b.id";

$vProduct = "SELECT a.code, c.descriptor as brand, d.descriptor as model, a.descriptor, e.descriptor as category, b.descriptor as type,
       a.onhand, a.minlevel, a.maxlevel, a.reorderqty, a.unitprice, a.floorprice, a.avecost,
	     a.brandid, a.modelid, a.prodcatid, a.typeid, a.serialized, a.uom, a.longdesc, a.picfile, a.id
FROM product a, product_type b, brand c, model d, prodcat e
WHERE a.typeid = b.code AND a.brandid = c.id AND a.modelid = d.id AND a.prodcatid = e.id
ORDER BY a.descriptor";

$vProduct2 = "SELECT a.code, c.descriptor as brand, d.descriptor as model, a.descriptor, e.descriptor as category, b.descriptor as type,
       a.onhand, a.minlevel, a.maxlevel, a.reorderqty, a.unitprice, a.floorprice, a.avecost,
	     a.brandid, a.modelid, a.prodcatid, a.typeid, a.serialized, a.uom, a.longdesc, a.picfile, a.id
FROM product a
LEFT JOIN product_type b ON a.typeid = b.code
LEFT JOIN brand c ON a.brandid = c.id
LEFT JOIN model d ON a.modelid = d.id
LEFT JOIN prodcat e ON a.prodcatid = e.id
ORDER BY a.descriptor";

$vProdpropProperty = "SELECT a.code, a.descriptor as product,
       b.code as property_code, b.descriptor as property, b.propcatid,
       c.propertyid, c.productid, c.id, c.descriptor as prodprop,
       d.descriptor as property_category
FROM product a, property b, prodprop c, propcat d
WHERE a.id = c.productid AND c.propertyid = b.id AND b.propcatid = d.id
ORDER BY d.ordinal ASC, b.ordinal ASC";

$vProperty = "SELECT a.code, a.descriptor, b.descriptor as propcat, a.ordinal, a.propcatid, a.id
FROM property a
LEFT JOIN  propcat b
ON a.propcatid = b.id";

$vApvdtl = "SELECT b.apvhdrid, c.descriptor as item, b.itemid, b.amount, b.id
FROM apvdtl b
LEFT JOIN apvhdr a
ON a.id = b.apvhdrid
LEFT JOIN item c
ON b.itemid = c.id";


?>