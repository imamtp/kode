Ext.define('GridAccountModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount','idunit','idaccounttype','accnumber','accname','balance','description','namaunit','acctypename'],
    idProperty: 'id'
});

var storeGridAccount = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAccountModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_account/gridaccount/account',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

// storeGridAccount.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridAcc', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridAcc',
    store: storeGridAccount,
    width: 180
});

var smGridAccount = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPurchase').enable();
        }
    }
});

// Ext.define('GridAccount', {
//     itemId: 'GridAccount',
//     id: 'GridAccount',
//     extend: 'Ext.grid.Panel',
//     alias: 'widget.GridAccount',
//     store: storeGridAccount,
//     loadMask: true,
//     columns: [
//     {
//             text: 'Edit',
//             width: 45,
//             // menuDisabled: true,
//             xtype: 'actioncolumn',
//             tooltip: 'Pilih Akun Ini',
//             align: 'center',
//             icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
//             handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
//                 var formlinkedacc = Ext.getCmp('formlinkedaccUnit');
//                 formlinkedacc.getForm().reset();
//                 wformlinkedaccUnit.show();
//                 formlinkedacc.getForm().load({
//                     url: SITE_URL + 'backend/loadFormData/linkedaccUnit/1/setup',
//                     params: {
//                         extraparams: 'a.idunit:' + record.get('idunit') + ',' + 'a.idaccount:' + record.get('idaccount') + ',' + 'a.idlinked:' + Ext.getCmp('idlinkedSetup').getValue()
//                     },
//                     success: function(form, action) {
//                         // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                     },
//                     failure: function(form, action) {
//                         // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                     }
//                 })
//                 // Ext.getCmp('GridLinkedAcc').setTitle('Hubungkan Akun '+record.data.namelinked+' ke setiap Unit');
//                 // console.log(Ext.getCmp('idlinkedSetup').getValue());           
//                 Ext.getCmp('namaunitAccUnit').setValue(record.get('namaunit'));
//                 Ext.getCmp('idlinkedAccUnit').setValue(Ext.getCmp('idlinkedSetup').getValue());
//                 Ext.getCmp('idunitAccUnit').setValue(record.get('idunit'));
//             }
//         },
//         {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
//         {header: 'idunit', dataIndex: 'idunit', hidden: true},
//         {header: 'No Akun', dataIndex: 'accnumber',},
//         {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
//         {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
//         {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 100},
//         // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
//     ]
//     , dockedItems: [
//         {
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     itemId: 'chooseItemPurchase',
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridAccount')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih aku terlebih dahulu!');
//                         } else {
// //                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
// //                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
// //                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));

//                             //cek dulu apakah assetaccount sudah terdefisinis di inventoryunit
//                             var idunit = Ext.getCmp('cbUnitEntryPurchase').getValue();
//                              Ext.Ajax.request({
//                                 url: SITE_URL + 'purchase/cekAssetAccount',
//                                 method: 'POST',
//                                 params: {
//                                     idinventory: selectedRecord.get('idinventory'),
//                                     idunit: idunit
//                                 },
//                                 success: function(form, action) {

//                                     var d = Ext.decode(form.responseText);
//                                     if (!d.success)
//                                     {
//                                         wFormSelectAssetPurchase.show();
//                                         Ext.getCmp('wFormSelectAssetPurchase').setTitle('Pilih Akun Asset (harta) Untuk Barang '+selectedRecord.get('nameinventory'));
//                                     } else {
//                                        var recPO = new mPurchaseGridStore({
//                                             idinventory: selectedRecord.get('idinventory'),
//                                             invno: selectedRecord.get('invno'),
//                                             nameinventory: selectedRecord.get('nameinventory'),
//                                             price: selectedRecord.get('cost'),
//                                             idunit:idunit,
//                                             assetaccount:selectedRecord.get('assetaccount'),
//                                             qty: 1,
//                                             disc: 0,
//                                             total: selectedRecord.get('cost'),
//                                             ratetax: 0
//                     //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
//                                         });

//                                         var gridPO = Ext.getCmp('EntryPurchase');
//                                         gridPO.getStore().insert(0, recPO);
//                                         updateGridPurchase('general');
                                
//                                        Ext.getCmp('wItemPurchasePopup').hide();
//                                     }

//                                 },
//                                 failure: function(form, action) {
//                                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                                 }
//                             });

                            
//                         }


//                     }
//                 },
//                 '->',
//                 'Pencarian: ', ' ',
//                 {
//                     xtype: 'searchGridAccount',
//                     text: 'Left Button'
//                 }

//             ]
//         }, {
//             xtype: 'pagingtoolbar',
//             store: storeGridAccount, // same store GridPanel is using
//             dock: 'bottom',
//             displayInfo: true
//                     // pageSize:20
//         }
//     ]
// });

// var wAccountPopup = Ext.create('widget.window', {
//     id: 'wAccountPopup',
//     title: 'Pilih Akun',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
// //    autoWidth: true,
//     width: 660,
//     height: 400,
//     layout: 'fit',
//     border: false,
//     items: [{
//             xtype:'GridAccount'
//     }]
// });

function setValueAcc(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('accname'+prefixCmp).setValue(selectedRecord.get('accname'));
    Ext.getCmp('idaccount'+prefixCmp).setValue(selectedRecord.get('idaccount'));
    var accnumberCmp = Ext.getCmp('accnumber'+prefixCmp);
    if(accnumberCmp!=undefined)
    {
        Ext.getCmp('accnumber'+prefixCmp).setValue(selectedRecord.get('accnumber'));
    }

    Ext.getCmp(winCmp).hide();
}