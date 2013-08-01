package com.baidu.selenium.control.er;

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

public class ErTableTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub
		
	}

	private static final String URL_PREFIX = "control.er/ertabletest/";
	private static final String PAGE_LANDMARK = "landmark/landmark.html";
	private static final String PAGE_LANDMARK_NODATA = "landmark/landmark-nodata.html";
	
	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}
	
	@Test
	public void testFindBodyRow_firstRow_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return true;
			}
			
		};
		
		ITableRow tableRow = table.findBodyRow(locator);
		Assert.assertEquals(tableRow.getAttribute(HtmlAttributes.ID), "adList_listTablerow0");
	}
	
	@Test
	public void testFindBodyRow_secondRow_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		final String targetId = "adList_listTablerow1";
		
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
	public void testFindBodyRow_lastRow_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		final String targetId = "adList_listTablerow8";
		
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
	public void testFindBodyRow_NoMatched_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		final String targetId = "adList_listTablerow999";
		
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
	public void testFindBodyRows_All_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return true;
			}
			
		};
		
		int count = 9;
		List<ITableRow> tableRowList = table.findBodyRows(locator);
		Assert.assertEquals(tableRowList.size(), count);
		for (int i = 0; i < count; i++) {
			ITableRow row = tableRowList.get(i);
			Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "adList_listTablerow" + i);
		}
	}
	
	@Test
	public void testFindBodyRows_EvenRows_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		ITableRowLocator locator = new ITableRowLocator() {
			@Override
			public boolean isTarget(ITableRow row) {
				return row.getRowIndex() %2 == 0;
			}
			
		};
		
		int count = 5;
		List<ITableRow> tableRowList = table.findBodyRows(locator);
		Assert.assertEquals(tableRowList.size(), count);
		for (int i = 0; i < count; i++) {
			ITableRow row = tableRowList.get(i);
			Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "adList_listTablerow" + (i * 2));
		}
	}
	
	@Test
	public void testFindBodyRows_NoMatched_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
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
	public void testGetBodyCell_FirstCell_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		ITableCell cell = table.getBodyCell(0, 0);
		Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), "adList_listTablecell0_0");
	}
	
	@Test
	public void testGetBodyCell_LastCell_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		ITableCell cell = table.getBodyCell(8, 5);
		Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), "adList_listTablecell8_5");
	}

	@Test
	public void testGetBodyColumn_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));
		
		int columnIndex = 0;
		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getColumnIndex(), columnIndex);
	}

	@DataProvider(name="testGetBodyRow_Landmark")
	public Object[][] data_testGetBodyRow_Landmark() {
		return new Object[][] {
			{ 0, "adList_listTablerow0"},
			{ 8, "adList_listTablerow8"},
		};
	}
	
	@Test(dataProvider="testGetBodyRow_Landmark")
	public void testGetBodyRow_Landmark(int index, String rowId) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableRow row = table.getBodyRow(index);
		Assert.assertEquals(row.getRowIndex(), index);
		Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), rowId);
	}
	
	@Test
	public void testGetBodyRowsCount_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		int rowsCount = table.getBodyRowsCount();
		Assert.assertEquals(rowsCount, 9);
	}
	
	@Test
	public void testGetBodyRowsCount_NoData_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK_NODATA));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		int rowsCount = table.getBodyRowsCount();
		Assert.assertEquals(rowsCount, 0);
	}
	
	@Test
	public void testHasBodyRow_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		boolean hasRow = table.hasBodyRow();
		Assert.assertTrue(hasRow);
	}
	
	@Test
	public void testHasBodyRow_NoData_Landmark() {
		this.driver.get(this.getUrl("landmark/landmark-nodata.html"));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		boolean hasRow = table.hasBodyRow();
		Assert.assertFalse(hasRow);
	}
	
	@Test
	public void testGetColumnsCount_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		int count = table.getColumnsCount();
		Assert.assertEquals(count, 6);
	}
	
	@Test
	public void testGetHeaderRow_Landmark() {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableRow row = table.getHeaderRow();
		Assert.assertEquals(row.getRowIndex(), 0);
		Assert.assertEquals(row.getAttribute(HtmlAttributes.ID), "adList_listTablehead");
	}
}
