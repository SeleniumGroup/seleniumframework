package com.baidu.selenium.control;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 控件延迟加载
 * 
 * @author sakyo
 * @since 2012-04-07 modified by xuwenhao
 * 
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface LazyLoadControl {

	/**
	 * 标注了该声明的控件必须有一个无参构造器
	 */
	public final String _must_have_a_null_argument_constructor = "_must_have_a_null_argument_constructor";
}
