Ext.define('storeGridPayrollDataModel', {
    extend: 'Ext.data.Model',
    fields: ['idpayroll','idjournal','month','year','datein','namaunit','memo'],
    idProperty: 'id'
});
var storeGridPayrollData = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridPayrollDataModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/gridpayroll/payroll',
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
storeGridPayrollData.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
        'extraparams': 'a.idunit:' + Ext.getCmp('idunitDataGaji').getValue()+',a.year:'+Ext.getCmp('periodepenggajianDataGaji').getValue()
    }
});
Ext.define('MY.searchGridPayrollData', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPayrollData',
    store: storeGridPayrollData,
    width: 180
});
Ext.define('GridPayrollData', {
    // itemId: 'GridPayrollDataID',
    // multiSelect:true,
    title:'Riwayat Penggajian',
    id: 'GridPayrollDataID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPayrollData',
    store: storeGridPayrollData,
    loadMask: true,
    columns: [
       {
            header: 'idpayroll',
            dataIndex: 'idpayroll',
            hidden: true
        },{
            header: 'year',
            dataIndex: 'year',
            minWidth: 100,
            hidden: true
        },  {
            header: 'Bulan',
            dataIndex: 'month',
            minWidth: 100
        }, {
            header: 'Memo',
            flex:1,
            dataIndex: 'memo',
            minWidth: 150
        },
        // {header: 'Nama Depan', dataIndex: 'firstname', minWidth: 150},
        {
            header: 'Tanggal',
            dataIndex: 'datein',
            minWidth: 100
        },
        // {
        //     header: 'Unit',
        //     flex:1,
        //     dataIndex: 'namaunit',
        //     minWidth: 100
        // }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'comboxunit',
            id: 'idunitDataGaji',
            name: 'idunit',
            labelWidth: 120,
            valueField: 'idunit',
            displayField: 'namaunit',
            listeners: {
                select: function(combo, record, index) {
                    // var aktifitaskodePenggajianGrid = combo.getValue();
                    storeGridPayrollData.load();
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
        // {
        //     xtype: 'datefield',
        //     format: 'Y',
        //     labelWidth: 120,
        //     allowBlank: false,
        //     value: new Date(),
        //     fieldLabel: 'Tahun Penggajian',
        //     name: 'periodepenggajian',
        //     id: 'periodepenggajianDataGaji',
        //     // maxValue : new Date(),
        //     listeners: {
        //         'change': function(field, newValue, oldValue) {
        //             storeGridPayrollData.load();
        //         }
        //     }
        // }
            {
                xtype:'comboxtahunPayroll',
                labelWidth: 120,
                id: 'periodepenggajianDataGaji',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridPayrollData.load();
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'prosesGridDataGaji',
            id: 'prosesGridDataGaji',
            text: 'Hapus Gaji',
            iconCls: 'delete-icon',
            //                    disabled: true,
            handler: function(btn) {
                var grid = Ext.ComponentQuery.query('GridPayrollData')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk menghapus gaji terpilih', hapusGajiBtn);
                }
            }
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPayrollData, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPayrollData.load();
                tahunPayrollStore.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {

            storeGridDataGaji.on('beforeload', function (store, operation, eOpts) {
                operation.params = {
                    // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
                    'extraparams': 'A.idunit:' + Ext.getCmp('idunitDataGaji').getValue() + ','
                            + 'A.idemployeetype:' + Ext.getCmp('idemployeetypeDataGaji').getValue()+',a.year:'+Ext.getCmp('periodepenggajianDataGaji').getValue()
                }
            });
            storeGridDataGaji.load();
            Ext.getCmp('GridDataGajiID').setTitle('Daftar Penggajian Periode: '+record.data.month+' '+record.data.year);
            // console.log(record.data.payname)
            // Ext.getCmp('detailThrPayname').setValue('&nbsp;&nbsp;&nbsp;&nbsp;'+record.data.payname);
            // Ext.getCmp('detailThridemployee').setValue(record.data.idemployee);
            // Ext.Ajax.request({
            //         url: SITE_URL + 'penggajian/getPayrollType',
            //         method: 'POST', 
            //         params: {
            //             idemployee: record.data.idemployee
            //         },
            //         success: function (res) {
            //             var res = Ext.JSON.decode(res.responseText);
            //             if(res.payrolltypeid==1 || res.payrolltypeid==2)
            //             {
            //                 //jam,kehadira,harian
            //                 Ext.getCmp('kehadiranjamthr').show();
            //             } else {
            //                 Ext.getCmp('kehadiranjamthr').hide();
            //             }
            //         },
            //         failure: function (res) {
            //         }
            //     });
            // Ext.getCmp('tabPembayaranProsesThr').setTitle('Penambah Pembayaran THR '+record.data.firstname+' '+record.data.lastname)
            // Ext.util.Format.thousandSeparator = '.';
            // Ext.util.Format.decimalSeparator = '.';
            // Ext.getCmp('detailThrGaji').setValue(Ext.util.Format.number(record.data.thrtambahan, '0,000'));
            // Ext.getCmp('keteranganthrtambahan').setValue(record.data.keterangan);
            // Ext.getCmp('kehadiranjamthr').setValue(record.data.kehadiranjam);
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});
Ext.define('PortPayrollData', {
    extend: 'Ext.Panel',
    alias: 'widget.PortPayrollData',
    layout: 'border',
    defaults: {},
    items: [{
        region: 'east',
        flex: 2,
        // bodyStyle:'padding:1px 1px 1px 5px;',
        // bodyStyle:'pad',
        // border:1,
        split: true,
        xtype: 'GridDataGaji'
    },
    {
        region: 'center',
        // minWidth:400,
        flex: 1.2,
        // split: true,
        xtype: 'GridPayrollData'
    }]
});

function hapusGajiBtn(btn) {
    // var periodepenggajian = Ext.getCmp('periodepenggajianDataGaji').getSubmitValue();

    // if (periodepenggajian == null || periodepenggajian == '')
    // {
    //     Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
    // } else {
        var grid = Ext.ComponentQuery.query('GridPayrollData')[0];
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0)
        {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {
            if (btn == 'yes')
            {
//                WindowCetakGaji(selectedRecord.get('idemployee'), periodepenggajian, 3)
                var sm = grid.getSelectionModel();
                selected = [];
                Ext.each(sm.getSelection(), function (item) {
                    selected.push(item.data);
                });
//                             console.log(selected)

                Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/hapusgaji',
                    method: 'POST',
                    params: {
                        postdata: Ext.encode(selected),
                        idmenu:69
                        // bulantahun: periodepenggajian
                    },
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        if (!res.success) {
                            Ext.Msg.alert('Informasi', res.message);
                        } else {
                            Ext.Msg.alert('Hapus Gaji', res.message);

                            storeGridDataGaji.load();
                             storeGridPayrollData.load();
                         }
                    },
                    failure: function (res) {
                        Ext.Msg.alert('Proses Gaji Gagal', res.message);
                        box.hide();

                        storeGridDataGaji.load();
                        // storeGridPayrollData.load();
                    }
                });
            }
        }
    // }

}