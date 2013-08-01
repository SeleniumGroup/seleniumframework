/**
 * 
 */
package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.html.Div;
import com.baidu.selenium.control.html.TextBox;

/**
 * 修改密码对话框
 * 
 * @author sakyo
 *
 */
public class EditEmail extends ErControl {

	private Div oldmail;
	private TextBox newmail;
	private TextBox verifymail;
	private Button submit;
	/**
	 * 
	 */
	protected EditEmail() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param driver
	 * @param by
	 */
	public EditEmail(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	/**
	 * @param driver
	 * @param id
	 */
	public EditEmail(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	/**
	 * @param webElement
	 */
	public EditEmail(WebElement webElement) {
		super(webElement);
		init();
	}

	/* (non-Javadoc)
	 * @see com.baidu.selenium.control.er.ErControl#init()
	 */
	@Override
	public ErControl init() {
		oldmail = new Div(driver, domId+"_currentEmail");
		newmail = new TextBox(driver, domId+"_newEmail");
		verifymail = new TextBox(driver, domId+"_verifyNewEmail");
		submit = new Button(driver,domId+"_btnSubmit");
		return null;
	}
	
	/**
	 * 获取老邮箱信息
	 * 
	 * @return
	 */
	public String getOldEmail(){
		return oldmail.getText();
	}
	/**
	 * 输入修改密码信息
	 */
	public void updateEmail(String newmail, String verify){
		this.newmail.setText(newmail);
		this.verifymail.setText(verify);	
	}
	
	/**
	 * 提交
	 */
	public void submit(){
		submit.click();
	}
}
