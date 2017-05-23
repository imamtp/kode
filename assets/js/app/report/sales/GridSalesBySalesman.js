Ext.define('GridSalesBySalesmanModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','no_faktur','nama_customer','crc','subtotal','subtotal_idr'],
    idProperty: 'id'
});

var storeGridSalesBySalesman = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesBySalesmanModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/salesbysalesman/',
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

Ext.define('MY.searchGridSalesBySalesman', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesBySalesman',
    store: storeGridSalesBySalesman,
    width: 180
});

Ext.define('GridSalesBySalesman', {
    title: 'Sales by Salesman',
    itemId: 'GridSalesBySalesmanID',
    id: 'GridSalesBySalesmanID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesBySalesman',
    store: storeGridSalesBySalesman,
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
        header: 'Nama Customer',
        dataIndex: 'nama_customer',
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
        header: 'Sub Total (IDR)',
        dataIndex: 'subtotal_idr',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items:[{
            xtype: 'form',
            id: 'form_filter_salesbysalesman',
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
                        Ext.getCmp('form_filter_salesbysalesman').getForm().reset();
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
                    labelWidth: 60,
                    width: 220,
                },  
                {
                    xtype:'comboxmodelreportsalesbysalesman',
                    labelWidth: 60,
                    width: 220,
                },
                Ext.define('Ext.ux.salesmancode_filter_salesbysalesman', {
                    labelWidth: 60,
                    width: 220,
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.salesmancode_filter_salesbysalesman',
                    name: 'salesmancode',
                    editable: false,
                    id: 'salesmancode_filter_salesbysalesman',
                    fieldLabel: 'Kode Salesman',
                    emptyText: 'Pilih Salesman...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSalesmanCode').setValue('salesmancode_filter_salesbysalesman');
                        wGridSalesmanListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdSalesBySalesman',
                    labelWidth: 60,
                    width: 220,
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndSalesBySalesman',
                    labelWidth: 60,
                    width: 220,
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesBySalesman, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true,
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesBySalesman.load();
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