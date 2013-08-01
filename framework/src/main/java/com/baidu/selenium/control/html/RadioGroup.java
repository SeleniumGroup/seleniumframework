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
 * 单选框
 * 
 * @author sakyo
 * 
 */
@LazyLoadControl
public class RadioGroup extends Control {

	/**
	 * 
	 */
	protected RadioGroup() {
		// empty for LazyLoad
	}

	/**
	 * @param webElement
	 */
	public RadioGroup(WebElement webElement) {
		super(webElement);
		init();
	}

	/**
	 * @param driver
	 * @param id
	 */
	public RadioGroup(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	/**
	 * @param driver
	 * @param by
	 */
	public RadioGroup(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	private List<String> nameList = new ArrayList<String>();
	private List<WebElement> elementList = new ArrayList<WebElement>();

	/**
	 * 复选框的初始化，控件刷新时请调用
	 * 
	 * @return
	 */
	public RadioGroup init() {
		nameList.clear();
		elementList.clear();
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
					.xpath(".//input[@type='radio']"));
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
	 * 得到所有的单选框列表选项
	 * 
	 * @return
	 */
	public List<String> getTextlist() {
		return nameList;
	}


	/**
	 * 根据显示的文字选择单选框
	 */
	public void selectByVisibleText(String text) {
		boolean result = false;
		for (int i = 0; i < nameList.size(); i++) {
			if (nameList.get(i).equals(text)) {
				selectByIndex(i);
				result = true;
				break;
			}
		}
		if (!result)
			throw new NoSuchElementException(
					"Cannot locate an element in RadioGroup-selectByVisibleText "
							+ text);
	}

	/**
	 * 根据索引选择单选框
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
	 * 得到选择文字
	 */
	public String getSelectedVisibleText() {
		for (int i = 0; i < elementList.size(); i++) {
			if (elementList.get(i).isSelected()) {
				return nameList.get(i);
			}
		}
		return null;
	}

	/**
	 * 得到被选择的单选框列表
	 */
	public WebElement getSelectedElements() {
		for (WebElement element : elementList) {
			if (element.isSelected())
				return element;
		}
		return null;
	}
}
