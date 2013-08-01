package com.baidu.selenium.support;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverBackedSelenium;

import com.baidu.selenium.common.ConfigurationSettings;

/**
 * WebDriver的扩展工具类
 * @author xuwenhao
 *
 */
public class DriverUtils {

	/**
	 * 判断元素是否存在
	 * @param context
	 * @param condition
	 * @return
	 */
	public static boolean hasElement(SearchContext context, By condition) {
		boolean result = false;
		try {
			context.findElement(condition);
			result = true;
		}
		catch (NotFoundException e) {
			result = false;
		}

		return result;
	}

	/**
	 * 等待页面本身加载完成
	 * @author xuwenhao
	 * @param driver 
	 */
	public static void waitForPageLoaded(WebDriver driver) {
		WebDriverBackedSelenium selenium = WebDriverBackedSeleniumProxy.getSelenium(driver);
		selenium.waitForPageToLoad(ConfigurationSettings.PAGELOAD_TIMEOUT.toString());
	}
	
	/**
	 * 获取浏览器客户端信息
	 * @param driver
	 * @return
	 */
	public static String getUserAgent(WebDriver driver) {
		String result = "";
		if (driver instanceof JavascriptExecutor) {
			JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
			result = jsExecutor.executeScript("return window.navigator.userAgent;").toString();
		}
		else {
			WebDriverBackedSelenium selenium = WebDriverBackedSeleniumProxy.getSelenium(driver);
			result = selenium.getEval("window.navigator.userAgent");
		}
		
		return result;
	}

}
