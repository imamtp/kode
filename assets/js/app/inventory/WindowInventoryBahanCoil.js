Ext.define('KonversiModel', {
    extend: 'Ext.data.Model',
    fields: [
      'bahan_coil_id','idinventorycat','az_z','lebar','tebal','berat','keterangan','produk_nama','idunit','namecat'
    ],
    idProperty: 'id'
});

var storeGridKonversi = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'KonversiModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/tabelcoil/inventory',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});



var gridKonversi = Ext.create('Ext.grid.Panel', {
    // title: 'Sales Order',
    id:'GridKonversi',
    store: storeGridKonversi,
    columns: [
        {
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                Ext.getCmp('bahan_coil_id').setValue(selectedRecord.get('bahan_coil_id'));
                Ext.getCmp('konversi_coil').setValue(selectedRecord.get('namecat') +' - AZ/Z '+ selectedRecord.get('az_z') +' - Lebar '+ selectedRecord.get('lebar') +' - Tebal '+ selectedRecord.get('tebal') +' - Berat '+ selectedRecord.get('berat'));
                Ext.getCmp('WindowInventoryBahanCoil').hide();
            }
        },
        {  header: 'bahan_coil_id', dataIndex: 'bahan_coil_id',  hidden: true}, 
        {  header: 'idinventorycat', dataIndex: 'idinventorycat',  hidden: true}, 
        { header: 'Jenis',  dataIndex: 'namecat' , minWidth:150},
        { header: 'AZ/Z (KG/MZ)',  dataIndex: 'az_z' , minWidth:150},
        { header: 'Lebar (MM)',  dataIndex: 'lebar' , minWidth:150},
        { header: 'Tebal (TCT-MM)',  dataIndex: 'tebal' , minWidth:150},
        { header: 'Berat (KG/M)',  dataIndex: 'berat' , minWidth:150},
        { header: 'Keterangan',  dataIndex: 'keterangan' , minWidth:150},
        { header: 'Nama Produk',  dataIndex: 'produk_nama' , minWidth:150}
    ],
         flex:1,
         border:true,
        listeners: {
        deselect: function(grid, record) {
            // var name = record.get('name');
            // save new name
        },
        select: function(grid, record) {
           
        }
    }
});

//end grid atas


Ext.define(dir_sys+'inventory.WindowInventoryBahanCoil', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowInventoryBahanCoil',
    id:'WindowInventoryBahanCoil',
    title: 'Pilih Konversi Satuan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW-300,
    height: sizeH-200,
    layout: 'fit',
    border: false,
    items: [gridKonversi],
    listeners:{
         'close':function(win){
                 // load_tmp_sales_return()
          },
         'hide':function(win){
                 // load_tmp_sales_return()
          }
    }
});