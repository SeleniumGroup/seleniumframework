package com.baidu.selenium.utils;

import java.lang.reflect.Constructor;

/**
 * 反射相关的工具类
 * @author xuwenhao
 *
 */
public class ReflectionUtils {
	/**
	 * 根据参数类型，获取合适的Constructor，可用于查找参数类型不完全匹配，但参数类型符合类继承关系的情况。
	 * @author xuwenhao
	 * @param <T>
	 * @param targetClass
	 * @param parameters
	 * @return
	 * @throws NoSuchMethodException
	 */
	public static <T> Constructor<T> getMatchedConstructor(Class<T> targetClass, Object... parameters) throws NoSuchMethodException {
		if (null == targetClass) {
			throw new IllegalArgumentException("Paramter targetClass is null.");
		}
		
		for (int i = 0; i < parameters.length; i++) {
			if (null == parameters[i]) {
				throw new IllegalArgumentException("Null in parameters, index: " + i);
			}
		}
		
		Class<?>[] parameterTypes = new Class<?>[parameters.length];
		for (int i = 0; i < parameters.length; i++) {
			parameterTypes[i] = parameters[i].getClass();
		}
		
		return getMatchedConstructor(targetClass, parameterTypes);
	}
	
	/**
	 * 根据参数类型，获取合适的Constructor，可用于查找参数类型不完全匹配，但参数类型符合类继承关系的情况。
	 * @author xuwenhao
	 * @param <T>
	 * @param targetClass
	 * @param parameterTypes
	 * @return
	 * @throws NoSuchMethodException
	 */
	@SuppressWarnings("unchecked")
	public static <T> Constructor<T> getMatchedConstructor(Class<T> targetClass, Class<?>...parameterTypes) throws NoSuchMethodException {
		Constructor<T>[] constructors = (Constructor<T>[]) targetClass.getConstructors();
		Constructor<T> result = null;
		for(Constructor<T> constructor : constructors) {
			boolean matched = true;
			
			Class<?>[] consParamTypes = constructor.getParameterTypes();
			if (consParamTypes.length != parameterTypes.length) {
				// 参数长度不同，认为类型不匹配，继续下一个Constructor
				continue;
			}
			
			for (int i = 0; i < parameterTypes.length; i++) {
				if (!consParamTypes[i].isAssignableFrom(parameterTypes[i])) {
					// 参数类型不匹配，继续下一个Constructor
					matched = false;
					break;
				}
			}
			
			if (!matched) {
				continue;
			}
			
			result = constructor;
			break;
		}
		
		if (null == result) {
			throw new NoSuchMethodException(targetClass.getName() + ".<init>" + argumentTypesToString(parameterTypes));
		}
		
		return result;
	}
	
    private static String argumentTypesToString(Class<?>[] argTypes) {
        StringBuilder buf = new StringBuilder();
        buf.append("(");
        if (argTypes != null) {
            for (int i = 0; i < argTypes.length; i++) {
                if (i > 0) {
                    buf.append(", ");
                }
		Class<?> c = argTypes[i];
		buf.append((c == null) ? "null" : c.getName());
            }
        }
        buf.append(")");
        return buf.toString();
    }
}
