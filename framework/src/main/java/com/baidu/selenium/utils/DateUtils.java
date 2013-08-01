package com.baidu.selenium.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * 时间日期相关工具类
 * @author xuwenhao
 *
 */
public class DateUtils {
	/**
	 * 标准日期格式yyyy-MM-dd
	 */
    public static final SimpleDateFormat STD_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd", Locale.SIMPLIFIED_CHINESE);
	
    /**
     * 当前时间
     * @return
     */
    public static Calendar getNow() {
        return Calendar.getInstance();
    }
    
    /**
     * 昨天当前时间
     * @return
     */
    public static Calendar getYesterday() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -1);
        return cal;
    }

    /**
     * 明天当前时间
     * @return
     */
    public static Calendar getTomorrow() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, +1);
        return cal;
    }
    
    /**
     * day天前的时间
     * @param day
     * @return
     */
    public static Calendar getDateBefore(int day) {
    	Calendar cal = Calendar.getInstance();
    	cal.add(Calendar.DAY_OF_MONTH, -day);
    	return cal;
    }
    
    /**
     * day天后的时间
     * @param day
     * @return
     */
    public static Calendar getDateAfter(int day) {
    	Calendar cal = Calendar.getInstance();
    	cal.add(Calendar.DAY_OF_MONTH, day);
    	return cal;
    }
    
    /**
     * 当前小时
     * @return
     */
    public static Integer getCurrentHour() {
        return getNow().get(Calendar.HOUR_OF_DAY);
    }
    
    /**
     * 上一小时
     * @return
     */
    public static Integer getPreviousHour() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR_OF_DAY, -1);
        return cal.get(Calendar.HOUR_OF_DAY);
    }
    
    /**
     * 下一小时
     * @return
     */
    public static Integer getNextHour() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR_OF_DAY, +1);
        return cal.get(Calendar.HOUR_OF_DAY);
    }
}
