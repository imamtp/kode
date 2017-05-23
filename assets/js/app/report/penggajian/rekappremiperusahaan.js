Ext.define('RekapPremiPerusahaan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapPremiPerusahaan',
    id: 'RekapPremiPerusahaan',
    title: 'Rekap Premi Yang Ditanggung Perusahaan',
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
                               var startRekapPremiPerusahaan = Ext.getCmp('startRekapPremiPerusahaan').getSubmitValue();
                            var endRekapPremiPerusahaan = Ext.getCmp('endRekapPremiPerusahaan').getSubmitValue();
                            var unitRekapPremiPerusahaan = Ext.getCmp('unitRekapPremiPerusahaan').getValue();
                            Ext.getCmp('RekapPremiPerusahaan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiPerusahaan' src='"+SITE_URL+"laporan/generate/RekapPremiPerusahaan/" + unitRekapPremiPerusahaan + "/" + startRekapPremiPerusahaan+"/"+endRekapPremiPerusahaan + "/print'>");
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
                            var startRekapPremiPerusahaan = Ext.getCmp('startRekapPremiPerusahaan').getSubmitValue();
                            var endRekapPremiPerusahaan = Ext.getCmp('endRekapPremiPerusahaan').getSubmitValue();
                            var unitRekapPremiPerusahaan = Ext.getCmp('unitRekapPremiPerusahaan').getValue();
                            Ext.getCmp('RekapPremiPerusahaan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiPerusahaan' src='"+SITE_URL+"laporan/generate/RekapPremiPerusahaan/" + unitRekapPremiPerusahaan + "/" + startRekapPremiPerusahaan+"/"+endRekapPremiPerusahaan + "/excel'>");
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
                    id: 'unitRekapPremiPerusahaan'
                },{
                    xtype: 'datefield',
                    id: 'startRekapPremiPerusahaan',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'datefield',
                    id: 'endRekapPremiPerusahaan',
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
                            var startRekapPremiPerusahaan = Ext.getCmp('startRekapPremiPerusahaan').getSubmitValue();
                            var endRekapPremiPerusahaan = Ext.getCmp('endRekapPremiPerusahaan').getSubmitValue();
                            var unitRekapPremiPerusahaan = Ext.getCmp('unitRekapPremiPerusahaan').getValue();
                            Ext.getCmp('RekapPremiPerusahaan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiPerusahaan' src='"+SITE_URL+"laporan/generate/RekapPremiPerusahaan/" + unitRekapPremiPerusahaan + "/" + startRekapPremiPerusahaan+"/"+endRekapPremiPerusahaan + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapPremiPerusahaan' src='"+SITE_URL+"aktiva'/>"
});
