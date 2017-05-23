var formPurchase = Ext.create('Ext.grid.Panel', {
    id: 'formPurchaseID',
    itemId: 'formPurchaseID',
    alias: 'widget.GridPurchaseRequisition',
    store: Ext.create('Ext.data.Store', {
        fields: ['idpurchaseitem','idinventory','invno','nameinventory','unit','cost','qty','ratetax','total', 'remarks', 'assetaccount'],
        listeners: {
            datachanged: function(store, eOpts){
                formPurchase.fireEvent('afterEdit');
            }
        }
    }),
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            edit: function(editor, e, eOpts){
                formPurchase.fireEvent('afterEdit');
            }
        }
    },
    // autoScroll: true,
    loadMask: true,
    height: 500,
    width: 1240,
    columns: [
        {header: 'No', xtype: 'rownumberer', width: 40, sortable: false}, 
        {header: 'idinventory', hidden: true, dataIndex: 'idinventory'}, 
        {header: 'Item Code', dataIndex: 'invno', width: 100}, 
        {header: 'Item Name', dataIndex: 'nameinventory', width: 150}, 
        {header: 'Unit', dataIndex: 'unitmeasure', width: 100}, 
        {xtype: 'numbercolumn', header: 'Qty', width: 100, dataIndex: 'qty', align: 'right', editor: {
            xtype: 'numberfield', allowBlank: false, minValue: 1,
        }}, 
        {xtype: 'numbercolumn', header: 'Price', minWidth: 150, dataIndex: 'cost', align: 'right', editor: {
            xtype: 'numberfield', allowBlank: false, minValue: 100, 
        }}, 
        {header: 'Tax (%)', dataIndex: 'ratetax' , editor: {
            xtype: 'comboxtax', valueField: 'rate', fieldLabel:null,
        }}, 
        {xtype: 'numbercolumn', header: 'Subtotal', dataIndex: 'total', minWidth: 150, align: 'right', }, 
        {header: 'Remarks', dataIndex: 'remarks', minWidth: 200, sortable: false, flex:1, editor:{
            xtype: 'textfield'
        }}, 
        {xtype: 'actioncolumn', itemId:'colAct', width: 30, align: 'center', sortable: false, menuDisabled: true, items: [{
            icon: BASE_URL + 'assets/icons/fam/cross.gif', tooltip: 'Remove', handler: function(grid, rowIndex){formPurchase.fireEvent('removeItem', grid, rowIndex)}
        }]}
    ], 
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            fieldDefaults: {
                labelWidth: 55,
                width: 200,
            },
            items: [
                {
                    xtype: 'comboxunit',
                    itemId: 'idunit',
                    listeners: {
                        select: function(){
                            formPurchase.queryById('noorder').setValue(); 
                            if(formPurchase.queryById('idpurchasestatus').getValue()==5){
                                setNoRecord(formPurchase.queryById('idunit').getValue(), formPurchase, 'purchase', 'purchase', 3);
                            }
                        },
                        change: function(combo, newVal, oldVal){
                            if(FormPurchase.statusform == 'edit' && FormPurchase.mode == 'requisition' && oldVal != undefined && newVal != undefined){
                                Ext.Msg.show({
                                    title: 'Confirm',
                                    msg: 'Changing unit will be remove all added items.<br/>Do you want to continue?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn) {
                                        if (btn == 'yes') {
                                            formPurchase.fireEvent('removeAllItems');
                                        }
                                    }
                                });
                            }
                        }
                    }
                }, 
                '->',
                {
                    xtype: 'textfield',
                    fieldLabel: 'Supplier',
                    itemId:'supplier',
                    emptyText: 'Choose Supplier...',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                //no action if disabled
                                if(formPurchase.queryById('supplier').isDisabled()) return false;

                                var cbunit = formPurchase.queryById('idunit');
                                if (cbunit.getValue() == null) {
                                    Ext.Msg.alert('Error', 'Unit is not set');
                                } else {
                                    storeChooserListSupplier.on('beforeload',function(store,operation,eOpts){
                                        operation.params={extraparams: 'a.status: 1, a.deleted: 0, a.idunit:'+  cbunit.getValue()};
                                    });
                                    ChooserListSupplier.target = formPurchase;
                                    ChooserListSupplier.show();
                                }
                            });
                        },
                        change: function(field, newVal, oldVal){
                            if(FormPurchase.statusform == 'edit' && FormPurchase.mode == 'requisition' && formPurchase.getStore().getRange().length != 0){
                                Ext.Msg.show({
                                    title: 'Confirm',
                                    msg: 'Changing supplier will be remove all added items.<br/>Do you want to continue?',
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn) {
                                        if (btn == 'yes') {
                                            formPurchase.fireEvent('removeAllItems');
                                        }
                                    }
                                });
                            }

                        }
                    }
                },
                '->',
                {
                    xtype: 'textfield',
                    itemId: 'project',
                    fieldLabel: 'Project',
                    emptyText: 'Choose Project...',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                var cbunit = formPurchase.queryById('idunit');
                                if (cbunit.getValue() == null) {
                                    Ext.Msg.alert('Error', 'Unit is not set');
                                } else {
                                    storeChooserListProject.on('beforeload',function(store,operation,eOpts){
                                        operation.params={extraparams: 'a.status: 1, a.deleted: 0, a.idunit:'+  cbunit.getValue()};
                                    });
                                    ChooserListProject.target = formPurchase;
                                    ChooserListProject.show();
                                }
                            });
                        }
                    }
                },
            ],
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            fieldDefaults: {
                labelWidth: 55,
                width: 200,
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Order',
                    itemId: 'noorder',
                    readOnly: true,
                },
                '->',
                {
                    xtype: 'datefield',
                    itemId: 'requestdate',
                    format: 'd/m/Y',
                    fieldLabel: 'Request Date',
                },
                '->',
                {
                    xtype: 'comboxpurchasestatus',
                    itemId: 'idpurchasestatus',
                    listeners: {
                        select: function(){
                            formPurchase.queryById('noorder').setValue(); 
                            if(this.getValue()==5){
                                var idunit = formPurchase.queryById('idunit').getValue();
                                if(['',null].includes(idunit)){
                                    Ext.Msg.alert('Error', 'Unit is not set');
                                    this.setValue('1');
                                    return;
                                }
                                setNoRecord(formPurchase.queryById('idunit').getValue(), formPurchase, 'purchase', 'purchase', 3);
                            }
                        }
                    }
                },
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Add Item',
                    iconCls: 'add-icon',
                    itemId: 'btnAdd',
                    handler: function(){
                        formPurchase.fireEvent('addClick');
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    itemId: 'btnSave',
                    iconCls: 'disk',
                    handler: function(){
                        formPurchase.fireEvent('validateForm', function(message){
                            if(message != null)
                                Ext.Msg.alert('Failed', message);
                            else
                                formPurchase.fireEvent('save');    
                        });
                    }
                },
                {
                    text: 'Cancel',
                    handler: function(){
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Are you sure want to cancel your changes?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    FormPurchase.hide();
                                }
                            }
                        });
                    }
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
                    },
                    layout: 'vbox',
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
                                    xtype: 'comboxpurchasetype',
                                    itemId: 'idpurchasetype',
                                    fieldLabel: 'Payment Type',
                                    margin : {right: 10},
                                    labelWidth: 150,
                                    listeners:{
                                        select: function(){
                                            var form = formPurchase;
                                            form.queryById('netddays').setValue();
                                            form.queryById('neteomddays').setValue();
                                            form.queryById('discount').setValue();
                                            form.queryById('netdmax').setValue();

                                            form.queryById('netddays').setDisabled(true);
                                            form.queryById('neteomddays').setDisabled(true);
                                            form.queryById('discount').setDisabled(true);
                                            form.queryById('netdmax').setDisabled(true);
                                            
                                            form.queryById('netddays').setVisible(false);
                                            form.queryById('neteomddays').setVisible(false);
                                            form.queryById('discount').setVisible(false);
                                            form.queryById('netdmax').setVisible(false);

                                            switch(this.getValue()){
                                                case '3':
                                                    form.queryById('netddays').setDisabled(false);
                                                    form.queryById('netddays').setVisible(true);
                                                    break;
                                                case '4':
                                                    form.queryById('neteomddays').setDisabled(false);
                                                    form.queryById('neteomddays').setVisible(true);
                                                    break;
                                                case '5':
                                                    form.queryById('discount').setDisabled(false);
                                                    form.queryById('netdmax').setDisabled(false);
                                                    form.queryById('discount').setVisible(true);
                                                    form.queryById('netdmax').setVisible(true);

                                                break;
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'netddays',
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
                                    itemId: 'neteomddays',
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
                                    itemId: 'discount',
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
                                    itemId: 'netdmax',
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
                                },
                            ]
                        },
                        {
                            xtype: 'comboxcurrency',
                            itemId: 'idcurrency',
                        },
                        {
                            xtype: 'comboxshipping',
                            itemId: 'idshipping',
                            fieldLabel: 'Shipping',
                        },
                        {
                            xtype: 'comboxshipaddress',
                            itemId: 'shipaddress',
                        },
                        {   
                            xtype: 'textfield',
                            fieldLabel: 'Note',
                            itemId: 'notes',
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
                            itemId: 'total',
                            readOnly: true,
                            align: 'right',
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Total Tax',
                            itemId: 'totaltax',
                            readOnly: true,
                            align: 'right',
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Total After Tax',
                            itemId: 'totalaftertax',
                            readOnly: true,
                            align: 'right',
                        },
                    ]
                }
            ]
        },
    ],
    listeners: {
        'render': function(grid){
            grid.getStore().load();
        },
        'addClick': function(){
            if(formPurchase.idsupplier === undefined){
                Ext.Msg.alert('Error', 'Supplier is not set');
            }else{
                storeChooserListInventory.on('beforeload', function(store,operation,eOpts){
                    return operation.params = {extraparams:'a.status:1, a.deleted: 0, a.idsupplier:'+formPurchase.idsupplier};
                })
                ChooserListInventory.target = formPurchase;
                ChooserListInventory.show();
            }   
        },
        'selectSupplier': function(data){
            formPurchase.idsupplier = data['idsupplier'];
            formPurchase.queryById('supplier').setValue(data['namesupplier']);
        },
        'selectProject': function(data){
            formPurchase.idproject = data['idproject'];
            formPurchase.queryById('project').setValue(data['projectname']);
        },
        'selectInventory': function(data){
            // if(data.accnumber == null){
            //     storeChooserListAccount.on('beforeload', function(store, operation, eOpts){
            //         operation.params= {
            //             'idunit': formPurchase.queryById('idunit').getValue(),
            //             'idaccounttype':'17,3,4,5,20',
            //         }
            //     });
            //     ChooserListAccount.target = formPurchase;
            //     ChooserListAccount.itemInventory = data;
            //     ChooserListAccount.show();
            // }else{
                data.qty = 1;
                formPurchase.getStore().add(data);
            // }
        },
        'selectAccount': function(account){
            // var data = ChooserListAccount.itemInventory;
            // data.assetaccount = account.idaccount;
            // data.qty = 1;
            // data.ratetax = 0;
            // formPurchase.getStore().add(data);
            // formPurchase.fireEvent('afterEdit');
            // delete ChooserListAccount.itemInventory;
        },
        'setNoRecord': function(model, norecord){
            var no = norecord +'/PO/APS/'+ romanize(new Date().getMonth()+1) +'/'+new Date().getFullYear().toString().substr(-2);
            formPurchase.queryById('noorder').setValue(no);
            formPurchase.norecord = parseInt(norecord);
        },
        'afterEdit': function(){
            var total = 0;
            var totaltax = 0;

            Ext.each(formPurchase.getStore().getRange(), function(item, i) {
                var subtotal = (item.data.qty || 0) * item.data.cost;
                var tax = subtotal * (item.data.ratetax || 0) / 100;
                total += subtotal;
                totaltax += tax;
                item.set('total', subtotal + tax);
            });
            
            var totalaftertax = total + totaltax;
            formPurchase.queryById('total').setValue(total);
            formPurchase.queryById('totaltax').setValue(totaltax);
            formPurchase.queryById('totalaftertax').setValue(totalaftertax);
        },
        removeItem: function(grid, rowIndex){
            item = formPurchase.getStore().getRange()[rowIndex];
            if(item.data.idpurchaseitem != ""){

                Ext.Ajax.request({
                    url: SITE_URL + 'backend/ext_delete/PurchaseItem/purchase',
                    method: 'POST',
                    params: {
                        postdata: Ext.encode([item.data.idpurchaseitem]),
                        idmenu:134
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
            }
            formPurchase.getStore().removeAt(rowIndex);
            
        },
        removeAllItems: function(){
            items = [];
            Ext.each(formPurchase.getStore().getRange(), function(item, index){
                if(item.data.idpurchaseitem != "")
                    items.push(item.data.idpurchaseitem);
            });
            Ext.Ajax.request({
                url: SITE_URL + 'backend/ext_delete/PurchaseItem/purchase',
                method: 'POST',
                params: {
                    postdata: Ext.encode(items),
                    idmenu:134
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Informasi', d.message);
                    } else {
                        formPurchase.getStore().removeAll();
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        },
        'clearForm': function(){
            var form = formPurchase;
            form.getStore().removeAll();
            form.queryById('idunit').setValue();
            delete form.idsupplier;
            form.queryById('supplier').setValue();
            delete form.idproject;
            form.queryById('project').setValue();
            form.queryById('noorder').setValue();
            form.queryById('requestdate').setValue();
            form.queryById('idpurchasestatus').setValue();

            form.queryById('idpurchasetype').setValue();
            form.queryById('netddays').setValue();
            form.queryById('neteomddays').setValue();
            form.queryById('discount').setValue();
            form.queryById('netdmax').setValue();

            form.queryById('idcurrency').setValue();
            form.queryById('idshipping').setValue();
            form.queryById('shipaddress').setValue();
            form.queryById('notes').setValue();

            form.queryById('total').setValue();
            form.queryById('totaltax').setValue();
            form.queryById('totalaftertax').setValue();

            if(FormPurchase.purchase !== undefined) delete FormPurchase.purchase;
        },
        'validateForm': function(cb){
            var message = null;
            var form = formPurchase;
            var empty = ['', null];
            var required = ['idunit','supplier','project','requestdate','idpurchasestatus','idpurchasetype','idcurrency','idshipping','shipaddress']

            if(form.queryById('idpurchasestatus').getValue() == 1){
                cb();
                return false;
            }

            if(form.getStore().getRange().length == 0){
                message = 'Item Requisition is empty.';
            }
            required.forEach(function(item){
                var field = form.queryById(item);
                if(empty.includes(field.getValue())){
                    message = field.fieldLabel + ' is required';
                    return false;
                }
            })

            if(form.queryById('idpurchasetype').getValue() == 3 && empty.includes(form.queryById('netddays').getValue())){
                message = 'ddays is required';
            }
            else if(form.queryById('idpurchasetype').getValue() == 4 && empty.includes(form.queryById('neteomddays').getValue())){
                message = 'EOM ddays is required';
            }
            else if(form.queryById('idpurchasetype').getValue() == 5){ 
                if(empty.includes(form.queryById('discount').getValue())){
                    message = 'Percentage Discount is required';
                } 
                else if(empty.includes(form.queryById('netdmax').getValue())){
                    message = 'NET is required';
                }
            }
            cb(message);
        },
        'save': function(){
            var form = formPurchase;
            var items = Ext.encode(Ext.pluck(formPurchase.getStore().data.items, 'data'));
            Ext.Ajax.request({
                url: SITE_URL + 'purchase/savePurchase',
                method: 'POST',
                params: {
                    statusform: FormPurchase.statusform,
                    idpurchase: form.idpurchase,
                    idunit: form.queryById('idunit').getValue(), 
                    idsupplier: form.idsupplier,
                    idproject: form.idproject,
                    norecord: formPurchase.norecord || null,
                    nopurchase: form.queryById('noorder').getValue(),
                    requestdate: form.queryById('requestdate').getValue(),
                    idpurchasestatus: form.queryById('idpurchasestatus').getValue(),
                    idpurchasetype: form.queryById('idpurchasetype').getValue(),
                    netddays: form.queryById('netddays').getValue() || 0,
                    neteomddays: form.queryById('neteomddays').getValue() || 0,
                    discount: form.queryById('discount').getValue() || 0,
                    netdmax: form.queryById('netdmax').getValue() || 0,
                    idcurrency: form.queryById('idcurrency').getValue(),
                    idshipping: form.queryById('idshipping').getValue(),
                    shipaddress: form.queryById('shipaddress').getValue(),
                    notes: form.queryById('notes').getValue(),
                    subtotal: form.queryById('total').getValue(),
                    tax: form.queryById('totaltax').getValue(),
                    totalamount: form.queryById('totalaftertax').getValue(),
                    items: items,
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success){
                        Ext.Msg.alert('Failed', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
                        storeGridPurchase.load();
                        FormPurchase.hide();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        },
        'load': function(record){
            var form = formPurchase;
            var data = record.data;
            form.idpurchase = data.idpurchase;
            form.queryById('idunit').setValue(data.idunit);
            form.idsupplier = data.idsupplier;
            form.queryById('supplier').setValue(data.namesupplier);
            form.idproject = data.idproject;
            form.queryById('project').setValue(data.projectname);
            form.queryById('noorder').setValue(data.nopurchase);
            form.queryById('requestdate').setValue(data.requestdate);
            form.queryById('idpurchasestatus').setValue(data.idpurchasestatus);
            form.queryById('idpurchasetype').setValue(data.idpurchasetype);
            form.queryById('netddays').setValue(data.netddays);
            form.queryById('neteomddays').setValue(data.neteomddays);
            form.queryById('discount').setValue(data.discount);
            form.queryById('netdmax').setValue(data.netdmax);
            form.queryById('idcurrency').setValue(data.idcurrency);
            form.queryById('idshipping').setValue(data.idshipping);
            form.queryById('shipaddress').setValue(data.shipaddress);
            form.queryById('notes').setValue(data.notes);
            form.queryById('total').setValue(data.subtotal);
            form.queryById('totaltax').setValue(data.tax);
            form.queryById('totalaftertax').setValue(data.totalamount);

            //get purchase items 
            var store = Ext.create('Ext.data.Store',{
                model:'App.model.PurchaseItem',
                listeners:{
                    beforeload: function(store,operation){
                        return operation.params = {extraparams: 'a.status:1, a.deleted:0, idpurchase:'+data.idpurchase}
                    },
                    load: function(store,records){
                        formPurchase.getStore().add(records);
                    }
                }
            }).load();
        },
    }
});

var FormPurchase = Ext.create('widget.window', {
    title: 'Purchase Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [formPurchase],
    listeners:{
        'show': function(win){
            var form = formPurchase;
            if(win.mode == 'requisition' && win.statusform == 'input'){
                win.setTitle('Purchase Requisition');
                //filter combox purchase status
                form.queryById('idpurchasestatus').getStore().filter([
                    {filterFn: function(item){return item.get('idpurchasestatus') < 3}}
                ]);
                form.queryById('idpurchasestatus').setValue('2');
            }
            else if(win.mode == 'requisition' && win.statusform == 'edit'){
                win.setTitle('Purchase Requisition');
                form.fireEvent('load', win.purchase);
                if(win.purchase.data.idpurchasestatus >= 3){
                    form.queryById('idunit').setDisabled(true);
                    form.queryById('supplier').setDisabled(true);
                    form.queryById('project').setDisabled(true);
                    form.queryById('noorder').setDisabled(true);
                    form.queryById('requestdate').setDisabled(true);
                    form.queryById('idpurchasetype').setDisabled(true);
                    form.queryById('netddays').setDisabled(true);
                    form.queryById('neteomddays').setDisabled(true);
                    form.queryById('discount').setDisabled(true);
                    form.queryById('netdmax').setDisabled(true);
                    form.queryById('idcurrency').setDisabled(true);
                    form.queryById('idshipping').setDisabled(true);
                    form.queryById('shipaddress').setDisabled(true);
                    form.queryById('notes').setDisabled(true);
                    form.queryById('idpurchasestatus').setDisabled(true);
                    form.queryById('btnAdd').setDisabled(true);
                    form.queryById('btnSave').setDisabled(true);
                    form.queryById('colAct').hide();
                }
            }
            else if(win.mode != 'requisition' && win.statusform == 'input'){
                //filter combox purchase status
                form.queryById('idpurchasestatus').getStore().filter([
                    {filterFn: function(item){return [1,5].includes(parseInt(item.get('idpurchasestatus')))}}
                ]);
                form.queryById('idpurchasestatus').setValue('5');
            }
            else if(win.mode != 'requisition' && win.statusform == 'edit'){
                
                form.fireEvent('load', win.purchase);
                if(win.purchase.data.idpurchasestatus >= 4){
                    form.queryById('idunit').setDisabled(true);
                    form.queryById('supplier').setDisabled(true);
                    form.queryById('project').setDisabled(true);
                    form.queryById('noorder').setDisabled(true);
                    form.queryById('requestdate').setDisabled(true);
                    form.queryById('idpurchasestatus').setDisabled(true);
                    form.queryById('idpurchasetype').setDisabled(true);
                    form.queryById('netddays').setDisabled(true);
                    form.queryById('neteomddays').setDisabled(true);
                    form.queryById('discount').setDisabled(true);
                    form.queryById('netdmax').setDisabled(true);
                    form.queryById('idcurrency').setDisabled(true);
                    form.queryById('idshipping').setDisabled(true);
                    form.queryById('shipaddress').setDisabled(true);
                    form.queryById('notes').setDisabled(true);
                    form.queryById('btnAdd').setDisabled(true);
                    form.queryById('btnSave').setDisabled(true);
                    form.queryById('colAct').hide();
                }
                else if(win.purchase.data.idpurchasestatus >= 2){
                    form.queryById('idunit').setDisabled(true);
                    form.queryById('supplier').setDisabled(true);
                    form.queryById('project').setDisabled(true);
                    form.queryById('requestdate').setDisabled(true);
                    
                    //filter combox purchase status
                    form.queryById('idpurchasestatus').getStore().filter([
                        {filterFn: function(item){return [3,4,5].includes(parseInt(item.get('idpurchasestatus')))}}
                    ]);
                    form.queryById('idpurchasestatus').setValue('3');
                }
                else if(win.purchase.data.idpurchasestatus == 1){
                    //filter combox purchase status
                    form.queryById('idpurchasestatus').getStore().filter([
                        {filterFn: function(item){return [1,5].includes(parseInt(item.get('idpurchasestatus')))}}
                    ]);
                    form.queryById('idpurchasestatus').setValue('5');
                }    
                // if(win.purchase.data.idpurchasestatus > 2) //if status isnot draft 
            }

            form.queryById('requestdate').setValue(new Date());
        },
        'hide': function(){
            var form = formPurchase;

            //clear form
            form.fireEvent('clearForm');
            form.queryById('idunit').setDisabled(false);
            form.queryById('supplier').setDisabled(false);
            form.queryById('project').setDisabled(false);
            form.queryById('noorder').setDisabled(false);
            form.queryById('requestdate').setDisabled(false);
            form.queryById('idpurchasestatus').setDisabled(false);
            form.queryById('idpurchasetype').setDisabled(false);
            form.queryById('netddays').setDisabled(false);
            form.queryById('neteomddays').setDisabled(false);
            form.queryById('discount').setDisabled(false);
            form.queryById('netdmax').setDisabled(false);
            form.queryById('idcurrency').setDisabled(false);
            form.queryById('idshipping').setDisabled(false);
            form.queryById('shipaddress').setDisabled(false);
            form.queryById('notes').setDisabled(false);
            form.queryById('btnAdd').setDisabled(false);
            form.queryById('btnSave').setDisabled(false);
            form.queryById('colAct').show();

            //clear filter comboxpurchasestatus
            var storecb1 = form.queryById('idpurchasestatus').getStore();
            storecb1.clearFilter();
            storecb1.load();
        }

    }
});