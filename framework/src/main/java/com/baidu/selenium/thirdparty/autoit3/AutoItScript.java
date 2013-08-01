package com.baidu.selenium.thirdparty.autoit3;

import java.io.File;
import java.io.IOException;

import com.baidu.selenium.common.ConfigurationSettings;

/**
 * 通过执行AutoIt脚本方式调用AutoIt功能。
 * 
 * @author xuwenhao
 *
 */
public class AutoItScript {
	private static String autoItExecutablePath;
	private static String autoItUploadScriptPath;
	
	static {
		checkExecutablePath();
		checkUploadScriptPath();
	}
	
	private static void checkExecutablePath() {
		String autoItPath = System.getProperty("user.dir") + File.separator + ConfigurationSettings.THIRDPARTY_AUTOIT3_EXE;
		File autoItExecutable = new File(autoItPath);
		if (!autoItExecutable.isFile()) {
			throw new RuntimeException(String.format("Check autoit executable failed, cannot find file: %s", autoItPath));
		}
		
		autoItExecutablePath = autoItPath;
	}
	
	private static void checkUploadScriptPath() {
		String path = System.getProperty("user.dir") + File.separator + ConfigurationSettings.THIRDPARTY_AUTOIT3_SCRIPT_UPLOADFILE;
		File temp = new File(path);
		if (!temp.isFile()) {
			throw new RuntimeException(String.format("Check upload script failed, cannot find file: %s", path));
		}
		
		autoItUploadScriptPath = path;
	}
	
	/**
	 * 启动AutoIt脚本，等待上传文件的对话框出现，并上传文件
	 * 
	 * @author xuwenhao
	 * @param filepath 需要上传的文件的完整绝对路径
	 */
	public void waitToUploadFile(String filepath) {
		try {
			String[] scriptcmd = new String[] { autoItExecutablePath, autoItUploadScriptPath, filepath };
			Runtime.getRuntime().exec(scriptcmd);
			// 等待AutoIt脚本开始执行
			Thread.sleep(500);
		} catch (IOException e1) {
			// nothing
		} catch (InterruptedException e) {
			// nothing
		}
	}
}
