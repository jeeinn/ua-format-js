# ua-format-js
重复造轮子，一个userAgent解析器(参考UAParser.js)

Another wheel，refer to the UAParser.js

致力于更符合中国特色的浏览器`userAgent`字符串识别与探测！欢迎添砖加瓦
* 作者 : jeeinn <thinkwei2012@gmail.com>
* 演示地址 : [http://faisalman.github.io/ua-parser-js](http://faisalman.github.io/ua-parser-js)(暂时厚颜无耻的使用UAParser.js的)
* 源代码  :  [https://github.com/jeeinn/ua-format-js](https://github.com/jeeinn/ua-format-js)
* 许可  :  GPLv2 & MIT

## 方法

1. `setUA()`
2. `getUA()`
3. `getOS()`
4. `getBrowser()` 
5. `getDevice()`
6. `getEngine()`
7. `getResult()`
8. ~~getCPU()~~

## 注解

调用`getOS()`、`getBrowser()`、`getEngine()` 返回 `{ name:'', version:'' }`
 
调用`getDevice()` 返回 `{ type:'', model:'', vendor:'' }` 
* 'device.type'可能值，支持自定义:
`desktop、mobile、tablet、smarttv、wearable、embedded、console`

* 'device.vendor'可能值，支持自定义:
`Meizu、Samsung、Lenovo、Acer、Alcatel、Amazon、HP、
HTC、Huawei、Jolla、LG、Microsoft、Motorola、Nexian、
Apple、Nintendo、Nokia、Nvidia、Ouya、Palm、Panasonic、
Archos、Asus、BenQ、BlackBerry、Dell、GeeksPhone、Google、
Polytron、RIM、Sharp、Siemens、Sony-Ericsson、Sprint、Xbox、
ZTE`

* 'device.model' 动态解析，支持自定义

## 规则

在`src/ua-format.js`的`uaRules`对象中添加相应的解析规则

如`getOS`方法中的`os`的相应信息，在`osRules`中添加如下一个规则对象
```
{
  patterns:[/microsoft\s(windows)\s(vista|xp)/i],                  // Windows (iTunes)
  defaults:[[NAME,'Windows'],[VERSION]]
}
```
* patterns是正则表达式数组（允许多个）
* defaults是默认值数组（二维表示自定义值，自定义值优先使用）

## 例子
```html
<!doctype html>
<html>
<head>
<script type="text/javascript" src="ua-format.min.js"></script>
<script type="text/javascript">

	var formater = new uaFormat();

    // 默认使用当前浏览器: window.navigator.userAgent
    console.log(formater.getResult());
    /*
    /// 输出结果:
    {
        ua: "",
        browser: {
            name: "",
            version: ""
        },
        engine: {
            name: "",
            version: ""
        },
        os: {
            name: "",
            version: ""
        },
        device: {
            model: "",
            type: "",
            vendor: ""
        }
    }
    */

    // 自定义ua
    var uaString = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
    formater.setUA(uaString);

    var result = formater.getResult();

    console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    console.log(result.device);         // {model: "", type: "", vendor: ""}
    console.log(result.os);             // {name: "Ubuntu", version: "11.10"}
    console.log(result.os.version);     // "11.10"
    console.log(result.engine.name);    // "WebKit"

    var uaString2 = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';
    //链式调用
    console.log(formater.setUA(uaString2).getDevice().model); // "PlayBook"
    console.log(formater.getOS());                            // {name: "RIM Tablet OS", version: "1.0.0"}
    console.log(formater.getBrowser().name);                  // "Safari"

</script>
</head>
<body>
</body>
</html>
```

## 更新
* v0.0.1 - 2017/3/8
    1. 实现同原理的`UAParser.js`
    2. 复制`UAParser.js`的所有正则内容
    3. 无结果时默认为`unknown`
    
## To Do

1. 增加国内常见手机端ua
2. 让 npm 也能安装使用
3. 精简不常用ua
4. 增加自己的演示地址

## 打赏

<img align="center" src="http://jeeinn.com/wp-content/uploads/2017/03/1489039735080-198x300.jpg" alt="支付宝打赏" />

<img align="center" src="http://jeeinn.com/wp-content/uploads/2017/03/mm_facetoface_collect_qrcode_1489039635122-215x300.png" alt="微信打赏" />

## 鸣谢
* UAParser.js [https://github.com/faisalman/ua-parser-js](https://github.com/faisalman/ua-parser-js)
* 所有给star的开发者