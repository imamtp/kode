Ext.define('GridInventoryPerItemModel', {
    extend: 'Ext.data.Model',
    fields: ['supplier','item_code','item_name','unit','qty','cost_per_unit','total'],
    idProperty: 'id'
});

var storeGridInventoryPerItem = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryPerItemModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/inventoryperitem/',
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

Ext.define('MY.searchGridInventoryPerItem', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryPerItem',
    store: storeGridInventoryPerItem,
    width: 180
});

Ext.define('GridInventoryPerItem', {
    title: 'Grid Inventory per Item',
    itemId: 'GridInventoryPerItemID',
    id: 'GridInventoryPerItemID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryPerItem',
    store: storeGridInventoryPerItem,
    loadMask: true,
    columns: [{
        header: 'Supplier',
        dataIndex: 'supplier',
        minWidth: 150
    }, {
        header: 'Kode Item',
        dataIndex: 'item_code',
        minWidth: 150
    }, {
        header: 'Nama Item',
        dataIndex: 'item_name',
        minWidth: 150
    }, {
        header: 'Unit',
        dataIndex: 'unit',
        minWidth: 150
    }, {
        header: 'Qty',
        dataIndex: 'qty',
        minWidth: 150
    }, {
        header: 'Cost/Unit',
        dataIndex: 'cost_per_unit',
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
            id: 'form_filter_inventoryperitem',
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
                        Ext.getCmp('form_filter_inventoryperitem').getForm().reset();
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
                {
                    xtype: 'comboxsupplier_type',
                },
                Ext.define('Ext.ux.productcode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_inventoryperitem',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_inventoryperitem',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('productcode_filter_inventoryperitem');
                        wGriProductListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_inventoryperitem',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_inventoryperitem',
                    fieldLabel: 'Warehouse',
                    emptyText: 'Warehouse...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('warehousecode_filter_inventoryperitem');
                        wGriWarehouseListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.suppliercode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_inventoryperitem',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_inventoryperitem',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_inventoryperitem');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.brandcode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.brandcode_filter_inventoryperitem',
                    name: 'brandcode',
                    editable: false,
                    id: 'brandcode_filter_inventoryperitem',
                    fieldLabel: 'Kode Brand',
                    emptyText: 'Pilih Brand...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterBrandId').setValue('brandcode_filter_inventoryperitem');
                        wGridBrandListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.groupcode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.groupcode_filter_inventoryperitem',
                    name: 'groupcode',
                    editable: false,
                    id: 'groupcode_filter_inventoryperitem',
                    fieldLabel: 'Kode Group',
                    emptyText: 'Pilih Group...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterGroupCode').setValue('groupcode_filter_inventoryperitem');
                        wGridGroupListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.familycode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.familycode_filter_inventoryperitem',
                    name: 'familycode',
                    editable: false,
                    id: 'familycode_filter_inventoryperitem',
                    fieldLabel: 'Kode Family',
                    emptyText: 'Pilih Family...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterFamilyCode').setValue('familycode_filter_inventoryperitem');
                        wGridFamilyListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.stylecode_filter_inventoryperitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.stylecode_filter_inventoryperitem',
                    name: 'stylecode',
                    editable: false,
                    id: 'stylecode_filter_inventoryperitem',
                    fieldLabel: 'Kode Style',
                    emptyText: 'Pilih Style...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterStyleCode').setValue('stylecode_filter_inventoryperitem');
                        wGridStyleListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdInventoryPerItem',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndInventoryPerItem',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        
        xtype: 'pagingtoolbar',
        store: storeGridInventoryPerItem, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryPerItem.load();
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