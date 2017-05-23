// var viewportporeturn = Ext.create('Ext.Viewport', {
//                     id: 'border-poreturn',
//                     layout: 'border',
//                     items: [
//                         // create instance immediately
//                         Ext.create('Ext.Component', {
//                             region: 'north',
//                             // tbar:menu,
//                             height: 62, // give north and south regions a height
//                             autoEl: {
//                                 tag: 'div',
//                                 html: 'asdsad'
//                             }
//                         }),
//                          {
//                             // lazily created panel (xtype:'panel' is default)
//                             // hidden: true,
//                             id: 'south-panelpo',
//                             region: 'south',
//                             contentEl: 'south',
//                             split: true,
//                             height: 100,
//                             minSize: 100,
//                             maxSize: 200,
//                             collapsible: true,
//                             collapsed: true,
//                             title: 'South',
//                             margins: '0 0 0 0'
//                         }]
//                 });

Ext.define(dir_sys + 'purchase2.ContainerPurchaseReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.ContainerPurchaseReturn',
    id: 'ContainerPurchaseReturn',
    title: 'Entry Purchase Return',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    width: panelW - 50,
    height: sizeH,
    layout: 'border',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 15
    },
    items: [{
            title: 'Batch Item',
            region: 'south',
            hidden:true,
            id:'batch_item_panel',
            height: 150,
            minHeight: 75,
            maxHeight: 250,
            // html: 'Footer content'
            items:[
                {
                    xtype:'GridBatchGoodsReceipt'
                }
            ]
        },{
            title: 'Main Content',
            collapsible: false,
            region: 'center',
            margins: '5 0 0 0',
            html: 'Main Page This is where the main content would go'
        }],
    buttons: [
    {
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            // Ext.getCmp('ContainerPurchaseReturn').hide();
            var bottom = Ext.getCmp('batch_item_panel');
            bottom.show();
            bottom.toggleCollapse(true);
            
        }
    },{
        text: 'Record Purchase Return',
        handler: function() {
            var storeEntryReturnPO = Ext.getCmp('EntryReturnPO').getStore();
            var ItemGRjson = Ext.encode(Ext.pluck(storeEntryReturnPO.data.items, 'data'));

              Ext.Ajax.request({
                    url: SITE_URL + 'purchase/save_return',
                    method: 'POST',
                    params: {
                        itemgrid:ItemGRjson,                        
                        nopo:Ext.getCmp('nojurnal_poreceipt').getValue(),
                        idunit:Ext.getCmp('cbUnit_poreceipt').getValue(),
                        notes:Ext.getCmp('notes_poreceipt').getValue(),
                        idpurchase: Ext.getCmp('idpurchase_poreceipt').getValue(),
                        receivedid: Ext.getCmp('receivedid_poreceipt').getValue(),
                        received_date: Ext.getCmp('received_date_poreceipt').getSubmitValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        Ext.Msg.alert('Info', d.message);

                        Ext.getCmp('ContainerPurchaseReturn').hide();
                        Ext.getCmp('PurchaseReturnGridID').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
        }
    }, ]
});