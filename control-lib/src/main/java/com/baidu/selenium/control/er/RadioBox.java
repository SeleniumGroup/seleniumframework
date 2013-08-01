package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.RemoteWebElement;

import com.baidu.selenium.basic.CssSelector;
import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.html.Label;

/**
 * ER框架的RadioBox, 附带一个Label元素
 * @author xuwenhao
 *
 */
public class RadioBox extends ErControl {
	private Label label;
	
	protected RadioBox() {
		// lazy load
	}
	
	public RadioBox(RemoteWebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public RadioBox(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public RadioBox(RemoteWebDriver driver, String domId) {
		super(driver, domId);
		// TODO Auto-generated constructor stub
	}

	public RadioBox(RemoteWebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
	
	/* Begin 获取内部控件 */
	
	private Label getLabel() {
		if (null == label) {
			label = new Label(driver.findElement(By.cssSelector(CssSelector.byAttributeEquals(HtmlAttributes.FOR, domId))));
		}
		
		return label;
	}
	
	/* End 获取内部控件 */
	
	@Override
	public String getText() {
		return getLabel().getText();
	}

	@Override
	public ErControl init() {
		return this;
	}
}
