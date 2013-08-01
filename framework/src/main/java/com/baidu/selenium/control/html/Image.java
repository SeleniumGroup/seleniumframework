package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * img元素
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class Image extends Control {

	protected Image() {
		// empty for LazyLoad
	}

	public Image(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Image(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Image(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
	/**
	 * 获取图片地址
	 * @author xuwenhao
	 * @return
	 */
	public String getSrc() {
		return this.getAttribute(HtmlAttributes.SRC);
	}

	/**
	 * 获取图片的文本
	 * @author xuwenhao
	 * @return
	 */
	public String getAlt() {
		return this.getAttribute(HtmlAttributes.ALT);
	}
	
	/**
	 * 获取图片宽度
	 * @author xuwenhao
	 * @return
	 */
	public String getWidth() {
		return this.getAttribute(HtmlAttributes.WIDTH);
	}
	
	/**
	 * 获取图片高度
	 * @author xuwenhao
	 * @return
	 */
	public String getHeight() {
		return this.getAttribute(HtmlAttributes.HEIGHT);
	}
}
