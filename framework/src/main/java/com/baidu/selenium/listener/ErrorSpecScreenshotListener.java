package com.baidu.selenium.listener;

import java.io.File;
import java.io.IOException;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.io.FileHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.baidu.selenium.common.ConfigurationSettings;
import com.baidu.selenium.common.Constants;

public class ErrorSpecScreenshotListener implements ITestListener {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	private ITestContext testContext = null;
	
	@Override
	public void onFinish(ITestContext context) {
		this.testContext = null;
	}

	@Override
	public void onStart(ITestContext context) {
		this.testContext = context;
	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult testResult) {
		this.onTestFailure(testResult);
	}

	@Override
	public void onTestFailure(ITestResult testResult) {
        if (null == this.testContext) {
        	this.logger.warn("TestContext is null.");
        	return;
        }
        
        Object driver = this.testContext.getAttribute(Constants.CONTEXT_KEY_DRIVER);
        if (null == driver) {
        	this.logger.warn(String.format("Can not get driver from TestContext. Attribute '%s' in TestContext is not set as a WebDriver."
        					, Constants.CONTEXT_KEY_DRIVER));
        	return;
        }
        else if (!(driver instanceof WebDriver)) {
        	this.logger.warn(String.format("Attribute '%s' in TestContext is not set as a WebDriver.", Constants.CONTEXT_KEY_DRIVER));
        	return;
        }
        else if (!(driver instanceof TakesScreenshot)) {
        	this.logger.warn("Driver does not implement interface TakesScreenshot.");
        	return;
        }
        
        TakesScreenshot screenShoter = (TakesScreenshot) driver;
        File tempFile = screenShoter.getScreenshotAs(OutputType.FILE);
        File targetFile = new File(getScreenShotDir(testResult), getScreenShotFileName(testResult));
        
        try {
            FileHandler.copy(tempFile, targetFile);
        } catch (IOException e) {
            logger.error(String.format("Fail to create screenshot: %s.", targetFile.getPath()), e);
        }
	}
    
    private File getScreenShotDir(ITestResult testResult) {
        String dirName = ConfigurationSettings.SCREENSHOT_ERROR_DIR;
        File dir = new File(dirName);
        dir.mkdirs();
        
        return dir;
    }
    
    private String getScreenShotFileName(ITestResult testResult) {
    	return String.format("%s_%s.png", testResult.getName(), testResult.getStartMillis() / 1000);
    }

	@Override
	public void onTestSkipped(ITestResult testResult) {
		// do nothing
	}

	@Override
	public void onTestStart(ITestResult testResult) {
		// do nothing
	}

	@Override
	public void onTestSuccess(ITestResult testResult) {
		// do nothing
	}

}
