package com.baidu.selenium.page;

import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;

import com.baidu.selenium.common.Constants;
import com.baidu.selenium.exception.InitializeFailedException;
import com.baidu.selenium.exception.NoMatchedURLException;

/**
 * Page和具体Url的映射类。
 * 配置中包含baseUrl和各页面的relativeUrl。
 * 可以使用该类获取Page的absoluteUrl, 即baseUrl/relativeUrl。
 * 也可以单独获取Page的relativeUrl
 * @author xuwenhao
 *
 */
public class PageUrlMapping {
	private PageUrlMapping() {
		
	}
	
	private static Properties urlMapping = null;
	private static String baseUrl = "";
	
	static{
		try {
			urlMapping = new Properties();
			InputStream in = Constants.class.getClassLoader().getResourceAsStream(Constants.PAGE_URL_MAPPING_FILE);
			urlMapping.load(in);
		} catch (Exception e) {
			throw new InitializeFailedException("Page-URL mapping initialize failed.", e);
		}
		
		baseUrl = urlMapping.getProperty("baseUrl");
	}
	
	/**
	 * 网站地址
	 * @author xuwenhao
	 * @return
	 */
	public static String getBaseUrl() {
		return baseUrl;
	}
	
	/**
	 * 获取Page绝对地址
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @return $baseUrl/$relativeUrl
	 */
	public static <T extends Page> String getAbsoluteUrl(Class<T> pageClass) {
		return getAbsoluteUrl(getRelativeUrl(pageClass));
	}
	
	/**
	 * 获取Page相对地址
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @return
	 */
	public static <T extends Page> String getRelativeUrl(Class<T> pageClass) {
		boolean hasKey = false;
		String result = "";
		
		Class<?> targetClass = pageClass;
		while (!targetClass.equals(Page.class)) {
			if (urlMapping.containsKey(targetClass.getName())) {
				hasKey = true;
				result = urlMapping.getProperty(targetClass.getName()).trim();
				break;
			}
			
			targetClass = targetClass.getSuperclass();
		}
		
		if (!hasKey) {
			throw new NoMatchedURLException(pageClass);
		}
		
		return result;
	}
	
	private static String getAbsoluteUrl(String relativeUrl) {
		if (StringUtils.isEmpty(relativeUrl)) {
			return baseUrl;
		}
		if (StringUtils.isEmpty(baseUrl)) {
			return relativeUrl;
		}
		if ('/' == relativeUrl.charAt(0)) {
			return baseUrl + relativeUrl;
		}

		return baseUrl + "/" + relativeUrl;
	}
}
