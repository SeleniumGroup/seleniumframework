package com.baidu.selenium.screenshot;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

/**
 * 通过webdriver来进行截图的类
 * @author xuwenhao
 *
 */
public class WebDriverScreenshotTaker implements IScreenshotTaker {
	private TakesScreenshot taker = null;
	
	public WebDriverScreenshotTaker(WebDriver driver) {
		if (!(driver instanceof TakesScreenshot)) {
			throw new IllegalArgumentException("Argument driver is not instanceof TakesScreenshot.");
		}
		
		taker = ((TakesScreenshot) driver);
	}
	
	@Override
	public byte[] getScreenshot() {
		return taker.getScreenshotAs(OutputType.BYTES);
	}
}
