/**
 * UAFormat.js v0.0.2
 * https://github.com/jeeinn/ua-format-js
 *
 * Copyright © 2016 Jeeinn
 * Licensed under MIT
 * Created by xyw on 2017/3/8.
 */
!function(s){"use strict";
// 定义常量
var e="name",i="version",t="type",a="model",r="vendor",n="mobile",o="tablet",d={osRules:[{patterns:[/\((bb)(10);/i],// BlackBerry 10
defaults:[[e,"BlackBerry"],[i]]},{patterns:[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],// Symbian
defaults:[[e,"Symbian"],[i]]},{patterns:[/mozilla.+\(mobile;.+gecko.+firefox/i],// Firefox OS
defaults:[[e,"Firefox OS"],[i]]},{patterns:[/(cros)\s[\w]+\s([\w\.]+\w)/i],// Chromium OS
defaults:[[e,"Chromium OS"],[i]]},{patterns:[/(sunos)\s?([\w\.]+\d)*/i],// Solaris
defaults:[[e,"Solaris"],[i]]},{patterns:[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],defaults:[[e,"Mac OS"],[i]]},{patterns:[/cfnetwork\/.+darwin/i,// iOS
/ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],defaults:[[i],[e,"iOS"]]},{patterns:[/\((series40);/i],// Series 40
defaults:[[e]]},{patterns:[
// Mobile/Embedded OS
/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,// Windows Phone
/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,/(blackberry)\w*\/?([\w\.]+)*/i,// Blackberry
/(tizen)[\/\s]([\w\.]+)/i,// Tizen
/Linux;\s*(Android)\s*([\d.]+);\s*/,// Android Mobile
/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,// Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
/linux;.+(sailfish);/i,// Sailfish OS
// Windows based
/microsoft\s(windows)\s(vista|xp)/i,// Windows (iTunes)
/(windows)\snt\s6\.2;\s(arm)/i,// Windows RT
// GNU/Linux based
/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i,// FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
/(mint)[\/\s\(]?(\w+)*/i,// Mint
/(mageia|vectorlinux)[;\s]/i,// Mageia/VectorLinux
/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,// Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/SlackwareFedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
/(hurd|linux)\s?([\w\.]+)*/i,// Hurd/Linux
/(gnu)\s?([\w\.]+)*/i,// GNU
/(haiku)\s(\w+)/i,// Haiku
/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,// Solaris
/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,// AIX
/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,// Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
/(unix)\s?([\w\.]+)*/i,// UNIX
// Console
/(nintendo|playstation)\s([wids34portablevu]+)/i],defaults:[[e],[i]]}],browserRules:[{patterns:[/(micromessenger)\/([\w\.]+)/i],// WeChat
defaults:[[e,"WeChat"],[i]]},{// UCBrowser
patterns:[/(uc\s?browser)[\/\s]?([\w\.]+)/i,/ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,/juc.+(ucweb)[\/\s]?([\w\.]+)/i],defaults:[[e,"UCBrowser"],[i]]},{// SouGouBrowser
patterns:[/(MetaSr)[\/\s]?([\w\.]+)/i],defaults:[[e,"SouGou"],[i]]},{patterns:[/(opios)[\/\s]+([\w\.]+)/i],// Opera mini on iphone >= 8.0
defaults:[[e,"Opera Mini"],[i]]},{patterns:[/\s(opr)\/([\w\.]+)/i],// Opera Webkit
defaults:[[e,"Opera"],[i]]},{patterns:[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],// IE11
defaults:[[e,"IE"],[i]]},{patterns:[/(yabrowser)\/([\w\.]+)/i],// Yandex
defaults:[[e,"Yandex"],[i]]},{patterns:[/(comodo_dragon)\/([\w\.]+)/i],// Comodo Dragon 或许有误差
defaults:[[e,"Comodo Dragon"],[i]]},{// Dolphin
patterns:[/(dolfin)\/([\w\.]+)/i],defaults:[[e,"Dolphin"],[i]]},{patterns:[/((?:android.+)crmo|crios)\/([\w\.]+)/i],// Chrome for Android/iOS
defaults:[[e,"Chrome"],[i]]},{patterns:[/\swv\).+(chrome)\/([\w\.]+)/i],// Chrome WebView
defaults:[[e,"Chrome WebView"],[i]]},{patterns:[/(navigator|netscape)\/([\w\.-]+)/i],// Netscape
defaults:[[e,"Netscape"],[i]]},{patterns:[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],// Google Search Appliance on iOS
defaults:[[e,"GSA"],[i]]},{patterns:[/(puffin)\/([\w\.]+)/i],// Puffin
defaults:[[e,"Puffin"],[i]]},{patterns:[
// Webkit/KHTML based
/(2345Explorer)[\/\s]?([\w\.]+)/i,// 2345 Browser
/(BIDUBrowser)[\/\s]?([\w\.]+)/i,// baidu Browser
/(QQ)\/([\d\.]+)/i,// QQ, aka ShouQ
/(qqbrowser)[\/\s]?([\w\.]+)/i,// QQBrowser
/(qqbrowserlite)\/([\w\.]+)/i,// QQBrowserLite
/safari\s(line)\/([\w\.]+)/i,// Line App for iOS
/android.+(line)\/([\w\.]+)\/iab/i,// Line App for Android
/(rekonq)\/([\w\.]+)*/i,// Rekonq
/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i,// Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Quark
/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i,// Safari < 3.0 几乎没用
/(webkit|khtml)\/([\w\.]+)/i,
// IE
/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i,// Microsoft Edge
// Presto based
/(opera\smini)\/([\w\.-]+)/i,// Opera Mini
/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,// Opera Mobi/Tablet
/(opera).+version\/([\w\.]+)/i,// Opera > 9.80
/(opera)[\/\s]+([\w\.]+)/i,// Opera < 9.80
/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,// Chrome/OmniWeb/Arora/Tizen/Nokia
// Mixed
/(kindle)\/([\w\.]+)/i,// Kindle
/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,// Lunascape/Maxthon/Netfront/Jasmine/Blazer
// Trident based
/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,// Avant/IEMobile/SlimBrowser/Baidu
/(?:ms|\()(ie)\s([\w\.]+)/i,// Internet Explorer
/(swiftfox)/i,// Swiftfox
/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,// IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,// Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,// Mozilla
/(konqueror)\/([\w\.]+)/i,// Konqueror
// Other
/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,// Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
/(links)\s\(([\w\.]+)/i,// Links
/(gobrowser)\/?([\w\.]+)*/i,// GoBrowser
/(ice\s?browser)\/v?([\w\._]+)/i,// ICE Browser
/(mosaic)[\/\s]([\w\.]+)/i],defaults:[[e],[i]]},
// 符合version-name
{patterns:[/xiaomi\/miuibrowser\/([\w\.]+)/i],// MIUI Browser
defaults:[[i],[e,"MIUI Browser"]]},{// baiduboxapp 苹果可能不准确
patterns:[/baiduboxapp\/(.+)\s\(baidu;/i,/baiduboxapp\/(.+)_enohpi/i],defaults:[[i],[e,"Baidu"]]},{patterns:[/;fbav\/([\w\.]+);/i],// Facebook App for iOS 虽然国内没什么人上
defaults:[[i],[e,"Facebook"]]},{patterns:[/fxios\/([\w\.-]+)/i],// Firefox for iOS
defaults:[[i],[e,"Firefox iOS"]]},{patterns:[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],// Mobile Safari
defaults:[[i],[e,"Mobile Safari"]]},{// Android Browser
patterns:[/android.+samsungbrowser\/([\w\.]+)/i,/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],defaults:[[i],[e,"Android Browser"]]},{patterns:[/headlesschrome(?:\/([\w\.]+)|\s)/i],// Chrome Headless
defaults:[[i],[e,"Chrome Headless"]]},{patterns:[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],// Safari & Safari Mobile
defaults:[[i],[e]]},{patterns:[/(LBBROWSER)/i],// LieBao Browser
defaults:[[e]]}],deviceRules:[{// ZUK mobile
patterns:[/android.+;\s(zuk.+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"Lenovo"],[t,n]]},{// Smartisan mobile
patterns:[/android.+;\s(sm\d+)\sbuild\/\w.+mobile/i,/android.+;\s(yq\d+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"Smartisan"],[t,n]]},{// MeiZu mobile
patterns:[/android.+;\s(m1+|m2+|m3+|m5+|m040+|mx4+|mx5+|mx6+|mz-[\w-]{2,})\sbuild\/\w.+mobile/i],defaults:[[a],[r,"Meizu"],[t,n]]},{// le mobile
patterns:[/android.+;\s(le.+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"LeMobile"],[t,n]]},{// GiONEE mobile
patterns:[/android.+;\s(gn.+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"GiONEE"],[t,n]]},{// nubia mobile
patterns:[/android.+;\s(nx.+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"Nubia"],[t,n]]},{patterns:[/android.+(\w+)\s+build\/hm\1/i,// Xiaomi Hongmi 'numeric' models
/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,// Xiaomi Hongmi note
/android.+;\s(mi\s.+)\sbuild\/\w.+mobile/i,/android.+;\s(redmi\s.+)\sbuild\/\w.+mobile/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i],defaults:[[a],[r,"Xiaomi"],[t,n]]},{// Siemens
patterns:[/sie-(\w+)*/i],defaults:[[a],[r,"Siemens"],[t,n]]},{// Fire Phone
patterns:[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],defaults:[[a],[r,"Amazon"],[t,n]]},{// iPod/iPhone
patterns:[/\((ip[honed|\s\w*]+);/i],defaults:[[a],[r,"Apple"],[t,n]]},{patterns:[/\(bb10;\s(\w+)/i],// BlackBerry 10
defaults:[[a],[r,"BlackBerry"],[t,n]]},{// Huawei Nexus 6P
patterns:[/(nexus\s6p)/i],defaults:[[a],[r,"Huawei"],[t,n]]},{// Motorola
patterns:[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],defaults:[[a],[r,"Motorola"],[t,n]]},{patterns:[/(kin\.[onetw]{3})/i],// Microsoft Kin
defaults:[[a],[r,"Microsoft"],[t,n]]},{// LG
patterns:[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],defaults:[[a],[r,"LG"],[t,n]]},{// Google Pixel
patterns:[/android.+;\s(pixel [xl2]{1,2}|pixel)\s/i],defaults:[[a],[r,"Google"],[t,n]]},{patterns:[/android.+a000(1)\s+build/i,// OnePlus
/android.+;\s(one.+)\sbuild\/\w.+mobile/i],defaults:[[a],[r,"OnePlus"],[t,n]]},{patterns:[/android.+;\s((vivo).+)\sbuild\/\w.+mobile/i,// vivo mobile
/android.+;\s((oppo).+)\sbuild\/\w.+mobile/i,// OPPO mobile
/\((ip[honed|\s\w*]+);.+(apple)/i],defaults:[[a],[r],[t,n]]},
// MODEL-VENDOR-TABLET
{patterns:[/applecoremedia\/[\w\.]+ \((ipad)/],// iPad
defaults:[[a],[r,"Apple"],[t,o]]},{patterns:[/android.+(mi[\s\-_]*(?:pad)?(?:[\s_]*[\w\s]+)?)\s+build/i],// Mi Pad tablets
defaults:[[a],[r,"Xiaomi"],[t,o]]},{patterns:[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],// Kindle Fire HD
defaults:[[a],[r,"Amazon"],[t,o]]},{patterns:[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],// Asus Tablets
defaults:[[a],[r,"Asus"],[t,o]]},{// HTC Nexus 9
patterns:[/(nexus\s9)/i],defaults:[[a],[r,"HTC"],[t,o]]},{patterns:[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],defaults:[[a],[r,"Motorola"],[t,o]]},{// Acer
patterns:[/android\s3\.[\s\w;-]{10}(a\d{3})/i],defaults:[[a],[r,"Acer"],[t,o]]},{// Lenovo
patterns:[/android.+(ideatab[a-z0-9\-\s]+)/i],defaults:[[a],[r,"Lenovo"],[t,o]]},{// Google Pixel C
patterns:[/android.+;\s(pixel c)\s/i],defaults:[[a],[r,"Google"],[t,o]]},{patterns:[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i,// iPad/PlayBook
/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],defaults:[[a],[r],[t,o]]},
// VENDOR-MODEL-MOBILE
{patterns:[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],defaults:[[r,"Sony"],[a,"Xperia Phone"],[t,n]]},{patterns:[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],defaults:[[r,"Samsung"],[a],[t,n]]},{// Nokia
patterns:[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],defaults:[[r,"Nokia"],[a],[t,n]]},{patterns:[/(sprint\s(\w+))/i,// Sprint Phones
/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,// HTC
/(zte)-(\w+)*/i,// ZTE
/android.+;\s((zte).+)build\/\w+/i,/(microsoft);\s(lumia[\s\w]+)/i,// Microsoft Lumia
/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i,// Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
/(blackberry)[\s-]?(\w+)/i,// BlackBerry
/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,// BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
/(hp)\s([\w\s]+\w)/i,// HP iPAQ
/(asus)-?(\w+)/i,// Asus
/linux;.+((jolla));/i],defaults:[[r],[a],[t,n]]},
// VENDOR-MODEL-TABLET
{patterns:[/(sony)\s(tablet\s[ps])\sbuild\//i,// Sony
/(sony)?(?:sgp.+)\sbuild\//i],defaults:[[r,"Sony"],[a,"Xperia Tablet"],[t,o]]},{// Samsung
patterns:[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],defaults:[[r,"Samsung"],[a],[t,o]]},{// LG Tablet
patterns:[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],defaults:[[r,"LG"],[a],[t,o]]},{patterns:[/(archos)\s(gamepad2?)/i,// Archos
/(hp).+(touchpad)/i,// HP TouchPad
/(hp).+(tablet)/i,// HP Tablet
/(kindle)\/([\w\.]+)/i,// Kindle
/\s(nook)[\w\s]+build\/(\w+)/i,// Nook
/(dell)\s(strea[kpr\s\d]*[\dko])/i,// Dell Streak
/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],defaults:[[r],[a],[t,o]]},
// MODEL-VENDOR-SMARTTV
{patterns:[/(apple\s{0,1}tv)/i],// Apple TV
defaults:[[a,"Apple TV"],[r,"Apple"],[t,"smarttv"]]},{// 有误差
patterns:[/hbbtv.+maple;(\d+)/i],defaults:[[a,"SmartTV"],[r,"Samsung"],[t,"smarttv"]]},{// Sharp
patterns:[/\(dtv[\);].+(aquos)/i],defaults:[[a],[r,"Sharp"],[t,"smarttv"]]},{patterns:[/android.+aft([bms])\sbuild/i],// Fire TV
defaults:[[a],[r,"Amazon"],[t,"smarttv"]]},{// LG SmartTV
patterns:[/(lg) netcast\.tv/i],defaults:[[r],[a],[t,"smarttv"]]},{// HbbTV devices
patterns:[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],defaults:[[r],[a],[t,"smarttv"]]},
// VENDOR-MODEL-CONSOLE
{// Nvidia
patterns:[/android.+;\s(shield)\sbuild/i],defaults:[[a],[r,"Nvidia"],[t,"console"]]},{// Playstation
patterns:[/(playstation\s[34portablevi]+)/i],defaults:[[a],[r,"Sony"],[t,"console"]]},{// Microsoft Xbox
patterns:[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],defaults:[[a],[r,"Microsoft"],[t,"console"]]},{patterns:[/\s(ouya)\s/i,// Ouya
/(nintendo)\s([wids3u]+)/i],defaults:[[r],[a],[t,"console"]]},{// Pebble
patterns:[/((pebble))app\/[\d\.]+\s/i],defaults:[[r],[a],[t,"wearable"]]},{// Google Glass
patterns:[/android.+;\s(glass)\s\d/i],defaults:[[a],[r,"Google"],[t,"wearable"]]},{patterns:[/\s(tablet)[;\/]/i,// Unidentifiable Tablet
/\s(mobile)(?:[;\/]|\ssafari)/i],defaults:[[t],[r,"unknown"],[a,"unknown"]]}],engineRules:[{// EdgeHTML
patterns:[/windows.+\sedge\/([\w\.]+)/i],defaults:[[i],[e,"EdgeHTML"]]},{patterns:[/(presto)\/([\w\.]+)/i,// Presto
/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,// WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,// KHTML/Tasman/Links
/(icab)[\/\s]([23]\.[\d\.]+)/i],defaults:[[e],[i]]},{// Gecko
patterns:[/rv\:([\w\.]+).*(gecko)/i],defaults:[[i],[e]]}]},l={fixVersion:function(s){return s.version=s.version.replace(/_/g,"."),s},fixModel:function(s){return s.model=s.model.replace(/[_.]/g," "),s},calcResult:function(s,e){for(var i={},t=0;t<s.length;t++)1==s[t].length?i[s[t][0]]=e[t+1]:i[s[t][0]]=s[t][1];return i},filter:function(s,e){var i,t,a,r=!1,n={};switch(s){case"os":a=d.osRules;break;case"browser":a=d.browserRules;break;case"device":a=d.deviceRules;break;case"engine":a=d.engineRules}
// 遍历foreach rules
for(i=0;i<a.length;i++){var o=a[i].patterns,l=a[i].defaults;
// 遍历rulePatterns
for(t=0;t<o.length;t++){var u=o[t].exec(e);
// 获取自定义规则结果
if(null!==u){r=!0,n=this.calcResult(l,u);break}}if(r)break}
// 处理无结果情况
// console.log(result);
// 修正版本号、厂家
return r||a[0].defaults.forEach(function(s){n[s[0]]="unknown"}),void 0!==n.version&&this.fixVersion(n),void 0!==n.model&&this.fixModel(n),n},getOS:function(s){return this.filter("os",s)},getBrowser:function(s){return this.filter("browser",s)},getDevice:function(s){return this.filter("device",s)},getEngine:function(s){return this.filter("engine",s)}},u=function(e){var i=e||(s&&s.navigator&&s.navigator.userAgent?s.navigator.userAgent:"");return this.setUA=function(s){var e=s||"";return e?i=e:console.warn("setUA(): param is empty, use default ua"),this},this.getUA=function(){return i},this.getOS=function(){return l.getOS(i)},this.getBrowser=function(){return l.getBrowser(i)},this.getDevice=function(){return l.getDevice(i)},this.getEngine=function(){return l.getEngine(i)},this.getResult=function(){return{ua:this.getUA(),os:this.getOS(),browser:this.getBrowser(),device:this.getDevice(),engine:this.getEngine()}},this};
// 判断js环境导出
// judge js env
"undefined"!=typeof exports?(
// nodejs env环境
"undefined"!=typeof module&&module.exports&&(exports=module.exports=u),exports.UAFormat=u):
// browser env浏览器环境
s.UAFormat=u}("object"==typeof window?window:this);
