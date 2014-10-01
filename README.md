$async
======

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Just to give the javascript thread an opportunity to trigger any other events that may be waiting in the queue.

* [Triangular](http://triangular.io)

***

Installation and use
--------------------

```
bower install tri-angular-async
```


- Add script to your main html file (normal - '/dist/triangular-async.js' or minified - '/dist/triangular-async.min.js').
- Add `triNgAsync` module as dependency to your modules.

Now you can inject `$async` in any service/controller:

```
$async(function () {
    console.log('b');
});
console.log('a');
```

will output:

```
'a'
'b'
```

Also $rootScope.$digest() will be called just after callback passed to $async().

