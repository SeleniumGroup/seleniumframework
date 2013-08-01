package com.baidu.selenium.control.support;

import java.util.List;

import com.baidu.selenium.control.IControl;

/**
 * 表格的抽象接口，定义Table的通用方法
 * @author xuwenhao
 *
 */
public interface ITable extends IControl {
	/**
	 * 获取表格当前列数
	 * @author xuwenhao
	 * @return
	 */
	public int getColumnsCount();
	
	/**
	 * 获取表格主体当前行数
	 * @author xuwenhao
	 * @return
	 */
	public int getBodyRowsCount();
	
	/**
	 * body部分是否有数据行
	 * @author xuwenhao
	 * @return <b>true</b>: 有数据行, <b>false</b>: 没有数据行
	 */
	public boolean hasBodyRow();
	
	/**
	 * 获取单元格
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @param columnIndex 列号，从0开始
	 * @return
	 */
	public ITableCell getBodyCell(int rowIndex, int columnIndex);
	
	/**
	 * 获取表格数据行
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	public ITableRow getBodyRow(int rowIndex);
	
	/**
	 * 查找符合条件的数据行。
	 * @author xuwenhao
	 * @param locator 定位方法
	 * @return 符合条件的第一个数据行, 如果没有匹配项则返回null
	 */
	public ITableRow findBodyRow(ITableRowLocator locator);
	
	/**
	 * 查找符合条件的数据行。
	 * @author xuwenhao
	 * @param locator 定位方法
	 * @return 数据行列表
	 */
	public List<ITableRow> findBodyRows(ITableRowLocator locator);
	
	/**
	 * 获取表格数据列
	 * @author xuwenhao
	 * @param columnIndex 列号，从0开始
	 * @return
	 */
	public ITableColumn getBodyColumn(int columnIndex);
	
	/**
	 * 获取表头行，默认获取第一行，通常只有一行
	 * @author xuwenhao
	 * @return
	 */
	public ITableRow getHeaderRow();
	
	/**
	 * 获取表头行
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	public ITableRow getHeaderRow(int rowIndex);
	
	/**
	 * 获取表注行，默认获取第一行，通常只有一行
	 * @author xuwenhao
	 * @return
	 */
	public ITableRow getFooterRow();
	
	/**
	 * 获取表注行
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	public ITableRow getFooterRow(int rowIndex);

}
