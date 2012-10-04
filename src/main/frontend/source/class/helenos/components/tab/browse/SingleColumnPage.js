/* ************************************************************************
Copyright:
  2012 Tomek Kuprowski
License:
  GPLv2: http://www.gnu.org/licences/gpl.html
Authors:
  Tomek Kuprowski (tomekkuprowski at gmail dot com)
 ************************************************************************ */
qx.Class.define("helenos.components.tab.browse.SingleColumnPage",
{
    extend : helenos.components.tab.browse.AbstractBrowsePage,
 
    construct : function(ksName, cfName)
    {
        this.base(arguments, ksName, cfName);
        this.set({
            icon : 'icon/16/apps/utilities-keyring.png'
        });
    },

    members :
    {
        __keyTF : null,
        __nameTF : null,
        __sNameTF : null,
        
        _performSearch  : function(e) {
            var key = this.__keyTF.getValue();
            var name = this.__nameTF.getValue();
            var sName = (this.__sNameTF == null ? null : this.__sNameTF.getValue());
            var column = helenos.util.RpcActionsProvider.querySingleColumn(this._cfDef, key, name, sName );
            
            this._resultView.removeAll();
            if (this._rajCB.getValue()) {
                this._resultView.add(this._getTreeFromJson(key, column.value), {flex: 1});
                
            } else {
                this._resultView.add(new helenos.ui.CompositeH([new qx.ui.basic.Label('Value'),
                                                                new qx.ui.form.TextArea(column.value)]), {flex: 1});
            }
            
            this._resultView.add(this._getDetailsBox(column));
        },
        
        _getDetailsBox : function(column) {
            return new helenos.ui.CompositeH([
                new helenos.ui.BoldLabel('Column name:'),
                new qx.ui.form.TextField('' + column.name).set({width: 180}),
                new helenos.ui.BoldLabel('Clock:'),
                new qx.ui.form.TextField('' + column.clock).set({width: 150}),
                new helenos.ui.BoldLabel('TTL:'),
                new qx.ui.form.TextField('' + column.ttl).set({width: 150})
            ]);
        },
        
        _getCriteriaComponents : function() {
            var ret = new Array();
            this.__keyTF = new helenos.ui.RequiredTextField(this._cfDef.keyValidationClass);
            this.__nameTF = new helenos.ui.RequiredTextField(this._cfDef.comparatorType.className);
            this._manager.add(this.__keyTF);
            this._manager.add(this.__nameTF);
            //var searchButton = this._getSearchButton();
            
            ret.push(new helenos.ui.CompositeV([new qx.ui.basic.Label('Key:'), this.__keyTF]));
                        
            if (this._cfDef.columnType == 'Super') {
                this.__sNameTF = new helenos.ui.RequiredTextField(this._cfDef.subComparatorType.className);
                this._manager.add(this.__sNameTF);
                ret.push(new helenos.ui.CompositeV([new qx.ui.basic.Label('Super column name:'), this.__sNameTF]));
            }
            
            ret.push(new helenos.ui.CompositeV([new qx.ui.basic.Label('Column name:'), this.__nameTF]));
            //filterGB.add(searchButton);
            //filterGB.add(this._rajCB);
            
            //this.add(filterGB);
            return ret;
        }
    }
});
