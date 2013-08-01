package com.baidu.selenium.support;

import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.StaleElementReferenceException;

/**
 * 为WebDriver操作特别封装的重试机制，Retry过程中将忽略NotFoundException和StaleElementReferenceException
 * @author xuwenhao
 *
 */
public class WebDriverRetryStrategy extends RetryStrategy {

	public WebDriverRetryStrategy() {
		super();
		addDefaultIgnoring();
	}

	public WebDriverRetryStrategy(int retryTimes) {
		super(retryTimes);
		addDefaultIgnoring();
	}

	public WebDriverRetryStrategy(int retryTimes, long sleepTimeout) {
		super(retryTimes, sleepTimeout);
		addDefaultIgnoring();
	}

	/**
	 * 添加默认忽略的Exception类型
	 */
	private void addDefaultIgnoring() {
		ignoring(NotFoundException.class);
		ignoring(StaleElementReferenceException.class);
	}
}
