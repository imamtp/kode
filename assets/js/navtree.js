function treestore(id) {
    var treestore = new Ext.data.TreeStore({
        proxy: {
            type: 'ajax',
            url: SITE_URL + 'dashboard/getTreeMenu/' + id + '/'
        },
        root: {
            text: 'Ext JS',
            id: '0',
            expanded: false
        },
        // folderSort: true,
        // sorters: [{
        //     property: 'text',
        //     direction: 'ASC'
        // }]
    });
    return treestore
}

if (curnipeg == '') {
    var DashboardPage = Ext.create('mydashboard');

    // var DashboardPage = Ext.create('Ext.Component', {
    //     border: false,
    //     xtype: "component",
    //     title: "Dashboard",
    //     autoEl: {
    //         tag: "iframe",
    //         src: SITE_URL+"dashboard/page"
    //     }, listeners: {
    //         maximize: function(window, opts) {
    //             var the_iframe = DashboardPage.getEl().dom;
    //             the_iframe.contentWindow.location.reload();
    //         },
    //         restore: function(window, opts) {
    //             console.log('res')
    //             var the_iframe = DashboardPage.getEl().dom;
    //             the_iframe.contentWindow.location.reload();
    //         }
    //     }

    // });


} else {
    var DashboardPage = {
        id: 'tabcontent',
        contentEl: 'center2',
        title: 'Dashboard'
        // closable: true
    }
}


var items = [DashboardPage];

var tabPanel = Ext.createWidget('tabpanel', {
    // border: true,   
    autoScroll: true,
    itemId: Ext.id(),
    id: Ext.id(),
    // renderTo: Ext.getBody(),
    region: 'center',
    resizeTabs: true,
    enableTabScroll: true,
    // width: 600,
    // height: 600,
    closeAction: 'hide',
    defaults: {
        // closeAction: 'hide',
        // autoScroll: true,
        bodyPadding: 3
    },
    items: items,
    // destroyOnClose: false,

});

function closeAllTab() {
    //    tabPanel.removeAll();  
    tabPanel.items.each(
        function(item) {
            if (item.closable) {
                tabPanel.remove(item);
            }
        }
    );
}

function addTab(title, menu_link, idmenu, first_load_store_id) {
    var id = tabPanel.items.length;
    // console.log(menu_link);
    // console.log(Offline.check());
    if (menu_link != null && menu_link != '') {
        var tab = tabPanel.getComponent(title);


        if(menu_link == 'DashboardPanel')
        {
            tabPanel.setActiveTab(tabPanel.getComponent('mydashboard'));
        } else 
        if (menu_link == 'inputInventory') {
            menu_link = 'Input Persediaan Baru';
            showInputInv();
        } else if (menu_link == 'input_lembur') {
            wLembur.show();
        } else if (menu_link == 'input_lembur_fix') {
            wLemburFixAmount.show();
        } else if (menu_link == 'input_cuti') {
            wCuti.show();
        } else if (menu_link == 'input_persediaan_awal') {
            showInputInv();
            // Ext.getCmp('fieldsetInvBuy').setDisabled(true);
            // Ext.getCmp('fieldsetInvSell').setDisabled(true);                   
            // Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
            // Ext.getCmp('fieldsetInvPersediaan').show();
            storeGridAccInv.removeAll();
            storeGridAccInv.sync();



            var formInventoryV2 = Ext.getCmp('formInventoryV2').getForm();
            formInventoryV2.findField('nilaibuku').hide();
            formInventoryV2.findField('akumulasiAkhir').hide();
            formInventoryV2.findField('cbpersediaan').show();
            formInventoryV2.findField('cbpersediaan').setDisabled(false);
            // Ext.getCmp('fieldsetInvPersediaan').hide();
            Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(true);

            formInventoryV2.reset();
        }
        else {

            if (menu_link == 'ms_pegawai') {
                var vClose = false;
            } else {
                var vClose = true;
            }

            if (!Ext.isDefined(tab)) {

                Ext.Ajax.request({
                    url: SITE_URL + 'sistem/cekHakAkses',
                    method: 'POST',
                    params: {
                        idmenu: idmenu
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Informasi', 'Anda tidak berhak untuk mengakses menu ini');
                        } else {
                            var tab = tabPanel.add({
                                // id:Ext.id(),
                                title: title,
                                itemId: title,
                                layout: 'fit',
                                border: true,
                                autoScroll: true,
                                closeAction: 'hide',
                                closable: true,
                                listeners: {
                                    close: function() {
                                        if (menu_link == 'PortProsesGaji') {
                                            //hapus tabel gaji sementara
                                            Ext.Ajax.request({
                                                url: SITE_URL + 'penggajian/deletePayrollListTmp',
                                                method: 'GET'
                                            });
                                        }
                                    }
                                },
                                border: false,
                                items: [{
                                    xtype: menu_link,
                                    autoDestroy: false,
                                    // isDestroyed:false
                                }]
                            });

                            tabPanel.doLayout();
                            tabPanel.setActiveTab(tab);
                        }

                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });


            } else {
                // console.log('sss')
                //tab sudah terbentuk
                if (menu_link == 'PortProsesGaji') {
                    // hapus tabel gaji sementara
                    Ext.Ajax.request({
                        url: SITE_URL + 'penggajian/deletePayrollListTmp',
                        method: 'GET'
                    });
                }
            }

            tabPanel.setActiveTab(tab);
        }


    }
}



var treeNavigation = Ext.create('Ext.tree.Panel', {
    id: 'navTreePanel',
    autoHeight: true,
    singleExpand: true,
    width: 300,
    store: treestore(0),
    listeners: {
        itemclick: {
            fn: function(view, record, item, index, evt, eOpts) {
                addTab(record.get('text'), record.get('hrefTarget'), record.get('id'), record.raw.first_load_store_id);

                record.isExpanded() ? record.collapse() : record.expand();
            }
        }
    },
    rootVisible: false
});

function collapsenav() {
    treeNavigation.collapseAll();
}

function expandnav() {
    treeNavigation.expandAll();
}