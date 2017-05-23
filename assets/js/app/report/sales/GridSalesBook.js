Ext.define('GridSalesBookModel', {
    extend: 'Ext.data.Model',
    fields: ['item_code','item_name','unit','diterima','dipesan','price','disc','sub_total','ppn'],
    idProperty: 'id'
});

var storeGridSalesBook = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesBookModel',
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

Ext.define('MY.searchGridSalesBook', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesBook',
    store: storeGridSalesBook,
    width: 180
});

Ext.define('GridSalesBook', {
    title: 'Sales Book',
    itemId: 'GridSalesBookID',
    id: 'GridSalesBookID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesBook',
    store: storeGridSalesBook,
    loadMask: true,
    columns: [{
        header: 'Item Code',
        dataIndex: 'item_code',
        minWidth: 150
    }, {
        header: 'Item Name',
        dataIndex: 'item_name',
        minWidth: 150
    }, {
        header: 'Unit',
        dataIndex: 'unit',
        minWidth: 150
    }, {
        header: 'diretur',
        dataIndex: 'diretur',
        minWidth: 150
    }, {
        header: 'Dipesan',
        dataIndex: 'dipesan', 
        minWidth: 150
    }, {
        header: 'Price',
        dataIndex: 'price',
        minWidth: 150
    }, {
        header: 'Disc',
        dataIndex: 'disc',
        minWidth: 150
    }, {
        header: 'Sub Total',
        dataIndex: 'sub_total',
        minWidth: 150
    }, {
        header: 'PPN',
        dataIndex: 'ppn',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_salesbook',
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
                        Ext.getCmp('form_filter_salesbook').getForm().reset();
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
                {
                    xtype:'comboxmodelreportsalesbook',
                },
                {
                    xtype: 'datefield',
                    id: 'sdSalesBook',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndSalesBook',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
                Ext.define('Ext.ux.customercode_filter_salesbook', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.customercode_filter_salesbook',
                    name: 'customercode',
                    editable: false,
                    id: 'customercode_filter_salesbook',
                    fieldLabel: 'Kode Customer',
                    emptyText: 'Pilih Customer...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterCustomerCode').setValue('customercode_filter_salesbook');
                        wGridCustomerListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.salesmancode_filter_salesbook', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.salesmancode_filter_salesbook',
                    name: 'salesmancode',
                    editable: false,
                    id: 'salesmancode_filter_salesbook',
                    fieldLabel: 'Kode Salesman',
                    emptyText: 'Pilih Salesman...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSalesmanCode').setValue('salesmancode_filter_salesbook');
                        wGridSalesmanListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.productcode_filter_salesbook', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.productcode_filter_salesbook',
                    name: 'productcode',
                    editable: false,
                    id: 'productcode_filter_salesbook',
                    fieldLabel: 'Kode Produk',
                    emptyText: 'Pilih Produk...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterProductCode').setValue('productcode_filter_salesbook');
                        wGridProductListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                Ext.define('Ext.ux.warehousecode_filter_salesbook', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.warehousecode_filter_salesbook',
                    name: 'warehousecode',
                    editable: false,
                    id: 'warehousecode_filter_salesbook',
                    fieldLabel: 'Warehouse',
                    emptyText: 'Pilih Warehouse...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterWarehouseCode').setValue('warehousecode_filter_salesbook');
                        wGridWarehouseListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesBook, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesBook.load();
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