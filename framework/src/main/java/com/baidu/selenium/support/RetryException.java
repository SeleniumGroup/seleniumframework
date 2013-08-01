package com.baidu.selenium.support;

/**
 * Retry动作失败时产生的exception
 * @author xuwenhao
 *
 */
public class RetryException extends RuntimeException {
	private static final long serialVersionUID = -2568481127046897514L;

	private int retryTimes = 0;
	
	public RetryException(int retryTimes) {
		this.retryTimes = retryTimes;
	}
	
	public RetryException(int retryTimes, Throwable cause) {
		super(cause);
		
		this.retryTimes = retryTimes;
	}
	
	@Override
	public String getMessage() {
		return String.format("Retry %d times but failed.", retryTimes);
	}
}
