package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;



/**
 * 关键词控件
 * 
 * 初始化参数:	会话driver对象和控件的id
 * 类依赖条件:	1)在一个textarea中输入
 * 
 * @author	sakyo
 * @version	1.0.0
 */
public class OrientKeyWord extends Orientation {
	
	protected OrientKeyWord() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrientKeyWord(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public OrientKeyWord(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public OrientKeyWord(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public void inputValue(Object value)
	{
		WebElement we =  driver.findElement(By.id(domId+"selector")).findElement(By.tagName("textarea"));
		we.clear();
		we.sendKeys(value.toString());
	}

	 
	public OrientKeyWord init() {
		// TODO Auto-generated method stub
		return this;
	}
}
