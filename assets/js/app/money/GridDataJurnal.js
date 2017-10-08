

Ext.define('GridDataJurnalModel', {
    extend: 'Ext.data.Model',
    fields: ['idjournalitem','idjournal','idaccount','debit','credit','memo','datejournal','nojournal','accnumber','accname'],
    idProperty: 'id'
});

var storeGridDataJurnal = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataJurnalModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/jurnalitem/money',
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



Ext.define('MY.searchGridDataJurnal', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataJurnal',
    store: storeGridDataJurnal,
    width: 180
});

var smGridDataJurnal = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridDataJurnal.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridDataJurnal').disable();
            }
        },
        select: function (model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridDataJurnal').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridDataJurnal', {
    // renderTo:'mytabpanel',
    // layout:'fit',
//    selModel: smGridDataJurnal,
    title: 'Pilih salah satu jurnal',
    // multiSelect: true,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataJurnalID',
    id: 'GridDataJurnalID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataJurnal',
    store: storeGridDataJurnal,
    loadMask: true,
    columns: [
        // {
        //     header: 'No',
        //     xtype: 'rownumberer',
        //     width: 30,
        //     sortable: false
        // },
        {header: 'idemployee', dataIndex: 'idjournal',hidden:true},
        {header: 'No Akun', dataIndex: 'accnumber',  minWidth: 120},
        {header: 'Nama Akun', dataIndex: 'accname',  minWidth: 200, flex:1},
        {header: 'Debit', dataIndex: 'debit',  xtype:'numbercolumn', align:'right', minWidth: 125},      
        {header: 'Kredit', dataIndex: 'credit', xtype:'numbercolumn', align:'right', minWidth: 125},
    ]
    , dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [
        //         {
        //             xtype: 'comboxemployee',
        //             id: 'idemployeetypeDataGaji',
        //             name: 'idemployeetype',
        //             valueField: 'idemployeetype',
        //             displayField: 'nametype',
        //             listeners: {
        //                 select: function (combo, record, index) {
        //                     var aktifitaskodePenggajianGrid = combo.getValue();
        //                     storeGridDataJurnal.load();
        //                 }
        //             }
        //         },
        //        '->',
        //         'Pencarian: ', ' ',
        //         {
        //             xtype: 'searchGridDataJurnal',
        //             text: 'Left Button'
        //         }
        //     ]
        // }, 
        {
            xtype: 'pagingtoolbar',
            store: storeGridDataJurnal, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }, 
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype:'displayfield',
                    id:'displayNoJurnal',
                    labelWidth:120,
                    fieldLabel:'No Ref/No Trans',
                    value:'-'
                }
                // {
                //     itemId: 'filterGridDataJurnal',
                //     text: 'Cetak Slip Gaji',
                //     iconCls: 'print-icon',
                //     handler: function () {
                //         // var periodepenggajian = Ext.getCmp('periodepenggajianDataGaji').getSubmitValue();
                //         // // alert(periodepenggajian)
                //         // if (periodepenggajian == null || periodepenggajian == '')
                //         // {
                //             // Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
                //         // } else {

                //             var GridPayroll = Ext.ComponentQuery.query('GridPayrollData')[0];
                //             var selectedRecordGridPayroll = GridPayroll.getSelectionModel().getSelection()[0];

                //             var grid = Ext.ComponentQuery.query('GridDataJurnal')[0];
                //             var selectedRecord = grid.getSelectionModel().getSelection()[0];
                //             var data = grid.getSelectionModel().getSelection();
                //             if (data.length == 0)
                //             {
                //                 Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                //             } else {
                //                 // alert(selectedRecordGridPayroll.get('month'))
                //                 WindowCetakGaji(selectedRecord.get('idemployee'), selectedRecord.get('month'),selectedRecord.get('year'), 4)
                //             }
                //         // }



                //     }
                // },'->',
                //  {
                //     xtype: 'button',
                //     text: 'Clear Filter',
                //     tooltip: 'Clear Filter',
                //     listeners: {
                //         click: function () {
                //             Ext.getCmp('idunitDataGaji').clearValue();
                //             Ext.getCmp('idemployeetypeDataGaji').clearValue();
                //             Ext.getCmp('namapegawaiGajiGrid').setValue(null);
                //             Ext.getCmp('periodepenggajianDataGaji').setValue(null);
                //             storeGridDataJurnal.load();
                //         }}
                // }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridDataJurnal.load();
            }
        }
        // ,itemdblclick: function(dv, record, item, index, e) {
        //      console.log('itemdblclick'+record.data.idemployee)
        //      // WindowKaryawan(record.data.firstname,record.data.idemployee);
        //  }
        //  ,select: function(model, record, index) {
        //          console.log('selected'+record.data.idemployee);
        //          Ext.getCmp('prosesGridDataJurnal').enable();
        //  }
        // ,rowclick: function(grid, idx){
        //     Ext.getCmp('prosesGridDataJurnal').enable();
        // }
    }
});

