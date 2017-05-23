Ext.define('RekapTHR', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapTHR',
    id: 'RekapTHR',
    title: 'Rekap Pembayaran THR',
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
                               var startRekapTHR = Ext.getCmp('startRekapTHR').getSubmitValue();
                            var endRekapTHR = null;
                            var unitRekapTHR = Ext.getCmp('unitRekapTHR').getValue();
                            Ext.getCmp('RekapTHR').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTHR' src='"+SITE_URL+"laporan/generate/RekapTHR/" + unitRekapTHR + "/" + startRekapTHR+"/"+endRekapTHR + "/print'>");
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
                            var startRekapTHR = Ext.getCmp('startRekapTHR').getSubmitValue();
                            var endRekapTHR = null;
                            var unitRekapTHR = Ext.getCmp('unitRekapTHR').getValue();
                            Ext.getCmp('RekapTHR').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTHR' src='"+SITE_URL+"laporan/generate/RekapTHR/" + unitRekapTHR + "/" + startRekapTHR+"/"+endRekapTHR + "/excel'>");
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
                    id: 'unitRekapTHR'
                },{
                    xtype: 'datefield',
                    id: 'startRekapTHR',
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
                            var startRekapTHR = Ext.getCmp('startRekapTHR').getSubmitValue();
                            var endRekapTHR = null;
                            var unitRekapTHR = Ext.getCmp('unitRekapTHR').getValue();
                            Ext.getCmp('RekapTHR').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTHR' src='"+SITE_URL+"laporan/generate/RekapTHR/" + unitRekapTHR + "/" + startRekapTHR+"/"+endRekapTHR + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapTHR' src='"+SITE_URL+"aktiva'/>"
});
