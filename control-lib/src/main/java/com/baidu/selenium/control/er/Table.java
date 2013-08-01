package com.baidu.selenium.control.er;

import java.util.HashMap;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.er.ErControl;

/**
 * Table对象
 * 
 * 初始化参数:	页面会话的driver对象，Table节点对象
 * 类依赖条件:	1)初始化的Table节点对象包含2个div的层，head层和body层
 * 				2)head层是由table的id+titleCell+序号为id的th构成
 * 				3)body层是由table的id+Cell+行序号+_+列序号为id的td构成
 * 				3)下拉层是由一列由div构成，每个div的id是下拉框的id+item+序列
 * 
 * @author	sakyo
 * @version	1.0.0
 * @deprecated
 * @since 1.0.2
 * @see ErTable
 */
@Deprecated
public class Table extends ErControl{

	protected HashMap<Integer, WebElement> headList;
	protected HashMap<Integer, WebElement> bodyList;
	protected HashMap<String, Integer> firstList;
	
	
	protected Table() {
	}

	public Table(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	public Table(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	public Table(WebElement webElement) {
		super(webElement);
		init();
	}

	/**
	 * 初始Table
	 * 
	 * 寻找每一行，并把每层的节点和行数存入hashmap
	 */
	public Table init()
	{
		this.logger.debug("Initialize Table.\t Dom ID: "+domId);
		headList= new HashMap<Integer, WebElement>();
		bodyList= new HashMap<Integer, WebElement>();
		firstList= new HashMap<String, Integer>();
		WebElement headwe = wrappedElement.findElement(By.id(domId+"head"));
		WebElement bodywe = wrappedElement.findElement(By.id(domId+"body"));
		
		int id =0;
		for (WebElement we : headwe.findElements(By.tagName("th"))) {
			headList.put(id, we);
			id++;
		
		}
		for(int i=0;;i++)
		{
			try {
				bodyList.put(i, bodywe.findElement(By.id(domId+"row"+i)));
				firstList.put(bodywe.findElement(By.id(domId+"cell"+i+"_0")).getText(), i);
			} catch (Exception e) {
				break;
			}
		}
		return this;
	}

	/**
	 * 得到Table的行数
	 * 
	 * @return
	 */
	public int getRows()
	{
		return bodyList.size();
	}
	
	/**
	 * 得到table的列数
	 * 
	 * @return
	 */
	public int getRanges()
	{
		return headList.size();
	}
	
	/**
	 * 获取所在行和列的文本信息
	 * 如果所在节点不是文本而是DOM结构，返回结构不可预料
	 * 如果所在节点不存在，抛出NoSuchElementException异常
	 * 
	 * @param row	所在行
	 * @param range	所在列
	 * @return		所在的文本信息
	 */
	public String getTextByRowRange(int row, int range)
	{
		return getElementByRowRange(row, range).getText();
	}
	
	/**
	 * 获取所在行和列的节点
	 * 如果所在节点不存在，抛出NoSuchElementException异常
	 * 
	 * @param row	所在行
	 * @param range	所在列
	 * @return		所在的节点
	 */
	public WebElement getElementByRowRange(int row, int range)
	{
		WebElement we = bodyList.get(row);
		if(we ==null) throw new NoSuchElementException("Cannot locate an element in Table-getTextByRowRange "+row+" "+range);
		return we.findElement(By.id(domId+"cell"+row+"_"+range));
	}
	/**
	 * 获取所在列文本为value的行号
	 * 如果不存在，则返回-1
	 * 效率比较低，没有针对需求优化，会调用浏览器遍历列表
	 * 
	 * @param range	需要遍历的列
	 * @param value	需要匹配的文本
	 * @return		所在的列号，以0开始，如果不存在，返回-1
	 */
	public int getRowByRange(int range, String value)
	{
		for (int i = 0; i < bodyList.size(); i++) {
			try {
				if(getTextByRowRange(i, range).equals(value)) return i;
			} catch (Exception e) {
				return -1;
			}
		}
		return -1;
	}
	
	/**
	 * 对于比较常用的第一列内容查找进行优化
	 *  
	 * @param value 需要寻找的第一列的值
	 * @return		所在行号，如果没有返回-1
	 */
	public int getRowByFirstRangeValue(String value)
	{
		Integer result = firstList.get(value);
		if(result == null)
			return -1;
		else 
			return result;
	}	
}
