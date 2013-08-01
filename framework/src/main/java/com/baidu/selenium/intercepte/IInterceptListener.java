package com.baidu.selenium.intercepte;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.MethodProxy;

/**
 * 动态注入的Listener接口
 * @author xuwenhao
 *
 */
public interface IInterceptListener {
	/**
	 * 在方法被调用之前被触发
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 */
	public void onBeforeInvoke(Object obj, Method method, Object[] args, MethodProxy proxy);
	/**
	 * 在方法被调用之后被触发
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 */
	public void onAfterInvoke(Object obj, Method method, Object[] args, MethodProxy proxy);
	
	/**
	 * 方法调用出现exception时被触发
	 * @param obj
	 * @param method
	 * @param args
	 * @param ex
	 */
	public void onExceptionOccurs(Object obj, Method method, Object[] args, Exception ex);
}
