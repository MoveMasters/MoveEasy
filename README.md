# MoveKick
> An app to enable rapid remote surveying for moving companies.

## Motivation

Moving is a painful process. Moving companies depend on site visits to the transferee's home and create a moving itenarary. MoveKick is here to replace the painful and time consuming in-person surveying process with a streamlined app for remote surveying.

## Team

  - __Product Owner__: Erik Suddath
  - __Scrum Master__: Stephen Cefali
  - __Development Team__: Joe Lee


## Product

- Desktop client for the mover running React
- Mobile client for the transferee running React Native
- Server to manage the WebRTC video and chat between clients
- General purpose server to mange the rest


## How it Works
- Transferee downloads the MoveKick app from the iTunes app store
- Transferee picks an available timeslot from the movers schedule for a survey
- At the survey time, the transferee connects to the mover through the app to begin the video survey
- The transferee walks through their home, taking photos of items that need to be moved
- Utilizing cutting edge image recognition, the app can determine the type and size of the item and add it to the moving itenerary



## Development Requirements

- Node
- Xcode

## Setup

### Server
- npm install
- Set environment variables for:
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  CLARIFAI_CLIENT_ID,
  CLARIFAI_CLIENT_SECRET
- Instructions for Mac:
  http://osxdaily.com/2015/07/28/set-enviornment-variables-mac-os-x/
- For other operating systems, look online

### Client
- cd clientV2
- bower install && npm install

### Mobile
- cd mobile && npm install
- npm start (starts the React Native Packager)
- Manually click through files Finder -> MoveKick -> mobile -> ios -> mkmobile.xcodeproj (opens the project in Xcode)
- Build the project
- Check if the project opens up in the simulator. If so..
- In Xcode, click Xcode -> Preferences, then click the Accounts tab
- Press the '+' symbol, and enter your Apple developer credentials
- Go to General tab in the Xcode workspace settings and change your Development Team profile to whatever Apple developer account you are using
- After the credentials have loaded and you updated your Development Team, click Product -> Archive, and wait for your project to build for a really, really long time.
- When finished building, a window will pop-up with Archives/Crashes tabs. Under the 'Upload to App Store' button On the right, click the 'Export' button
- Select 'Save for Development Deployment'
- Choose your developer account from the drop-down menu
- Choose 'Export one app for all compatible devices'
- After finished loading, save folder to Desktop (or anywhere you want to access)
- In Xcode, click Window -> Devices, and choose your device
- If a version of the app already exists on your phone, delete it by clicking the app then clicking the '-'
- Otherwise, click the '+' and choose the correct version of the app you just archived. The app should have a '.ipa' extension (check the time it was created to be sure its the right version)

## Usage

### Server
- npm start

### Client
- cd clientV2
- npm start
- Open browser to URL

### Mobile
- Open up app on phone







