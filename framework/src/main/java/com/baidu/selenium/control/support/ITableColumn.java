package com.baidu.selenium.control.support;

import java.util.List;

/**
 * 表格列的抽象接口
 * @author xuwenhao
 *
 */
public interface ITableColumn {
	/**
	 * 获取单元格
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	public ITableCell getCell(int rowIndex);
	
	/**
	 * 获取所有单元格
	 * @author xuwenhao
	 * @return
	 */
	public List<ITableCell> getAllCells();
	
	/**
	 * 获取行数
	 * @author xuwenhao
	 * @return
	 */
	public int getRowsCount();
	
	/**
	 * 获取当前列号。
	 * @author xuwenhao
	 * @return 从0开始的列号
	 */
	public int getColumnIndex();
}
