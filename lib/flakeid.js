"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _hex2dec = require("./hex2dec");

var FlakeId =
/*#__PURE__*/
function () {
  function FlakeId(options) {
    (0, _classCallCheck2.default)(this, FlakeId);
    options = options || {};
    this.seq = 0;
    this.mid = (options.mid || 1) % 1023;
    this.timeOffset = options.timeOffset || 0;
    this.lastTime = 0;
  }

  (0, _createClass2.default)(FlakeId, [{
    key: "gen",
    value: function gen() {
      var time = Date.now(),
          bTime = (time - this.timeOffset).toString(2); //get the sequence number

      if (this.lastTime == time) {
        this.seq++;

        if (this.seq > 4095) {
          this.seq = 0; //make system wait till time is been shifted by one millisecond

          while (Date.now() <= time) {}
        }
      } else {
        this.seq = 0;
      }

      this.lastTime = time;
      var bSeq = this.seq.toString(2),
          bMid = this.mid.toString(2); //create sequence binary bit

      while (bSeq.length < 12) {
        bSeq = "0" + bSeq;
      }

      while (bMid.length < 10) {
        bMid = "0" + bMid;
      }

      var bid = bTime + bMid + bSeq;
      var id = "";

      for (var i = bid.length; i > 0; i -= 4) {
        id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
      }

      return (0, _hex2dec.hexToDec)(id);
    }
  }]);
  return FlakeId;
}();

exports.default = FlakeId;
module.exports = exports.default;