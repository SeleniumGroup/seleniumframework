Func _UploadFile($file)
	AutoItSetOption("WinTitleMatchMode", 2)
	WinWaitActive("","文件名", 15);
	ControlSetText("", "文件名", "[CLASS:Edit; INSTANCE:1]", $file);
	ControlClick("", "文件名","[CLASS:Button; TEXT:打开(&O)]");
EndFunc
_UploadFile($CmdLine[$CmdLine[0]])