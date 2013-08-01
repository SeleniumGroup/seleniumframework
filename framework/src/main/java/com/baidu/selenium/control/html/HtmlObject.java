package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * object元素
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class HtmlObject extends Control {

	protected HtmlObject() {
		// empty for LazyLoad
	}

	public HtmlObject(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public HtmlObject(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public HtmlObject(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 获取宽度
	 * @author xuwenhao
	 * @return
	 */
	public String getObjectWidth(){
		return this.getAttribute(HtmlAttributes.WIDTH);
	}
	
	/**
	 * 获取高度
	 * @author xuwenhao
	 * @return
	 */
	public String getObjectHeight(){
		return this.getAttribute(HtmlAttributes.HEIGHT);
	}
	
	/**
	 * 获取对齐方式
	 * @author xuwenhao
	 * @return
	 */
	public String getObjectAlign(){
		return this.getAttribute(HtmlAttributes.ALIGN);
	}
}
