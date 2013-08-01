package com.baidu.selenium.control.er;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class TestControl extends ErControl {

	 
	public TestControl init() {
		log("初始化testcontrol");
		return this;
	}

	public TestControl(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

	public TestControl(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public TestControl(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	protected void log(String message) {
		Date d = new Date();
		long longtime = d.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss:SSS");
		System.out.println(sdf.format(longtime) + ": " + message);
	}
}
