Ext.define(dir_sys + 'report.ReportPurchaseAll', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportPurchaseAll',
    id: 'reportPurchaseAll',
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
                        if(sd==''){
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if(nd==''){
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframereportPurchaseAll' src='" + SITE_URL + "laporan/purchase_all/" + unitreportPurchaseAll + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalreportPurchaseAll1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalreportPurchaseAll2').getSubmitValue();
                        var unitreportPurchaseAll = Ext.getCmp('unitreportPurchaseAll').getValue();
                        Ext.getCmp('reportPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframereportPurchaseAll' src='" + SITE_URL + "laporan/ReportPurchaseAll/" + unitreportPurchaseAll + "/" + report1 + "/excel'>");
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
                id: 'unitreportPurchaseAll'
            }, {
                xtype: 'datefield',
                id: 'startdatereportPurchaseAll',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddatereportPurchaseAll',
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
                        var unit = Ext.getCmp('unitreportPurchaseAll').getValue();
                        var sd = Ext.getCmp('startdatereportPurchaseAll').getSubmitValue();
                        var nd = Ext.getCmp('enddatereportPurchaseAll').getSubmitValue();

                        if(sd==''){
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if(nd==''){
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportPurchaseAll').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframereportPurchaseAll' src='" + SITE_URL + "laporan/purchase_all?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "'>");
                        }
                       
                    }
                }
            }
        ]
    }],
    // html: "<iframe id='iframereportPurchaseAll'/>"
});