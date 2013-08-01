package com.baidu.selenium.control;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.basic.HtmlTags;
import com.baidu.selenium.test.TestBase;
import com.baidu.selenium.test.TestUrlUtils;

public class ControlTest extends TestBase {
	public class TestControl extends Control {
		public TestControl(WebElement webElement) {
			super(webElement);
		}
		
		public TestControl(WebDriver driver, String id) {
			super(driver, id);
		}

		public TestControl(WebDriver driver, By by) {
			super(driver, by);
		}
	}

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub
		
	}
	
	private static final String URL_PREFIX = "control/controltest/";
	
	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}
	
	/**
	 * 测试通过js给dom对象的属性赋值。
	 */
	@Test
	public void testJsSetAttribute_TextBox() {
		this.driver.get(this.getUrl("testJsSetAttribute.html"));
		TestControl control = new TestControl(this.driver.findElement(By.id("testInput")));
		String inputText = "helloworld";
		control.jsSetAttribute(HtmlAttributes.VALUE, inputText);
		Assert.assertEquals(control.getAttribute(HtmlAttributes.VALUE), inputText);
	}
	
	/**
	 * 测试子节点都是同一Tag的情况
	 */
	@Test
	public void testGetChildNodesCountByTagName_SameTag() {
		this.driver.get(this.getUrl("testGetChildNodesCountByTagName_SameTag.html"));
		TestControl control = new TestControl(this.driver.findElement(By.id("main")));
		Assert.assertEquals(control.getChildNodesCountByTagName(HtmlTags.DIV), 4);
	}
	
	/**
	 * 测试子节点有不同Tag的情况
	 */
	@Test
	public void testGetChildNodesCountByTagName_MultiTags() {
		this.driver.get(this.getUrl("testGetChildNodesCountByTagName_MultiTags.html"));
		TestControl control = new TestControl(this.driver.findElement(By.id("main")));
		Assert.assertEquals(control.getChildNodesCountByTagName(HtmlTags.DIV), 3);
	}
	
	/**
	 * 测试子节点中有嵌套的情况
	 */
	@Test
	public void testGetChildNodesCountByTagName_NestedTags() {
		this.driver.get(this.getUrl("testGetChildNodesCountByTagName_NestedTags.html"));
		TestControl control = new TestControl(this.driver.findElement(By.id("main")));
		Assert.assertEquals(control.getChildNodesCountByTagName(HtmlTags.DIV), 3);
	}

}
