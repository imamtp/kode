Ext.define('GridPruchaseRequestListModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','jatuh_tempo','no_faktur','crc','first_periode','second_period','third_period','forth_periode','total','remark'],
    idProperty: 'id'
});

var storeGridPruchaseRequestList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPruchaseRequestListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/purchaserequestlist/',
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

Ext.define('MY.searchGridPruchaseRequestList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPruchaseRequestList',
    store: storeGridPruchaseRequestList,
    width: 180
});

Ext.define('GridPurchaseRequestList', {
    title: 'Purchase Request List',
    itemId: 'GridPruchaseRequestListID',
    id: 'GridPruchaseRequestListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPruchaseRequestList',
    store: storeGridPruchaseRequestList,
    loadMask: true,
    columns: [/*{
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
    }, {
        header: 'OSTD Ammount',
        dataIndex: 'ostd_ammount',
        minWidth: 150
    }*/],
    dockedItems: [/*{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype:'comboxproductcode',
            // width: 200, 
        },  {
            xtype:'comboxcustomercode',
            // width: 200, 
        },  {
            xtype:'comboxmodelreportsalesorderdetail'
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items:[{
            xtype: 'datefield',
            id: 'sdSalesOrderDetail',
            // labelWidth: 50,
            labelAlign: 'Ritgh',
            // width:200,
            format: 'd-M-Y',
            fieldLabel: 'From'
        },  {
            xtype: 'datefield',
            id: 'ndSalesOrderDetail',
            // labelWidth: 50,
            labelAlign: 'Ritgh',
            // width:200,
            format: 'd-M-Y',
            fieldLabel: 'To'
        }, '->', 'Pencarian: ', ' ',
        {
            xtype: 'searchGridPruchaseRequestList',
            text: 'Left Button'
        }]
    },*/  {
        xtype: 'pagingtoolbar',
        store: storeGridPruchaseRequestList, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPruchaseRequestList.load();
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