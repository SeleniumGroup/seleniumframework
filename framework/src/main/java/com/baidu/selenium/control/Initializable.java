/**
 * 
 */
package com.baidu.selenium.control;

/**
 * 带有刷新接口的控件，复杂的控件初始化时需要初始化的操作，同时给外界提供刷新接口
 * 
 * @author sakyo
 *
 */
public interface Initializable<T> {
	/**
	 * 刷新接口，初始化时和重新刷新时使用，返回控件本身
	 */
	public T init();
}
