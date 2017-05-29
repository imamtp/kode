var WindowPOList = Ext.create(dir_sys+'purchase2.WindowPOList');
var WindowReceiptPOReturnList = Ext.create(dir_sys+'purchase2.WindowReceiptPOReturnList');


Ext.define('TabPurchaseReturn', {
    extend: 'Ext.tab.Panel',
    id: 'TabPurchaseReturn',
    alias: 'widget.TabPurchaseReturn',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
         {
             xtype:'GridPurchaseOrderList',
             title:'Purchase Order'
         },
         {
             xtype:'GridReceiptReturnPOList',
             title:'Return'
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

Ext.define(dir_sys + 'purchase2.WindowReceiptPOList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReceiptPOList',
    id: 'WindowReceiptPOList',
    title: 'Receipt Purchase Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH-200,
    layout: 'fit',
    border: false,
    items: [
        {
            xtype:'TabPurchaseReturn'
        }
    ]
});