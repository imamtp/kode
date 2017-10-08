

Ext.define('GridJGeneral', {
    extend: 'Ext.data.Model',
    fields: ['accname', 'accnumber', 'id', 'text', 'idjournal', 'namejournal', 'nojournal', 'datejournal', 'memo', 'totaldebit', 'totalcredit', 'year', 'month']
});

var storeGridJGeneral = new Ext.data.TreeStore({
    model: 'GridJGeneral',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'journal/getJournal/'
    },
    root: {
        text: ' ',
        id: '0'
    }
    , folderSort: true
//    ,autoLoad:false
});


Ext.define('GridJGeneral', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridJGeneral',
    id: 'GridJGeneral',
    xtype: 'tree-grid',
    title: 'Daftar Jurnal',
    height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: false,
    loadMask: true,
    enableColumnResize: true,
    rowLines: true,
    viewConfig: {
        stripeRows: false,
        getRowClass: function(record) {

            if (record.get('text') !='')
            {
                return 'journal-row';
            } else {
                return null;
            }
        }
    },
    initComponent: function() {
        this.width = 600;

        Ext.apply(this, {
            store: storeGridJGeneral,
            columns: [
//                 {
//                     xtype: 'actioncolumn',
//                     width: 20,
//                     renderer: function(value, metadata, record) {
                        
//                         if (record.get('text') !== '') {
//                             this.items[0].icon = BASE_URL + 'assets/icons/fam/pencil.png';
//                             this.items[0].tooltip = 'Edit';
//                         } else {
//                             this.items[0].icon = '';
//                             this.items[0].tooltip = '';
//                         }
//                     },
//                     items: [{
// //                        icon: BASE_URL + 'assets/icons/fam/pencil.png',    
//                             tooltip: 'Edit',
//                             handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
//                                 console.log(record)
//                                 var form = Ext.getCmp('formAccount');
//                                 wAccount.show();
//                                 form.load({
//                                     url: SITE_URL + 'account/loaddata/' + record.get('id'),
//                                     //                    params: {
//                                     //                        extraparams: 'a.idinventory:' + record.data.idinventory
//                                     //                    },
//                                     success: function(form, action) {
//                                         var d = Ext.decode(action.response.responseText);
//                                         //                        console.log(d.data.id);
//                                         Ext.getCmp('prefixno').setValue(d.data.prefixno);
//                                         if (d.data.active == 't')
//                                         {
//                                             Ext.getCmp('activeAcc').setValue(true);
//                                         } else {
//                                             Ext.getCmp('activeAcc').setValue(false);
//                                         }

//                                         //                        console.log(d.data.id);

//                                         if (d.data.id != 0)
//                                         {
//                                             Ext.getCmp('classname').setReadOnly(true);
//                                         } else {
//                                             Ext.getCmp('classname').setReadOnly(false);
//                                         }
//                                         // Ext.Msg.alert("Load failed", action.result.errorMessage);activeAcc
//                                     },
//                                     failure: function(form, action) {
//                                         Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                     }
//                                 })
//                                 Ext.getCmp('stateformacc').setValue('edit');

//                             }
//                         }]
//                 },
                {
                    xtype: 'treecolumn',
                    text: 'Tanggal',
                    minWidth: 150,
                    sortable: true,
                    dataIndex: 'datejournal'
                }, {
                    xtype: 'treecolumn',
                    text: 'No Ref/No Akun',
                    minWidth: 150,
                    sortable: true,
                    dataIndex: 'nojournal'
                }, {
                    xtype: 'treecolumn',
                    text: 'Memo/Akun',
                    minWidth: 250,
                    sortable: true,
                    flex: 1,
                    dataIndex: 'memo'
                },
                {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Debit',
                    minWidth: 150,
                    sortable: true,
                    dataIndex: 'totaldebit'
                }, {
                    xtype: 'numbercolumn',
                    align: 'right',
                    text: 'Kredit',
                    minWidth: 150,
                    sortable: true,
                    dataIndex: 'totalcredit'
                }
            ]
            , dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxunit',
                            id: 'idunitJGeneral',
                            valueField: 'idunit',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    storeGridJGeneral.load({
                                        params: {
                                            'idunit': Ext.getCmp('idunitJGeneral').getValue(),
                                            'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                            'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                            'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
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
                                    storeGridJGeneral.load({
                                        params: {
                                            'idunit': Ext.getCmp('idunitJGeneral').getValue(),
                                            'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                            'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                            'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                            'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                            'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                        }
                                    });
                                    getSummary();

//                                    if(Ext.getCmp('idjournaltype').getValue()==1)
//                                    {
//                                        transname = 'Jurnal Umum';
//                                    } else if(Ext.getCmp('idjournaltype').getValue()==2)
//                                    {
//                                        transname = 'Jurnal Pembayaran';
//                                    } else if(Ext.getCmp('idjournaltype').getValue()==3)
//                                    {
//                                        transname = 'Jurnal Penjualan';
//                                    } else if(Ext.getCmp('idjournaltype').getValue()==4)
//                                    {
//                                        transname = 'Jurnal Pembelian';
//                                    } else if(Ext.getCmp('idjournaltype').getValue()==5)
//                                    {
//                                        transname = 'Jurnal Persediaan';
//                                    }
//                                    Ext.getCmp('GridJGeneral').setTitle('Daftar Jurnal Transaksi '+transname);
                                }
                            }
                        }
                    ]
                }, {
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
                                        storeGridJGeneral.load({
                                            params: {
                                                'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                                'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                                'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
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
                                        storeGridJGeneral.load({
                                            params: {
                                                'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                                'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                                'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                                'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                                'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                            }
                                        });

                                        getSummary(Ext.getCmp('startdateJGeneral').getValue(), Ext.getCmp('enddateJGeneral').getValue());
                                    }
                                }
                            }
                        }, '-',
                        {
                            itemId: 'reloadDataJGeneral',
                            text: 'Reset',
                            iconCls: 'refresh',
                            handler: function() {


                                Ext.getCmp('idunitJGeneral').setValue(null)
                                Ext.getCmp('searchAccJGeneral').setValue(null)
                                Ext.getCmp('GridJGeneral').expandAll();
                                Ext.getCmp('startdateJGeneral').setValue(null)
                                Ext.getCmp('enddateJGeneral').setValue(null)
                                Ext.getCmp('idjournaltype').setValue(null)

                                var grid = Ext.getCmp('GridJGeneral');
                                storeGridJGeneral.reload();
                                                                
//                                storeGridJGeneral.load({
//                                    params: {
//                                        'idunit': Ext.getCmp('idunitJGeneral').getValue(),
//                                        'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
//                                        'accname': Ext.getCmp('searchAccJGeneral').getValue(),
//                                        'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
//                                        'startdate': Ext.getCmp('startdateJGeneral').getValue(),
//                                        'enddate': Ext.getCmp('enddateJGeneral').getValue()
//                                    }
//                                });

//                                getSummary();
                            }
                        },
                        '->', {
                            xtype: 'comboxSearchJ',
                            width: 100,
                            id: 'tipeSearchJGeneral',
                            listeners: {
                                'change': function(field, newValue, oldValue) {
                                    storeGridJGeneral.load({
                                        params: {
                                            'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                            'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                            'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                            'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                            'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                        }
                                    });
                                    getSummary();
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Cari memo/akun...',
                            id: 'searchAccJGeneral',
                            listeners: {
                                specialkey: function(f, e) {
                                    console.log(e.getKey())
                                    if (e.getKey() == e.ENTER) {
                                        storeGridJGeneral.load({
                                            params: {
                                                'idjournaltype': Ext.getCmp('idjournaltype').getValue(),
                                                'accname': Ext.getCmp('searchAccJGeneral').getValue(),
                                                'tipeSearchJGeneral': Ext.getCmp('tipeSearchJGeneral').getValue(),
                                                'startdate': Ext.getCmp('startdateJGeneral').getValue(),
                                                'enddate': Ext.getCmp('enddateJGeneral').getValue()
                                            }
                                        });

                                        getSummary();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                               text: 'Entry Jurnal',
                               iconCls: 'add-icon',
                               handler: function() {
                                wEntryJurnal.show();
                               }
                           }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->', '<b>Out of Balance &nbsp;</b>',
                        {
                            xtype: 'textfield',
                            width: 150,
                            id: 'selisihJGeneral',
                            readOnly: true,
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            id: 'buttonJGeneralExpand',
//                            width:100,
                            handler: function(button, event) {
                                Ext.getCmp('GridJGeneral').expandAll();
                            },
                            text: 'Expand'
                        }, {
                            xtype: 'button',
                            id: 'buttonJGeneralCollapse',
                            handler: function(button, event) {
                                Ext.getCmp('GridJGeneral').collapseAll();
                            },
                            text: 'Collapse'
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'totaldebitJGeneral',
                            width: 150,
                            readOnly: true,
//                            fieldLabel: 'Total Debit',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            id: 'totalcreditJGeneral',
                            width: 150,
                            readOnly: true,
//                            fieldLabel: 'Total Kredit',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
//                        storeGridRecurring.load();
                        getSummary();
                        disableUnitJournal();
                    }
                }
            }
        });
        this.callParent();
    }
});

function getSummary(startdate, enddate)
{
    Ext.Ajax.request({
        url: SITE_URL + 'journal/getSummary',
        method: 'POST',
        params: {
            idunit: Ext.getCmp('idunitJGeneral').getValue(),
            startdate: startdate,
            enddate: enddate,
            idjournaltype: Ext.getCmp('idjournaltype').getValue()
        },
        success: function(form, action) {

            var d = Ext.decode(form.responseText);
            // Ext.getCmp('totaldebitJGeneral').setValue(d.totaldebit);
            // Ext.getCmp('totalcreditJGeneral').setValue(d.totalcredit);
            // Ext.getCmp('selisihJGeneral').setValue(d.selisih);

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}
