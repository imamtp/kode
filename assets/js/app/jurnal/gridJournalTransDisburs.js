Ext.define('gridJournalTransDisburs', {
    extend: 'Ext.data.Model',
    fields: ['idjournalrec', 'memo'],
    idProperty: 'id'
});

var storegridJournalTransDisburs = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'gridJournalTransDisburs',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/gridJournalTransDisburs/journal',
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

Ext.define('MY.searchgridJournalTransDisburs', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchgridJournalTransDisburs',
    store: storegridJournalTransDisburs,
    width: 180
});

Ext.define('gridJournalTransDisburs', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSetupTax,
    title: 'Pembayaran',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'gridJournalTransDisburs',
    id: 'gridJournalTransDisburs',
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridJournalTransDisburs',
    store: storegridJournalTransDisburs,
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

                        var grid = Ext.ComponentQuery.query('gridJournalTransDisburs')[0];
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


                            Ext.getCmp('windowPopupgridJournalTransDisburs').hide();
                        }



                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchgridJournalTransDisburs',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storegridJournalTransDisburs, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storegridJournalTransDisburs.load();


            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            
        }
    }
});
