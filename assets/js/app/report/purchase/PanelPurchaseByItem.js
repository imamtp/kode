Ext.define(dir_sys + 'report.purchase.PanelPurchaseByItem', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PanelPurchaseByItem',
    id: 'PanelPurchaseByItem',
    title: 'Pembelian Per Barang',
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseByItem1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseByItem2').getSubmitValue();
                        var unitReportPanelPurchaseByItem = Ext.getCmp('unitReportPanelPurchaseByItem').getValue();
                        Ext.getCmp('reportPanelPurchaseByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseByItem' src='" + SITE_URL + "laporan/PanelPurchaseByItem/" + unitReportPanelPurchaseByItem + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportPanelPurchaseByItem1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportPanelPurchaseByItem2').getSubmitValue();
                        var unitReportPanelPurchaseByItem = Ext.getCmp('unitReportPanelPurchaseByItem').getValue();
                        Ext.getCmp('reportPanelPurchaseByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseByItem' src='" + SITE_URL + "laporan/PanelPurchaseByItem/" + unitReportPanelPurchaseByItem + "/" + report1 + "/excel'>");
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
                id: 'unitReportPanelPurchaseByItem'
            }, {
                xtype: 'datefield',
                id: 'startdateReportPanelPurchaseByItem',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportPanelPurchaseByItem',
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
                        var unit = Ext.getCmp('unitReportPanelPurchaseByItem').getValue();
                        var sd = Ext.getCmp('startdateReportPanelPurchaseByItem').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportPanelPurchaseByItem').getSubmitValue();
                        Ext.getCmp('reportPanelPurchaseByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPanelPurchaseByItem' src='" + SITE_URL + "laporan/inventory_kartu_stok?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idinventory=" + idinventory + "'>");
                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportPanelPurchaseByItem' src='"+SITE_URL+"aktiva'/>"
});