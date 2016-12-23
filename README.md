# PokeQuiz

### building on iOS

- Open `ios/YourApp/AppDelegate.m`
- Uncomment the line, `jsCodeLocation = [[NSBundle mainBundle] ...`

### troubleshooting:

For the iOS build, it won't find the `node` binary by default if you're using
`n` to manage node versions. Open up the following file:

```
node_modules/react-native/packager/react-native-xcode.sh
```

and insert the following to fix it:

```
export PATH=$HOME/local/bin:$HOME/n/bin:$PATH
```

Disable dead code stripping for Release per the following issue:
https://github.com/facebook/react-native/issues/2685#issuecomment-142626306
