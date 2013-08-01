package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * 按钮对象
 * 
 * 初始化参数:	页面会话的driver对象，按钮的id
 * 类依赖条件:	1)按钮是由3层div构成，主div下有2个子div，分别对应按钮的左边和右边
 * 				2)右边的子div的id是按钮id+label
 * 
 * @author	sakyo
 * @version	1.0.0
 */

public class Button extends ErControl{
	
	protected Button() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Button(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
	public Button(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}
	public Button(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}
	
	public void click()
	{
		wrappedElement.click();
	}
	 
	public Button init() {
		return this;
	}
}
