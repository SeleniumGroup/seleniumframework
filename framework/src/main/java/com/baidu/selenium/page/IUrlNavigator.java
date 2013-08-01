package com.baidu.selenium.page;

import java.util.Hashtable;

import org.openqa.selenium.WebDriver;

/**
 * 负责跳转Url的接口
 * @author xuwenhao
 *
 */
public interface IUrlNavigator {
	/**
	 * 跳转到targetUrl
	 * @param driver
	 * @param targetUrl
	 */
	void doNavigation(WebDriver driver, String targetUrl);
	/**
	 * 跳转到targetUrl
	 * @param driver
	 * @param targetUrl
	 * @param paramTable
	 */
	void doNavigation(WebDriver driver, String targetUrl, Hashtable<String, String> paramTable);
}
