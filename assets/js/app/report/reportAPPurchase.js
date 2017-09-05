Ext.define(dir_sys + 'report.reportAPPurchase', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportAPPurchase',
    id: 'reportAPPurchase',
    title: 'Laporan Hutang Pembelian',
    listeners: {
        'selectSupplier': function(data) {
            Ext.getCmp('namesupplierReportAPPurchase').setValue(data.namesupplier);
            Ext.getCmp('supplierReportAPPurchase').setValue(data.idsupplier);
        }
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
                text: 'Print',
                iconCls: 'print-icon',
                listeners: {
                    click: function(component) {
                        var report1 = Ext.getCmp('tanggalReportAPPurchase1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPPurchase2').getSubmitValue();
                        var unitReportAPPurchase = Ext.getCmp('unitReportAPPurchase').getValue();
                        Ext.getCmp('reportAPPurchase').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPPurchase' src='" + SITE_URL + "laporan/APPurchase/" + unitReportAPPurchase + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportAPPurchase1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPPurchase2').getSubmitValue();
                        var unitReportAPPurchase = Ext.getCmp('unitReportAPPurchase').getValue();
                        Ext.getCmp('reportAPPurchase').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPPurchase' src='" + SITE_URL + "laporan/APPurchase/" + unitReportAPPurchase + "/" + report1 + "/excel'>");
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'comboxunit',
            labelWidth: 100,
            multiSelect: true,
            valueField: 'idunit',
            id: 'unitReportAPPurchase'
        }, {
            xtype: 'datefield',
            id: 'startdateReportAPPurchase',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportAPPurchase',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'hiddenfield',
            id: 'supplierReportAPPurchase',
        }, {
            xtype: 'textfield',
            id: 'namesupplierReportAPPurchase',
            labelWidth: 100,
            fieldLabel: 'Supplier',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListSupplier.target = Ext.getCmp('reportAPPurchase');
                        ChooserListSupplier.show();
                    });
                }
            }
        }, ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportAPPurchase').getValue();
                    var sd = Ext.getCmp('startdateReportAPPurchase').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportAPPurchase').getSubmitValue();
                    var idsupp = Ext.getCmp('supplierReportAPPurchase').getValue();

                    if(sd==''){
                        Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                    } else if(nd==''){
                        Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                    } else {
                        Ext.getCmp('reportAPPurchase').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPPurchase' src='" + SITE_URL + "laporan/APPurchase?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idsupplier=" + idsupp + "'>");
                    }
                    
                }
            }
        }, {
            xtype: 'button',
            text: 'Clear Filter',
            listeners: {
                click: function(component) {
                    Ext.getCmp('startdateReportAPPurchase').setValue(null);
                    Ext.getCmp('enddateReportAPPurchase').setValue(null);
                    Ext.getCmp('supplierReportAPPurchase').setValue(null);
                    Ext.getCmp('namesupplierReportAPPurchase').setValue(null);
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportAPPurchase' src='"+SITE_URL+"aktiva'/>"
});