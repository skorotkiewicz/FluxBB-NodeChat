##
##        Mod title:  NodeJS Shoutbox for FluxBB
##
##       Mod version:  0.0.1
##   Works on FluxBB:  1.5.*
##      Release date:  2014-12-27
##       Review date:  2014-12-27
##            Author:  Sebastian Korotkiewicz (sebastian@korotkiewicz.eu)
##      Contributors:  Jérémy Dutheil (https://github.com/jdutheil/nodePHP)
##
##         Languages:  English
##
##      Repositories:  https://github.com/modInfo/FluxBB-NodeChat
##
##               Note:  If you are using another language, feel free to provide a translation for this MOD.
##
##    Affected files:  index.php
##
##        Affects DB:  New tables:
##                        'nodechat'
##


#
#---------[ 1. UPLOAD ]-------------------------------------------------
#

files/install_mod.php to /
files/nodechat to /

#
#---------[ 2. RUN ]----------------------------------------------------------
#

install_mod.php


#
#---------[ 3. DELETE ]-------------------------------------------------------
#

install_mod.php


#
#---------[ 4. START NODEJS ]---------------------------------------------------------
#

node /nodechat/js/nodeServer.js


