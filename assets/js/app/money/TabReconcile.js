Ext.create(dir_sys + 'money.wEntryReconcile');
Ext.create(dir_sys + 'money.GridReconcile');

Ext.define(dir_sys + 'money.TabReconcile', {
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