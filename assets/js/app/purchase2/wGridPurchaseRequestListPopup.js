Ext.define('GridPurchaseRequestListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'total_item'
    ],
    idProperty: 'id'
});
var storeGridPurchaseRequestList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseRequestListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/purchaserequisition/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }]
});

storeGridPurchaseRequestList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
        'option': 'not_yet_po'
            // 'wherenotinschedule':'true'
    };
});

Ext.define('MY.searchGridPurchaseRequestList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseRequestList',
    store: storeGridPurchaseRequestList,
    width: 180
});
// var smGridPurchaseRequestList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridPurchaseRequestList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define('GridPurchaseRequestList', {
    itemId: 'GridPurchaseRequestListID',
    id: 'GridPurchaseRequestListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseRequestList',
    store: storeGridPurchaseRequestList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            Ext.getCmp('no_purchase_req').setValue(selectedRecord.get('nopurchase'));
            Ext.getCmp('idpurchase_req_PurchaseOrder').setValue(selectedRecord.get('idpurchase'));

            var purchase_req_date = Ext.getCmp('purchase_req_date');
            purchase_req_date.setValue(selectedRecord.get('date'));

            var cbUnitEntryPurchaseOrder = Ext.getCmp('cbUnitEntryPurchaseOrder');
            cbUnitEntryPurchaseOrder.setValue(selectedRecord.get('idunit'));
            cbUnitEntryPurchaseOrder.setReadOnly(true);

            var supplierPurchaseOrder = Ext.getCmp('supplierPurchaseOrder');
            supplierPurchaseOrder.setValue(selectedRecord.get('idsupplier'));
            // supplierPurchaseOrder.setReadOnly(true);

            // var paymentPurchaseOrder = Ext.getCmp('paymentPurchaseOrder');
            // paymentPurchaseOrder.setValue(selectedRecord.get('idpayment'));
            // paymentPurchaseOrder.setReadOnly(true);

            // var memoPurchaseOrder = Ext.getCmp('memoPurchaseOrder');
            // memoPurchaseOrder.setValue('Sales Order');

            Ext.getCmp('cb_tax_id_po').setValue(selectedRecord.get('rate'));
            // Ext.getCmp('cb_tax_id_po').setReadOnly(true);

            // Ext.getCmp('shipaddressPurchaseOrder').setValue(selectedRecord.get('shipto'));
            // Ext.getCmp('comboxcurrencyPurchaseOrder').setValue(selectedRecord.get('idcurrency'));

            Ext.getCmp('subtotalPurchaseOrder').setValue(selectedRecord.get('subtotal'));
            // Ext.getCmp('angkutPurchaseOrder').setValue(selectedRecord.get('freight'));
            Ext.getCmp('totalPajakPurchaseOrder').setValue(selectedRecord.get('tax'));
            Ext.getCmp('totalPurchaseOrder').setValue(selectedRecord.get('totalamount'));


            //insert item to grid
            Ext.Ajax.request({
                url: SITE_URL + 'purchase/get_item_pr',
                method: 'GET',
                params: {
                    idpurchase: selectedRecord.get('idpurchase')
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);

                    Ext.each(d.data, function(obj, i) {
                        console.log(obj);

                        var recSO = new GridItemPurchaseOrderModel({
                            idpurchaseitem: obj.idpurchaseitem,
                            idinventory: obj.idinventory,
                            invno: obj.invno,
                            nameinventory: obj.nameinventory,
                            short_desc: obj.short_desc,
                            price: obj.price * 1,
                            // idunit:obj.idsalesitem,
                            // assetaccount:obj.idsalesitem,
                            sku_no: obj.sku_no,
                            qty: obj.qty * 1,
                            size: 1,
                            size_measurement: obj.short_desc,
                            disc: obj.disc * 1,
                            total: obj.total * 1,
                            ratetax: obj.ratetax * 1
                                //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                        });

                        var gridSO = Ext.getCmp('EntryPurchaseOrder');
                        gridSO.getStore().insert(0, recSO);
                    });



                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });

            Ext.getCmp('wGridPurchaseRequestListPopup').hide();

        }
    }, {
        dataIndex: 'idpurchase',
        hidden: true,
        header: 'idpurchase'
    }, {
        dataIndex: 'idunit',
        hidden: true,
        header: 'idunit'
    }, {
        dataIndex: 'comments',
        hidden: true,
        header: 'comments'
    }, {
        header: 'No Purchase',
        dataIndex: 'nopurchase',
        minWidth: 150
    }, {
        header: 'Supplier Name',
        flex: 1,
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Date Requisition',
        dataIndex: 'date',
        minWidth: 150
    }, {
        header: 'Total Item',
        hidden: true,
        dataIndex: 'totalitem',
        minWidth: 80,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Subtotal',
        dataIndex: 'subtotal',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Shipping Cost',
        dataIndex: 'freight',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Tax',
        dataIndex: 'tax',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Item',
        dataIndex: 'total_item',
        minWidth: 150,
        align: 'right'
    }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPurchaseRequestList',
                    text: 'Left Button'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseRequestList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseRequestList.load();
            }
        }
    }
});

Ext.define(dir_sys + 'purchase2.wGridPurchaseRequestListPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wGridPurchaseRequestListPopup',
    // var wGridPurchaseRequestListPopup = Ext.create('widget.window', {
    id: 'wGridPurchaseRequestListPopup',
    title: 'Choose Purchase Requisition',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: 950,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridPurchaseRequestList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterSupplierCode',
        id: 'targetIdFilterSupplierCode'
    }, {
        xtype: 'hiddenfield',
        id: 'prefixWinPurchaseRequestList',
    }, ]
});