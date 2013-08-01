package com.baidu.selenium.support.internal;

import java.net.URL;

import org.openqa.selenium.Capabilities;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DriverCommand;
import org.openqa.selenium.remote.RemoteWebDriver;

/**
 * 可截图的RemoteWebDriver
 * 
 * @author xuwenhao
 */
public class RemoteScreenShotWebdriver extends RemoteWebDriver implements TakesScreenshot {
	public RemoteScreenShotWebdriver(URL remoteAddress, Capabilities desiredCapabilities) {
		super(remoteAddress, desiredCapabilities);
	}

	@Override
	public <X> X getScreenshotAs(OutputType<X> target) {
		if (!(Boolean) getCapabilities().getCapability(CapabilityType.TAKES_SCREENSHOT)) {
			return null;
		}
		// Get the screenshot as base64.
		String base64 = execute(DriverCommand.SCREENSHOT).getValue().toString();
		// ... and convert it.
		return target.convertFromBase64Png(base64);
	}
}
