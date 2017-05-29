var supplierStore = Ext.create('Ext.data.Store', {
        fields: ['idsupplier', 'namesupplier'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/supplier',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxidsupplier', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxidsupplier',
    fieldLabel: 'Supplier',
    displayField: 'namesupplier',
    valueField: 'idsupplier',
    name: 'idsupplier',
    editable: false,
    triggerAction: 'all',
    store: supplierStore
});

var brandStore = Ext.create('Ext.data.Store', {
        fields: ['brand_id', 'brand_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/brand',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
});

Ext.define('comboxbrand', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbrand',
    fieldLabel: 'Brand',
    displayField: 'brand_name',
    valueField: 'brand_id',
    name: 'brand_id',
    editable: false,
    triggerAction: 'all',
    store: brandStore
});

// Ext.define('comboxthickness', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxthickness',
//     fieldLabel: 'Thickness',
//     displayField: 'item_thickness_tct',
//     valueField: 'thickness_id',
//     name: 'thickness_id',
//     editable: false,
//     triggerAction: 'all',
//     store: Ext.create('Ext.data.Store', {
//         fields: ['thickness_id', 'item_thickness_tct'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/thickness',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });

// Ext.define('comboxproductgrade', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxproductgrade',
//     fieldLabel: 'Grade',
//     displayField: 'name',
//     valueField: 'gradeid',
//     name: 'grade',
//     editable: false,
//     triggerAction: 'all',
//     // store: storeProductGrade
//     store: Ext.create('Ext.data.Store', {
//         fields: ['gradeid', 'name'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/productgrade',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });

Ext.define('comboxthickness', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxthickness',
    fieldLabel: 'Thickness',
    displayField: 'item_thickness_tct',
    valueField: 'thickness_id',
    name: 'thickness_id',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['thickness_id', 'item_thickness_tct'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/thickness',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var ArrSalesStatus = [[1,'Open'], [2, 'Canceled'], [3, 'Confirmed'], [4, 'Closed'], [5, 'Picking Up'], [6, 'Partial Delivering'], [7, 'Delivering'], [8, 'Invoiced']];
Ext.define('comboxSalesStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxSalesStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrSalesStatus,
    })  
});

var ArrReturnSalesStatus = [[1,'Open'], [2, 'Canceled'], [3, 'Confirmed'], [4, 'Closed']];
Ext.define('comboxReturnSalesStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxReturnSalesStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrReturnSalesStatus,
    })  
});

var ArrPOReturnStatus = [[1,'Open'], [2, 'Canceled'], [3, 'Confirmed'], [4, 'Partial Received'], [5, 'Full Received'], [6, 'Closed']];
Ext.define('comboxPOReturnStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxPOReturnStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrPOReturnStatus,
    })  
});

var arrInventoryType = [['1','Finished Goods'], ['2', 'Raw Material'], ['3', 'Processed Goods'], ['4', 'Package Goods']];  

Ext.define('comboxInventoryType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryType',
    fieldLabel: 'Inventory Type',
    displayField: 'inventory_type_name',
    valueField: 'inventory_type',
    name: 'inventory_type',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['inventory_type', 'inventory_type_name'],
        data: arrInventoryType
    })
});

var arrInventoryRealCount = [[1,'Open'], [2, 'Confirmed'], [3, 'Closed'], [4, 'Canceled']];

Ext.define('comboInventoryRealCountStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboInventoryRealCountStatus',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'value',
    name: 'status',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'name'],
        data: arrInventoryRealCount
    })  
});

var arrInventoryRealCountType = [[1,'Expense'], [2, 'Sales']];

Ext.define('comboInventoryRealCountType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboInventoryRealCountType',
    fieldLabel: 'Type',
    displayField: 'name',
    valueField: 'value',
    name: 'type_id',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'name'],
        data: arrInventoryRealCountType
    })  
});

var arrWorkOrderStatus = [[1,'Open'], [2, 'Confirmed'], [3, 'On Progress'], [4, 'Pending'], [5, 'Finished'], [6, 'Canceled']];

Ext.define('comboxWorkOrderStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxWorkOrderStatus',
    fieldLabel: 'Status',
    displayField: 'status_wo_name',
    valueField: 'status_wo',
    name: 'status_wo',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['status_wo', 'status_wo_name'],
        data: arrWorkOrderStatus
    })  
});

var ArrDeliveryOrder = [[1,'Open'], [2, 'Confirmed'], [3, 'Canceled'],[4, 'Delivering'],[5,'Delivered'],[6,'Partially Shipped']];


Ext.define('comboxDeliveryOrderStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxDeliveryOrderStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrDeliveryOrder
    })  
});


var ArrInvoiceStatus = [[1,'Unpaid'], [2, 'Paid'], [3, 'Overdue'], [4, 'Partially Paid'], [5, 'Canceled']];

Ext.define('comboxInvoiceStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInvoiceStatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: ArrInvoiceStatus
    })  
});

Ext.define('comboxproductgrade', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproductgrade',
    fieldLabel: 'Grade',
    displayField: 'text',
    valueField: 'value',
    name: 'value',
    editable: false,
    triggerAction: 'all',
    // store: storeProductGrade
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: [['0','Good'], ['1', 'Intermediate'], ['2', 'Bad']],
    })  
});


Ext.define('comboxdatalocation', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxdatalocation',
    fieldLabel: 'Location',
    displayField: 'location_name',
    valueField: 'idlocation',
    name: 'location',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idlocation', 'location_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/location',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});


var InventoryTransferStatusarr = [['1', 'Pending'], ['2', 'Rejected'], ['3','Accepted'], ['4','On Progress'],['5','Transferred']];
var storeInventoryTransferStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: InventoryTransferStatusarr
});

Ext.define('comboxInventoryTransferStatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryTransferStatus',
    fieldLabel: 'Status',
    editable: false,
    displayField: 'text',
    valueField: 'value',
    store: storeInventoryTransferStatus,
    name: 'status'
});

var InventoryAdjustTypeArr = [['1', 'Correction']];
var storeInventoryAdjustType = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: InventoryAdjustTypeArr
});

Ext.define('comboxInventoryAdjustType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxInventoryAdjustType',
    fieldLabel: 'Adjustment Type',
    editable: false,
    displayField: 'text',
    valueField: 'value',
    store: storeInventoryAdjustType,
    name: 'adjustment_type'
});

var requisitionstatusarr = [['1', 'Draft'], ['2', 'Open'], ['3','Being Reviewed'], ['4','Rejected'],['5','Approved'],['6','Closed'],['7','Returned']];
var storeRequisitionStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: requisitionstatusarr
});

Ext.define('comboxrequisitionstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxrequisitionstatus',
    fieldLabel: 'Status',
    displayField: 'text',
    valueField: 'value',
    store: storeRequisitionStatus,
    name: 'status'
});

var paymenttermarr = [['1', 'Cash in Advance'], ['2', 'Cash in Delivery'], ['3','NET d days'], ['4','NET EOM d days'],['5','Discount']];
var storePaymentTerm = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: paymenttermarr
});

Ext.define('comboxpaymentterm', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpaymentterm',
    fieldLabel: 'Payment Term',
    editable:false,
    displayField: 'text',
    valueField: 'value',
    store: storePaymentTerm,
});

var projectstatusarr = [['1', 'Open'], ['2', 'Pending'], ['3','On Going'], ['4','Completed'],['5','Rejected'],['6','Overdue'],['7','Cost Overrun']];
var storeProjectStatus = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: projectstatusarr
});

Ext.define('comboxprojectstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxprojectstatus',
    fieldLabel: 'Type',
    displayField: 'text',
    valueField: 'value',
    store: storeProjectStatus,
    name: 'status'
});


var companytypearr = [['1', 'Head Office'], ['1', 'Branch']];
var storeCompanyType = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: companytypearr
});

Ext.define('comboxcompanytype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcompanytype',
    fieldLabel: 'Type',
    displayField: 'text',
    valueField: 'value',
    store: storeCompanyType,
    name: 'type'
});

// var switcharr = [['0', 'False'], ['1', 'True']];
// var storeSwitch = new Ext.data.ArrayStore({
//     fields: ['value', 'text'],
//     data: switcharr
// });


var modelreportsalesorderdetailarr = [['all', 'Tampilkan Semua Data'], ['delivered', 'Tampilkan Data Terkirim'], ['undelivered', 'Tampilkan Data Tidak Terkirim']];
var storeModelReportSalesOrderDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesorderdetailarr
});

Ext.define('comboxmodelreportsalesorderdetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesorderdetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesorderdetailarr',
    store: storeModelReportSalesOrderDetail
});


var modelreportsalesbycustomerarr = [['all', 'Tampilkan Semua Data'], ['detail', 'Detail']];
var storeModelReportSalesByCustomer = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbycustomerarr
});

Ext.define('comboxmodelreportsalesbycustomer', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbycustomer',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbycustomerarr',
    store: storeModelReportSalesByCustomer
});

var modelreportsalesbysalesmanarr = [['all', 'Tampilkan Semua Data'], ['detail', 'Detail']];
var storeModelReportSalesBySalesman = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbysalesmanarr
});

Ext.define('comboxmodelreportsalesbysalesman', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbysalesman',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbysalesmanarr',
    store: storeModelReportSalesBySalesman
});

var modelreportsalesreturndetailarr = [['all', 'Tampilkan Semua Data'], ['detail', 'Detail']];
var storeModelReportSalesReturnDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesreturndetailarr
});

Ext.define('comboxmodelreportsalesreturndetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesreturndetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesreturndetailarr',
    store: storeModelReportSalesReturnDetail
});

var modelreportsalesbookarr = [['all', 'Tampilkan Semua Data'], ['detail', 'Detail']];
var storeModelReportSalesBook = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportsalesbookarr
});

Ext.define('comboxmodelreportsalesbook', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportsalesbook',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportsalesbookarr',
    store: storeModelReportSalesBook
});

var modelreportpurchaseorderoutstandingdetailarr = [['all', 'Tampilkan Semua Data'], ['detail', 'Detail']];
var storeModelReportPurchaseOrderOutstandingDetail = new Ext.data.ArrayStore({
    fields: ['value', 'text'],
    data: modelreportpurchaseorderoutstandingdetailarr
});

Ext.define('comboxmodelreportpurchaseorderoutstandingdetail', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmodelreportpurchaseorderoutstandingdetail',
    fieldLabel: 'Model Report',
    displayField: 'text',
    valueField: 'value',
    name: 'modelreportpurchaseorderoutstandingdetailarr',
    store: storeModelReportPurchaseOrderOutstandingDetail
});

var bulanarr = [['01', 'Januari'], ['02', 'Februari'], ['03', 'Maret'], ['04', 'April'], ['05', 'Mei'], ['06', 'Juni'], ['07', 'Juli'], ['08', 'Agustus'], ['09', 'September'], ['10', 'Oktober'], ['11', 'November'], ['12', 'Desember']];
var storeBulan = new Ext.data.ArrayStore({
    fields: ['nobulan', 'namabulan'],
    data: bulanarr
});

Ext.define('comboxbulan', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan',
    fieldLabel: 'Bulan',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});

Ext.define('comboxbulan2', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbulan2',
    // fieldLabel: 'Bulan',
    displayField: 'namabulan',
    valueField: 'namabulan',
    name: 'namabulan',
    store: storeBulan
});

Ext.define('comboxbussinestype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbussinestype',
    fieldLabel: 'Tipe',
    displayField: 'namebussines',
    valueField: 'namebussines',
    name: 'namebussines',
    store: Ext.create('Ext.data.Store', {
        fields: ['idbussinestype', 'namebussines'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/bussinestype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

// Ext.define('comboxproducttype', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxproducttype',
//     fieldLabel: 'Tipe',
//     displayField: 'product_type_name',
//     valueField: 'product_type_id',
//     name: 'product_type_id',
//     store: Ext.create('Ext.data.Store', {
//         fields: ['product_type_id', 'product_type_name'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/product_type',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });

// Ext.define('comboxmeasurement', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxmeasurement',
//     fieldLabel: 'Mata Uang',
//     displayField: 'short_desc',
//     valueField: 'measurement_id',
//     submitValue: 'measurement_id',
//     editable: false,
//     triggerAction: 'all',
//     listConfig: {
//         getInnerTpl: function() {
//             return '<div data-qtip="{short_desc}. {slogan}">{short_desc} ({long_desc})</div>';
//         }
//     },
//     store: Ext.create('Ext.data.Store', {
//         fields: ['measurement_id', 'short_desc','long_desc'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/productmeasurement',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         autoLoad: false
//     })
// });

var productMeasurementStore = Ext.create('Ext.data.Store', {
        fields: ['measurement_id', 'short_desc','long_desc'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/productmeasurement',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
});

Ext.define('comboxmeasurement', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxmeasurement',
    fieldLabel: 'Measurement',
    displayField: 'short_desc',
    valueField: 'measurement_id',
    submitValue: 'measurement_id',
    editable: false,
    triggerAction: 'all',
    store: productMeasurementStore
});

Ext.define('comboxbussinestype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxbussinestype',
    fieldLabel: 'Tipe',
    displayField: 'namebussines',
    valueField: 'namebussines',
    name: 'namebussines',
    store: Ext.create('Ext.data.Store', {
        fields: ['idbussinestype', 'namebussines'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/bussinestype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});


Ext.define('comboxAccountType', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxAccountType',
    fieldLabel: 'Tipe Akun',
    displayField: 'acctypename',
    valueField: 'idaccounttype',
    editable: false,
    triggerAction: 'all',
    name: 'acctypename',
    store: Ext.create('Ext.data.Store', {
        fields: ['idaccounttype', 'acctypename'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/accounttype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
})

var taxStore = Ext.create('Ext.data.Store', {
        fields: ['idtax', 'nametax','rate'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tax',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtaxtype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxtaxtype',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'idtax',
    editable: false,
    triggerAction: 'all',
    listConfig: {
        getInnerTpl: function() {
            return '{nametax} - {rate}%';
        }
    },
    store: taxStore
});

var inventoryCategoryStore = Ext.create('Ext.data.Store', {
        fields: ['idinventorycat', 'namecat'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/inventorycat',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })

Ext.define('comboxinventorycat', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxinventorycat',
    fieldLabel: 'Category',
    displayField: 'namecat',
    valueField: 'namecat',
    name: 'namecat',
    editable: false,
    triggerAction: 'all',
    store: inventoryCategoryStore
});

Ext.define('comboxtax', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxtax',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'nametax',
    editable: false,
    emptyText: 'Choose Tax...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idtax', 'nametax', 'rate'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tax',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxidtax', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxidtax',
    fieldLabel: 'Pajak',
    displayField: 'nametax',
    valueField: 'idtax',
    name: 'idtax',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idtax', 'nametax', 'rate'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tax',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxclassificationcf', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxclassificationcf',
    fieldLabel: 'Klasifikasi Akun',
    displayField: 'classname',
    valueField: 'classname',
    name: 'classname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idclassificationcf', 'classname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/classificationcf',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

// var storeUnit = Ext.create('Ext.data.Store', {
//         fields: ['idunit', 'namaunit'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/unit',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
//     });

// Ext.define('comboxunit', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxunit',
//     fieldLabel: 'Location',
//     displayField: 'namaunit',
//     valueField: 'namaunit',
//     name: 'namaunit',
//     editable: false,
//     triggerAction: 'all',
//     store: Ext.create('Ext.data.Store', {
//         fields: ['idunit', 'namaunit'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/unit',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
// });

var storeCustomer = Ext.create('Ext.data.Store', {
        fields: ['idcustomer', 'namecustomer'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/customer',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode:'remote',
        autoLoad: false
    });

Ext.define('comboxCustomer', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxCustomer',
    fieldLabel: 'Customer',
    displayField: 'namecustomer',
    valueField: 'idcustomer',
    name: 'idcustomer',
    editable: false,
    triggerAction: 'all',
    store: storeCustomer
});

// var storeCustomer = Ext.create('Ext.data.Store', {
//         fields: ['idcustomer', 'namecustomer'],
//         proxy: {
//             type: 'ajax',
//             url: SITE_URL + 'backend/combox/customer',
//             reader: {
//                 type: 'json',
//                 root: 'dat'
//             }
//         },
//         queryMode:'remote',
//         autoLoad: false
//     });


// Ext.define('comboxcustomer', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxcustomer',
//     fieldLabel: 'Customer',
//     displayField: 'namecustomer',
//     valueField: 'idcustomer',
//     name: 'namecustomer',
//     editable: false,
//     triggerAction: 'all',
//     store: storeCustomer
// });

var comboxemployeeStore = Ext.create('Ext.data.Store', {
        fields: ['idemployeetype', 'nametype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/employeetype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxemployee', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxemployee',
    fieldLabel: 'Tipe Pegawai',
    displayField: 'nametype',
    valueField: 'nametype',
    name: 'nametype',
    editable: false,
    triggerAction: 'all',
    store: comboxemployeeStore
});

var comboxWarehouseStore = Ext.create('Ext.data.Store', {
        fields: ['warehouse_id', 'warehouse_desc', 'warehouse_code'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/warehouse',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxWarehouse', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxWarehouse',
    fieldLabel: 'Warehouse',
    displayField: 'warehouse_desc',
    valueField: 'warehouse_id',
    name: 'warehouse_id',
    editable: false,
    triggerAction: 'all',
    store: comboxWarehouseStore
});


Ext.define('comboxscheduletype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxscheduletype',
    fieldLabel: 'Jenis Jadwal',
    displayField: 'schname',
    valueField: 'schname',
    name: 'schname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idscheduletype', 'schname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/scheduletype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxsys_user', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxsys_user',
    fieldLabel: 'Nama User',
    displayField: 'realname',
    valueField: 'realname',
    name: 'realname',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['user_id', 'realname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/sys_user',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxfrequency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxfrequency',
    fieldLabel: 'Frekuensi',
    displayField: 'namefreq',
    valueField: 'namefreq',
    name: 'namefreq',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idfrequency', 'namefreq'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/frequency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});


Ext.define('comboxshipping', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxshipping',
    fieldLabel: 'Shipping Type',
    displayField: 'nameshipping',
    valueField: 'idshipping',
    name: 'idshipping',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idshipping', 'nameshipping'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/shipping',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var StorePayment = Ext.create('Ext.data.Store', {
        fields: ['idpayment', 'namepayment'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/payment',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpayment', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpayment',
    fieldLabel: 'Pembayaran',
    displayField: 'namepayment',
    valueField: 'namepayment',
    name: 'namepayment',
    editable: false,
    triggerAction: 'all',
    store: StorePayment
});

var journalSearchStore = Ext.create('Ext.data.Store', {
    fields: ['nosearchJ', 'nmsearchJ'],
    data: [
         {"nosearchJ":1, "nmsearchJ":"No Ref"},
        {"nosearchJ":2, "nmsearchJ":"Memo"},
        {"nosearchJ":3, "nmsearchJ":"Nama Akun"}
    ]
});

Ext.define('comboxSearchJ', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxSearchJ',
//    fieldLabel: 'Cari',
    displayField: 'nmsearchJ',
    queryMode: 'local',
    id: 'nosearchJ',
    name: 'nosearchJ',
    editable: false,
    triggerAction: 'all',
    valueField: 'nosearchJ',
    store: journalSearchStore,
    value:1
});

Ext.define('comboxjournaltype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxjournaltype',
    fieldLabel: 'Tipe Jurnal',
    displayField: 'namejournal',
    valueField: 'idjournaltype',
    name: 'namejournal',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idjournaltype', 'namejournal'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/journaltype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var storeUnit = Ext.create('Ext.data.Store', {
        fields: ['idunit', 'namaunit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combounit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
    
// Ext.define('comboxunit', {
//     extend: 'Ext.form.ComboBox',
//     alias: 'widget.comboxunit',
//     fieldLabel: 'Location',
//     displayField: 'namaunit',
//     valueField: 'namaunit',
//     name: 'namaunit',
//     value:idunit,
//     editable: false,
//     triggerAction: 'all',
//     store: storeUnit
// });

Ext.define('comboxcurrency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcurrency',
    fieldLabel: 'Mata Uang',
    displayField: 'namecurr',
    valueField: 'idcurrency',
    name: 'namecurr',
    submitValue: 'idcurrency',
    editable: false,
    triggerAction: 'all',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{namecurr}. {slogan}">{namecurr} ({symbol})</div>';
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields: ['idcurrency', 'namecurr','symbol'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/currency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});



var headerAkunStore = Ext.create('Ext.data.Store', {
        fields: ['idpos', 'namepos'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/accountpos',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxheaderAkun', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxheaderAkun',
//    fieldLabel: 'Cari',
    displayField: 'namepos',
    queryMode: 'local',
    name: 'idpos',
    editable: false,
    triggerAction: 'all',
    valueField: 'idpos',
    store: headerAkunStore
//    autoLoad: false
});

var sys_groupStore = Ext.create('Ext.data.Store', {
        fields: ['group_id', 'group_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/sys_group',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
});

Ext.define('comboxsys_group', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsys_group',
    displayField: 'group_name',
    fieldLabel: 'Kelompok User',
    queryMode: 'local',
    name: 'group_name',
    editable: false,
    triggerAction: 'all',
    valueField: 'group_name',
    store: sys_groupStore
});

var storetunjangan = Ext.create('Ext.data.Store', {
        fields: ['idtunjtype', 'nametunj'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tunjangantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
    
Ext.define('comboxtunjangantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtunjangantype',
    displayField: 'nametunj',
    fieldLabel: 'Jenis Tunjangan',
    queryMode: 'local',
    name: 'nametunj',
    editable: false,
    triggerAction: 'all',
    valueField: 'nametunj',
    store: storetunjangan
});

var siklusStore = Ext.create('Ext.data.Store', {
        fields: ['idsiklus', 'namasiklus'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/siklus',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxsiklus', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsiklus',
    displayField: 'namasiklus',
    fieldLabel: 'Siklus',
    queryMode: 'local',
    name: 'namasiklus',
    editable: false,
    triggerAction: 'all',
    valueField: 'namasiklus',
    store: siklusStore
});

var potongantypeStore = Ext.create('Ext.data.Store', {
        fields: ['idpotongantype', 'namepotongan'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/potongantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpotongantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpotongantype',
    displayField: 'namepotongan',
    fieldLabel: 'Jenis Potongan',
    queryMode: 'local',
    name: 'namepotongan',
    editable: false,
    triggerAction: 'all',
    valueField: 'namepotongan',
    store: potongantypeStore
});

Ext.define('comboxamounttype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxamounttype',
    displayField: 'name',
    fieldLabel: 'Tipe Potongan',
    queryMode: 'local',
    name: 'name',
    editable: false,
    triggerAction: 'all',
    valueField: 'name',
    store: Ext.create('Ext.data.Store', {
        fields: ['idamounttype', 'name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/potongantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

var payrolltypeStore = Ext.create('Ext.data.Store', {
        fields: ['payrolltypeid', 'payname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/payrolltype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxpayrolltype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpayrolltype',
    displayField: 'payname',
    fieldLabel: 'Jenis Pembayaran',
    queryMode: 'local',
    name: 'payname',
    editable: false,
    triggerAction: 'all',
    valueField: 'payname',
    store: payrolltypeStore
});

var tambahangajitypeStore = Ext.create('Ext.data.Store', {
        fields: ['idtambahangajitype', 'tambahantype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/tambahangajitype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtambahangajitype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtambahangajitype',
    displayField: 'tambahantype',
    fieldLabel: 'Jenis Tambahan Gaji',
    queryMode: 'local',
    name: 'tambahantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'tambahantype',
    store: tambahangajitypeStore
});

var jenisptkpStore = Ext.create('Ext.data.Store', {
        fields: ['idjenisptkp', 'namaptkp','deskripsi'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/jenisptkp',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
Ext.define('comboxjenisptkp', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxjenisptkp',
    displayField: 'namaptkp',
    fieldLabel: 'Jenis PTKP',
    queryMode: 'local',
    name: 'namaptkp',
    editable: false,
    triggerAction: 'all',
    valueField: 'namaptkp',
    store: jenisptkpStore,
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{deskripsi}.">{namaptkp}</div>';
        }
    }
});

var tmpStoreShippingAddress = Ext.create('Ext.data.Store', {
    fields: ['alamat', 'alamat2','alamat3'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/shippingaddress',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: true
});

var storeShippingAddress = new Ext.data.ArrayStore({
    fields: ['address'],
    // data: requisitionstatusarr
});

Ext.onReady(function() {
    // var data = tmpStoreShippingAddress.data.items[0].data;
    // var addressarr = [[data.alamat], [data.alamat2], [data.alamat3]];
    // storeShippingAddress.loadData(addressarr);
});

Ext.define('comboxshippingaddress', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxshippingaddress',
    displayField: 'address',
    fieldLabel: 'Shipping Address',
    queryMode: 'local',
    name: 'shippingadrress',
    editable: false,
    triggerAction: 'all',
    valueField: 'address',
    store: storeShippingAddress,
    // listConfig: {
    //     getInnerTpl: function() {
    //         return '<div data-qtip="{value}.">{text}</div>';
    //     }
    // }
});

var pelangganTypeStore = Ext.create('Ext.data.Store', {
        fields: ['idpelanggantype', 'pelanggantype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/pelanggantype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
Ext.define('comboxpelanggantype', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxpelanggantype',
    displayField: 'pelanggantype',
    fieldLabel: 'Jenis Pelanggan',
    queryMode: 'local',
    name: 'pelanggantype',
    editable: false,
    triggerAction: 'all',
    valueField: 'pelanggantype',
    store: pelangganTypeStore
});

var tahunPayrollStore = Ext.create('Ext.data.Store', {
        fields: ['year'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/comboxTahunPayroll',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });

Ext.define('comboxtahunPayroll', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxtahunPayroll',
    displayField: 'year',
    fieldLabel: 'Tahun Penggajian',
    queryMode: 'local',
    name: 'tahunpayroll',
    editable: false,
    triggerAction: 'all',
    valueField: 'year',
    store: tahunPayrollStore
});


// var UnitItemStore = Ext.create('Ext.data.Store', {
//     fields: ['unit_item_id', 'unit_name'],
//     proxy: {
//         type: 'ajax',
//         url: SITE_URL + 'backend/combox/unit_item',
//         reader: {
//             type: 'json',
//             root: 'dat'
//         }
//     },
//     autoLoad: false
// });
// 
// Ext.define('comboxUnitItem', {
//     extend: 'Ext.form.field.ComboBox',
//     alias: 'widget.comboxUnitItem',
//     displayField: 'unit_name',
//     fieldLabel: 'Unit Name',
//     queryMode: 'local',
//     name: 'unit_item_id',
//     editable: false,
//     triggerAction: 'all',
//     valueField: 'unit_item_id',
//     store: UnitItemStore
// });


var MachineTypeStore = Ext.create('Ext.data.Store', {
        fields: ['machine_type_id', 'machine_type_name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/machine_type',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    });
Ext.define('comboxMachineType', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxMachineType',
    displayField: 'machine_type_name',
    fieldLabel: 'Machine Type',
    queryMode: 'local',
    name: 'machine_type_id',
    editable: false,
    triggerAction: 'all',
    valueField: 'machine_type_id',
    store: MachineTypeStore
});

//-----------------------------------------//

Ext.define('comboxswitch', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxswitch',
    displayField: 'value',
    valueField: 'id',
    editable: false,
    triggerAction: 'all',
    store: new Ext.data.ArrayStore({
        fields:['id', 'value'],
        data: togglearr
    }),
});

Ext.define('comboxunit', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxunit',
    fieldLabel: 'Unit',
    displayField: 'namaunit',
    valueField: 'idunit',
    name: 'idunit',
    value:idunit,
    editable: false,
    emptyText: 'Choose Unit...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idunit', 'namaunit'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/unit',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode:'remote',
        autoLoad: true
    }),
});

Ext.define('comboxpurchasestatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpurchasestatus',
    fieldLabel: 'Status',
    displayField: 'name',
    valueField: 'idpurchasestatus',
    name: 'idpurchasestatus',
    editable: false,
    emptyText: 'Choose Status...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idpurchasestatus', 'name'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/purchasestatus',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode:'remote',
        autoLoad: false
    }),
});

Ext.define('comboxpurchasetype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxpurchasetype',
    fieldLabel: 'Purchase Type',
    displayField: 'namepurchase',
    valueField: 'idpurchasetype',
    name: 'purchasetype',
    editable: false,
    emptyText: 'Choose Type...',
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idpurchasetype', 'namepurchase'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/purchasetype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        queryMode:'remote',
        autoLoad: false
    }),
});

Ext.define('comboxcurrency', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcurrency',
    fieldLabel: 'Currency',
    displayField: 'namecurr',
    valueField: 'idcurrency',
    name: 'idcurrency',
    submitValue: 'idcurrency',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Currency...',
    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{namecurr}. {slogan}">{namecurr} ({symbol})</div>';
        }
    },
    store: Ext.create('Ext.data.Store', {
        fields: ['idcurrency', 'namecurr','symbol'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/currency',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxshipping', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxshipping',
    fieldLabel: 'Pengiriman',
    displayField: 'nameshipping',
    valueField: 'idshipping',
    name: 'nameshipping',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Shipping Mode...',
    store: Ext.create('Ext.data.Store', {
        fields: ['idshipping', 'nameshipping'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/shipping',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

//shipping address//
var tmpStoreShipAddress = Ext.create('Ext.data.Store', {
    fields: ['alamat', 'alamat2','alamat3'],
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/combox/shipaddress',
        reader: {
            type: 'json',
            root: 'dat'
        }
    },
    autoLoad: true
});

var storeShipAddress = new Ext.data.ArrayStore({
    fields: ['address'],
});

Ext.onReady(function() {
    var data = tmpStoreShipAddress.data.items[0].data;
    var addressarr = [[data.alamat], [data.alamat2], [data.alamat3]];
    storeShipAddress.loadData(addressarr);
});

Ext.define('comboxshipaddress', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxshipaddress',
    displayField: 'address',
    fieldLabel: 'Shipping Address',
    queryMode: 'local',
    name: 'shippingadrress',
    editable: true,
    triggerAction: 'all',
    emptyText: 'Choose Shipping Address...',
    valueField: 'address',
    store: storeShipAddress,
});

//shipping address//
//
Ext.define('comboxsuppliertype', {
    id: 'comboxsuppliertype',
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsuppliertype',
    displayField: 'name',
    fieldLabel: 'Type',
    queryMode: 'local',
    name: 'idsuppliertype',
    editable: false,
    triggerAction: 'all',
    valueField: 'idsuppliertype',
    emptyText: 'Choose Type...',
    store: Ext.create('Ext.data.Store', {
            fields: ['idsuppliertype', 'name'],
            proxy: {
                type: 'ajax',
                url: SITE_URL + 'backend/combox/supplier_type',
                reader: {
                    type: 'json',
                    root: 'dat'
                }
            },
            autoLoad: false
    })
});

Ext.define('comboxsupplier', {
    // id: 'comboxsupplier',
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.comboxsupplier',
    displayField: 'namesupplier',
    fieldLabel: 'Supplier',
    queryMode: 'local',
    name: 'idsupplier',
    editable: false,
    triggerAction: 'all',
    valueField: 'idsupplier',
    emptyText: 'Choose Suppler...',
    store: Ext.create('Ext.data.Store', {
            fields: ['idsupplier', 'namesupplier'],
            proxy: {
                type: 'ajax',
                url: SITE_URL + 'backend/combox/supplier',
                reader: {
                    type: 'json',
                    root: 'dat'
                }
            },
            autoLoad: false
    })
});

Ext.define('comboxprojectstatus', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxprojectstatus',
    fieldLabel: 'Type',
    displayField: 'status',
    valueField: 'id',
    store: new Ext.data.ArrayStore({
        fields: ['id', 'status'],
        data: projectstatusarr
    }),
    name: 'projectstatus'
});

Ext.define('comboxcustomertype', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxcustomertype',
    fieldLabel: 'Tipe Konsumen',
    displayField: 'namecustype',
    valueField: 'idcustomertype',
    name: 'namecustype',
    editable: false,
    triggerAction: 'all',
    store: Ext.create('Ext.data.Store', {
        fields: ['idcustomertype', 'namecustype'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/customertype',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});

Ext.define('comboxproject', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.comboxproject',
    fieldLabel: 'Project',
    displayField: 'projectname',
    valueField: 'idproject',
    name: 'idproject',
    editable: false,
    triggerAction: 'all',
    emptyText: 'Choose Project...',
    store: Ext.create('Ext.data.Store', {
        fields: ['idproject', 'projectname'],
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'backend/combox/project',
            reader: {
                type: 'json',
                root: 'dat'
            }
        },
        autoLoad: false
    })
});