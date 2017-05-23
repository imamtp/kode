 var generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    
 var store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });
    
 Ext.define('Ext.chart.theme.CustomBlue', {
        extend: 'Ext.chart.theme.Base',
        
        constructor: function(config) {
            var titleLabel = {
                font: 'bold 18px Arial'
            }, axisLabel = {
                fill: 'rgb(8,69,148)',
                font: '12px Arial',
                spacing: 2,
                padding: 5
            };
            
            this.callParent([Ext.apply({
               axis: {
                   stroke: '#084594'
               },
               axisLabelLeft: axisLabel,
               axisLabelBottom: axisLabel,
               axisTitleLeft: titleLabel,
               axisTitleBottom: titleLabel
           }, config)]);
        }
    });
 
store1.loadData(generateData());

Ext.define('SalesChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.SalesChart',
    width:200,
    height:200,
     animate: true,
            shadow: true,
            title:'Penjualan',
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            theme: 'CustomBlue',
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                  }
                },
                label: {
                  display: 'insideEnd',
                    field: 'data1',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                  'text-anchor': 'middle'
                },
                xField: 'name',
                yField: ['data1']
            }]
        
});

Ext.define('PurchaseChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.PurchaseChart',
    width:200,
    height:200,
     animate: true,
            shadow: true,
            title:'Pembelian',
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            theme: 'CustomBlue',
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                  }
                },
                label: {
                  display: 'insideEnd',
                    field: 'data1',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                  'text-anchor': 'middle'
                },
                xField: 'name',
                yField: ['data1']
            }]
        
});

Ext.define('TabItemInventoryHistory', {
    extend: 'Ext.tab.Panel',
    title:'Riwayat',
    id: 'TabItemInventory',
    alias: 'widget.TabItemInventoryHistory',
    activeTab: 0,
//    width:'90%',
    height:400,
    autoScroll: true,
    layout:'fit',
    defaults: {
        autoScroll: true,
//        bodyPadding: '1 0 15 0'
    },
    items: [
        {
            xtype:'SalesChart'
        },
        {
            xtype:'PurchaseChart'
        }
    ]
});