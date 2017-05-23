Ext.define('RekapPPH21', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapPPH21',
    id: 'RekapPPH21',
    title: 'Rekap Premi Yang Ditanggung Karyawan',
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
                               var startRekapPPH21 = Ext.getCmp('startRekapPPH21').getSubmitValue();
                            var endRekapPPH21 = null;
                            var unitRekapPPH21 = Ext.getCmp('unitRekapPPH21').getValue();
                            Ext.getCmp('RekapPPH21').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPPH21' src='"+SITE_URL+"laporan/generate/RekapPPH21/" + unitRekapPPH21 + "/" + startRekapPPH21+"/"+endRekapPPH21 + "/print'>");
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
                            var startRekapPPH21 = Ext.getCmp('startRekapPPH21').getSubmitValue();
                            var endRekapPPH21 = null;
                            var unitRekapPPH21 = Ext.getCmp('unitRekapPPH21').getValue();
                            Ext.getCmp('RekapPPH21').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPPH21' src='"+SITE_URL+"laporan/generate/RekapPPH21/" + unitRekapPPH21 + "/" + startRekapPPH21+"/"+endRekapPPH21 + "/excel'>");
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
                    multiSelect:true,
                    valueField:'idunit',
                    id: 'unitRekapPPH21'
                },{
                    xtype: 'datefield',
                    id: 'startRekapPPH21',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
              
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var startRekapPPH21 = Ext.getCmp('startRekapPPH21').getSubmitValue();
                            var endRekapPPH21 = null;
                            var unitRekapPPH21 = Ext.getCmp('unitRekapPPH21').getValue();
                            Ext.getCmp('RekapPPH21').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPPH21' src='"+SITE_URL+"laporan/generate/RekapPPH21/" + unitRekapPPH21 + "/" + startRekapPPH21+"/"+endRekapPPH21 + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapPPH21' src='"+SITE_URL+"aktiva'/>"
});
