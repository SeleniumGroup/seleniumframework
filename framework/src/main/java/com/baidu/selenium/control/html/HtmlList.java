/**
 * 
 */
package com.baidu.selenium.control.html;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;

/**
 * html的列表 没有固定的tagName，所以没有继承HtmlBase的实现
 * 
 * @see http://www.w3school.com.cn/html/html_lists.asp
 * 
 * @author sakyo
 * 
 */
public class HtmlList extends Control {

	protected HtmlList() {
		// empty for LazyLoad
	}

	/**
	 * @param webElement
	 */
	public HtmlList(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param driver
	 * @param id
	 */
	public HtmlList(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param driver
	 * @param by
	 */
	public HtmlList(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	/**
	 * 获取下一级li的节点列表
	 * 
	 * @return 节点的List
	 */
	public List<WebElement> getList() {
		try {
			return wrappedElement.findElements(By.xpath("./li"));
		} catch (Exception e) {
			return new ArrayList<WebElement>();
		}
	}
	
	/**
	 * 获取下一级li的节点列表文字内容
	 * 如果li节点不为文字内容,返回的结果不可预料
	 * @return		节点内容的list
	 */
	public List<String> getTextList() {
		ArrayList<String> listText = new ArrayList<String>();
		for (WebElement li : getList()) {
			listText.add(li.getText());
		}
		return listText;
	}
	
	/**
	 * 根据显示的文本来选择
	 * 
	 * @param text
	 */
	public void clickLiByText(String text) {
		for (WebElement op : getList()) {
			if (op.getText().equals(text)) {
				op.click();
				return;
			}
		}
		throw new NoSuchElementException(
				"Cannot locate an element in HtmlList-clickLiByText ");
	}
	
	/**
	 * 根据序号获取HtmlListItem
	 * @param index start from 0
	 * @return 
	 */
	public HtmlListItem getItemByIndex(Integer index) {
		return new HtmlListItem(wrappedElement.findElement(By.xpath(String.format("./li[%s]", index + 1))));
	}
	
	/**
	 * 点击一列表项。
	 * @param index start from 0
	 */
	public void clickByIndex(Integer index) {
		this.getItemByIndex(index).click();
	}
}
