package com.baidu.selenium.control.html;

import java.util.List;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableColumn;
import com.baidu.selenium.control.support.ITableRow;
import com.baidu.selenium.control.support.ITableRowLocator;
import com.baidu.selenium.test.TestBase;
import com.baidu.selenium.test.TestUrlUtils;

public class TableTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub

	}

	private static final String URL_PREFIX = "control.html/tabletest/";
	private static final String PAGE_STANDARD = "standard.html";
	private static final String PAGE_STANDARD_NODATA = "standard-nodata.html";
	private static final String TABLE_ID = "testTable";
	
	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}

	
	@Test
	public void testFindBodyRow_firstRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return true;
			}
			
		};
		
		ITableRow tableRow = table.findBodyRow(locator);
		Assert.assertEquals(tableRow.getAttribute(HtmlAttributes.ID), "row0");
	}
	
	@Test
	public void testFindBodyRow_secondRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		final String targetId = "row1";
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return row.getAttribute(HtmlAttributes.ID).equals(targetId);
			}
			
		};
		
		ITableRow tableRow = table.findBodyRow(locator);
		Assert.assertEquals(tableRow.getAttribute(HtmlAttributes.ID), targetId);
	}
	
	@Test
	public void testFindBodyRow_lastRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		final String targetId = "row9";
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return row.getAttribute(HtmlAttributes.ID).equals(targetId);
			}
			
		};
		
		ITableRow tableRow = table.findBodyRow(locator);
		Assert.assertEquals(tableRow.getAttribute(HtmlAttributes.ID), targetId);
	}
	
	@Test
	public void testFindBodyRow_NoMatched() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		final String targetId = "row999";
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return row.getAttribute(HtmlAttributes.ID).equals(targetId);
			}
			
		};
		
		ITableRow tableRow = table.findBodyRow(locator);
		Assert.assertNull(tableRow);
	}
	
	@Test
	public void testFindBodyRows_All() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return true;
			}
			
		};
		
		int count = 10;
		List<ITableRow> tableRowList = table.findBodyRows(locator);
		Assert.assertEquals(tableRowList.size(), count);
		for (int i = 0; i < count; i++) {
			ITableRow row = tableRowList.get(i);
			Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "row" + i);
		}
	}
	
	@Test
	public void testFindBodyRows_EvenRows() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableRowLocator locator = new ITableRowLocator() {
			private int count = 0;
			@Override
			public boolean isTarget(ITableRow row) {
				return count++ %2 == 0;
			}
			
		};
		
		int count = 5;
		List<ITableRow> tableRowList = table.findBodyRows(locator);
		Assert.assertEquals(tableRowList.size(), count);
		for (int i = 0; i < count; i++) {
			ITableRow row = tableRowList.get(i);
			Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "row" + (i * 2));
		}
	}
	
	@Test
	public void testFindBodyRows_NoMatched() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return false;
			}
			
		};
		
		List<ITableRow> tableRowList = table.findBodyRows(locator);
		Assert.assertNotNull(tableRowList);
		Assert.assertEquals(tableRowList.size(), 0);
	}
	
	@Test
	public void testGetBodyCell_FirstCell() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableCell cell = table.getBodyCell(0, 0);
		Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), "cell0_0");
	}
	
	@Test
	public void testGetBodyCell_LastCell() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		ITableCell cell = table.getBodyCell(9, 2);
		Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), "cell9_2");
	}

	@Test
	public void testGetBodyColumn() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));
		
		int columnIndex = 0;
		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getColumnIndex(), columnIndex);
	}

	@DataProvider(name="testGetBodyRow")
	public Object[][] data_testGetBodyRow() {
		return new Object[][] {
			{ 0, "row0"},
			{ 8, "row8"},
		};
	}
	
	@Test(dataProvider="testGetBodyRow")
	public void testGetBodyRow(int index, String rowId) {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getBodyRow(index);
		Assert.assertEquals(row.getRowIndex(), index);
		Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), rowId);
	}
	
	@Test
	public void testGetBodyRowsCount() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		int rowsCount = table.getBodyRowsCount();
		Assert.assertEquals(rowsCount, 10);
	}
	
	@Test
	public void testGetBodyRowsCount_NoData() {
		this.driver.get(this.getUrl(PAGE_STANDARD_NODATA));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		int rowsCount = table.getBodyRowsCount();
		Assert.assertEquals(rowsCount, 0);
	}
	
	@Test
	public void testHasBodyRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		boolean hasRow = table.hasBodyRow();
		Assert.assertTrue(hasRow);
	}
	
	@Test
	public void testHasBodyRow_NoData() {
		this.driver.get(this.getUrl(PAGE_STANDARD_NODATA));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		boolean hasRow = table.hasBodyRow();
		Assert.assertFalse(hasRow);
	}
	
	@Test
	public void testGetColumnsCount() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		int count = table.getColumnsCount();
		Assert.assertEquals(count, 3);
	}
	
	@Test
	public void testGetHeaderRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getHeaderRow();
		Assert.assertEquals(row.getRowIndex(), 0);
		Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "headRow");
	}
	
	@Test
	public void testGetFooterRow() {
		this.driver.get(this.getUrl(PAGE_STANDARD));
		Table table = new Table(driver.findElement(By.id(TABLE_ID)));

		ITableRow row = table.getFooterRow();
		Assert.assertEquals(row.getRowIndex(), 0);
		Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "footRow");
	}
}