Ext.define('GridGoodRecieveDetailModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','no_faktur','supplier','item_code','item_name','measure','qty','price','disc','netto','total_tax','grand_total','warehouse','remark'],
    idProperty: 'id'
});

var storeGridGoodRecieveDetail = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridGoodRecieveDetailModel',
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
        property: 'nama_supplier',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridGoodRecieveDetail', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGoodRecieveDetail',
    store: storeGridGoodRecieveDetail,
    width: 180
});

Ext.define('GridGoodRecieveDetail', {
    title: 'Good Recieve Detail',
    itemId: 'GridGoodRecieveDetailID',
    id: 'GridGoodRecieveDetailID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGoodRecieveDetail',
    store: storeGridGoodRecieveDetail,
    loadMask: true,
    columns: [{
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'No Faktur',
        dataIndex: 'no_faktur',
        minWidth: 150
    }, {
        header: 'Supplier',
        dataIndex: 'supplier',
        minWidth: 150
    }, {
        header: 'Item',
        dataIndex: 'item_code',
        minWidth: 150
    }, {
        header: 'Item Name',
        dataIndex: 'item_name',
        minWidth: 150
    }, {
        header: 'Measure',
        dataIndex: 'measure',
        minWidth: 150
    }, {
        header: 'Qty',
        dataIndex: 'qty',
        minWidth: 150
    }, {
        header: 'Price',
        dataIndex: 'price',
        minWidth: 150
    }, {
        header: 'Disc(%)',
        dataIndex: 'disc',
        minWidth: 150
    }, {
        header: 'Netto',
        dataIndex: 'netto',
        minWidth: 150
    }, {
        header: 'Total',
        dataIndex: 'total',
        minWidth: 150
    }, {
        header: 'Grand Total',
        dataIndex: 'grand_total',
        minWidth: 150
    }, {
        header: 'Remark',
        dataIndex: 'remark',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_pogoodrecievedetail',
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
                        Ext.getCmp('form_filter_pogoodrecievedetail').getForm().reset();
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
                    fieldLabel: 'Lokasi',
                },
                {
                    xtype:'comboxsupplier_type',
                },
                Ext.define('Ext.ux.suppliercode_filter_pogoodrecievedetail', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_pogoodrecievedetail',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_pogoodrecievedetail',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_pogoodrecievedetail');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype:'comboxcurrency',
                },
                {
                    xtype: 'datefield',
                    id: 'sdPOGoodRecieveDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndPOGoodRecieveDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridGoodRecieveDetail, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridGoodRecieveDetail.load();
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