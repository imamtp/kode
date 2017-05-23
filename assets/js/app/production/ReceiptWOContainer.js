Ext.define('ReceiptWOContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.ReceiptWOContainer',
    id: 'ReceiptWOContainer',
    title: 'Finished Goods',
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start',
    },
    items: [
        {
            xtype:'WorkOrderJobTab',
            minHeight:250
        },
        WorkOrderMaterialTab
    ]
});