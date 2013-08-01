package com.baidu.selenium.control.er;

import java.util.ArrayList;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * 广告位的生活圈选择框对象
 * 
 * 初始化参数: 页面会话的driver对象，节点对象id 类依赖条件:
 * 1)顶层节点对象下共有3个div，一个是显示生活圈标签，一个是table，一个是显示确定和取消按钮
 * 2)table的id是顶层id+_list,这里没有在开始时候使用初始化过程，因为随时要刷新
 * 3)确定和取消按钮的id分别是+_btnSubmit和+_btnCancle
 * 
 * @author sakyo
 * @version 1.0.0
 */
public class CircleSelector extends ErControl {

	protected CircleSelector() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CircleSelector(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public CircleSelector(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public CircleSelector(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	 
	public CircleSelector init() {
		// TODO Auto-generated method stub
		return this;
	}
	
	/**
	 * 根据生活圈的名称选择生活圈 如果不存在则抛出异常
	 * 
	 * @param circlenames
	 *            生活圈的名称List
	 */
	public void setCircleByName(ArrayList<String> circlenames) {
		Table circles = new Table(driver, domId + "_list").init();
		// 清空以前的选择
		WebElement setAll = driver.findElement(By.id(domId + "_listselectAll"));
		if (!setAll.isSelected())
			setAll.click();
		setAll.click();
		// 根据名称选择生活圈
		for (int i = 0; i < circlenames.size(); i++) {
			boolean result = false;
			for (int m = 0; m < circles.getRows(); m++) {
				if (circles.getTextByRowRange(m, 1).equals(circlenames.get(i))) {
					result = true;
					circles.getElementByRowRange(m, 0)
							.findElement(By.tagName("input")).click();
					break;
				}
			}
			if (!result)
				throw new NoSuchElementException(
						"Cannot locate an element in CircleSelector-setCircleByName "
								+ circlenames.get(i));
		}
	}

	/**
	 * 根据生活圈的行号来选择生活圈 如果不存在则抛出异常
	 * 
	 * @param circlerows
	 *            生活圈的行号列表
	 */
	public void setCircleByRow(ArrayList<Integer> circlerows) {
		Table circles = new Table(driver, domId + "_list");
		// 清空以前的选择
		WebElement setAll = driver.findElement(By.id(domId + "_listselectAll"));
		if (!setAll.isSelected())
			setAll.click();
		setAll.click();
		// 根据行号选择生活圈
		for (int i = 0; i < circlerows.size(); i++) {
			circles.getElementByRowRange(circlerows.get(i), 0)
					.findElement(By.tagName("input")).click();
		}
	}

	/**
	 * 点击确定
	 * 
	 * @return
	 */
	public void submit() {
		driver.findElement(By.id(domId + "_btnSubmit")).click();
	}
}
