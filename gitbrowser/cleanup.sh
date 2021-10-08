cd android &&
./gradlew clean &&
cd .. &&
rm -rfv $TMPDIR/metro-* && 
rm -rfv $TMPDIR/haste-* && 
watchman watch-del-all && 
npm cache clean --force && 
npm cache verify &&
rm -rfv ios/build &&
rm -rfv ios/Pods &&
rm -rfv node_modules/ &&
yarn install
cd ios
pod install
