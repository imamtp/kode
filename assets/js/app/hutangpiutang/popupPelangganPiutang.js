Ext.define('GridpopupPelangganPiutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer', 'idcustomertype', 'nocustomer', 'namecustomer', 'address', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpayment', 'avgdaypayment', 'lastpayment', 'lastsales', 'incomeaccount', 'notes', 'display', 'userin', 'usermod', 'datein', 'datemod', 'status', 'deleted', 'idunit', 'namecustype'],
    idProperty: 'id'
});

var storeGridpopupPelangganPiutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpopupPelangganPiutangModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customer/master',
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
Ext.define('MY.searchGridpopupPelangganPiutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpopupPelangganPiutang',
    store: storeGridpopupPelangganPiutang,
    width: 180
});
var smGridpopupPelangganPiutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpopupPelangganPiutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletepopupPelangganPiutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletepopupPelangganPiutang').enable();
        }
    }
});

Ext.define('GridpopupPelangganPiutang', {
    itemId: 'GridpopupPelangganPiutangID',
    id: 'GridpopupPelangganPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridpopupPelangganPiutang',
    store: storeGridpopupPelangganPiutang,
    loadMask: true,
    columns: [{ header: 'idcustomer', dataIndex: 'idcustomer', hidden: true },
        { header: 'No', xtype: 'rownumberer', sortable: false, width: 50 },
        { header: 'No Customer', minWidth: 100, dataIndex: 'nocustomer' },
        { header: 'Name', minWidth: 150, dataIndex: 'namecustomer' },
        { header: 'Type', minWidth: 100, dataIndex: 'namecustype' },
        { header: 'Address', minWidth: 200, dataIndex: 'address' },
        { header: 'Shipping Address', minWidth: 200, dataIndex: 'shipaddress' },
        { header: 'Bill Address', minWidth: 200, dataIndex: 'billaddress' },
        { header: 'No. Telp.', minWidth: 200, dataIndex: 'telephone' },
        { header: 'No. HP', minWidth: 100, dataIndex: 'handphone' }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'pilihpopupPelangganPiutang',
            text: 'Pilih Pelanggan',
            iconCls: 'tick-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridpopupPelangganPiutang')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data Pelanggan terlebih dahulu!');
                } else {
                    Ext.getCmp('idcustomerPiutangReg').setValue(selectedRecord.data.idcustomer);
                    Ext.getCmp('namecustomerPiutangReg').setValue(selectedRecord.data.namecustomer);
                    Ext.getCmp('wpopupPelangganPiutang').hide();
                }
            }
        }, '-', {
            itemId: 'addpopupPelangganPiutang',
            hidden: true,
            text: 'Tambah Pelanggan',
            iconCls: 'add-icon',
            handler: function() {
                wpelangganGrid.show();
                Ext.getCmp('statusformpelangganGrid').setValue('input');
            }
        }, , '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridpopupPelangganPiutang',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpopupPelangganPiutang, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpopupPelangganPiutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formpopupPelangganPiutang = Ext.getCmp('formpopupPelangganPiutang');
            wpopupPelangganPiutang.show();
            formpopupPelangganPiutang.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/popupPelangganPiutang/1',
                    params: {
                        extraparams: 'a.idPelanggan:' + record.data.idPelanggan
                    },
                    success: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                //            
                //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformpopupPelangganPiutang').setValue('edit');

            Ext.getCmp('TabPelanggan').setActiveTab(0);
        }
    }
});

var wpopupPelangganPiutang = Ext.create('widget.window', {
    id: 'wpopupPelangganPiutang',
    title: 'Pilih Pelanggan',
    modal: true,
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 670,
    height: sizeH,
    // minHeight: 340,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridpopupPelangganPiutang'
    }]
});