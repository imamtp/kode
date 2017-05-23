Ext.define('GridSalesOrderHistoryModel', {
    extend: 'Ext.data.Model',
    fields: ['no_so','tgl_so','kode_item','qty_so','nilai_so','no_do','tgl_do','qty_do','nilai_do','no_si','tgl_si','qty_si','nilai_si'],
    idProperty: 'id'
});

var storeGridSalesOrderHistory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderHistoryModel',
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

Ext.define('MY.searchGridSalesOrderHistory', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderHistory',
    store: storeGridSalesOrderHistory,
    width: 180
});

Ext.define('GridSalesOrderHistory', {
    title: 'Sales Order History',
    itemId: 'GridSalesOrderHistoryID',
    id: 'GridSalesOrderHistoryID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderHistory',
    store: storeGridSalesOrderHistory,
    loadMask: true,
    columns: [{
        header: 'No SO',
        dataIndex: 'no_so',
        minWidth: 150
    }, {
        header: 'Tgl SO',
        dataIndex: 'tgl_so',
        minWidth: 150
    }, {
        header: 'Kode Item',
        dataIndex: 'kode_item',
        minWidth: 150
    }, {
        header: 'Qty SO',
        dataIndex: 'qty_so',
        minWidth: 150
    }, {
        header: 'Nilai SO',
        dataIndex: 'nilai_so', 
        minWidth: 150
    }, {
        header: 'No DO',
        dataIndex: 'no_do',
        minWidth: 150
    }, {
        header: 'Tgl DO',
        dataIndex: 'tgl_do',
        minWidth: 150
    }, {
        header: 'Qty DO',
        dataIndex: 'qty_do',
        minWidth: 150
    }, {
        header: 'Nilai DO',
        dataIndex: 'nilai_do',
        minWidth: 150
    },  {
        header: 'No SI',
        dataIndex: 'no_si',
        minWidth: 150
    }, {
        header: 'Tgl SI',
        dataIndex: 'tgl_si',
        minWidth: 150
    }, {
        header: 'Qty SI',
        dataIndex: 'qty_si',
        minWidth: 150
    }, {
        header: 'Nilai SI',
        dataIndex: 'nilai_si',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_salesorderhistory',
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
                Ext.define('Ext.ux.customercode_filter_salesorderhistory', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_salesorderhistory',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_salesorderhistory',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_salesorderhistory');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdSalesOrderHistory',
                    format: 'd-M-Y',
                    fieldLabel: 'From'
                },  {
                    xtype: 'datefield',
                    id: 'ndSalesOrderHistory',
                    format: 'd-M-Y',
                    fieldLabel: 'To'
                },
                {
                    xtype: 'textfield',
                    id: 'no_soSalesOrderHistory',
                    fieldLabel: 'No Sales Order',
                },
                {
                    xtype: 'textfield',
                    id: 'no_doSalesOrderHistory',
                    fieldLabel: 'No Delivery Order',
                },
                {
                    xtype: 'textfield',
                    id: 'no_siSalesOrderHistory',
                    fieldLabel: 'No Sales Invoice',
                },
            ],
            buttons: [
                {
                    text: 'Reset',
                    handler: function(){
                        Ext.getCmp('form_filter_salesorderhistory').getForm().reset();
                    }
                },
                {
                    text: 'Search',
                    handler: function(){
                    }
                },
            ]
        }]
    }, /*{
        xtype: 'toolbar',
        dock: 'top',
        items:[
            '->', 'Pencarian: ', ' ',
            {
                xtype: 'searchGridSalesOrderHistory',
                text: 'Left Button',
            }
        ]
    },  */{
        xtype: 'pagingtoolbar',
        store: storeGridSalesOrderHistory, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderHistory.load();
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