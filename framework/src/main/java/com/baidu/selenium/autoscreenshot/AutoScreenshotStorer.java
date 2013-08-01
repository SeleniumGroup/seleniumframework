package com.baidu.selenium.autoscreenshot;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;

import com.baidu.selenium.common.ConfigurationSettings;
import com.baidu.selenium.screenshot.IScreenshotStorer;

/**
 * 保存自动截图
 * @author xuwenhao
 *
 */
public class AutoScreenshotStorer implements IScreenshotStorer {
	private int step = 0;
	private File dir = null;
	private String fileName = "";

	@Override
	public File getDir() {
		return this.dir;
	}

	@Override
	public String getFileName() {
		return this.fileName;
	}

	@Override
	public File save(byte[] data) {
		OutputStream stream = null;
		File targetFile = new File(this.getDir(), this.getFileName());

		try {
			stream = new FileOutputStream(targetFile);
			stream.write(data);

			return targetFile;
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					// Nothing sane to do
				}
			}
		}
	}

	@Override
	public void remove() {
		File dir = this.getDir();
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			files[i].delete();
		}
		dir.delete();
	}

	/**
	 * 设置当前拦截的TestMethod，用于生成对应的文件目录
	 * @param obj
	 * @param method
	 * @param params
	 * @param invocationCount
	 */
	public void setTestTarget(Object obj, Method method, Object[] params, int invocationCount) {
		Class<?> targetClass = obj.getClass();
		String className = targetClass.getName();
		String methodName = method.getName();
		String dirPath = String.format("%s/%s/%s/%s", ConfigurationSettings.SCREENSHOT_AUTO_DIR, className, methodName, invocationCount);
		this.dir = new File(dirPath);
		this.dir.mkdirs();
		this.step = 0;
	}

	/**
	 * 设置当前拦截的对象和方法，用于生成对应的文件名
	 * @param obj
	 * @param method
	 */
	public void setInvokeTarget(Object obj, Method method) {
		Class<?> targetClass = obj.getClass();
		String className = targetClass.getName();
		// CGLIB动态生成的类会附加上$$EnhancerByCGLIB$$3d8e76b8之类的后缀，这里去除这些后缀
		if (-1 != className.indexOf("$$")) {
			className = className.substring(0, className.indexOf("$$"));
		}
		String methodName = method.getName();
		
		this.fileName = String.format("step%s_%s.%s.png", this.step++, className, methodName);
	}

}
