package com.baidu.selenium.control.support;

import java.lang.reflect.Constructor;

import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 表格单元格的处理类
 * @author xuwenhao
 *
 */
public abstract class TableCellProcessor {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	protected ITableCell cell;
	protected WebDriver driver;
	
	/**
	 * 通过反射获得一个TableCellProcessor实例
	 * @author xuwenhao
	 * @param <T> TableCellProcessor类型
	 * @param cell
	 * @param processorClass
	 * @return
	 */
	public static <T extends TableCellProcessor> T createInstance(ITableCell cell, Class<T> processorClass) {
		try {
			Constructor<T> constructor = processorClass.getConstructor(new Class[]{ ITableCell.class});

			return constructor.newInstance(cell);
		} catch (Exception e) {
			throw new RuntimeException("Create TableCellProcessor failed.", e);
		}
	}

	public TableCellProcessor(ITableCell cell) {
		if (null == cell) {
			throw new IllegalArgumentException("Argument cell cannot be null.");
		}

		this.cell = cell;
		this.driver = cell.getWrappedDriver();
	}
}
