Ext.create(dir_sys + 'money.GridregPiutang');
Ext.create(dir_sys + 'money.GridHistoryBayarPiutang');

Ext.define(dir_sys + 'money.TabPiutang', {
    extend: 'Ext.tab.Panel',
    id: 'TabPiutang',
    alias: 'widget.TabPiutang',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridregPiutang'
        },
        {
            xtype: 'GridHistoryBayarPiutang'
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