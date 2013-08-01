package com.baidu.selenium.basic;

import java.util.Hashtable;

/**
 * 解析css字符串的�?
 * @author xuwenhao
 *
 */
public class CssParser {
	/**
	 * 将css字符串解析为hashtable, css属性作为key, 值作为value
	 * @author xuwenhao
	 * @param cssString
	 * @return
	 */
	public static Hashtable<String, String> getCssTable(String cssString) {
		Hashtable<String, String> cssTable = new Hashtable<String, String>();
		
		String[] splitted = cssString.trim().split(";");
		for (String splitItem : splitted) {
			String[] subItem = splitItem.split(":");
			
			if (0 == subItem.length) {
				continue;
			}
			
			if (1 == subItem.length) {
				cssTable.put(subItem[0].toLowerCase().trim(), "");
			}
			
			if (2 == subItem.length) {
				cssTable.put(subItem[0].toLowerCase().trim(), subItem[1].toLowerCase().trim());
			}
		}
		
		return cssTable;
	}
}
