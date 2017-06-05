var GoodsReceiptGrid = Ext.create(dir_sys + 'purchase2.GoodsReceiptGrid');
var GoodsReceiptReturnGrid = Ext.create(dir_sys + 'purchase2.GoodsReceiptReturnGrid');

Ext.define(dir_sys + 'purchase2.TabGoodsReceipt', {
    extend: 'Ext.tab.Panel',
    id: 'TabGoodsReceipt',
    alias: 'widget.TabGoodsReceipt',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain: true,
    defaults: {
        autoScroll: true
    },
    items: [{
            xtype: 'GoodsReceiptGrid'
        },
        {
            xtype: 'GoodsReceiptReturnGrid'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitInventory();
            }
        }
    }
});