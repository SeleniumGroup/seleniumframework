package com.baidu.selenium.control;

import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.internal.Locatable;
import org.openqa.selenium.internal.WrapsDriver;
import org.openqa.selenium.internal.WrapsElement;

public interface IControl extends WrapsDriver, WrapsElement, WebElement, Locatable {
	/**
	 * 获取DomId, &lt;tag id="value"&gt;中的value
	 * @author xuwenhao
	 * @return
	 */
	public String getId();
	/**
	 * 是否有dom id
	 * @return <b>true</b>: 有dom id, <b>false</b>: 没有dom id
	 */
	public boolean hasId();
	/**
	 * 获取style, <tag style="value">中的value
	 * @author xuwenhao
	 * @return
	 */
	public String getStyle();
	/**
	 * 获取class, <tag class="value">中的value
	 * @author xuwenhao
	 * @return
	 */
	public String getClassName();
	/**
	 * 获取父结点
	 * @author xuwenhao
	 * @return
	 */
	public WebElement getParentNode();
	/**
	 * 通过js设置属性
	 * @author xuwenhao
	 * @param name
	 * @param value
	 */
	public void jsSetAttribute(String name, String value);
	/**
	 * 根据节点名称获取直接子节点的数量。<br />
	 * 不计算深度大于1的子孙节点数。
	 * @author xuwenhao
	 * @param childNodeTagName 子节点的名称
	 * @return 
	 */
	public int getChildNodesCountByTagName(String childNodeTagName);
	/**
	 * 根据节点名称获取直接子节点的数量。<br />
	 * 不计算深度大于1的子孙节点数。
	 * @author xuwenhao
	 * @param parentNode 父节点
	 * @param childNodeTagName 子节点的名称
	 * @return 
	 */
	public int getChildNodesCountByTagName(WebElement parentNode, String childNodeTagName);
	/**
	 * 根据节点名称获取直接子节点的数量。<br />
	 * 不计算深度大于1的子孙节点数。
	 * @author xuwenhao
	 * @param parentNode 父节点
	 * @param childNodeTagNames 子节点的名称列表
	 * @return 
	 */
	public int getChildNodesCountByTagName(WebElement parentNode, List<String> childNodeTagNames);
	/**
	 * 模拟鼠标移动过当前元素
	 * @author xuwenhao
	 */
	public void mouseOver();
}
