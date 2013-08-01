package com.baidu.selenium.intercepte;

import java.lang.reflect.Method;
import java.util.ArrayList;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

/**
 * MethodInterceptController列表
 * 
 * @author xuwenhao
 *
 */
public class MethodInterceptControllerList extends ArrayList<MethodInterceptController> implements MethodInterceptor {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7414159087216181390L;

	/**
	 * 重写了add，假如已经在列表中，则不会重复添加
	 * @author xuwenhao
	 * @param item
	 * @return
	 */
	@Override
	public boolean add(MethodInterceptController item) {
		if (null == item) {
			return false;
		}
		
		if (this.contains(item)) {
			return false;
		}
		
		boolean result = super.add(item);
		// 将MethodInterceptController对象标识为已经在MethodInterceptControllerList中管理
		item.setInList(true);
		
		return result;
	}

	/**
	 * 进行方法拦截
	 * 遍历内部的拦截器，如果有一组拦截器生效，则不再执行其他拦截器
	 * @author xuwenhao
	 */
	@Override
	public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
		for (MethodInterceptController controller : this) {
			if (controller.doFilter(obj, method, args, proxy)) {
				return controller.intercept(obj, method, args, proxy);
			}
		}
		
		return proxy.invokeSuper(obj, args);
	}
}
