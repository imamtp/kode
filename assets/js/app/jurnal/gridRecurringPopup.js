Ext.define('GridRecurringPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idjournalrec','memo'],
    idProperty: 'id'
});

var storeGridRecurringPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRecurringPopupModel',
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

Ext.define('MY.searchGridRecurringPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRecurringPopup',
    store: storeGridRecurringPopup,
    width: 180
});

Ext.define('GridRecurringPopup', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridSetupTax,
//    title: 'Daftar Jurnal Berulang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRecurringPopup',
    id: 'GridRecurringPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRecurringPopup',
    store: storeGridRecurringPopup,
    loadMask: true,
    columns: [
        {header: 'idjournalrec', dataIndex: 'idjournalrec', hidden: true},
        {header: 'memo', dataIndex: 'memo', minWidth: 250,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseRecurringPopup',
                    text: 'Pilih journal ini',
                    iconCls: 'add-icon',
                    handler: function() {
                        
                        var grid = Ext.ComponentQuery.query('GridRecurringPopup')[0];
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
                                        for (var i=0; i<d.items.length; i++) {
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

                                            updateGridJurnal('general');

                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                            });
                                
//                            var rec = new JournalStore({
//                                idaccount: Ext.getCmp('idaccountjurnal').getValue(),
//                                accname: Ext.getCmp('accnamejurnal').getValue(),
//                                accnumber: Ext.getCmp('accnumberjurnal').getValue(),
//                                debit: Ext.getCmp('debitjurnal').getValue(),
//                                credit: Ext.getCmp('kreditjurnal').getValue()
//        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
//                            });
//
//                            var grid = Ext.getCmp('CellEditing');
//                            grid.getStore().insert(0, rec);
//
                            
                            Ext.getCmp('windowPopupGridRecurringPopup').hide();
                        }
                        
                        
                    
                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridRecurringPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRecurringPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRecurringPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var gridRecurringPopup = Ext.getCmp('gridRecurringPopup');
//            wGridRecurringPopup.show();
//
//            gridRecurringPopup.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/gridRecurringPopup/1/journal',
//                params: {
//                    extraparams: 'a.idjournalrec:' + record.data.idjournalrec
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformSetupTax').setValue('edit');
        }
    }
});

var wGridRecurringPopup = Ext.create('widget.window', {
    id: 'windowPopupGridRecurringPopup',
    title: 'Jurnal Berulang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 480,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridRecurringPopup'
    }]
});