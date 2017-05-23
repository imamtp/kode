Ext.define('TabJournalTransaction', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.TabJournalTransaction',
//    height: 250,
//    width: 602,
    items: [
        {
            xtype: 'GridJGeneral'
        },
        {
            xtype:'gridJournalTransDisburs'
        }
//        {
//            title: 'Penjadwalan',
//            xtype: 'formRecurringDetail',
//            listeners: {
//                activate: function() {
//                }
//            }
//        }
    ]
});