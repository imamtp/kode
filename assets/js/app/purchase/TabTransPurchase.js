Ext.define('TabTransPurchase', {
    extend: 'Ext.tab.Panel',
    id: 'TabTransPurchase',
    alias: 'widget.TabTransPurchase',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridPurchaseAll'
        },
        // {
        //     xtype:'GridReturn'
        // },
        {
            xtype:'GridDebt'
        },
        {
            xtype:'GridPaymentHistory'
        }
    ], 
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                disableUnitInventory();
            }
        }
    }
});