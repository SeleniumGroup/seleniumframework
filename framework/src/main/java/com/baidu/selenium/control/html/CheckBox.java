package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * 复选框, input type="checkbox"
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class CheckBox extends Control {

	protected CheckBox() {
		// empty for LazyLoad
	}

	public CheckBox(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public CheckBox(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public CheckBox(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
}
