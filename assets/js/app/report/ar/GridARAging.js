Ext.define('GridARAgingModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','jatuh_tempo','no_faktur','crc','first_periode','second_period','third_period','forth_periode','total','remark'],
    idProperty: 'id'
});

var storeGridARAging = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridARAgingModel',
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

Ext.define('MY.searchGridARAging', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridARAging',
    store: storeGridARAging,
    width: 180
});

Ext.define('GridARAging', {
    title: 'AR Aging',
    itemId: 'GridARAgingID',
    id: 'GridARAgingID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridARAging',
    store: storeGridARAging,
    loadMask: true,
    columns: [{
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
        header: 'crc',
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
            id: 'form_filter_araging',
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
                        Ext.getCmp('form_filter_araging').getForm().reset();
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
                Ext.define('Ext.ux.customercode_filter_araging', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_araging',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_araging',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_araging');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdARAging',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndARAging',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
                Ext.define('Ext.ux.salesmancode_filter_araging', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.salesmancode_filter_araging',
                    name: 'salesmancode',
                    editable: false,
                    id: 'salesmancode_filter_araging',
                    fieldLabel: 'Kode Salesman',
                    emptyText: 'Pilih Salesman...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSalesmanCode').setValue('salesmancode_filter_araging');
                        wGridSalesmanListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridARAging, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridARAging.load();
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