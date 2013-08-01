package com.baidu.selenium.basic;

/**
 * 封装一组拼接css selector 的方法
 * @author xuwenhao
 *
 */
public class CssSelector {
	private CssSelector() {
		
	}
	
	/**
	 * An element with a "attributeName" attribute
	 * @param attributeName
	 * @return
	 */
	public static String byAttribute(String attributeName) {
		return byAttribute("", attributeName);
	}
	
	/**
	 * A "tagName" element with a "attributeName" attribute
	 * @param tagName
	 * @param attributeName
	 * @return
	 */
	public static String byAttribute(String tagName, String attributeName) {
		return String.format("%s[%s]", tagName, attributeName);
	}
	
	/**
	 * An element whose "attributeName" attribute value is exactly equal to "attributeValue"
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeEquals(String attributeName, String attributeValue) {
		return byAttributeEquals("", attributeName, attributeValue);
	}
	
	/**
	 * A "tagName" element whose "attributeName" attribute value is exactly equal to "attributeValue"
	 * @param tagName
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeEquals(String tagName, String attributeName, String attributeValue) {
		return String.format("%s[%s='%s']", tagName, attributeName, escapeQuote(attributeValue));
	}
	
	/**
	 * An element whose "attributeName" attribute value begins exactly with the string "attributeValue"
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeStartsWith(String attributeName, String attributeValue) {
		return byAttributeStartsWith("", attributeName, attributeValue);
	}
	
	/**
	 * A "tagName" element whose "attributeName" attribute value begins exactly with the string "attributeValue"
	 * @param tagName
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeStartsWith(String tagName, String attributeName, String attributeValue) {
		return String.format("%s[%s^='%s']", tagName, attributeName, escapeQuote(attributeValue));
	}
	
	/**
	 * A "tagName" element whose "attributeName" attribute value ends exactly with the string "attributeValue"
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeEndsWith(String attributeName, String attributeValue) {
		return byAttributeEndsWith("", attributeName, attributeValue);
	}
	
	/**
	 * A "tagName" element whose "attributeName" attribute value ends exactly with the string "attributeValue"
	 * @param tagName
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeEndsWith(String tagName, String attributeName, String attributeValue) {
		return String.format("%s[%s$='%s']", tagName, attributeName, escapeQuote(attributeValue));
	}
	
	/**
	 * An element whose "attributeName" attribute value contains the substring "attributeValue"
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeContains(String attributeName, String attributeValue) {
		return byAttributeContains("", attributeName, attributeValue);
	}
	
	/**
	 * A "tagName" element whose "attributeName" attribute value contains the substring "attributeValue"
	 * @param tagName
	 * @param attributeName
	 * @param attributeValue
	 * @return
	 */
	public static String byAttributeContains(String tagName, String attributeName, String attributeValue) {
		return String.format("%s[%s*='%s']", tagName, attributeName, escapeQuote(attributeValue));
	}
	
	/**
	 * An element, first child of its parent
	 * @return
	 */
	public static String byFirstChild() {
		return byFirstChild("");
	}
	
	/**
	 * A "tagName" element, first child of its parent
	 * @param tagName
	 * @return
	 */
	public static String byFirstChild(String tagName) {
		return String.format("%s:first-child", tagName);
	}
	
	/**
	 * An element, last child of its parent
	 * @return
	 */
	public static String byLastChild() {
		return byLastChild("");
	}
	
	/**
	 * A "tagName" element, last child of its parent
	 * @param tagName
	 * @return
	 */
	public static String byLastChild(String tagName) {
		return String.format("%s:last-child", tagName);
	}

	/**
	 * A "tagName" element which is accord with the attribute condition group
	 * @param attributeConditions
	 * @return
	 */
	public static String byAttributeGroup(String tagName, String ...attributeConditions) {
		return tagName + byAttributeGroup(attributeConditions);
	}
	
	/**
	 * An element which is accord with the attribute condition group
	 * @param attributeConditions
	 * @return
	 */
	public static String byAttributeGroup(String ...attributeConditions) {
		StringBuilder builder = new StringBuilder();
		
		for (String condition : attributeConditions) {
			builder.append(condition);
		}
		
		return builder.toString();
	}
	
	/**
	 * 将单引号转义
	 * @param attributeValue
	 * @return
	 */
	private static String escapeQuote(String attributeValue) {
		return attributeValue.replace("'", "\\'");
	}
}
