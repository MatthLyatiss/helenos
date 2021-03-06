/* ************************************************************************
Copyright:
  2012 Tomek Kuprowski
License:
  GPLv2: http://www.gnu.org/licences/gpl.html
Authors:
  Tomek Kuprowski (tomekkuprowski at gmail dot com)
 ************************************************************************ */
qx.Class.define("helenos.components.tab.browse.CqlPage",
{
    extend : helenos.components.tab.browse.AbstractPage,
 
    construct : function(ksName, cfName)
    {
        this.base(arguments, ksName, cfName);
    },

    members :
    {
        _getSplitPaneOrientation : function() {
            return 'vertical';
        },
        
        _getIconPath : function() {
            return 'helenos/query-16.png';
        },
        
        _performSearch  : function(e) {
            var queryStr = this._queryArea.getValue();
            return helenos.util.RpcActionsProvider.queryCql(this._cfDef, queryStr);
        },
        
        _getCriteriaPane : function() {
            this._queryArea = new qx.ui.form.TextArea('SELECT * FROM ' + this._cfDef.name);
            this._queryArea.set({
                padding : 4,
                wrap : true,
                height : 120,
                appearance : 'cql-textarea'
            });
            
            var queryGB = new helenos.ui.GroupBoxV('Query');
            queryGB.add(this._queryArea, {
                flex : 1
            });
            
            var buttonPane = new qx.ui.container.Composite(new qx.ui.layout.HBox(5, 'left'));
            buttonPane.add(this._getSearchButton());
            
            var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(3, 'top'));
            container.setAppearance('criteria-pane');
            container.add(queryGB, {
                flex : 1
            });
            container.add(buttonPane);
            
            return container;
        }
    }
});
