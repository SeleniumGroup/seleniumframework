package com.baidu.selenium.control.er;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlTags;
import com.baidu.selenium.control.html.Div;
import com.baidu.selenium.control.html.TableCell;
import com.baidu.selenium.control.support.ITable;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableColumn;
import com.baidu.selenium.control.support.ITableRow;
import com.baidu.selenium.control.support.ITableRowLocator;

/**
 * 根据表格的抽象接口，封装ER框架的table控件
 * @author xuwenhao
 *
 */
public class ErTable extends ErControl implements ITable {
	/**
	 * 表头单元格的后缀
	 */
	public static final String TITLE_POSTFIX = "titleCell";
	
	/**
	 * 数据行的后缀
	 */
	public static final String BODY_ROW_POSTFIX = "row";
	
	/**
	 * 数据单元格的后缀
	 */
	public static final String BODY_CELL_POSTFIX = "cell";
	
	/**
	 * 用来获取行数的JS
	 */
	protected static final String JS_ROW_COUNT
		= "var container = arguments[0];"
		+ "var idPrefix = arguments[1];"
		+ "var childNodes = container.childNodes;"
		+ "var resultNodes = new Array();"
		+ "for (var i = 0; i < childNodes.length; i++) {"
		+   "if (0 == childNodes[i].id.indexOf(idPrefix)) {"
		+     "resultNodes.push(0);"
		+   "}"
		+ "}"
		+ "return resultNodes.length;";
	
	/**
	 * 用来获取列数的JS
	 */
	protected static final String JS_COLUMN_COUNT = "return arguments[0].getElementsByTagName('th').length;";
	
	private String cellIdFormat;
	private String rowIdFormat;
	private Div headerLayer;
	private Div bodyLayer;
	
	/**
	 * do nothing, for lazyload & cglib
	 */
	protected ErTable() {
		// empty
	}

	public ErTable(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	public ErTable(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	public ErTable(WebElement webElement) {
		super(webElement);
		init();
	}

	@Override
	public ErControl init() {
		this.cellIdFormat = this.generateBodyCellIdFormat();
		this.rowIdFormat = this.generateBodyRowIdFormat();
		return this;
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
		return new TableCell(this.getBodyLayer().findElement(By.id(this.getBodyCellId(rowIndex, columnIndex))));
	}

	@Override
	public ITableColumn getBodyColumn(int columnIndex) {
		return new ErTableColumn(this.getBodyLayer(), this.domId, columnIndex);
	}

	@Override
	public ITableRow getBodyRow(int rowIndex) {
		return new ErTableRow(
						this.getBodyLayer().findElement(By.id(this.getBodyRowId(rowIndex)))
						, this.getBodyCellPrefix(rowIndex), rowIndex);
	}

	/**
	 * 获取表格主体当前行数。<br />
	 * 查找在body层中以$tableId + "row"为前缀的子节点数量。
	 * @author xuwenhao
	 * @return
	 */
	@Override
	public int getBodyRowsCount() {
		Object result = this.jsExecutor.executeScript(JS_ROW_COUNT, this.getBodyLayer(), this.getBodyRowPrefix());
		return (null != result) ? Integer.valueOf(result.toString()) : 0;
	}

	@Override
	public boolean hasBodyRow() {
		return 0 < this.getBodyRowsCount();
	}
	
	/**
	 * 获取表格当前列数。<br />
	 * 查找在header层中的&lt;th&gt;元素数量。<br />
	 * @author xuwenhao
	 * @return
	 */
	@Override
	public int getColumnsCount() {
		Object result = this.jsExecutor.executeScript(JS_COLUMN_COUNT, this.getHeaderLayer());
		return (null != result) ? Integer.valueOf(result.toString()) : 0;
	}

	@Override
	public ITableRow getFooterRow() {
		return null;
	}

	@Override
	public ITableRow getFooterRow(int rowIndex) {
		return null;
	}

	@Override
	public ITableRow getHeaderRow() {
		return new ErTableRow(this.getHeaderLayer(), this.getHeaderCellPrefix());
	}

	/**
	 * 获取表头行。<br />
	 * 暂时认为ER框架中的表格只有一行表头。
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	@Override
	public ITableRow getHeaderRow(int rowIndex) {
		return this.getHeaderRow();
	}
	
	/**
	 * 获取header层的dom id
	 * @author xuwenhao
	 * @return
	 */
	protected String getHeaderLayerId() {
		return this.domId + "head";
	}
	
	/**
	 * 获取header层
	 * @author xuwenhao
	 * @return
	 */
	protected Div getHeaderLayer() {
		if (null == this.headerLayer) {
			this.headerLayer = new Div(this.findElement(By.id(this.getHeaderLayerId())));
		}
		
		return this.headerLayer;
	}
	
	/**
	 * 获取body层的dom id
	 * @author xuwenhao
	 * @return
	 */
	protected String getBodyLayerId() {
		return this.domId + "body";
	}
	
	/**
	 * 获取body层
	 * @author xuwenhao
	 * @return
	 */
	protected Div getBodyLayer() {
		if (null == this.bodyLayer) {
			this.bodyLayer = new Div(this.findElement(By.id(this.getBodyLayerId())));
		}
		
		return this.bodyLayer;
	}

	/**
	 * 获取header部分单元格的id前缀
	 * @author xuwenhao
	 * @return
	 */
	protected String getHeaderCellPrefix() {
		return this.domId + TITLE_POSTFIX;
	}

	/**
	 * 获取body部分单元格的id前缀
	 * @author xuwenhao
	 * @return
	 */
	protected String getBodyCellPrefix() {
		return this.domId + BODY_CELL_POSTFIX;
	}

	/**
	 * 获取body部分数据行的id前缀
	 * @author xuwenhao
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	protected String getBodyRowPrefix() {
		return this.domId + BODY_ROW_POSTFIX;
	}
	
	/**
	 * 生成body部分单元格的id格式串。生成的格式串中包含2个占位符，需要替换成行号和列号。
	 * @author xuwenhao
	 * @return
	 */
	protected String generateBodyCellIdFormat() {
		return this.getBodyCellPrefix() + "%s_%s";
	}
	
	/**
	 * 生成数据行的id格式串。生成的格式串中包含1个占位符，需要替换成行号。
	 * @author xuwenhao
	 * @return
	 */
	protected String generateBodyRowIdFormat() {
		return this.getBodyRowPrefix() + "%s";
	}
	
	/**
	 * 获取body部分单元格的带行号的id前缀。
	 * @param rowIndex 行号，从0开始
	 * @return
	 */
	protected String getBodyCellPrefix(int rowIndex) {
		return String.format(this.cellIdFormat, rowIndex, "");
	}
	
	/**
	 * 获取body部分的单元格id。
	 * @author xuwenhao
	 * @return
	 */
	protected String getBodyCellId(int rowIndex, int columnIndex) {
		return String.format(this.cellIdFormat, rowIndex, columnIndex);
	}
	
	/**
	 * 获取body部分数据行的id。
	 * @author xuwenhao
	 * @return
	 */
	protected String getBodyRowId(int rowIndex) {
		return String.format(this.rowIdFormat, rowIndex);
	}

	/**
	 * 获取body部分没有数据行时显示的提示信息层。
	 * @author xuwenhao
	 * @return 当有数据行时，该方法返回null
	 */
	public Div getNoDataPanel() {
		if (this.hasBodyRow()) {
			return null;
		}
		
		return new Div(this.getBodyLayer().findElement(By.tagName(HtmlTags.DIV)));
	}
}
