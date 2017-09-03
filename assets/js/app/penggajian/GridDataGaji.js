

function WindowCetakGaji(pegid, month,year, debug)
{
    // var periodepenggajian = str_replace(" ", "", periodepenggajian);
    // var periodepenggajian = explode(",", periodepenggajian);

    var cmp = Ext.create('Ext.Component', {
        border: false,
        xtype: "component",
        autoEl: {
            tag: "iframe",
            src: SITE_URL + "penggajian/cetakGaji/" + year + "/" + month + "/" + pegid + '/' + debug
        }

    });

    var WindowCetakGaji = Ext.create('widget.window', {
        title: 'Pratinjau Slip Gaji',
        header: {
            titlePosition: 2,
            titleAlign: 'center'
        },
        closable: true,
        closeAction: 'hide',
        width: 900,
        minWidth: 450,
        height: sizeH,
        layout: 'fit',
        maximizable: true,
        border: false,
        items: [cmp]
        , listeners: {
            maximize: function(window, opts) {
                var the_iframe = cmp.getEl().dom;
                the_iframe.contentWindow.location.reload();
            },
            restore: function(window, opts) {
                var the_iframe = cmp.getEl().dom;
                the_iframe.contentWindow.location.reload();
            }
        }
    }).show();

}

Ext.define('GridDataGajiModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','norek','tglpenggajian','tglpenggajian','penambahangaji','namabank','idemployeetype','premiinsurance','idaccount','idaccountpayroll','accname','accname','firstname','lastname','namaunit','nametype','jumlahjam','jumlahkehadiran','totalgaji','totaltunjangan','pph21','totalpotongan','totalpembayaran','payname','userin','code','jenispph21','month','year','idunit','idpayroll'],
    idProperty: 'id'
});

var storeGridDataGaji = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDataGajiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/griddatagaji/payroll',
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



Ext.define('MY.searchGridDataGaji', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDataGaji',
    store: storeGridDataGaji,
    width: 180
});

var smGridDataGaji = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridDataGaji.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridDataGaji').disable();
            }
        },
        select: function (model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridDataGaji').enable();
        }
    }
});

Ext.define(dir_sys + 'penggajian.GridDataGaji', {
    // renderTo:'mytabpanel',
    // layout:'fit',
//    selModel: smGridDataGaji,
    title: 'Detail Penggajian',
    multiSelect: true,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDataGajiID',
    id: 'GridDataGajiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDataGaji',
    store: storeGridDataGaji,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
        {header: 'idemployee', dataIndex: 'idemployee',hidden:true},
        {header: 'idpayroll', dataIndex: 'idpayroll',hidden:true},
        {header: 'NIPEG', dataIndex: 'code', minWidth: 150},
        {header: 'Nama Depan', dataIndex: 'firstname', minWidth: 150},
        {header: 'Nama Belakang', dataIndex: 'lastname', minWidth: 150},
        {header: 'Jenis Pegawai', dataIndex: 'nametype', minWidth: 150},
        {header: 'nama Unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'Jenis Pembayaran', dataIndex: 'payname', minWidth: 150},
        {header: 'Jumlah Jam', dataIndex: 'jumlahjam', minWidth: 150},
        {header: 'Jumlah Kehadiran', dataIndex: 'jumlahkehadiran', minWidth: 150},       
        {header: 'Gaji', dataIndex: 'totalgaji', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Penambahan Gaji', dataIndex: 'penambahangaji', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Total Tunjangan', dataIndex: 'totaltunjangan',  xtype:'numbercolumn', align:'right', minWidth: 150},
        {header: 'Jenis PPH', dataIndex: 'jenispph21', minWidth: 50},
        {header: 'PPH21', dataIndex: 'pph21', xtype:'numbercolumn', align:'right',  minWidth: 150},
        {header: 'Total Potongan', dataIndex: 'totalpotongan',  xtype:'numbercolumn', align:'right', minWidth: 150},      
        {header: 'Total pembayaran', dataIndex: 'totalpembayaran', xtype:'numbercolumn', align:'right', Width: 200},
        {header: 'Tgl Penggajian', dataIndex: 'tglpenggajian', minWidth: 150},
        {header: 'No rekening', dataIndex: 'norek', minWidth: 150},
        {header: 'Nama bank', dataIndex: 'namabank', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'comboxemployee',
                    id: 'idemployeetypeDataGaji',
                    name: 'idemployeetype',
                    valueField: 'idemployeetype',
                    displayField: 'nametype',
                    listeners: {
                        select: function (combo, record, index) {
                            var aktifitaskodePenggajianGrid = combo.getValue();
                            storeGridDataGaji.load();
                        }
                    }
                },
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridDataGaji',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridDataGaji, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }, 
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'filterGridDataGaji',
                    text: 'Cetak Slip Gaji',
                    iconCls: 'print-icon',
                    handler: function () {
                        // var periodepenggajian = Ext.getCmp('periodepenggajianDataGaji').getSubmitValue();
                        // // alert(periodepenggajian)
                        // if (periodepenggajian == null || periodepenggajian == '')
                        // {
                            // Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
                        // } else {

                            var GridPayroll = Ext.ComponentQuery.query('GridPayrollData')[0];
                            var selectedRecordGridPayroll = GridPayroll.getSelectionModel().getSelection()[0];

                            var grid = Ext.ComponentQuery.query('GridDataGaji')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0)
                            {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                // alert(selectedRecordGridPayroll.get('month'))
                                WindowCetakGaji(selectedRecord.get('idemployee'), selectedRecord.get('month'),selectedRecord.get('year'), 4)
                            }
                        // }



                    }
                },'->',
                 {
                    xtype: 'button',
                    text: 'Clear Filter',
                    tooltip: 'Clear Filter',
                    listeners: {
                        click: function () {
                            Ext.getCmp('idunitDataGaji').clearValue();
                            Ext.getCmp('idemployeetypeDataGaji').clearValue();
                            Ext.getCmp('namapegawaiGajiGrid').setValue(null);
                            Ext.getCmp('periodepenggajianDataGaji').setValue(null);
                            storeGridDataGaji.load();
                        }}
                }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridDataGaji.load();
            }
        }
        // ,itemdblclick: function(dv, record, item, index, e) {
        //      console.log('itemdblclick'+record.data.idemployee)
        //      // WindowKaryawan(record.data.firstname,record.data.idemployee);
        //  }
        //  ,select: function(model, record, index) {
        //          console.log('selected'+record.data.idemployee);
        //          Ext.getCmp('prosesGridDataGaji').enable();
        //  }
        // ,rowclick: function(grid, idx){
        //     Ext.getCmp('prosesGridDataGaji').enable();
        // }
    }
});

