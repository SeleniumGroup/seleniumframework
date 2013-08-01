package com.baidu.selenium.control.html;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.baidu.selenium.control.Control;
import com.baidu.selenium.control.LazyLoadControl;

@LazyLoadControl
public class Iframe extends Control {

	protected Iframe() {
		// lazy load
	}

	public Iframe(WebElement webElement) {
		super(webElement);
		// TODO Auto-generated constructor stub
	}

	public Iframe(WebDriver driver, String id) {
		super(driver, id);
		// TODO Auto-generated constructor stub
	}

	public Iframe(WebDriver driver, By by) {
		super(driver, by);
		// TODO Auto-generated constructor stub
	}

}
