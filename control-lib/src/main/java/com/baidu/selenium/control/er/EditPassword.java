/**
 * 
 */
package com.baidu.selenium.control.er;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.html.TextBox;

/**
 * 修改密码对话框
 * 
 * @author sakyo
 *
 */
public class EditPassword extends ErControl {

	private TextBox oldpass;
	private TextBox newpass;
	private TextBox verifypassword;
	private Button submit;
	/**
	 * 
	 */
	protected EditPassword() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param driver
	 * @param by
	 */
	public EditPassword(WebDriver driver, By by) {
		super(driver, by);
		init();
	}

	/**
	 * @param driver
	 * @param id
	 */
	public EditPassword(WebDriver driver, String id) {
		super(driver, id);
		init();
	}

	/**
	 * @param webElement
	 */
	public EditPassword(WebElement webElement) {
		super(webElement);
		init();
	}

	/* (non-Javadoc)
	 * @see com.baidu.selenium.control.er.ErControl#init()
	 */
	@Override
	public ErControl init() {
		oldpass = new TextBox(driver, domId+"_password");
		newpass = new TextBox(driver, domId+"_newPassword");
		verifypassword = new TextBox(driver, domId+"_verifyPassword");
		submit = new Button(driver,domId+"_btnSubmit");
		return null;
	}
	
	/**
	 * 输入修改密码信息
	 */
	public void updatePassword(String oldpass, String newpass, String verify){
		this.oldpass.setText(oldpass);
		this.newpass.setText(newpass);
		this.verifypassword.setText(verify);	
	}
	
	/**
	 * 提交
	 */
	public void submit(){
		submit.click();
	}
}
