package com.baidu.selenium.intercepte;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

/**
 * 框架中进行动态注入的入口类，提供统一的动态注入逻辑。
 * @author xuwenhao
 *
 */
public class MethodInterceptController implements MethodInterceptor {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	/**
	 * 监听器被执行的模式
	 * @author xuwenhao
	 *
	 */
	public enum InvokeMode {
		/**
		 * 以栈的形式执行，listenerA -> listenerB -> method -> listenerB -> listenerA
		 */
		Stack,
		/**
		 * 以队列的形式执行，listenerA -> listenerB -> method -> listenerA -> listenerB
		 */
		Queue,
	}

	private InvokeMode mode = InvokeMode.Queue;
	private List<IInterceptFilter> filterList = new ArrayList<IInterceptFilter>();
	private List<IInterceptListener> listenerList = new ArrayList<IInterceptListener>();
	private boolean isInList = false;
	
	@Override
	public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
		Object result = null;
		// 先进行过滤，如果false就不进行动态注入
		// Since 1.0.2, modified by xuwenhao
		// 判断是否被MethodInterceptControllerList管理，减少重复doFilter动作
		if (!this.isInList && !this.doFilter(obj, method, args, proxy)) {
			// 调用实际方法
			result = proxy.invokeSuper(obj, args);
		}
		else {
			IInterceptListener[] listeners = new IInterceptListener[this.listenerList.size()];
			listeners = this.listenerList.toArray(listeners);
			
			// 触发onBeforeInvoke
			this.fireOnBeforeEvent(obj, method, args, proxy);
			
			// 调用实际方法
			try {
				result = proxy.invokeSuper(obj, args);
			}
			catch (Exception ex) {
				this.fireOnExceptionOccurs(obj, method, args, ex);
				throw ex;
			}
			
			// 触发onAfterInvoke
			this.fireOnAfterEvent(obj, method, args, proxy);
		}

		return result;
	}
	
	/**
	 * 监听器被执行的模式
	 * @author xuwenhao
	 * @return
	 */
	public InvokeMode getInvokeMode() {
		return this.mode;
	}
	
	/**
	 * 设置监听器被执行的模式
	 * @author xuwenhao
	 * @param mode
	 */
	public void setInvokeMode(InvokeMode mode) {
		if (null == mode) {
			throw new IllegalArgumentException("InvokeMode could not be null.");
		}
		
		this.mode = mode;
	}
	
	/**
	 * 添加过滤器
	 * @author xuwenhao
	 * @param filter
	 */
	public void addFilter(IInterceptFilter filter) {
		if (null == filter) {
			throw new IllegalArgumentException("IInjectionFilter could not be null.");
		}
		
		this.filterList.add(filter);
	}
	
	/**
	 * 添加监听器
	 * @author xuwenhao
	 * @param listener
	 */
	public void addListener(IInterceptListener listener) {
		if (null == listener) {
			throw new IllegalArgumentException("IInjectionListener could not be null.");
		}
		
		this.listenerList.add(listener);
	}

	/**
	 * 执行过滤器
	 * @author xuwenhao
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 * @return
	 */
	public boolean doFilter(Object obj, Method method, Object[] args, MethodProxy proxy) {
		for (IInterceptFilter filter : this.filterList) {
			try {
				if (!filter.doFilter(obj, method, args, proxy)) {
					return false;
				}
			}
			catch (Exception ex) {
				this.logger.error("Error occurs when doFilter event is triggered.");
				this.logger.error(ex.getMessage(), ex);
			}
		}
		return true;
	}
	
	/**
	 * 触发onBeforeInvoke事件
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 */
	private void fireOnBeforeEvent(Object obj, Method method, Object[] args, MethodProxy proxy) {
		IInterceptListener[] listeners = new IInterceptListener[this.listenerList.size()];
		listeners = this.listenerList.toArray(listeners);
		
		for (int i = 0; i < listeners.length; i++) {
			try {
				listeners[i].onBeforeInvoke(obj, method, args, proxy);
			}
			catch (Exception ex) {
				this.logger.error("Error occurs when onBeforeInvoke event is triggered.");
				this.logger.error(ex.getMessage(), ex);
			}
		}
	}
	
	/**
	 * 触发onAfterInvoke事件
	 * @param obj
	 * @param method
	 * @param args
	 * @param proxy
	 */
	private void fireOnAfterEvent(Object obj, Method method, Object[] args, MethodProxy proxy) {
		IInterceptListener[] listeners = new IInterceptListener[this.listenerList.size()];
		listeners = this.listenerList.toArray(listeners);

		// 触发onAfterInvoke
		if (InvokeMode.Queue.equals(this.mode)) {
			// 按listener加入的顺序执行，FIFO
			for (int i = 0; i < listeners.length; i++) {
				try {
					listeners[i].onAfterInvoke(obj, method, args, proxy);
				}
				catch (Exception ex) {
					this.logger.error("Error occurs when onAfterInvoke event is triggered.");
					this.logger.error(ex.getMessage(), ex);
				}
			}
		}
		else {
			// 按listener加入的顺序倒序执行，LIFO
			for (int i = listeners.length; i > 0; i--) {
				try {
					listeners[i - 1].onAfterInvoke(obj, method, args, proxy);
				}
				catch (Exception ex) {
					this.logger.error("Error occurs when onAfterInvoke event is triggered.");
					this.logger.error(ex.getMessage(), ex);
				}
			}
		}
	}
	
	/**
	 * 触发onExceptionOccurs事件
	 * @param obj
	 * @param method
	 * @param args
	 * @param ex
	 */
	private void fireOnExceptionOccurs(Object obj, Method method, Object[] args, Exception ex) {
		IInterceptListener[] listeners = new IInterceptListener[this.listenerList.size()];
		listeners = this.listenerList.toArray(listeners);

		for (int i = 0; i < listeners.length; i++) {
			try {
				listeners[i].onExceptionOccurs(obj, method, args, ex);
			}
			catch (Exception innerEx) {
				this.logger.error("Error occurs when onBeforeInvoke event is triggered.");
				this.logger.error(innerEx.getMessage(), innerEx);
			}
		}
	}
	
	/**
	 * 设置是否被放置在MethodInterceptControllerList中
	 * 
	 * @param value
	 * @see MethodInterceptControllerList
	 */
	protected void setInList(boolean value) {
		this.isInList = value;
	}
}
