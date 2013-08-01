package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * 按钮, input type="button"
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class Button extends Control {

	protected Button() {
		// empty for LazyLoad
	}
	
	public Button(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Button(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Button(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	@Override 
	public String getText(){
		return wrappedElement.getAttribute(HtmlAttributes.VALUE);
	}
}
