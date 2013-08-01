package com.baidu.selenium.thirdparty.autoit3;

import org.testng.annotations.Test;

public class AutoItXFactoryTest {
	
	@Test
	public void testLoadLib() {
		AutoItXFactory.getInstance();
	}
}
