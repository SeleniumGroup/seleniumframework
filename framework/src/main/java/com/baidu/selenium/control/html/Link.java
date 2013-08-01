package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * a元素，超链接
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class Link extends Control {

	protected Link() {
		// empty for LazyLoad
	}

	public Link(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Link(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Link(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 获取链接地址
	 * @author xuwenhao
	 * @return
	 */
	public String getHref() {
		return getAttribute(HtmlAttributes.HREF);
	}

	/**
	 * 获取链接的目标窗口
	 * @author xuwenhao
	 * @return
	 */
	public String getTarget() {
		return getAttribute(HtmlAttributes.TARGET);
	}

}
