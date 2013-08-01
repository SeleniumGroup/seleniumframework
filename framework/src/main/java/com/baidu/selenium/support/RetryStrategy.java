package com.baidu.selenium.support;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.openqa.selenium.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 封装了基本的重试机制
 * @author xuwenhao
 *
 */
public class RetryStrategy {
	public final static int DEFAULT_RETRY_TIMES = 10;
	public final static long DEFAULT_SLEEP_TIMEOUT = 500;
	protected Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 重试次数
	 */
	protected int retryTimes;
	/**
	 * 每次重试期间的等待间隔
	 */
	protected long sleepTimeout;
	/**
	 * 可忽略的Exception类型列表
	 */
	protected List<Class<? extends RuntimeException>> _ignoredExceptions = new ArrayList<Class<? extends RuntimeException>>();

	public RetryStrategy() {
		this(DEFAULT_RETRY_TIMES, DEFAULT_SLEEP_TIMEOUT);
	}

	public RetryStrategy(int retryTimes) {
		this(retryTimes, DEFAULT_SLEEP_TIMEOUT);
	}

	public RetryStrategy(int retryTimes, long sleepTimeout) {
		this.retryTimes = retryTimes;
		this.sleepTimeout = sleepTimeout;
		ignoring(NotFoundException.class);
	}

	/**
	 * 添加可忽略的Exception
	 * @author xuwenhao
	 * @param exceptionType
	 */
	public void ignoring(Class<? extends RuntimeException> exceptionType) {
		_ignoredExceptions.add(exceptionType);
	}

	/**
	 * 添加可忽略的Exception
	 * @author xuwenhao
	 * @param exceptionTypeList
	 */
	public void ignoring(Collection<Class<? extends RuntimeException>> exceptionTypeList) {
		_ignoredExceptions.addAll(exceptionTypeList);
	}

	/**
	 * 重试并检查操作结果.
	 * 当重试完仍没有达到预期结果,会抛出RetryException.
	 * @author xuwenhao
	 * @param executor
	 * @param checker
	 */
	public void retryAndUntil(IOperationExecutor executor, IOperationChecker checker) {
		RuntimeException lastException = null;
		for (int i = 0; i < retryTimes; i++) {
			logger.info(String.format("round %d", i));
			try {
				// 执行操作
				executor.execute();
				
				// 检查结果
				if (checker.check()) {
					// 达到目标,退出retry
					return;
				}
				sleep();
			} catch (RuntimeException e) {
				if (!isIgnored(e)) {
					throw e;
				}
				
				lastException = e;
				sleep();
			}
		}
		
		if (null == lastException) {
			throw new RetryException(retryTimes);
		}
		else {
			throw new RetryException(retryTimes, lastException);
		}
	}

	private boolean isIgnored(RuntimeException e) {
		boolean result = false;
		for (Class<? extends RuntimeException> ignoredException : _ignoredExceptions) {
			if (ignoredException.isInstance(e)) {
				result = true;
				break;
			}
		}
		
		return result;
	}

	private void sleep() {
		try {
			Thread.sleep(sleepTimeout);
		} catch (InterruptedException e) {
			// do nothing
		}
	}
}
