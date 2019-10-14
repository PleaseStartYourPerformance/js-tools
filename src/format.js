'use strict';

function DateFomat(date, fmt){
	this.date = (!date ? new Date() : (typeof date === 'number' ? new Date(date) : date));
    this.default = fmt || "yyyy MM dd HH:mm:ss w";
    this.pad = function(val) {
        var len = 2;
        val = val.toString();
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    };

    this.dayName = function(index) {
        var dateNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return dateNames[index];
    };
    var _ctx=this;
    this.dateType = {
        "yyyy": function(dateObj) {
            return dateObj.getFullYear();
        },
        "MM": function(dateObj) {
            return _ctx.pad(dateObj.getMonth() + 1);
        },
        "dd": function(dateObj) {
            return _ctx.pad(dateObj.getDate());
        },
        "HH": function(dateObj) {
            return _ctx.pad(dateObj.getHours());
        },
        "mm": function(dateObj) {
            return _ctx.pad(dateObj.getMinutes());
        },
        "ss": function(dateObj) {
            return _ctx.pad(dateObj.getSeconds());
        },
        "w": function(dateObj) {
            return _ctx.dayName(dateObj.getDay());
        }
    };

}
DateFomat.prototype.format = function(fmtDate){
    var parse = /yy(?:yy)|d{2}|MM|HH|[aA]|w+|[yMdHmsw]+|"[^"]*"|'[^']*'/g;
    var _this = this;
    return this.default.toString().replace(parse, function($0) {
        return $0 in fmtDate && fmtDate[$0](_this.date);
    });
}


export default function format(date, fmt){
    var formatObj=new DateFomat(date, fmt);
    return {
        date: formatObj.format.call(formatObj, formatObj.dateType)
    }
};