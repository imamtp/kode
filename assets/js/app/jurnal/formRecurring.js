var formformRecc = Ext.create('Ext.form.Panel', {
    id: 'formformRecc',
    width: 660,
    height: 330,
    url: SITE_URL + 'backend/saveform/formRecc',
    bodyStyle: 'padding:5px',
//    autoWidth:true,
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
//        padding: '5 40 5 5',
        labelWidth: 120,
        width: 300
    },
//    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [
        {
            xtype: 'textfield',
            anchor: '100%',
            fieldLabel: 'Nama Jurnal',
            name:'memo',
            allowBlank:false
        },
        {
            xtype: 'fieldset',
            height: 215,
            title: 'Penjadwalan',
            items: [
                {
                    xtype: 'radiofield',
                    id:'penjadwalan',
                    name:'penjadwalan',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Terus Menerus', 
                    handler: function() {
                        var penjadwalan = Ext.getCmp('penjadwalan').getValue();
                        if(penjadwalan==true)
                        {
                            Ext.getCmp('startdate').setDisabled(false);
                            Ext.getCmp('recuntildate').setDisabled(false);
                            Ext.getCmp('namefreq').setDisabled(false);
                            Ext.getCmp('recnumtimes').setDisabled(true);
                        }
                    }
                },
                {
                    xtype: 'comboxfrequency',
                    id:'namefreq',
                    name:'namefreq',
                    anchor: '100%',
                    fieldLabel: 'Frekuensi'
                },
                {
                    xtype: 'datefield',
                    id:'startdate',
                    format: 'd/m/Y',
                    name:'startdate',
                    anchor: '100%',
                    width: 576,
                    fieldLabel: 'Tanggal Mulai'
                },
                {
                    xtype: 'datefield',
                    id:'recuntildate',
                    format: 'd/m/Y',
                    name:'recuntildate',
                    anchor: '100%',
                    fieldLabel: 'Tanggal Akhir'
                },
                {
                    xtype: 'radiofield',
                    id:'penjadwalan2',
                    name:'penjadwalan',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Jalankan sampai #', 
                    handler: function() {
                        var penjadwalan = Ext.getCmp('penjadwalan2').getValue();
                        if(penjadwalan==true)
                        {
                            Ext.getCmp('namefreq').setDisabled(true);
                            Ext.getCmp('startdate').setDisabled(true);
                            Ext.getCmp('recuntildate').setDisabled(true);
                            Ext.getCmp('recnumtimes').setDisabled(false);
                        }
                    }
                },
                {
                    xtype: 'numberfield',
                    id:'recnumtimes',
                    name:'recnumtimes',
                    anchor: '100%',
                    fieldLabel: 'Jumlah'
                }
            ]
        },
        {
            xtype: 'fieldset',
            height: 178,
            title: 'Pemberitahuan',
            items: [
                {
                    xtype: 'radiofield',
                    id:'pemberitahuan',
                    name:'pemberitahuan',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Ingatkan kepada', 
                    handler: function() {
                        var pemberitahuan = Ext.getCmp('pemberitahuan').getValue();
                        if(pemberitahuan==true)
                        {
                            Ext.getCmp('notifto').setDisabled(false);
                            Ext.getCmp('alertto').setDisabled(true);
                        }
                    }
                },
                {
                    xtype: 'comboxsys_user',
                    name:'notifto',
                    id:'notifto',
                    anchor: '100%',
                    fieldLabel: ''
                },
                {
                    xtype: 'displayfield',
                    anchor: '100%',
                    fieldLabel: '',
                    value: 'Untuk menjalakan transaksi jurnal'
                },
                {
                    xtype: 'radiofield',
                    id:'pemberitahuan2',
                    name:'pemberitahuan',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Jalankan transaksi jurnal ini secara otomatis dan beritahukan kepada', 
                    handler: function() {
                        var pemberitahuan = Ext.getCmp('pemberitahuan2').getValue();
                        if(pemberitahuan==true)
                        {
                            Ext.getCmp('notifto').setDisabled(true);
                            Ext.getCmp('alertto').setDisabled(false);
                        }
                    }
                },
                {
                    xtype: 'comboxsys_user',
                    name:'alertto',
                    id:'alertto',
                    anchor: '100%',
                    fieldLabel: ''
                }
            ]
        },
        {
            xtype: 'hiddenfield',
            anchor: '100%',
            fieldLabel: 'idjournaltype',
            id: 'idjournaltype',
            name: 'idjournaltype',
            value:1
        },
        {
            xtype: 'hiddenfield',
            anchor: '100%',
            fieldLabel: 'Label',
            name: 'idjournalrec',
            id: 'idjournalrec'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupformRecc');
                Ext.getCmp('formformRecc').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnformReccSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    
                    if(Ext.getCmp('penjadwalan').getValue()==false && Ext.getCmp('penjadwalan2').getValue()==false)
                    {
                        Ext.Msg.alert('Warning', 'Pilih jenis penjadwalan terlebih dahulu');
                    } else if(Ext.getCmp('pemberitahuan').getValue()==false && Ext.getCmp('pemberitahuan2').getValue()==false)
                        {
                            Ext.Msg.alert('Warning', 'Pilih jenis pemberitahuan terlebih dahulu');
                        } else {
                            
                                var json = Ext.encode(Ext.pluck(storeJ.data.items, 'data'));
                    
                                Ext.Ajax.request({
                                    url: SITE_URL + 'journal/saveJournalRec',
                                    method: 'POST',
                                    params: {
                                        totalcredit: Ext.getCmp('totalcredit').getValue(),
                                        totaldebit: Ext.getCmp('totaldebit').getValue(),
        //                                totalpajak: Ext.getCmp('totalpajak').getValue(),
                                        memojurnal: Ext.getCmp('memojurnal').getValue(),
                                        nojurnal: Ext.getCmp('nojurnal').getValue(),
                                        tanggaljurnal: Ext.getCmp('tanggaljurnal').getValue(),
                                        penjadwalan: Ext.getCmp('penjadwalan').getValue(),
                                        namefreq: Ext.getCmp('namefreq').getValue(),
                                        startdate: Ext.getCmp('startdate').getValue(),
                                        recuntildate: Ext.getCmp('recuntildate').getValue(),
                                        penjadwalan2: Ext.getCmp('penjadwalan2').getValue(),
                                        recnumtimes: Ext.getCmp('recnumtimes').getValue(),
                                        pemberitahuan: Ext.getCmp('pemberitahuan').getValue(),
        //                                penjadwalan2: Ext.getCmp('penjadwalan2').getValue(),
                                        notifto: Ext.getCmp('notifto').getValue(),
                                        pemberitahuan2: Ext.getCmp('pemberitahuan2').getValue(),
                                        alertto: Ext.getCmp('alertto').getValue(),
                                        idjournaltype: Ext.getCmp('idjournaltype').getValue(),
                                        idjournalrec: Ext.getCmp('idjournalrec').getValue(),
                                        datagrid: json
                                    },
                                    success: function(form, action) {

                                        var d = Ext.decode(form.responseText);

                                        Ext.Msg.alert('Success', d.message);
                                        Ext.getCmp('windowPopupformRecc').hide();

        //                                Ext.getCmp('totalcredit').setValue(null),
        //                                Ext.getCmp('totaldebit').setValue(null),
        //                                Ext.getCmp('memojurnal').setValue(null),
        //                                Ext.getCmp('nojurnal').setValue(null),
        //                                Ext.getCmp('tanggaljurnal').setValue(null),
        //                                storeJ.removeAll();
        //                                storeJ.sync();
        //                                updateGridJurnal();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                        }
                    
                    
            
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wformRecc = Ext.create('widget.window', {
    id: 'windowPopupformRecc',
    title: 'Simpan Jurnal Berulang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 480,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formformRecc]
});