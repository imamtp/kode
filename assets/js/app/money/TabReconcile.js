Ext.define('TabReconcile', {
    extend: 'Ext.tab.Panel',
    id: 'TabReconcile',
    alias: 'widget.TabReconcile',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntryReconcile'
        },
        {
            xtype: 'GridReconcile'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {

            }
        }
    }
});