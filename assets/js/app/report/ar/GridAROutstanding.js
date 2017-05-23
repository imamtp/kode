Ext.define('GridAROutstandingModel', {
    extend: 'Ext.data.Model',
    fields: ['kode','nama_customer','crc','ostd_ammount'],
    idProperty: 'id'
});

var storeGridAROutstanding = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAROutstandingModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/aroutstanding/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'kode',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridAROutstanding', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAROutstanding',
    store: storeGridAROutstanding,
    width: 180
});

Ext.define('GridAROutstanding', {
    title: 'AR Outsanding',
    itemId: 'GridAROutstandingID',
    id: 'GridAROutstandingID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAROutstanding',
    store: storeGridAROutstanding,
    loadMask: true,
    columns: [{
        header: 'Kode',
        dataIndex: 'kode',
        minWidth: 150
    }, {
        header: 'Nama Customer',
        dataIndex: 'nama_customer',
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
            id: 'form_filter_aroutstanding',
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
                        Ext.getCmp('form_filter_aroutstanding').getForm().reset();
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
                Ext.define('Ext.ux.customercode_filter_aroutstanding', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_aroutstanding',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_aroutstanding',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_aroutstanding');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdAROutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndAROutstanding',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridAROutstanding, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAROutstanding.load();
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