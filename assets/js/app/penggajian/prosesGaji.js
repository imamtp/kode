

function WindowGridGaji(pegid, periodepenggajian, debug)
{
    var periodepenggajian = str_replace(" ", "", periodepenggajian);
    var periodepenggajian = explode(",", periodepenggajian);

    var cmp = Ext.create('Ext.Component', {
        border: false,
        xtype: "component",
        autoEl: {
            tag: "iframe",
            src: SITE_URL + "penggajian/generate/" + periodepenggajian[1] + "/" + periodepenggajian[0] + "/" + pegid + '/' + debug
        }

    });

    var WindowGridGaji = Ext.create('widget.window', {
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

Ext.define('GridGenerateGajiModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee', 'firstname', 'namaunit', 'nametype', 'status'],
    idProperty: 'id'
});

var storeGridGenerateGaji = Ext.create('Ext.data.Store', {
    pageSize: 10000,
    model: 'GridGenerateGajiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'penggajian/getData/prosesgaji',
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

storeGridGenerateGaji.on('beforeload', function (store, operation, eOpts) {
    operation.params = {
        'bulantahunpenggajian': Ext.getCmp('periodepenggajian').getValue(),
        'extraparams': 'b.idunit:' + Ext.getCmp('idunit').getValue() + ','
                + 'a.idemployeetype:' + Ext.getCmp('idemployeetype').getValue()
    }
});

Ext.define('MY.searchGridGenerateGaji', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGenerateGaji',
    store: storeGridGenerateGaji,
    width: 180
});

var smGridGenerateGaji = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridGenerateGaji.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridGenerateGaji').disable();
            }
        },
        select: function (model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridGenerateGaji').enable();
        }
    }
});

Ext.define('GridGenerateGaji', {
    // renderTo:'mytabpanel',
    // layout:'fit',
//    selModel: smGridGenerateGaji,
    title: 'Proses Penggajian',
    multiSelect: true,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridGenerateGajiID',
    id: 'GridGenerateGajiID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGenerateGaji',
    store: storeGridGenerateGaji,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
        {header: 'NIP', dataIndex: 'idemployee'},
        {header: 'Nama', dataIndex: 'firstname', flex: 1, minWidth: 250},
        {
            header: 'Status', dataIndex: 'status', minWidth: 150, renderer: function (value) {
                if (value === 'Ok') {
                    return '<font color=green>' + value + '</a>';
                } else {
                    return '<font color=red>' + value + '</a>';
                }
                // return value + ' people';
            }}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'comboxunit',
                    id: 'idunit',
                    name: 'idunit',
                    valueField: 'idunit',
                    displayField: 'namaunit',
                    listeners: {
                        select: function (combo, record, index) {
                            var aktifitaskodePenggajianGrid = combo.getValue();
                            storeGridGenerateGaji.load({
                                params: {
                                    'bulantahunpenggajian': Ext.getCmp('periodepenggajian').getValue(),
                                    'extraparams': 'b.idunit:' + Ext.getCmp('idunit').getValue() + ','
                                            + 'b.idemployeetype:' + Ext.getCmp('idemployeetype').getValue()
                                }
                            });
                        }
                    }
                }, {
                    xtype: 'comboxemployee',
                    id: 'idemployeetype',
                    name: 'idemployeetype',
                    valueField: 'idemployeetype',
                    displayField: 'nametype',
                    listeners: {
                        select: function (combo, record, index) {
                            var aktifitaskodePenggajianGrid = combo.getValue();
                            storeGridGenerateGaji.load({
                                params: {
                                    'bulantahunpenggajian': Ext.getCmp('periodepenggajian').getValue(),
                                    'extraparams': 'b.idunit:' + Ext.getCmp('idunit').getValue() + ','
                                            + 'b.idemployeetype:' + Ext.getCmp('idemployeetype').getValue()
                                }
                            });
                        }
                    }
                }, {
                    xtype: 'button',
                    text: 'Clear Filter',
                    tooltip: 'Clear Filter',
                    listeners: {
                        click: function () {
                            Ext.getCmp('idunit').clearValue();
                            Ext.getCmp('idemployeetype').clearValue();
                            storeGridGenerateGaji.load();
                        }}
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridGenerateGaji, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    format: 'F, Y',
                    labelWidth: 120,
                    allowBlank: false,
                    value: new Date(),
                    fieldLabel: 'Periode Penggajian',
                    name: 'periodepenggajian',
                    id: 'periodepenggajian',
                    // maxValue : new Date(),
                    listeners: {
                        'change': function (field, newValue, oldValue) {
                            storeGridGenerateGaji.load({
                                params: {
                                    'bulantahunpenggajian': Ext.getCmp('periodepenggajian').getValue(),
                                    'extraparams': 'b.idunit:' + Ext.getCmp('idunit').getValue() + ','
                                            + 'b.idemployeetype:' + Ext.getCmp('idemployeetype').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    itemId: 'filterGridGenerateGaji',
                    text: 'Pratinjau Gaji',
                    iconCls: 'add-icon',
                    handler: function () {
                        var periodepenggajian = Ext.getCmp('periodepenggajian').getSubmitValue();
                        // alert(periodepenggajian)
                        if (periodepenggajian == null || periodepenggajian == '')
                        {
                            Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
                        } else {
                            var grid = Ext.ComponentQuery.query('GridGenerateGaji')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0)
                            {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                WindowGridGaji(selectedRecord.get('idemployee'), periodepenggajian, 2)
                            }
                        }



                    }
                }, {
                    itemId: 'prosesGridGenerateGaji',
                    id: 'prosesGridGenerateGaji',
                    text: 'Proses Gaji',
                    iconCls: 'add-icon',
//                    disabled: true,
                    handler: function (btn) {

                        var grid = Ext.ComponentQuery.query('GridGenerateGaji')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.MessageBox.confirm('Konfirmasi',
                                    'Apakah anda yakin untuk memproses gaji pada data terpilih', prosesGajiBtn);
                        }
                    }
                },'->',
                {
                    xtype: 'displayfield',
                    id:'lastPayrollDate',
                    labelWidth:120,
                    fieldLabel:'Proses gaji terakhir:'
                }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                storeGridGenerateGaji.load();

                Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/lastPayrollDate',
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        Ext.getCmp('lastPayrollDate').setValue(res.date);
                    },
                    failure: function (res) {
                    }
                });
            }
        }
        // ,itemdblclick: function(dv, record, item, index, e) {
        //      console.log('itemdblclick'+record.data.idemployee)
        //      // WindowKaryawan(record.data.firstname,record.data.idemployee);
        //  }
        //  ,select: function(model, record, index) {
        //          console.log('selected'+record.data.idemployee);
        //          Ext.getCmp('prosesGridGenerateGaji').enable();
        //  }
        // ,rowclick: function(grid, idx){
        //     Ext.getCmp('prosesGridGenerateGaji').enable();
        // }
    }
});

function prosesGajiBtn(btn) {
    var periodepenggajian = Ext.getCmp('periodepenggajian').getSubmitValue();

    if (periodepenggajian == null || periodepenggajian == '')
    {
        Ext.Msg.alert('Failure', 'Pilih periode penggajian!');
    } else {
        var grid = Ext.ComponentQuery.query('GridGenerateGaji')[0];
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0)
        {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {
            if (btn == 'yes')
            {
//                WindowGridGaji(selectedRecord.get('idemployee'), periodepenggajian, 3)
                var sm = grid.getSelectionModel();
                selected = [];
                Ext.each(sm.getSelection(), function (item) {
                    selected.push(item.data);
                });
//                             console.log(selected)

                Ext.Ajax.request({
                    url: SITE_URL + 'penggajian/proses',
                    method: 'POST',
                    params: {
                        prosesgaji: 1,
                        postdata: Ext.encode(selected),
                        bulantahun: Ext.getCmp('periodepenggajian').getValue()
//                        idunit: Ext.getCmp('idunit').getValue(),
//                        idemployeetype: Ext.getCmp('idemployeetype').getValue()
                    },
                    success: function (res) {
                        var res = Ext.JSON.decode(res.responseText);
                        Ext.Msg.alert('Proses Gaji', res.message);

                        storeGridGenerateGaji.load();
                    },
                    failure: function (res) {
                        Ext.Msg.alert('Proses Gaji Gagal', res.message);
                        box.hide();

                        storeGridGenerateGaji.load();
                    }
                });
            }
        }
    }

}