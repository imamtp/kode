Ext.define('TabReportAR', {
    extend: 'Ext.tab.Panel',
    id: 'TabReportAR',
    alias: 'widget.TabReportAR',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridARAging'
        },
        {
            xtype:'GridAROutstanding'
        },
        {
            xtype:'GridARConfirmation'
        },
        {
            xtype:'GridARGiroConfirmation'
        },
        {
            xtype:'GridARCard'
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