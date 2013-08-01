package com.baidu.selenium.screenshot;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.io.FileHandler;
import org.testng.annotations.Test;

import com.baidu.selenium.test.TestBase;

public class ScreenshotUtilsTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub
		
	}

	@Test
	public void testCaptureElement() {
		driver.get("http://www.baidu.com");
		WebElement submitBtn = driver.findElement(By.id("su"));
		
		File tempFile = ScreenshotUtils.captureElement(driver, submitBtn, OutputType.FILE);
    	File targetFile = new File("captureElement.png");
    	
        try {
            FileHandler.copy(tempFile, targetFile);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
	}
}
