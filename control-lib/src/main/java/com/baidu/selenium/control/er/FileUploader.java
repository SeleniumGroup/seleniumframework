package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * 上传文件的控件
 * 
 * 模拟上传:由于不能直接操作文件上传，这里通过FE的接口来绕过去
 * 原理是当上传成功后，服务器会返回一段js指定上传的文件，这里我们直接模拟执行服务器返回的js
 * 
 * 真实上传:通过js来设置上传input可见，然后通过设置input的值来实现提交功能
 * 
 * 上传文件的控件是一个form，选择文件后，会立刻进行form提交的,这里初始化的对象是form的id
 * 
 * 初始化参数: 页面会话的driver对象，上传form上一层的div的id，因为返回的js是通过这个div执行的函数执行的 类依赖条件:
 * 1)form包括3个input和一个div，第一个input是一个文本框，存界面上显示的文件地址 2)返回的js是
 * parent.ui.util.get('frame_form_flash-url').processResponse({ "success" :
 * "true", "message" : {}, "result" : { "width":600, "height":80,
 * "local_file_name":"dx60080_110218.swf",
 * "preview_url":"/preview/20110516_1790003-1305515651672.swf", "control_id" :
 * "frame_form_flash-url"}});
 * 
 * @author sakyo
 * @version 1.0.0
 */
public class FileUploader extends ErControl {

	protected FileUploader() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public FileUploader(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public FileUploader init() {
		// TODO Auto-generated method stub
		return this;
	}

	// 模拟文件上传的js代码
	String FileUploadScript_Pre = "parent.ui.util.get('";
	String FileUploadScript_Mid = "').processResponse({'success' : 'true','message' : {},'result' : {'width':360,'height':100,'local_file_name':'test-for-upload.swf','preview_url':'/preview/";
	String FileUploadScript_Mid2 = "','control_id' : '";
	String FileUploadScript_End = "'}});";

	// 修改上传input的css属性的js代码
	String ChangeInputCss_PreString = "document.getElementById('";
	String ChangeInputCss_EndString = "').className='';";

	/**
	 * 上传真实文件
	 * 
	 * @param path
	 *            上传文件的地址
	 */
	public void upLoadRealFile(String path) {
		String FileUploadScript = ChangeInputCss_PreString + domId + "file" + ChangeInputCss_EndString;
		((JavascriptExecutor) driver).executeScript(FileUploadScript);
		driver.findElement(By.id(domId + "file")).sendKeys(path);
		waitForUploading();
	}

	/**
	 * 模拟文件上传
	 * 
	 * @param serverpath
	 *            已经上传到服务器的文件地址
	 * @deprecated
	 */
	public void upLoadFile(String serverpath) {
		String FileUploadScript = FileUploadScript_Pre + domId + FileUploadScript_Mid + serverpath + FileUploadScript_Mid2 + domId + FileUploadScript_End;
		((JavascriptExecutor) driver).executeScript(FileUploadScript);
	}

	/**
	 * 等待上传成功
	 */
	public void waitForUploading() {
		new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
			@Override
			public Boolean apply(WebDriver arg0) {
				boolean result = !driver.findElement(By.id(domId)).getAttribute("class").contains("ui-uploader-uploading");
				return result;
			}
		});
	}
}
