package com.baidu.selenium.page.factory;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

import net.sf.cglib.proxy.Enhancer;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.FindBys;
import org.openqa.selenium.support.pagefactory.FieldDecorator;

import com.baidu.selenium.intercepte.MethodInterceptController;
import com.baidu.selenium.intercepte.MethodInterceptControllerList;
import com.baidu.selenium.page.Page;
import com.baidu.selenium.utils.ReflectionUtils;

/**
 * PageFactory工厂类
 * 
 * @author sakyo
 * 
 */
public class PageFactory {
	private static MethodInterceptControllerList interceptorList = new MethodInterceptControllerList();
	
	/**
	 * 添加方法拦截器,用于拦截被创建对象的方法
	 * @author xuwenhao
	 * @param interceptor
	 * @return
	 */
	public static boolean addInterceptor(MethodInterceptController interceptor) {
		return interceptorList.add(interceptor);
	}
	
	/**
	 * 移除方法拦截器
	 * @author xuwenhao
	 * @param interceptor
	 * @return
	 */
	public static boolean removeInterceptor(MethodInterceptController interceptor) {
		return interceptorList.remove(interceptor);
	}

	/**
	 * 创建Page对象，将会通过Enhancer对创建的对象进行动态注入
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass 要创建的Page对象类型
	 * @param driver WebDriver对象，会被加入到Page构造函数的参数数组中
	 * @return
	 */
	public static <T extends Page> T createPage(Class<T> pageClass, WebDriver driver) {
		T page = instantiatePage(pageClass, driver);
		proxyFields(pageClass, driver, page);
		return page;
	}
	
	/**
	 * 创建Page对象，将会通过Enhancer对创建的对象进行动态注入
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass 要创建的Page对象类型
	 * @param driver WebDriver对象，会被加入到Page构造函数的参数数组中
	 * @param args Page构造函数的参数数组
	 * @return
	 */
	public static <T extends Page> T createPage(Class<T> pageClass, WebDriver driver, Object... args) {
		T page = instantiatePage(pageClass, driver, args);
		proxyFields(pageClass, driver, page);
		return page;
	}
	
	/**
	 * 创建Page对象，将会通过Enhancer对创建的对象进行动态注入
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass 要创建的Page对象类型
	 * @param driver WebDriver对象，不会被加入到Page构造函数的参数数组中
	 * @param argumentTypes Page构造函数的参数类型数组
	 * @param arguments Page构造函数的参数数组
	 * @return
	 */
	public static <T extends Page> T createPage(Class<T> pageClass, WebDriver driver, Class<?>[] argumentTypes, Object[] arguments) {
		T page = instantiatePage(pageClass, argumentTypes, arguments);
		proxyFields(pageClass, driver, page);
		return page;
	}
	
	/**
	 * 实例化一个Page对象
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @param driver
	 * @return
	 */
	private static <T extends Page> T instantiatePage(Class<T> pageClass, WebDriver driver) {
		Class<?>[] argumentTypes = new Class<?>[] { driver.getClass() };
		Object[] arguments = new Object[] { driver };
		
		return instantiatePage(pageClass, argumentTypes, arguments);
	}

	/**
	 * 实例化一个Page对象
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @param driver
	 * @param args
	 * @return
	 */
	private static <T extends Page> T instantiatePage(Class<T> pageClass, WebDriver driver, Object... args) {
		Class<?>[] argTypes = getArgumentTypes(args);
		Class<?>[] argumentTypes = new Class<?>[args.length + 1];
		Object[] arguments = new Object[args.length + 1];
		argumentTypes[0] = driver.getClass();
		arguments[0] = driver;
		
		System.arraycopy(argTypes, 0, argumentTypes, 1, args.length);
		System.arraycopy(args, 0, arguments, 1, args.length);
		
		return instantiatePage(pageClass, argumentTypes, arguments);
	}

	/**
	 * 根据是否设置了callback，使用不同的方式实例化一个Page对象
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @param argumentTypes
	 * @param arguments
	 * @return
	 */
	private static <T extends Page> T instantiatePage(Class<T> pageClass, Class<?>[] argumentTypes, Object[] arguments) {
		Class<?>[] constructorParamTypes = null;
		try {
			constructorParamTypes = ReflectionUtils.getMatchedConstructor(pageClass, argumentTypes).getParameterTypes();
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		}
		
		if (hasCallback()) {
			return instantiatePageViaEnhancer(pageClass, constructorParamTypes, arguments);
		}
		else {
			return instantiatePageViaReflection(pageClass, constructorParamTypes, arguments);
		}
	}
	
	/**
	 * 通过Reflection实例化一个Page对象
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @param argumentTypes
	 * @param arguments
	 * @return
	 */
	private static <T extends Page> T instantiatePageViaReflection(Class<T> pageClass, Class<?>[] argumentTypes, Object[] arguments) {
		try {
			Constructor<T> constructor = pageClass.getConstructor(argumentTypes);
			return constructor.newInstance(arguments);
		} catch (SecurityException e) {
			throw new RuntimeException(e);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		} catch (IllegalArgumentException e) {
			throw new RuntimeException(e);
		} catch (InstantiationException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 通过Enhancer实例化一个Page对象
	 * @author xuwenhao
	 * @param <T>
	 * @param pageClass
	 * @param argumentTypes
	 * @param arguments
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private static <T extends Page> T instantiatePageViaEnhancer(Class<T> pageClass, Class<?>[] argumentTypes, Object[] arguments) {
		Enhancer enhancer = getPageEnhancer(pageClass);
		return (T) enhancer.create(argumentTypes, arguments);
	}
	
	/**
	 * 获取参数类型数组
	 * @author xuwenhao
	 * @param args
	 * @return
	 */
	private static Class<?>[] getArgumentTypes(Object[] args) {
		Class<?>[] result = new Class<?>[args.length];
		
		for (int i = 0; i < args.length; i++) {
			if (null == args[i]) {
				throw new IllegalArgumentException(String.format("The %sth argument is null.", i));
			}
			
			result[i] = args[i].getClass();
		}
		
		return result;
	}
	
	/**
	 * 是否设置了callback
	 * @author xuwenhao
	 * @return
	 */
	private static boolean hasCallback() {
		return 0 < interceptorList.size();
	}
	
	private static Enhancer getPageEnhancer(Class<?> superClass) {
		Enhancer enhancer = new Enhancer();
		enhancer.setSuperclass(superClass);
		enhancer.setCallback(interceptorList);
		
		return enhancer;
	}
	
	private static void proxyFields(Class<?> pageClass, WebDriver driver, Page page) {
		Class<?> proxyIn = pageClass;
		while (proxyIn != Object.class) {
			proxyFields(new LazyLoadFieldDecorator(driver), page, proxyIn);
			proxyIn = proxyIn.getSuperclass();
		}
	}

	/**
	 * 创建Page对象，该方法已被createPage替代，为兼容旧代码而保留
	 * @param <T>
	 * @param page
	 * @param driver
	 * @return
	 */
	@Deprecated
	public static <T extends Page> T initPage(Class<T> page,
			WebDriver driver) {
		return createPage(page, driver);
	}

	/**
	 * 创建Page对象，该方法已被createPage替代，为兼容旧代码而保留
	 * @param <T>
	 * @param page
	 * @param driver
	 * @param url
	 * @return
	 */
	@Deprecated
	public static <T extends Page> T initPage(Class<T> page,
			WebDriver driver, String url) {
		return createPage(page, driver, url);
	}

	public static void initElement(Page pageClassToProxy, WebDriver driver) {
		Class<?> proxyIn = pageClassToProxy.getClass();
		while (proxyIn != Object.class) {
			proxyFields(new LazyLoadFieldDecorator(driver), pageClassToProxy,
					proxyIn);
			proxyIn = proxyIn.getSuperclass();
		}
	}

	private static void proxyFields(FieldDecorator decorator, Object page,
			Class<?> proxyIn) {
		Field[] fields = proxyIn.getDeclaredFields();
		for (Field field : fields) {
			if (!assertValidAnnotations(field))
				continue;
			Object value = decorator.decorate(page.getClass().getClassLoader(),
					field);
			if (value != null) {
				try {
					field.setAccessible(true);
					field.set(page, value);
				} catch (IllegalAccessException e) {
					throw new RuntimeException(e);
				}
			}
		}
	}

	private static boolean assertValidAnnotations(Field field) {
		FindBys findBys = field.getAnnotation(FindBys.class);
		FindBy findBy = field.getAnnotation(FindBy.class);
		if (findBys == null && findBy == null) {
			return false;
		}
		return true;
	}
}
