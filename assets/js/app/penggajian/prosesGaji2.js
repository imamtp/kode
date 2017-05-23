
Ext.define('tabPembayaranProsesGaji', {
    // itemId: 'rTabPanelProsesGaji',
    id: 'tabPembayaranProsesGaji',
    extend: 'Ext.form.Panel',
    alias: 'widget.tabPembayaranProsesGaji',
    title:'Pembayaran',
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
            id:'detailPayrollidemployee'
        },{
            xtype:'hiddenfield',
            id:'detailPayrollpayrolltypeid'
        },{
            xtype:'displayfield',
            fieldLabel: 'Jenis Pembayaran',
            id:'detailPayrollPayname'
        },
        {
            xtype:'displayfield',
            fieldLabel: 'Gaji',
            align:'right',
            // readOnly:true,
            id:'detailPayrollGaji'
     },{
            xtype:'numberfield',
            hidden:true,
            fieldLabel: 'jam/kehadiran',
            id:'detailPayrollJamKehadiran',
            listeners: {
                change: function(field, value) {
                    var idemployee = Ext.getCmp('detailPayrollidemployee').getValue();
                    Ext.Ajax.request({
                        url: SITE_URL + 'penggajian/updatePayrollListTmp',
                        method: 'POST',
                        params: {
                            idemployee: idemployee,
                            periode: Ext.getCmp('payrollPeriode').getValue(),
                            numjamkehadiran: value,
                            payrolltypeid:Ext.getCmp('detailPayrollpayrolltypeid').getValue()
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            if (d.success)
                            {
                                    Ext.getCmp('summaryProsesGaji').setValue(d.val);
                                    storeGridemployeeProsesGajiGrid.load();
                                    getSummaryPayroll();
                            } else {
                            }

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                }
            }
     }]
});

Ext.define('tabTunjanganProsesGaji', {
    // itemId: 'rTabPanelProsesGaji',
    id: 'tabTunjanganProsesGaji',
    extend: 'Ext.form.Panel',
    alias: 'widget.tabTunjanganProsesGaji',
    title:'Tunjangan',
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
            xtype:'textfield',
            fieldLabel: 'Nama Lengkap',
            allowBlank:false,
            name: 'firstname'
        },{
            xtype:'textfield',
            fieldLabel: 'Nama Panggilan',
            allowBlank:false,
            name: 'lastname'
     }],
     buttons: [
          {
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formemployeeGrid').getForm().reset();
                            Ext.getCmp('windowPopupemployeeGrid').hide();

                            storeGridemployeeGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //                            storeGridemployeeGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

Ext.define('tabPotonganProsesGaji', {
    // itemId: 'rTabPanelProsesGaji',
    id: 'tabPotonganProsesGaji',
    extend: 'Ext.form.Panel',
    alias: 'widget.tabPotonganProsesGaji',
    title:'Potongan',
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
            xtype:'textfield',
            fieldLabel: 'Nama Lengkap',
            allowBlank:false,
            name: 'firstname'
        },{
            xtype:'textfield',
            fieldLabel: 'Nama Panggilan',
            allowBlank:false,
            name: 'lastname'
     }],
     buttons: [
          {
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formemployeeGrid').getForm().reset();
                            Ext.getCmp('windowPopupemployeeGrid').hide();

                            storeGridemployeeGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //                            storeGridemployeeGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});



Ext.define('MY.searchGridemployeeProsesGajiGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridemployeeProsesGajiGrid',
    store: storeGridemployeeProsesGajiGrid,
    width: 180
});

Ext.define('GridemployeeProsesGajiGrid', {
    // itemId: 'GridemployeeProsesGajiGridID',
    multiSelect:true,
    id: 'GridemployeeProsesGajiGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridemployeeProsesGajiGrid',
    store: storeGridemployeeProsesGajiGrid,
    loadMask: true,
    columns: [
        {header: 'idemployee', dataIndex: 'idemployee', hidden: true},  
        {header: 'idemployeetype', dataIndex: 'idemployeetype', hidden: true},  
        {header: 'payrolltypeid', dataIndex: 'payrolltypeid', hidden: true},
        {header: 'pembayaranperjamkehadiran', dataIndex: 'pembayaranperjamkehadiran', hidden: true},          
        {header: 'NIP', dataIndex: 'code', minWidth: 150},     
        // {header: 'Nama Depan', dataIndex: 'firstname', minWidth: 150},
        {header: 'Nama', dataIndex: 'lastname', minWidth: 150},
        // {header: 'Unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'Jenis Pegawai', dataIndex: 'nametype', minWidth: 150},
        {header: 'Jenis Pembayaran', dataIndex: 'payname', minWidth: 150},   
        {header: 'Jumlah Jam', dataIndex: 'jumlahjam', minWidth: 150,align:'right'},     
        {header: 'Jumlah Kehadiran', dataIndex: 'jumlahkehadiran', minWidth: 150,align:'right'},     
        {header: 'Gaji', dataIndex: 'totalgaji', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Penambahan gaji', dataIndex: 'penambahangaji', minWidth: 150, xtype:'numbercolumn',align:'right'},        
        {header: 'Total Tunjangan', dataIndex: 'totaltunjangan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'PPH21', dataIndex: 'pph21', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'Total Potongan', dataIndex: 'totalpotongan', minWidth: 150, xtype:'numbercolumn',align:'right'},
        {header: 'total pembayaran', dataIndex: 'totalpembayaran', minWidth: 150, xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                    {
                        xtype: 'datefield',
                        id: 'payrollPeriode',
                        format: 'd-m-Y',
                        fieldLabel:'Periode Penggajian',
                        labelWidth: 120,
                    },'->',{
                        xtype: 'hiddenfield',
                        name: 'idaccount',
                        id: 'idaccountPayrollKas'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Akun Kas Pembayaran Gaji',
                        labelWidth: 180,
                        allowBlank: false,
                        name: 'accnamekas',
                        id: 'accnamePayrollKas',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    var idunit = Ext.getCmp('unitPayroll').getValue();
                                    if(idunit==null)
                                    {
                                        Ext.Msg.alert('Info', 'Unit Belum Dipilih');
                                    } else {
                                        wAccKasListPayroll.show();
                                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                            operation.params={
                                                        'idunit': idunit,
                                                        'idaccounttype': '1,19'
                                            };
                                        });
                                        storeGridAccount.load();
                                    // storeAccountAktive.load();
                                     // storeAccountAktive.load({
                                     //                            params: {
                                     //                                'idunit': idunit,
                                     //                                'idaccounttype': '19,17,1,11,5,4,21,3'
                                     //                            }
                                     //                        });
                                    }
                                    
                                });
                            }
                        }
                    }
                ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                        xtype: 'comboxunit',
                        labelWidth: 120,
                        valueField:'idunit',
                        id: 'unitPayroll'
                    },'->',{
                        xtype: 'hiddenfield',
                        name: 'idaccountpayroll',
                        id: 'idaccountPayroll'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Akun Pencatatan Beban Gaji',
                        allowBlank: false,
                        labelWidth: 180,
                        name: 'accnamepayroll',
                        id: 'accnamePayroll',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    // windowPopupAccListPayroll.show();
                                    // storeAccountAktive.load({
                                    //         params: {
                                    //             'idunit': Ext.getCmp('unitPayroll').getValue(),
                                    //             'idaccounttype': '14,15'
                                    //         }
                                    //     });
                                        wAccListPayroll.show();
                                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                            operation.params={
                                                       'idunit': Ext.getCmp('unitPayroll').getValue(),
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
                         
                         var periode = Ext.getCmp('payrollPeriode').getValue();
                         var unitPayroll = Ext.getCmp('unitPayroll').getValue();
                         if(periode==null)
                         {
                            Ext.Msg.alert('Info', 'Periode Penggajian Belum Dipilih');
                         } else if(unitPayroll==null)
                         {
                            Ext.Msg.alert('Info', 'Unit Belum Dipilih');
                         } else {
                            wPilihPegawaiPayroll.show();
                            storeGridPilihPegawaiPayrollGrid.load({
                               params: {
                                   'periode':periode,
                                   'idunit':unitPayroll
                               }
                           });
                         }
                         
                    }
                },
                {
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                         getSummaryPayroll();
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
                                    var grid = Ext.ComponentQuery.query('GridemployeeProsesGajiGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'penggajian/deletePayrollTmpBtn',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                           storeGridemployeeProsesGajiGrid.load();
                                           getSummaryPayroll();
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
                    xtype: 'searchGridemployeeProsesGajiGrid',
                    text: 'Left Button'
                }

            ]
        },{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            {
                    xtype: 'displayfield',
                    id:'summaryProsesGaji',
                    labelWidth:100,
                    fieldLabel:'Rekapitulasi',
                    value:'<div align=left>Total Pegawai Terpilih: <br> Total Tunjangan: <br> Total Potongan: <br> <br>Total Pembayaran Gaji: </left>'
                }
                ,'->',
                {
                    xtype: 'button',
                    text: 'Proses Gaji',
                    scale   : 'large',
                    handler: function() {
                       Ext.MessageBox.confirm('Konfirmasi','Apakah anda yakin untuk memproses gaji', prosesGajiBtn2);
                    }
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridemployeeProsesGajiGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridemployeeProsesGajiGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
           console.log(record.data.payname)
           Ext.getCmp('detailPayrollPayname').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+record.data.payname);
           
           Ext.getCmp('detailPayrollidemployee').setValue(record.data.idemployee);

           Ext.getCmp('TabPortDetailPayroll').setTitle('Detail Penggajian '+record.data.firstname+' '+record.data.lastname)
           
           Ext.util.Format.thousandSeparator = '.';
            Ext.util.Format.decimalSeparator = '.';

           if(record.data.payrolltypeid==1)
           {
            Ext.getCmp('detailPayrollJamKehadiran').show();
            Ext.getCmp('detailPayrollJamKehadiran').setFieldLabel('Jumlah Jam');
            Ext.getCmp('detailPayrollGaji').setFieldLabel('Pembayaran/Jam');            
            Ext.getCmp('detailPayrollJamKehadiran').setValue(record.data.jumlahjam);
            Ext.getCmp('detailPayrollGaji').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+Ext.util.Format.number(record.data.pembayaranperjamkehadiran, '0,000'));
           } else if(record.data.payrolltypeid==2)
               {
                Ext.getCmp('detailPayrollJamKehadiran').show();
                Ext.getCmp('detailPayrollJamKehadiran').setFieldLabel('Jumlah Kehadiran');
                Ext.getCmp('detailPayrollGaji').setFieldLabel('Pembayaran/Kehadiran');   
                Ext.getCmp('detailPayrollJamKehadiran').setValue(record.data.jumlahkehadiran);
                Ext.getCmp('detailPayrollGaji').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+Ext.util.Format.number(record.data.pembayaranperjamkehadiran, '0,000'));
               }  else {
                        Ext.getCmp('detailPayrollJamKehadiran').hide();
                        Ext.getCmp('detailPayrollGaji').setFieldLabel('Pembayaran Gaji');   
                        Ext.getCmp('detailPayrollGaji').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+Ext.util.Format.number(record.data.totalgaji, '0,000'));
                   }
           
          storeGridTunjanganPayrollGrid.load({
               params: {
                   'extraparams': 'a.idemployee:' + record.data.idemployee
               }
           });

          storeGridPotonganPayrollGrid.load({
               params: {
                   'extraparams': 'a.idemployee:' + record.data.idemployee
               }
           });
            // storePayrollHistoryGrid.on('beforeload', function (store, operation, eOpts) {
            //     operation.params = {
            //         'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
            //         'extraparams': 'a.idemployeeProsesGaji:' + record.data.idemployeeProsesGaji
            //     }
            // });
            // storePayrollHistoryGrid.load();
//            storePayrollHistoryGrid.load({
//                            params: {
//                                'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
//                                'extraparams': 'a.idemployeeProsesGaji:' + record.data.idemployeeProsesGaji
//                            }
//                        });
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//             var formemployeeProsesGajiGrid = Ext.getCmp('formemployeeProsesGajiGrid');
//             wemployeeProsesGajiGrid.show();

//             formemployeeProsesGajiGrid.getForm().load({
//                 url: SITE_URL + 'backend/loadFormData/employeeProsesGajiGrid/1',
//                 params: {
//                     extraparams: 'a.idemployeeProsesGaji:' + record.data.idemployeeProsesGaji
//                 },
//                 success: function(form, action) {
//                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 },
//                 failure: function(form, action) {
//                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 }
//             })

//             dataGaji(record.data.idemployeeProsesGaji)
// //            Ext.getCmp('kddaerahS').setReadOnly(true);
//             Ext.getCmp('statusformemployeeProsesGajiGrid').setValue('edit');
        }
    }
});

Ext.define('TabPortDetailPayroll', {
    extend: 'Ext.tab.Panel',
    id: 'TabPortDetailPayroll',
    alias: 'widget.TabPortDetailPayroll',
    title:'Detail Penggajian',
    activeTab: 0,
    autoWidth: '100%',
    items: [
        {
            xtype: 'tabPembayaranProsesGaji'
        },
        {
            xtype: 'GridTunjanganPayrollGrid'
        },
        {
            xtype: 'GridPotonganPayrollGrid'
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

Ext.define('PortProsesGaji', {
    extend: 'Ext.Panel',
    alias: 'widget.PortProsesGaji',
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
        xtype:'TabPortDetailPayroll'
//        html: 'Footer content'
    },
    // formDetailGaji,
    // {
    //     xtype:'rTabPanelProsesGaji'
    // },
    // rTabPanelProsesGaji,
//     {
//         region: 'south',
//         flex: 2,
// //        minHeight: heightPort,
//         xtype:'TabPortDetailGaji'
// //        html: 'Footer content'
//     }, 
    {
        title: 'Daftar Pegawai Yang Akan Diproses Gajinya',
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
            height:sizeH+30,
            // minHeight: heightPort-500*1,
            xtype: 'GridemployeeProsesGajiGrid'
        }
        ]
    }
    ]
});


function prosesGajiBtn2(btn) {
    var periodepenggajian = Ext.getCmp('payrollPeriode').getSubmitValue();
    var idaccountPayrollKas = Ext.getCmp('idaccountPayrollKas').getValue();
    var idaccountPayroll = Ext.getCmp('idaccountPayroll').getValue();

    if (periodepenggajian == null || periodepenggajian == '')
    {
        Ext.Msg.alert('Failure', 'Periode penggajian belum ditentukan.');
    } else if (idaccountPayrollKas == null || idaccountPayrollKas == '')
    {
        Ext.Msg.alert('Failure', 'Akun Kas Pembayaran Gaji Belum Ditentukan.');
    } else if (idaccountPayroll == null || idaccountPayroll == '')
    {
        Ext.Msg.alert('Failure', 'Akun Beban Pencatatan Gaji Belum Ditentukan.');
    } else {
            if (btn == 'yes')
            {
                Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/proses2',
                    method: 'POST', 
                    params: {
                        periodepenggajian: periodepenggajian,
                        idunit:Ext.getCmp('unitPayroll').getValue(),
                        idaccountPayrollKas:idaccountPayrollKas,
                        idaccountPayroll:idaccountPayroll
                    },
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        Ext.Msg.alert('Proses Gaji', res.message);

                        storeGridemployeeProsesGajiGrid.load();
                        getSummaryPayroll();
                    },
                    failure: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        Ext.Msg.alert('Proses Gaji Gagal', res.message);

                        storeGridemployeeProsesGajiGrid.load();
                    }
                });
            }
    }

}