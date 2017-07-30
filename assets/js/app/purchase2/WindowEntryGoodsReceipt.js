var EntryGoodsReceipt = Ext.create(dir_sys + 'purchase2.EntryGoodsReceipt');

Ext.define(dir_sys + 'purchase2.WindowEntryGoodsReceipt', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryGoodsReceipt',
    id: 'WindowEntryGoodsReceipt',
    title: 'Entry Goods Receipt',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 50,
    // autoHeight:true,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [EntryGoodsReceipt],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryGoodsReceipt').hide();
        }
    }, {
        text: 'Record Goods Receipt',
        id: 'btnRecordGR',
        handler: function() {

            if (validasiPurchaseOrder()) {
                var storeEntryGoodsReceipt = Ext.getCmp('EntryGoodsReceipt').getStore();
                var ItemGRjson = Ext.encode(Ext.pluck(storeEntryGoodsReceipt.data.items, 'data'));

                Ext.Ajax.request({
                    url: SITE_URL + 'purchase/save_goodsreceipt',
                    method: 'POST',
                    params: {
                        itemgrid: ItemGRjson,
                        idaccount_coa_gr: Ext.getCmp('idaccount_coa_gr').getValue(),
                        statusform: Ext.getCmp('statusform_poreceipt').getValue(),
                        nopo: Ext.getCmp('nojurnal_poreceipt').getValue(),
                        idunit: Ext.getCmp('cbUnit_poreceipt').getValue(),
                        notes: Ext.getCmp('notes_poreceipt').getValue(),
                        idpurchase: Ext.getCmp('idpurchase_poreceipt').getValue(),
                        receivedid: Ext.getCmp('receivedid_poreceipt').getValue(),
                        received_date: Ext.getCmp('received_date_poreceipt').getSubmitValue(),
                        no_rujukan_sup: Ext.getCmp('no_rujukan_sup_poreceipt').getValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        Ext.Msg.alert('Info', d.message);

                        Ext.getCmp('WindowEntryGoodsReceipt').hide();
                        Ext.getCmp('GoodsReceiptGridID').getStore().load();

                        Ext.getCmp('WindowReceiptPOList').hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            }

        }
    }, ]
});

function validasiPurchaseOrder() {
    //    alert(Ext.getCmp('comboxcurrencyPurchaseOrder').getValue());   

    if (Ext.getCmp('receivedid_poreceipt').getValue() == '') {
        Ext.Msg.alert('Failed', 'Personil penerima belum ditentukan');

    } else if (Ext.getCmp('received_date_poreceipt').getSubmitValue() == '' || Ext.getCmp('received_date_poreceipt').getSubmitValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan barang');
    } else if (Ext.getCmp('idaccount_coa_gr').getValue() == '' || Ext.getCmp('idaccount_coa_gr').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan akun persediaan penerimaan barang');
    } else {
        return true;
    }
}