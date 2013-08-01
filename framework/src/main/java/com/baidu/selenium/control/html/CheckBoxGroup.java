/**
 * 
 */
package com.baidu.selenium.control.html;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * 复选框
 * 
 * @author sakyo
 * 
 */
@LazyLoadControl
public class CheckBoxGroup extends Control {

	private List<String> nameList;
	private List<WebElement> elementList;

	/**
	 * 
	 */
	protected CheckBoxGroup() {
		// empty for LazyLoad
	}

	/**
	 * @param webElement
	 */
	public CheckBoxGroup(WebElement webElement) {
		super(webElement);
		init();
	}

	/**
	 * @param driver
	 * @param id
	 */
	public CheckBoxGroup(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	/**
	 * @param driver
	 * @param by
	 */
	public CheckBoxGroup(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	/**
	 * 复选框的初始化，控件刷新时请调用
	 * 
	 * @return
	 */
	public CheckBoxGroup init() {
		elementList = new ArrayList<WebElement>();
		nameList = new ArrayList<String>();
		elementList = getList();
		for (WebElement element : elementList) {
			nameList.add(getVisibleTextByElement(element));
		}
		return this;
	}

	/**
	 * 返回所有的选项列表
	 * 
	 * @return
	 */
	public List<WebElement> getList() {
		try {
			return wrappedElement.findElements(By
					.xpath(".//input[@type='checkbox']"));
		} catch (Exception e) {
			return new ArrayList<WebElement>();
		}
	}

	/**
	 * 根据复选框获取复选框显示的文字 NOTICE：如果复选框不是标准的实现，请覆盖这个函数，使用你自定义的文字定位方式
	 * ER的复选框使用了标准的实现，效率有所降低
	 * 
	 * @return
	 */
	protected String getVisibleTextByElement(WebElement element) {
		String id = element.getAttribute("id");
		return wrappedElement.findElement(
				By.xpath(".//label[@for='" + id + "']")).getText();
	}

	/**
	 * 得到所有的复选框列表选项
	 * 
	 * @return
	 */
	public List<String> getTextlist() {
		return nameList;
	}

	/**
	 * 选择所有复选框
	 */
	public void selectAll() {
		for (WebElement option : getList()) {
			if (!option.isSelected()) {
				option.click();
			}
		}
	}

	/**
	 * 取消对所有复选框的选择
	 */
	public void deselectAll() {
		for (WebElement option : getList()) {
			if (option.isSelected()) {
				option.click();
			}
		}
	}

	/**
	 * 根据显示的文字选择复选框，不会消除其他复选框
	 */
	public void selectByVisibleText(String text) {
		boolean result = false;
		for (int i = 0; i < nameList.size(); i++) {
			if (nameList.get(i).equals(text)) {
				selectByIndex(i);
				result = true;
			}
		}
		if (!result)
			throw new NoSuchElementException(
					"Cannot locate an element in CheckBoxGroup-selectByVisibleText "
							+ text);
	}

	/**
	 * 根据索引选择复选框
	 */
	public void selectByIndex(int index) {
		if (index < 0 || index > elementList.size() - 1)
			throw new NoSuchElementException(
					"Cannot locate an element in CheckBoxGroup-selectByIndex "
							+ index);
		WebElement element = elementList.get(index);
		if (!element.isSelected()) {
			element.click();
		}
	}

	/**
	 * 根据显示的文字反选复选框
	 */
	public void deselectByVisibleText(String text) {
		boolean result = false;
		for (int i = 0; i < nameList.size(); i++) {
			if (nameList.get(i).equals(text)) {
				deselectByIndex(i);
				result = true;
			}
		}
		if (!result)
			throw new NoSuchElementException(
					"Cannot locate an element in CheckBoxGroup-deselectByVisibleText "
							+ text);
	}

	/**
	 * 根据索引反选复选框
	 */
	public void deselectByIndex(int index) {
		if (index < 0 || index > elementList.size() - 1)
			throw new NoSuchElementException(
					"Cannot locate an element in CheckBoxGroup-deselectByIndex "
							+ index);
		WebElement element = elementList.get(index);
		if (element.isSelected()) {
			element.click();
		}
	}

	/**
	 * 得到选择文字
	 */
	public List<String> getSelectedVisibleText() {
		List<String> result = new ArrayList<String>();
		for (int i = 0; i < elementList.size(); i++) {
			if (elementList.get(i).isSelected()) {
				result.add(nameList.get(i));
			}
		}
		return result;
	}

	/**
	 * 得到被选择的复选框列表
	 */
	public List<WebElement> getSelectedElements() {
		List<WebElement> result = new ArrayList<WebElement>();
		for (WebElement element : elementList) {
			if (element.isSelected())
				result.add(element);
		}
		return result;
	}
}
