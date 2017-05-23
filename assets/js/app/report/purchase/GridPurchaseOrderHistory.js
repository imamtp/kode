Ext.define('GridPurchaseOrderHistoryModel', {
    extend: 'Ext.data.Model',
    fields: ['no_po','tgl_po','kode_item','qty_po','nilai_po','gr_po','tgl_gr','qty_gr','nilai_gr','no_pi','tgl_pi','qty_pi','nilai_pi'],
    idProperty: 'id'
});

var storeGridPurchaseOrderHistory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseOrderHistoryModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/purchaseorderhistory/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'no_po',
        direction: 'DESC'
    }]
});

Ext.define('MY.searchGridPurchaseOrderHistory', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseOrderHistory',
    store: storeGridPurchaseOrderHistory,
    width: 180
});

Ext.define('GridPurchaseOrderHistory', {
    title: 'Purchase History',
    itemId: 'GridPurchaseOrderHistoryID',
    id: 'GridPurchaseOrderHistoryID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseOrderHistory',
    store: storeGridPurchaseOrderHistory,
    loadMask: true,
    columns: [{
        header: 'No PO',
        dataIndex: 'no_po',
        minWidth: 150
    }, {
        header: 'Tgl PO',
        dataIndex: 'tgl_po',
        minWidth: 150
    }, {
        header: 'Kode Item',
        dataIndex: 'kode_item',
        minWidth: 150
    }, {
        header: 'Qty PO',
        dataIndex: 'qty_po',
        minWidth: 150
    }, {
        header: 'Nilai PO',
        dataIndex: 'nilai_po',
        minWidth: 150
    }, {
        header: 'No GR',
        dataIndex: 'no_gr', 
        minWidth: 150
    }, {
        header: 'Tgl GR',
        dataIndex: 'tgl_gr',
        minWidth: 150
    }, {
        header: 'Qty GR',
        dataIndex: 'qty_gr',
        minWidth: 150
    }, {
        header: 'Nilai GR',
        dataIndex: 'nilai_gr',
        minWidth: 150
    }, {
        header: 'No PI',
        dataIndex: 'no_pi',
        minWidth: 150
    }, {
        header: 'Tgl PI',
        dataIndex: 'tgl_pi',
        minWidth: 150
    }, {
        header: 'Qty PI',
        dataIndex: 'qty_pi',
        minWidth: 150
    }, {
        header: 'Nilai PI',
        dataIndex: 'nilai_pi',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_pohistory',
            collapsible: true,
            title: 'Filter',
            bodyPadding: '5 5 0',
            anchor: 'none 100%',           
            width: 220,
            autoScroll: true,
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side',
                width: 180,
            },
            buttons:[
                {
                    text: 'Reset',
                    handler: function(){
                        Ext.getCmp('form_filter_pohistory').getForm().reset();
                    }
                },
                {
                    text: 'Search',
                    handler: function(){
                    }
                },
            ],
            items: [
                {
                    xtype:'comboxunit',
                    fieldLabel: 'Lokasi'
                },
                {
                    xtype:'comboxsupplier_type',
                },
                Ext.define('Ext.ux.suppliercode_filter_purchaseorderhistory', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_purchaseorderhistory',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_purchaseorderhistory',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_purchaseorderhistory');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'textfield',
                    id: 'no_poPurchaseOrderHistory',
                    fieldLabel: 'No. Purchase Order',
                },
                {
                    xtype: 'textfield',
                    id: 'no_grPurchaseOrderHistory',
                    fieldLabel: 'No. Good Receipt',
                },
                {
                    xtype: 'textfield',
                    id: 'no_piPurchaseOrderHistory',
                    fieldLabel: 'No. Purchase Invoice',
                },
                {
                    xtype: 'datefield',
                    id: 'sdPurchaseOrderHistory',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndPurchaseOrderHistory',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPurchaseOrderHistory, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseOrderHistory.load();
            }
        },
        // itemdblclick: function(dv, record, item, index, e) {
        //     // var formAgama = Ext.create('formAgama');
        //     var formSalesOrderDetail = Ext.getCmp('formSalesOrderDetail');
        //     wSalesOrderDetail.show();
        //     formSalesOrderDetail.getForm().load({
        //         url: SITE_URL + 'backend/loadFormData/SalesOrderDetail/1/master',
        //         params: {
        //             extraparams: 'a.supplier_type_id:' + record.data.supplier_type_id
        //         },
        //         success: function(form, action) {
        //             // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //         },
        //         failure: function(form, action) {
        //             Ext.Msg.alert("Load failed", action.result.errorMessage);
        //         }
        //     })
        //     //            
        //     //            Ext.getCmp('kddaerahS').setReadOnly(true);
        //     Ext.getCmp('statusformSalesOrderDetail').setValue('edit');

        //     Ext.getCmp('TabSupplier').setActiveTab(0);
        // }
    }
});