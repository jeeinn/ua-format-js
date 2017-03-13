/**
 * uaFormat.js v0.0.11
 * https://github.com/jeeinn/ua-format-js
 *
 * Copyright © 2016 Jeeinn
 * Licensed under MIT
 * Created by xyw on 2017/3/8.
 */

;(function (window) {
    'use strict';
    // 定义常量
    var EMPTY = '', UNKNOWN = 'unknown', TYPE_UNDEF = 'undefined', NAME = 'name', VERSION = 'version',
        TYPE = 'type', MODEL = 'model', VENDOR = 'vendor',
        MOBILE = 'mobile', TABLET = 'tablet', SMARTTV = 'smarttv',
        WEARABLE = 'wearable', CONSOLE = 'console', DESKTOP = 'desktop', EMBEDDED = 'embedded';

    // 所有匹配规则, 注意：规则不能为空对象
    var uaRules = {
        osRules:[
            {// Windows based
                patterns:[/microsoft\s(windows)\s(vista|xp)/i],                         // Windows (iTunes)
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[
                    /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
                    /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,                  // Windows Phone
                    /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
                ],
                defaults:[[NAME],[VERSION]]
            }, {// Mobile/Embedded OS
                patterns:[/\((bb)(10);/i],                                              // BlackBerry 10
                defaults:[[NAME,'BlackBerry'],[VERSION]]
            }, {
                patterns:[
                    /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
                    /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
                    /Linux;\s*(Android)\s*([\d.]+);\s*/,                                // Android Mobile
                    // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
                    /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                    /linux;.+(sailfish);/i                                              // Sailfish OS
                ],
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],         // Symbian
                defaults:[[NAME,'Symbian'],[VERSION]]
            }, {
                patterns:[/\((series40);/i],                                            // Series 40
                defaults:[[NAME]]
            }, {
                patterns:[/mozilla.+\(mobile;.+gecko.+firefox/i],                       // Firefox OS
                defaults:[[NAME,'Firefox OS'],[VERSION]]
            }, {
                patterns:[
                    // Console
                    /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation
                    // GNU/Linux based
                    /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
                    /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
                    /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
                    // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
                    /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
                    /(gnu)\s?([\w\.]+)*/i                                               // GNU

                ],
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[/(cros)\s[\w]+\s([\w\.]+\w)/i],                               // Chromium OS
                defaults:[[NAME,'Chromium OS'],[VERSION]]
            }, {// Solaris
                patterns:[/(sunos)\s?([\w\.]+\d)*/i],                                   // Solaris
                defaults:[[NAME,'Solaris'],[VERSION]]
            }, {// BSD based
                patterns:[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],           // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[/(haiku)\s(\w+)/i],                                           // Haiku
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],      // iOS
                defaults:[[NAME,'iOS'],[VERSION]]
            }, {
                patterns:[
                    /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
                    /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
                ],
                defaults:[[NAME,'Mac OS'],[VERSION]]
            }, {// Other
                patterns:[
                    /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
                    /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
                    /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                    // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
                    /(unix)\s?([\w\.]+)*/i                                              // UNIX
                ],
                defaults:[[NAME],[VERSION]]
            }
        ],
        browserRules:[
            {
                patterns:[
                    // Presto based
                    /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
                    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
                    /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
                    /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
                ],
                defaults:[[NAME],[VERSION]]
            }, {
                patterns:[/(opios)[\/\s]+([\w\.]+)/i],                                  // Opera mini on iphone >= 8.0
                defaults:[[NAME,'Opera Mini'], [VERSION]]
            }, {
                patterns:[/\s(opr)\/([\w\.]+)/i],                                       // Opera Webkit
                defaults:[[NAME, 'Opera'], [VERSION]]
            }, {                                                                        // baiduboxapp 苹果可能不准确
                patterns:[
                    /baiduboxapp\/(.+)\s\(baidu;/i,
                    /baiduboxapp\/(.+)_enohpi/i
                ],
                defaults:[[VERSION],[NAME,'Baidu']]
            }, {                                                                        // Mixed
                patterns:[
                    /(kindle)\/([\w\.]+)/i,                                             // Kindle
                    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,    // Lunascape/Maxthon/Netfront/Jasmine/Blazer
                    // Trident based
                    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,       // Avant/IEMobile/SlimBrowser/Baidu
                    /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer
                    // Webkit/KHTML based
                    /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
                    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i
                    // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS
                ],
                defaults:[[NAME], [VERSION]]
            }, {
                patterns:[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],                 // IE11
                defaults:[[NAME, 'IE'], [VERSION]]
            }, {
                patterns:[/(edge)\/((\d+)?[\w\.]+)/i],                                  // Microsoft Edge
                defaults:[[NAME], [VERSION]]
            }, {
                patterns:[/(yabrowser)\/([\w\.]+)/i],                                   // Yandex
                defaults:[[NAME, 'Yandex'], [VERSION]]
            }, {
                patterns:[/(comodo_dragon)\/([\w\.]+)/i],                               // Comodo Dragon 或许有误差
                defaults:[[NAME, 'Comodo Dragon'], [VERSION]]
            }, {
                patterns:[/xiaomi\/miuibrowser\/([\w\.]+)/i],                           // MIUI Browser
                defaults:[[VERSION],[NAME, 'MIUI Browser']]
            }, {
                patterns:[/(micromessenger)\/([\w\.]+)/i],                              // WeChat
                defaults:[[NAME, 'WeChat'], [VERSION]]
            }, {
                patterns:[
                    /(qqbrowser)[\/\s]?([\w\.]+)/i ,                                    // QQBrowser
                    /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia
                ],
                defaults:[[NAME], [VERSION]]
            }, {                                                                         // UCBrowser
                patterns:[
                    /(uc\s?browser)[\/\s]?([\w\.]+)/i,
                    /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,
                    /juc.+(ucweb)[\/\s]?([\w\.]+)/i
                ],
                defaults:[[NAME, 'UCBrowser'], [VERSION]]
            }, {                                                                         // Dolphin
                patterns:[/(dolfin)\/([\w\.]+)/i],
                defaults:[[NAME, 'Dolphin'], [VERSION]]
            }, {
                patterns:[/((?:android.+)crmo|crios)\/([\w\.]+)/i],                     // Chrome for Android/iOS
                defaults:[[NAME, 'Chrome'], [VERSION]]
            }, {
                patterns:[/;fbav\/([\w\.]+);/i],                                        // Facebook App for iOS 虽然国内没什么人上
                defaults:[[VERSION], [NAME, 'Facebook']]
            }, {
                patterns:[/fxios\/([\w\.-]+)/i],                                        // Firefox for iOS
                defaults:[[VERSION], [NAME, 'Firefox iOS']]
            }, {
                patterns:[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],               // Mobile Safari
                defaults:[[VERSION],[NAME, 'Mobile Safari']]
            }, {
                patterns:[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],            // Safari & Safari Mobile
                defaults:[[VERSION],[NAME]]
            }, {
                patterns:[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],             // Safari < 3.0 几乎没用
                defaults:[[NAME], [VERSION]]
            }, {
                patterns:[
                    /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
                    /(webkit|khtml)\/([\w\.]+)/i
                ],
                defaults:[[NAME], [VERSION]]
            }, {
                // Gecko based
                patterns:[/(navigator|netscape)\/([\w\.-]+)/i],                         // Netscape
                defaults:[[NAME, 'Netscape'], [VERSION]]
            }, {
                patterns:[
                    /(swiftfox)/i,                                                      // Swiftfox
                    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
                    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
                    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

                    // Other
                    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
                    /(links)\s\(([\w\.]+)/i,                                            // Links
                    /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
                    /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
                    /(mosaic)[\/\s]([\w\.]+)/i
                ],
                defaults:[[NAME], [VERSION]]
            }, {                                                                         // Android Browser
                patterns:[
                    /android.+samsungbrowser\/([\w\.]+)/i,
                    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i
                ],
                defaults:[[VERSION], [NAME, 'Android Browser']]
            }, {
                patterns:[/\swv\).+(chrome)\/([\w\.]+)/i],                              // Chrome WebView
                defaults:[[NAME, 'Chrome WebView'], [VERSION]]
            }
        ],
        deviceRules:[
            {                                                                           // ZUK mobile
                patterns:[/android.+;\s(zuk.+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR,'Lenovo'], [TYPE, MOBILE]]
            }, {                                                                        // Smartisan mobile
                patterns:[
                    /android.+;\s(sm\d+)\sbuild\/\w.+mobile/i,
                    /android.+;\s(yq\d+)\sbuild\/\w.+mobile/i
                ],
                defaults:[[MODEL], [VENDOR,'Smartisan'], [TYPE, MOBILE]]
            }, {                                                                        // MeiZu mobile
                patterns:[/android.+;\s(m1+|m2+|m3+|m5+|m040+|mx4+|mx5+|mx6+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR,'Meizu'], [TYPE, MOBILE]]
            }, {                                                                        // le mobile
                patterns:[/android.+;\s(le.+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR,'LeMobile'], [TYPE, MOBILE]]
            }, {                                                                        // vivo mobile
                patterns:[/android.+;\s((vivo).+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR], [TYPE, MOBILE]]
            }, {                                                                        // OPPO mobile
                patterns:[/android.+;\s((oppo).+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR], [TYPE, MOBILE]]
            }, {                                                                        // GiONEE mobile
                patterns:[/android.+;\s(gn.+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR,'GiONEE'], [TYPE, MOBILE]]
            }, {                                                                        // nubia mobile
                patterns:[/android.+;\s(nx.+)\sbuild\/\w.+mobile/i],
                defaults:[[MODEL], [VENDOR,'nubia'], [TYPE, MOBILE]]
            }, {                                                                        // Xiaomi mobile
                patterns:[
                    /android.+;\s(mi\s.+)\sbuild\/\w.+mobile/i,
                    /android.+;\s(redmi\s.+)\sbuild\/\w.+mobile/i,
                ],
                defaults:[[MODEL], [VENDOR,'Xiaomi'], [TYPE, MOBILE]]
            }, {                                                                        // iPad/PlayBook
                patterns:[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                defaults:[[MODEL], [VENDOR], [TYPE, TABLET]]
            }, {                                                                        // iPad
                patterns:[/applecoremedia\/[\w\.]+ \((ipad)/],
                defaults:[[MODEL], [VENDOR, 'Apple'], [TYPE, TABLET]]
            }, {                                                                        // Apple TV
                patterns:[/(apple\s{0,1}tv)/i],
                defaults:[[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]]
            }, {
                patterns:[
                    /(archos)\s(gamepad2?)/i,                                           // Archos
                    /(hp).+(touchpad)/i,                                                // HP TouchPad
                    /(hp).+(tablet)/i,                                                  // HP Tablet
                    /(kindle)\/([\w\.]+)/i,                                             // Kindle
                    /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
                    /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, TABLET]]
            }, {                                                                        // Kindle Fire HD
                patterns:[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
                defaults:[[MODEL], [VENDOR, 'Amazon'], [TYPE, TABLET]]
            }, {                                                                        // Fire Phone
                patterns:[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
                defaults:[[MODEL], [VENDOR, 'Amazon'], [TYPE, MOBILE]]
            }, {                                                                        // iPod/iPhone
                patterns:[/\((ip[honed|\s\w*]+);.+(apple)/i],
                defaults:[[MODEL], [VENDOR], [TYPE, MOBILE]]
            }, {                                                                        // iPad/PlayBook
                patterns:[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                defaults:[[MODEL], [VENDOR], [TYPE, TABLET]]
            }, {                                                                        // iPod/iPhone
                patterns:[/\((ip[honed|\s\w*]+);/i],
                defaults:[[MODEL], [VENDOR, 'Apple'], [TYPE, MOBILE]]
            }, {                                                                        // BlackBerry 10
                patterns:[/\(bb10;\s(\w+)/i],
                defaults:[[MODEL], [VENDOR, 'BlackBerry'], [TYPE, MOBILE]]
            }, {                                                                        // Asus Tablets
                patterns:[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                defaults:[[MODEL], [VENDOR, 'Asus'], [TYPE, TABLET]]
            }, {                                                                        // Sony
                patterns:[
                    /(sony)\s(tablet\s[ps])\sbuild\//i,
                    /(sony)?(?:sgp.+)\sbuild\//i
                ],
                defaults:[[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]]
            }, {
                patterns:[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                defaults:[[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]]
            }, {
                patterns:[
                    /\s(ouya)\s/i,                                                      // Ouya
                    /(nintendo)\s([wids3u]+)/i                                          // Nintendo
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, CONSOLE]]
            }, {                                                                        // Nvidia
                patterns:[/android.+;\s(shield)\sbuild/i],
                defaults:[[MODEL], [VENDOR, 'Nvidia'], [TYPE, CONSOLE]]
            }, {                                                                        // Playstation
                patterns:[/(playstation\s[34portablevi]+)/i],
                defaults:[[MODEL], [VENDOR, 'Sony'], [TYPE, CONSOLE]]
            }, {                                                                        // Lenovo tablets
                patterns:[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                defaults:[[VENDOR], [MODEL], [TYPE, TABLET]]
            }, {
                patterns:[
                    /(sprint\s(\w+))/i,                                                 // Sprint Phones
                    /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
                    /(zte)-(\w+)*/i,                                                    // ZTE
                    /android.+;\s((zte).+)build\/\w+/i,
                    /(microsoft);\s(lumia[\s\w]+)/i,                                    // Microsoft Lumia
                    // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
                    /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i,
                    /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
                    // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
                    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
                    /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
                    /(asus)-?(\w+)/i,                                                   // Asus
                    /linux;.+((jolla));/i                                               // Jolla
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            }, {                                                                        // HTC Nexus 9
                patterns:[/(nexus\s9)/i],
                defaults:[[MODEL], [VENDOR, 'HTC'], [TYPE, TABLET]]
            }, {                                                                        // Huawei Nexus 6P
                patterns:[/(nexus\s6p)/i],
                defaults:[[MODEL], [VENDOR, 'Huawei'], [TYPE, MOBILE]]
            }, {                                                                        // Microsoft Xbox
                patterns:[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                defaults:[[MODEL], [VENDOR, 'Microsoft'], [TYPE, CONSOLE]]
            }, {
                patterns:[/(kin\.[onetw]{3})/i],                                        // Microsoft Kin
                defaults:[[MODEL], [VENDOR, 'Microsoft'], [TYPE, MOBILE]]
            }, {                                                                        // Motorola
                patterns:[
                    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
                    /mot[\s-]?(\w+)*/i,
                    /(XT\d{3,4}) build\//i,
                    /(nexus\s6)/i
                ],
                defaults:[[MODEL], [VENDOR, 'Motorola'], [TYPE, MOBILE]]
            }, {
                patterns:[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                defaults:[[MODEL], [VENDOR, 'Motorola'], [TYPE, TABLET]]
            }, {                                                                        // HbbTV devices
                patterns:[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                defaults:[[VENDOR], [MODEL], [TYPE, SMARTTV]]
            }, {                                                                        // 有误差
                patterns:[/hbbtv.+maple;(\d+)/i],
                defaults:[[MODEL, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]]
            }, {                                                                        // Sharp
                patterns:[/\(dtv[\);].+(aquos)/i],
                defaults:[[MODEL], [VENDOR, 'Sharp'], [TYPE, SMARTTV]]
            }, {                                                                        // Samsung
                patterns:[
                    /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                    /((SM-T\w+))/i
                ],
                defaults:[[VENDOR, 'Samsung'], [MODEL], [TYPE, TABLET]]
            }, {
                patterns:[
                    /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                    /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
                    /sec-((sgh\w+))/i
                ],
                defaults:[[VENDOR, 'Samsung'], [MODEL], [TYPE, MOBILE]]
            }, {                                                                        // Siemens
                patterns:[/sie-(\w+)*/i],
                defaults:[[MODEL], [VENDOR, 'Siemens'], [TYPE, MOBILE]]
            }, {                                                                        // Nokia
                patterns:[
                    /(maemo|nokia).*(n900|lumia\s\d+)/i,
                    /(nokia)[\s_-]?([\w-]+)*/i
                ],
                defaults:[[VENDOR, 'Nokia'], [MODEL], [TYPE, MOBILE]]
            }, {                                                                        // Acer
                patterns:[/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                defaults:[[MODEL], [VENDOR, 'Acer'], [TYPE, TABLET]]
            }, {                                                                        // LG Tablet
                patterns:[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                defaults:[[VENDOR, 'LG'], [MODEL], [TYPE, TABLET]]
            }, {                                                                        // LG SmartTV
                patterns:[/(lg) netcast\.tv/i],
                defaults:[[VENDOR], [MODEL], [TYPE, SMARTTV]]
            }, {                                                                        // LG
                patterns:[
                    /(nexus\s[45])/i,
                    /lg[e;\s\/-]+(\w+)*/i
                ],
                defaults:[[MODEL], [VENDOR, 'LG'], [TYPE, MOBILE]]
            }, {                                                                        // Lenovo
                patterns:[/android.+(ideatab[a-z0-9\-\s]+)/i],
                defaults:[[MODEL], [VENDOR, 'Lenovo'], [TYPE, TABLET]]
            }, {                                                                        // Pebble
                patterns:[/((pebble))app\/[\d\.]+\s/i],
                defaults:[[VENDOR], [MODEL], [TYPE, WEARABLE]]
            }, {                                                                        // Google Glass
                patterns:[/android.+;\s(glass)\s\d/i],
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, WEARABLE]]
            }, {                                                                        // Google Pixel C
                patterns:[/android.+;\s(pixel c)\s/i],
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, TABLET]]
            }, {                                                                        // Google Pixel
                patterns:[/android.+;\s(pixel xl|pixel)\s/i],
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, MOBILE]]
            }, {
                patterns:[
                    /android.+(\w+)\s+build\/hm\1/i,                                    // Xiaomi Hongmi 'numeric' models
                    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
                    // Xiaomi Mi
                    /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i
                ],
                defaults:[[MODEL], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]]
            }, {                                                                        // OnePlus
                patterns:[
                    /android.+a000(1)\s+build/i,
                    /android.+;\s(one.+)\sbuild\/\w.+mobile/i
                ],
                defaults:[[MODEL], [VENDOR, 'OnePlus'], [TYPE, MOBILE]]
            }, {
                patterns:[
                    /\s(tablet)[;\/]/i,                                                 // Unidentifiable Tablet
                    /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
                ],
                defaults:[[TYPE], [VENDOR, UNKNOWN], [MODEL, UNKNOWN]]
            }

        ],
        engineRules:[
            {                                                                           // EdgeHTML
                patterns:[/windows.+\sedge\/([\w\.]+)/i],
                defaults:[[VERSION], [NAME, 'EdgeHTML']]
            }, {
                patterns:[
                    /(presto)\/([\w\.]+)/i,                                             // Presto
                    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
                    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
                    /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
                ],
                defaults:[[NAME], [VERSION]]
            }, {                                                                        // Gecko
                patterns:[/rv\:([\w\.]+).*(gecko)/i],
                defaults:[[VERSION], [NAME]]
            }
        ]
    };
    // 核心工具
    var tools = {
        versionFix:function (obj) {
            obj.version =  obj.version.replace(/_/g,'.');
            return obj;
        },
        modelFix:function (obj) {
            obj.model = obj.model.replace(/[_.]/g,' ');
            return obj;
        },
        chResult:function (defaults, tmp) {
            var res = {};
            for (var i=0;i<defaults.length;i++){
                if(defaults[i].length==1){
                    res[defaults[i][0]] = tmp[i+1];
                }else{
                    res[defaults[i][0]] = defaults[i][1];
                }
            }
            return res;
        },
        filter:function (type,ua) {
            var i,j,rules, matched=false, result={};
            switch (type){
                case 'os':
                    rules = uaRules.osRules;
                    break;
                case 'browser':
                    rules = uaRules.browserRules;
                    break;
                case 'device':
                    rules = uaRules.deviceRules;
                    break;
                case 'engine':
                    rules = uaRules.engineRules;
            }
            //遍历rules
            for(i = 0; i < rules.length; i++){
                var patterns = rules[i].patterns;
                var defaults = rules[i].defaults;
                //遍历patterns
                for(j = 0; j < patterns.length; j++){
                    var tmp = patterns[j].exec(ua);
                    //处理结果与自定义
                    if(tmp !== null) {
                        matched = true;
                        result = this.chResult(defaults, tmp);
                        break;
                    }
                }
                if(matched) break;
            }
            //处理无结果情况
            if(!matched) {
                rules[0].defaults.forEach(function (value) {
                    result[value[0]] = UNKNOWN;
                });
            }
            // console.log(result);
            if(result.version !== undefined) this.versionFix(result);
            if(result.model !== undefined) this.modelFix(result);
            return result;
        },
        getOS:function (ua) {
            return this.filter('os',ua);
        },
        getBrowser:function (ua) {
            return this.filter('browser',ua);
        },
        getDevice:function (ua) {
            return this.filter('device',ua);
        },
        getEngine:function (ua) {
            return this.filter('engine',ua);
        }
    };

    var uaFormat = function (uaString) {
        var ua = uaString || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        this.setUA = function (uaString) {
            var uaSet = uaString || EMPTY;
            if(uaSet){
                ua = uaSet;
            }else{
                console.warn('setUA(): param is empty, use default ua');
            }
            return this;
        };
        this.getUA = function () {return ua;};
        this.getOS = function(){
            return tools.getOS(ua);
        };
        this.getBrowser = function(){
            return tools.getBrowser(ua);
        };
        this.getDevice = function(){
            return tools.getDevice(ua);
        };
        this.getEngine = function(){
            return tools.getEngine(ua);
        };
        this.getResult = function () {
            return {
                ua : this.getUA(),
                os : this.getOS(),
                browser : this.getBrowser(),
                device : this.getDevice(),
                engine : this.getEngine()
            };
        };
        return this;
    };

    // 判断js环境导出
    if (typeof(exports) !== TYPE_UNDEF) {
        // nodejs 环境
        if ((typeof module !== TYPE_UNDEF) && module.exports) {
            exports = module.exports = uaFormat;
        }
        exports.uaFormat = uaFormat;
    }else {
        // 浏览器环境
        window.uaFormat = uaFormat;
    }

})(typeof window === 'object' ? window : this);