ngAws
=====

Amazon Web Services implementation for Angular

Usage
=====

1. Include script

```html
<script src="scripts/services/ngAws.js"></script>
```

2. Configure at app.js
```javascript
'use strict';

angular.module('awsApp', [
  'ngAws',
  'ngFacebook',
])

.config(function ($facebookProvider, $awsProvider) {

  $awsProvider.setArn('arn:aws:iam::007894316138:role/facebook-normal-user');

  $facebookProvider.setAppId('your_app_id_here');
})
```

3. Set token
```javascript
$aws.setToken($facebook.getAuthResponse().accessToken, 'graph.facebook.com')
  .then(function (val) {
    console.log(val);
  })
```
