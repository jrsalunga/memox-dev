

function oTableMatcat() {	
	oTable = $('.tb-data').dataTable( {
        "sPaginationType": "full_numbers",
		"bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "../api/datatables/matcat",
	//	"sAjaxSource": "../www/test/datatable_test.php"
		"fnHeaderCallback":  function( nHead, aData, iStart, iEnd, aiDisplay ) { 
				
				//var title = [,"Code","Descriptor"];
				//console.log(title.length);
				//for(i=0; i<=title.length-1; i++) {
				//	$('th:eq('+ i +')', nHead).text(title[i]);
				//}		
				
			},
		"aoColumns": [
			//{   "sTitle": "<input type='checkbox' class='select-all'></input>","mDataProp": null, "sWidth": "20px", "sDefaultContent": "<input type='checkbox' ></input>", "bSortable": false},
            { "mData": "code",  "sTitle": "Code",
				"mRender": function ( data, type, full ) {
							return data+'<div class="tb-data-action"><a class="row-delete" href="#">&nbsp;</a><a class="row-edit" href="#">&nbsp;</a></div>';
				}
			},
            { "mData": "descriptor",  "sTitle": "Descriptor" }
			],
		"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

      $(nRow).attr("data-id", aData.id);
			$(nRow).attr("id", aData.id);
	
      }
    });
}

function oTableItemcat(){
	oTable = $('.tb-data').dataTable( {
	        "sPaginationType": "full_numbers",
			"bProcessing": true,
	        "bServerSide": true,
	        "sAjaxSource": "../api/datatables/itemcat",
		//	"sAjaxSource": "../www/test/datatable_test.php"
			"fnHeaderCallback":  function( nHead, aData, iStart, iEnd, aiDisplay ) { 
					
					//var title = [,"Code","Descriptor"];
					//console.log(title.length);
					//for(i=0; i<=title.length-1; i++) {
					//	$('th:eq('+ i +')', nHead).text(title[i]);
					//}		
					
				},
			"aoColumns": [
				//{   "sTitle": "<input type='checkbox' class='select-all'></input>","mDataProp": null, "sWidth": "20px", "sDefaultContent": "<input type='checkbox' ></input>", "bSortable": false},
	            { "mData": "code",  "sTitle": "Code",
					"mRender": function ( data, type, full ) {
								return data+'<div class="tb-data-action"><a class="row-delete" href="#">&nbsp;</a><a class="row-edit" href="#">&nbsp;</a></div>';
					}
				},
	            { "mData": "descriptor",  "sTitle": "Descriptor" }
				],
			"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

	      $(nRow).attr("data-id", aData.id);
				$(nRow).attr("id", aData.id);
		
	      }
	    });
}

