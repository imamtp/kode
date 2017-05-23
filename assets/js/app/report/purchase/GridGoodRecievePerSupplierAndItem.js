Ext.define('GridGoodRecievePerSupplierAndItemModel', {
    extend: 'Ext.data.Model',
    fields: ['kode_supplier','kode_item','nama_supplier','nama_item','qty_beli','nilai_beli','qty_retur','nilai_retur','qty_total','nilai_total'],
    idProperty: 'id'
});

var storeGridGoodRecievePerSupplierAndItem = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridGoodRecievePerSupplierAndItemModel',
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

Ext.define('MY.searchGridGoodRecievePerSupplierAndItem', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGoodRecievePerSupplierAndItem',
    store: storeGridGoodRecievePerSupplierAndItem,
    width: 180
});

Ext.define('GridGoodRecievePerSupplierAndItem', {
    title: 'Good Recieve per Supplier-Item',
    itemId: 'GridGoodRecievePerSupplierAndItemID',
    id: 'GridGoodRecievePerSupplierAndItemID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGoodRecievePerSupplierAndItem',
    store: storeGridGoodRecievePerSupplierAndItem,
    loadMask: true,
    columns: [{
        header: 'Kode Supplier',
        dataIndex: 'kode_supplier',
        minWidth: 150
    }, {
        header: 'Kode Item',
        dataIndex: 'kode_item',
        minWidth: 150
    }, {
        header: 'Nama Supplier',
        dataIndex: 'nama_supplier',
        minWidth: 150
    }, {
        header: 'Nama Item',
        dataIndex: 'nama_item',
        minWidth: 150
    }, {
        header: 'Qty Beli',
        dataIndex: 'qty_beli',
        minWidth: 150
    }, {
        header: 'Nilai Beli',
        dataIndex: 'nilai_beli',
        minWidth: 150
    }, {
        header: 'Qty Retur',
        dataIndex: 'qty_retur',
        minWidth: 150
    }, {
        header: 'Nilai Retur',
        dataIndex: 'nilai_retur',
        minWidth: 150
    }, {
        header: 'Qty Total',
        dataIndex: 'qty_total',
        minWidth: 150
    }, {
        header: 'Nilai Total',
        dataIndex: 'nilai_total',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_pogoodrecievepersupplieranditem',
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
                        Ext.getCmp('form_filter_pogoodrecievepersupplieranditem').getForm().reset();
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
                Ext.define('Ext.ux.suppliercode_filter_pogoodrecievepersupplieranditem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_pogoodrecievepersupplieranditem',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_pogoodrecievepersupplieranditem',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_pogoodrecievepersupplieranditem');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.productcode_filter_pogoodrecievepersupplieranditem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_pogoodrecievepersupplieranditem',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_pogoodrecievepersupplieranditem',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterProductCode').setValue('productcode_filter_pogoodrecievepersupplieranditem');
                        wGridProductListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_pogoodrecievepersupplieranditem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_pogoodrecievepersupplieranditem',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_pogoodrecievepersupplieranditem',
                    fieldLabel: 'Warehouse',
                    emptyText: 'Pilih Warehouse...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('warehousecode_filter_pogoodrecievepersupplieranditem');
                        wGridWarehouseListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdPOGoodRecievePerSupplierAndItem',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndPOGoodRecievePerSupplierAndItem',
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
        store: storeGridGoodRecievePerSupplierAndItem, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridGoodRecievePerSupplierAndItem.load();
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