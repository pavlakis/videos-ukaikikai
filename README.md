# JS Integrity

Generate a hash on each change of videos.js

```
 openssl dgst -sha384 -binary public/js/videos.js | openssl base64 -A
```