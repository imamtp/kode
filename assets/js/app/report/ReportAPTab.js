Ext.create(dir_sys + 'report.reportAPPurchase');
Ext.create(dir_sys + 'report.reportAPOther');
Ext.create(dir_sys + 'report.reportAPOtherOutstanding');

Ext.define(dir_sys + 'report.ReportAPTab', {
    extend: 'Ext.tab.Panel',
    id: 'ReportAPTab',
    alias: 'widget.ReportAPTab',
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