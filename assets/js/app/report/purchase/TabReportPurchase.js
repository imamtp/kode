Ext.create(dir_sys + 'report.purchase.PanelPurchaseAll');
Ext.create(dir_sys + 'report.purchase.PanelPurchaseBySupplier');
Ext.create(dir_sys + 'report.purchase.PanelPurchaseOutstanding');
Ext.create(dir_sys + 'report.purchase.PanelPurchaseByItem');


Ext.define('TabReportPurchase', {
    extend: 'Ext.tab.Panel',
    id: 'TabReportPurchase',
    alias: 'widget.TabReportPurchase',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'PanelPurchaseAll'
        },
        {
            xtype: 'PanelPurchaseBySupplier'
        },
        {
            xtype: 'PanelPurchaseOutstanding'
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
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});