Ext.define('KitchenSink.view.grid.EntryPurchaseRequisition', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPurchaseRequisition',
    alias: 'widget.EntryPurchaseRequisition',
    xtype: 'cell-editing',
    title: 'Create Purchase Requisition',
    //    frame: true,    
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        Ext.apply(this, {
            width: 840,
            height: 500,
            forceFit: true,
            plugins: [this.cellEditing],
            store: null,
            columns: [
                {
                    header: 'No',
                    xtype: 'rownumberer',
                    width: 30,
                    sortable: false
                }, 
                {
                    header: 'product_id',
                    hidden: true,
                    dataIndex: 'product_id'
                }, 
                {
                    header: 'Item Code',
                    dataIndex: 'item_code',
                    width: 100
                }, 
                {
                    header: 'Item Name',
                    dataIndex: 'item_name',
                    width: 150
                }, 
                {
                    header: 'Unit',
                    dataIndex: 'unit',
                    width: 100
                }, 
                {
                    xtype: 'datecolumn',
                    header: 'Req. Date',
                    dataIndex: 'req_date',
                    width: 95,
                    format: 'd-M-Y',
                    editor:{
                        xtype: 'datefield',
                        format: 'd-M-Y',
                    }
                }, 
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1,
                    }
                }, 
                {
                    xtype: 'numbercolumn',
                    header: 'Price',
                    minWidth: 200,
                    dataIndex: 'price',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 100,
                    }
                }, {
                    header: 'Tax (%)',
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
                        valueField: 'rate',
                        labelWidth: 40
                    }
                }, 
                {
                    header: 'Subtotal',
                    dataIndex: 'subtotal',
                    minWidth: 200,
                    align: 'right',
                }, {
                    header: 'Remarks',
                    dataIndex: 'remarks',
                    minWidth: 200,
                    sortable: false,
                    flex:1,
                }, 
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    header: 'Action',
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: BASE_URL + 'assets/icons/fam/cross.gif',
                        tooltip: 'Hapus',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    fieldDefaults: {
                        labelWidth: 60,
                        width: 220,
                    },
                    items: [
                        {
                            xtype: 'comboxunit',
                            id: 'idunitRequisition',
                            name: 'idunit',
                            valueField: 'idunit',
                            listeners:{
                                select: function(){
                                    var date = new Date();
                                    var month= ('0'+(date.getMonth()+1)).slice(-2);
                                    var year = date.getFullYear().toString().substr(-2);
                                    var noorder = Ext.getCmp('noorderRequisition').getValue();
                                    if(noorder != "")
                                        Ext.getCmp('noorderRequisition').setValue('PR'+month+year+noorder.substr(6));
                                    else{
                                        insertNoRef(null, this.getValue(), 'noorderRequisition','PR'+month+year);

                                    }
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'hiddenfield',
                            id: 'idsupplierRequisition',
                            name: 'idsupplier',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Supplier',
                            name: 'suppname',
                            id: 'suppnameRequisition',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        if (Ext.getCmp('idunitRequisition').getValue() == null) {
                                            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                        } else {
                                            wGridSupplierListPopup.show();
                                            Ext.getCmp('prefixWinSupplierList').setValue('Requisition');
                                            
                                            storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'idunit': Ext.getCmp('idunitRequisition').getValue(),
                                                            'status': '1'
                                                };
                                            });
                                            storeGridSupplierList.load();
                                        }
                                    });
                                }
                            }
                        }, 
                        {
                            xtype: 'hiddenfield',
                            id: 'projectidRequisition',
                            name: 'project_id',
                            readOnly: true
                        }, 
                        '->',
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Project',
                            name: 'projectname',
                            id: 'projectnameRequisition',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        if (Ext.getCmp('idunitRequisition').getValue() == null) {
                                            Ext.Msg.alert('Perhatian', 'Location belum dipilih');
                                        } else {
                                            wGridProjectListPopup.show();
                                            Ext.getCmp('prefixWinProjectList').setValue('Requisition');
                                            
                                            storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'idunit': Ext.getCmp('idunitRequisition').getValue(),
                                                            'status': '1'
                                                };
                                            });
                                            storeGridSupplierList.load();
                                        }
                                    });
                                }
                            }
                        }
                    ],
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    fieldDefaults: {
                        labelWidth: 60,
                        width: 220,
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'noorderRequisition',
                            fieldLabel: 'No Order',
                            name: 'noorder',
                            readOnly: true,
                        },
                        '->',
                        {
                            xtype: 'datefield',
                            id: 'tanggalRequisition',
                            format: 'd/m/Y',
                            // value: datenow(),
                            fieldLabel: 'Tanggal',
                            // listeners:{
                            //     change: function(field, oldValue, newValue){
                            //         date = this.getValue();
                            //         settimezone(date);
                            //         var month= ('0'+(date.getMonth()+1)).slice(-2);
                            //         var year = date.getFullYear().toString().substr(-2);
                            //         console.log(date);
                            //         console.log(month);
                            //         var noorder = Ext.getCmp('noorderRequisition').getValue();
                            //         if(noorder != "")
                            //             Ext.getCmp('noorderRequisition').setValue('PR'+month+year+noorder.substr(6));
                            //         else{
                            //             insertNoRef(null, Ext.getCmp('idunitRequisition').getValue(), 'noorderRequisition','PR'+month+year);

                            //         }
                            //     }
                            // }
                        },
                        '->',
                        {
                            xtype: 'comboxrequisitionstatus',
                            value: '2',
                            readOnly: true,
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add Item',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'saveRequisition',
                            text: 'Save',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordRequisition, this, 'noprint', true)
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                    },
                    items:[
                        {
                            xtype: 'panel',
                            autoWidth: true,
                            defaults: {
                                labelWidth: 150, 
                                // minWidth: 300, 
                            },
                            layout: 'vbox',
                            // margin: '0 0 0 10',
                            items:[
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                    },
                                    flex: 1,
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'comboxpaymentterm',
                                            name: 'paymenttermRequisition',
                                            margin : {right: 10},
                                            labelWidth: 150,
                                            valueField: 'value',
                                            listeners:{
                                                select: function(){
                                                    Ext.getCmp('ddaysRequisition').setDisabled(true);
                                                    Ext.getCmp('eomddaysRequisition').setDisabled(true);
                                                    Ext.getCmp('percentagediscRequisition').setDisabled(true);
                                                    Ext.getCmp('daysdiscRequisition').setDisabled(true);
                                                    
                                                    Ext.getCmp('ddaysRequisition').setVisible(false);
                                                    Ext.getCmp('eomddaysRequisition').setVisible(false);
                                                    Ext.getCmp('percentagediscRequisition').setVisible(false);
                                                    Ext.getCmp('daysdiscRequisition').setVisible(false);
                                                    
                                                    switch(this.getValue()){
                                                        case '3':
                                                            Ext.getCmp('ddaysRequisition').setDisabled(false);
                                                            Ext.getCmp('ddaysRequisition').setVisible(true);
                                                            break;
                                                        case '4':
                                                            Ext.getCmp('eomddaysRequisition').setDisabled(false);
                                                            Ext.getCmp('eomddaysRequisition').setVisible(true);
                                                            break;
                                                        case '5':
                                                            Ext.getCmp('percentagediscRequisition').setDisabled(false);
                                                            Ext.getCmp('daysdiscRequisition').setDisabled(false);
                                                            Ext.getCmp('percentagediscRequisition').setVisible(true);
                                                            Ext.getCmp('daysdiscRequisition').setVisible(true);

                                                        break;
                                                    }
                                                    var panel = this.ownerCt;
                                                    // panel.doLayout();
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'ddaysRequisition',
                                            name: 'ddays',
                                            width: 120,
                                            inputWidth: 60,
                                            afterSubTpl: ' days',
                                            maskRe: /[0-9]/,
                                            hidden: true,
                                            disabled: true,
                                            listeners:{
                                                'render': function(c){
                                                    c.getEl().on('keyup', function(){
                                                        if(!Number.isNaN(parseInt(this.getValue())))
                                                            this.setValue(parseInt(this.getValue()));
                                                        else
                                                            this.setValue(0);
                                                    }, c)
                                                    
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'eomddaysRequisition',
                                            name: 'eomddays',
                                            width: 180,
                                            inputWidth: 60,
                                            beforeSubTpl: 'EOM ',
                                            afterSubTpl: ' days',
                                            maskRe: /[0-9]/,
                                            hidden: true,
                                            disabled: true,
                                            listeners:{
                                                'render': function(c){
                                                    c.getEl().on('keyup', function(){
                                                        if(!Number.isNaN(parseInt(this.getValue())))
                                                            this.setValue(parseInt(this.getValue()));
                                                        else
                                                            this.setValue(0);
                                                    }, c)
                                                    
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'percentagediscRequisition',
                                            name: 'percentagedisc',
                                            width: 90,
                                            inputWidth: 60,
                                            afterSubTpl: ' % /',
                                            maskRe: /[0-9.]/,
                                            hidden: true,
                                            disabled: true,
                                            listeners:{
                                                'render': function(c){
                                                    c.getEl().on('keyup', function(){
                                                        if(this.getValue().substr(-1) == ".")
                                                            return true;

                                                        if(!Number.isNaN(parseFloat(this.getValue())))
                                                            this.setValue(parseFloat(this.getValue()));
                                                        else
                                                            this.setValue(0);
                                                    }, c)
                                                    
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'daysdiscRequisition',
                                            name: 'daydisc',
                                            width: 120,
                                            inputWidth: 60,
                                            afterSubTpl: ' NET',
                                            maskRe: /[0-9]/,
                                            hidden: true,
                                            disabled: true,
                                            listeners:{
                                                'render': function(c){
                                                    c.getEl().on('keyup', function(){
                                                        if(!Number.isNaN(parseInt(this.getValue())))
                                                            this.setValue(parseInt(this.getValue()));
                                                        else
                                                            this.setValue(0);
                                                    }, c)
                                                    
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'comboxidcurrency',
                                    name: 'idcurrencyRequisition',
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                    },
                                    defaults: {
                                        labelWidth: 150,
                                        margin: {
                                            right: 10,
                                        },
                                    },
                                    flex: 1,
                                    margin: '0 0 5 0',
                                    items:[
                                        {
                                            xtype: 'comboxshipping',
                                            name: 'idshippingRequisition',
                                        },
                                        {
                                            xtype: 'comboxshippingaddress',
                                            name: 'shippingaddressRequisition',
                                        },
                                    ]
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'noteRequisition',
                                    fieldLabel: 'Note',
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'panel',
                            fieldDefaults: {
                                labelWidth: 100, 
                                width: 300,
                            },
                            layout: {
                                type: 'vbox',
                                align: 'left',
                            },
                            items:[
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Total',
                                    id: 'totalRequisition',
                                    name: 'total',
                                    readOnly: true,
                                    align: 'right',
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Total Tax',
                                    id: 'totaltaxRequisition',
                                    name: 'totaltax',
                                    readOnly: true,
                                    align: 'right',
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Total After Tax',
                                    id: 'totalaftertaxRequisition',
                                    name: 'totalaftertax',
                                    readOnly: true,
                                    align: 'right',
                                },

                            ]
                        }
                    ]
                },
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        //disableEntryPurchaseRequisition();
                    }
                }
            }
        }); 
        this.callParent(); 
        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        }); 
        this.on('afteredit', this.onAfterEdit, this); 
        this.on({
            scope: this,
            edit: function() {
                updateGridRequisition();
            }
        });
    },  
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordRequisitionPrint: function(button, event, mode) {
        console.log(mode)
    },
    recordRequisition: function(button, event, mode) {
        if (validasiRequisition()) {
            var json = Ext.encode(Ext.pluck(RequisitionGridStore.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPurchaseRequisition').getValue());
            Ext.Ajax.request({
                url: SITE_URL + 'money/recordRequisition',
                method: 'POST',
                params: {
                    idaccountRequisition: Ext.getCmp('idaccountRequisition').getValue(),
                    notransRequisition: Ext.getCmp('notransRequisition').getValue(),
                    receiveFrom: Ext.getCmp('receiveFrom').getValue(),
                    tanggalRequisition: Ext.getCmp('tanggalRequisition').getValue(),
                    memoRequisition: Ext.getCmp('memoRequisition').getValue(),
                    totalRequisition: Ext.getCmp('totalRequisition').getValue(),
                    taxRequisition: Ext.getCmp('taxRequisition').getValue(),
                    subtotalRequisition: Ext.getCmp('subtotalRequisition').getValue(),
                    idunitRequisition: Ext.getCmp('idunitRequisition').getValue(),
                    dataGrid: json
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
                        //                        
                        Ext.getCmp('accnameRequisition').setValue(null);
                        Ext.getCmp('idaccountRequisition').setValue(null);
                        Ext.getCmp('accnumberRequisition').setValue(null);
                        Ext.getCmp('notransRequisition').setValue(null);
                        Ext.getCmp('receiveFrom').setValue(null);
                        Ext.getCmp('tanggalRequisition').setValue(null);
                        Ext.getCmp('memoRequisition').setValue(null);
                        Ext.getCmp('totalRequisition').setValue(null);
                        Ext.getCmp('taxRequisition').setValue(null);
                        Ext.getCmp('subtotalRequisition').setValue(null);
                        //                        Ext.getCmp('idunitRequisition').setValue(null);
                        // RequisitionGridStore.removeAll();
                        // RequisitionGridStore.sync();
                        updateGridRequisition();
                        if (mode == 'print') {
                            cetak('Cetak Kwitansi', 'receivemoney', d.id);
                        }
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
    },
    saveRecurr: function() {
        if (validasiPayment()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {
        //        this.getStore().load({
        //            // store loading is asynchronous, use a load listener or callback to handle results
        //            callback: this.onStoreLoad
        //        });
    },
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {
        if (Ext.getCmp('idunitRequisition').getValue() == null) {
            Ext.Msg.alert('Perhatian', 'Location belum dipilih');
        } else {
            wInventoryIsBuyListPopup.show();
            storeGridInventoryIsBuyList.load();
        }
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridRequisition();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridRequisition() {
    var subtotalRequisition = 0 * 1;
    var totalPajak = 0 * 1;
    var totalRequisition = 0 * 1;
    Ext.each(RequisitionGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalRequisition += obj.data.amount * 1;
    });
    totalRequisition = subtotalRequisition * 1 - totalPajak * 1;
    Ext.getCmp('subtotalRequisition').setValue(subtotalRequisition.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
    Ext.getCmp('taxRequisition').setValue(totalPajak.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
    Ext.getCmp('totalRequisition').setValue(totalRequisition.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
}

function validasiRequisition() {
    //    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('accnameRequisition').getValue() == '') {
        Ext.Msg.alert('Failed', 'Akun penerimaan kas belum diinput');
    } else if (Ext.getCmp('notransRequisition').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan no transaksi');
    } else if (Ext.getCmp('tanggalRequisition').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan');
    } else if (Ext.getCmp('memoRequisition').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan memo penerimaan');
    } else if (Ext.getCmp('subtotalRequisition').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan item penerimaan');
    } else {
        return true;
    }
}
var wEntryPurchaseRequisition = Ext.create('widget.window', {
    id: 'wEntryPurchaseRequisition',
    title: 'Input Penerimaan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntryPurchaseRequisition'
    }]
});


