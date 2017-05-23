Ext.define('GridAPAgingModel', {
    extend: 'Ext.data.Model',
    fields: ['supplier','tanggal','jatuh_tempo','no_faktur','crc','first_periode','second_period','third_period','forth_periode','total','remark'],
    idProperty: 'id'
});

var storeGridAPAging = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAPAgingModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/araging/',
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

Ext.define('MY.searchGridAPAging', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAPAging',
    store: storeGridAPAging,
    width: 180
});

Ext.define('GridAPAging', {
    title: 'AP Aging',
    itemId: 'GridAPAgingID',
    id: 'GridAPAgingID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAPAging',
    store: storeGridAPAging,
    loadMask: true,
    columns: [{
        header: 'Supplier',
        dataIndex: 'supplier',
        minWidth: 150
    }, {
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'Jatuh Tempo',
        dataIndex: 'jatuh_tempo',
        minWidth: 150
    }, {
        header: 'No Faktur',
        dataIndex: 'no_faktur',
        minWidth: 150
    }, {
        header: 'CRC',
        dataIndex: 'crc',
        minWidth: 150
    }, {
        header: '0-30 Hari',
        dataIndex: 'first_periode',
        minWidth: 150
    }, {
        header: '>30 - 60 Hari',
        dataIndex: 'second_period', 
        minWidth: 150
    }, {
        header: '>60 - 90 Hari',
        dataIndex: 'third_period',
        minWidth: 150
    }, {
        header: '> 90 Hari',
        dataIndex: 'forth_periode',
        minWidth: 150
    }, {
        header: 'Total',
        dataIndex: 'total',
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
            id: 'form_filter_apaging',
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
                        Ext.getCmp('form_filter_apaging').getForm().reset();
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
                Ext.define('Ext.ux.suppliercode_filter_apaging', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_apaging',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_apaging',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_apaging');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdAPAging',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndAPAging',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridAPAging, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAPAging.load();
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