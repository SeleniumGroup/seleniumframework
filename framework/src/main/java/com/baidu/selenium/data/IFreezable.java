package com.baidu.selenium.data;

/**
 * 一个object可被冻结的接口
 * @author xuwenhao
 *
 */
public interface IFreezable {
	/**
	 * 冻结对象
	 * @author xuwenhao
	 */
	public void freeze();
	
	/**
	 * 对象是否被冻结
	 * @author xuwenhao
	 * @return
	 */
	public boolean isFroze();
}
