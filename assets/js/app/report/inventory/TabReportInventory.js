Ext.define('TabReportInventory', {
    extend: 'Ext.tab.Panel',
    id: 'TabReportInventory',
    alias: 'widget.TabReportInventory',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype:'GridInventoryPerItem'
        },
        {
            xtype:'GridStockCardSummary'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});