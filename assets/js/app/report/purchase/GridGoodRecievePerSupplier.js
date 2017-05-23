Ext.define('GridGoodRecievePerSupplierModel', {
    extend: 'Ext.data.Model',
    fields: ['kode_supplier','nama_supplier','nilai_beli','return','total'],
    idProperty: 'id'
});

var storeGridGoodRecievePerSupplier = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridGoodRecievePerSupplierModel',
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

Ext.define('MY.searchGridGoodRecievePerSupplier', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGoodRecievePerSupplier',
    store: storeGridGoodRecievePerSupplier,
    width: 180
});

Ext.define('GridGoodRecievePerSupplier', {
    title: 'Good Recieve per Supplier',
    itemId: 'GridGoodRecievePerSupplierID',
    id: 'GridGoodRecievePerSupplierID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGoodRecievePerSupplier',
    store: storeGridGoodRecievePerSupplier,
    loadMask: true,
    columns: [{
        header: 'Kode Supplier',
        dataIndex: 'kode_supplier',
        minWidth: 150
    }, {
        header: 'Nama Supplier',
        dataIndex: 'nama_supplier',
        minWidth: 150
    }, {
        header: 'Nilai Beli',
        dataIndex: 'nilai_beli',
        minWidth: 150
    }, {
        header: 'Retur',
        dataIndex: 'retur',
        minWidth: 150
    }, {
        header: 'Total',
        dataIndex: 'total',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_pogoodrecievepersupplier',
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
                        Ext.getCmp('form_filter_pogoodrecievepersupplier').getForm().reset();
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
                Ext.define('Ext.ux.suppliercode_filter_pogoodrecievepersupplier', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_pogoodrecievepersupplier',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_pogoodrecievepersupplier',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_pogoodrecievepersupplier');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.productcode_filter_pogoodrecievepersupplier', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_pogoodrecievepersupplier',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_pogoodrecievepersupplier',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterProductCode').setValue('productcode_filter_pogoodrecievepersupplier');
                        wGridProductListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_pogoodrecievepersupplier', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_pogoodrecievepersupplier',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_pogoodrecievepersupplier',
                    fieldLabel: 'Kode Warehouse',
                    emptyText: 'Pilih Warehouse...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('warehousecode_filter_pogoodrecievepersupplier');
                        wGridWarehouseListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdPOGoodRecievePerSupplier',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndPOGoodRecievePerSupplier',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
                {
                    xtype: 'comboxcurrency',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridGoodRecievePerSupplier, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridGoodRecievePerSupplier.load();
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