var WindowGridRequestByPRPopup = Ext.create(dir_sys + 'purchase2.WindowGridRequestByPRPopup');
// var GridItemSelectPurchaseRequisitionID_popup = Ext.getCmp('GridItemSelectPurchaseRequisitionID').getStore();

Ext.define('GridItemPurchaseRequisitionModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchaseitem','idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','price','qty','total','ratetax','disc','short_desc'],
    idProperty: 'id'
});

var storeGridItemPurchaseRequisition = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseRequisitionModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchaseRequisition/purchase',
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

//end store head

//start item selector

Ext.define('GridItemSelectPurchaseRequisitionModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','short_desc','totalstock','stock_kedua','satuan_pertama','satuan_kedua', 'lebar','ketebalan'],
    idProperty: 'id'
});

var storeGridItemSelectPurchaseRequisition = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSelectPurchaseRequisitionModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryall/inventory',
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

// storeGridItemSelectPurchaseRequisition.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridItemSelectPurchaseRequisition', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSelectPurchaseRequisition',
    store: storeGridItemSelectPurchaseRequisition,
    width: 180
});

var smGridItemSelectPurchaseRequisition = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSelectPurchaseRequisition.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSelectPurchaseRequisition').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSelectPurchaseRequisition').enable();
        }
    }
});

Ext.define('GridItemSelectPurchaseRequisition', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemSelectPurchaseRequisition,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemSelectPurchaseRequisitionID',
    id: 'GridItemSelectPurchaseRequisitionID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSelectPurchaseRequisition',
    store: storeGridItemSelectPurchaseRequisition,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},        
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex:1},
        {
            header: 'Total Stock',
            dataIndex: 'totalstock',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'satuan_pertama',
            minWidth: 100
        },
        // {
        //     header: 'Stock #2',
        //     dataIndex: 'stock_kedua',
        //     minWidth: 70,
        //     xtype: 'numbercolumn',
        //     align: 'right'
        // },
        // {
        //     header: 'Satuan #2',
        //     dataIndex: 'satuan_kedua',
        //     minWidth: 100
        // },
        {header: 'Lebar', dataIndex: 'lebar', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Tebal', dataIndex: 'ketebalan', minWidth: 130,xtype:'numbercolumn',align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemSelectPurchaseRequisition',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemSelectPurchaseRequisition')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
// console.log(selectedRecord)
                              var recSQ = new GridItemPurchaseRequisitionModel({
                                    idinventory: selectedRecord.get('idinventory'),
                                    invno: selectedRecord.get('invno'),
                                    nameinventory: selectedRecord.get('nameinventory'),
                                    price: selectedRecord.get('cost')*1,
                                    idunit:idunit,
                                    assetaccount:selectedRecord.get('assetaccount'),
                                    qty: 1,
                                    disc: 0,
                                    total: selectedRecord.get('cost')*1,
                                    short_desc: selectedRecord.get('short_desc'),
                                    ratetax: Ext.getCmp('cb_tax_id_pr').getValue()
            //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                                });

                                var gridSQ = Ext.getCmp('EntryPurchaseRequisition');
                                gridSQ.getStore().insert(0, recSQ);
                                updateGridPurchaseRequisition();
                        
                               Ext.getCmp('wItemSelectPurchaseRequisitionPopup').hide();

                            
                        }


                    }
                },'-',
                {
                    text: 'Tambah Barang',
                    hidden:true,
                    iconCls: 'add-icon',
                    handler: function() {
                        showInputInv();     
                        Ext.getCmp('fieldsetInvBuy').setDisabled(true);
                        Ext.getCmp('fieldsetInvSell').setDisabled(true);                   
                        Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
                        storeGridAccInv.removeAll();
                        storeGridAccInv.sync();

                        Ext.getCmp('cbpersediaan').setDisabled(true);
                        Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                        Ext.getCmp('fieldsetInvPersediaan').hide();
                        Ext.getCmp('datebuy').hide();                        
                        Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(true);
                        Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(true);

                        Ext.getCmp('inputdaripurchase').setValue('true');
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemSelectPurchaseRequisition',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemSelectPurchaseRequisition, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemSelectPurchaseRequisition.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemSelectPurchaseRequisition = Ext.getCmp('formItemSelectPurchaseRequisition');
//            wItemSelectPurchaseRequisition.show();
//
//            formItemSelectPurchaseRequisition.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemSelectPurchaseRequisition/1/setup',
//                params: {
//                    extraparams: 'a.idtax:' + record.data.idtax
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
//
////            
////            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformItemSelectPurchaseRequisition').setValue('edit');
        }
    }
});

var wItemSelectPurchaseRequisitionPopup = Ext.create('Ext.window.Window', {
    // extend: 'Ext.window.Window',
    alias: 'widget.wItemSelectPurchaseRequisitionPopup',
    id:'wItemSelectPurchaseRequisitionPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
     modal:true,
    width: panelW-100,
    height: sizeH-100,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemSelectPurchaseRequisition'
    }],
    listeners:{
         'close':function(win){
                 // load_tmp_sales_return()
          },
         'hide':function(win){
                 // load_tmp_sales_return()
          }
    }
});
// var wItemSelectPurchaseRequisitionPopup = Ext.create('wItemSelectPurchaseRequisitionPopup');
//end grid selector

Ext.define(dir_sys+'purchase2.EntryPurchaseRequisition', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPurchaseRequisition',
    alias: 'widget.EntryPurchaseRequisition',
    xtype: 'cell-editing',
    // title: 'Input Sales Quotation',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            autoScroll:true,
            plugins: [this.cellEditing],
            store: storeGridItemPurchaseRequisition,
            columns: [
                {
                    header:'idpurchaseitem',
                    hidden:true,
                    dataIndex:'idpurchaseitem'
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
//                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150,
//                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    hidden:true,
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Measurement',
                    dataIndex: 'short_desc',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel:true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    hidden:true,
                    header: 'Disc (%)',
                    width: 100,
                    dataIndex: 'disc',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    xtype: 'numbercolumn',
                    hidden:true,
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right'
                },
                {
                    header: 'Pajak',
                    hidden:true,
//                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
                        valueField: 'rate',
                        labelWidth: 40
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            icon: BASE_URL + 'assets/icons/fam/cross.gif',
                            tooltip: 'Hapus',
                            scope: this,
                            handler: this.onRemoveClick
                        }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [ 

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Barang',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        }, '->', {
                            xtype: 'textfield',
                            hidden:true,
                            fieldLabel: 'No Invoice',
                            name: 'noinvoice',
                            id: 'noinvoicePurchaseRequisition'
                        },
                        {
                            xtype:'hiddenfield',
                            name:'statusform',
                            id:'statusformPurchaseRequisitionGrid'
                        },
                        {
                            xtype:'hiddenfield',
                            name:'idpurchase',
                            id:'idpurchase_pr'
                        }
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalPurchaseRequisition',
                            fieldLabel: 'NO PR #',
                            readOnly: true,
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        // insertNoRef(4, Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue(), 'nojurnalPurchaseRequisition','PR');
                                        insertNoID(4, Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue(),'idpurchase','purchase','nojurnalPurchaseRequisition','PR');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalPurchaseRequisition',
                            format: 'd/m/Y',
                            fieldLabel: 'Requisition Date',
                            maxValue: new Date(),

                        }, 
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            fieldLabel: 'Request By',
                            name: 'requestby_name',
                            id: 'requestby_pr',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                            WindowGridRequestByPRPopup.show();

                                            var GridRequestByPRPopupID = Ext.getCmp('GridRequestByPRPopupID').getStore();
                                            
                                            GridRequestByPRPopupID.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'extraparams': 'a.status:'+1
                                                };
                                            });
                                            GridRequestByPRPopupID.load();

                                    });
                                }
                            }
                        },
                        {
                            xtype:'hiddenfield',
                            name: 'requestbyid',
                            id: 'requestbyid_pr',
                        },
                        {
                            xtype:'comboxtaxtype',
                            labelWidth: 120,
                            hidden:true,
                            valueField:'rate',
                            id:'cb_tax_id_pr',                            
                              listeners: {
                                select: function(combo, record, index) {
                                  // alert(combo.getValue()); // Return Unitad States and no USA
                                  updateGridPurchaseRequisition();
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            hidden:true,
                            id: 'tglPelunasanPurchaseRequisition',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        }
                    ]
                }, 
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnitEntryPurchaseRequisition'
//                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxidsupplier',
                            fieldLabel:'Recom. Supplier',
                            id: 'supplierPurchaseRequisition',
                            labelWidth: 120
                        },
                        {
                            xtype:'comboxpurchasestatus',
                            labelWidth: 120,
                            name:'pr_status',
                            // hidden:true,
                            id:'cbPurchaseRequisition'
                        }
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Customer',
                        //     name: 'namecustomer',
                        //     id: 'supplierPurchaseRequisition',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {

                        //                     wGridSupplierListPopup.show();
                                            
                        //                     storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'idunit': Ext.getCmp('idunitRequisition').getValue(),
                        //                                     'status': '1'
                        //                         };
                        //                     });
                        //                     storeGridSupplierList.load();
                        //             });
                        //         }
                        //     }
                        // },
//                         {
//                             xtype: 'comboxpayment',
//                             labelWidth: 120,
//                             id: 'paymentPurchaseRequisition',
//                             valueField: 'idpayment',
//                             listeners: {
//                                 select: {
//                                     fn: function(combo, value) {
//                                         if (combo.getValue() == 3)
//                                         {
//                                             //kredit
//                                             Ext.getCmp('tglPelunasanPurchaseRequisition').setDisabled(false);
//                                             Ext.getCmp('pembayaranPurchaseRequisition').setValue(0);
// //                                                Ext.getCmp('pembayaranPurchaseRequisition').setReadOnly(true);
//                                         } else if (combo.getValue() == 4)
//                                         {
//                                             //cod
//                                             Ext.getCmp('tglPelunasanPurchaseRequisition').setDisabled(true);
//                                             Ext.getCmp('tglPelunasanPurchaseRequisition').setValue(null);
//                                             Ext.getCmp('pembayaranPurchaseRequisition').setValue(0);
//                                             Ext.getCmp('pembayaranPurchaseRequisition').setReadOnly(false);
//                                         } else if (combo.getValue() == 1)
//                                         {
//                                             //tunai
//                                             Ext.getCmp('tglPelunasanPurchaseRequisition').setDisabled(true);
//                                             Ext.getCmp('tglPelunasanPurchaseRequisition').setValue(null);
//                                             Ext.getCmp('pembayaranPurchaseRequisition').setValue(0);
//                                             Ext.getCmp('pembayaranPurchaseRequisition').setReadOnly(false);
//                                         }
//                                     }
//                                 }
//                             }
//                         }
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 120,
                            value:'Purchase Requisition',
                            id: 'memoPurchaseRequisition',
                            fieldLabel: 'Memo'
                        }, '->'
                    ]
                },
              
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                         {
                            itemId: 'recordPayment',
                            text: 'Record Purchase Requisition',
                            id:'recordPurchaseRequisitionBtnSave',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordPurchaseRequisition, this, 'noprint', true)
                        },{
                            text: 'Print and Record Purchase Requisition',
                            iconCls: 'drive_disk-icon',
                            hidden:true,
                            handler: Ext.bind(this.recordPurchaseRequisition, this, 'print', true)
                        },
                         
                         
                        {
                            xtype: 'textfield',
                            id: 'sisaBayarPurchaseRequisition',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            hidden:true,
                            fieldLabel: 'Saldo Terhutang ',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountPurchaseRequisition',
                            name: 'idaccount',
                            readOnly: true
                        }
                        // , {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Akun Persediaan',
                        //     labelWidth: 120,
                        //     name: 'accname',
                        //     id: 'accnamePurchaseRequisition',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                 if (Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue() == null)
                        //                 {
                        //                     Ext.Msg.alert('Akun Persediaan', 'Harap pilih unit terlebih dahulu');
                        //                 } else {
                        //                     windowPopupAccListPurchaseRequisition.show();
                        //                     storeAccountAktive.load({
                        //                         params: {
                        //                             'idunit': Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue()
                        //                         }
                        //                     });
                        //                 }

                        //             });
                        //         }
                        //     }
                        // }
                        , {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberPurchaseRequisition',
                            readOnly: true
                        }, '->',
                        {
                            xtype: 'textfield',
                            hidden:true,
                            id: 'angkutPurchaseRequisition',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchaseRequisition('general');
                                    }, c);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                       {
                            xtype: 'textfield',
                            hidden:true,
                            id: 'shipaddressPurchaseRequisition',
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (group_id == 99)
                                        {
                                            var extraparams = null;
                                        } else {
                                            var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue();
                                        }

                                        var FormChooseAddress = Ext.getCmp('FormChooseAddress');
                                        FormChooseAddress.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                                            params: {
                                                extraparams: extraparams
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                console.log(d.alamat)
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        });
                                        wAddPurchaseRequisitionPopup.show();

                                    });
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            labelWidth: 120,
                            id: 'totalItemPurchaseRequisition',
                            fieldLabel: 'Total Item',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            align: 'right',
                            hidden:true,
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPurchaseRequisition',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'comboxshipping',
                            labelWidth: 120,
                            hidden:true,
                            id: 'shippingPurchaseRequisition'
                        }, '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            hidden:true,
                            labelWidth: 120,
                            id: 'totalPajakPurchaseRequisition',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'comboxcurrency',
                            hidden:true,
                            id: 'comboxcurrencyPurchaseRequisition',
                            labelWidth: 120
                        },
                         '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalQtyPurchaseRequisition',
                            fieldLabel: 'Total Qty',
                            fieldStyle: 'text-align: right;'
                        },
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            hidden:true,
                            labelWidth: 120,
                            id: 'subtotalPurchaseRequisition',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
//                        {
//                            itemId: 'useRecuringPurchaseRequisition',
//                            text: 'Gunakan Sales Quotation Tersimpan',
//                            iconCls: 'add-icon',
//                            handler: function() {
//                                wGridRecurringPopup.show();
//                                storeGridRecurringPopup.load();
//                            }
//                        }, {
//                            itemId: 'recordandsavePurchaseRequisition',
//                            text: 'Simpan Sebagai Sales Quotation Berulang',
//                            iconCls: 'add-icon',
//                            handler: this.saveRecurr
//                        },
                       
                        // {
                        //     itemId: 'recordPurchaseRequisition',
                        //     text: 'Rekam Sales Quotation',
                        //     iconCls: 'disk',
                        //     handler: this.recordPurchaseRequisition
                        // }
                        , '->',
                         {
                            xtype: 'textfield',
                            id: 'pembayaranPurchaseRequisition',
                            align: 'right',
//                            readOnly: true,
                            hidden:true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchaseRequisition('general');
                                    }, c);
                                }
                            }
                        }
                       
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntryPurchaseRequisition();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridPurchaseRequisition('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseRequisition: function(button, event, mode)
    {
        console.log(Ext.getCmp('idaccountPurchaseRequisition').getValue())
        if (validasiPurchaseRequisition())
        {
            
            var json = Ext.encode(Ext.pluck(storeGridItemPurchaseRequisition.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/saveRequisition',
                method: 'POST',
                params: {
                    idpurchase: Ext.getCmp('idpurchase_pr').getValue(),
                    requestbyid:Ext.getCmp('requestbyid_pr').getValue(),
                    supplierPurchaseRequisition: Ext.getCmp('supplierPurchaseRequisition').getValue(),
                    tanggalPurchaseRequisition: Ext.getCmp('tanggalPurchaseRequisition').getValue(),
                    shipaddressPurchaseRequisition: Ext.getCmp('shipaddressPurchaseRequisition').getValue(),
                    nojurnalPurchaseRequisition: Ext.getCmp('nojurnalPurchaseRequisition').getValue(),
                    memoPurchaseRequisition: Ext.getCmp('memoPurchaseRequisition').getValue(),
                    subtotalPurchaseRequisition: Ext.getCmp('subtotalPurchaseRequisition').getValue(),
                    totalPurchaseRequisition: Ext.getCmp('totalPurchaseRequisition').getValue(),
                    totalPajak: Ext.getCmp('totalPajakPurchaseRequisition').getValue(),
                    shippingPurchaseRequisition: Ext.getCmp('shippingPurchaseRequisition').getValue(),
                    angkutPurchaseRequisition: Ext.getCmp('angkutPurchaseRequisition').getValue(),
                    pembayaranPurchaseRequisition: Ext.getCmp('pembayaranPurchaseRequisition').getValue(),
                    sisaBayarPurchaseRequisition: Ext.getCmp('sisaBayarPurchaseRequisition').getValue(),
                    // paymentPurchaseRequisition: Ext.getCmp('paymentPurchaseRequisition').getValue(),
                    tglPelunasanPurchaseRequisition: Ext.getCmp('tglPelunasanPurchaseRequisition').getValue(),
                    idcurrency: Ext.getCmp('comboxcurrencyPurchaseRequisition').getValue(),
                    idaccountPurchaseRequisition: Ext.getCmp('idaccountPurchaseRequisition').getValue(),
                    noinvoice: Ext.getCmp('noinvoicePurchaseRequisition').getValue(),
                    unit: Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue(),
                    supplierPurchaseRequisition : Ext.getCmp('supplierPurchaseRequisition').getValue(),
                    statusform : Ext.getCmp('statusformPurchaseRequisitionGrid').getValue(),
                    ratetax: Ext.getCmp('cb_tax_id_pr').getValue(),
                    pr_status : Ext.getCmp('cbPurchaseRequisition').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        // Ext.getCmp('supplierPurchaseRequisition').setValue(null);
                        // Ext.getCmp('tanggalPurchaseRequisition').setValue(null);
                        // Ext.getCmp('shipaddressPurchaseRequisition').setValue(null);
                        // Ext.getCmp('nojurnalPurchaseRequisition').setValue(null);
                        // Ext.getCmp('memoPurchaseRequisition').setValue(null);
                        // Ext.getCmp('subtotalPurchaseRequisition').setValue(null);
                        // Ext.getCmp('totalPurchaseRequisition').setValue(null);
                        // Ext.getCmp('totalPajak').setValue(null);
                        // Ext.getCmp('shippingPurchaseRequisition').setValue(null);
                        // Ext.getCmp('angkutPurchaseRequisition').setValue(null);
                        // Ext.getCmp('pembayaranPurchaseRequisition').setValue(null);
                        // Ext.getCmp('sisaBayarPurchaseRequisition').setValue(null);
                        // Ext.getCmp('paymentPurchaseRequisition').setValue(null);
                        // Ext.getCmp('tglPelunasanPurchaseRequisition').setValue(null);
                        // Ext.getCmp('comboxcurrencyPurchaseRequisition').setValue(null);

                        // storeGridItemPurchaseRequisition.removeAll();
                        // storeGridItemPurchaseRequisition.sync();
                        // updateGridPurchaseRequisition('general');

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Quotation','PurchaseRequisition',d.id);
                        // }

                        Ext.getCmp('windowPopupPurchaseRequisitionGrid').hide();

                        Ext.getCmp('PurchaseRequisitionGridID').getStore().load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiPurchaseRequisition())
        {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


//        this.getStore().load({
//            // store loading is asynchronous, use a load listener or callback to handle results
//            callback: this.onStoreLoad
//        });
    },
    onStoreLoad: function() {
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },
    onAddClick: function() {
//        console.log(Ext.getCmp('supplierPurchaseRequisition').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
        // if (Ext.getCmp('supplierPurchaseRequisition').getValue() == null)
        // {
        //     Ext.Msg.alert('Peringatan', 'Supplier belum dipilih!');
        // } else {
            wItemSelectPurchaseRequisitionPopup.show();
            storeGridItemSelectPurchaseRequisition.load();
        // }

//        var rec = new JournalStore({
//            idaccount: null,
//            accname: null,
//            accnumber: null,
//            debit: null,
//            credit: null
//        });
//
//        this.getStore().insert(0, rec);
//        this.cellEditing.startEditByPosition({
//            row: 0,
//            column: 0
//        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridPurchaseRequisition()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridPurchaseRequisition()
{
    console.log('update run');
    var addprefix = 'PurchaseRequisition';

    var subtotalPurchaseRequisition = 0 * 1;
    var totalPurchaseRequisition = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutPurchaseRequisition = Ext.getCmp('angkutPurchaseRequisition').getValue();
    var pembayaranPurchaseRequisition = Ext.getCmp('pembayaranPurchaseRequisition').getValue();
    var sisaBayarPurchaseRequisition = 0 * 1;
    var rateTax = Ext.getCmp('cb_tax_id_pr').getValue();
    console.log(rateTax);

    var totalitem = 0;
    var totalqty = 0;
    Ext.each(storeGridItemPurchaseRequisition.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.price;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalPurchaseRequisition += net;
        totalPajak += (net / 100) * rateTax * 1;
        obj.set('total', net);

        totalitem++;
        totalqty+=obj.data.qty;
    });

//     console.log(subtotalPurchaseRequisition);
    totalPurchaseRequisition = subtotalPurchaseRequisition + angkutPurchaseRequisition * 1;
//     console.log(totalPurchaseRequisition+' '+totalPajak);
    totalPurchaseRequisition = totalPurchaseRequisition + totalPajak;
//     console.log(totalPurchaseRequisition);
    sisaBayarPurchaseRequisition = totalPurchaseRequisition - pembayaranPurchaseRequisition;

    Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseRequisition.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('total' + addprefix).setValue(totalPurchaseRequisition.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('angkut' + addprefix).setValue(angkutPurchaseRequisition.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaranPurchaseRequisition').setValue(pembayaranPurchaseRequisition.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarPurchaseRequisition').setValue(sisaBayarPurchaseRequisition.toLocaleString('null', {minimumFractionDigits: 2}));

     Ext.getCmp('totalItemPurchaseRequisition').setValue(totalitem);
     Ext.getCmp('totalQtyPurchaseRequisition').setValue(renderNomor(totalqty));
}

function validasiPurchaseRequisition()
{
//    alert(Ext.getCmp('comboxcurrencyPurchaseRequisition').getValue());   

    if (Ext.getCmp('supplierPurchaseRequisition').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Supplier belum dipilih');

    } else if (Ext.getCmp('tanggalPurchaseRequisition').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Sales Quotation');
    } 
     else if (Ext.getCmp('nojurnalPurchaseRequisition').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan NO PR');
    } else if (Ext.getCmp('memoPurchaseRequisition').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan Memo PR');
    } else if (Ext.getCmp('totalItemPurchaseRequisition').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan barang');
    } 
    // else if (Ext.getCmp('paymentPurchaseRequisition').getValue() == null)
    // {
        // Ext.Msg.alert('Failed', 'Tentukan pembayaran');
    // } 
    // else if (Ext.getCmp('paymentPurchaseRequisition').getValue() == 3 && Ext.getCmp('tglPelunasanPurchaseRequisition').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    // } else if(Ext.getCmp('paymentPurchaseRequisition').getValue()==1 && Ext.getCmp('pembayaranPurchaseRequisition').getValue()==0)
    // {
    //      Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    // }
    // else if (Ext.getCmp('paymentPurchaseRequisition').getValue() == 1 && Ext.getCmp('idaccountPurchaseRequisition').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}