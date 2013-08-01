package com.baidu.selenium.test;

/**
 * Case的优先级定义
 * @author tonglingling
 *
 */
public class CasePriority {
	/**
	 * 级别最高，此优先级用例将在每次代码checkin后被触发.
	 * 此类测试用例要求：
	 * （1）运行时间较短。
	 * （2）测试代码稳定。
	 * （3）覆盖最重要的功能，尽量cover每一个重要模块。
	 * （4）用例数量尽量少。基本上每一个重要模块挑选一条用例作为checkin test即可，如果非重要模块也可以不设置checkin级别的用例。
	 */
	public static final String CheckIn = "CheckIn";
	
	/**
	 * Build Verification Test, 级别和CheckIn一致，区别为并不是在每次checkin后触发。
	 * 此类测试用例需要验证产品在功能上是否完整，如BVT通过，则可进行功能测试
	 * 。此类测试用例要求：
	 * （1）覆盖最基本功能，尽量cover每一个模块。
	 * （2）用例数量尽量少，时间不宜过长。
	 */
	public static final String BVT = "BVT";
	
	/**
	 * 级别较CheckIn和BVT低，产品release时，要求pass所有ES级别及以上的测试用例。
	 * 此类测试用例要求：
	 * （1）覆盖大部分基本功能。
	 * （2）对用户能够正常使用本产品的功能的测试都应该放到该级别中，即通过此级别测试的产品，应该没有Block用户对本产品进行基本的日常的操作的bug。
	 */
	public static final String ES = "ES";
	
	/**
	 * 级别最低，为广泛性功能测试.
	 * 对于需要复杂操作的测试用例，对产品进行较高级操作的测试用例，回归测试用例等，都可以放到这个级别中，该级别测试用例数量不限制。
	 */
	public static final String BF = "BF";
	
	/**
	 * 过期用例，将不被执行。
	 */
	public static final String DEPRECATED = "DEPRECATED";
	
	/**
	 * 当前正在调试的用例。
	 */
	public static final String CURRENT_DEBUG = "CURRENT_DEBUG";
}
