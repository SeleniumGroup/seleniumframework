package com.baidu.selenium.screenshot;

import java.io.File;

/**
 * 存储截图的接口
 * @author xuwenhao
 *
 */
public interface IScreenshotStorer {
	/**
	 * 保存截图的路径
	 * @return
	 */
	public File getDir();
	
	/**
	 * 保存截图的文件名
	 * @return
	 */
	public String getFileName();
	
	/**
	 * 保存截图
	 * @param pic
	 * @return
	 */
	public File save(byte[] pic);
	
	/**
	 * 删除保存的截图
	 */
	public void remove();
}
