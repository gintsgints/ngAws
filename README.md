ngAws
=====

Amazon Web Services implementation for Angular

Usage
=====

* Include scripts

```html
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.0.0-rc.14.min.js"></script>
<script src="scripts/services/ngAws.js"></script>
```

* Configure at app.js
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

* Set token
```javascript
$aws.setToken($facebook.getAuthResponse().accessToken, 'graph.facebook.com')
  .then(function (val) {
    console.log(val);
  })
```
