Ext.define('GridTunjanganPayrollGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idTunjanganPayroll', 'idemployee', 'namatunjangan','startdate', 'enddate', 'jumlah', 'nametunj', 'amounttype', 'namasiklus'],
    idProperty: 'id'
});

var storeGridTunjanganPayrollGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTunjanganPayrollGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/tunjanganpayrollgrid/payroll',
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

Ext.define(dir_sys + 'penggajian.GridTunjanganPayrollGrid', {
     autoWidth:true,
    autoHeight:true,
    title: 'Tunjangan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridTunjanganPayrollGridID',
    id: 'GridTunjanganPayrollGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTunjanganPayrollGrid',
    store: storeGridTunjanganPayrollGrid,
    loadMask: true,
    columns: [
//        'idTunjanganPayroll','idemployee','namaTunjanganPayroll','startdate','enddate','jumlah','nametunj','amounttype','namasiklus'
        {header: 'idTunjanganPayroll', dataIndex: 'idTunjanganPayroll', hidden: true},
        {header: 'idemployee', dataIndex: 'idemployee', minWidth: 150, hidden: true},
        {header: 'Tunjangan', dataIndex: 'nametunj', minWidth: 150},
        {header: 'Jumlah/Persentase', dataIndex: 'jumlah', minWidth: 150,xtype:'numbercolumn',align:'right',flex:1}
    ],listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridTunjanganPayrollGrid.load();
            }
        },
        itemdblclick: function (dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formTunjanganPayrollGrid = Ext.getCmp('formTunjanganPayrollGrid');
            wTunjanganPayrollGrid.show();
            formTunjanganPayrollGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/TunjanganPayrollGrid/1/employee',
                params: {
                    extraparams: 'a.idTunjanganPayroll:' + record.data.idTunjanganPayroll
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
            Ext.getCmp('statusformTunjanganPayrollGrid').setValue('edit');
        }
    }
});