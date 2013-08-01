package com.baidu.selenium.page;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.SearchContext;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.internal.WrapsDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baidu.selenium.support.ActionWait;

/**
 * 页面的抽象基类
 * @author xuwenhao
 *
 */
public abstract class Page implements SearchContext, WrapsDriver {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	protected WebDriver driver = null;

	public Page(WebDriver driver) {
		if (null == driver) {
			throw new IllegalArgumentException("WebDriver cannot be null.");
		}
		this.driver = driver;
	}

	/**
	 * 页面是否加载完成
	 * @author xuwenhao
	 * @return true: page loaded
	 */
	public abstract boolean isLoaded();

	/**
	 * 等待页面加载完成
	 * @author xuwenhao
	 * @param timeout 页面加载超时时间, 单位ms
	 */
	public void waitForPageToLoad(long timeout) {
		ActionWait<Page> waiter = new ActionWait<Page>(this, timeout);
		waiter.until(
			new GenericPageCondition<Page, Boolean>() {
				@Override
				public Boolean apply(Page page) {
					return page.isLoaded();
				}
			}
		);
	}
	
	/**
	 * Find the first {@link WebElement} using the given method. This method is
	 * affected by the 'implicit wait' times in force at the time of execution.
	 * The findElement(..) invocation will return a matching row, or try again
	 * repeatedly until the configured timeout is reached.
	 * 
	 * findElement should not be used to look for non-present elements, use
	 * {@link #findElements(By)} and assert zero length response instead.
	 * 
	 * @param by The locating mechanism
	 * @return The first matching element on the current page
	 * @throws NoSuchElementException
	 *             If no matching elements are found
	 * @see org.openqa.selenium.By
	 * @see org.openqa.selenium.WebDriver.Timeouts
	 */	
	@Override
	public WebElement findElement(By by) {
		return this.driver.findElement(by);
	}
	
	/**
	 * Find all elements within the current page using the given mechanism. This
	 * method is affected by the 'implicit wait' times in force at the time of
	 * execution. When implicitly waiting, this method will return as soon as
	 * there are more than 0 items in the found collection, or will return an
	 * empty list if the timeout is reached.
	 * 
	 * @param by The locating mechanism to use
	 * @return A list of all {@link WebElement}s, or an empty list if nothing matches
	 * @see org.openqa.selenium.By
	 * @see org.openqa.selenium.WebDriver.Timeouts
	 */
	@Override
	public List<WebElement> findElements(By by) {
		return this.driver.findElements(by);
	}

	@Override
	public WebDriver getWrappedDriver() {
		return this.driver;
	}
}
