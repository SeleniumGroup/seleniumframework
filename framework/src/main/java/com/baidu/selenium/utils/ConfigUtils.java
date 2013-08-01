package com.baidu.selenium.utils;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Properties;

public class ConfigUtils {

	private ConfigUtils(){}
	
	public static Properties getProperties(String filename) {
		InputStream in =null;
		try {
			Properties props = new Properties();
			in = ConfigUtils.class.getClassLoader()
					.getResourceAsStream(filename); 
			props.load(in);
			return props;
		} catch (Exception e) {
			//TODO
		} finally {
			if (in != null)
				try {
					in.close();
				} catch (IOException e) {
					// ingore it
				}
		}
		return null;
	}
	
	public static void autowireConfigObject(Object obj, String file) {
		Properties props = getProperties(file);
		if (null == props || obj == null) {
			return;
		}
		
		Field[] fields = obj.getClass().getDeclaredFields();
		for (Field field : fields) {
			if (!Modifier.isStatic(field.getModifiers())) {
				field.setAccessible(true);
				String name = field.getName();
				String value = props.getProperty(name);
				if (null == value) {
					continue;
				} else {
					Class<?> type = field.getType();
					String typeName = type.getName();
					try {
						if (typeName.equals("int")) {
							field.set(obj, Integer.valueOf(value));
						} else if (typeName.equals("long")) {
							field.set(obj, Long.valueOf(value));
						} else if (typeName.equals("boolean")) {
							field.set(obj, Boolean.valueOf(value));
						} else {
							field.set(obj, value);
						}
					} catch (Exception e) {
						//TODO
					}
				}
			}
		}
	}
	
	public static void autowireConfig(Class<?> clazz, String file) {
		Properties props = getProperties(file);
		if (null == props) {
			return;
		}
		Field[] fields = clazz.getDeclaredFields();
		for (Field field : fields) {
			if (Modifier.isStatic(field.getModifiers())) {
				field.setAccessible(true);
				String name = field.getName();
				String value = props.getProperty(name);
				if (null == value) {
					continue;
				} else {
					Class<?> type = field.getType();
					String typeName = type.getName();
					try {
						if (typeName.equals("int")) {
							field.set(clazz, Integer.valueOf(value));
						} else if (typeName.equals("long")) {
							field.set(clazz, Long.valueOf(value));
						} else if (typeName.equals("boolean")) {
							field.set(clazz, Boolean.valueOf(value));
						} else {
							field.set(clazz, value);
						}
					} catch (Exception e) {
						//TODO
					}
				}
			}
		}
	}
	
}
