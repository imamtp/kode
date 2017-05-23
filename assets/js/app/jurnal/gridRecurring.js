Ext.define('GridRecurring', {
    extend: 'Ext.data.Model',
    fields: ['idjournalrec', 'memo'],
    idProperty: 'id'
});

var storeGridRecurring = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRecurring',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/GridRecurring/journal',
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

Ext.define('MY.searchGridRecurring', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRecurring',
    store: storeGridRecurring,
    width: 180
});

Ext.define('GridRecurring', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSetupTax,
//    title: 'Daftar Jurnal Berulang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRecurring',
    id: 'GridRecurring',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRecurring',
    store: storeGridRecurring,
    loadMask: true,
    columns: [
        {header: 'idjournalrec', dataIndex: 'idjournalrec', hidden: true},
        {header: 'memos', dataIndex: 'memo', minWidth: 250, flex: 1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    hidden: true,
                    itemId: 'chooseRecurringPopup',
                    text: 'Pilih journal ini',
                    iconCls: 'add-icon',
                    handler: function() {

                        var grid = Ext.ComponentQuery.query('GridRecurring')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih jurnal terlebih dahulu!');
                        } else {

//                            Ext.getCmp('accnameSetup').setValue(selectedRecord.get('idjournalrec'));
//                            Ext.getCmp('linkedidaccount').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                            selectedRecord.get('idjournalrec');
                            Ext.getCmp('memojurnal').setValue(selectedRecord.get('memo'));

                            Ext.Ajax.request({
                                url: SITE_URL + 'journal/getJournalRecItem',
                                method: 'POST',
                                params: {
                                    idjournalrec: selectedRecord.get('idjournalrec')
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    for (var i = 0; i < d.items.length; i++) {
//                                            console.log(d.items[i].accnumber);

                                        var rec = new JournalStore({
                                            idaccount: d.items[i].idaccount,
                                            accname: d.items[i].accname,
                                            accnumber: d.items[i].accnumber,
                                            debit: d.items[i].debit,
                                            credit: d.items[i].credit
                                                    //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                                        });

                                        var grid = Ext.getCmp('CellEditing');
                                        grid.getStore().insert(0, rec);

                                        updateGridJurnal();

                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });


                            Ext.getCmp('windowPopupGridRecurring').hide();
                        }



                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridRecurring',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRecurring, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRecurring.load();


            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            
        }
    }
});







Ext.define('MainView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.MainView',
    height: 532,
    width: 705,
    layout: {
        type: 'border'
    },
//    title: 'My Panel',


    initComponent: function() {
        var me = this;


        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    animCollapse: false,
                    region: 'center',
                    items: [
                        {
                            xtype: 'GridRecurring',
                            layout: {
                                type: 'fit'
                            },
//                            collapsible: true,
                            flex: 2,
                            split: true,
                            animCollapse: true,
                            collapsible: true,
                            titleCollapse: true,
                            title: 'Daftar Jurnal Berulang',
                            collapseMode: 'header',
                            listeners: {
                                itemclick: function(dv, record, item, index, e) {

                                    var grid = Ext.ComponentQuery.query('GridRecurring')[0];
                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                    var data = grid.getSelectionModel().getSelection();
                                    if (data.length == 0)
                                    {
                                        Ext.Msg.alert('Failure', 'Pilih jurnal terlebih dahulu!');
                                    } else {

                                        selectedRecord.get('idjournalrec');

                                        //griddetail
                                        Ext.getCmp('memojurnalRecDetail').setValue(selectedRecord.get('memo'));
                                        Ext.getCmp('idjournalrecdetail').setValue(selectedRecord.get('idjournalrec'));
                                        //endgriddetail

                                        //hapus dulu      
                                        storeJrec.removeAll();

                                        Ext.Ajax.request({
                                            url: SITE_URL + 'journal/getJournalRecItem',
                                            method: 'POST',
                                            params: {
                                                idjournalrec: selectedRecord.get('idjournalrec')
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                for (var i = 0; i < d.items.length; i++) {
                                                    //                                            console.log(d.items[i].accnumber);

                                                    var rec = new JournalStoreRec({
                                                        idaccount: d.items[i].idaccount,
                                                        accname: d.items[i].accname,
                                                        accnumber: d.items[i].accnumber,
                                                        debit: d.items[i].debit,
                                                        credit: d.items[i].credit
                                                                //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                                                    });

                                                    var grid = Ext.getCmp('gridRecurringDetail');
                                                    grid.getStore().insert(0, rec);

                                                    updateGridJurnal('recurring');

                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                        });
                                        
                                        //isii form penjadwalan
                                        var formRecurringDetail = Ext.getCmp('formRecurringDetail');
                                            formRecurringDetail.getForm().load({
                                                url: SITE_URL + 'backend/loadFormData/gridrecurringdetail/1/journal',
                                                params: {
                                                    extraparams: 'a.idjournalrec:' + Ext.getCmp('idjournalrecdetail').getValue()
                                                },
                                                success: function(form, action) {
                                                    
                                                    if(action.result.data.idscheduletype==1)
                                                    {
                                                        //terus menerus                                
                                                        Ext.getCmp('penjadwalanRecDetail').setValue(true);
                                                        Ext.getCmp('startdateRecDetail').setDisabled(false);
                                                        Ext.getCmp('recuntildateRecDetail').setDisabled(false);
                                                        Ext.getCmp('namefreqRecDetail').setDisabled(false);

                                                        Ext.getCmp('penjadwalan2RecDetail').setValue(false);
                                                        Ext.getCmp('recnumtimesRecDetail').setDisabled(true);
                                                    } else if(action.result.data.idscheduletype==2){
                                                        Ext.getCmp('penjadwalanRecDetail').setValue(false);
                                                        Ext.getCmp('startdateRecDetail').setDisabled(true);
                                                        Ext.getCmp('recuntildateRecDetail').setDisabled(true);
                                                        Ext.getCmp('namefreqRecDetail').setDisabled(true);

                                                        Ext.getCmp('penjadwalan2RecDetail').setValue(true);
                                                        Ext.getCmp('recnumtimesRecDetail').setDisabled(false);
                                                    }
                                                    
                                                     if(action.result.data.idalerttype==1)
                                                    {                                                        
                                                        Ext.getCmp('pemberitahuanRecDetail').setValue(true);
                                                        Ext.getCmp('pemberitahuan2RecDetail').setValue(false);
                                                    } else if(action.result.data.idalerttype==2)
                                                    {
                                                        Ext.getCmp('pemberitahuanRecDetail').setValue(false);
                                                        Ext.getCmp('pemberitahuan2RecDetail').setValue(true);
                                                    }
                                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                                }
                                            });
                    
                    
                                    }
                                },
                                render: {
                                    scope: this,
                                    fn: function(grid) {
                                        storeGridRecurring.load();

                                    }
                                }
                            }
                        },
                        {
                            xtype: 'TabDetailJournalRecc',
                            flex: 3,
                            split: true,
                            animCollapse: true,
                            collapsible: true,
                            title: 'Detail Transaksi Jurnal',
                            titleCollapse: true,
                            collapseMode: 'header',
                            listeners: {
                                activate: function() {
                                    
                                }
                            }
                        }
                    ]
                }
            ]
        });


        me.callParent(arguments);
    }
});

Ext.create('MainView', {
//    renderTo: Ext.getBody()
});
