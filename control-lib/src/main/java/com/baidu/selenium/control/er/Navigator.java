package com.baidu.selenium.control.er;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.html.HtmlList;

/**
 * 导航条对象
 * 
 * 初始化参数: 页面会话的driver对象，节点对象 类依赖条件: 1)最外层是一个DIV层
 * 2)DIV层内部包含多个Ul对象，第一个Ul对象是第一层功能列表 3)后面的Ul对象是第二层功能列表，每个时候只有一个可以显示
 * 
 * @author sakyo
 * @version 1.0.0
 */
public class Navigator extends ErControl {

	protected List<WebElement> ulList = new ArrayList<WebElement>();
	private HashMap<String, Integer> topMenuName = new HashMap<String, Integer>();

	protected Navigator() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Navigator(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	public Navigator(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	public Navigator(WebElement webElement) {
		super(webElement);
		init();
	}

	public Navigator init() {
		this.logger.debug("Initialize Navigator.\t Dom ID: " + domId);
		ulList = wrappedElement.findElements(By.xpath("./ul"));
		int i = 0;
		topMenuName.clear();
		for (String top : new HtmlList(ulList.get(0)).getTextList()) {
			i++;
			topMenuName.put(top, i);
		}
		return this;
	}

	/**
	 * 得到最顶层的功能列表
	 * 
	 * @return
	 */
	public List<String> getTopMenu() {
		return new HtmlList(ulList.get(0)).getTextList();
	}

	/**
	 * 根据输入的顶层菜单返回二级菜单列表
	 * 
	 * @param topMenu
	 * @return
	 */
	public List<String> getSecondMenu(String topMenu) {
		if (!topMenuName.containsKey(topMenu)) {
			NoSuchElementException error = new NoSuchElementException(
					"Cannot locate an element in Navigator-getSecondMenu by topMenu "
							+ topMenu);
			this.logger.error(error.getMessage(), error);
			throw error;
		}
		return new HtmlList(ulList.get(topMenuName.get(topMenu))).getTextList();
	}
}
