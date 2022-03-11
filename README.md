# daily-commit-checker

1. Github 프로필에서 `Private contribuitions` 체크
<img width="422" alt="image" src="https://user-images.githubusercontent.com/22270321/157908986-8fa9e8bf-7ceb-4a1a-ab21-b18825cab497.png">


2. `users.js`에 github nickname과 slack member id 추가
```js
// users.js
const users = [
    ...
    '$GITHUB_NICKNAME:$SLACK_MEMBER_ID'
]
```
