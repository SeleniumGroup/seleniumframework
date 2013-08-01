package com.baidu.selenium.support.internal;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baidu.selenium.common.ConfigurationSettings;
import com.baidu.selenium.exception.UnsupportedDriverException;
import com.baidu.selenium.support.DriverFactory;

/**
 * 默认的WebDriver工厂类
 * @author xuwenhao
 *
 */
public class DefaultDriverFactory extends DriverFactory {
	private static DriverTypeEnum DEFAULT_DRIVER_TYPE = DriverTypeEnum.FirefoxDriver;
	
    protected Logger logger = LoggerFactory.getLogger(getClass());

    public WebDriver getDriver() {
    	WebDriver driver = null;
    	if (ConfigurationSettings.WEBDRIVER_ISREMOTE) {
    		driver = getRemoteDriver();
    	}
    	else {
    		driver = getLocalDriver();
    	}
    	
    	setDefaultOptions(driver);
    	return driver;
    }
    
	private WebDriver getLocalDriver() {
    	DriverTypeEnum driverType = this.getDriverType();
    	WebDriver driver = null;
    	
    	switch(driverType){
        case InternetExplorerDriver:
        	driver = new InternetExplorerDriver();
            break;
        case FirefoxDriver:
        	if (!StringUtils.isEmpty(ConfigurationSettings.WEBDRIVER_FIREFOX_BINARY_PATH.trim())) {
        		System.setProperty("webdriver.firefox.bin", ConfigurationSettings.WEBDRIVER_FIREFOX_BINARY_PATH.trim());
        	}
        	driver = new FirefoxDriver();
            break;
        case ChromeDriver:
        	if (!StringUtils.isEmpty(ConfigurationSettings.WEBDRIVER_CHROME_BINARY_PATH.trim())) {
        		System.setProperty(ChromeDriverService.CHROME_DRIVER_EXE_PROPERTY, ConfigurationSettings.WEBDRIVER_CHROME_BINARY_PATH.trim());
        	}
        	driver = new ChromeDriver();
            break;
        default:
        	throw new UnsupportedDriverException("Unsupported Driver: " + driverType.name());
    	}
    	
    	return driver;
    }
    
    private WebDriver getRemoteDriver() {
    	DriverTypeEnum driverType = this.getDriverType();
    	WebDriver driver = null;
    	DesiredCapabilities dc = null;
    	try {
			URL remoteAddress = new URL(ConfigurationSettings.WEBDRIVER_REMOTE_HOST + ":" + ConfigurationSettings.WEBDRIVER_REMOTE_PORT  + "/wd/hub");
	    	switch(driverType){
	        case InternetExplorerDriver:
	        	dc = DesiredCapabilities.internetExplorer();
	            break;
	        case FirefoxDriver:
	        	dc = DesiredCapabilities.firefox();
	            break;
	        case ChromeDriver:
	        	dc = DesiredCapabilities.chrome();
	            break;
	        default:
	        	throw new UnsupportedDriverException("Unsupported Driver: " + driverType.name());
	    	}
	    	
			dc.setCapability(CapabilityType.TAKES_SCREENSHOT, true);
			driver = new RemoteScreenShotWebdriver(remoteAddress, dc);
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		}

    	return driver;
    }
    
    /**
     * 根据配置的WebDriver类型，转换成对应的枚举对象
     * @author xuwenhao
     * @return
     */
    private DriverTypeEnum getDriverType() {
    	DriverTypeEnum type = DEFAULT_DRIVER_TYPE;
    	try {
    		type = Enum.valueOf(DriverTypeEnum.class, ConfigurationSettings.WEBDRIVER_TYPE);
    	}
    	catch (Exception ex) {
    		this.logger.warn("Parse WebDriver.Type failed, use default driver type: " + DEFAULT_DRIVER_TYPE.name());
    		this.logger.debug(ex.getMessage(), ex);
    	}
    	return type;
    }
    
    /**
     * 设置implicitlyWait时间，最大化浏览器。
     * @param driver
     */
    private void setDefaultOptions(WebDriver driver){
        driver.manage().timeouts().implicitlyWait(ConfigurationSettings.WEBDRIVER_IMPLICITLYWAIT, TimeUnit.MICROSECONDS);
        try {
        	driver.manage().window().maximize();
        }
        catch (Exception ex) {
        	try {
    			// 部分情况下浏览器不支持driver.manage().window().maximize()
	        	// Chrome:17, ChromeDriver:20, Selenium:2.21.0
    			driver.manage().window().setPosition(new Point(0, 0));
	        	java.awt.Dimension screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
	        	Dimension dim = new Dimension((int) screenSize.getWidth(), (int) screenSize.getHeight());
	        	driver.manage().window().setSize(dim);
        	}
        	catch (Exception exception) {
        		logger.warn("Maximize browser failed.");
        		logger.warn(exception.getMessage(), exception);
        	}
        }
    }
}
