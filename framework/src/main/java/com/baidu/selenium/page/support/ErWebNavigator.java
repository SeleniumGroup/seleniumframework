package com.baidu.selenium.page.support;

import java.util.Hashtable;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.WebDriver;

import com.baidu.selenium.page.IUrlNavigator;
import com.baidu.selenium.support.DriverUtils;
import com.baidu.selenium.utils.RequestUtils;

/**
 * ER框架的页面跳转器
 * @author xuwenhao
 *
 */
public class ErWebNavigator implements IUrlNavigator {
	/**
	 * QueryString同Url之间的分隔符
	 */
	private static final String PARAM_SEPERATOR = "~";

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
		// 由于url中的"#"符号，使得在跳转到相同Url时，会存在跳转失效的情况，需要额外进行一次refresh
		driver.navigate().refresh();
		DriverUtils.waitForPageLoaded(driver);
	}

}
