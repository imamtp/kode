Ext.define('GridAPOutstandingModel', {
    extend: 'Ext.data.Model',
    fields: ['kode_supplier','nama_supplier','crc','ostd_ammount'],
    idProperty: 'id'
});

var storeGridAPOutstanding = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAPOutstandingModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/apoutstanding/',
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

Ext.define('MY.searchGridAPOutstanding', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAPOutstanding',
    store: storeGridAPOutstanding,
    width: 180
});

Ext.define('GridAPOutstanding', {
    title: 'AR Outstanding',
    itemId: 'GridAPOutstandingID',
    id: 'GridAPOutstandingID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAPOutstanding',
    store: storeGridAPOutstanding,
    loadMask: true,
    columns: [{
        header: 'Kode Supplier',
        dataIndex: 'kode',
        minWidth: 150
    }, {
        header: 'Nama Supplier',
        dataIndex: 'nama_supplier',
        minWidth: 150
    }, {
        header: 'CRC',
        dataIndex: 'crc',
        minWidth: 150
    }, {
        header: 'OSTD Ammount',
        dataIndex: 'ostd_ammount',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_apoutstanding',
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
                        Ext.getCmp('form_filter_apoutstanding').getForm().reset();
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
                Ext.define('Ext.ux.suppliercode_filter_apoutstanding', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_apoutstanding',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_apoutstanding',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_apoutstanding');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdAPOutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndAPOutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        
        xtype: 'pagingtoolbar',
        store: storeGridAPOutstanding, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAPOutstanding.load();
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