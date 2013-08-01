package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.Initializable;
import com.baidu.selenium.control.LazyLoadControl;

@LazyLoadControl
public abstract class ErControl extends Control implements Initializable<ErControl> {

	protected String domId;

	/**
	 * do nothing, for lazyload & cglib
	 */
	protected ErControl() {
	}

	public ErControl(WebDriver driver, By by) {
		super(driver, by);
		er_init();
	}

	public ErControl(WebDriver driver, String id) {
		super(driver, id);
		er_init();
	}

	public ErControl(WebElement webElement) {
		super(webElement);
		er_init();
	}

	/**
	 * ER的基础控件都是有domID的 这里初始化内部的domID，供控件内部初始化使用
	 */
	private void er_init() {
		this.domId = wrappedElement.getAttribute("id");
	}

	/**
	 * 控件初始化过程
	 * @return class itself
	 */
	public abstract ErControl init();
}
