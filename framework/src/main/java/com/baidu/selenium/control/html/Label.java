package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * label元素
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class Label extends Control {

	protected Label() {
		// empty for LazyLoad
	}

	public Label(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Label(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Label(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

}
