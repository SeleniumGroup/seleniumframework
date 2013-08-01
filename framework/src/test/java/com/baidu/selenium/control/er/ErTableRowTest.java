package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.support.ITableCell;
import com.baidu.selenium.control.support.ITableRow;
import com.baidu.selenium.test.TestBase;
import com.baidu.selenium.test.TestUrlUtils;

public class ErTableRowTest extends TestBase {

	@Override
	protected void initBeforeClass() {
		// TODO Auto-generated method stub

	}

	private static final String URL_PREFIX = "control.er/ertabletest/";
	private static final String PAGE_LANDMARK = "landmark/landmark.html";

	private String getUrl(String relativeUrl) {
		return TestUrlUtils.getUrl(URL_PREFIX + relativeUrl);
	}
	
	@DataProvider(name="testGetCell_BodyRow_LandMark")
	public Object[][] data_testGetCell_BodyRow_LandMark() {
		return new Object[][] {
			{ "firstRow", 0, new String[] {"adList_listTablecell0_0","adList_listTablecell0_1","adList_listTablecell0_2","adList_listTablecell0_3","adList_listTablecell0_4","adList_listTablecell0_5"} },
			{ "secondRow", 1, new String[] {"adList_listTablecell1_0","adList_listTablecell1_1","adList_listTablecell1_2","adList_listTablecell1_3","adList_listTablecell1_4","adList_listTablecell1_5"} },
			{ "lastRow", 8, new String[] {"adList_listTablecell8_0","adList_listTablecell8_1","adList_listTablecell8_2","adList_listTablecell8_3","adList_listTablecell8_4","adList_listTablecell8_5"} },
		};
	}

	@Test(dataProvider="testGetCell_BodyRow_LandMark")
	public void testGetCell_BodyRow_LandMark(String caseName, int rowIndex, String[] expectedCellIds) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableRow row = table.getBodyRow(rowIndex);
		int cellCount = expectedCellIds.length;
		
		for (int i = 0; i < cellCount; i++) {
			ITableCell cell = row.getCell(i);
			Assert.assertEquals(cell.getAttribute(HtmlAttributes.ID), expectedCellIds[i]);
		}
	}

	@DataProvider(name="testGetColumnsCount_BodyRow_LandMark")
	public Object[][] data_testGetColumnsCount_BodyRow_LandMark() {
		return new Object[][] {
			{ "firstRow", 0, 6 },
			{ "secondRow", 1, 6 },
			{ "lastRow", 8, 6 },
		};
	}

	@Test(dataProvider="testGetColumnsCount_BodyRow_LandMark")
	public void testGetColumnsCount_BodyRow_LandMark(String caseName, int rowIndex, int expectedColumnsCount) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableRow row = table.getBodyRow(rowIndex);
		int cellCount = row.getColumnsCount();
		Assert.assertEquals(cellCount, expectedColumnsCount);
	}

	@DataProvider(name="testGetRowIndex_BodyRow_LandMark")
	public Object[][] data_testGetRowIndex_BodyRow_LandMark() {
		return new Object[][] {
			{ "firstRow", 0 },
			{ "secondRow", 1 },
			{ "lastRow", 8 },
		};
	}

	@Test(dataProvider="testGetRowIndex_BodyRow_LandMark")
	public void testGetRowIndex_BodyRow_LandMark(String caseName, int rowIndex) {
		this.driver.get(this.getUrl(PAGE_LANDMARK));
		ErTable table = new ErTable(driver.findElement(By.id("adList_listTable")));

		ITableRow row = table.getBodyRow(rowIndex);
		Assert.assertEquals(row.getRowIndex(), rowIndex);
	}
}
