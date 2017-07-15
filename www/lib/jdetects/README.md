jdetects(^^)
======

[![Build Status](https://img.shields.io/travis/zswang/jdetects/master.svg)](https://travis-ci.org/zswang/jdetects)
[![NPM version](https://img.shields.io/npm/v/jdetects.svg)](http://badge.fury.io/js/jdetects)

## 概述

Detect if DevTools is open

@see https://github.com/sindresorhus/devtools-detect

## examples

```js
jdetects.create(function(status) {
  document.querySelector('#devtool-status').innerHTML = status;
});
```