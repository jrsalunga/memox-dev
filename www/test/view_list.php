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


?>