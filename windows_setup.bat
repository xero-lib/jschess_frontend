@ECHO off

IF NOT EXIST "src/jschess" (
    ECHO Please run git submodule update --recursive
    EXIT
) 
WHERE npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO Please install npm. If it is installed, please ensure it is in the path variable.
    EXIT
) ELSE (
    npm i -g react-scripts
    npm i
    cd src/jschess
    npm i
    cd ../..
    npm start
)