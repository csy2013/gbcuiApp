bower install angular-resource#1.4.7
bower install angular-local-storage
bower install ngCordova

cordova plugin add  cordova-plugin-inappbrowser


cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-device-motion
cordova plugin add https://github.com/iVanPan/cordova_weibo.git --variable WEIBO_APP_ID=1105499027
cordova plugin add cordova-plugin-wechat --variable wechatappid=wxd450a3f765f8415c
cordova plugin add cordova-plugin-qqsdk --variable QQ_APP_ID=1105499027 cordova build --device

cordova plugin add https://github.com/floatinghotpot/cordova-plugin-qq

cordova plugin add https://github.com/sunlu/cordova-plugin-xgpush --save \
--variable ACCESS_ID="Your ID"  --variable ACCESS_KEY="Your Key"


cordova plugin add https://github.com/raistlinzx/cordova-plugin-sharesdk.git --variable SHARESDK_IOS_APPKEY=7aba3cab2c83   --variable SHARESDK_ANDROID_APPKEY=7aba3cab2c83  --variable QQAPPID=1105597994  --variable QQAPPKEY=bw8vUX6vc1l3tTaZ --variable QQURLSCHEME=QQ41e6162a    --variable WECHATAPPID=wxd450a3f765f8415c  --variable WECHATAPPSECRET=aae0221315ac4d84791829f355d5edc5  --variable WBAPPKEY=ddssd --variable WBAPPSECRET=dadf --variable WBREDIRECTURL=http://changsy.cn


cordova plugin add https://github.com/Mobishift/cordova_plugin_amap_navigation --variable amapapikey=3c026ee26dfe3721c439d628b40787d1 --variable iflytekappid=57a5d0be --variable iosamapkey=c6cbd339aada94ad5a8f42aa99933eda


cordova plugin add jmessage-phonegap-plugin --variable APP_KEY=4701a7eedaff782a8c42a5df
cordova plugin add https://github.com/jpush/jmessage-phonegap-plugin.git --variable APP_KEY=4701a7eedaff782a8c42a5df
cordova plugin add cordova-plugin-jsms --variable APP_KEY=4701a7eedaff782a8c42a5df
cordova plugin add https://github.com/jpush/cordova-plugin-jsms.git --variable APP_KEY=4701a7eedaff782a8c42a5df

cordova plugin add https://github.com/jpush/jpush-phonegap-plugin.git --variable API_KEY=4701a7eedaff782a8c42a5df
cordova plugin add https://github.com/jpush/cordova-plugin-jsms.git --variable APP_KEY=4701a7eedaff782a8c42a5df

cordova plugin add cordova-plugin-transport-security


npm install gulp-htmlmin gulp-imagemin imagemin-pngcrush gulp-minify-css gulp-jshint gulp-uglify gulp-concat gulp-rename gulp-notify --save-dev