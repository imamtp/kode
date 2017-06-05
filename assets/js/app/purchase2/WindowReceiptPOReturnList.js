// var WindowEntryGoodsReceipt = Ext.create(dir_sys + 'purchase2.WindowEntryGoodsReceipt');
// var WindowViewReturnPO = Ext.create(dir_sys+'purchase2.WindowViewReturnPO');

Ext.define('GridReceiptReturnPOListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'purchase_return_id', 'noreturn', 'idpurchase', 'idaccount_return', 'accname', 'accnumber', 'idtax', 'idunit', 'idsupplier', 'idjournal', 'userin', 'datein', 'return_status', 'date_return', 'nopurchase', 'po_date', 'namesupplier', 'return_amount', 'num_retur_items', 'sum_amount_items'
    ],
    idProperty: 'id'
});

var storeGridReceiptReturnPOList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceiptReturnPOListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseReturn/purchase',
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


storeGridReceiptReturnPOList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
        'option': 'notyetdelivered'
            // 'wherenotinschedule':'true'
    };
});

Ext.define('MY.searchGridReceiptReturnPOList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceiptReturnPOList',
    store: storeGridReceiptReturnPOList,
    width: 180
});
// var smGridReceiptReturnPOList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridReceiptReturnPOList.getSelection().length;
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
var EntryGoodsReceiptRM = Ext.getCmp('EntryGoodsReceipt').getStore();

Ext.define('GridReceiptReturnPOList', {
    itemId: 'GridReceiptReturnPOList',
    id: 'GridReceiptReturnPOList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReceiptReturnPOList',
    store: storeGridReceiptReturnPOList,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                if (!Ext.isDefined(Ext.getCmp('WindowViewReturnPO'))) {
                    Ext.create(dir_sys + 'purchase2.WindowViewReturnPO');
                } else {

                }

                Ext.getCmp('WindowViewReturnPO').show();

                Ext.getCmp('supplier_viewporeturn').getStore().load();
                Ext.getCmp('cb_tax_id_viewporeturn').getStore().load();

                Ext.getCmp('purchase_return_id_viewporeturn').setValue(selectedRecord.get('purchase_return_id'));
                Ext.getCmp('noreturn_viewporeturn').setValue(selectedRecord.get('noreturn'));
                Ext.getCmp('return_date_viewporeturn').setValue(selectedRecord.get('date_return'));

                Ext.getCmp('nopo_viewporeturn').setValue(selectedRecord.get('nopurchase'));
                Ext.getCmp('po_date_viewporeturn').setValue(selectedRecord.get('po_date'));
                Ext.getCmp('cbUnit_viewporeturn').setValue(selectedRecord.get('idunit'));
                Ext.getCmp('cb_tax_id_viewporeturn').setValue(selectedRecord.get('idtax'));
                Ext.getCmp('supplier_viewporeturn').setValue(selectedRecord.get('idsupplier'));
                Ext.getCmp('cb_status_viewporeturn').setValue(selectedRecord.get('return_status') * 1);

                Ext.getCmp('idaccount_coa_viewretur_po').setValue(selectedRecord.get('idaccount_return'));
                Ext.getCmp('accname_coa_viewretur_po').setValue(selectedRecord.get('accname'));
                Ext.getCmp('accnumber_coa_viewretur_po').setValue(selectedRecord.get('accnumber'));

                Ext.getCmp('totalPajak_viewporeturn').setValue(renderNomor(selectedRecord.get('tax')));
                Ext.getCmp('total_viewporeturn').setValue(renderNomor(selectedRecord.get('totalamount')));
                Ext.getCmp('subtotal_viewporeturn').setValue(renderNomor(selectedRecord.get('subtotal')));

                var ViewReturnPO = Ext.getCmp('ViewReturnPO');
                var ViewReturnPOStore = ViewReturnPO.getStore().load();

                ViewReturnPOStore.on('beforeload', function(store, operation, eOpts) {
                    operation.params = {
                        'extraparams': 'a.purchase_return_id:' + selectedRecord.get('purchase_return_id')
                            //    'option':'delivered_po'
                            // 'wherenotinschedule':'true'
                    };
                });
                ViewReturnPOStore.load();

                Ext.getCmp('WindowReceiptPOList').hide();

                Ext.getCmp('btnRecordReceiptReturnPo').show();
                Ext.getCmp('btnUpdateReturnPo').hide();

                Ext.getCmp('ViewReturnPO').columns[12].setVisible(true); //show qty terima
                Ext.getCmp('ViewReturnPO').columns[13].setVisible(true); //show warehouse terima
            }
        }, {
            dataIndex: 'purchase_return_id',
            hidden: true,
            header: 'purchase_return_id'
        }, {
            dataIndex: 'idunit',
            hidden: true,
            header: 'idunit'
        }, {
            dataIndex: 'idjournal',
            hidden: true,
            header: 'idjournal'
        }, {
            header: 'No Return',
            dataIndex: 'noreturn',
            minWidth: 150
        }, {
            header: 'No Purchase',
            dataIndex: 'nopurchase',
            minWidth: 150
        },
        {
            header: 'Supplier Name',
            flex: 1,
            dataIndex: 'namesupplier',
            minWidth: 150
        }, {
            header: 'Date In',
            dataIndex: 'datein',
            minWidth: 150
        }, {
            header: 'Total Item',
            dataIndex: 'num_retur_items',
            minWidth: 80,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Total Amount',
            dataIndex: 'sum_amount_items',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Status',
            dataIndex: 'return_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrPOReturnStatus, value);
            }
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridReceiptReturnPOList',
                    text: 'Left Button'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridReceiptReturnPOList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReceiptReturnPOList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'purchase2.WindowReceiptPOReturnList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReceiptPOReturnList',
    id: 'WindowReceiptPOReturnList',
    title: 'Choose Return Purchase Order',
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
        xtype: 'GridReceiptReturnPOList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});