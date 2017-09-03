Ext.create(dir_sys + 'money.EntryReceiveMoney');
Ext.create(dir_sys + 'money.GridReceiveMoney');

Ext.define(dir_sys + 'money.TabReceiveMoney', {
    extend: 'Ext.tab.Panel',
    id: 'TabReceiveMoney',
    alias: 'widget.TabReceiveMoney',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntryReceiveMoney'
        },
        {
            xtype: 'GridReceiveMoney'
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