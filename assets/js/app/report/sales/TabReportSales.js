Ext.define('TabReportSales', {
    extend: 'Ext.tab.Panel',
    id: 'TabReportSales',
    alias: 'widget.TabReportSales',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'reportSalesOrderDetail',
        },
        // {
        //     xtype: 'GridSalesOrderHistory'
        // },
        {
            xtype: 'reportSalesOrderByItem'
        },
        {
            xtype: 'reportSalesOrderByCustomer'
        },
        {
            xtype: 'reportSalesOrderBySalesman'
        },
        // {
        //     xtype: 'GridSalesReturnDetail'
        // },
        // {
        //     xtype: 'GridSalesBook'
        // },
        // {
        //     xtype: 'GridDeliveryActual'
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