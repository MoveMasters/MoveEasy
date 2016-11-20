# MoveKick
> An app to enable rapid remote surveying for moving companies.

Moving is a painful process. Moving companies depend on sending their employees out to survey the transferee's home and create a moving itenarary. MoveKick is here to replace the painful and time consuming in-person surveying process with a streamlined app for remote surveying.

## Process
- Transferee downloads the MoveKick app from the iTunes app store
- Transferee picks an avaialbe timeslot from the movers schedule for a survey
- At the survey time, the transferee connects to the mover through the app to begin the video survey
- The transferee walks through their home, taking photos of items that need to be moved
- Utilizing cutting edge image recognition software, the app can determine the type and size of the item and add it to the moving itenerary



## Team


  - __Product Owner__: Erik Suddath
  - __Scrum Master__: Stephen Cefali
  - __Development Team__: Joe Lee


## Table of Contents

FIX ME


## Product

- Desktop client for the mover running React
- Mobile client for the transferee running React Native
- Server to manage the WebRTC video and chat between clients
- General purpose server to mange the rest


## USAGE

#Mobile
- cd mobile && npm install
- npm start (starts the React Native Packager)
- Manually click through files Finder -> MoveKick -> mobile -> ios -> mkmobile.xcodeproj (opens the project in Xcode)
- Build the project
- Check if the project opens up in the simulator. If so..
- In Xcode, click Xcode -> Preferences, then click the Accounts tab
- Press the '+' symbol, and enter your Apple developer credentials
- After the credentials have loaded, click Product -> Archive, and wait for your project to build for a really, really long time.
- When finished building, a window will pop-up with Archives/Crashes tabs. On right, click Export under the blue 'Up to App Store' button
- Select 'Save for Development Deployment'
- Choose your developer account from the drop-down menu
- Choose 'Export one app for all compatible devices'
- After finished loading, save folder to Desktop (or anywhere you want to access)
- In Xcode, click Window -> Devices, and choose your device
- If a version of the app already exists on your phone, delete it by clicking '-'
- Otherwise, click the '+' and choose the correct version of the app you just archived (check the time it was created to be sure)



## REQUIREMENTS

- Node
- Mongo


## Develepmont

### Installing Dependencies
#### Server



### Roadmap



## Contributing
