package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.CssSelector;
import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.html.TableCell;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableRow;

/**
 * ER框架中TableRow的封装。
 * @author xuwenhao
 *
 */
public class ErTableRow extends Control implements ITableRow {
	private String cellPrefix;
	private int rowIndex = 0;
	
	public ErTableRow(WebElement webElement, String cellPrefix) {
		this(webElement, cellPrefix, 0);
	}

	public ErTableRow(WebElement webElement, String cellPrefix, int rowIndex) {
		super(webElement);

		this.cellPrefix = cellPrefix;
		this.rowIndex = rowIndex;
	}

	@Override
	public ITableCell getCell(int columnIndex) {
		return new TableCell(this.findElement(By.id(cellPrefix + columnIndex)));
	}

	@Override
	public int getColumnsCount() {
		return findElements(By.cssSelector(CssSelector.byAttributeStartsWith(HtmlAttributes.ID, this.cellPrefix))).size();
	}

	@Override
	public int getRowIndex() {
		return this.rowIndex;
	}

}
