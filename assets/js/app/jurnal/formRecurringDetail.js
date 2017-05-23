Ext.define('formRecurringDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formRecurringDetail',
    id:'formRecurringDetail',
    autoScroll: true,
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'fieldset',
                    height: 225,
                    title: 'Penjadwalan',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 500,
                            id: 'idjournalrecdetail',
                            name:'idjournal',
                            fieldLabel: 'idjournalrec'
                        },
                        {
                            xtype: 'radiofield',
                            id: 'penjadwalanRecDetail',
                            name: 'penjadwalan',
                            anchor: '100%',
                            fieldLabel: '',
                            boxLabel: 'Terus Menerus',
                            handler: function() {
                                var penjadwalan = Ext.getCmp('penjadwalanRecDetail').getValue();
                                if (penjadwalan == true)
                                {
                                    Ext.getCmp('startdateRecDetail').setDisabled(false);
                                    Ext.getCmp('recuntildateRecDetail').setDisabled(false);
                                    Ext.getCmp('namefreqRecDetail').setDisabled(false);
                                    Ext.getCmp('recnumtimesRecDetail').setDisabled(true);
                                }
                            }
                        },
                        {
                            xtype: 'comboxfrequency',
                            id: 'namefreqRecDetail',
                            name: 'namefreq',
                            anchor: '100%',
                            fieldLabel: 'Frekuensi'
                        },
                        {
                            xtype: 'datefield',
                            id: 'startdateRecDetail',
                            format: 'd/m/Y',
                            name: 'startdate',
                            anchor: '100%',
                            width: 576,
                            fieldLabel: 'Tanggal Mulai'
                        },
                        {
                            xtype: 'datefield',
                            id: 'recuntildateRecDetail',
                            format: 'd/m/Y',
                            name: 'recuntildate',
                            anchor: '100%',
                            fieldLabel: 'Tanggal Akhir'
                        },
                        {
                            xtype: 'radiofield',
                            id: 'penjadwalan2RecDetail',
                            name: 'penjadwalan',
                            anchor: '100%',
                            fieldLabel: '',
                            boxLabel: 'Jalankan sampai #',
                            handler: function() {
                                var penjadwalan = Ext.getCmp('penjadwalan2RecDetail').getValue();
                                if (penjadwalan == true)
                                {
                                    Ext.getCmp('namefreqRecDetail').setDisabled(true);
                                    Ext.getCmp('startdateRecDetail').setDisabled(true);
                                    Ext.getCmp('recuntildateRecDetail').setDisabled(true);
                                    Ext.getCmp('recnumtimesRecDetail').setDisabled(false);
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            id: 'recnumtimesRecDetail',
                            name: 'recnumtimes',
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
                            id: 'pemberitahuanRecDetail',
                            name: 'pemberitahuan',
                            anchor: '100%',
                            fieldLabel: '',
                            boxLabel: 'Ingatkan kepada',
                            handler: function() {
                                var pemberitahuan = Ext.getCmp('pemberitahuanRecDetail').getValue();
                                if (pemberitahuan == true)
                                {
                                    Ext.getCmp('notiftoRecDetail').setDisabled(false);
                                    Ext.getCmp('alerttoRecDetail').setDisabled(true);
                                }
                            }
                        },
                        {
                            xtype: 'comboxsys_user',
                            name: 'notifto',
                            id: 'notiftoRecDetail',
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
                            id: 'pemberitahuan2RecDetail',
                            name: 'pemberitahuan',
                            anchor: '100%',
                            fieldLabel: '',
                            boxLabel: 'Jalankan transaksi jurnal ini secara otomatis dan beritahukan kepada',
                            handler: function() {
                                var pemberitahuan = Ext.getCmp('pemberitahuan2RecDetail').getValue();
                                if (pemberitahuan == true)
                                {
                                    Ext.getCmp('notiftoRecDetail').setDisabled(true);
                                    Ext.getCmp('alerttoRecDetail').setDisabled(false);
                                }
                            }
                        },
                        {
                            xtype: 'comboxsys_user',
                            name: 'alertto',
                            id: 'alerttoRecDetail',
                            anchor: '100%',
                            fieldLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'hiddenfield',
                    anchor: '100%',
                    fieldLabel: 'idjournaltype',
                    id: 'idjournaltypeRecDetail',
                    name: 'idjournaltype',
                    value: 1
                },
                {
                    xtype: 'hiddenfield',
                    anchor: '100%',
                    fieldLabel: 'Label',
                    name: 'idjournalrec',
                    id: 'idjournalrecRecDetail'
                }
            ]
        }
    ]
});