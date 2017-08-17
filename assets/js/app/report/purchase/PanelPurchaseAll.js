Ext.define(dir_sys + 'report.purchase.PanelPurchaseAll', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PanelPurchaseAll',
    id: 'reportPanelPurchaseAll',
    title: 'Pembelian',
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseAll1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseAll2').getSubmitValue();
                        var unitReportPanelPurchaseAll = Ext.getCmp('unitReportPanelPurchaseAll').getValue();
                        Ext.getCmp('reportPanelPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseAll' src='" + SITE_URL + "laporan/purchase_all/" + unitReportPanelPurchaseAll + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseAll1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseAll2').getSubmitValue();
                        var unitReportPanelPurchaseAll = Ext.getCmp('unitReportPanelPurchaseAll').getValue();
                        Ext.getCmp('reportPanelPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseAll' src='" + SITE_URL + "laporan/PanelPurchaseAll/" + unitReportPanelPurchaseAll + "/" + report1 + "/excel'>");
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
                id: 'unitReportPanelPurchaseAll'
            }, {
                xtype: 'datefield',
                id: 'startdateReportPanelPurchaseAll',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportPanelPurchaseAll',
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
                        var unit = Ext.getCmp('unitReportPanelPurchaseAll').getValue();
                        var sd = Ext.getCmp('startdateReportPanelPurchaseAll').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportPanelPurchaseAll').getSubmitValue();
                        Ext.getCmp('reportPanelPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseAll' src='" + SITE_URL + "laporan/purchase_all?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "'>");
                    }
                }
            }
        ]
    }],
    // html: "<iframe id='iframeReportPanelPurchaseAll'/>"
});