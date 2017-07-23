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
            // xtype: 'GridSalesOrderDetail'
            xtype: 'reportSalesOrderDetail',
        },
        // {
        //     xtype: 'GridSalesOrderHistory'
        // },
        {
            // xtype: 'GridSalesByItem'
            xtype: 'reportSalesOrderByItem'
        },
        {
            // xtype: 'GridSalesByCustomer'
            xtype: 'reportSalesOrderByCustomer'
        },
        {
            xtype: 'GridSalesBySalesman'
        },
        {
            xtype: 'GridSalesReturnDetail'
        },
        {
            xtype: 'GridSalesBook'
        },
        {
            xtype: 'GridDeliveryActual'
        }
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