package com.baidu.selenium.control.html;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlTags;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;
import com.baidu.selenium.control.support.ITable;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableColumn;
import com.baidu.selenium.control.support.ITableRow;
import com.baidu.selenium.control.support.ITableRowLocator;

@LazyLoadControl
public class Table extends Control implements ITable {
	/**
	 * 定位行的xpath
	 */
	public static final String ROW_XPATH = "./tr[%s]";
	/**
	 * 定位单元格的xpath
	 */
	public static final String CELL_XPATH = "./tr[%s]/*[%s]";
	
	private WebElement tbody;
	private WebElement thead;
	private WebElement tfoot;
	
	protected Table() {
		// do nothing, for lazyload & cglib
	}

	public Table(WebElement webElement) {
		super(webElement);
	}

	public Table(WebDriver driver, String id) {
		super(driver, id);
	}

	public Table(WebDriver driver, By by) {
		super(driver, by);
	}
	
	@Override
	public ITableRow findBodyRow(ITableRowLocator locator) {
		ITableRow result = null;
		
		for (int i = 0; ; i++) {
			ITableRow row = null;
			try {
				row = this.getBodyRow(i);
			}
			catch (NotFoundException ex) {
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(ex.getMessage(), ex);
				}
				// 代表超过行数了
				break;
			}
			
			if (locator.isTarget(row)) {
				result = row;
				break;
			}
		}
		
		return result;
	}

	@Override
	public List<ITableRow> findBodyRows(ITableRowLocator locator) {
		List<ITableRow> result = new ArrayList<ITableRow>();
		
		for (int i = 0; ; i++) {
			ITableRow row = null;
			try {
				row = this.getBodyRow(i);
			}
			catch (NotFoundException ex) {
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(ex.getMessage(), ex);
				}
				// 代表超过行数了
				break;
			}
			
			if (locator.isTarget(row)) {
				result.add(row);
			}
		}
		
		return result;
	}

	@Override
	public ITableCell getBodyCell(int rowIndex, int columnIndex) {
		// xpath中数组下标从1开始
		int row = rowIndex + 1;
		int column = columnIndex + 1;
		String xpath = String.format(CELL_XPATH, row, column);
		return new TableCell(this.getBodyContainer().findElement(By.xpath(xpath)));
	}
	
	@Override
	public ITableColumn getBodyColumn(int columnIndex) {
		return new TableColumn(this.getBodyContainer(), columnIndex);
	}

	@Override
	public ITableRow getBodyRow(int rowIndex) {
		// xpath中下标从1开始
		String xpath = String.format(ROW_XPATH, rowIndex + 1);
		return new TableRow(this.getBodyContainer().findElement(By.xpath(xpath)), rowIndex);
	}
	
	@Override
	public int getBodyRowsCount() {
		return this.getChildNodesCountByTagName(this.getBodyContainer(), HtmlTags.TR);
	}

	@Override
	public boolean hasBodyRow() {
		return 0 < this.getBodyRowsCount();
	}

	/**
	 * 获取表格当前列数.<br />
	 * 通常表格列数与表头列数一致，先获取表头，如果有表头，返回表头中的列数。<br />
	 * 如果没有表头，获取第一行数据行，返回它的列数。<br />
	 * @author xuwenhao
	 * @return
	 */
	@Override
	public int getColumnsCount() {
		int result = 0;
		ITableRow headerRow = this.getHeaderRow();
		if (null != headerRow) {
			// 通常表格列数与表头列数一致
			result = headerRow.getColumnsCount();
		}
		else if (this.hasBodyRow()) {
			// 获取第一行，以第一行的列数作为表格的列数
			ITableRow row = this.getBodyRow(0);
			result = row.getColumnsCount();
		}
		
		return result;
	}

	@Override
	public ITableRow getFooterRow() {
		return getFooterRow(0);
	}

	/**
	 * 获取表注行
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return 没有&lt;tfoot&gt;时返回<b>null</b>
	 */
	@Override
	public ITableRow getFooterRow(int rowIndex) {
		ITableRow result = null;
		
		if (this.hasTFoot()) {
			// xpath中下标从1开始
			String xpath = String.format(ROW_XPATH, rowIndex + 1);
			result = new TableRow(this.getTFoot().findElement(By.xpath(xpath)), rowIndex);
		}

		return result;
	}

	@Override
	public ITableRow getHeaderRow() {
		return getHeaderRow(0);
	}

	@Override
	public ITableRow getHeaderRow(int rowIndex) {
		ITableRow result = null;
		
		if (this.hasTHead()) {
			// xpath中下标从1开始
			String xpath = String.format(ROW_XPATH, rowIndex + 1);
			result = new TableRow(this.getTHead().findElement(By.xpath(xpath)), rowIndex);
		}

		return result;
	}

	/**
	 * 获取&lt;tbody&gt;元素
	 * @return
	 */
	private WebElement getTBody() {
		if (null == this.tbody) {
			try {
				this.tbody = this.findElement(By.xpath(HtmlTags.TBODY));
			}
			catch (NotFoundException ex) {
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(ex.getMessage(), ex);
				}
			}
		}
		
		return this.tbody;
	}
	
	/**
	 * 是否有&lt;tbody&gt;元素
	 * @return
	 */
	private boolean hasTBody() {
		return null != this.getTBody();
	}
	
	/**
	 * 获取&lt;thead&gt;元素
	 * @return
	 */
	private WebElement getTHead() {
		if (null == this.thead) {
			try {
				this.thead = this.findElement(By.xpath(HtmlTags.THEAD));
			}
			catch (NotFoundException ex) {
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(ex.getMessage(), ex);
				}
			}
		}
		
		return this.thead;
	}
	
	/**
	 * 是否有&lt;thead&gt;元素
	 * @return
	 */
	private boolean hasTHead() {
		return null != this.getTHead();
	}
	
	/**
	 * 获取&lt;tfoot&gt;元素
	 * @return
	 */
	private WebElement getTFoot() {
		if (null == this.tfoot) {
			try {
				this.tfoot = this.findElement(By.xpath(HtmlTags.TFOOT));
			}
			catch (NotFoundException ex) {
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(ex.getMessage(), ex);
				}
			}
		}
		
		return this.tfoot;
	}
	
	/**
	 * 是否有&lt;tfoot&gt;元素
	 * @return
	 */
	private boolean hasTFoot() {
		return null != this.getTFoot();
	}
	
	/**
	 * 获取包含表格主体的容器元素，如果没有&lt;tbody&gt;元素，就是&lt;table&gt;本身。
	 * @return
	 */
	private WebElement getBodyContainer() {
		return this.hasTBody() ? this.getTBody() : this;
	}

}
