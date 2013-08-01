package com.baidu.selenium.control.support;

import com.baidu.selenium.control.IControl;

/**
 * 表格行的抽象接口
 * @author xuwenhao
 *
 */
public interface ITableRow extends IControl {
	/**
	 * 获取单元格
	 * @author xuwenhao
	 * @param columnIndex 列号，从0开始
	 * @return
	 */
	public ITableCell getCell(int columnIndex);
	
	/**
	 * 获取列数
	 * @author xuwenhao
	 * @return
	 */
	public int getColumnsCount();
	
	/**
	 * 获取当前行号。
	 * @author xuwenhao
	 * @return 从0开始的行号
	 */
	public int getRowIndex();
}
