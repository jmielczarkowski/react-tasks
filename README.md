# react-tasks
Contains task apps in react native

# gitbrowser 

Contains sample mobile application (iOS and Android) that pulls data from GitHub public repositories using REST API / Octokit client. Allows user browse repository issues and save comments on selected ones. Saved comments are stored locally and will be restored automatically. 

## requirements

- Mac running node-v16.10.0 (or try use latest);
- xCode 12.5.1 (or try use latest);
- latest Android SDK;
- (optional) Yarn for packages;

## deployment

1. Clone repository
2. Install packages (for example: npm install)
3. Install pods (for example: cd ios / pod install) 
4. Run app on iOS: react-native run-ios
5. Run app on Android: react-native run-android

! There's script called 'cleanup.sh' that allows to perform full cleanup

# project structure

- scenes
	- SelectRepository (root)
	- IssueList
	- IssueDetails
- services
	- StorageService
- helpers
	- regexValidator
- components/atoms
	- rowSeparatorView

## remarks 
- Tested on iPhone 11 Pro Max (14.7.1) and Huawei P20 Lite (Android 7);
- Doesn't support offline version; 
- Not suitable for store certification (missing assets, icons etc.);

## demo

![Demo](https://i.ibb.co/wz7rwYH/417a736e18e4516a43358b1f2106302afc9b956f.gif)