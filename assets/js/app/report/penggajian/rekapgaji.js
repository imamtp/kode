Ext.define('rekapGaji', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rekapGaji',
    id: 'rekapGaji',
    title: 'Rekap Penggajian',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                   '->',
                 {
                    xtype: 'button',
                    text: 'Email',
                    iconCls: 'email-icon',
                    listeners: {
                        click: function(component) {

                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Print',
                    iconCls: 'print-icon',
                    listeners: {
                        click: function(component) {
                               var startReportGaji = Ext.getCmp('startReportGaji').getSubmitValue();
                            var endReportGaji = Ext.getCmp('endReportGaji').getSubmitValue();
                            var unitrekapGaji = Ext.getCmp('unitrekapGaji').getValue();
                            Ext.getCmp('rekapGaji').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframerekapGaji' src='"+SITE_URL+"laporan/generate/rekapgaji/" + unitrekapGaji + "/" + startReportGaji+"/"+endReportGaji + "/print'>");
                        }
                    }
                },
                {
                    xtype: 'button',
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
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                            var startReportGaji = Ext.getCmp('startReportGaji').getSubmitValue();
                            var endReportGaji = Ext.getCmp('endReportGaji').getSubmitValue();
                            var unitrekapGaji = Ext.getCmp('unitrekapGaji').getValue();
                            Ext.getCmp('rekapGaji').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframerekapGaji' src='"+SITE_URL+"laporan/generate/rekapgaji/" + unitrekapGaji + "/" + startReportGaji+"/"+endReportGaji + "/excel'>");
                        }
                    }
                } 
            ]
    }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    labelWidth: 90,
                    valueField:'idunit',
                    id: 'unitrekapGaji'
                },{
                    xtype: 'datefield',
                    id: 'startReportGaji',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'datefield',
                    id: 'endReportGaji',
                    format: 'F Y',
                    labelWidth: 20,
                    fieldLabel: 's/d'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startReportGaji = Ext.getCmp('startReportGaji').getSubmitValue();
                            var endReportGaji = Ext.getCmp('endReportGaji').getSubmitValue();
                            var unitrekapGaji = Ext.getCmp('unitrekapGaji').getValue();
                            Ext.getCmp('rekapGaji').body.update("<iframe style='border:0;' scrolling='yes', width='100%' height='100%' id='iframerekapGaji' src='"+SITE_URL+"laporan/generate/rekapgaji/" + unitrekapGaji + "/" + startReportGaji+"/"+endReportGaji + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframerekapGaji' src='"+SITE_URL+"aktiva'/>"
});
