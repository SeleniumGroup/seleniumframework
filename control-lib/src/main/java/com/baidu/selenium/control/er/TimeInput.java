package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * 时间选择框对象
 * 
 * 初始化参数:	页面会话的driver对象，时间选择框的节点对象
 * 类依赖条件:	1)时间选择框节点对象包含2个节点，时间输入input和右侧的显示选择时间的图标
 * 				2)改变时间的输入流程，点击时间选择框，弹出层，输入时间，再次点击选择框，弹出层消失
 * 				2)点击选择框后出现的下拉层id是时间选择框id+layer。
 * 
 * @author	sakyo
 * @version	1.0.0
 */
public class TimeInput extends ErControl {

	protected TimeInput() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TimeInput(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public TimeInput(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public TimeInput(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	 
	public TimeInput init() {
		return this;
	}

	/**
	 * 得到时间框当前的时间
	 * @return		时间输入框当前时间
	 */
	public String getTime()
	{
		return wrappedElement.findElement(By.tagName("input")).getAttribute("value");
	}
	
	/**
	 * 设置时间输入框时间
	 * @param time	需要设置的时间
	 */
	public void setTime(String time)
	{
		wrappedElement.click();
		wrappedElement.findElement(By.tagName("input")).clear();
		wrappedElement.findElement(By.tagName("input")).sendKeys(time);
		wrappedElement.click();
	}
}
