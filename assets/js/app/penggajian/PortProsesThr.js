
Ext.define('tabPembayaranProsesThr', {
    // itemId: 'rTabPanelProsesThr',
    id: 'tabPembayaranProsesThr',
    extend: 'Ext.form.Panel',
    alias: 'widget.tabPembayaranProsesThr',
    title:'Tambahan THR',
    url: SITE_URL + 'backend/saveform/employeeGrid',
    bodyStyle: 'padding:5px',
    autoWidth:true,
    autoHeight:true,
    autoScroll: true,
    fieldDefaults: {
    msgTarget: 'side',
    blankText: 'Tidak Boleh Kosong',
    //        padding: '5 40 5 5',
    labelWidth: 160,
    width: '100%'
    },
    items: [{
            xtype:'hiddenfield',
            id:'detailThridemployee'
        },
        {
            xtype:'textfield',
            fieldLabel: 'Jumlah jam/kehadiran dalam sebulan',
            align:'right',
            // readOnly:true,
            id:'kehadiranjamthr'
     },
        {
            xtype:'textfield',
            fieldLabel: 'Jumlah Penambah THR',
            align:'right',
            // readOnly:true,
            id:'detailThrGaji'
     },{
        xtype:'textarea',
        fieldLabel:'Keterangan',
        id:'keteranganthrtambahan'
     }],
      buttons: [{
            id: 'BtnThrTambahanSimpan',
            text: 'Simpan',
            handler: function() {
               updateGridThr();
            }
        }]
});



Ext.define('MY.searchGridemployeeProsesThrGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridemployeeProsesThrGrid',
    store: storeGridemployeeProsesThrGrid,
    width: 180
});

Ext.define('GridemployeeProsesThrGrid', {
    // itemId: 'GridemployeeProsesThrGridID',
    multiSelect:true,
    id: 'GridemployeeProsesThrGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridemployeeProsesThrGrid',
    store: storeGridemployeeProsesThrGrid,
    loadMask: true,
    columns: [
        {header: 'idemployee', dataIndex: 'idemployee', hidden: true},          
        {header: 'NIP', dataIndex: 'code', minWidth: 150},     
        // {header: 'Nama Depan', dataIndex: 'firstname', minWidth: 150},
        {header: 'Nama', dataIndex: 'lastname', minWidth: 150},
        {header: 'Jumlah Kehadiran/jam', dataIndex: 'kehadiranjam', minWidth: 150},  
        {header: 'Gaji+Tunjangan', dataIndex: 'totalpendapatan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Masa kerja(bulan)', dataIndex: 'masakerja', minWidth: 150},   
        {header: 'Pengali', dataIndex: 'pengali', minWidth: 150,align:'right'},     
        {header: 'Jumlah THR', dataIndex: 'jumlahthr', minWidth: 150,align:'right', minWidth: 150, xtype:'numbercolumn',align:'right'},     
        {header: 'THR tambahan', dataIndex: 'thrtambahan', minWidth: 150, xtype:'numbercolumn',align:'right'},
         {header: 'keterangan THR Tambahan', dataIndex: 'keterangan', minWidth: 150},
        {header: 'Total THR', dataIndex: 'totalthr', minWidth: 150, xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'ThrPeriode',
                    format: 'd-m-Y',
                    fieldLabel:'Periode THR',
                    labelWidth: 100,
                },'->',{
                    xtype: 'hiddenfield',
                    name: 'idaccountpaythr',
                    id: 'idaccountpaythrSetup'
                }, {
                    xtype: 'textfield',
                    labelWidth: 180,
                    fieldLabel: 'Akun Kas Pembayaran THR',
                    allowBlank: false,
                    name: 'accnamepaythr',
                    id: 'accnamepaythrSetup',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                // windowPopupAccListPaythr.show();
                                // // storeAccountAktive.load();
                                //  storeAccountAktive.load({
                                //                             params: {
                                //                                 'idunit': Ext.getCmp('unitThr').getValue(),
                                //                                 'idaccounttype': '19,17,1,11,5,4,21,3'
                                //                             }
                                //                         });
                                    wAccListThr.show();
                                    storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'idunit': Ext.getCmp('unitThr').getValue(),
                                                    'idaccounttype': '1,19'
                                        };
                                    });
                                    storeGridAccount.load();
                            });
                        }
                    }
                }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                
                {
                    xtype: 'comboxunit',
                    labelWidth: 100,
                    valueField:'idunit',
                    id: 'unitThr'
                },'->',{
                    xtype: 'hiddenfield',
                    name: 'idaccountthr',
                    id: 'idaccountthrSetup'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Akun Pencatatan Beban THR',
                    allowBlank: false,
                    labelWidth: 180,
                    name: 'accnamethr',
                    id: 'accnamethrSetup',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                // windowPopupAccListThr.show();
                                // storeAccountAktive.load({
                                //         params: {
                                //             'idunit': Ext.getCmp('unitThr').getValue(),
                                //             'idaccounttype': '14,15'
                                //         }
                                //     });

                                    wAccListBebanThr.show();
                                    storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'idunit': Ext.getCmp('unitThr').getValue(),
                                                    'idaccounttype': '14,15'
                                        };
                                    });
                                    storeGridAccount.load();
                            });
                        }
                    }
                }]
        },
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               {
                    text: 'Tambah Pegawai',
                    iconCls: 'add-icon',
                    handler: function() {
                         
                         var periode = Ext.getCmp('ThrPeriode').getValue();
                         var unitThr = Ext.getCmp('unitThr').getValue();
                         if(periode==null)
                         {
                            Ext.Msg.alert('Info', 'Periode thr Belum Dipilih');
                         } else if(unitThr==null)
                         {
                            Ext.Msg.alert('Info', 'Unit Belum Dipilih');
                         } else {
                            wPilihPegawaiThr.show();
                            storeGridPilihPegawaiThrGrid.load({
                               params: {
                                   'periode':periode,
                                   'idunit':unitThr
                               }
                           });
                         }
                         
                    }
                },
                {
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                         getSummaryThr();
                    }
                },
                {
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridemployeeProsesThrGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'penggajian/deleteThrTmpBtn',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                           storeGridemployeeProsesThrGrid.load();
                                           getSummaryThr();
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                    
                                }
                            }
                        });
                    },
//                    disabled: true
                },
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridemployeeProsesThrGrid',
                    text: 'Left Button'
                }

            ]
        },{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            {
                    xtype: 'displayfield',
                    id:'summaryProsesThr',
                    labelWidth:100,
                    fieldLabel:'Rekapitulasi',
                    value:'<div align=left>Total Pegawai: <br> Total Pembayaran THR: <br></left>'
                }
                ,'->',
                {
                    xtype: 'button',
                    text: 'Proses THR',
                    scale   : 'large',
                    handler: function() {
                       Ext.MessageBox.confirm('Konfirmasi','Apakah anda yakin untuk memproses thr', ProsesThrBtn2);
                    }
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridemployeeProsesThrGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridemployeeProsesThrGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
           console.log(record.data.payname)
           // Ext.getCmp('detailThrPayname').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+record.data.payname);
           
            Ext.getCmp('detailThridemployee').setValue(record.data.idemployee);

            Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/getPayrollType',
                    method: 'POST', 
                    params: {
                        idemployee: record.data.idemployee
                    },
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        if(res.payrolltypeid==1 || res.payrolltypeid==2)
                        {
                            //jam,kehadira,harian
                            Ext.getCmp('kehadiranjamthr').show();
                        } else {
                            Ext.getCmp('kehadiranjamthr').hide();
                        }
                    },
                    failure: function (res) {
                    }
                });
            

            Ext.getCmp('tabPembayaranProsesThr').setTitle('Penambah Pembayaran THR '+record.data.firstname+' '+record.data.lastname)

            Ext.util.Format.thousandSeparator = '.';
            Ext.util.Format.decimalSeparator = '.';

            Ext.getCmp('detailThrGaji').setValue(Ext.util.Format.number(record.data.thrtambahan, '0,000'));
            Ext.getCmp('keteranganthrtambahan').setValue(record.data.keterangan);
            Ext.getCmp('kehadiranjamthr').setValue(record.data.kehadiranjam);
            
            // storeGridTunjanganThrGrid.load({
            //     params: {
            //        'extraparams': 'a.idemployee:' + record.data.idemployee
            //     }
            // });

            // storeThrHistoryGrid.on('beforeload', function (store, operation, eOpts) {
            //     operation.params = {
            //         'bulantahunthr': Ext.getCmp('ThrHistoryPeriod').getValue(),
            //         'extraparams': 'a.idemployeeProsesThr:' + record.data.idemployeeProsesThr
            //     }
            // });
            // storeThrHistoryGrid.load();
//            storeThrHistoryGrid.load({
//                            params: {
//                                'bulantahunthr': Ext.getCmp('ThrHistoryPeriod').getValue(),
//                                'extraparams': 'a.idemployeeProsesThr:' + record.data.idemployeeProsesThr
//                            }
//                        });
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//             var formemployeeProsesThrGrid = Ext.getCmp('formemployeeProsesThrGrid');
//             wemployeeProsesThrGrid.show();

//             formemployeeProsesThrGrid.getForm().load({
//                 url: SITE_URL + 'backend/loadFormData/employeeProsesThrGrid/1',
//                 params: {
//                     extraparams: 'a.idemployeeProsesThr:' + record.data.idemployeeProsesThr
//                 },
//                 success: function(form, action) {
//                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 },
//                 failure: function(form, action) {
//                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 }
//             })

//             dataGaji(record.data.idemployeeProsesThr)
// //            Ext.getCmp('kddaerahS').setReadOnly(true);
//             Ext.getCmp('statusformemployeeProsesThrGrid').setValue('edit');
        }
    }
});

Ext.define('TabPortDetailThr', {
    extend: 'Ext.tab.Panel',
    id: 'TabPortDetailThr',
    alias: 'widget.TabPortDetailThr',
    title:'Detail Pembayaran THR',
    activeTab: 0,
    autoWidth: '100%',
    items: [
        {
            xtype: 'tabPembayaranProsesThr'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {

            }
        }
    }
});

Ext.define(dir_sys + 'penggajian.PortProsesThr', {
    extend: 'Ext.Panel',
    alias: 'widget.PortProsesThr',
    layout: 'border',
    defaults: {
        // collapsible: true,
        // split: true
    },
    items: [
    {
        region: 'east',
        flex: 1,
        split:true,
//        minHeight: heightPort,
        xtype:'tabPembayaranProsesThr'
//        html: 'Footer content'
    },
    // formDetailGaji,
    // {
    //     xtype:'rTabPanelProsesThr'
    // },
    // rTabPanelProsesThr,
//     {
//         region: 'south',
//         flex: 2,
// //        minHeight: heightPort,
//         xtype:'TabPortDetailGaji'
// //        html: 'Footer content'
//     }, 
    {
        title: 'Daftar Pegawai Yang Akan Diproses THR-nya',
        defaults: {
                // layout: 'fit',
                // bodyPadding: '1 0 15 0'
            },
        flex: 2,
        listeners: {
            collapse: function() {
                // console.log('colapse')
                // Ext.getCmp('panelDaftarSiswa').setTitle('Data ');
            },
            expand: function() {
                // Ext.getCmp('panelDaftarSiswa').setTitle('Daftar Siswa');
            }
        },
        // collapsible: true,
        region: 'center',
        items: [
        {
            height:sizeH-50*1,
            // minHeight: heightPort-500*1,
            xtype: 'GridemployeeProsesThrGrid'
        }
        ]
    }
    ]
});


function ProsesThrBtn2(btn) {
    var periodethr = Ext.getCmp('ThrPeriode').getSubmitValue();
    var idaccountpaythrSetup = Ext.getCmp('idaccountpaythrSetup').getValue();
    var idaccountthrSetup = Ext.getCmp('idaccountthrSetup').getValue();

    if (periodethr == null || periodethr == '')
    {
        Ext.Msg.alert('Failure', 'Periode thr belum ditentukan.');
    } else if (idaccountpaythrSetup == null || idaccountpaythrSetup == '')
        {
            Ext.Msg.alert('Failure', 'Akun Kas Pembayaran THR Belum Ditentukan.');
        }  else if (idaccountthrSetup == null || idaccountthrSetup == '')
            {
                Ext.Msg.alert('Failure', 'Akun Pencatatan Beban THR Belum Ditentukan.');
            } else {
                        if (btn == 'yes')
                        {
                            Ext.Ajax.request({
                                url: SITE_URL + 'penggajian/prosesTHR2',
                                method: 'POST', 
                                params: {
                                    periodethr: periodethr,
                                    idunit:Ext.getCmp('unitThr').getValue(),
                                    idaccountpaythrSetup:idaccountpaythrSetup,
                                    idaccountthrSetup:idaccountthrSetup
                                },
                                success: function (res) {
                                    var res = Ext.JSON.decode(res.responseText);
                                    Ext.Msg.alert('Proses THR', res.message);

                                    storeGridemployeeProsesThrGrid.load();
                                    getSummaryThr();
                                },
                                failure: function (res) {
                                    var res = Ext.JSON.decode(res.responseText);
                                    Ext.Msg.alert('Proses THR Gagal', res.message);

                                    storeGridemployeeProsesThrGrid.load();
                                }
                            });
                        }
                }

}

function updateGridThr()
{
    var periodethr = Ext.getCmp('ThrPeriode').getSubmitValue();
    

    if (periodethr == null || periodethr == '')
    {
        Ext.Msg.alert('Failure', 'Periode thr belum ditentukan.');
    } else {
         var idemployee = Ext.getCmp('detailThridemployee').getValue();
        Ext.Ajax.request({
            url: SITE_URL + 'penggajian/updateThrListTmp',
            method: 'POST',
            params: {
                idemployee: idemployee,
                periode: Ext.getCmp('ThrPeriode').getValue(),
                update:true,
                keterangan:Ext.getCmp('keteranganthrtambahan').getValue(),
                kehadiranjam:Ext.getCmp('kehadiranjamthr').getValue(),
                thrtambahan:Ext.getCmp('detailThrGaji').getValue()
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                if (d.success)
                {
                        Ext.getCmp('summaryProsesThr').setValue(d.val);
                        storeGridemployeeProsesThrGrid.load();
                        getSummaryThr();
                } else {
                }

            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }
}