Ext.define('GridPurchaseOrderOutstandingDetailModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','no_pesanan','nama_item','supplier','satuan','pesanan','crc','diterima','total','sisa'],
    idProperty: 'id'
});

var storeGridPurchaseOrderOutstandingDetail = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseOrderOutstandingDetailModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/purchaseorderoutstandingdetail/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'tanggal',
        direction: 'DESC'
    }]
});

Ext.define('MY.searchGridPurchaseOrderOutstandingDetail', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseOrderOutstandingDetail',
    store: storeGridPurchaseOrderOutstandingDetail,
    width: 180
});

Ext.define('GridPurchaseOrderOutstandingDetail', {
    title: 'Purchase Order Outstanding | Detail',
    itemId: 'GridPurchaseOrderOutstandingDetailID',
    id: 'GridPurchaseOrderOutstandingDetailID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseOrderOutstandingDetail',
    store: storeGridPurchaseOrderOutstandingDetail,
    loadMask: true,
    columns: [{
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'No Pesanan',
        dataIndex: 'no_pesanan',
        minWidth: 150
    }, {
        header: 'Nama Item',
        dataIndex: 'nama_item',
        minWidth: 150
    }, {
        header: 'Supplier',
        dataIndex: 'supplier',
        minWidth: 150
    }, {
        header: 'Satuan',
        dataIndex: 'satuan',
        minWidth: 150
    }, {
        header: 'Pesanan',
        dataIndex: 'pesanan', 
        minWidth: 150
    }, {
        header: 'CRC',
        dataIndex: 'crc',
        minWidth: 150
    }, {
        header: 'Diterima',
        dataIndex: 'diterima',
        minWidth: 150
    }, {
        header: 'Total',
        dataIndex: 'total',
        minWidth: 150
    }, {
        header: 'Sisa',
        dataIndex: 'sisa',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_podetail',
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
                        Ext.getCmp('form_filter_podetail').getForm().reset();
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
                Ext.define('Ext.ux.suppliercode_filter_salesbook', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_salesbook',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_salesbook',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_salesbook');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdPurchaseOrderOutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndPurchaseOrderOutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
                {
                    xtype:'comboxmodelreportpurchaseorderoutstandingdetail',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPurchaseOrderOutstandingDetail, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseOrderOutstandingDetail.load();
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