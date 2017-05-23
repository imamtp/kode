Ext.define('GridSalesOrderDetailModel', {
    extend: 'Ext.data.Model',
    fields: ['tanggal','no_pesanan','customer','item','item_name','measure','qty_dipesan','value_dipesan','qty_dikirim','value_dipesan','qty_dikirim','value_dikirm','qty_sisa','value_sisa'],
    idProperty: 'id'
});

var storeGridSalesOrderDetail = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderDetailModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/salesorderdetail/',
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

Ext.define('MY.searchGridSalesOrderDetail', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderDetail',
    store: storeGridSalesOrderDetail,
    width: 180
});

Ext.define('GridSalesOrderDetail', {
    title: 'Sales Order Detail',
    itemId: 'GridSalesOrderDetailID',
    id: 'GridSalesOrderDetailID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderDetail',
    store: storeGridSalesOrderDetail,
    loadMask: true,
    columns: [{
        header: 'Tanggal',
        dataIndex: 'tanggal',
        minWidth: 150
    }, {
        header: 'No Pesanan',
        dataIndex: 'no_pesanan',
        minWidth: 150
    }, {
        header: 'Customer',
        dataIndex: 'customer',
        minWidth: 150
    }, {
        header: 'Item',
        dataIndex: 'item',
        minWidth: 150
    }, {
        header: 'Item Name',
        dataIndex: 'item_name', 
        minWidth: 150
    }, {
        header: 'Measure',
        dataIndex: 'measure',
        minWidth: 150
    }, {
        header: 'Qty (Dipesan)',
        dataIndex: 'qty_dipesan',
        minWidth: 150
    }, {
        header: 'Value (Dipesan)',
        dataIndex: 'value_dipesan',
        minWidth: 150
    }, {
        header: 'Qty (Dikirim)',
        dataIndex: 'qty_dikirim',
        minWidth: 150
    }, {
        header: 'Value (Dikirim)',
        dataIndex: 'value_dikirim',
        minWidth: 150
    }, {
        header: 'Qty (Sisa)',
        dataIndex: 'qty_sisa',
        minWidth: 150
    }, {
        header: 'Value (Sisa)',
        dataIndex: 'value_sisa',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        layout: 'anchor',
        dock: 'left',
        items: [{
            xtype: 'form',
            id: 'form_filter_salesorderdetail',
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
                Ext.define('Ext.ux.customercode_filter_salesorderdetail', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_salesorderdetail',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_salesorderdetail',
                    fieldLabel: 'Kode Customer',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        wGridCustomerListPopup.show();
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_salesorderdetail');
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.productcode_filter_salesorderdetail', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_salesorderdetail_salesorderdetail',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_salesorderdetail',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterProductCode').setValue('productcode_filter_salesorderdetail');
                        wGridProductListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdSalesOrderDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'From'
                },  
                {
                    xtype: 'datefield',
                    id: 'ndSalesOrderDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'To'
                }, 
                {
                    xtype: 'comboxmodelreportsalesorderdetail'
                }

            ],
            buttons:[
                {
                    text: 'Reset',
                    handler: function(){
                        Ext.getCmp('form_filter_salesorderdetail').getForm().reset();
                    }
                },
                {
                    text: 'Search',
                    handler: function(){
                    }
                },

            ],
        }],
    }, /*{
        xtype: 'toolbar',
        dock: 'top',
        items:[
        '->', 'Pencarian: ', ' ',
        {
            xtype: 'searchGridSalesOrderDetail',
            text: 'Left Button',
        }]
    },  */{
        xtype: 'pagingtoolbar',
        store: storeGridSalesOrderDetail, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderDetail.load();
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