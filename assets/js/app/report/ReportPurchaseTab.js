Ext.create(dir_sys + 'report.ReportPurchaseAll');
Ext.create(dir_sys + 'report.ReportPurchaseBySupplier');
Ext.create(dir_sys + 'report.ReportPurchaseOutstanding');
// Ext.create(dir_sys + 'report.PanelPurchaseByItem');


Ext.define(dir_sys + 'report.ReportPurchaseTab', {
    extend: 'Ext.tab.Panel',
    id: 'ReportPurchaseTab',
    alias: 'widget.ReportPurchaseTab',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'ReportPurchaseAll'
        },
        {
            xtype: 'ReportPurchaseBySupplier'
        },
        {
            xtype: 'ReportPurchaseOutstanding'
        }
        // {
        //     xtype: 'PanelPurchaseByItem'
        // }
        // {
        //     xtype:'GridPurchaseRequestList'
        // },
        // {
        //     xtype:'GridPurchaseOrderOutstandingDetail'
        // },
        // {
        //     xtype:'GridPurchaseOrderHistory'
        // },
        // {
        //     xtype:'GridGoodRecievePerSupplier'
        // },
        // {
        //     xtype:'GridGoodRecievePerSupplierAndItem'
        // },
        // {
        //     xtype:'GridGoodRecievePerItem'
        // },
        // {
        //     xtype:'GridGoodRecieveDetail'
        // }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});