package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * div元素
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class Div extends Control {

	protected Div() {
		// empty for LazyLoad
	}

	public Div(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Div(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Div(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

}
