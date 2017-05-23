Ext.define('GridPotonganPayrollGridModel', {
    extend: 'Ext.data.Model',
    fields: ['namepotongan','amounttype','namasiklus','idemployee','startdate','enddate','totalpotongan','sisapotongan','jumlahpotongan','idpotongan','idemployee','jumlahangsuran','keterangan'],
    idProperty: 'id'
});

var storeGridPotonganPayrollGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPotonganPayrollGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PotonganGrid/employee',
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

Ext.define('GridPotonganPayrollGrid', {
    autoWidth:true,
    autoHeight:true,
    title: 'Potongan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridPotonganPayrollGridID',
    id: 'GridPotonganPayrollGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPotonganPayrollGrid',
    store: storeGridPotonganPayrollGrid,
    loadMask: true,
    columns: [
//'namePotonganPayroll','amounttype','namasiklus','idemployee','startdate','enddate','totalPotonganPayroll','sisaPotonganPayroll','jumlahPotonganPayroll','idPotonganPayroll','idemployee','jumlahangsuran','keterangan'
        {header: 'idPotonganPayroll', dataIndex: 'idPotonganPayroll', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Potongan', dataIndex: 'namepotongan', minWidth: 150},
        // {header: 'total Potongan', dataIndex: 'totalpotongan', minWidth: 150,xtype:'numbercolumn',align:'right'},
        // {header: 'jumlah angsuran', dataIndex: 'jumlahangsuran', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Jumlah Potongan', dataIndex: 'jumlahpotongan', flex:1, minWidth: 150,xtype:'numbercolumn',align:'right'},
        // {header: 'sisa Potongan', dataIndex: 'sisapotongan', minWidth: 150,xtype:'numbercolumn',align:'right'},
        // {header: 'keterangan', dataIndex: 'keterangan', minWidth: 150}
    ],
//     , dockedItems: [
//         {
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     itemId: 'addPotonganPayrollGrid',
//                     text: 'Tambah',
//                     iconCls: 'add-icon',
//                     handler: function () {
//                         wPotonganPayrollGrid.show();
//                         Ext.getCmp('statusformPotonganPayrollGrid').setValue('input');
//                         console.log(Ext.getCmp('idemployee').getValue());
//                         Ext.getCmp('idemployeePotonganPayrollGrid').setValue(Ext.getCmp('idemployee').getValue());
//                     }
//                 },
//                 {
//                     itemId: 'editPotonganPayrollGrid',
//                     text: 'Ubah',
//                     iconCls: 'edit-icon',
//                     handler: function () {
//                         var grid = Ext.ComponentQuery.query('GridPotonganPayrollGrid')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                         } else {
//                             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                             var formPotonganPayrollGrid = Ext.getCmp('formPotonganPayrollGrid');
//                             formPotonganPayrollGrid.getForm().load({
//                                 url: SITE_URL + 'backend/loadFormData/PotonganPayrollGrid/1/employee',
//                                 params: {
//                                     extraparams: 'a.idtunjangan:' + selectedRecord.data.idtunjangan
//                                 },
//                                 success: function (form, action) {
//                                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 },
//                                 failure: function (form, action) {
//                                     Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                 }
//                             })

//                             wPotonganPayrollGrid.show();
//                             Ext.getCmp('statusformPotonganPayrollGrid').setValue('edit');
//                         }

//                     }
//                 }, {
//                     id: 'btnDeletePotonganPayrollGrid',
//                     text: 'Hapus',
//                     iconCls: 'delete-icon',
//                     handler: function () {
//                         Ext.Msg.show({
//                             title: 'Confirm',
//                             msg: 'Delete Selected ?',
//                             buttons: Ext.Msg.YESNO,
//                             fn: function (btn) {
//                                 if (btn == 'yes') {
//                                     var grid = Ext.ComponentQuery.query('GridPotonganPayrollGrid')[0];
//                                     var sm = grid.getSelectionModel();
//                                     selected = [];
//                                     Ext.each(sm.getSelection(), function (item) {
//                                         selected.push(item.data[Object.keys(item.data)[0]]);
//                                     });
//                                     Ext.Ajax.request({
//                                         url: SITE_URL + 'backend/ext_delete/PotonganPayrollGrid/employee',
//                                         method: 'POST',
//                                         params: {postdata: Ext.encode(selected)}
//                                     });
//                                     storeGridPotonganPayrollGrid.remove(sm.getSelection());
//                                     sm.select(0);
//                                 }
//                             }
//                         });
//                     },
// //                    disabled: true
//                 }, '->',
//                 'Pencarian: ', ' ',
//                 {
//                     xtype: 'searchGridPotonganPayrollGrid',
//                     text: 'Left Button'
//                 }

//             ]
//         }, {
//             xtype: 'pagingtoolbar',
//             store: storeGridPotonganPayrollGrid, // same store GridPanel is using
//             dock: 'bottom',
//             displayInfo: true
//                     // pageSize:20
//         }
//     ],
     listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridPotonganPayrollGrid.load();
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPotonganPayrollGrid = Ext.getCmp('formPotonganPayrollGrid');
            wPotonganPayrollGrid.show();
            formPotonganPayrollGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/PotonganPayrollGrid/1/employee',
                params: {
                    extraparams: 'a.idtunjangan:' + record.data.idtunjangan
                },
                success: function (form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function (form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformPotonganPayrollGrid').setValue('edit');
        }
    }
});