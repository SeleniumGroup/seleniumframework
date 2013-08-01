package com.baidu.selenium.page.factory;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.LazyLoader;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.pagefactory.Annotations;
import org.openqa.selenium.support.pagefactory.FieldDecorator;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

public class LazyLoadFieldDecorator implements FieldDecorator {
	protected WebDriver driver;

	public LazyLoadFieldDecorator(WebDriver driver) {
		this.driver = driver;
	}

	public LazyLoadFieldDecorator() {
		// TODO Auto-generated constructor stub
	}

	public Object decorate(ClassLoader loader, final Field field) {
		/* 如果直接是一个WebElement，直接在此初始化即可*/
		if(field.getType().equals(WebElement.class)){
			Annotations annotations = new Annotations(field);
			By by = annotations.buildBy();
			return driver.findElement(by);
		}
		if (!Control.class.isAssignableFrom(field.getType())) {
			return null;
		}
		Annotations annotations = new Annotations(field);
		final By by = annotations.buildBy();
		if (this.isLazyLoad(field)) {
			Enhancer enhancer = new Enhancer();
			enhancer.setSuperclass(field.getType());
			enhancer.setCallback(new LazyLoader() {

				public Object loadObject() throws Exception {
					WebElement element = driver.findElement(by);
					Object lazycontrol = instantiateControl(element,
							field.getType());
					return lazycontrol;
				}
			});
			return enhancer.create();
		} else {
			WebElement element = driver.findElement(by);
			return instantiateControl(element, field.getType());
		}
	}
	
	/**
	 * 判断field的类型或其父类，直到Object，是否有标注LazyLoadControl。
	 * 
	 * @param field
	 * @return
	 */
	private boolean isLazyLoad(Field field) {
		boolean result = false;
		Class<?> fieldClass = field.getType();
		
		while(!fieldClass.equals(Object.class)) {
			result = fieldClass.isAnnotationPresent(LazyLoadControl.class);
			
			if (result) {
				break;
			}
			else {
				fieldClass = fieldClass.getSuperclass();
			}
		}
		
		return result;
	}

	private Object instantiateControl(WebElement element, Class<?> contrl) {
		try {
			try {
				Constructor<?> constructor = contrl
						.getConstructor(WebElement.class);
				return constructor.newInstance(element);
			} catch (NoSuchMethodException e) {
				return contrl.newInstance();
			}
		} catch (InstantiationException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
	}
}
