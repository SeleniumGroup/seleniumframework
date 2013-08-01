package com.baidu.selenium.autoscreenshot;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 标注为需要进行自动注入
 * @author xuwenhao
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface AutoIntercept {
	/**
	 * 注入等级，默认为Debug
	 * @return
	 */
	public abstract InterceptLevel injectionLevel() default InterceptLevel.P4;
}
