@echo off
setlocal enabledelayedexpansion

rem Define the output file
set OUTPUT_FILE=WeatherComponents.tsx
set "BASE_DIR=./src"
rem Remove the output file if it already exists
if exist "%OUTPUT_FILE%" (
    del "%OUTPUT_FILE%"
)

rem Iterate through all .js, .ts, .tsx, .jsx, and .css files in the ./src directory recursively
for /r "%BASE_DIR%" %%i in (*.js *.ts *.tsx *.jsx *.css) do (
    rem Get the absolute path of the current file
    set "ABS_PATH=%%i"
    rem Calculate the relative path from BASE_DIR to the current file
    set "REL_PATH=!ABS_PATH:%CD%\=!"
    rem Replace backslashes with forward slashes
    set "REL_PATH=!REL_PATH:\=/!"


    rem Write the relative path as a comment to the output file
    echo /* >> "%OUTPUT_FILE%"
    echo ------------------------------------------------------------------------------ >> "%OUTPUT_FILE%"
    echo    !REL_PATH! >> "%OUTPUT_FILE%"
    echo ------------------------------------------------------------------------------ >> "%OUTPUT_FILE%"
    echo */ >> "%OUTPUT_FILE%"
    rem Copy the contents of the current file to the output file
    type "%%i" >> "%OUTPUT_FILE%"
    rem Add an extra newline after each file to separate them
    echo. >> "%OUTPUT_FILE%"
)

echo Done! Created %OUTPUT_FILE% with all specified file contents.