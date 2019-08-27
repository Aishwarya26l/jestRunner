#!/bin/bash
echo
echo "***************************"
echo "**REMOVING UNWANTED FILES**"
echo "***************************"
rm -rf node_modules && echo "$(tput setaf 2)Removed node_modules$(tput sgr 0)" 
rm package-lock.json && echo "$(tput setaf 2)Removed package lock file$(tput sgr 0)"
rm lambdaFunc.zip && echo "$(tput setaf 2)Removed lambdaFunc zip file$(tput sgr 0)"
rm -rf coverage && echo "$(tput setaf 2)Removed coverage files$(tput sgr 0)" 

echo 
echo "***************************"
echo "*****NPM INSTALL***********"
echo "***************************"
if npm install
then 
    echo "$(tput setaf 2)npm successfully installed$(tput sgr 0)"
else
    echo "$(tput setaf 2)**********ERROR***********$(tput sgr 0)"
fi
echo
echo "***************************"
echo "*****ZIP CONTENT***********"
echo "***************************"
if zip -qr lambdaFunc.zip .
then 
    echo "$(tput setaf 2)LamndaFunc.zip created!$(tput sgr 0)"
else
    echo "$(tput setaf 2)[ERROR] : while creating lambdaFunc.zip$(tput sgr 0)"
fi

echo
echo "***************************"
echo "*******DEPLOY**************"
echo "***************************"
if aws lambda update-function-code --function-name jestRunner --zip-file fileb://lambdaFunc.zip
then 
    echo
    echo
    echo "$(tput setaf 2)***************************$(tput sgr 0)"
    echo "$(tput setaf 2)***SUCCESSFULLY DEPLOYED***$(tput sgr 0)"
    echo "$(tput setaf 2)***************************$(tput sgr 0)"
else
    echo
    echo
    echo "$(tput setaf 1)***************************$(tput sgr 0)"
    echo "$(tput setaf 1)***------ERROR----------***$(tput sgr 0)"
    echo "$(tput setaf 1)***************************$(tput sgr 0)"
fi