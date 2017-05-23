Ext.define('GridemployeeProsesThrGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','pengali','kehadiranjam','totalpendapatan','masakerja','jumlahthr','thrtambahan','totalthr','month','year','firstname','lastname','code','keterangan'],
    idProperty: 'id'
});

var storeGridemployeeProsesThrGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridemployeeProsesThrGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeeProsesThrGridTmp/payroll',
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
////////////////////////////////////////////////////////


Ext.define('GridPilihPegawaiThrGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','penambahanThr','idPilihPegawaiThr','code','firstname','lastname','address','telephone','handphone','fax','email','website','city','state','postcode','country','notes','nametype'],
    idProperty: 'id'
});

var storeGridPilihPegawaiThrGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPilihPegawaiThrGridModel',
    //remoteSort: true,
    autoload:false,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pilihemployeethrgrid/payroll',
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

                        


Ext.define('MY.searchGridPilihPegawaiThrGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPilihPegawaiThrGrid',
    store: storeGridPilihPegawaiThrGrid,
    width: 180
});

var smGridPilihPegawaiThrGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPilihPegawaiThrGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePilihPegawaiThrGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePilihPegawaiThrGrid').enable();
        }
    }
});

Ext.define('GridPilihPegawaiThrGrid', {
    // renderTo:'mytabpanel',
   multiSelect: true,
//    selModel: smGridPilihPegawaiThrGrid,
//    title: 'Daftar Pegawai',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    autoHeight:true,
    itemId: 'GridPilihPegawaiThrGridID',
    id: 'GridPilihPegawaiThrGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPilihPegawaiThrGrid',
    store: storeGridPilihPegawaiThrGrid,
    loadMask: true,
    columns: [
        {header: 'idemployee', dataIndex: 'idemployee', hidden: true},  
        {header: 'NIP', dataIndex: 'code', minWidth: 150},     
        {header: 'Nama Depan', dataIndex: 'firstname', minWidth: 150},
        {header: 'Nama Belakang', dataIndex: 'lastname', minWidth: 150},
        {header: 'Tipe Pegawai', dataIndex: 'nametype', minWidth: 150},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 150}
    ]
    , dockedItems: [
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               {
                    text: 'Pilih Pegawai',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridPilihPegawaiThrGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih pegawai terlebih dahulu!');
                        } else {
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'penggajian/insertThrListTmp',
                                method: 'POST',
                                params: {postdata: Ext.encode(selected), periode:Ext.getCmp('ThrPeriode').getValue()},
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success)
                                    {
                                            Ext.getCmp('wPilihPegawaiThr').hide();
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
                },
               
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPilihPegawaiThrGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPilihPegawaiThrGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPilihPegawaiThrGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
//            console.log(record.data.idsiswa)

            // storeThrHistoryGrid.on('beforeload', function (store, operation, eOpts) {
            //     operation.params = {
            //         'bulantahunpengThran': Ext.getCmp('ThrHistoryPeriod').getValue(),
            //         'extraparams': 'a.idPilihPegawaiThr:' + record.data.idPilihPegawaiThr
            //     }
            // });
            // storeThrHistoryGrid.load();
//            storeThrHistoryGrid.load({
//                            params: {
//                                'bulantahunpengThran': Ext.getCmp('ThrHistoryPeriod').getValue(),
//                                'extraparams': 'a.idPilihPegawaiThr:' + record.data.idPilihPegawaiThr
//                            }
//                        });
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//             var formPilihPegawaiThrGrid = Ext.getCmp('formPilihPegawaiThrGrid');
//             wPilihPegawaiThrGrid.show();

//             formPilihPegawaiThrGrid.getForm().load({
//                 url: SITE_URL + 'backend/loadFormData/PilihPegawaiThrGrid/1',
//                 params: {
//                     extraparams: 'a.idPilihPegawaiThr:' + record.data.idPilihPegawaiThr
//                 },
//                 success: function(form, action) {
//                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 },
//                 failure: function(form, action) {
//                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 }
//             })

//             dataThr(record.data.idPilihPegawaiThr)
// //            Ext.getCmp('kddaerahS').setReadOnly(true);
//             Ext.getCmp('statusformPilihPegawaiThrGrid').setValue('edit');
        }
    }
});


var wPilihPegawaiThr  = Ext.create('widget.window', {
    id: 'wPilihPegawaiThr',
    title: 'Pilih Pegawai Yang Akan Diproses THR-nya',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    width: 750,
    height: 360,
    autoScroll: true,
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
//    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'GridPilihPegawaiThrGrid'
    }]
});


function getSummaryThr()
{
    Ext.Ajax.request({
        url: SITE_URL + 'penggajian/getSummaryThr',
        method: 'GET',
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if (d.success)
            {
                   Ext.getCmp('summaryProsesThr').setValue(d.val);
            } else {
                    Ext.getCmp('summaryProsesThr').setValue('GET SUMMARY FAILED!');
            }

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}