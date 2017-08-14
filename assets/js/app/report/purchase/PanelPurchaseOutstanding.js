Ext.define(dir_sys + 'report.purchase.PanelPurchaseOutstanding', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PanelPurchaseOutstanding',
    id: 'PanelPurchaseOutstanding',
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseOutstanding2').getSubmitValue();
                        var unitReportPanelPurchaseOutstanding = Ext.getCmp('unitReportPanelPurchaseOutstanding').getValue();
                        Ext.getCmp('reportPanelPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseOutstanding' src='" + SITE_URL + "laporan/PanelPurchaseOutstanding/" + unitReportPanelPurchaseOutstanding + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseOutstanding2').getSubmitValue();
                        var unitReportPanelPurchaseOutstanding = Ext.getCmp('unitReportPanelPurchaseOutstanding').getValue();
                        Ext.getCmp('reportPanelPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseOutstanding' src='" + SITE_URL + "laporan/PanelPurchaseOutstanding/" + unitReportPanelPurchaseOutstanding + "/" + report1 + "/excel'>");
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
                id: 'unitReportPanelPurchaseOutstanding'
            }, {
                xtype: 'datefield',
                id: 'startdateReportPanelPurchaseOutstanding',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportPanelPurchaseOutstanding',
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
                        var unit = Ext.getCmp('unitReportPanelPurchaseOutstanding').getValue();
                        var sd = Ext.getCmp('startdateReportPanelPurchaseOutstanding').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportPanelPurchaseOutstanding').getSubmitValue();
                        Ext.getCmp('reportPanelPurchaseOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseOutstanding' src='" + SITE_URL + "laporan/inventory_kartu_stok?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idinventory=" + idinventory + "'>");
                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportPanelPurchaseOutstanding' src='"+SITE_URL+"aktiva'/>"
});