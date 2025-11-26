nst char *CONST86 * (*tcl_FSFileAttrStrings) (Tcl_Obj *pathPtr, Tcl_Obj **objPtrRef); /* 453 */
    int (*tcl_FSStat) (Tcl_Obj *pathPtr, Tcl_StatBuf *buf); /* 454 */
    int (*tcl_FSAccess) (Tcl_Obj *pathPtr, int mode); /* 455 */
    Tcl_Channel (*tcl_FSOpenFileChannel) (Tcl_Interp *interp, Tcl_Obj *pathPtr, const char *modeString, int permissions); /* 456 */
    Tcl_Obj * (*tcl_FSGetCwd) (Tcl_Interp *interp); /* 457 */
    int (*tcl_FSChdir) (Tcl_Obj *pathPtr); /* 458 */
    int (*tcl_FSConvertToPathType) (Tcl_Interp *interp, Tcl_Obj *pathPtr); /* 459 */
    Tcl_Obj * (*tcl_FSJoinPath) (Tcl_Obj *listObj, int elements); /* 460 */
    Tcl_Obj * (*tcl_FSSplitPath) (Tcl_Obj *pathPtr, int *lenPtr); /* 461 */
    int (*tcl_FSEqualPaths) (Tcl_Obj *firstPtr, Tcl_Obj *secondPtr); /* 462 */
    Tcl_Obj * (*tcl_FSGetNormalizedPath) (Tcl_Interp *interp, Tcl_Obj *pathPtr); /* 463 */
    Tcl_Obj * (*tcl_FSJoinToPath) (Tcl_Obj *pathPtr, int objc, Tcl_Obj *const objv[]); /* 464 */
    ClientData (*tcl_FSGetInternalRep) (Tcl_Obj *pathPtr, const Tcl_Filesystem *fsPtr); /* 465 */
    Tcl_Obj * (*tcl_FSGetTranslatedPath) (Tcl_Interp *interp, Tcl_Obj *pathPtr); /* 466 */
    int (*tcl_FSEvalFile) (Tcl_Interp *interp, Tcl_Obj *fileName); /* 467 */
    Tcl_Obj * (*tcl_FSNewNativePath) (const Tcl_Filesystem *fromFilesystem, ClientData clientData); /* 468 */
    const void * (*tcl_FSGetNativePath) (Tcl_Obj *pathPtr); /* 469 */
    Tcl_Obj * (*tcl_FSFileSystemInfo) (Tcl_Obj *pathPtr); /* 470 */
    Tcl_Obj * (*tcl_FSPathSeparator) (Tcl_Obj *pathPtr); /* 471 */
    Tcl_Obj * (*tcl_FSListVolumes) (void); /* 472 */
    int (*tcl_FSRegister) (ClientData clientData, const Tcl_Filesystem *fsPtr); /* 473 */
    int (*tcl_FSUnregister) (const Tcl_Filesystem *fsPtr); /* 474 */
    ClientData (*tcl_FSData) (const Tcl_Filesystem *fsPtr); /* 475 */
    const char * (*tcl_FSGetTranslatedStringPath) (Tcl_Interp *interp, Tcl_Obj *pathPtr); /* 476 */
    CONST86 Tcl_Filesystem * (*tcl_FSGetFileSystemForPath) (Tcl_Obj *pathPtr); /* 477 */
    Tcl_PathType (*tcl_FSGetPathType) (Tcl_Obj *pathPtr); /* 478 */
    int (*tcl_OutputBuffered) (Tcl_Channel chan); /* 479 */
    void (*tcl_FSMountsChanged) (const Tcl_Filesystem *fsPtr); /* 480 */
    int (*tcl_EvalTokensStandard) (Tcl_Interp *interp, Tcl_Token *tokenPtr, int count); /* 481 */
    void (*tcl_GetTime) (Tcl_Time *timeBuf); /* 482 */
    Tcl_Trace (*tcl_CreateObjTrace) (Tcl_Interp *interp, int level, int flags, Tcl_CmdObjTraceProc *objProc, ClientData clientData, Tcl_CmdObjTraceDeleteProc *delProc); /* 483 */
    int (*tcl_GetCommandInfoFromToken) (Tcl_Command token, Tcl_CmdInfo *infoPtr); /* 484 */
    int (*tcl_SetCommandInfoFromToken) (Tcl_Command token, const Tcl_CmdInfo *infoPtr); /* 485 */
    Tcl_Obj * (*tcl_DbNewWideIntObj) (Tcl_WideInt wideValue, const char *file, int line); /* 486 */
    int (*tcl_GetWideIntFromObj) (Tcl_Interp *interp, Tcl_Obj *objPtr, Tcl_WideInt *widePtr); /* 487 */
    Tcl_Obj * (*tcl_NewWideIntObj) (Tcl_WideInt wideValue); /* 488 */
    void (*tcl_SetWideIntObj) (Tcl_Obj *objPtr, Tcl_WideInt wideValue); /* 489 */
    Tcl_StatBuf * (*tcl_AllocStatBuf) (void); /* 490 */
    Tcl_WideInt (*tcl_Seek) (Tcl_Channel chan, Tcl_Wide