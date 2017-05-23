Ext.define('GridARCardModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','customer_code','nama_customer','jenis_transaksi','no_transaksi','saldo_awal','bertambah','berkurang','saldo_akhir'],
    idProperty: 'id'
});

var storeGridARCard = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridARCardModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/arcard/',
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

Ext.define('MY.searchRemark', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchRemark',
    store: storeGridARCard,
    width: 180
});

Ext.define('GridARCard', {
    title: 'AR Card',
    itemId: 'GridARCardID',
    id: 'GridARCardID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridARCard',
    store: storeGridARCard,
    loadMask: true,
    columns: [{
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'Kode Customer',
        dataIndex: 'customer_code',
        minWidth: 150
    }, {
        header: 'Nama Customer',
        dataIndex: 'nama_customer',
        minWidth: 150
    }, {
        header: 'No Transaksi',
        dataIndex: 'no_transaksi',
        minWidth: 150
    }, {
        header: 'Saldo Awal',
        dataIndex: 'saldo_awal',
        minWidth: 150
    }, {
        header: 'Bertambah (+)',
        dataIndex: 'bertambah',
        minWidth: 150
    }, {
        header: 'Berkurang (-)',
        dataIndex: 'berkurang',
        minWidth: 150
    }, {
        header: 'Sisa',
        dataIndex: 'sisa',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_arcard',
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
                        Ext.getCmp('form_filter_arcard').getForm().reset();
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
                Ext.define('Ext.ux.customercode_filter_arcard', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_arcard',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_arcard',
                    fieldLabel: 'Kode Cust.',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_arcard');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdARCard',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndARCard',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
                {
                    xtype: 'textfield',
                    id: 'remarkARCard',
                    fieldLabel: 'Remark',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridARCard, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridARCard.load();
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