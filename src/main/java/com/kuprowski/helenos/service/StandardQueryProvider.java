package com.kuprowski.helenos.service;

import com.googlecode.jsonrpc4j.JsonRpcParam;
import com.kuprowski.helenos.types.Column;
import com.kuprowski.helenos.types.Slice;
import com.kuprowski.helenos.types.qx.query.SingleColumnQuery;
import com.kuprowski.helenos.types.qx.query.RangeQuery;
import java.util.List;

/**
 * ********************************************************
 * Copyright: 2012 Tomek Kuprowski
 *
 * License: GPLv2: http://www.gnu.org/licences/gpl.html
 *
 * @author Tomek Kuprowski (tomekkuprowski at gmail dot com)
 * *******************************************************
 */
public interface StandardQueryProvider {

    //<K, N> String singleColumn(@JsonRpcParam("keyClass") Class<K> keyClass, @JsonRpcParam("valueClass") Class<N> valueClass, @JsonRpcParam("columnFamily") String keyspaceName, @JsonRpcParam("columnFamily") String columnFamily, @JsonRpcParam("key") String keyStr, @JsonRpcParam("name") String nameStr);
    
    <K, N> Column<N> singleColumn(@JsonRpcParam("query") SingleColumnQuery<K,N> query);
    <K, N> List<Slice<K,N>> predicate(@JsonRpcParam("query") RangeQuery<K,N> query);
    <K, N> List<Slice<K,N>> keyRange(com.kuprowski.helenos.types.qx.query.RangeQuery<K, N> query);
}
