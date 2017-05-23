Ext.define('fotoinventorythumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotoinventorythumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});


var formInventoryV2 = Ext.create('Ext.form.Panel', {
    id: 'formInventoryV2',
    width: 700,
    title: 'Data Persediaan',
    // height: 330,
    url: SITE_URL + 'inventory/SaveInventoryV2',
    // baseParams: {idmenu:19},
    bodyStyle: 'padding:5px',
    //    autoWidth:true,
    // forceFit: true,
    // autoScroll: true,
    fieldDefaults: {
        anchor:'100%',
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 190,
        width: 365
    },
    // layout: 'hbox',
    defaults: {
        // padding: '5 5 5 5',
        // anchor: '100%'
    },  
    // buttons: [],    
    items: [{
            xtype: 'container',
            layout: 'hbox',
            items: [{
                    xtype: 'container',
                    // width:'50%',
                    width:450,
                    // flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'statusformInventory2',
                        id: 'statusformInventory2'
                    },
                        {
                        xtype: 'fieldset',
                        title: 'Profil',
                        // collapsible: true,
                        items: [
                        {
                            xtype:'hiddenfield',
                            name:'inputdaripurchase',
                            id:'inputdaripurchase'
                        },{
                            xtype: 'hiddenfield',
                            name: 'idinventory',
                            id: 'idinventoryInv'
                        },
                         {
                            xtype: 'fotoinventorythumb',
                            id: 'fotoinventorythumb',
                            fieldLabel: 'Photo',
                            width: 187,
                            height: 150,
                        }, {
                            xtype: 'filefield',
                            emptyText: 'Upload Foto',
                            fieldLabel: 'Photo',
                            name: 'images',
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'imgupload-icon'
                            }
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'No SKU',
                            allowBlank: false,
                            id:'sku_no_invenform',
                            name: 'sku_no'
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'No Barang',
                            allowBlank: false,
                            name: 'invno'
                        },  {
                            xtype: 'comboxunit',
                            allowBlank: false,
                            // labelWidth:230,
                            // width:500,
                            multiSelect: true,
                            id: 'namaunitFormInvX',
                            name: 'namaunit2[]'
                            // ,value: 'Unit 1, SMIP'
                            // ,value: ["Unit 1","SMIP"]
                            // value: 'Unit 1,SMIP'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Barang',
                            allowBlank: false,
                            anchor:'100%',
                            name: 'nameinventory',
                            id: 'nameinventory'
                        },
                        {
                            xtype:'comboxInventoryType',
                            id:'comboxInventoryType_inv_form',
                            allowBlank:false
                        }, {
                            xtype: 'comboxinventorycat',
                            fieldLabel:'Product Type',
                            allowBlank: false,
                            valueField:'idinventorycat',
                            name: 'idinventorycat'
                        },
                         {
                            xtype: 'comboxbrand',
                            id:'brand_id_invenform',
                            name:'brand_id'
                            // allowBlank: false,
                        },{
                            xtype: 'comboxmeasurement',
                            fieldLabel: 'Basic UoM',
                            allowBlank: false,
                            id: 'measurement_id_one',
                            name: 'measurement_id_one'
                        }, {
                            xtype: 'comboxmeasurement',
                            fieldLabel: 'Second UoM',
                            allowBlank: false,
                            id: 'measurement_id_two',
                            name: 'measurement_id_two'
                        }, {
                            xtype: 'comboxmeasurement',
                            fieldLabel: 'Third UoM',
                            allowBlank: false,
                            id: 'measurement_id_tre',
                            name: 'measurement_id_tre'
                        },  {
                            xtype: 'textareafield',
                            fieldLabel: 'Deskripsi',
                            name: 'description'
                        },
                       
                        {
                            xtype:'displayfield',
                            fieldLabel:'Opsi Persediaan'
                        }, {
                            xtype: 'checkboxgroup',
                            anchor: '100%',
                            columns: 2,
                            items: [{
                                    xtype: 'checkboxfield',
                                    name: 'cbdijual',
                                    id: 'cbdijual',
                                    boxLabel: 'Dijual',
                                    listeners: {
                                        change: function() {
                                            if (this.getValue()) {
                                                Ext.getCmp('fieldsetInvSell').setDisabled(false);
                                            } else {
                                                Ext.getCmp('fieldsetInvSell').setDisabled(true);
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'checkboxfield',
                                    name: 'cbdibeli',
                                    id: 'cbdibeli',
                                    padding: '0 0 0 -120',
                                    boxLabel: 'Dibeli',
                                    listeners: {
                                        change: function() {
                                            // var val = Ext.getCmp('cbdibeli').getValue();
                                            if (this.getValue()) {
                                                Ext.getCmp('fieldsetInvBuy').setDisabled(false);
                                            } else {
                                                Ext.getCmp('fieldsetInvBuy').setDisabled(true);
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'checkboxfield',
                                    name: 'cbpersediaan',
                                    id: 'cbpersediaan',
                                    boxLabel: 'Disusutkan',
                                    listeners: {
                                        change: function() {
                                            // var val = Ext.getCmp('cbpersediaan').getValue();
                                            if (this.getValue()) {
                                                setPenyusutan(false)
                                                // Ext.getCmp('fieldsetInvPersediaan').setDisabled(false);
                                            } else {
                                                setPenyusutan(true)
                                                // Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
                                            }
                                        }
                                    }
                                }, {
                                    xtype: 'checkboxfield',
                                    name: 'nonaktif',
                                    id: 'nonaktif',
                                    padding: '0 0 0 -120',
                                    boxLabel: 'Tidak Aktif',
                                    listeners: {
                                        change: function() {
                                            //                                var val = Ext.getCmp('nonaktif').getValue();
                                            // var formProfile = Ext.ComponentQuery.query('FormProfile')[0];
                                            // if (this.getValue()) {
                                            //     formProfile.getForm().findField('cbdibeli').setValue(false);
                                            //     formProfile.getForm().findField('cbdijual').setValue(false);
                                            //     formProfile.getForm().findField('cbpersediaan').setValue(false);
                                            //     Ext.getCmp('idFormBuy').setDisabled(true);
                                            //     Ext.getCmp('idFormSell').setDisabled(true);
                                            //     Ext.getCmp('idFormInventoried').setDisabled(true);
                                            //     //                                        Ext.getCmp('idTabItemInventoryHistory').setDisabled(true);
                                            // } else {
                                            //     Ext.getCmp('idFormBuy').setDisabled(false);
                                            //     Ext.getCmp('idFormSell').setDisabled(false);
                                            //     Ext.getCmp('idFormInventoried').setDisabled(false);
                                            //     Ext.getCmp('idTabItemInventoryHistory').setDisabled(false);
                                            // }
                                        }
                                    }
                                }
                                // {boxLabel: 'Item 1', name: 'cb-horiz-1'},
                                // {boxLabel: 'Item 2', name: 'cb-horiz-2',padding:'0 0 0 -120'},
                                // {boxLabel: 'Item 3', name: 'cb-horiz-3'},
                                // {boxLabel: 'Item 4', name: 'cb-horiz-4'}
                            ]
                        }]
                    }] //end item container
                } //end xtype:container
                , {
                    xtype: 'container',
                    padding: '0 0 0 10',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                        {
                        xtype: 'fieldset',
                        id:'fieldsetInvSell',
                        title: 'Penjualan',
                        // collapsible: true,
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'incomeaccount',
                                id: 'incomeaccountSellID'
                            },
                            // {
                            //     xtype: 'fieldcontainer',
                            //     fieldLabel: 'Nomor Akun Penjualan',
                            //     layout: 'hbox',
                            //     defaultType: 'textfield',
                            //     defaults: {
                            //         hideLabel: 'true'
                            //     },
                            //     items: [
                            //     {
                            //         name: 'accname',
                            //         id: 'incomeaccountSell',
                            //         emptyText: 'Pilih Akun',
                            //         flex: 3,
                            //         margins: '0 6 0 0',
                            //         allowBlank: false,
                            //         listeners: {
                            //             render: function(component) {
                            //                 component.getEl().on('click', function(event, el) {
                            //                     windowPopupincomeAccountLink.show();
                            //                     storeAccountAktive.load({
                            //                     params: {
                            //                         'idunit': Ext.getCmp('searchAccLinkedInventoryBeban').getValue(),
                            //                     }
                            //                 });
                            //                 });
                            //             }
                            //         }
                            //     }, {
                            //         xtype: 'displayfield',
                            //         name: 'accnumber',
                            //         id: 'accnumberSell',
                            //         flex: 1
                            //     }]
                            // }, 
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Harga Dasar Penjualan',
                                name: 'sellingprice'
                            }, {
                                xtype: 'comboxtax',
                                hidden:true,
                                anchor: '100%',
                                name: 'nametax',
                                fieldLabel: 'Pajak Penjualan'
                            }, {
                                xtype: 'comboxmeasurement',
                                anchor: '100%',
                                fieldLabel: 'Satuan',
                                name: 'unitmeasuresell'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        id:'fieldsetInvBuy',
                        title: 'Pembelian',
                        // collapsible: true,
                        items: [{
                            xtype: 'hiddenfield',
                            name: 'cosaccount',
                            id: 'cosaccountBuy'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Harga Beli',
                            id: 'costInventory',
                            name: 'cost'
                        }, {
                            xtype: 'comboxmeasurement',
                            fieldLabel: 'Satuan',
                            name: 'unitmeasure'
                        }, {
                            xtype: 'comboxtax',
                            hidden:true,
                            name:'nametaxbuy',
                            fieldLabel: 'Pajak Pembelian'
                        }, {
                            xtype: 'comboxsupplier',
                            name:'idsupplier[]',
                            id:'idsupplier_forminv',
                            multiSelect: true,
                        }, {
                            xtype: 'datefield',
                            readOnly:true,
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pembelian Terakhir',
                            id: 'datebuy',
                            name: 'datebuy'
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Persediaan',
                        id:'fieldsetInvPersediaan',
                        // collapsible: true,
                        items: [{
                            xtype: 'numberfield',
                            anchor: '98%',
                            fieldLabel: 'Jumlah Stok',
                            id: 'qtystockInv',
                            name: 'qtystock'
                        },{
                            xtype: 'numberfield',
                            anchor: '98%',
                            fieldLabel: 'Stok Minimum',
                            id: 'qtystockminInv',
                            name: 'qtystockmin'
                        }, {
                            xtype: 'numberfield',
                            anchor: '98%',
                            fieldLabel: 'Nilai Residu',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        CalcPenyusutan();
                                    }, c);
                                }
                            },
                            id: 'residu',
                            name: 'residu'
                        }, {
                            xtype: 'numberfield',
                            anchor: '98%',
                            fieldLabel: 'Umur Ekonomis (tahun)',
                            allowBlank: false,
                            id: 'umurEkonomis',
                            name: 'umur',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        CalcPenyusutan();
                                    }, c);
                                },
                                change: function(txt, The, eOpts) {
                                    CalcPenyusutan();
                                }
                            },
                        }, {
                            xtype: 'textfield',
                            style: 'text-align: right',
                            anchor: '98%',
                            labelStyle: 'text-align:left',
                            // anchor: '9',
                            fieldLabel: 'Akumulasi Beban Berjalan',
                            id: 'akumulasibeban',
                            allowBlank: false,
                            name: 'akumulasibeban',
                            // listeners: {
                            //     change: function(txt, The, eOpts){
                            //       this.setRawValue(renderNomor(this.getValue()));
                            //     }
                            // }
                        }, {
                            xtype: 'textfield',
                            anchor: '98%',
                            style: 'text-align: right',
                            labelStyle: 'text-align:left',
                            fieldLabel: 'Beban Tahun Berjalan',
                            id: 'bebanberjalan',
                            allowBlank: false,
                            name: 'bebanberjalan'
                        }, {
                            xtype: 'textfield',
                            anchor: '98%',
                            style: 'text-align: right',
                            labelStyle: 'text-align:left',
                            fieldLabel: 'Nilai Buku Berjalan',
                            id: 'nilaibuku',
                            readOnly: true,
                            allowBlank: false,
                            name: 'nilaibuku'
                        }, {
                            xtype: 'textfield',
                            anchor: '98%',
                            style: 'text-align: right',
                            labelStyle: 'text-align:left',
                            fieldLabel: 'Beban Perbulan',
                            id: 'bebanperbulan',
                            allowBlank: false,
                            readOnly: true,
                            name: 'bebanperbulan'
                        }, {
                            xtype: 'textfield',
                            anchor: '98%',
                            style: 'text-align: right',
                            labelStyle: 'text-align:left',
                            fieldLabel: 'Penyusutan Setelah Habis Usia',
                            id: 'akumulasiAkhir',
                            allowBlank: false,
                            readOnly: true,
                            name: 'akumulasiakhir'
                        }]
                    }]
                }
            ]
        },
        // {
        //           xtype: 'checkboxgroup',
        //               fieldLabel: 'Status',
        //               columns: [10, 10],
        //               vertical: true,
        //               width:30,
        //               labelWidth: 90,
        //               items: [
        // {
        //      xtype: 'checkboxfield',
        //      name: 'cbdijual',
        //      id: 'cbdijual',
        //      boxLabel: 'Dijual',
        //      listeners: {
        //          change: function() {
        //              // if (this.getValue()) {
        //              //     Ext.getCmp('idFormSell').setDisabled(false);
        //              // } else {
        //              //     Ext.getCmp('idFormSell').setDisabled(true);
        //              // }
        //          }
        //      }
        //  }, {
        //      xtype: 'checkboxfield',
        //      name: 'cbdibeli',
        //      id: 'cbdibeli',
        //      boxLabel: 'Dibeli',
        //      listeners: {
        //          change: function() {
        //              // var val = Ext.getCmp('cbdibeli').getValue();
        //              // if (this.getValue()) {
        //              //     Ext.getCmp('idFormBuy').setDisabled(false);
        //              // } else {
        //              //     Ext.getCmp('idFormBuy').setDisabled(true);
        //              // }
        //          }
        //      }
        //  }, {
        //      xtype: 'checkboxfield',
        //      name: 'cbpersediaan',
        //      id: 'cbpersediaan',
        //      boxLabel: 'Persediaan',
        //      listeners: {
        //          change: function() {
        //              // var val = Ext.getCmp('cbpersediaan').getValue();
        //              // if (this.getValue()) {
        //              //     Ext.getCmp('idFormInventoried').setDisabled(false);
        //              // } else {
        //              //     Ext.getCmp('idFormInventoried').setDisabled(true);
        //              // }
        //          }
        //      }
        //  }, {
        //      xtype: 'checkboxfield',
        //      name: 'nonaktif',
        //      id: 'nonaktif',
        //      boxLabel: 'Tidak Aktif',
        //      listeners: {
        //          change: function() {
        //              //                                var val = Ext.getCmp('nonaktif').getValue();
        //              // var formProfile = Ext.ComponentQuery.query('FormProfile')[0];
        //              // if (this.getValue()) {
        //              //     formProfile.getForm().findField('cbdibeli').setValue(false);
        //              //     formProfile.getForm().findField('cbdijual').setValue(false);
        //              //     formProfile.getForm().findField('cbpersediaan').setValue(false);
        //              //     Ext.getCmp('idFormBuy').setDisabled(true);
        //              //     Ext.getCmp('idFormSell').setDisabled(true);
        //              //     Ext.getCmp('idFormInventoried').setDisabled(true);
        //              //     //                                        Ext.getCmp('idTabItemInventoryHistory').setDisabled(true);
        //              // } else {
        //              //     Ext.getCmp('idFormBuy').setDisabled(false);
        //              //     Ext.getCmp('idFormSell').setDisabled(false);
        //              //     Ext.getCmp('idFormInventoried').setDisabled(false);
        //              //     Ext.getCmp('idTabItemInventoryHistory').setDisabled(false);
        //              // }
        //          }
        //      }
        //  }
        //     ]
        // }
        // {
        //             xtype: 'checkboxgroup',
        //             fieldLabel: 'Status Inventory',
        //             allowBlank: false,
        //             items: [{
        //                 xtype: 'checkboxfield',
        //                 name: 'cbdijual',
        //                 id: 'cbdijual',
        //                 boxLabel: 'Dijual',
        //                 listeners: {
        //                     change: function() {
        //                         if (this.getValue()) {
        //                             Ext.getCmp('idFormSell').setDisabled(false);
        //                         } else {
        //                             Ext.getCmp('idFormSell').setDisabled(true);
        //                         }
        //                     }
        //                 }
        //             }, {
        //                 xtype: 'checkboxfield',
        //                 name: 'cbdibeli',
        //                 id: 'cbdibeli',
        //                 boxLabel: 'Dibeli',
        //                 listeners: {
        //                     change: function() {
        //                         var val = Ext.getCmp('cbdibeli').getValue();
        //                         if (this.getValue()) {
        //                             Ext.getCmp('idFormBuy').setDisabled(false);
        //                         } else {
        //                             Ext.getCmp('idFormBuy').setDisabled(true);
        //                         }
        //                     }
        //                 }
        //             }, {
        //                 xtype: 'checkboxfield',
        //                 name: 'cbpersediaan',
        //                 id: 'cbpersediaan',
        //                 boxLabel: 'Persediaan',
        //                 listeners: {
        //                     change: function() {
        //                         var val = Ext.getCmp('cbpersediaan').getValue();
        //                         if (this.getValue()) {
        //                             Ext.getCmp('idFormInventoried').setDisabled(false);
        //                         } else {
        //                             Ext.getCmp('idFormInventoried').setDisabled(true);
        //                         }
        //                     }
        //                 }
        //             }, {
        //                 xtype: 'checkboxfield',
        //                 name: 'nonaktif',
        //                 id: 'nonaktif',
        //                 boxLabel: 'Tidak Aktif',
        //                 listeners: {
        //                     change: function() {
        //                         //                                var val = Ext.getCmp('nonaktif').getValue();
        //                         var formProfile = Ext.ComponentQuery.query('FormProfile')[0];
        //                         if (this.getValue()) {
        //                             formProfile.getForm().findField('cbdibeli').setValue(false);
        //                             formProfile.getForm().findField('cbdijual').setValue(false);
        //                             formProfile.getForm().findField('cbpersediaan').setValue(false);
        //                             Ext.getCmp('idFormBuy').setDisabled(true);
        //                             Ext.getCmp('idFormSell').setDisabled(true);
        //                             Ext.getCmp('idFormInventoried').setDisabled(true);
        //                             //                                        Ext.getCmp('idTabItemInventoryHistory').setDisabled(true);
        //                         } else {
        //                             Ext.getCmp('idFormBuy').setDisabled(false);
        //                             Ext.getCmp('idFormSell').setDisabled(false);
        //                             Ext.getCmp('idFormInventoried').setDisabled(false);
        //                             Ext.getCmp('idTabItemInventoryHistory').setDisabled(false);
        //                         }
        //                     }
        //                 }
        //             }]
        //         }
    ]
});

function CalcPenyusutan(prefix) {
    // var FormBuy = Ext.ComponentQuery.query('FormBuy')[0];
    if(prefix===undefined)
    {
        prefix='';
    }
    console.log(prefix)
    if(prefix=='Opening')
    {
        //input persediaan awal
        var FormBuy = Ext.getCmp('formInventoryOpening');
        var costInventory = Ext.getCmp('costInventory'+prefix).getValue();
    } else {
        var FormBuy = Ext.getCmp('formInventoryV2');
        var costInventory = Ext.getCmp('costInventory').getValue();
    }
    
    var dt = FormBuy.getForm().findField('datebuy').getSubmitValue();
    var residu = FormBuy.getForm().findField('residu'+prefix).getValue();
    var umurEkonomis = FormBuy.getForm().findField('umurEkonomis'+prefix).getValue();
    var dtArr = dt.split('/');
    var tgl = dtArr[2] + '-' + dtArr[1] + '-' + dtArr[0];
    
    // var FormInventoried = Ext.ComponentQuery.query('FormInventoried')[0];
    if(costInventory!='' && residu!=null && umurEkonomis!=null)
    {
            Ext.Ajax.request({
            url: SITE_URL + 'inventory/itungPenyusutan/' +costInventory + '/' + residu + '/' + umurEkonomis + '/' + tgl + '/' + dtArr[2],
            method: 'GET',
            // params: {
            //     supplierPurchase: Ext.getCmp('supplierPurchase').getValue()
            // },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                // console.log(FormBuy)
                // Ext.getCmp('bebanperbulan').setValue(d.penyusutanBulan);
                // Ext.getCmp('akumulasibeban').setValue(d.akumulasiPenyusutan);
                // Ext.getCmp('bebanberjalan').setValue(d.bebanBerjalan);
                // Ext.getCmp('nilaibuku').setValue(d.nilaiBuku);
                // Ext.getCmp('akumulasiAkhir').setValue(d.akumulasiPenyusutanAkhir);
                FormBuy.getForm().findField('bebanperbulan'+prefix).setValue(d.penyusutanBulan);
                FormBuy.getForm().findField('akumulasibeban'+prefix).setValue(d.akumulasiPenyusutan);
                FormBuy.getForm().findField('bebanberjalan'+prefix).setValue(d.bebanBerjalan);
                FormBuy.getForm().findField('nilaibuku'+prefix).setValue(d.nilaiBuku);
                FormBuy.getForm().findField('akumulasiAkhir'+prefix).setValue(d.akumulasiPenyusutanAkhir);
                console.log(d);
                // if (!d.success)
                // {
                //     Ext.Msg.alert('Peringatan', d.message);
                // } else {
                //     Ext.Msg.alert('Success', d.message);
                // }
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
}

function renderInv(value) {
    if (value === 'Belum Terdefinisi') {
        return '<font color=red>' + value + '</a>';
    } else {
        return value;
    }
}

function setPenyusutan(opt)
{
    var residu = Ext.getCmp('residu').setDisabled(opt);
    var umurEkonomis = Ext.getCmp('umurEkonomis').setDisabled(opt);
    var akumulasibeban = Ext.getCmp('akumulasibeban').setDisabled(opt);
    var bebanberjalan = Ext.getCmp('bebanberjalan').setDisabled(opt);
    var nilaibuku = Ext.getCmp('nilaibuku').setDisabled(opt);
    var bebanperbulan = Ext.getCmp('bebanperbulan').setDisabled(opt);
    var akumulasiAkhir = Ext.getCmp('akumulasiAkhir').setDisabled(opt);
}