var ReportInventory = Ext.create(dir_sys + 'report.ReportInventory');
var ReportInventoryStockCard = Ext.create(dir_sys + 'report.ReportInventoryStockCard');

Ext.define(dir_sys + 'report.ReportInventoryTab', {
    extend: 'Ext.tab.Panel',
    id: 'ReportInventoryTab',
    alias: 'widget.ReportInventoryTab',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'ReportInventory'
    }, {
        xtype: 'ReportInventoryStockCard'
    }],
    listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});