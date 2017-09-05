Ext.define(dir_sys + 'report.ReportPurchaseOutstanding', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportPurchaseOutstanding',
    id: 'ReportPurchaseOutstanding',
    title: 'Pembelian Jatuh Tempo',
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
                        var report1 = Ext.getCmp('tanggalReportReportPurchaseOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportReportPurchaseOutstanding2').getSubmitValue();
                        var unitReportReportPurchaseOutstanding = Ext.getCmp('unitReportReportPurchaseOutstanding').getValue();

                        if(report1==''){
                            Ext.Msg.alert("Info", 'Periode belum ditentukan');
                        }  else {
                            Ext.getCmp('reportReportPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseOutstanding' src='" + SITE_URL + "laporan/ReportPurchaseOutstanding/" + unitReportReportPurchaseOutstanding + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportReportPurchaseOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportReportPurchaseOutstanding2').getSubmitValue();
                        var unitReportReportPurchaseOutstanding = Ext.getCmp('unitReportReportPurchaseOutstanding').getValue();
                        Ext.getCmp('reportReportPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseOutstanding' src='" + SITE_URL + "laporan/ReportPurchaseOutstanding/" + unitReportReportPurchaseOutstanding + "/" + report1 + "/excel'>");
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
                id: 'unitReportReportPurchaseOutstanding'
            }, {
                xtype: 'datefield',
                id: 'startdateReportReportPurchaseOutstanding',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportReportPurchaseOutstanding',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 's/d'
            },
            {
                xtype: 'button',
                text: 'Tampilkan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportReportPurchaseOutstanding').getValue();
                        var sd = Ext.getCmp('startdateReportReportPurchaseOutstanding').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportReportPurchaseOutstanding').getSubmitValue();

                        if(sd==''){
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if(nd==''){
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportReportPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportReportPurchaseOutstanding' src='" + SITE_URL + "laporan/inventory_kartu_stok?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idinventory=" + idinventory + "'>");
                        }
                       
                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportReportPurchaseOutstanding' src='"+SITE_URL+"aktiva'/>"
});