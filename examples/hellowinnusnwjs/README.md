At the present time, this example does not contain necessary gulp to produce painless nw.js and nw.builder.

In the meantime, one has to use the following.

```
winnus\examples\hellowinnusnwjs\nwapp\node_modules\winnus>nw-gyp rebuild --target=0.18.2 --arch=x64
winnus\examples\hellowinnusnwjs\nwapp>nw --enable-logging=stderr .
```

Note:
-  nw.js 0.18.2 is used as last release of nw.js before node v7