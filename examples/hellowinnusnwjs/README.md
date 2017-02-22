# hellowinnusnwjs

Some basic help for tackling nw.js and native modules.

At the present time, this example is neither complete or painless due to the Node of Things (NoT).

## The basics

Download and unzip the SDK version of <https://nwjs.io/> in c:\nwjs and make sure one has a path to nw.exe

Start nw.exe and note the version nr (target), for future reference. Also note the node version it is based on.

Dependant on needs and NoT, there can be swings and roundabouts concerning if the node.exe and nw.exe are based on the same version.
For the "sweet spot", consult <https://nwjs.io/versions.json>.

Try the following for ensuring a good start, replace target version with the one on the downloaded nw.js SDK.
Arch is dependant on the machine used.

The expected result is a nw.js window with some contents from a simple usage of winnus.

```bash
winnus\examples\hellowinnusnwjs\nwapp>npm install
winnus\examples\hellowinnusnwjs\nwapp\node_modules\winnus>nw-gyp rebuild --target=0.18.2 --arch=x64
winnus\examples\hellowinnusnwjs\nwapp>nw --enable-logging=stderr .
```

The example, and this README.md will be improved over time, in the meantime PR's are welcome.

## [nw.js and native modules](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/)

nw.js has a reference to native modules that is ... interesting reading, and is one's next step into the NoT.