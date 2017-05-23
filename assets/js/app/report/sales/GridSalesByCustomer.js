Ext.define('GridSalesByCustomerModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','no_faktur','salesman','crc','subtotal','discount','netto','ppn','total_sales','payment','ostd_ammount'],
    idProperty: 'id'
});

var storeGridSalesByCustomer = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesByCustomerModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/salesbycustomer/',
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

Ext.define('MY.searchGridSalesByCustomer', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesByCustomer',
    store: storeGridSalesByCustomer,
    width: 180
});

Ext.define('GridSalesByCustomer', {
    title: 'Sales by Customer',
    itemId: 'GridSalesByCustomerID',
    id: 'GridSalesByCustomerID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesByCustomer',
    store: storeGridSalesByCustomer,
    loadMask: true,
    columns: [{
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'No Faktur',
        dataIndex: 'no_faktur',
        minWidth: 150
    }, {
        header: 'Salesman',
        dataIndex: 'salesman',
        minWidth: 150
    }, {
        header: 'CRC',
        dataIndex: 'crc',
        minWidth: 150
    }, {
        header: 'Sub Total',
        dataIndex: 'sub_total', 
        minWidth: 150
    }, {
        header: 'Discount',
        dataIndex: 'discount',
        minWidth: 150
    }, {
        header: 'Netto',
        dataIndex: 'netto',
        minWidth: 150
    }, {
        header: 'PPN',
        dataIndex: 'ppn',
        minWidth: 150
    }, {
        header: 'Payment',
        dataIndex: 'payment',
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
        items:[{
            xtype: 'form',
            id: 'form_filter_salesbycustomer',
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
                        Ext.getCmp('form_filter_salesbycustomer').getForm().reset();
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
                },  
                {
                    xtype:'comboxmodelreportsalesbycustomer',
                },
                Ext.define('Ext.ux.customercode_filter_salesbycustomer', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_salesbycustomer',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_salesbycustomer',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_salesbycustomer');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdSalesByCustomer',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndSalesByCustomer',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ],
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesByCustomer, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesByCustomer.load();
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