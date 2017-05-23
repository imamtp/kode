Ext.define('RekapPremiKaryawan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapPremiKaryawan',
    id: 'RekapPremiKaryawan',
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
                               var startRekapPremiKaryawan = Ext.getCmp('startRekapPremiKaryawan').getSubmitValue();
                            var endRekapPremiKaryawan = Ext.getCmp('endRekapPremiKaryawan').getSubmitValue();
                            var unitRekapPremiKaryawan = Ext.getCmp('unitRekapPremiKaryawan').getValue();
                            Ext.getCmp('RekapPremiKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiKaryawan' src='"+SITE_URL+"laporan/generate/rekappremikaryawan/" + unitRekapPremiKaryawan + "/" + startRekapPremiKaryawan+"/"+endRekapPremiKaryawan + "/print'>");
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
                            var startRekapPremiKaryawan = Ext.getCmp('startRekapPremiKaryawan').getSubmitValue();
                            var endRekapPremiKaryawan = Ext.getCmp('endRekapPremiKaryawan').getSubmitValue();
                            var unitRekapPremiKaryawan = Ext.getCmp('unitRekapPremiKaryawan').getValue();
                            Ext.getCmp('RekapPremiKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiKaryawan' src='"+SITE_URL+"laporan/generate/rekappremikaryawan/" + unitRekapPremiKaryawan + "/" + startRekapPremiKaryawan+"/"+endRekapPremiKaryawan + "/excel'>");
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
                    id: 'unitRekapPremiKaryawan'
                },{
                    xtype: 'datefield',
                    id: 'startRekapPremiKaryawan',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'datefield',
                    id: 'endRekapPremiKaryawan',
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
                            var startRekapPremiKaryawan = Ext.getCmp('startRekapPremiKaryawan').getSubmitValue();
                            var endRekapPremiKaryawan = Ext.getCmp('endRekapPremiKaryawan').getSubmitValue();
                            var unitRekapPremiKaryawan = Ext.getCmp('unitRekapPremiKaryawan').getValue();
                            Ext.getCmp('RekapPremiKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPremiKaryawan' src='"+SITE_URL+"laporan/generate/rekappremikaryawan/" + unitRekapPremiKaryawan + "/" + startRekapPremiKaryawan+"/"+endRekapPremiKaryawan + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapPremiKaryawan' src='"+SITE_URL+"aktiva'/>"
});
