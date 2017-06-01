Ext.define('TabInventory', {
    extend: 'Ext.tab.Panel',
    id: 'TabInventory',
    alias: 'widget.TabInventory',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'GridInventoryAll'
        },
        {
            xtype: 'GridInventoryInvGrid',
            hidden: true,
        },
        {
            xtype: 'GridInventoryBuyGrid'
        },
        {
            xtype: 'GridInventorySellGrid'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                disableUnitInventory();
                Ext.getCmp('idsupplier_forminv').getStore().load();
            }
        }
    }
});