Ext.create(dir_sys + 'money.GridDataJurnal');

var storeGridDataJurnalDetil = Ext.getCmp('GridDataJurnalID').getStore();

Ext.define('storeGridJurnalModel', {
    extend: 'Ext.data.Model',
    fields: ['accname', 'accnumber', 'id', 'text', 'idjournal', 'namejournal', 'nojournal', 'datejournal', 'memo', 'totaldebit', 'totalcredit', 'year', 'month'],
    idProperty: 'id'
});
var storeGridJurnal = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridJurnalModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/jurnal/money',
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
storeGridJurnal.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
        'extraparams': 'a.idunit:' + Ext.getCmp('idunitJGeneral').getValue()+','+ 'a.idjournaltype:'+ Ext.getCmp('idjournaltype').getValue()
    }
});
Ext.define('MY.searchGridJurnal', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridJurnal',
    store: storeGridJurnal,
    width: 180
});
Ext.define('GridJurnal', {
    // itemId: 'GridJurnalID',
    // multiSelect:true,
    title:'Jurnal',
    id: 'GridJurnalID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridJurnal',
    store: storeGridJurnal,
    loadMask: true,
    columns: [
       {
            header: 'idjournal',
            dataIndex: 'idjournal',
            hidden: true
        },
        {
            header: 'Tanggal',
            dataIndex: 'datejournal',
            minWidth: 130
        },
        {
            header: 'No Ref',
            dataIndex: 'nojournal',
            minWidth: 130
        }, {
            header: 'Memo',
            flex:1,
            dataIndex: 'memo',
            minWidth: 300
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                            xtype: 'datefield',
                            id: 'startdateJGeneral',
                            format: 'd-m-Y',
                            fieldLabel: 'Tgl Mulai',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    if (Ext.getCmp('startdateJGeneral').getValue() != null && Ext.getCmp('enddateJGeneral').getValue() != null)
                                    {
                                        storeGridJurnal.load({
                                            params: {
                                                'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                                // 'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                                // 'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                                'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                                'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                            }
                                        });

                                        getSummary(Ext.getCmp('startdateJGeneral').getValue(), Ext.getCmp('enddateJGeneral').getValue());
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 30,
                            id: 'enddateJGeneral',
                            format: 'd-m-Y',
                            fieldLabel: 's/d',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    if (Ext.getCmp('startdateJGeneral').getValue() != null && Ext.getCmp('enddateJGeneral').getValue() != null)
                                    {
                                        storeGridJurnal.load({
                                            params: {
                                                'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                                // 'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                                // 'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                                'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                                'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                            }
                                        });

                                        getSummary(Ext.getCmp('startdateJGeneral').getValue(), Ext.getCmp('enddateJGeneral').getValue());
                                    }
                                }
                            }
                        },
                        '->',
                        //  {
                        //     xtype: 'comboxSearchJ',
                        //     width: 100,
                        //     id: 'tipeSearchJGeneral',
                        //     listeners: {
                        //         'change': function(field, newValue, oldValue) {
                        //             storeGridJurnal.load({
                        //                 params: {
                        //                     'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                        //                     'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                        //                     'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                        //                     'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                        //                     'enddate': Ext.getCmp('enddateJGeneral').getValue()
                        //                 }
                        //             });
                        //             getSummary();
                        //         }
                        //     }
                        // },
                        // {
                        //     xtype: 'textfield',
                        //     emptyText: 'Cari memo/akun...',
                        //     id: 'searchAccJGeneral',
                        //     listeners: {
                        //         specialkey: function(f, e) {
                        //             console.log(e.getKey())
                        //             if (e.getKey() == e.ENTER) {
                        //                 storeGridJurnal.load({
                        //                     params: {
                        //                         'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                        //                         'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                        //                         // 'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                        //                         'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                        //                         'enddate': Ext.getCmp('enddateJGeneral').getValue()
                        //                     }
                        //                 });

                        //                 getSummary();
                        //             }
                        //         }
                        //     }
                        // }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                            xtype: 'comboxunit',
                            id: 'idunitJGeneral',
                            valueField: 'idunit',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    storeGridJurnal.load({
                                        params: {
                                            'idunit': Ext.getCmp('idunitJGeneral').getValue(),
                                            'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                            // 'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                            // 'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                            'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                            'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                        }
                                    });
                                    getSummary();
                                }
                            }
                        },
                        {
                            xtype: 'comboxjournaltype',
                            id: 'idjournaltype',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    storeGridJurnal.load({
                                        params: {
                                            'idunit': Ext.getCmp('idunitJGeneral').getValue(),
                                            'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                            // 'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                            // 'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                            'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                            'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                        }
                                    });
                                    getSummary();
                                }
                            }
                        }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            // 'Pencarian: ', 
            {
                xtype: 'searchGridJurnal',
                fieldLabel:'Pencarian',
                labelWidth: 100,
                width:450,
                text: 'Left Button',
            },
//             {
//                             itemId: 'reloadDataJGeneral',
//                             text: 'Reset',
//                             iconCls: 'refresh',
//                             handler: function() {


//                                 Ext.getCmp('idunitJGeneral').setValue(null)
//                                 Ext.getCmp('searchAccJGeneral').setValue(null)
//                                 Ext.getCmp('GridJGeneral').expandAll();
//                                 Ext.getCmp('startdateJGeneral').setValue(null)
//                                 Ext.getCmp('enddateJGeneral').setValue(null)
//                                 Ext.getCmp('idjournaltype').setValue(null)

//                                 var grid = Ext.getCmp('GridJGeneral');
//                                 storeGridJurnal.reload();
                                                                
// //                                storeGridJurnal.load({
// //                                    params: {
// //                                        'idunit': Ext.getCmp('idunitJGeneral').getValue(),
// //                                        'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
// //                                        'accname': Ext.getCmp('searchAccJGeneral').getValue(),
// //                                        'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
// //                                        'startdate': Ext.getCmp('startdateJGeneral').getValue(),
// //                                        'enddate': Ext.getCmp('enddateJGeneral').getValue()
// //                                    }
// //                                });

// //                                getSummary();
//                             }
                        // }
        // {
        //     itemId: 'prosesGridDataJurnal',
        //     id: 'prosesGridDataJurnal',
        //     text: 'Hapus Gaji',
        //     iconCls: 'delete-icon',
        //     //                    disabled: true,
        //     handler: function(btn) {
        //         var grid = Ext.ComponentQuery.query('GridJurnal')[0];
        //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //         var data = grid.getSelectionModel().getSelection();
        //         if (data.length == 0) {
        //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        //         } else {
        //             Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk menghapus gaji terpilih', hapusGajiBtn);
        //         }
        //     }
        // }
        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridJurnal, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridJurnal.load();
                tahunPayrollStore.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {
            Ext.getCmp('displayNoJurnal').setValue(record.data.nojournal);
            storeGridDataJurnalDetil.on('beforeload', function (store, operation, eOpts) {
                operation.params = {
                    // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
                    'extraparams': 'a.idjournal:' + record.data.idjournal
                }
            });
            storeGridDataJurnalDetil.load();
            Ext.getCmp('GridDataJurnalID').setTitle(record.data.memo);
          
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
Ext.define(dir_sys + 'money.PortJournal', {
    extend: 'Ext.Panel',
    alias: 'widget.PortJournal',
    layout: 'border',
    defaults: {},
    items: [{
        region: 'east',
        flex: 1,
        // bodyStyle:'padding:1px 1px 1px 5px;',
        // bodyStyle:'pad',
        // border:1,
        split: true,
        xtype: 'GridDataJurnal'
    },
    {
        region: 'center',
        // minWidth:400,
        // flex: 1.2,
        // split: true,
        xtype: 'GridJurnal'
    }]
});

