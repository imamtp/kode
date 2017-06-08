var WindowEntryGoodsReceipt = Ext.create(dir_sys + 'purchase2.WindowEntryGoodsReceipt');

Ext.define('GridPurchaseOrderListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'totalorder', 'totalreceived', 'sisa'
    ],
    idProperty: 'id'
});

var storeGridPurchaseOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseOrderListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
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


storeGridPurchaseOrderList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
        'option': 'notyetdelivered'
            // 'wherenotinschedule':'true'
    };
});

Ext.define('MY.searchGridPurchaseOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseOrderList',
    store: storeGridPurchaseOrderList,
    width: 180
});
// var smGridPurchaseOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridPurchaseOrderList.getSelection().length;
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
var gridInsertBaruGRPO = Ext.getCmp('EntryGoodsReceipt');
// var EntryGoodsReceiptRM = Ext.getCmp('EntryGoodsReceipt').getStore();

Ext.define('GridPurchaseOrderList', {
    itemId: 'GridPurchaseOrderList',
    id: 'GridPurchaseOrderList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseOrderList',
    store: storeGridPurchaseOrderList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            WindowEntryGoodsReceipt.show();

            Ext.getCmp('cb_tax_id_poreceipt').getStore().load();

            Ext.getCmp('WindowPOList').hide();

            Ext.getCmp('idpurchase_poreceipt').setValue(selectedRecord.get('idpurchase'));
            Ext.getCmp('nojurnal_poreceipt').setValue(selectedRecord.get('nopurchase'));
            Ext.getCmp('po_date_poreceipt').setValue(selectedRecord.get('date'));
            Ext.getCmp('received_date_poreceipt').setMinValue(new Date(selectedRecord.get('date')));
            Ext.getCmp('cbUnit_poreceipt').setValue(selectedRecord.get('idunit'));
            Ext.getCmp('cb_tax_id_poreceipt').setValue(selectedRecord.get('idtax'));
            Ext.getCmp('suppliername_poreceipt').setValue(selectedRecord.get('namesupplier'));
            Ext.getCmp('supplier_poreceipt').setValue(selectedRecord.get('idsupplier'));

            var cb_status_poreceipt = Ext.getCmp('cb_status_poreceipt');
            cb_status_poreceipt.getStore().load(function() {
                cb_status_poreceipt.setValue('3');
            });

            Ext.getCmp('totalPajak_poreceipt').setValue(renderNomor(selectedRecord.get('tax')));
            Ext.getCmp('total_poreceipt').setValue(renderNomor(selectedRecord.get('totalamount')));
            Ext.getCmp('subtotal_poreceipt').setValue(renderNomor(selectedRecord.get('subtotal')));

            Ext.getCmp('memo_poreceipt').setValue('Delivery Order ' + selectedRecord.get('nopurchase'));

            gridInsertBaruGRPO.getStore().load({
                params: {
                    'extraparams': 'a.status:' + 99 //asal aja. buat ngapus grid doang. karena kalo pake removeAll() bikin error
                }
            });
            // EntryGoodsReceiptRM.removeAll();
            // EntryGoodsReceiptRM.sync();

            //insert item to grid
            Ext.Ajax.request({
                url: SITE_URL + 'purchase/get_po_items',
                method: 'GET',
                params: {
                    idpurchase: selectedRecord.get('idpurchase')
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);



                    Ext.each(d.data, function(obj, i) {
                        // console.log(obj);

                        var recDO = new GridReceiptItemPurchaseOrderModel({
                            idpurchaseitem: obj.idpurchaseitem,
                            idinventory: obj.idinventory,
                            sku_no: obj.sku_no,
                            invno: obj.invno,
                            nameinventory: obj.nameinventory,
                            qty: obj.qty,
                            price: obj.price,
                            disc: obj.disc,
                            total: obj.total,
                            ratetax: obj.ratetax,
                            tax: obj.tax,
                            size: obj.size,
                            short_desc: obj.short_desc,
                            size_measurement: obj.size_measurement,
                            warehouse_code: obj.warehouse_code
                        });


                        gridInsertBaruGRPO.getStore().insert(0, recDO);
                    });



                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });

            Ext.getCmp('statusform_poreceipt').setValue('input');
            Ext.getCmp('cb_status_poreceipt').hide();

            Ext.getCmp('received_date_poreceipt').setReadOnly(false);

            Ext.getCmp('btnRecordGR').enable();

            //hapus data
            Ext.getCmp('received_poreceipt').setValue(null);
            Ext.getCmp('receivedid_poreceipt').setValue(null);
            Ext.getCmp('received_date_poreceipt').setValue(null);
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
        header: 'Nama Supplier',
        flex: 1,
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Tgl Permintaan',
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
        header: 'Total Qty Order',
        dataIndex: 'totalorder',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Qty Diterima',
        dataIndex: 'totalreceived',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Qty Sisa',
        dataIndex: 'sisa',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridPurchaseOrderList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseOrderList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseOrderList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchase2.WindowPOList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPOList',
    id: 'WindowPOList',
    title: 'Choose Purchase Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH - 200,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridPurchaseOrderList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});