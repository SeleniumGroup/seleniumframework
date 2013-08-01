package com.baidu.selenium.thirdparty.autoit3;

import com.sun.jna.WString;

/**
 * Autoit interfaces by java.
 * 
 * @author liangxiaowu
 * 
 */
public interface AutoItX extends com.sun.jna.Library {
	//public static String autoItPath = AutoItX.class.getClassLoader().getResource(ConfigurationSettings.THIRDPARTY_AUTOIT3_DLL).getPath();
	//AutoItX INSTANCE = (AutoItX) Native.loadLibrary(autoItPath, AutoItX.class);

	public static int AU3_INTDEFAULT = -2147483647;
	
	public void AU3_Init();

	public int AU3_error();

	public int AU3_AutoItSetOption(WString szOption, int nValue);

	public void AU3_BlockInput(int nFlag); // 1 = disable user input, 0 enable
											// user input (to have auto it run
											// without interference)

	public void AU3_CDTray(WString szDrive, WString szAction); // drive: ,"open"
																// or "closed"

	public void AU3_ClipGet(byte[] szClip, int nBufSize);

	public void AU3_ClipPut(WString szClip);

	public int AU3_ControlClick(WString szTitle, WString szText, WString szControl, WString szButton, int nNumClicks, int nX, int nY);

	public void AU3_ControlCommand(WString szTitle, WString szText, WString szControl, WString szCommand, WString szExtra, byte[] szResult, int nBufSize);

	public void AU3_ControlListView(WString szTitle, WString szText, WString szControl, WString szCommand, WString szExtra1, WString szExtra2, byte[] szResult, int nBufSize);

	public int AU3_ControlDisable(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlEnable(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlFocus(WString szTitle, WString szText, WString szControl);

	public void AU3_ControlGetFocus(WString szTitle, WString szText, byte[] szControlWithFocus, int nBufSize);

	public void AU3_ControlGetHandle(WString szTitle, WString szText, WString szControl, byte[] szRetText, int nBufSize);

	public int AU3_ControlGetPosX(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlGetPosY(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlGetPosHeight(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlGetPosWidth(WString szTitle, WString szText, WString szControl);

	public void AU3_ControlGetText(WString szTitle, WString szText, WString szControl, byte[] szControlText, int nBufSize);

	public int AU3_ControlHide(WString szTitle, WString szText, WString szControl);

	public int AU3_ControlMove(WString szTitle, WString szText, WString szControl, int nX, int nY, int nWidth, int nHeight);

	public int AU3_ControlSend(WString szTitle, WString szText, WString szControl, WString szSendText, int nMode);

	public int AU3_ControlSetText(WString szTitle, WString szText, WString szControl, WString szControlText);

	public int AU3_ControlShow(WString szTitle, WString szText, WString szControl);

	public void AU3_DriveMapAdd(WString szDevice, WString szShare, int nFlags, WString szUser, WString szPwd, byte[] szResult, int nBufSize);

	public int AU3_DriveMapDel(WString szDevice);

	public void AU3_DriveMapGet(WString szDevice, byte[] szMapping, int nBufSize);

	public int AU3_IniDelete(WString szFilename, WString szSection, WString szKey);

	public void AU3_IniRead(WString szFilename, WString szSection, WString szKey, WString szDefault, byte[] szValue, int nBufSize);

	public int AU3_IniWrite(WString szFilename, WString szSection, WString szKey, WString szValue);

	public int AU3_IsAdmin();

	public int AU3_MouseClick(WString szButton, int nX, int nY, int nClicks, int nSpeed);

	public int AU3_MouseClickDrag(WString szButton, int nX1, int nY1, int nX2, int nY2, int nSpeed);

	public void AU3_MouseDown(WString szButton);

	public int AU3_MouseGetCursor();

	public int AU3_MouseGetPosX();

	public int AU3_MouseGetPosY();

	public int AU3_MouseMove(int nX, int nY, int nSpeed);

	public void AU3_MouseUp(WString szButton);

	public void AU3_MouseWheel(WString szDirection, int nClicks);

	public int AU3_Opt(WString szOption, int nValue);

	public int AU3_PixelChecksum(int nLeft, int nTop, int nRight, int nBottom, int nStep);

	public int AU3_PixelGetColor(int nX, int nY);

	public void AU3_PixelSearch(int nLeft, int nTop, int nRight, int nBottom, int nCol, int nVar, int nStep, LPPOINT pPointResult);

	public int AU3_ProcessClose(WString szProcess);

	public int AU3_ProcessExists(WString szProcess);

	public int AU3_ProcessSetPriority(WString szProcess, int nPriority);

	public int AU3_ProcessWait(WString szProcess, int nTimeout);

	public int AU3_ProcessWaitClose(WString szProcess, int nTimeout);

	public int AU3_RegDeleteKey(WString szKeyname);

	public int AU3_RegDeleteVal(WString szKeyname, WString szValuename);

	public void AU3_RegEnumKey(WString szKeyname, int nInstance, byte[] szResult, int nBufSize);

	public void AU3_RegEnumVal(WString szKeyname, int nInstance, byte[] szResult, int nBufSize);

	public void AU3_RegRead(WString szKeyname, WString szValuename, byte[] szRetText, int nBufSize);

	public int AU3_RegWrite(WString szKeyname, WString szValuename, WString szType, WString szValue);

	public int AU3_Run(WString szRun, WString szDir, int nShowFlags);

	public int AU3_RunAsSet(WString szUser, WString szDomain, WString szPassword, int nOptions);

	public int AU3_RunWait(WString szRun, WString szDir, int nShowFlags);

	public void AU3_Send(WString szSendText, int nMode);

	public int AU3_Shutdown(int nFlags);

	public void AU3_Sleep(int nMilliseconds);

	public void AU3_StatusbarGetText(WString szTitle, WString szText, int nPart, byte[] szStatusText, int nBufSize);

	public void AU3_ToolTip(WString szTip, int nX, int nY);

	public int AU3_WinActive(WString szTitle, WString szText);

	public void AU3_WinActivate(WString szTitle, WString szText);

	public int AU3_WinClose(WString szTitle, WString szText);
	
	public int AU3_WinExists(WString szTitle, WString szText);

	public int AU3_WinGetCaretPosX();

	public int AU3_WinGetCaretPosY();

	public void AU3_WinGetClassList(WString szTitle, WString szText, byte[] szRetText, int nBufSize);

	public int AU3_WinGetClientSizeHeight(WString szTitle, WString szText);

	public int AU3_WinGetClientSizeWidth(WString szTitle, WString szText);

	public void AU3_WinGetHandle(WString szTitle, WString szText, byte[] szRetText, int nBufSize);

	public int AU3_WinGetPosX(WString szTitle, WString szText);

	public int AU3_WinGetPosY(WString szTitle, WString szText);

	public int AU3_WinGetPosHeight(WString szTitle, WString szText);

	public int AU3_WinGetPosWidth(WString szTitle, WString szText);

	public void AU3_WinGetProcess(WString szTitle, WString szText, byte[] szRetText, int nBufSize);

	public int AU3_WinGetState(WString szTitle, WString szText);

	public void AU3_WinGetText(WString szTitle, WString szText, byte[] szRetText, int nBufSize);

	public void AU3_WinGetTitle(WString szTitle, WString szText, byte[] szRetText, int nBufSize);

	public int AU3_WinKill(WString szTitle, WString szText);

	public int AU3_WinMenuSelectItem(WString szTitle, WString szText, WString szItem1, WString szItem2, WString szItem3, WString szItem4, WString szItem5, WString szItem6, WString szItem7, WString szItem8);

	public void AU3_WinMinimizeAll();

	public void AU3_WinMinimizeAllUndo();

	public int AU3_WinMove(WString szTitle, WString szText, int nX, int nY, int nWidth, int nHeight);

	public int AU3_WinSetOnTop(WString szTitle, WString szText, int nFlag);

	public int AU3_WinSetState(WString szTitle, WString szText, int nFlags);

	public int AU3_WinSetTitle(WString szTitle, WString szText, WString szNewTitle);

	public int AU3_WinSetTrans(WString szTitle, WString szText, int nTrans);

	public int AU3_WinWait(WString szTitle, WString szText, int nTimeout);

	public int AU3_WinWaitActive(WString szTitle, WString szText, int nTimeout);

	public int AU3_WinWaitClose(WString szTitle, WString szText, int nTimeout);

	public int AU3_WinWaitNotActive(WString szTitle, WString szText, int nTimeout);
}
