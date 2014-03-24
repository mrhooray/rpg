# rpg [![Build Status](https://travis-ci.org/mrhooray/rpg.png?branch=master)](https://travis-ci.org/mrhooray/rpg)
> (pseudo)random password generator

## Installation
### browser
```html
<script src="rpg.js" type="text/javascript"></script>
```
### node
```shell
$ npm install rpg
```

## Usage
```javascript
rpg()                                               // > '=TM;:XUv78M['
rpg({length: 16})                                   // > '&[(OF~Kk,-8TNF0H'
rpg({length: 16, set: 'lud'})                       // > '1G7elTEr6kU5dWBP'
rpg({length: 16, set: 'lud', exclude: '123456789'}) // > 'dgomcPCg0RJsYWrx'
```

##API
###rpg([options])

####options.length
Type: `Number`  
Default: `12`

length of the generated password

####options.set
Type: `String`  
Default: `ludp`

character set of password generation  
combination of l(lower case), u(upper case), d(digit), p(punctuation)

####options.exclude
Type: `String`  
Default: ``

characters to be excluded from generation

## License
MIT
