
// var WindowEntrySalesReturn = Ext.create(dir_sys + 'sales.WindowEntrySalesReturn');
// var WindowEntrySalesInvoice = Ext.create(dir_sys + 'sales.WindowEntrySalesInvoice');


Ext.define('SalesReturnGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'sales_return_id','idunit','return_date','noreturn','idcustomer','memo','return_amount','idaccount_return','userin','datein','namecustomer','accname','accnumber','notes','totaldisc','aftertax','totaltax','subtotal','notes','accnamebank','accnumberbank','idaccount_bank','status'
    ],
    idProperty: 'id'
});
var storeGridSalesReturnGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'SalesReturnGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesreturn/sales',
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

//storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.idunit:'+Ext.getCmp('cbSalesReturnGrid').getValue()
//                  };
//              });

Ext.define('MY.searchGridSalesReturnGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesReturnGrid',
    store: storeGridSalesReturnGrid,
    width: 180
});
var smGridSalesReturnGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesReturnGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesReturnGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesReturnGrid').enable();
        }
    }
});
Ext.define(dir_sys+'sales.SalesReturnGrid', {
    title: 'Sales Return',
    itemId: 'SalesReturnGrid',
    id: 'SalesReturnGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalesReturnGrid',
    store: storeGridSalesReturnGrid,
    loadMask: true,
    columns: [{
        header: 'sales_return_id',
        dataIndex: 'sales_return_id',
        hidden: true
    },{
        header: 'No Return',
        dataIndex: 'noreturn',
        minWidth: 150
    },
    {
        header: 'Sales Return Date',
        dataIndex: 'return_date',
        minWidth: 150
    },
    // {
    //     header: 'Date Sales',
    //     dataIndex: 'date_sales',
    //     minWidth: 150
    // },
    {
        header: 'Customer Name',flex:1,
        dataIndex: 'namecustomer',
        minWidth: 150
    },

    {
        header: 'Return Amount',xtype:'numbercolumn',align:'right',
        dataIndex: 'return_amount',
        minWidth: 150
    },
    {
        header: 'Return CoA',
        dataIndex: 'accname',
        minWidth: 150
    },
    {
        header: 'Notes',
        dataIndex: 'notes',
        minWidth: 150
    },
    {
        header: 'memo',
        dataIndex: 'memo',
        minWidth: 150
    }
    // {
    //     header: 'Total Tax',
    //     dataIndex: 'tax',
    //     minWidth: 150,xtype:'numbercolumn',align:'right'
    // },
    // {
    //     header: 'Total Discount',
    //     dataIndex: 'disc',
    //     minWidth: 150,xtype:'numbercolumn',align:'right'
    // },
    // {
    //     header: 'Shipping Cost',
    //     dataIndex: 'freight',
    //     minWidth: 150,xtype:'numbercolumn',align:'right'
    // },
    // {
    //     header: 'Total Paid',
    //     dataIndex: 'paidtoday',
    //     minWidth: 150,xtype:'numbercolumn',align:'right'
    // },
    // {
    //     header: 'Total Amount',
    //     dataIndex: 'totalamount',
    //     minWidth: 150,xtype:'numbercolumn',align:'right'
    // },
    // {
    //     header: 'Status',
    //     dataIndex: 'status',
    //     minWidth: 150,xtype:'numbercolumn',align:'right',
    //     renderer: function(value) {
    //         return customColumnStatus(ArrDeliveryOrder,value);
    //     }
    // },
    ],
    dockedItems: [
     {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Sales Return',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel:true
                    // fieldLabel: 'Date Order',
                },'-',
                {
                    xtype:'comboxunit',
                    valueField:'idunit',
                    id:'cbSalesReturnGrid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridSalesReturnGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbSalesReturnGrid').getValue()+','+'a.idanggotatype:'+Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                },
                {
                    text: 'Search',
                    handler: function() {}
                },
                {
                    text: 'Clear Filter',
                    handler: function() {}
                }
            ]
        },{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            id: 'addSalesReturnGrid',
            text: 'Create New Sales Return',
            iconCls: 'add-icon',
            handler: function() {
                // WindowEntrySalesReturn.show();
                if (!Ext.isDefined(Ext.getCmp('WindowEntrySalesReturn'))) {
                Ext.create(dir_sys + 'sales.WindowEntrySalesReturn');
                }
                Ext.getCmp('WindowEntrySalesReturn').show();

                Ext.getCmp('cbUnitEntrySalesReturn').setValue(idunit);

                Ext.getCmp('tokenSalesReturnGrid_sr').setValue(randomString(12));
                // Ext.getCmp('GridSalesOrderList').getStore().load();

                clearFormSR();

                Ext.getCmp('WindowEntrySalesReturn').setTitle('Edit Sales Return');
                Ext.getCmp('status_sr').setReadOnly(true);
                Ext.getCmp('status_sr').setValue(1);

                Ext.getCmp('btnRecordSalesReturn').enable();  

                Ext.getCmp('statusformSalesReturnGrid_sr').setValue('input');   
                // storeCustomer.load();
                // storeUnit.load();
                // productMeasurementStore.load();
                // StorePayment.load();
                // // storeGridSalesOrderList.load();

                // //apus dulu data di grid entry Sales Return
                // Ext.getCmp('EntryDeliveryOrder').getStore().removeAll();
                // Ext.getCmp('EntryDeliveryOrder').getStore().sync();
            }
        },{
            hidden:true,
            text: 'Create Invoice',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('SalesReturnGrid')[0];
                 // var grid = Ext.getCmp('GridSalesReturnGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                      
                    if(selectedRecord.data.noinvoice!==null)
                    {
                        Ext.Msg.alert('Failure', 'Invoice untuk data Sales Return terpilih sudah terbentuk. Silahkan pilih data Sales Return yang lain');
                    } else {
                         WindowEntrySalesInvoice.show();

                        var EntrySalesInvoice = Ext.getCmp('EntrySalesInvoice').getStore();
                        EntrySalesInvoice.removeAll();
                        EntrySalesInvoice.sync();

                        loadDataFormInvoice(selectedRecord.data.idsales);
                    }
                }
            }
        }, {
            itemId: 'editSalesReturnGrid',
            text: 'Ubah',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('GridSalesReturnGridID')[0];
                 var grid = Ext.getCmp('GridSalesReturnGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                } else {
                    loadMemberForm(selectedRecord.data.id_member)
                }
            }
        }, {
            id: 'btnDeleteSalesReturnGrid',
            text: 'Hapus',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.getCmp('GridSalesReturnGridID');
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SalesReturnGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:95
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            storeGridSalesReturnGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridSalesReturnGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesReturnGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesReturnGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadReturnSOData(record)
        }
    }
});


function loadMemberForm(id)
{
    // anggotaTypeStore.load();

        // var formSalesReturnGrid = Ext.getCmp('formSalesReturnGrid');
        // wSalesReturnGrid.show();
        // formSalesReturnGrid.getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/SalesReturnGrid/1/member',
        //     params: {
        //         extraparams: 'a.id_member:' + id
        //     },
        //     success: function(form, action) {
        //         var obj = Ext.decode(action.response.responseText); 
        //         // console.log(obj);
        //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
        //         formSalesReturnGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
        //         formSalesReturnGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // Ext.getCmp('memberFormDetailID').getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/SalesReturnGrid/1/member',
        //     params: {
        //         extraparams: 'a.id_member:' + id
        //     },
        //     success: function(form, action) {
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // Ext.getCmp('statusformSalesReturnGrid').setValue('edit');
        // Ext.getCmp('Tabanggota').setActiveTab(0);
}
