package com.baidu.selenium.control.html;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlTags;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableRow;

/**
 * 表格行，适用于&lt;tr&gt;元素
 * @author xuwenhao
 *
 */
public class TableRow extends Control implements ITableRow {
	private static final String CELL_XPATH = "./*[%s]";
	private int rowIndex = 0;

	public TableRow(WebElement webElement) {
		super(webElement);
	}
	
	public TableRow(WebElement webElement, int rowIndex) {
		this(webElement);
		
		this.rowIndex = rowIndex;
	}

	/**
	 * 获取单元格
	 * @author xuwenhao
	 * @param columnIndex 列号，从0开始
	 * @return 以TableCell封装好的&lt;td&gt;或&lt;th&gt;元素
	 */
	@Override
	public ITableCell getCell(int columnIndex) {
		int index = columnIndex + 1;
		String xpath = String.format(CELL_XPATH, index);
		return new TableCell(this.findElement(By.xpath(xpath)));
	}

	/**
	 * 获取列数<br />
	 * 该实现通过findElements实现，会一次查找到所有节点，性能不佳，不建议多次调用。
	 * @author xuwenhao
	 * @return
	 */
	@Override
	public int getColumnsCount() {
		List<String> tags  = new ArrayList<String>();
		tags.add(HtmlTags.TD);
		tags.add(HtmlTags.TH);
		
		return this.getChildNodesCountByTagName(this, tags);
	}

	@Override
	public int getRowIndex() {
		return this.rowIndex;
	}

}
