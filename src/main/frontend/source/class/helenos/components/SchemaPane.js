/* ************************************************************************
Copyright:
  2012 Tomek Kuprowski
License:
  GPLv2: http://www.gnu.org/licences/gpl.html
Authors:
  Tomek Kuprowski (tomekkuprowski at gmail dot com)
 ************************************************************************ */

/*
#asset(qx/icon/${qx.icontheme}/16/actions/view-refresh.png)
#asset(qx/icon/${qx.icontheme}/16/devices/computer.png)
*/

qx.Class.define("helenos.components.SchemaPane",
{
    extend : qx.ui.container.Composite,

    /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
 
    construct : function()
    {
        this.base(arguments);
        this.set({
            layout : new qx.ui.layout.VBox(),
            width : 240
        });

        this.__createButtons();
        this.__createClusterTree();
        
        this.add(this.__btnToolbar);
        this.add(this.__clusterTree, {
            flex : 1
        });
    },

    members :
    {
        __clusterTree : null,
        __btnToolbar : null,
        
        __createButtons : function() {
            this.__btnToolbar = new qx.ui.toolbar.ToolBar();
            
            var refreshButton = new qx.ui.toolbar.Button("Refresh", "qx/icon/Oxygen/16/actions/view-refresh.png");
            refreshButton.addListener('execute', this.refreshClusterTree);
            
            this.__btnToolbar.add(refreshButton);
        },
        
        __createClusterTree : function() {
            this.__clusterTree = new qx.ui.tree.Tree();
            
            this.refreshClusterTree();
        },
        
        refreshSchemaTree : function() {
            this.__clusterTree.resetSelection(); // ?
          
            var rpc = new helenos.util.Rpc('Cluster');
          
            var clusterName = helenos.util.RpcActionsProvider.describeClusterName();
            this.__setRootItem(clusterName);
          
            var ksDefs = helenos.util.RpcActionsProvider.describeKeyspaces();
            this.__renderKeyspaces(ksDefs);
        },
        
        __renderKeyspaces : function(ksDefs) {
            for (var i = 0; i < ksDefs.length; i++) {
                var ks = ksDefs[i];
                
                var ksItem = new qx.ui.tree.TreeFolder(ks.name);
                ksItem.set({
                    open: ks.name != 'system',
                    icon : 'helenos/keyspace.png',
                    contextMenu: new helenos.components.menu.KeyspaceContextMenu(ks.name)
                });
                this.__clusterTree.getRoot().add(ksItem);
                
                for (var j = 0; j < ks.cfDefs.length; j++) {
                    var cf = ks.cfDefs[j];
                    var cfItem = new qx.ui.tree.TreeFile(cf.name);
                    cfItem.set({
                        icon : cf.columnType == 'Super' ? 'helenos/supercf.png' : 'helenos/standardcf.png',
                        toolTip : this.__createColumnFamilyToolTip(cf),
                        contextMenu: new helenos.components.menu.ColumnFamilyContextMenu(ks.name, cf.name)
                    });
                    cfItem.setIcon(cf.columnType == 'Super' ? 'helenos/supercf.png' : 'helenos/standardcf.png');
                    cfItem.setToolTip(this.__createColumnFamilyToolTip(cf));
                    ksItem.add(cfItem);
                }
            }
        },
        
        __createColumnFamilyToolTip : function(cfDef) {
            var ttt = 'Comparator: <b>' + cfDef.comparatorType.typeName + '</b><br/>';
            if (cfDef.subComparatorType != null) {
                ttt += 'Subcomparator: <b>' + cfDef.subComparatorType.typeName + '</b><br/>';
            }
            ttt += 'Key validator: <b>' + cfDef.keyValidationClass + '</b><br/>';
            ttt += 'Default validator: <b>' + cfDef.defaultValidationClass + '</b><br/>';
            var tooltip = new qx.ui.tooltip.ToolTip(ttt);
            tooltip.setWidth(350);
            tooltip.setRich(true);
            tooltip.setShowTimeout(100);
            return tooltip;
        },
        
        __setRootItem : function(clusterName) {
            var rootItem = new qx.ui.tree.TreeFolder(clusterName);
            rootItem.setOpen(true);
            rootItem.setIcon("qx/icon/Oxygen/16/devices/computer.png");
            this.__clusterTree.setRoot(rootItem);
        }
    }
});