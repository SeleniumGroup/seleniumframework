package com.baidu.selenium.control.er;

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

public class ErTableColumnTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub

	}

	private static final String URL_PREFIX = "control.er/ertabletest/";
	private static final String PAGE_LANDMARK = "landmark/landmark.html";

	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}

	
	@DataProvider(name="testGetCell_LandMark")
	public Object[][] data_testGetCell_LandMark() {
		return new Object[][] {
			{ "firstColumn", 0, new String[] {"adList_listTablecell0_0","adList_listTablecell1_0","adList_listTablecell2_0","adList_listTablecell3_0","adList_listTablecell4_0","adList_listTablecell5_0","adList_listTablecell6_0","adList_listTablecell7_0","adList_listTablecell8_0"} },
			{ "secondColumn", 1, new String[] {"adList_listTablecell0_1","adList_listTablecell1_1","adList_listTablecell2_1","adList_listTablecell3_1","adList_listTablecell4_1","adList_listTablecell5_1","adList_listTablecell6_1","adList_listTablecell7_1","adList_listTablecell8_1"} },
			{ "lastColumn", 5, new String[] {"adList_listTablecell0_5","adList_listTablecell1_5","adList_listTablecell2_5","adList_listTablecell3_5","adList_listTablecell4_5","adList_listTablecell5_5","adList_listTablecell6_5","adList_listTablecell7_5","adList_listTablecell8_5"} },
		};
	}

	@Test(dataProvider="testGetCell_LandMark")
	public void testGetCell_LandMark(String caseName, int columnIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableColumn column = table.getBodyColumn(columnIndex);
		int cellCount = expectedCellIds.length;

		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = column.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetRowsCount_LandMark")
	public Object[][] data_testGetRowsCount_LandMark() {
		return new Object[][] {
			{ "firstColumn", 0, 9 },
			{ "secondColumn", 1, 9 },
			{ "lastColumn", 5, 9 },
		};
	}

	@Test(dataProvider="testGetRowsCount_LandMark")
	public void testGetRowsCount_LandMark(String caseName, int columnIndex, int expectedRowsCount) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getRowsCount(), expectedRowsCount);
	}
	
	@DataProvider(name="testGetAllCells_LandMark")
	public Object[][] data_testGetAllCells_LandMark() {
		return new Object[][] {
			{ "firstColumn", 0, new String[] {"adList_listTablecell0_0","adList_listTablecell1_0","adList_listTablecell2_0","adList_listTablecell3_0","adList_listTablecell4_0","adList_listTablecell5_0","adList_listTablecell6_0","adList_listTablecell7_0","adList_listTablecell8_0"} },
			{ "secondColumn", 1, new String[] {"adList_listTablecell0_1","adList_listTablecell1_1","adList_listTablecell2_1","adList_listTablecell3_1","adList_listTablecell4_1","adList_listTablecell5_1","adList_listTablecell6_1","adList_listTablecell7_1","adList_listTablecell8_1"} },
			{ "lastColumn", 5, new String[] {"adList_listTablecell0_5","adList_listTablecell1_5","adList_listTablecell2_5","adList_listTablecell3_5","adList_listTablecell4_5","adList_listTablecell5_5","adList_listTablecell6_5","adList_listTablecell7_5","adList_listTablecell8_5"} },
		};
	}

	@Test(dataProvider="testGetAllCells_LandMark")
	public void testGetAllCells_LandMark(String caseName, int columnIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableColumn column = table.getBodyColumn(columnIndex);
		List<ITableCell> cells = column.getAllCells();
		Assert.assertEquals(cells.size(), expectedCellIds.length);
		
		int cellCount = expectedCellIds.length;

		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = cells.get(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetColumnIndex_LandMark")
	public Object[][] data_testGetColumnIndex_LandMark() {
		return new Object[][] {
			{ "firstColumn", 0 },
			{ "secondColumn", 1 },
			{ "lastColumn", 5 },
		};
	}

	@Test(dataProvider="testGetColumnIndex_LandMark")
	public void testGetColumnIndex_LandMark(String caseName, int columnIndex) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableColumn column = table.getBodyColumn(columnIndex);
		Assert.assertEquals(column.getColumnIndex(), columnIndex);
	}

}
