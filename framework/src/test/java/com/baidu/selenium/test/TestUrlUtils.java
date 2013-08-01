package com.baidu.selenium.test;

public class TestUrlUtils {
	public static String getUrl(String relativeUrl) {
		if ('/' != relativeUrl.charAt(0)) {
			return TestConfigurationSettings.TEST_PAGE_BASE_URL + "/" + relativeUrl;
		}
		
		return TestConfigurationSettings.TEST_PAGE_BASE_URL + relativeUrl;
	}
}
