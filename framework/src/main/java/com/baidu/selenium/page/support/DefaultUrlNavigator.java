package com.baidu.selenium.page.support;

import java.util.Hashtable;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.WebDriver;

import com.baidu.selenium.page.IUrlNavigator;
import com.baidu.selenium.support.DriverUtils;
import com.baidu.selenium.utils.RequestUtils;

/**
 * 常规的Url跳转器，适合大多数页面
 * @author xuwenhao
 *
 */
public class DefaultUrlNavigator implements IUrlNavigator {
	/**
	 * QueryString同Url之间的分隔符
	 */
	private static final String PARAM_SEPERATOR = "?";

	@Override
	public void doNavigation(WebDriver driver, String targetUrl) {
		this.doNavigation(driver, targetUrl, null);
	}

	@Override
	public void doNavigation(WebDriver driver, String targetUrl, Hashtable<String, String> paramTable) {
		String destinationUrl = targetUrl;
		if (null != paramTable) {
			String queryString = RequestUtils.toQueryString(paramTable);
			if (!StringUtils.isEmpty(queryString)) {
				destinationUrl = destinationUrl + PARAM_SEPERATOR + queryString;
			}
		}
		
		driver.get(destinationUrl);
		DriverUtils.waitForPageLoaded(driver);
	}

}
