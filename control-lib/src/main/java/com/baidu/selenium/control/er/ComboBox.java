package com.baidu.selenium.control.er;

import java.util.HashMap;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * 下拉框对象
 * 
 * 初始化参数:	页面会话的driver对象，下拉框的节点对象
 * 类依赖条件:	1)初始化的下拉框节点对象包含2个div的层，显示内容div和右侧的小三角
 * 				2)点击下拉框后出现的下拉层id是下拉框id+layer。
 * 				3)下拉层是由一列由div构成，每个div的id是下拉框的id+item+序列
 * 
 * @author	sakyo
 * @version	1.0.0
 */

public class ComboBox extends ErControl{

	private HashMap<String, Integer> NameList = new HashMap< String,Integer>();
	
	
	protected ComboBox() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ComboBox(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	public ComboBox(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	public ComboBox(WebElement webElement) {
		super(webElement);
		init();
	}

	/**
	 * 初始化下拉框
	 * 
	 * 寻找下拉层，并把下拉层的名称和行数存入hashmap
	 */
	public ComboBox init()
	{
		this.logger.debug("Initialize ComboBox.\t Dom ID: "+domId);
		WebElement laywe =  driver.findElement(By.id(domId+"layer"));
		int id =0;
		NameList.clear();
		for (WebElement we : laywe.findElements(By.tagName("div"))) {
			String name = we.getText();
			NameList.put(name, id);
			id++;
		}
		return this;
	}
	
	/**
	 * 通过属性获取或者设置下拉框的值
	 * 如果设置不存在的值，会抛出异常
	 */
	public String getSelectedName() {
		return wrappedElement.findElement(By.tagName("nobr")).getText();
	}
	public void setSelectedName(String selectedName) {
		int id = getIdByName(selectedName);
		setSelectedID(id);
	}
	public int getSelectedID() {
		Integer result = NameList.get(getSelectedName());
		if(result == null)
			throw new NoSuchElementException("Cannot locate an element in ComboBox-getSelectedID.");
		else
			return result.intValue();
	}
	public void setSelectedID(int selectedID) {
		wrappedElement.click();
		driver.findElement(By.id(domId+"item"+selectedID)).click();	
	}
	
	/**
	 * 通过名称得到所在行号，以0开始
	 * 
	 * @param name	显示的名字
	 * @return		所在的行数，如果不存在，返回-1
	 */
	public int getIdByName(String name)
	{
		Integer result = NameList.get(name);
		if(result == null)
			throw new NoSuchElementException("Cannot locate an element in ComboBox-getIdByName "+name);
		else
			return result.intValue();
	}
	
	/**
	 * 通过所在行号得到名称，以0开始
	 * 
	 * @param id	所在的行号
	 * @return		显示的名字，如果不存在，会抛出异常
	 */
	public String getNameById(int id)
	{
		return driver.findElement(By.id(domId+"item"+id)).getText();
	}
	
	/**
	 * 得到下拉框的大小
	 * 
	 * @return
	 */
	public int getCount()
	{
		return NameList.size();
	}
}
