Ext.define('RekapPotonganKaryawan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.RekapPotonganKaryawan',
    id: 'RekapPotonganKaryawan',
    title: 'Rekap Potongan Karyawan',
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
                               var startRekapPotonganKaryawan = Ext.getCmp('startRekapPotonganKaryawan').getSubmitValue();
                            var endRekapPotonganKaryawan = Ext.getCmp('endRekapPotonganKaryawan').getSubmitValue();
                            var unitRekapPotonganKaryawan = Ext.getCmp('unitRekapPotonganKaryawan').getValue();
                            Ext.getCmp('RekapPotonganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPotonganKaryawan' src='"+SITE_URL+"laporan/generate/rekapPotongan/" + unitRekapPotonganKaryawan + "/" + startRekapPotonganKaryawan+"/"+endRekapPotonganKaryawan + "/print'>");
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
                            var startRekapPotonganKaryawan = Ext.getCmp('startRekapPotonganKaryawan').getSubmitValue();
                            var endRekapPotonganKaryawan = Ext.getCmp('endRekapPotonganKaryawan').getSubmitValue();
                            var unitRekapPotonganKaryawan = Ext.getCmp('unitRekapPotonganKaryawan').getValue();
                            Ext.getCmp('RekapPotonganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPotonganKaryawan' src='"+SITE_URL+"laporan/generate/rekapPotongan/" + unitRekapPotonganKaryawan + "/" + startRekapPotonganKaryawan+"/"+endRekapPotonganKaryawan + "/excel'>");
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
                    id: 'unitRekapPotonganKaryawan'
                },{
                    xtype: 'datefield',
                    id: 'startRekapPotonganKaryawan',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'datefield',
                    id: 'endRekapPotonganKaryawan',
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
                            var startRekapPotonganKaryawan = Ext.getCmp('startRekapPotonganKaryawan').getSubmitValue();
                            var endRekapPotonganKaryawan = Ext.getCmp('endRekapPotonganKaryawan').getSubmitValue();
                            var unitRekapPotonganKaryawan = Ext.getCmp('unitRekapPotonganKaryawan').getValue();
                            Ext.getCmp('RekapPotonganKaryawan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeRekapPotonganKaryawan' src='"+SITE_URL+"laporan/generatetab/rekapPotongan/" + unitRekapPotonganKaryawan + "/" + startRekapPotonganKaryawan+"/"+endRekapPotonganKaryawan + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeRekapPotonganKaryawan' src='"+SITE_URL+"aktiva'/>"
});
