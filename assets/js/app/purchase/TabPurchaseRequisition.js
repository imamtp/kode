Ext.define('TabPurchaseRequisition', {
    extend: 'Ext.tab.Panel',
    id: 'TabPurchaseRequisition',
    alias: 'widget.TabPurchaseRequisition',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntryPurchaseRequisition'
        },
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});