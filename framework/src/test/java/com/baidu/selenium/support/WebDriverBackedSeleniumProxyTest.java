package com.baidu.selenium.support;

import org.openqa.selenium.WebDriverBackedSelenium;
import org.testng.Assert;
import org.testng.annotations.Test;

import com.baidu.selenium.test.TestBase;

public class WebDriverBackedSeleniumProxyTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub

	}

	@Test
	public void testGetSelenium() {
		WebDriverBackedSelenium obj1 = WebDriverBackedSeleniumProxy.getSelenium(driver);
		WebDriverBackedSelenium obj2 = WebDriverBackedSeleniumProxy.getSelenium(driver);
		
		Assert.assertTrue(obj1.equals(obj2));
	}

	@Test
	public void testRemoveSelenium() {
		WebDriverBackedSeleniumProxy.getSelenium(driver);
		WebDriverBackedSeleniumProxy.unregisterSelenium(driver);
		Assert.assertEquals(WebDriverBackedSeleniumProxy.seleniumInstanceMap.size(), 0);
	}
}
