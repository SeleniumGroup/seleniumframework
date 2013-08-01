package com.baidu.selenium.screenshot;

import java.io.File;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.Point;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.util.Assert;

import com.baidu.selenium.utils.FileUtils;

public class ScreenshotUtils {
	
	/**
	 * 截整个浏览器
	 * @param driver
	 * @param target
	 * @return
	 */
	public static <X> X captureScreen(WebDriver driver, OutputType<X> target) {
		checkDriver(driver);
		TakesScreenshot screenshoter = (TakesScreenshot) driver;
		return screenshoter.getScreenshotAs(target);
	}
	
	/**
	 * 给一个WebElement截图
	 * @param driver
	 * @param element
	 * @param target
	 * @return
	 */
	public static <X> X captureElement(WebDriver driver, WebElement element, OutputType<X> target) {
		checkDriver(driver);
		TakesScreenshot screenshoter = (TakesScreenshot) driver;
		File screenFile = screenshoter.getScreenshotAs(OutputType.FILE);
		Point point = element.getLocation();
		Dimension dimension = element.getSize();
		byte[] elementByte = FileUtils.cutFromPng(screenFile, point, dimension);
		
		return target.convertFromPngBytes(elementByte);
	}

	private static void checkDriver(WebDriver driver) {
		Assert.isInstanceOf(TakesScreenshot.class, driver, "Driver is not instance of TakesScreenshot.");
	}
}
