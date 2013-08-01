package com.baidu.selenium.control.html;

import java.util.List;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableColumn;
import com.baidu.selenium.test.TestBase;
import com.baidu.selenium.test.TestUrlUtils;

public class TableColumnTest extends TestBase {

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
	
	@DataProvider(name="testGetCell")
	public Object[][] data_testGetCell() {
		return new Object[][] {
			{ "firstColumn", 0, new String[] {"cell0_0","cell1_0","cell2_0","cell3_0","cell4_0","cell5_0","cell6_0","cell7_0","cell8_0","cell9_0"} },
			{ "secondColumn", 1, new String[] {"cell0_1","cell1_1","cell2_1","cell3_1","cell4_1","cell5_1","cell6_1","cell7_1","cell8_1","cell9_1"} },
			{ "lastColumn", 2, new String[] {"cell0_2","cell1_2","cell2_2","cell3_2","cell4_2","cell5_2","cell6_2","cell7_2","cell8_2","cell9_2"} },
		};
	}

	@Test(dataProvider="testGetCell")
	public void testGetCell(String caseName, int columnIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableColumn column = table.getBodyColumn(columnIndex);
		int cellCount = expectedCellIds.length;

		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = column.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetRowsCount")
	public Object[][] data_testGetRowsCount() {
		return new Object[][] {
			{ "firstColumn", 0, 10 },
			{ "secondColumn", 1, 10 },
			{ "lastColumn", 2, 10 },
		};
	}

	@Test(dataProvider="testGetRowsCount")
	public void testGetRowsCount(String caseName, int columnIndex, int expectedRowsCount) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getRowsCount(), expectedRowsCount);
	}
	
	@DataProvider(name="testGetAllCells")
	public Object[][] data_testGetAllCells() {
		return new Object[][] {
			{ "firstColumn", 0, new String[] {"cell0_0","cell1_0","cell2_0","cell3_0","cell4_0","cell5_0","cell6_0","cell7_0","cell8_0","cell9_0"} },
			{ "secondColumn", 1, new String[] {"cell0_1","cell1_1","cell2_1","cell3_1","cell4_1","cell5_1","cell6_1","cell7_1","cell8_1","cell9_1"} },
			{ "lastColumn", 2, new String[] {"cell0_2","cell1_2","cell2_2","cell3_2","cell4_2","cell5_2","cell6_2","cell7_2","cell8_2","cell9_2"} },
		};
	}

	@Test(dataProvider="testGetAllCells")
	public void testGetAllCells(String caseName, int columnIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableColumn column = table.getBodyColumn(columnIndex);
		List<ITableCell> cells = column.getAllCells();
		Assert.assertEquals(cells.size(), expectedCellIds.length);
		
		int cellCount = expectedCellIds.length;

		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = cells.get(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetColumnIndex")
	public Object[][] data_testGetColumnIndex() {
		return new Object[][] {
			{ "firstColumn", 0 },
			{ "secondColumn", 1 },
			{ "lastColumn", 2 },
		};
	}

	@Test(dataProvider="testGetColumnIndex")
	public void testGetColumnIndex(String caseName, int columnIndex) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getColumnIndex(), columnIndex);
	}

}
