package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * 定位控件 处理地域、时间、人群三种控件的基类
 * 
 * 初始化参数:	会话driver对象和控件的id
 * 类依赖条件:	1)初始化的节点对象包含2个div的层，一个result的div和一个selector的div
 * 				2)result的div的id是节点id+result，selector的id是节点id+selector
 * 				3)result包括一个修改和一个删除按钮
 * 
 * @author	sakyo
 * @version	1.0.0
 */
public abstract class Orientation extends ErControl{

	
	protected Orientation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Orientation(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public Orientation(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Orientation(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 得到显示的结果
	 * @return
	 */
	public String getValue()
	{
		WebElement result = driver.findElement(By.id(domId+"result"));
		return result.findElement(By.tagName("span")).getText();
	}
	
	/**
	 * 修改控件的值
	 * 注意这里是修改控件的值，而不是在控件没有值的时候设置，比如人群定向
	 * @param value
	 */
	public void setValue(Object value)
	{
		try {
			driver.findElement(By.id(domId+"ItemDelete")).click();
		} catch (Exception e) {
			driver.findElement(By.id(domId+"NoneItemDelete")).click();
		}
		//如果不需要
		if(value == null) return;
		try {
			driver.findElement(By.id(domId+"NoneItemModify")).click();
		} catch (Exception e) {
			driver.findElement(By.id(domId+"ItemModify")).click();
		}
		inputValue(value);
		submit();
	}
	
	/**
	 * 往选择框里面输入数据的步骤，每一个子类要覆盖
	 * 这里也是在空间没有值的时候进行设置的函数
	 * @param value
	 */
	protected void inputValue(Object wm)
	{
		
	}
	
	public void submit()
	{
		new Button(driver, domId+"_btnOrientOK").click();
	}
}
