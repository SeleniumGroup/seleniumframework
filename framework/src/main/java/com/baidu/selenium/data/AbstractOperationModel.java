package com.baidu.selenium.data;

import java.util.HashMap;

/**
 * 用户操作数据的抽象封装
 * @author xuwenhao
 *
 */
public abstract class AbstractOperationModel implements IFreezable {
	private boolean isFroze = false;
	private HashMap<String, Object> innerMap = new HashMap<String, Object>();
	
	public boolean hasSetValue(String key) {
		return innerMap.containsKey(key);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getValue(String key) {
		return (T) innerMap.get(key);
	}
	
	public <T> void setValue(String key, T value) {
		if (this.isFroze()) {
			throw new ObjectFreezedException();
		}
		innerMap.put(key, value);
	}
	
	public void unsetValue(String key) {
		if (this.isFroze()) {
			throw new ObjectFreezedException();
		}
		innerMap.remove(key);
	}

	@Override
	public void freeze() {
		this.isFroze = true;
	}

	@Override
	public boolean isFroze() {
		return this.isFroze;
	}
}
