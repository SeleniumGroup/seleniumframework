package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * html的列表项，用于封装li元素
 * 
 * @see http://www.w3school.com.cn/html/html_lists.asp
 * 
 * @author xuwenhao
 * 
 */
@LazyLoadControl
public class HtmlListItem extends Control {

	protected HtmlListItem() {
		// empty for LazyLoad
	}

	public HtmlListItem(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public HtmlListItem(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public HtmlListItem(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

}
