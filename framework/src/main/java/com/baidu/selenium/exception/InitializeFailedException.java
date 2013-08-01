package com.baidu.selenium.exception;

/**
 * 初始化异常
 * @author xuwenhao
 *
 */
public class InitializeFailedException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4556293459524317853L;
	
	public InitializeFailedException() {
		// TODO Auto-generated constructor stub
	}

	public InitializeFailedException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public InitializeFailedException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public InitializeFailedException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

}
