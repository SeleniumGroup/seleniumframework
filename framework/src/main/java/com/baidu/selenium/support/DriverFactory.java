package com.baidu.selenium.support;

import java.lang.reflect.Constructor;

import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baidu.selenium.common.ConfigurationSettings;
import com.baidu.selenium.support.internal.DefaultDriverFactory;

/**
 * WebDriver工厂类
 * @author xuwenhao
 *
 */
public abstract class DriverFactory {
	private static final Class<?> DEFAULT_DRIVER_FACTORY = DefaultDriverFactory.class;
	private static final Logger staticLogger = LoggerFactory.getLogger(DriverFactory.class);
	private static DriverFactory instance = null;
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	protected DriverFactory() {
		
	}
	
	static {
		instance = createInstance();
	}
	
	/**
	 * 构造WebDriver对象
	 * @return
	 */
	public abstract WebDriver getDriver();
	
	public static DriverFactory getInstance() {
		if (null == instance) {
			instance = createInstance();
		}
		
		return instance;
	}
	
	@SuppressWarnings("unchecked")
	private static DriverFactory createInstance() {
		Class<?> driverFactoryClass = null;
		
		if (!StringUtils.isEmpty(ConfigurationSettings.WEBDRIVER_FACTORY)) {
			try {
				driverFactoryClass = Class.forName(ConfigurationSettings.WEBDRIVER_FACTORY.trim());
			} catch (ClassNotFoundException e) {
				staticLogger.warn(String.format("Class: %s is not found, use %s instead."
								, ConfigurationSettings.WEBDRIVER_FACTORY, DEFAULT_DRIVER_FACTORY.getSimpleName()));
				driverFactoryClass = DEFAULT_DRIVER_FACTORY;
			}
			
			if (!DriverFactory.class.isAssignableFrom(driverFactoryClass)) {
				staticLogger.warn(String.format("Class: %s is not a sub class of DriverFactory, use %s instead."
								, ConfigurationSettings.WEBDRIVER_FACTORY, DEFAULT_DRIVER_FACTORY.getSimpleName()));
				driverFactoryClass = DEFAULT_DRIVER_FACTORY;
			}
		}
		else {
			driverFactoryClass = DEFAULT_DRIVER_FACTORY;
		}
		
		return createInstance((Class<DriverFactory>) driverFactoryClass);
	}
	
	private static DriverFactory createInstance(Class<DriverFactory> factoryClass) {
		try {
			Constructor<DriverFactory> constructor = factoryClass.getConstructor();

			return constructor.newInstance();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
