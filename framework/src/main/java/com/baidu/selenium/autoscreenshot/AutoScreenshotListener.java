package com.baidu.selenium.autoscreenshot;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.MethodProxy;

import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.ISuite;
import org.testng.ISuiteListener;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.baidu.selenium.common.Constants;
import com.baidu.selenium.intercepte.IInterceptListener;
import com.baidu.selenium.intercepte.MethodInterceptController;
import com.baidu.selenium.page.factory.PageFactory;
import com.baidu.selenium.screenshot.ScreenshotController;
import com.baidu.selenium.screenshot.WebDriverScreenshotTaker;

/**
 * 自动截图的TestNG监听器 。
 * 使用该Listener时需要向ITestContext中设置全局变量CONTEXT_KEY_DRIVER为当前使用的WebDriver对象。
 * @author xuwenhao
 *
 */
public class AutoScreenshotListener implements IInterceptListener, ITestListener, ISuiteListener {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	
	private MethodInterceptController interceptController = null;
	private ITestContext testContext = null;
	private AutoScreenshotStorer storer = null;
	private ScreenshotController controller = null;

	@Override
	public void onStart(ISuite suite) {
		// 在Suite启动时设置PageFactory的callback，在整个Suite执行过程中都可以使用该callback
		this.interceptController = new MethodInterceptController();
		this.interceptController.addFilter(new AutoInterceptFilter());
		this.interceptController.addListener(this);

		PageFactory.addInterceptor(this.interceptController);
	}

	@Override
	public void onFinish(ISuite suite) {
		// Suite运行结束时清空对象
		PageFactory.removeInterceptor(this.interceptController);
		this.interceptController = null;
	}

	@Override
	public void onStart(ITestContext testContext) {
		// 在一个<test>开始执行时，缓存testContext, 实质上是一个TestRunner实例
		// 在后续测试执行时，全局变量都通过testContext进行传递
		this.testContext = testContext;
	}

	@Override
	public void onFinish(ITestContext testContext) {
		// <test>运行结束时清空对象
		this.testContext = null;
	}
	
	@Override
	public void onAfterInvoke(Object obj, Method method, Object[] args, MethodProxy proxy) {
		// MethodInterceptor在方法被调用后触发
		// 进行截图
		if (null == this.storer || null == this.controller) {
			return;
		}

		// 设置当前拦截的对象和方法，用于生成对应的文件名
		this.storer.setInvokeTarget(obj, method);
		
		logger.debug(String.format("take screenshot to dir: %s, file: "
						, this.storer.getDir().getAbsolutePath(), this.storer.getFileName()));
		this.controller.takeScreenshot();
	}

	@Override
	public void onBeforeInvoke(Object obj, Method method, Object[] args, MethodProxy proxy) {
		// do nothing
	}

	@Override
	public void onExceptionOccurs(Object obj, Method method, Object[] args, Exception ex) {
		// do nothing
	}
	
	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
		onTestFailure(result);
	}

	@Override
	public void onTestFailure(ITestResult result) {
		// Case fail的时候不保留过程截图
		this.storer.remove();
		onEndTest(result);
	}

	@Override
	public void onTestSkipped(ITestResult result) {
		onEndTest(result);
	}

	@SuppressWarnings("deprecation")
	@Override
	public void onTestStart(ITestResult result) {
		// 每个TestMethod，即@Test，的一条DataProvider数据被调用时触发该段逻辑
        if (null == this.testContext) {
        	this.logger.warn("TestContext is null.");
        	return;
        }
        
        Object driver = this.testContext.getAttribute(Constants.CONTEXT_KEY_DRIVER);
        if (null == driver) {
        	this.logger.warn(String.format("Can not get driver from TestContext. Attribute '%s' in TestContext is not set as a WebDriver."
        					, Constants.CONTEXT_KEY_DRIVER));
        	return;
        }
        else if (!(driver instanceof WebDriver)) {
        	this.logger.warn(String.format("Attribute '%s' in TestContext is not set as a WebDriver.", Constants.CONTEXT_KEY_DRIVER));
        	return;
        }
        else if (!(driver instanceof TakesScreenshot)) {
        	this.logger.warn("Driver does not implement interface TakesScreenshot.");
        	return;
        }
		
		Object testObj = result.getInstance();
		Method testMethod = result.getMethod().getMethod();
		Object[] params = result.getParameters();
		int invokeCount = result.getMethod().getCurrentInvocationCount();
		
		WebDriver webdriver = (WebDriver) driver;
		
		// 开始执行一个@Test时生成一个新的ScreenshotController, 在该@Test执行期间都使用这个对象进行截图
		this.storer = new AutoScreenshotStorer();
		this.storer.setTestTarget(testObj, testMethod, params, invokeCount);
		this.controller = new ScreenshotController(new WebDriverScreenshotTaker(webdriver), this.storer);
	}

	@Override
	public void onTestSuccess(ITestResult result) {
		onEndTest(result);
	}
	
	private void onEndTest(ITestResult result) {
		// @Test运行结束时清空截图对象
		this.controller = null;
		this.storer = null;
	}
}
