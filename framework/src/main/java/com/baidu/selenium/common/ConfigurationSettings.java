package com.baidu.selenium.common;

import java.io.InputStream;
import java.util.Properties;

/**
 * 配置信息
 * @author xuwenhao
 *
 */
public class ConfigurationSettings {

	private static Properties props = null;
	static{
		try {
			props = new Properties();
			InputStream in = ConfigurationSettings.class.getClassLoader().getResourceAsStream(Constants.SELENIUM_CONFIG);
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
	
	private ConfigurationSettings(){
		
	}
	
	/**
	 * DriverFactory类型
	 */
	public static final String WEBDRIVER_FACTORY = getProperty("webdriver.factory");
	
	/**
	 * WebDriver类型
	 */
	public static final String WEBDRIVER_TYPE = getProperty("webdriver.type");

	/**
	 * Firefox的执行路径
	 */
	public static final String WEBDRIVER_FIREFOX_BINARY_PATH = getProperty("webdriver.firefox.binary.path");

	/**
	 * Chrome的执行路径
	 */
	public static final String WEBDRIVER_CHROME_BINARY_PATH = getProperty("webdriver.chrome.binary.path");
	
	/**
	 * 是否以RemoteWebDriver连接远程Server的方式来执行
	 */
	public static final Boolean WEBDRIVER_ISREMOTE = Boolean.parseBoolean(getProperty("webdriver.isremote"));
	
	/**
	 * 使用RemoteWebDriver时的Server地址
	 */
	public static final String WEBDRIVER_REMOTE_HOST = getProperty("webdriver.remote.host");
	
	/**
	 * 使用RemoteWebDriver时的Server端口
	 */
	public static final String WEBDRIVER_REMOTE_PORT = getProperty("webdriver.remote.port");
	
	/**
	 * TestClass执行完时是否关闭浏览器
	 */
	public static Boolean WEBDRIVER_CLOSE_AFTERCLASS = Boolean.parseBoolean(getProperty("webdriver.close.afterclass"));
	
	/**
	 * WebDriver的默认等待时间, 单位(毫秒)
	 */
	public static final Integer WEBDRIVER_IMPLICITLYWAIT = Integer.valueOf(getProperty("webdriver.implicitlywait"));
	
	/**
	 * ActionWait的等待超时时间, 单位(毫秒)
	 */
	public static final Integer ACTIONWAIT_TIMEOUT = Integer.valueOf(getProperty("actionwait.timeout"));
	
	/**
	 * ActionWait的轮询间隔时间, 单位(毫秒)
	 */
	public static final Integer ACTIONWAIT_SLEEP_DURATION = Integer.valueOf(getProperty("actionwait.sleep.duration"));
	
	/**
	 * 页面加载的超时时间, 单位(毫秒)
	 */
	public static final Integer PAGELOAD_TIMEOUT = Integer.valueOf(getProperty("pageload.timeout"));
	
	/**
	 * Case运行失败时，截图的保存路径
	 */
	public static final String SCREENSHOT_ERROR_DIR = getProperty("screenshot.error.dir");
	
	/**
	 * 自动截图的保存路径
	 */
	public static final String SCREENSHOT_AUTO_DIR = getProperty("screenshot.auto.dir");
	
	/**
	 * AutoIt3的DLL路径，相对于user.dir
	 */
	public static final String THIRDPARTY_AUTOIT3_DLL = getProperty("thirdparty.autoit3.dll");
	
	/**
	 * AutoIt3的EXE路径，相对于user.dir
	 */
	public static final String THIRDPARTY_AUTOIT3_EXE = getProperty("thirdparty.autoit3.exe");
	
	/**
	 * 通过AutoIt操作文件上传框的脚本
	 */
	public static final String THIRDPARTY_AUTOIT3_SCRIPT_UPLOADFILE = getProperty("thirdparty.autoit3.script.uploadfile");
}
