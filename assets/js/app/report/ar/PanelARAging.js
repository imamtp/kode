Ext.define('reportARAging', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportARAging',
    id: 'reportARAging',
    title: 'Laporan AR Aging',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportARAging').setValue(data.namecustomer);
            Ext.getCmp('customerReportARAging').setValue(data.idcustomer);
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
                        var report1 = Ext.getCmp('tanggalReportARAging1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportARAging2').getSubmitValue();
                        var unitReportARAging = Ext.getCmp('unitReportARAging').getValue();
                        Ext.getCmp('reportARAging').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARAging' src='" + SITE_URL + "laporan/ARAging/" + unitReportARAging + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportARAging1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportARAging2').getSubmitValue();
                        var unitReportARAging = Ext.getCmp('unitReportARAging').getValue();
                        Ext.getCmp('reportARAging').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARAging' src='" + SITE_URL + "laporan/ARAging/" + unitReportARAging + "/" + report1 + "/excel'>");
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
            id: 'unitReportARAging'
        }, {
            xtype: 'datefield',
            id: 'startdateReportARAging',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportARAging',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportARAging').getValue();
                    var sd = Ext.getCmp('startdateReportARAging').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportARAging').getSubmitValue();
                    var aging = Ext.getCmp('agingReportARAging').getValue() * 1;
                    var idcust = Ext.getCmp('customerReportARAging').getValue();
                    Ext.getCmp('reportARAging').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARAging' src='" + SITE_URL + "laporan/ARAging?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&aging=" + aging + "&agingperiod=" + ArrARAgingOptions[aging - 1][1] + "&idcustomer=" + idcust + "'>");
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'hiddenfield',
            id: 'customerReportARAging',
        }, {
            xtype: 'textfield',
            id: 'namecustomerReportARAging',
            labelWidth: 100,
            fieldLabel: 'Customer',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListCustomer.target = Ext.getCmp('reportARAging');
                        ChooserListCustomer.show();
                    });
                }
            }
        }, {
            id: 'agingReportARAging',
            xtype: 'comboxARAgingOptions',
            labelWidth: 40,
        }]
    }],
    //    html: "<iframe id='iframeReportARAging' src='"+SITE_URL+"aktiva'/>"
});