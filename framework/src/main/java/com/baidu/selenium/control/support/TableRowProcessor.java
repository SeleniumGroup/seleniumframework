package com.baidu.selenium.control.support;

import java.util.Hashtable;

import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 表格行的处理类。<br />
 * 注意：暂时不支持可换顺序的列, 内部会根据列号将获取的单元格进行缓存。<br />
 * @author xuwenhao
 *
 */
public abstract class TableRowProcessor {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	protected ITableRow row;
	protected WebDriver driver;
	private Hashtable<Integer, TableCellProcessor> cache;

	public TableRowProcessor(ITableRow row) {
		if (null == row) {
			throw new IllegalArgumentException("Arg row can not be null.");
		}
		
		this.row = row;
		this.driver = row.getWrappedDriver();
		cache = new Hashtable<Integer, TableCellProcessor>();
	}

	/**
	 * 获取单元格的处理类
	 * 根据columnIndex查找匹配的单元格
	 * @author xuwenhao
	 * @param <T>
	 * @param columnIndex
	 * @param processorClass
	 * @return
	 */
	@SuppressWarnings("unchecked")
	protected <T extends TableCellProcessor> T getCell(int columnIndex, Class<T> processorClass) {
		if (!cache.containsKey(columnIndex)) {
			cache.put(columnIndex, TableCellProcessor.createInstance(row.getCell(columnIndex), processorClass));
		}
		
		return (T) cache.get(columnIndex);
	}
}
