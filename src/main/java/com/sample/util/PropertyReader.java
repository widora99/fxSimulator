package com.sample.util;

import java.util.ResourceBundle;

public class PropertyReader {

	private static ResourceBundle resource;
	
	/**
	 * 静的初期化子
	 * propertyファイルはクラスの初期ロード時に一度だけ読み込む
	 */
	static {
		resource = ResourceBundle.getBundle("system");
	}
	
	/**
	 * コンストラクタ
	 */
	private PropertyReader() {
		// インスタンス化しない
	}

	public static String getProperty(String key) {
        // 値の取得
        return resource.getString(key);
	}
		
}
