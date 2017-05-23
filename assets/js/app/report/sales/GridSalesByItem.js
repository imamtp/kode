Ext.define('GridSalesByItemModel', {
    extend: 'Ext.data.Model',
    fields: ['item_code','item_name','unit','qty','cost','sales','margin','gm'],
    idProperty: 'id'
});

var storeGridSalesByItem = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesByItemModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/salesbyitem/',
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

Ext.define('MY.searchGridSalesByItem', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesByItem',
    store: storeGridSalesByItem,
    width: 180
});

Ext.define('GridSalesByItem', {
    title: 'Sales by Item',
    itemId: 'GridSalesByItemID',
    id: 'GridSalesByItemID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesByItem',
    store: storeGridSalesByItem,
    loadMask: true,
    columns: [{
        header: 'Item Code',
        dataIndex: 'item_code',
        minWidth: 150
    }, {
        header: 'Item Name',
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
        header: 'Cost',
        dataIndex: 'cost', 
        minWidth: 150
    }, {
        header: 'Sales',
        dataIndex: 'sales',
        minWidth: 150
    }, {
        header: 'Margin',
        dataIndex: 'margin',
        minWidth: 150
    }, {
        header: 'GM(%)',
        dataIndex: 'gm',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_salesbyitem',
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
            items:[
                {
                    xtype:'comboxunit',
                    fieldLabel: 'Lokasi',
                },
                Ext.define('Ext.ux.productcode_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_salesbyitem',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_salesbyitem',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        wGridProductListPopup.show();
                        Ext.getCmp('targetIdFilterProductCode').setValue('productcode_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_salesbyitem',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_salesbyitem',
                    fieldLabel: 'Kode Warehouse',
                    emptyText: 'Pilih Warehouse...',
                    onTriggerClick: function() {
                        wGridWarehouseListPopup.show();
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('warehousecode_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdSalesByItem',
                    format: 'd-M-Y',
                    fieldLabel: 'From'
                },  
                {
                    xtype: 'datefield',
                    id: 'ndSalesByItem',
                    format: 'd-M-Y',
                    fieldLabel: 'To'
                },
                Ext.define('Ext.ux.brandid_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.brandid_filter_salesbyitem',
                    name: 'brandid',
                    editable: false,
                    id: 'brandid_filter_salesbyitem',
                    fieldLabel: 'Kode Brand',
                    emptyText: 'Pilih Brand...',
                    onTriggerClick: function() {
                        wGridBrandListPopup.show();
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('brandid_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
                Ext.define('Ext.ux.groupcode_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.groupcode_filter_salesbyitem',
                    name: 'groupcode',
                    editable: false,
                    id: 'groupcode_filter_salesbyitem',
                    fieldLabel: 'Kode Group',
                    emptyText: 'Pilih Group...',
                    onTriggerClick: function() {
                        wGridGroupListPopup.show();
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('groupcode_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
                Ext.define('Ext.ux.familycode_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.familycode_filter_salesbyitem',
                    name: 'familycode',
                    editable: false,
                    id: 'familycode_filter_salesbyitem',
                    fieldLabel: 'Kode Family.',
                    emptyText: 'Pilih Family...',
                    onTriggerClick: function() {
                        wGridFamilyListPopup.show();
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('familycode_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
                Ext.define('Ext.ux.stylecode_filter_salesbyitem', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.stylecode_filter_salesbyitem',
                    name: 'stylecode',
                    editable: false,
                    id: 'stylecode_filter_salesbyitem',
                    fieldLabel: 'Kode Style.',
                    emptyText: 'Pilih Style...',
                    onTriggerClick: function() {
                        wGridStyleListPopup.show();
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('stylecode_filter_salesbyitem');
                        // storeGridSalesByItem.load();
                    }
                }),
            ],
            buttons:[
                {
                    text: 'Reset',
                    handler: function(){
                        Ext.getCmp('form_filter_salesbyitem').getForm().reset();
                    }
                },
                {
                    text: 'Search',
                    handler: function(){
                    }
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesByItem, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesByItem.load();
            }
        },
        // itemdblclick: function(dv, record, item, index, e) {
        //     // var formAgama = Ext.create('formAgama');
        //     var formSalesByItem = Ext.getCmp('formSalesByItem');
        //     wSalesByItem.show();
        //     formSalesByItem.getForm().load({
        //         url: SITE_URL + 'backend/loadFormData/SalesByItem/1/master',
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
        //     Ext.getCmp('statusformSalesByItem').setValue('edit');

        //     Ext.getCmp('TabSupplier').setActiveTab(0);
        // }
    }
});