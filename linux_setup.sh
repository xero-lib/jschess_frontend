#!/bin/bash
#linux setup for jschess and jschess frontend

if ! command -v npm &> /dev/null
then
    npm i -g react-scripts
    npm i
    if [ ! -d "./src/jschess" ]
    then
        echo "Please run git submodule update --recursive"
        exit 1
    fi
    cd src/jschess
    npm i
    cd ../..
    npm start
else
    echo "Please install npm. If it is installed, please ensure it is in your path variable"
    exit 1
fi