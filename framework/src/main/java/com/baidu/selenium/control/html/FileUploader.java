package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.thirdparty.autoit3.AutoItScript;

/**
 * 文件上传框, input type="file"
 * @author xuwenhao
 *
 */
public class FileUploader extends Control {

	public FileUploader() {
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 上传文件
	 * @param filePath 需要上传的文件的完整绝对路径
	 */
	public void uploadFile(String filePath) {
		// 先启动AutoIt脚本，这是另启动了一个进程来执行的
		new AutoItScript().waitToUploadFile(filePath);
		// 打开上传文件的对话框
		// 在测试时发现IE9和FF中click不起作用，通过sendKeys可以打开对话框
		// 在chrome中需要通过click来打开对话框
		this.click();
		this.sendKeys("");
	}
}
