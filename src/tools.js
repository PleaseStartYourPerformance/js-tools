'use strict';
const toString = Object.prototype.toString;
/**
 *
 * @description 判断是否数组类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isArray(val) {
    return Array.isArray ?
        Array.isArray(val) :
        toString.call(val) === "[object Array]";
};

/**
 *
 * @description 判断是否字符串类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isString(val) {
    return typeof val === "string";
};

/**
 *
 * @description 判断是否数字类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isNumber(val) {
    return typeof val === "number";
};

/**
 *
 * @description 判断是否undefined类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isUndefined(val) {
    return typeof val === "undefined";
};

/**
 *
 * @description 判断是否object类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isObject(val) {
    return val !== null && toString.call(val) === "[object Object]";
};

/**
 *
 * @description 判断是否Date类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isDate(val) {
    return toString.call(val) === "[object Date]"
};

/**
 *
 * @description 判断是否Function类型
 * @export
 * @param {object} val
 * @returns {boolean}
 */
export function isFunction(val) {
    return toString.call(val) === '[object Function]';
};

/**
 *
 * @description 去除空格
 * @export
 * @param {String} val
 * @returns {String}
 */
export function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
};

/**
 *
 * @description 数组遍历
 * @export
 * @param {Object|Array} obj
 * @param {Function} fn
 */
export function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    };
    if (typeof obj !== 'object') {
        obj = [obj];
    };
    if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj)
        }
    } else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj)
            }
        }
    }
};

/**
 *
 * @description 合并对象
 * @export  {Object} obj1
 * @returns {Object}
 */
export function merge( /* obj1, obj2, obj3, ... */ ) {
    var result = {};

    function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === "object") {
            result[key] = merge(result[key], val);
        } else {
            result[key] = val;
        }
    };
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    };
    return result;
};

/**
 * @description 实现es6 bind函数
 *
 * @export
 * @param {function} fn
 * @param {object} thisArg
 * @returns {function}
 */
export function bind(fn, ctx, arg) {
    return function() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        };
        if(arg)return fn.apply(ctx, arg);
        return fn.apply(ctx, args);
    };
};

/**
 * @description 扩展对象
 * @param {Object} a
 * @param {Object} b
 * @param {Object} thisArg
 * @return {Object}
 */
export function extend(a, b, arg) {
    forEach(b, function(val, key) {
        if (arg && typeof val === 'function') {
            a[key] = bind(val, arg);
        } else {
            a[key] = val;
        }
    });
    return a;
};

/**
 *
 * @description 过滤数组
 * @export
 * @param {object} arr
 * @param {function} fn
 * @returns {array}
 * @example
 *
 *      filter([{name:1},{name:2}],item=>item.name===2) ==>[{name:2}]
 */
export function filter(arr, fn) {
    var result = [];
    forEach(arr, function(item, index) {
        if (fn.call(null, item, index)) {
            result.push(item);
        }
    });
    return result;
};

/**
 * @description 数组map
 * @param arr
 * @param cb
 * @param arg
 * @return {T[]}
 * @example
 *
 *      map([1,2,3],(item,index)=>item+index) ==>[1, 3, 5]
 */
export function map(arr, cb, arg) {
    var length, value,elems=arr,
        i = 0,
        ret = [];

    if (isArray(elems)) {
        length = elems.length;
        for (; i < length; i++) {
            value = cb(elems[i], i, arg);

            if (value != null) {
                ret.push(value);
            }
        }

    } else {
        for (i in elems) {
            value = cb(elems[i], i, arg);

            if (value != null) {
                ret.push(value);
            }
        }
    }

    return Array.prototype.concat.apply([], ret);
};

/**
 *
 * @description 函数防抖
 * @export {debounce}
 * @param {function} fn
 * @param {number} wait
 * @returns {function}
 */
export function debounce(fn, wait) {
    var time;
    return function() {
        if (time) {
            clearTimeout(time);
            time = null;
        };
        time = setTimeout(fn, wait)
    }
};

/**
 * @description 函数节流
 * @export {throttled}
 * @param {function} fn
 * @param {number} wait
 * @returns {function}
 */
export function throttled(fn, wait) {
    var start;
    return function() {
        var arg = Array.prototype.slice(arguments);
        if (start) return false;
        start = true;
        setTimeout(function() {
            fn.apply(null, arg);
            start = null;
        }, wait);
    }
};

/**
 *
 * @description 获取对象key集合
 * @export
 * @param {object} val
 * @returns {array} val键集合
 */
export function keys(val) {
    var result = [];
    if (!isObject(val)) return;
    forEach(val, function(item, key) {
        result.push(key)
    })
    return result;
};

/**
 *
 * @description 扁平化数组 [{key:[]}]=>[[],[]]
 * @export
 * @param {Array} 需要进行扁平化处理的数组对象
 * @returns {Array} 返回处理后的本地新数组
 */
export function delayer(arr, deep) {
    var result = [];
    forEach(arr, function(item) {
        if (isArray(item)) {
            return result = result.concat(delayer(item));
        } else if (isObject(item)) {
            result.push(item);
            forEach(item, function(val) {
                result = result.concat(delayer(val))
            });
            return
        }
    });
    return result;
};

/**
 *
 * @description 根据url参数转换为对象格式
 * @export
 * @param {string} search
 * @returns {object} paramsObj
 */
export function urlToObject(search) {
    var paramsObj = {};
    if (!/^\?/.test(search)) return null;
    var params = search.replace(/^\?/, '').split("&");
    forEach(params, function(item) {
        if (item.indexOf("=") === -1) {
            paramsObj[item] = null;
        } else {
            var spl = item.split('=');
            paramsObj[spl[0]] = decodeURI(spl[1]);
        }
    });
    return paramsObj;
};

/**
 *
 * @param url 路径
 * @param params 需要拼接到url的参数对象
 * @return {string}
 */
export function buildUrlParams(url,params){
    if(!params)return url;
    let p=[];
    keys(params).forEach(key=>{
        p.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    });
    return  url += (url.indexOf('?') === -1 ? '?' : '') + p.join('&');
}


/**
 *
 * @description 获取俩个数组取不同元素
 * @export
 * @param {array} arr1
 * @param {array} arr2
 * @returns {array } 返回不同元素集合
 */
export function difference(arr1, arr2) {
    var difference = [];
    var maxLength = arr1.length > arr2.length ? arr1 : arr2;
    var minLength = arr1.length > arr2.length ? arr2 : arr1;
    if (!arr1.length || !arr2.length) return difference; //一个参数数组为空说明没有交集
    difference = filter(maxLength, function(item) {
        return minLength.indexOf(item) === -1;
    })
    return difference;
};

/**
 * @description 把函数实体转为字符串
 * @export
 * @param {function} fn
 * @returns {string}
 */
export function stringifyFn(fn) {
    return Function.prototype.toString.call(fn)
};

/**
 * @description 获取函数参数列表
 *
 * @export
 * @param {function} fn
 * @returns {string} 参数字符串
 */
export function extractArgs(fn) {
    var ARROW_ARG = /^([^(]+?)=>/;
    var FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;
    var fnText = stringifyFn(fn);
    var arg = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
    return arg[1];
}

/**
 * @description 根据数组路径查找对象内部值
 * @param arr 要查找的属性集合
 * @param obj 要查找的对象
 * @returns {*} 有返回值，无返回undefined
 * @example
 *
 *  var obj={a:{b:{c:2}}};
 *  var arr=['a','b','c'];
 *  var arr1=['a','b','d'];
 *  path(arr,obj) ===> 2
 *  path(arr1,obj) ===> undefined
 */
export function path(arr,obj) {
    var val=obj,
        index=0,
        len=arr.length;
    while(index<len){
        val=val[arr[index]];
        index+=1;
    };
    return val;
}

/**
 * @description 实现数组原生concat
 * @param arr1
 * @param arr2
 * @returns {Array}
 * @example
 *
 *  concat([1],[2,1]) ==>[1,2,1]
 *
 */
export function concat(arr1,arr2) {
    var index=0,
        result=[];
    while (index<arr1.length){
        result[index]=arr1[index];
        index+=1;
    };
    index=0;
    while (index<arr2.length){
        result[result.length]=arr2[index];
        index+=1;
    };
    return result;
}

/**
 * @description 查找对象是否存在制定属性，有，返回值，无undefined
 * @param key
 * @param obj
 * @returns {*}
 * @example
 *
 *  prop('name',{name:2}) ==>2
 *  prop('name',{age:12}) ==>undefined
 *
 *  prop(1,[1,2,3]) ==> 2
 *
 */
export function prop(key,obj) {
    return path([key], obj);
}

/**
 * @description 函数柯里化
 * @param fn
 * @returns {f}
 */
export function curry(fn) {
    return function f() {
        if(arguments.length===0){
            return f;
        }else{
            return fn.apply(this, arguments);
        }
    }
}
/**
 * @description 函数柯里化
 * @param fn
 * @returns {f}
 */
export function curry2(fn) {
    return function f2(a) {
       switch (arguments.length){
           case 0:
               return f2;
           case 1:
               return curry(function (a) {return fn(a)});
           default:
               return fn.apply(this,arguments)
       }
    }
}

/**
 * @description 提取制定属性得值集合
 * @param fn
 * @returns {f}
 * @example
 *  pluck(1,[[1,2,3,4]]) ==>[2]
 *  pluck('val',{a:{val:2},b:{val:4}}) ==>[2,4]
 */
export function pluck(key,obj) {
    return map(obj,function (item) {
        return  prop(key, item);
    })
}

/**
 * @description 获取所有对象得值
 * @param obj
 * @returns {Array}
 * @example
 *
 *  values({a:2,b:3}) ==>[2,3]
 */
export function values(obj) {
    var key=keys(obj),
    index=0,
    result=[],
    lens=key.length;
    while (index<lens){
        result[index]=obj[key[index]];
        index+=1;
    };
    return result;
}

/**
 * @description
 * @param prop
 * @param val
 * @param obj
 * @return {}
 * @example
 *
 *  assign('name',3,{age:2}) ==> {name:3,age:2}
 */
export function assign(prop, val, obj) {
    var result = {};
    for (var p in obj) {
        result[p] = obj[p];
    }
    result[prop] = val;
    return result;
};
/**
 * @description 四舍五入保留小数,不足以0补齐
 * @param number
 * @param number
 * @return str 
 * @example
 *  
 *  Round(12,2) ==> "12.00" Round(12.546,2) ==> "12.55"
 */
export function Round(v,w){
      v = v+''
      let siz = 1
      for (let index = 0; index < w; index++) {        
        siz += "0"
      }
      var s = ''
        if (isNaN(v)) return false;
        var rs = v.indexOf('.');
        if(rs>0){
          var b = v.split('.');
          // if(/^[0]+$/.test(b[1])){
          //   v = b[0]
          //   return Round(v,w)
          // }
          var f = Math.round(('8.'+ b[1])*siz)/siz;
          var ts  = f.toString().split('.')[1]
          if(!ts){
            ts = ''
            for (let index = 0; index < w; index++) {    
              ts += '0'
            }
          }else if ( ts.length < w){
            const mix =  w - ts.length
            
            for (let index = 0; index < mix; index++) {    
              ts += '0'
            }
          }
          s = b[0]+'.'+ ts
        }else{
          rs = v.length;
          v += '.';
           while (v.length <= rs + w) {
            v += '0';
         }
         s = v
        }
        return s; 
};