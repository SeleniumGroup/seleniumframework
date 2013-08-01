package com.baidu.selenium.screenshot;

import java.io.File;

/**
 * 负责截图的控制器
 * @author xuwenhao
 *
 */
public class ScreenshotController {
	private IScreenshotTaker taker = null;
	private IScreenshotStorer storer = null;
	
	public ScreenshotController(IScreenshotTaker taker, IScreenshotStorer storer) {
		if (null == taker) {
			throw new IllegalArgumentException("Argument taker cannot be null.");
		}
		
		if (null == storer) {
			throw new IllegalArgumentException("Argument locator cannot be null.");
		}
		
		this.taker = taker;
		this.storer = storer;
	}
	
	public IScreenshotTaker getTaker() {
		return this.taker;
	}
	
	public IScreenshotStorer getLocator() {
		return this.storer;
	}

	/**
	 * 截图并保存
	 * @author xuwenhao
	 */
	public File takeScreenshot() {
		byte[] data = this.taker.getScreenshot();
		return this.storer.save(data);
	}
}
