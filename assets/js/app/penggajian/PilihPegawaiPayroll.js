Ext.define('GridemployeeProsesGajiGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','penambahangaji','idemployeetype','payrolltypeid','pembayaranperjamkehadiran','code','firstname','lastname','namaunit','nametype','jumlahjam','jumlahkehadiran','totalgaji' ,'totaltunjangan','pph21' ,'totalpotongan','totalpembayaran','payname','userin'],
    idProperty: 'id'
});

var storeGridemployeeProsesGajiGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridemployeeProsesGajiGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeeProsesGajiGridTmp/payroll',
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


Ext.define('GridPilihPegawaiPayrollGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','penambahangaji','idPilihPegawaiPayroll','code','firstname','lastname','address','telephone','handphone','fax','email','website','city','state','postcode','country','notes','nametype'],
    idProperty: 'id'
});

var storeGridPilihPegawaiPayrollGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPilihPegawaiPayrollGridModel',
    //remoteSort: true,
    autoload:false,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pilihemployeegrid/payroll',
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

                        


Ext.define('MY.searchGridPilihPegawaiPayrollGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPilihPegawaiPayrollGrid',
    store: storeGridPilihPegawaiPayrollGrid,
    width: 180
});

var smGridPilihPegawaiPayrollGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPilihPegawaiPayrollGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePilihPegawaiPayrollGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePilihPegawaiPayrollGrid').enable();
        }
    }
});

Ext.define('GridPilihPegawaiPayrollGrid', {
    // renderTo:'mytabpanel',
   multiSelect: true,
//    selModel: smGridPilihPegawaiPayrollGrid,
//    title: 'Daftar Pegawai',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    autoHeight:true,
    itemId: 'GridPilihPegawaiPayrollGridID',
    id: 'GridPilihPegawaiPayrollGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPilihPegawaiPayrollGrid',
    store: storeGridPilihPegawaiPayrollGrid,
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
                        var grid = Ext.ComponentQuery.query('GridPilihPegawaiPayrollGrid')[0];
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
                                url: SITE_URL + 'penggajian/insertPayrollListTmp',
                                method: 'POST',
                                params: {postdata: Ext.encode(selected), periode:Ext.getCmp('payrollPeriode').getValue()},
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (d.success)
                                    {
                                            Ext.getCmp('wPilihPegawaiPayroll').hide();
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
                },
               
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPilihPegawaiPayrollGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPilihPegawaiPayrollGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPilihPegawaiPayrollGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
//            console.log(record.data.idsiswa)

            // storePayrollHistoryGrid.on('beforeload', function (store, operation, eOpts) {
            //     operation.params = {
            //         'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
            //         'extraparams': 'a.idPilihPegawaiPayroll:' + record.data.idPilihPegawaiPayroll
            //     }
            // });
            // storePayrollHistoryGrid.load();
//            storePayrollHistoryGrid.load({
//                            params: {
//                                'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
//                                'extraparams': 'a.idPilihPegawaiPayroll:' + record.data.idPilihPegawaiPayroll
//                            }
//                        });
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//             var formPilihPegawaiPayrollGrid = Ext.getCmp('formPilihPegawaiPayrollGrid');
//             wPilihPegawaiPayrollGrid.show();

//             formPilihPegawaiPayrollGrid.getForm().load({
//                 url: SITE_URL + 'backend/loadFormData/PilihPegawaiPayrollGrid/1',
//                 params: {
//                     extraparams: 'a.idPilihPegawaiPayroll:' + record.data.idPilihPegawaiPayroll
//                 },
//                 success: function(form, action) {
//                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 },
//                 failure: function(form, action) {
//                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                 }
//             })

//             dataGaji(record.data.idPilihPegawaiPayroll)
// //            Ext.getCmp('kddaerahS').setReadOnly(true);
//             Ext.getCmp('statusformPilihPegawaiPayrollGrid').setValue('edit');
        }
    }
});


var wPilihPegawaiPayroll = Ext.create('widget.window', {
    id: 'wPilihPegawaiPayroll',
    title: 'Pilih Pegawai Yang Akan Digaji',
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
        xtype:'GridPilihPegawaiPayrollGrid'
    }]
});


function getSummaryPayroll()
{
    Ext.Ajax.request({
        url: SITE_URL + 'penggajian/getSummaryPayroll',
        method: 'GET',
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if (d.success)
            {
                   Ext.getCmp('summaryProsesGaji').setValue(d.val);
            } else {
                    Ext.getCmp('summaryProsesGaji').setValue('GET SUMMARY FAILED!');
            }

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}