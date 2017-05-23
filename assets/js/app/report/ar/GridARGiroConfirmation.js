Ext.define('GridARGiroConfirmationModel', {
    extend: 'Ext.data.Model',
    fields: ['no_doc','no_giro','tgl_doc','jatuh_tempo','giro_ditangan','giro_disetor'],
    idProperty: 'id'
});

var storeGridARGiroConfirmation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridARGiroConfirmationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/argiroconfirmation/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'no_doc',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridARGiroConfirmation', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridARGiroConfirmation',
    store: storeGridARGiroConfirmation,
    width: 180
});

Ext.define('GridARGiroConfirmation', {
    title: 'AR Giro Recapitulation',
    itemId: 'GridARGiroConfirmationID',
    id: 'GridARGiroConfirmationID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridARGiroConfirmation',
    store: storeGridARGiroConfirmation,
    loadMask: true,
    columns: [{
        header: 'No Doc',
        dataIndex: 'no_doc',
        minWidth: 150
    }, {
        header: 'No Giro',
        dataIndex: 'no_giro',
        minWidth: 150
    }, {
        header: 'Tgl Doc',
        dataIndex: 'tgl_doc',
        minWidth: 150
    }, {
        header: 'Jatuh Tempo',
        dataIndex: 'jatuh_tempo',
        minWidth: 150
    }, {
        header: 'Giro Ditangan',
        dataIndex: 'giro_ditangan',
        minWidth: 150
    }, {
        header: 'Giro Disetor',
        dataIndex: 'giro_disetor',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_argiroconfirmation',
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
                        Ext.getCmp('form_filter_argiroconfirmation').getForm().reset();
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
                Ext.define('Ext.ux.customercode_filter_argiroconfirmation', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_argiroconfirmation',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_argiroconfirmation',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_argiroconfirmation');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridARGiroConfirmation, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridARGiroConfirmation.load();
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