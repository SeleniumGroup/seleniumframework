package com.baidu.selenium.test;

import java.io.InputStream;
import java.util.Properties;

public class TestConfigurationSettings {

	private static Properties props = null;
	static{
		try {
			props = new Properties();
			InputStream in = TestConfigurationSettings.class.getClassLoader().getResourceAsStream(TestConstants.TEST_CONFIG_FILE);
			props.load(in);
		} catch (Exception e) {
			throw new RuntimeException("ConfigurationSettings initialize failed.", e);
		}
	}
	
	/**
	 * 获取配置项
	 * @author xuwenhao
	 * 
	 * @param propertyName
	 * @return
	 */
	public static String getProperty(String propertyName){
		return props.getProperty(propertyName);
	}
	
	private TestConfigurationSettings(){
		
	}
	
	/**
	 * 测试页面基本地址
	 */
	public static final String TEST_PAGE_BASE_URL = getProperty("testpage.baseUrl");

}
