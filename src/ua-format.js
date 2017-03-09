/**
 * uaFormat.js v0.0.1
 * https://github.com/jeeinn/ua-format-js
 *
 * Copyright © 2016 Jeeinn
 * Licensed under MIT
 * Created by xyw on 2017/3/8.
 */

;(function (window) {
    'use strict';
    // 定义常量
    var EMPTY = '', UNKNOWN = 'unknown',NAME = 'name', VERSION = 'version',
        TYPE = 'type', MODEL = 'model', VENDOR = 'vendor',
        MOBILE = 'mobile', TABLET = 'tablet', SMARTTV = 'smarttv',
        WEARABLE = 'wearable', CONSOLE = 'console', EMBEDDED = 'embedded';

    // 所有匹配规则, 注意：规则不能为空对象
    var uaRules = {
        osRules:[
            {// Windows based
                patterns:[/microsoft\s(windows)\s(vista|xp)/i],                         // Windows (iTunes)
                defaults:[[NAME],[VERSION]]
            },{
                patterns:[
                    /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
                    /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,                  // Windows Phone
                    /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
                ],
                defaults:[[NAME],[VERSION]]
            },{// Mobile/Embedded OS
                patterns:[/\((bb)(10);/i],                                              // BlackBerry 10
                defaults:[[NAME,'BlackBerry'],[VERSION]]
            },{
                patterns:[
                    /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
                    /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
                    /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                    // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
                    /linux;.+(sailfish);/i                                              // Sailfish OS
                ],
                defaults:[[NAME],[VERSION]]
            },{
                patterns:[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],         // Symbian
                defaults:[[NAME,'Symbian'],[VERSION]]
            },{
                patterns:[/\((series40);/i],                                            // Series 40
                defaults:[[NAME]]
            },{
                patterns:[/mozilla.+\(mobile;.+gecko.+firefox/i],                       // Firefox OS
                defaults:[[NAME,'Firefox OS'],[VERSION]]
            },{
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
            },{
                patterns:[/(cros)\s[\w]+\s([\w\.]+\w)/i],                               // Chromium OS
                defaults:[[NAME,'Chromium OS'],[VERSION]]
            },{// Solaris
                patterns:[/(sunos)\s?([\w\.]+\d)*/i],                                   // Solaris
                defaults:[[NAME,'Solaris'],[VERSION]]
            },{// BSD based
                patterns:[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],           // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
                defaults:[[NAME],[VERSION]]
            },{
                patterns:[/(haiku)\s(\w+)/i],                                           // Haiku
                defaults:[[NAME],[VERSION]]
            },{
                patterns:[/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],      // iOS
                defaults:[[NAME,'iOS'],[VERSION]]
            },{
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
            },{
                patterns:[/(opios)[\/\s]+([\w\.]+)/i],                                  // Opera mini on iphone >= 8.0
                defaults:[[NAME,'Opera Mini iOS'], [VERSION]]
            },{
                patterns:[/\s(opr)\/([\w\.]+)/i],                                       // Opera Webkit
                defaults:[[NAME, 'Opera'], [VERSION]]
            },{
                patterns:[
                    // Mixed
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
            },{
                patterns:[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],                 // IE11
                defaults:[[NAME, 'IE 11'], [VERSION]]
            },{
                patterns:[/(edge)\/((\d+)?[\w\.]+)/i],                                  // Microsoft Edge
                defaults:[[NAME], [VERSION]]
            },{
                patterns:[/(yabrowser)\/([\w\.]+)/i],                                   // Yandex
                defaults:[[NAME, 'Yandex'], [VERSION]]
            },{
                patterns:[/(comodo_dragon)\/([\w\.]+)/i],                               // Comodo Dragon 或许有误差
                defaults:[[NAME, 'Comodo Dragon'], [VERSION]]
            },{
                patterns:[/(micromessenger)\/([\w\.]+)/i],                              // WeChat
                defaults:[[NAME, 'WeChat'], [VERSION]]
            },{
                patterns:[/xiaomi\/miuibrowser\/([\w\.]+)/i],                           // MIUI Browser
                defaults:[[VERSION],[NAME, 'MIUI Browser']]
            },{
                patterns:[/\swv\).+(chrome)\/([\w\.]+)/i],                              // Chrome WebView
                defaults:[[NAME, 'Chrome WebView'], [VERSION]]
            },{
                patterns:[
                    /android.+samsungbrowser\/([\w\.]+)/i,
                    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i
                ],                                                                      // Android Browser
                defaults:[[VERSION], [NAME, 'Android Browser']]
            },{
                patterns:[
                    /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,     // Chrome/OmniWeb/Arora/Tizen/Nokia
                    /(qqbrowser)[\/\s]?([\w\.]+)/i                                      // QQBrowser
                ],
                defaults:[[NAME], [VERSION]]
            },{
                patterns:[
                    /(uc\s?browser)[\/\s]?([\w\.]+)/i,
                    /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i,
                    /juc.+(ucweb)[\/\s]?([\w\.]+)/i
                ],                                                                      // UCBrowser
                defaults:[[NAME, 'UCBrowser'], [VERSION]]
            },{
                patterns:[/(dolfin)\/([\w\.]+)/i],                                      // Dolphin
                defaults:[[NAME, 'Dolphin'], [VERSION]]
            },{
                patterns:[/((?:android.+)crmo|crios)\/([\w\.]+)/i],                     // Chrome for Android/iOS
                defaults:[[NAME, 'Chrome'], [VERSION]]
            },{
                patterns:[/;fbav\/([\w\.]+);/i],                                        // Facebook App for iOS 虽然国内没什么人上
                defaults:[[VERSION], [NAME, 'Facebook iOS']]
            },{
                patterns:[/fxios\/([\w\.-]+)/i],                                        // Firefox for iOS
                defaults:[[VERSION], [NAME, 'Firefox iOS']]
            },{
                patterns:[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],               // Mobile Safari
                defaults:[[VERSION],[NAME, 'Mobile Safari']]
            },{
                patterns:[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],            // Safari & Safari Mobile
                defaults:[[VERSION],[NAME]]
            },{
                patterns:[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],             // Safari < 3.0 几乎没用
                defaults:[[NAME], [VERSION]]
            },{
                patterns:[
                    /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
                    /(webkit|khtml)\/([\w\.]+)/i
                ],
                defaults:[[NAME], [VERSION]]
            },{
                // Gecko based
                patterns:[/(navigator|netscape)\/([\w\.-]+)/i],                         // Netscape
                defaults:[[NAME, 'Netscape'], [VERSION]]
            },{
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
            }
        ],
        deviceRules:[
            {
                patterns:[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],                 // iPad/PlayBook
                defaults:[[MODEL], [VENDOR], [TYPE, TABLET]]
            },{
                patterns:[/applecoremedia\/[\w\.]+ \((ipad)/],                          // iPad
                defaults:[[MODEL], [VENDOR, 'Apple'], [TYPE, TABLET]]
            },{
                patterns:[/(apple\s{0,1}tv)/i],                                         // Apple TV
                defaults:[[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]]
            },{
                patterns:[
                    /(archos)\s(gamepad2?)/i,                                           // Archos
                    /(hp).+(touchpad)/i,                                                // HP TouchPad
                    /(hp).+(tablet)/i,                                                  // HP Tablet
                    /(kindle)\/([\w\.]+)/i,                                             // Kindle
                    /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
                    /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, TABLET]]
            },{
                patterns:[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],                       // Kindle Fire HD
                defaults:[[MODEL], [VENDOR, 'Amazon'], [TYPE, TABLET]]
            },{
                patterns:[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],          // Fire Phone
                defaults:[[MODEL], [VENDOR, 'Amazon'], [TYPE, MOBILE]]
            },{
                patterns:[/\((ip[honed|\s\w*]+);.+(apple)/i],                           // iPod/iPhone
                defaults:[[MODEL], [VENDOR], [TYPE, MOBILE]]
            },{
                patterns:[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],                 // iPad/PlayBook
                defaults:[[MODEL], [VENDOR], [TYPE, TABLET]]
            },{
                patterns:[/\((ip[honed|\s\w*]+);/i],                                    // iPod/iPhone
                defaults:[[MODEL], [VENDOR, 'Apple'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
                    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
                    // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
                    /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
                    /(asus)-?(\w+)/i                                                    // Asus
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            },{
                patterns:[/\(bb10;\s(\w+)/i],                                           // BlackBerry 10
                defaults:[[MODEL], [VENDOR, 'BlackBerry'], [TYPE, MOBILE]]
            },{
                patterns:[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                // Asus Tablets
                defaults:[[MODEL], [VENDOR, 'Asus'], [TYPE, TABLET]]
            },{
                patterns:[
                    /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
                    /(sony)?(?:sgp.+)\sbuild\//i
                ],
                defaults:[[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]]
            },{
                patterns:[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
                defaults:[[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /\s(ouya)\s/i,                                                      // Ouya
                    /(nintendo)\s([wids3u]+)/i                                          // Nintendo
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, CONSOLE]]
            },{
                patterns:[/android.+;\s(shield)\sbuild/i],                              // Nvidia
                defaults:[[MODEL], [VENDOR, 'Nvidia'], [TYPE, CONSOLE]]
            },{
                patterns:[/(playstation\s[34portablevi]+)/i],                           // Playstation
                defaults:[[MODEL], [VENDOR, 'Sony'], [TYPE, CONSOLE]]
            },{
                patterns:[/(sprint\s(\w+))/i],                                          // Sprint Phones
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            },{
                patterns:[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],                 // Lenovo tablets
                defaults:[[VENDOR], [MODEL], [TYPE, TABLET]]
            },{
                patterns:[
                    /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
                    /(zte)-(\w+)*/i,                                                    // ZTE
                    /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
                    // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
                ],
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            },{
                patterns:[/(nexus\s9)/i],                                               // HTC Nexus 9
                defaults:[[MODEL], [VENDOR, 'HTC'], [TYPE, TABLET]]
            },{
                patterns:[/(nexus\s6p)/i],                                              // Huawei Nexus 6P
                defaults:[[MODEL], [VENDOR, 'Huawei'], [TYPE, MOBILE]]
            },{
                patterns:[/(microsoft);\s(lumia[\s\w]+)/i],                             // Microsoft Lumia
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            },{
                patterns:[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],                           // Microsoft Xbox
                defaults:[[MODEL], [VENDOR, 'Microsoft'], [TYPE, CONSOLE]]
            },{
                patterns:[/(kin\.[onetw]{3})/i],                                        // Microsoft Kin
                defaults:[[MODEL], [VENDOR, 'Microsoft'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
                    /mot[\s-]?(\w+)*/i,
                    /(XT\d{3,4}) build\//i,                                             // Motorola
                    /(nexus\s6)/i
                ],
                defaults:[[MODEL], [VENDOR, 'Motorola'], [TYPE, MOBILE]]
            },{
                patterns:[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                defaults:[[MODEL], [VENDOR, 'Motorola'], [TYPE, TABLET]]
            },{
                patterns:[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],    // HbbTV devices
                defaults:[[VENDOR], [MODEL], [TYPE, SMARTTV]]
            },{
                patterns:[/hbbtv.+maple;(\d+)/i],                                       // 有误差
                defaults:[[MODEL, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]]
            },{
                patterns:[/\(dtv[\);].+(aquos)/i],                                      // Sharp
                defaults:[[MODEL], [VENDOR, 'Sharp'], [TYPE, SMARTTV]]
            },{
                patterns:[
                    /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                    /((SM-T\w+))/i                                                      // Samsung
                ],
                defaults:[[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]]
            },{
                patterns:[
                    /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                    /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
                    /sec-((sgh\w+))/i
                ],
                defaults:[[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]]
            },{
                patterns:[/sie-(\w+)*/i],                                               // Siemens
                defaults:[[MODEL], [VENDOR, 'Siemens'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
                    /(nokia)[\s_-]?([\w-]+)*/i
                ],
                defaults:[[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]]
            },{
                patterns:[/android\s3\.[\s\w;-]{10}(a\d{3})/i],                         // Acer
                defaults:[[MODEL], [VENDOR, 'Acer'], [TYPE, TABLET]]
            },{
                patterns:[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],             // LG Tablet
                defaults:[[VENDOR, 'LG'], MODEL, [TYPE, TABLET]]
            },{
                patterns:[/(lg) netcast\.tv/i],                                         // LG SmartTV
                defaults:[[VENDOR], [MODEL], [TYPE, SMARTTV]]
            },{
                patterns:[
                    /(nexus\s[45])/i,                                                   // LG
                    /lg[e;\s\/-]+(\w+)*/i
                ],
                defaults:[[MODEL], [VENDOR, 'LG'], [TYPE, MOBILE]]
            },{
                patterns:[/android.+(ideatab[a-z0-9\-\s]+)/i],                          // Lenovo
                defaults:[[MODEL], [VENDOR, 'Lenovo'], [TYPE, TABLET]]
            },{
                patterns:[/linux;.+((jolla));/i],                                       // Jolla
                defaults:[[VENDOR], [MODEL], [TYPE, MOBILE]]
            },{
                patterns:[/((pebble))app\/[\d\.]+\s/i],                                 // Pebble
                defaults:[[VENDOR], [MODEL], [TYPE, WEARABLE]]
            },{
                patterns:[/android.+;\s(glass)\s\d/i],                                  // Google Glass
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, WEARABLE]]
            },{
                patterns:[/android.+;\s(pixel c)\s/i],                                  // Google Pixel C
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, TABLET]]
            },{
                patterns:[/android.+;\s(pixel xl|pixel)\s/i],                           // Google Pixel
                defaults:[[MODEL], [VENDOR, 'Google'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /android.+(\w+)\s+build\/hm\1/i,                                    // Xiaomi Hongmi 'numeric' models
                    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
                    /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i    // Xiaomi Mi
                ],
                defaults:[[MODEL], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]]
            },{
                patterns:[/android.+a000(1)\s+build/i],                                 // OnePlus
                defaults:[[MODEL], [VENDOR, 'OnePlus'], [TYPE, MOBILE]]
            },{
                patterns:[
                    /\s(tablet)[;\/]/i,                                                 // Unidentifiable Tablet
                    /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
                ],
                defaults:[[TYPE], [VENDOR], [MODEL]]
            }

        ],
        engineRules:[
            {
                patterns:[/windows.+\sedge\/([\w\.]+)/i],                               // EdgeHTML
                defaults:[[VERSION], [NAME, 'EdgeHTML']]
            },{
                patterns:[
                    /(presto)\/([\w\.]+)/i,                                             // Presto
                    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
                    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
                    /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
                ],
                defaults:[[NAME], [VERSION]]
            },{
                patterns:[/rv\:([\w\.]+).*(gecko)/i],                                   // Gecko
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
                    res[defaults[i][0]] = tmp[++i];
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

    // 导出到window， start
    window.uaFormat = uaFormat;

})(window);