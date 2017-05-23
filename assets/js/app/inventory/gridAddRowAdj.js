
Ext.define('gridAddRowAdjModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy','namaunit'],
    idProperty: 'id'
});

var storegridAddRowAdj = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'gridAddRowAdjModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory/'+idunit,
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



Ext.define('MY.searchgridAddRowAdj', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchgridAddRowAdj',
    store: storegridAddRowAdj,
    width: 180
});

var smgridAddRowAdj = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smgridAddRowAdj.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryAll').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryAll').enable();
        }
    }
});

Ext.define('gridAddRowAdj', {
//    title: 'Daftar Persediaan',
    itemId: 'gridAddRowAdjID',
    id: 'gridAddRowAdjID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridAddRowAdj',
    store: storegridAddRowAdj,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'No Inventory', dataIndex: 'invno', minWidth: 100},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Nama', dataIndex: 'nameinventory', minWidth: 300},
        {header: 'Jumlah Persediaan', dataIndex: 'qtystock', minWidth: 150, align: 'right'},
        {header: 'Satuan', dataIndex: 'unitmeasure', minWidth: 100},
        {header: 'Harga Beli', dataIndex: 'cost', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Harga Jual', dataIndex: 'sellingprice', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Stok Minimum', dataIndex: 'minstock', minWidth: 110},
        {header: 'Tahun Pembelian', dataIndex: 'yearbuy', minWidth: 130}
    ],
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                    '<p><b>Supplier:</b> {namesupplier}</p>',
                    '<p><b>Deskripsi:</b> {description}</p>',
                    '<p><b>Foto:</b><br/> <img src=' + BASE_URL + 'upload/{images} width=120/></p><br>'
                    )
        }],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'pilihItemAdj',
                    text: 'Pilih Item',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('gridAddRowAdj')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.getCmp('idinventoryAddRowAdj').setValue(selectedRecord.data.idinventory);
                            Ext.getCmp('nameinventoryAddRowAdj').setValue(selectedRecord.data.nameinventory);
                            Ext.getCmp('invnoAddRowAdj').setValue(selectedRecord.data.invno);
                            
                            Ext.getCmp('wGridAddRowAdj').hide();
                        }

                    }
                },'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchgridAddRowAdj',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storegridAddRowAdj, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storegridAddRowAdj.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formInventoryAll = Ext.getCmp('formInventoryAll');
//            wInventoryAll.show();
//
//            formInventoryAll.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/InventoryAll/1/inventory',
//                params: {
//                    extraparams: 'a.idinventory:' + record.data.idinventory
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
//
////            
////            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformInventoryAll').setValue('edit');
        }
    }
});

var wGridAddRowAdj = Ext.create('widget.window', {
    id: 'wGridAddRowAdj',
    title: 'Pilih Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 700,
            height: 300,
            layout: 'fit',
            items: [{
                    xtype: 'gridAddRowAdj'
                }]
        })
    ]
});