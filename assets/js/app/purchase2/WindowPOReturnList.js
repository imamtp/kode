var WindowEntryPOReturn = Ext.create(dir_sys + 'purchase2.WindowEntryPOReturn');
// var ContainerPurchaseReturn = Ext.create(dir_sys+'purchase2.ContainerPurchaseReturn');

Ext.define('GridReturnPurchaseOrderListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'delivereddate'
    ],
    idProperty: 'id'
});

var storeGridReturnPurchaseOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReturnPurchaseOrderListModel',
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


storeGridReturnPurchaseOrderList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.invoice_status:' + null,
        'option': 'po_not_in_open_return_status'
    };
});

Ext.define('MY.searchGridReturnPurchaseOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReturnPurchaseOrderList',
    store: storeGridReturnPurchaseOrderList,
    width: 180
});
// var smGridReturnPurchaseOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridReturnPurchaseOrderList.getSelection().length;
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

Ext.define('GridReturnPurchaseOrderList', {
    itemId: 'GridReturnPurchaseOrderList',
    id: 'GridReturnPurchaseOrderList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReturnPurchaseOrderList',
    store: storeGridReturnPurchaseOrderList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

            // ContainerPurchaseReturn.show(); return false;

            WindowEntryPOReturn.show();

            // Ext.getCmp('cb_status_poreturn').getStore().load();
            Ext.getCmp('supplier_poreturn').getStore().load();
            Ext.getCmp('cb_tax_id_poreturn').getStore().load();

            Ext.getCmp('WindowPOReturnList').hide();

            Ext.getCmp('idpurchase_poreturn').setValue(selectedRecord.get('idpurchase'));
            Ext.getCmp('nopo_poreturn').setValue(selectedRecord.get('nopurchase'));
            Ext.getCmp('po_date_poreturn').setValue(selectedRecord.get('date'));
            Ext.getCmp('return_date_poreturn').setMinValue(selectedRecord.get('delivereddate'));
            Ext.getCmp('cbUnit_poreturn').setValue(selectedRecord.get('idunit'));
            Ext.getCmp('cb_tax_id_poreturn').setValue(selectedRecord.get('idtax'));
            Ext.getCmp('supplier_poreturn').setValue(selectedRecord.get('idsupplier'));
            Ext.getCmp('cb_status_poreturn').setValue(1); //open returned

            Ext.getCmp('totalPajak_poreturn').setValue(renderNomor(selectedRecord.get('tax')));
            Ext.getCmp('total_poreturn').setValue(renderNomor(selectedRecord.get('totalamount')));
            Ext.getCmp('subtotal_poreturn').setValue(renderNomor(selectedRecord.get('subtotal')));

            Ext.getCmp('cb_status_poreturn').hide();

            var EntryReturnPO = Ext.getCmp('EntryReturnPO').getStore();
            EntryReturnPO.load({
                params: {
                    extraparams: 'a.idpurchaseitem:0'
                }
            });
            // EntryReturnPO.removeAll();
            // EntryReturnPO.sync();

            //insert item to grid
            Ext.Ajax.request({
                url: SITE_URL + 'purchase/get_po_items',
                method: 'GET',
                params: {
                    idpurchase: selectedRecord.get('idpurchase')
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);

                    var grid = Ext.getCmp('EntryReturnPO');

                    Ext.each(d.data, function(obj, i) {
                        // console.log(obj);

                        var recDO = new GridReturnItemPurchaseOrderModel({
                            idpurchaseitem: obj.idpurchaseitem,
                            idinventory: obj.idinventory,
                            sku_no: obj.sku_no,
                            batch: obj.batch,
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


                        grid.getStore().insert(0, recDO);
                    });

                    // var bottombatch = Ext.getCmp('batch_item_panel');
                    // var bottomqty = Ext.getCmp('qtyreturn_item_panel');
                    // bottombatch.toggleCollapse(true);
                    // bottomqty.toggleCollapse(true);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/get_poreturn_pk',
                method: 'GET',
                params: {
                    idunit: selectedRecord.get('idunit')
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.getCmp('purchase_return_id_poreturn').setValue(d.id);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });

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
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
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
                    xtype: 'searchGridReturnPurchaseOrderList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridReturnPurchaseOrderList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReturnPurchaseOrderList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchase2.WindowPOReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowPOReturnList',
    id: 'WindowPOReturnList',
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
        xtype: 'GridReturnPurchaseOrderList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});