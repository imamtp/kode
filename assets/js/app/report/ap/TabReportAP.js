Ext.define('TabReportAP', {
    extend: 'Ext.tab.Panel',
    id: 'TabReportAP',
    alias: 'widget.TabReportAP',
    activeTab: 0,
    plain: true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'reportAPPurchase'
        },
        {
            xtype: 'reportAPOther'
        },
        {
            xtype: 'reportAPOtherOutstanding'
        },
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