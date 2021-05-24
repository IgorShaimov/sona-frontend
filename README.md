# sona-frontend

Vue + Capacitor Web/Mobile time reminder app for Patient

![image](https://user-images.githubusercontent.com/78730881/112019562-fb99d100-8b48-11eb-8c99-f5d3b3a08611.png)

## Project setup
1. Run command `yarn install` to install npm packages
2. Rename .env.example to .env
3. Make sure you have sona-api running on your local on port `8000`

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build

npx cap add android
npx cap open android

npx cap add ios
npx cap open ios
```

### Lints and fixes files
```
yarn lint
```
