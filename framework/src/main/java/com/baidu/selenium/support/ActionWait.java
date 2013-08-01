package com.baidu.selenium.support;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.StaleElementReferenceException;

import org.openqa.selenium.support.ui.Clock;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Sleeper;
import org.openqa.selenium.support.ui.SystemClock;

import com.baidu.selenium.common.ConfigurationSettings;

/**
 * 扩展的Wait类, 当发生NotFoundException或StaleElementReferenceException时会继续做wait动作。
 * 示例：
		(new ActionWait<AdPositionCreatePage>(slotCreatePage))
		    .until(
		    	new Function<AdPositionCreatePage, Boolean>() {
			    	@Override
			    	public Boolean apply(AdPositionCreatePage d) {
			    		return d.isLoaded();
			    	}
			    }
		    )
 * 
 * @author xuwenhao
 * @see org.openqa.selenium.NotFoundException
 * @see org.openqa.selenium.StaleElementReferenceException
 */
public class ActionWait<T> extends FluentWait<T> {
	public final static long DEFAULT_SLEEP_TIMEOUT = ConfigurationSettings.ACTIONWAIT_SLEEP_DURATION;
	public final static long DEFAULT_PAGE_LOAD_TIMEOUT = ConfigurationSettings.ACTIONWAIT_TIMEOUT;

	/**
	 * @param input The instance to pass to the expected conditions called
	 */
	public ActionWait(T input) {
		this(input, new SystemClock(), Sleeper.SYSTEM_SLEEPER, DEFAULT_PAGE_LOAD_TIMEOUT, DEFAULT_SLEEP_TIMEOUT);
	}

	/**
	 * @param input The instance to pass to the expected conditions called
	 * @param timeOutInMillis The timeout in milliseconds when an expectation is called
	 */
	public ActionWait(T input, long timeOutInMillis) {
		this(input, new SystemClock(), Sleeper.SYSTEM_SLEEPER, timeOutInMillis, DEFAULT_SLEEP_TIMEOUT);
	}

	/**
	 * @param input The instance to pass to the expected conditions
	 * @param timeOutInMillis The timeout in milliseconds when an expectation is called
	 * @param sleepInMillis The duration in milliseconds to sleep between polls.
	 */
	public ActionWait(T input, long timeOutInMillis, long sleepInMillis) {
		this(input, new SystemClock(), Sleeper.SYSTEM_SLEEPER, timeOutInMillis, sleepInMillis);
	}
	
	protected ActionWait(T input, Clock clock, Sleeper sleeper) {
		super(input, clock, sleeper);
	}

	/**
	 * @param input The instance to pass to the expected conditions
	 * @param clock The clock to use when measuring the timeout
	 * @param sleeper Object used to make the current thread go to sleep.
	 * @param timeOutInMillis The timeout in milliseconds when an expectation is called.
	 * @param sleepTimeOut The timeout used whilst sleeping. Defaults to 250ms
	 */
	protected ActionWait(T input, Clock clock, Sleeper sleeper, long timeOutInMillis, long sleepTimeOut) {
		super(input, clock, sleeper);
		withTimeout(timeOutInMillis, TimeUnit.MILLISECONDS);
		pollingEvery(sleepTimeOut, TimeUnit.MILLISECONDS);
		ignoring(NotFoundException.class);
		ignoring(StaleElementReferenceException.class);
	}
}
