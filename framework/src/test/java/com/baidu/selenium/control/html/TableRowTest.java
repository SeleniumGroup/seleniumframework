package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableRow;
import com.baidu.selenium.test.TestBase;
import com.baidu.selenium.test.TestUrlUtils;

public class TableRowTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub

	}

	private static final String URL_PREFIX = "control.html/tabletest/";
	private static final String PAGE_STANDARD = "standard.html";
	private static final String TABLE_ID = "testTable";
	
	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}
	
	@DataProvider(name="testGetCell_BodyRow")
	public Object[][] data_testGetCell_BodyRow() {
		return new Object[][] {
			{ "firstRow", 0, new String[] {"cell0_0","cell0_1","cell0_2"} },
			{ "secondRow", 1, new String[] {"cell1_0","cell1_1","cell1_2"} },
			{ "lastRow", 9, new String[] {"cell9_0","cell9_1","cell9_2",} },
		};
	}

	@Test(dataProvider="testGetCell_BodyRow")
	public void testGetCell_BodyRow(String caseName, int rowIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getBodyRow(rowIndex);
		int cellCount = expectedCellIds.length;
		
		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = row.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}
	
	@Test
	public void testGetCell_HeaderRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		String[] expectedCellIds = new String[] {"headCell0","headCell1","headCell2"};
		ITableRow row = table.getHeaderRow();
		int cellCount = expectedCellIds.length;
		
		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = row.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}
	
	@Test
	public void testGetCell_FooterRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		String[] expectedCellIds = new String[] {"footCell0","footCell1"};
		ITableRow row = table.getFooterRow();
		int cellCount = expectedCellIds.length;
		
		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = row.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetColumnsCount_BodyRow")
	public Object[][] data_testGetColumnsCount_BodyRow() {
		return new Object[][] {
			{ "firstRow", 0, 3 },
			{ "secondRow", 1, 3 },
			{ "lastRow", 9, 3 },
		};
	}

	@Test(dataProvider="testGetColumnsCount_BodyRow")
	public void testGetColumnsCount_BodyRow(String caseName, int rowIndex, int expectedColumnsCount) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getBodyRow(rowIndex);
		int cellCount = row.getColumnsCount();
		Assert.assertEquals(cellCount, expectedColumnsCount);
	}
	
	@Test
	public void testGetColumnsCount_HeaderRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getHeaderRow();
		int cellCount = row.getColumnsCount();
		Assert.assertEquals(cellCount, 3);
	}
	
	@Test
	public void testGetColumnsCount_FooterRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getFooterRow();
		int cellCount = row.getColumnsCount();
		Assert.assertEquals(cellCount, 2);
	}

	@DataProvider(name="testGetRowIndex_BodyRow")
	public Object[][] data_testGetRowIndex_BodyRow() {
		return new Object[][] {
			{ "firstRow", 0 },
			{ "secondRow", 1 },
			{ "lastRow", 9 },
		};
	}

	@Test(dataProvider="testGetRowIndex_BodyRow")
	public void testGetRowIndex_BodyRow(String caseName, int rowIndex) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getBodyRow(rowIndex);
		Assert.assertEquals(row.getRowIndex(), rowIndex);
	}
	
	@Test
	public void testGetRowIndex_HeaderRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getHeaderRow();
		Assert.assertEquals(row.getRowIndex(), 0);
	}
	
	@Test
	public void testGetRowIndex_FooterRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getFooterRow();
		Assert.assertEquals(row.getRowIndex(), 0);
	}

}
