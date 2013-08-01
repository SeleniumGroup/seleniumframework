package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.html.TextBox;

/**
 * 时间区间输入对象
 * 
 * 初始化参数:	页面会话的driver对象，选择框的节点对象
 * 类依赖条件:	1)初始化的输入框节点对象包含2个div的层，输入内容div和右侧的日历图标
 * 				2)点击下拉框后出现的弹出层id是输入框id+layer。
 * 				3)弹出层是由2个div构成
 * 				4)开始时间输入的id是输入框id+beginInput.
 * 				5)结束时间输入的id是输入框id+endInput.
 * 				6)确定按钮的id是输入框的id+_mcok.
 * 
 * @author	sakyo
 * @version	1.0.0
 */

public class TimeSpanInput extends ErControl{

	private TextBox beginInput;
	private TextBox endInput;

	protected TimeSpanInput() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TimeSpanInput(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	public TimeSpanInput(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	public TimeSpanInput(WebElement webElement) {
		super(webElement);
		init();
	}

	/**
	 * 初始化下拉框
	 * 
	 * 寻找弹出层，初始化两个时间输入框
	 */
	public TimeSpanInput init()
	{
		this.logger.debug("Initialize TimeSpanInput.\t Dom ID: " + domId);
		beginInput = new TextBox(driver, domId+"beginInput");
		endInput = new TextBox(driver, domId+"endInput");
		return this;
	}
	
	/*
	 * 通过属性获取或者设置下拉框的值
	 * 如果设置不存在的值，会抛出异常
	 */
	public String getBeginTime()
	{
		return beginInput.getText();
	}
	public String getEndTime()
	{
		return endInput.getText();
	}
	
	/**
	 * 设置时间区间，并且提交
	 * 
	 * @param begintime	开始时间
	 * @param endtime	结束时间
	 */
	public void setTimeSpan(String begintime, String endtime)
	{
		click();
		beginInput.setText(begintime);
		endInput.setText(endtime);
		driver.findElement(By.id(domId+"_mcok")).click();
	}
	
}
