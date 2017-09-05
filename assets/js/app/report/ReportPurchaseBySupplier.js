Ext.define('GridpopupSupplierPurchaseBySupplierReportModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridpopupSupplierPurchaseBySupplierReport = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpopupSupplierPurchaseBySupplierReportModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/supplierGrid',
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
Ext.define('MY.searchGridpopupSupplierPurchaseBySupplierReport', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpopupSupplierPurchaseBySupplierReport',
    store: storeGridpopupSupplierPurchaseBySupplierReport,
    width: 180
});
var smGridpopupSupplierPurchaseBySupplierReport = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpopupSupplierPurchaseBySupplierReport.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletepopupSupplierPurchaseBySupplierReport').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletepopupSupplierPurchaseBySupplierReport').enable();
        }
    }
});

Ext.define('GridpopupSupplierPurchaseBySupplierReport', {
    itemId: 'GridpopupSupplierPurchaseBySupplierReportID',
    id: 'GridpopupSupplierPurchaseBySupplierReportID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridpopupSupplierPurchaseBySupplierReport',
    store: storeGridpopupSupplierPurchaseBySupplierReport,
    loadMask: true,
    columns: [{
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hidden: true
    }, {
        header: 'code',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'namesupplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'fax',
        dataIndex: 'fax',
        minWidth: 150
    }, {
        header: 'email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'website',
        dataIndex: 'website',
        minWidth: 150
    }, ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'pilihpopupSupplierPurchaseBySupplierReport',
            text: 'Pilih Supplier',
            iconCls: 'tick-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridpopupSupplierPurchaseBySupplierReport')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    Ext.getCmp('idsupplierReportReportPurchaseBySupplier').setValue(selectedRecord.data.idsupplier);
                    Ext.getCmp('supplierNameReportReportPurchaseBySupplier').setValue(selectedRecord.data.namesupplier);
                    Ext.getCmp('wpopupSupplierPurchaseBySupplierReport').hide();
                }
            }
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridpopupSupplierPurchaseBySupplierReport',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpopupSupplierPurchaseBySupplierReport, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpopupSupplierPurchaseBySupplierReport.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formpopupSupplierPurchaseBySupplierReport = Ext.getCmp('formpopupSupplierPurchaseBySupplierReport');
            wpopupSupplierPurchaseBySupplierReport.show();
            formpopupSupplierPurchaseBySupplierReport.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/popupSupplierPurchaseBySupplierReport/1',
                    params: {
                        extraparams: 'a.idsupplier:' + record.data.idsupplier
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
            Ext.getCmp('statusformpopupSupplierPurchaseBySupplierReport').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});

var wpopupSupplierPurchaseBySupplierReport = Ext.create('widget.window', {
    id: 'wpopupSupplierPurchaseBySupplierReport',
    title: 'Pilih Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    modal: true,
    //    autoWidth: true,
    width: 670,
    height: panelH,
    // minHeight: 440,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridpopupSupplierPurchaseBySupplierReport'
    }]
});

//end popup supplier window

Ext.define(dir_sys + 'report.ReportPurchaseBySupplier', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportPurchaseBySupplier',
    id: 'reportReportPurchaseBySupplier',
    title: 'Pembelian Per Supplier',
    listeners: {
        'selectInventory': function(data) {}
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Email',
                hidden: true,
                iconCls: 'email-icon',
                listeners: {
                    click: function(component) {

                    }
                }
            }, {
                xtype: 'button',
                text: 'Cetak',
                iconCls: 'print-icon',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportReportPurchaseBySupplier').getValue();
                        var sd = Ext.getCmp('startdateReportReportPurchaseBySupplier').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportReportPurchaseBySupplier').getSubmitValue();
                        var idsupplier = Ext.getCmp('idsupplierReportReportPurchaseBySupplier').getSubmitValue();
                        
                        if(sd==''){
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if(nd==''){
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportReportPurchaseBySupplier').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseBySupplier' src='" + SITE_URL + "laporan/ReportPurchaseBySupplier/" + unitReportReportPurchaseBySupplier + "/" + report1 + "/print'>");
                        }
                    }
                }
            },
            {
                xtype: 'button',
                hidden: true,
                text: 'Export PDF',
                iconCls: 'acrobat',
                listeners: {
                    click: function(component) {

                    }
                }
            },
            {
                xtype: 'button',
                text: 'Export Excel',
                hidden: true,
                iconCls: 'page_excel',
                listeners: {
                    click: function(component) {
                        var report1 = Ext.getCmp('tanggalReportReportPurchaseBySupplier1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportReportPurchaseBySupplier2').getSubmitValue();
                        var unitReportReportPurchaseBySupplier = Ext.getCmp('unitReportReportPurchaseBySupplier').getValue();
                        Ext.getCmp('reportReportPurchaseBySupplier').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseBySupplier' src='" + SITE_URL + "laporan/ReportPurchaseBySupplier/" + unitReportReportPurchaseBySupplier + "/" + report1 + "/excel'>");
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                xtype: 'comboxunit',
                labelWidth: 40,
                multiSelect: true,
                valueField: 'idunit',
                id: 'unitReportReportPurchaseBySupplier'
            }, {
                xtype: 'datefield',
                id: 'startdateReportReportPurchaseBySupplier',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportReportPurchaseBySupplier',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 's/d'
            },
            {
                xtype: 'hiddenfield',
                name: 'idsupplier',
                id: 'idsupplierReportReportPurchaseBySupplier'
            },
            {
                xtype: 'textfield',
                id: 'supplierNameReportReportPurchaseBySupplier',
                labelWidth: 50,
                fieldLabel: 'Supplier',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            wpopupSupplierPurchaseBySupplierReport.show();
                        });
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Tampilkan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportReportPurchaseBySupplier').getValue();
                        var sd = Ext.getCmp('startdateReportReportPurchaseBySupplier').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportReportPurchaseBySupplier').getSubmitValue();
                        var idsupplier = Ext.getCmp('idsupplierReportReportPurchaseBySupplier').getSubmitValue();

                        if(sd==''){
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if(nd==''){
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportReportPurchaseBySupplier').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseBySupplier' src='" + SITE_URL + "laporan/purchase_by_supplier?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idsupplier=" + idsupplier + "'>");
                        }
                        
                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportReportPurchaseBySupplier' src='"+SITE_URL+"aktiva'/>"
});