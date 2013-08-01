package com.baidu.selenium.utils;

import java.util.List;

/**
 * 集合工具类
 * @author xuwenhao
 *
 */
public class CollectionUtils {
    /**
     * 将List<Object>转换为Object[][]二维数组
     * @param source
     * @return
     */
    public static Object[][] toTwoDimensionArray(List<Object[]> source) {
        Object[][] result = new Object[source.size()][];
        
        for (int i = 0; i < source.size(); i++) {
            Object[] sourceItem = source.get(i);
            result[i] = new Object[sourceItem.length];
            for (int j = 0; j < sourceItem.length; j++) {
                result[i][j] = sourceItem[j];
            }
        }
        
        return result;
    }
}
