Ext.define('GridAPOutstandingDetailModel', {
    extend: 'Ext.data.Model',
    fields: ['no_invoice','tgl_invoice','jatuh_tempo','total_faktur','terbayar','sisa','supplier','remark','inv_supp'],
    idProperty: 'id'
});

var storeGridAPOutstandingDetail = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAPOutstandingDetailModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'laporan/apoutstandingdetail/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'tgl_invoice',
        direction: 'DESC'
    }]
});

Ext.define('MY.searchGridAPOutstandingDetail', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAPOutstandingDetail',
    store: storeGridAPOutstandingDetail,
    width: 180
});

Ext.define('GridAPOutstandingDetail', {
    title: 'AR Outstanding Detail',
    itemId: 'GridAPOutstandingDetailID',
    id: 'GridAPOutstandingDetailID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAPOutstandingDetail',
    store: storeGridAPOutstandingDetail,
    loadMask: true,
    columns: [{
        header: 'No Invoice',
        dataIndex: 'no_invoice',
        minWidth: 150
    }, {
        header: 'Tgl Invoice',
        dataIndex: 'tgl_invoice',
        minWidth: 150
    }, {
        header: 'Jatuh Tempo',
        dataIndex: 'Jatuh Tempo',
        minWidth: 150
    }, {
        header: 'Total Faktur',
        dataIndex: 'total_faktur',
        minWidth: 150
    }, {
        header: 'Terbayar',
        dataIndex: 'terbayar',
        minWidth: 150
    }, {
        header: 'Sisa',
        dataIndex: 'sisa',
        minWidth: 150
    }, {
        header: 'Supplier',
        dataIndex: 'supplier',
        minWidth: 150
    }, {
        header: 'Remark',
        dataIndex: 'remark',
        minWidth: 150
    }, {
        header: 'Invoice Supplier',
        dataIndex: 'inv_supp',
        minWidth: 150
    }, {
        header: 'OSTD Ammount',
        dataIndex: 'ostd_ammount',
        minWidth: 150
    }],
    dockedItems: [{
        type: 'toolbar',
        dock: 'left',
        layout: 'anchor',
        items: [{
            xtype: 'form',
            id: 'form_filter_apoutstaingdetail',
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
                        Ext.getCmp('form_filter_apoutstaingdetail').getForm().reset();
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
                    xtype: 'comboxunit',
                    fieldLabel: 'Lokasi'
                },
                {
                    xtype: 'comboxsupplier_type',
                },
                Ext.define('Ext.ux.suppliercode_filter_apoutstandingdetail', {
                    extend: 'Ext.form.field.Trigger',
                    alias: 'widget.suppliercode_filter_apoutstandingdetail',
                    name: 'suppliercode',
                    editable: false,
                    id: 'suppliercode_filter_apoutstandingdetail',
                    fieldLabel: 'Kode Supplier',
                    emptyText: 'Pilih Supplier...',
                    onTriggerClick: function() {
                        Ext.getCmp('targetIdFilterSupplierCode').setValue('suppliercode_filter_apoutstandingdetail');
                        wGridSupplierListPopup.show();
                        // storeGridSalesOrderDetail.load();
                    }
                }),
                {
                    xtype: 'datefield',
                    id: 'sdAPOutstandingDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    id: 'ndAPOutstandingDetail',
                    format: 'd-M-Y',
                    fieldLabel: 'To',
                },
            ]
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridAPOutstandingDetail, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridAPOutstandingDetail.load();
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