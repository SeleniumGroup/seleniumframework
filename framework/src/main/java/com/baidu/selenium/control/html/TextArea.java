package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.basic.HtmlAttributes;
import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

/**
 * textarea元素
 * @author xuwenhao
 *
 */
@LazyLoadControl
public class TextArea extends Control {

	protected TextArea() {
		// empty for LazyLoad
	}

	public TextArea(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public TextArea(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public TextArea(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 设置输入框中的文字，会删除原来的文字
	 * @author xuwenhao
	 * @param text
	 */
	public void setText(String text) {
		this.setText(new String[] { text } );
	}
	
	/**
     * 设置输入框中的文字，会删除原来的文字
     * @author xuwenhao
     * @param text
     */
	public void setText(String[] text) {
	    this.clear();
        if (null == text || 0 == text.length) {
            return;
        }
        
        this.sendKeys(text[0]);
        for (int i = 1; i < text.length; i++) {
            this.sendKeys(Keys.ENTER);
            this.sendKeys(text[i]);
        }
	}
	
	/**
	 * 在输入框中追加一行文字
	 * @author xuwenhao
	 * @param text
	 */
	public void appendText(String text) {
	    this.sendKeys(Keys.ENTER);
		this.sendKeys(text);
	}
	
	/**
	 * 在输入框中追加几行文字
	 * @author xuwenhao
	 * @param text
	 */
	public void appendText(String[] text) {
	    if (null == text || 0 == text.length) {
	        return;
	    }
	    for (int i = 0; i < text.length; i++) {
	        this.sendKeys(Keys.ENTER);
	        this.sendKeys(text[i]);
	    }
	}
	
	@Override
	public String getText() {
		return getAttribute(HtmlAttributes.VALUE);
	}

    /**
     * 
     * 返回一个字符串数组，内容为TextArea中的内容以换行分割后的结果
     * @author xiejing
     * @return
     */
    public String[] getStringArray() {
        return getText().split("\r\n|\n|\n\n");
    }

}
