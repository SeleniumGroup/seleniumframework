package com.baidu.selenium.intercepte;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.MethodProxy;

/**
 * 动态注入的过滤器
 * @author xuwenhao
 *
 */
public interface IInterceptFilter {
	/**
	 * 执行过滤
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 * @return true: 通过, 继续注入; false: 不通过, 停止注入
	 */
	public boolean doFilter(Object obj, Method method, Object[] args, MethodProxy proxy);
}
