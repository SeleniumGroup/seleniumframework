package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

/**
 * 翻页控件
 * 
 */
public class Pager extends ErControl {
	
	protected Pager() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Pager(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public Pager(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Pager(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Pager init() {
		return this;
	}

	/**
	 * 翻下一页
	 * @return 翻页成功则返回true，否者返回false
	 */
	public boolean getNextPage() {
		try {
			WebElement next = wrappedElement.findElement(By
					.className("ui-pager-next"));
			new Actions(driver).moveToElement(next).perform();
			next.click();
		} catch (NoSuchElementException e) {
			return false;
		}
		return true;
	}
	
	/**
	 * 翻上一页
	 * @return 翻页成功则返回true，否者返回false
	 */
	public boolean getPreviousPage(){
		try {
			WebElement previous = wrappedElement.findElements(By.tagName("li")).get(0);
			new Actions(driver).moveToElement(previous).perform();
			if(previous.getAttribute("class").equalsIgnoreCase("ui-pager-disabled"))
				return false;
			else
				previous.click();
		} catch (Exception e) {
			return false;
		}
		return false;
	}
}
