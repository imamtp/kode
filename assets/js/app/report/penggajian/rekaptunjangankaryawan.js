Ext.define('RekapTunjanganKaryawan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapTunjanganKaryawan',
    id: 'RekapTunjanganKaryawan',
    title: 'Rekap Tunjangan Karyawan',
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
                           var startRekapTunjanganKaryawan = Ext.getCmp('startRekapTunjanganKaryawan').getSubmitValue();
                            var endRekapTunjanganKaryawan = Ext.getCmp('endRekapTunjanganKaryawan').getSubmitValue();
                            var unitRekapTunjanganKaryawan = Ext.getCmp('unitRekapTunjanganKaryawan').getValue();
                            Ext.getCmp('RekapTunjanganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTunjanganKaryawan' src='"+SITE_URL+"laporan/generatetab/rekapTunjangan/" + unitRekapTunjanganKaryawan + "/" + startRekapTunjanganKaryawan+"/"+endRekapTunjanganKaryawan + "/print'>");
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
                            var startRekapTunjanganKaryawan = Ext.getCmp('startRekapTunjanganKaryawan').getSubmitValue();
                            var endRekapTunjanganKaryawan = Ext.getCmp('endRekapTunjanganKaryawan').getSubmitValue();
                            var unitRekapTunjanganKaryawan = Ext.getCmp('unitRekapTunjanganKaryawan').getValue();
                            Ext.getCmp('RekapTunjanganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTunjanganKaryawan' src='"+SITE_URL+"laporan/generatetab/rekapTunjangan/" + unitRekapTunjanganKaryawan + "/" + startRekapTunjanganKaryawan+"/"+endRekapTunjanganKaryawan + "/excel'>");
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
                    id: 'unitRekapTunjanganKaryawan'
                },{
                    xtype: 'datefield',
                    id: 'startRekapTunjanganKaryawan',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'datefield',
                    id: 'endRekapTunjanganKaryawan',
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
                            var startRekapTunjanganKaryawan = Ext.getCmp('startRekapTunjanganKaryawan').getSubmitValue();
                            var endRekapTunjanganKaryawan = Ext.getCmp('endRekapTunjanganKaryawan').getSubmitValue();
                            var unitRekapTunjanganKaryawan = Ext.getCmp('unitRekapTunjanganKaryawan').getValue();
                            Ext.getCmp('RekapTunjanganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapTunjanganKaryawan' src='"+SITE_URL+"laporan/generatetab/rekapTunjangan/" + unitRekapTunjanganKaryawan + "/" + startRekapTunjanganKaryawan+"/"+endRekapTunjanganKaryawan + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapTunjanganKaryawan' src='"+SITE_URL+"aktiva'/>"
});
