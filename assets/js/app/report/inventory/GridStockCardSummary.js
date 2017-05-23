Ext.define('GridStockCardSummaryModel', {
    extend: 'Ext.data.Model',
    fields: ['kode_produk','nama_produk','satuan','awal','tfr_in','ret_jual','jual','ret_beli','tfr_out','koreksi','akhir'],
    idProperty: 'id'
});

var storeGridStockCardSummary = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridStockCardSummaryModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/stockcardsummary/',
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

Ext.define('MY.searchGridStockCardSummary', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridStockCardSummary',
    store: storeGridStockCardSummary,
    width: 180
});

Ext.define('GridStockCardSummary', {
    title: 'Stock Card Summary',
    itemId: 'GridStockCardSummaryID',
    id: 'GridStockCardSummaryID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStockCardSummary',
    store: storeGridStockCardSummary,
    loadMask: true,
    columns: [{
        header: 'Kode Produk',
        dataIndex: 'kode_produk',
        minWidth: 150
    }, {
        header: 'Nama Produk',
        dataIndex: 'nama_produk',
        minWidth: 150
    }, {
        header: 'Satuan',
        dataIndex: 'satuan',
        minWidth: 150
    }, {
        header: 'Awal',
        dataIndex: 'awal',
        minWidth: 150
    }, {
        header: 'Beli',
        dataIndex: 'beli',
        minWidth: 150
    }, {
        header: 'TFR-IN',
        dataIndex: 'tfr_in',
        minWidth: 150
    }, {
        header: 'Ret-Jual',
        dataIndex: 'ret_jual',
        minWidth: 150
    }, {
        header: 'Jual',
        dataIndex: 'jual',
        minWidth: 150
    }, {
        header: 'Ret-Beli',
        dataIndex: 'ret_beli',
        minWidth: 150
    }, {
        header: 'TFR-Out',
        dataIndex: 'tfr_out',
        minWidth: 150
    }, {
        header: 'Koreksi',
        dataIndex: 'koreksi',
        minWidth: 150
    }, {
        header: 'Akhir',
        dataIndex: 'akhir',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_stockcardsummary',
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
                        Ext.getCmp('form_filter_stockcardsummary').getForm().reset();
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
                    xtype: 'comboxunit',
                    fieldLabel: 'Lokasi'
                },
                Ext.define('Ext.ux.suppliercode_filter_stockcardsummary', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_stockcardsummary',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_stockcardsummary',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_stockcardsummary');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_stockcardsummary', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_stockcardsummary',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_stockcardsummary',
                    fieldLabel: 'Warehouse',
                    emptyText: 'Warehouse...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('warehousecode_filter_stockcardsummary');
                        wGriWarehouseListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdStockCardSummary',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndStockCardSummary',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        
        xtype: 'pagingtoolbar',
        store: storeGridStockCardSummary, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridStockCardSummary.load();
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