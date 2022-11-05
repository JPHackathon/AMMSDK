import axios from 'axios';
import WeaveDB from 'weavedb-sdk';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var kty = "RSA";
var n = "s6p-O9R4xhBLArgxguDjaLFXH5TPQokFt6LQ--L8CNz2vLW0tWchu9bTTTWELtZ1QqdYQu1XlkafexmkdT9qslHVoklAyNMeFBLhOR-AqTaoF4WFQbWTiRitiqE9IhSBLcpVyhfjsT1FkO6h2miW7sdIr1x-NCQyqFMeqwN9ALCSMlVwXLqNNjRnYCghbqN9F0G47h4VNRs9YJBAUwCVaVyatqSUPecBmVu4Mdnn2pT3aetlSwlAFIQdhWd9dklEasml7QSiQ2YvdfRfJ1KTQi5BSWIQZf5aoUSsdzWndAlT-ySYqp02d_J0LX6eSjmE0lOhRfokPii6OzbyInHr5fIHh9_YBzv8Y9EMyT7Jh_nEzZj9lYtBUQ7BDjtFNYfiEgJcMKly6r30fOiAbeFi3fFNIFWeh_PULLwVZG7HEi-aO6-kGlplBMDIDSPO2zVOFx6Rn7tfpcJxGCD1m-KO7IFOtGOCScQXhvA_IhWV6PLxESs20HRLaTKXYIdnPUgJlwilEZRZfkF6jHelNS3L6LFUtgqn9n8OV9JXn8YreQk94NCL2qmYVQZcAQJUBfWqi7zKWVSZV3eyRL8aUvAZu0j1HJGvflSOcX_Q_XOpn4XOmFLT3kjhCe3fqv3elyCOTriHiTKqrAzBqzmWBAbwY-L_JCzSSFIA81ofKqF-mHE";
var e = "AQAB";
var d = "LrKfwNlG0uQlOv25ELV3Jh0B8hlxjW-j5skQ3IdwzrTwBLiN0aCOqg36OdUxGCNxsvNgA3VBELQme458qmTjTJnslxPHHOuSo9EMbRZ9EH4-Tm7L5fpV8IpTgPbLtvHxaX9vsOloqwar8DG2K9iHcmSlxb6apt7Js-p2zChJ80XxmdePLurmDTKts9Z6ahFgUA0rDekPxg_gchrMPUanjw0cwWAhj71dMwkd5QcoNi4F6KfgWhJ7b1mvep8dgwMkH0VuNR7BNhd3OodbvBLAZ7EyEurELF5iHAyHbyyo64YJJ_upGp9mKuL_w1tntQ8iMLC_-Do99VIMpZtwb_eAQoKCrfQhMGeIleWGdA3KY_uQdGdAI-XyjymAdxEdJhyNPlY2VjigUPEPt9jzY012nIHM6RfkIhpMNA1_-q1KnS_hrlia6RqMAdYKr3u2Lofc-mZnYbP0wh6b7m1ik3YwZHOxB1e2GatWwmeP8ERgZgN1gyvoZUnEh0KJG93gaTSP7U8j-2xQCNz3jXmQXgbhZW1t8J2O-VoZf25J2fJbM7-3XQPCWOxyFvVt7HuIWsD1lnhW4E6z_brKad0je5_GMwVh7L5-3F8Z4q65THd0vWctPTVwrzKXhO8J-6zNWqLW57zEQ_S7S4VkorBI7vKSgnXDjkQnf25WQXwpxmGwLAE";
var p = "35oQhruFFn0CHw-My_OC7HF4xLXQ2wGc1Gl7er4iq_be3_ij5Dr2toy7kbMYbp5BzdcDPBelHUmCxcNubW5gpiFWF6ExQXwJJ1pYuDKJpHUrNmGw6xB9ePReFsfqtpKwTBT_RxrltWRxUJ-Mz5NUn7fLBCioYnRQTvwVxlblVBMrF9lyrSQF3eMcnwEC30ruhHcpWhtBjco2cne8PqtrNlOa1L2Rlcr0PMigOt6ad887cUaZn3ZGw7hBFdINWI9foTe4H_8EdCndhXXiRMU0KYDOE65vZZJFoPfgpRVyXQ8V0hpkKgsvupxMWWtP6RJs7l_gACcPwT5z115dUx5NkQ";
var q = "zbK96ThVaPY819ONeuJ_PJHC54JNmWXzWQlTL8wgoUGSXWG1uW2NZE2fH6DBMRf1u9ygYQPs7lAEMwkwY1CKbLllmsH9ms1S-dCw_OI6kjUS7lJ_Vxw9IF4kg4kk-NReiEg9YXRTLGuFdnguJC9zDbUxF0gW54WgON_RL8qnaRRrxjbq6grcb3zzFzk6V-PzuwRaaTMAXuc6xr4CqnCaVDxo3REIcRXqdUf3C38QZcaFvQWOwAsaVvn5csw-NX7Vg8bby9Z8XzOlyvxJbizgC49Hk4ykIXS031ysZdCyTTo7R5J-zPCjHWSFL2d2HYtpQp8GgDPHT6jr-2pJyE-s4Q";
var dp = "h_D-wysWismNlJy7mPN_UYjbR5zSUZP1aR6IN-OI6Mu6TKi523QNsoZ1MuuTmw0ULLTf_pTRibC7lMhwRo-oqtfxo4QYkht65TYEYlg3XojtsK5MBV2NKxBGc8svY7hi_p51ZSFxLorWaZHW5gxIkqIHB4xAczsL6DlSc7c4zZipxmIpWiJgfropGHJg8Kh5woc_2MxhWnbqC0XIaMGG-QxzQYvPCybMvnerEp9rghO3q_KkS1J5S1ymFUITYxgnp7hcdPdyGb2qNA2rduv9_o2UvFp811_KfUa2iSc01GbreUUaSIVsiyOjN2oKt0TAfVxEr1MQPQhfHTz9uB7gQQ";
var dq = "iCLaCbZc4KDHV9gNdNzedMnLgsj8bp_I1I6VXbbtiYwKQH9gdB6LS20L-TS9Z66B1hmIk2yzrG2MufJE8hXl51s0YZ4uJ_voBKoX2OYo-YbixpQW7yIjWn60D9H-hCiZf_y_kvYX7fgjVmrnrs8wiEv4932gmw4XIk0O92BaN_Np-L9z7f3OMoMxp5cag_y73HRfGezFPAoxHkO3I_JuUX3BsT2Kpr1odMJyQEuSIKmo7Zb2CSfQAOxkKZP_QAx3Z0V_RoLnwWI_Qf6C4sYUadIj_wU_w1yoMIP3HVNoDjCR9yZ_gUdpzRQwCVWiGJ-hxJPXC5Y5PQGBXN3VgxsoQQ";
var qi = "R4tNIVW7rnOLYmWjAOlu1dni352WLdn93Nvn5hjFV1nBtaF0nzYgZ6nHe9fscSJo59z-CDEu5ASyBZx2mCao44nvMRdxooCJledOmNETgS5PyBTLyvm11YGKf5DuvpQNJfckr-0B9BCEbm7P95LeTA48CKhqxF6FckZDJoMbnDLu_K-BO7-wWGL4Yg_nnJGd26i47kIwClLtcE3xH60lURqp1k_5tLJxRLCNYUnWcA7jlhfqWZTpZAj1etuj-_mRjECBfd1KvkvuAf8weOI4uuhoeKk991weKQwvpNgikLrCbpLASpSkjvbHxOl_M9XdUj41woRT2Lo-2SRwmEknOQ";
var DemoWallet = {
	kty: kty,
	n: n,
	e: e,
	d: d,
	p: p,
	q: q,
	dp: dp,
	dq: dq,
	qi: qi
};

var AMMSDK = /** @class */ (function () {
    function AMMSDK(_a) {
        var _b = _a.contractTxId, contractTxId = _b === void 0 ? "xwYOmTylx4j0MZz5FbDNxuhyZefkzPsBJ679raFF_CM" : _b, _c = _a.wallet, wallet = _c === void 0 ? DemoWallet : _c, arweave = _a.arweave;
        this.contractTxId = contractTxId;
        this.weaveDB = new WeaveDB({
            wallet: wallet,
            contractTxId: contractTxId,
            name: "weavedb",
            version: "1",
            arweave: arweave || {
                host: "arweave.net",
                port: 443,
                protocol: "https",
                timeout: 200000
            }
        });
    }
    AMMSDK.prototype.getGameData = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.weaveDB.cget("games", address)];
            });
        });
    };
    AMMSDK.prototype.getGames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var games;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weaveDB.cget("games")];
                    case 1:
                        games = _a.sent();
                        return [2 /*return*/, games];
                }
            });
        });
    };
    AMMSDK.prototype.relateUser = function (data, wallet) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weaveDB.set(data, "user_mappings", "".concat(data.game_address, ":").concat(data.user_address), wallet)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AMMSDK.prototype.getUserMapData = function (gameAddress, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var userMapData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weaveDB.cget("user_mappings", "".concat(gameAddress, ":").concat(userAddress))];
                    case 1:
                        userMapData = _a.sent();
                        return [2 /*return*/, userMapData];
                }
            });
        });
    };
    AMMSDK.prototype.getPair = function (_game1, _game2) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, game1, game2, pairData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [_game1, _game2].sort(), game1 = _a[0], game2 = _a[1];
                        return [4 /*yield*/, this.weaveDB.cget("pairs", "".concat(game1, ":").concat(game2))];
                    case 1:
                        pairData = _b.sent();
                        return [2 /*return*/, pairData];
                }
            });
        });
    };
    AMMSDK.prototype.getPairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.weaveDB.cget("pairs")];
                    case 1:
                        pairs = _a.sent();
                        return [2 /*return*/, pairs];
                }
            });
        });
    };
    AMMSDK.getOutputAmount = function (inputAmount, inputReserve, outputReserve) {
        var inputAmountWithFee = inputAmount * 997;
        var numerator = inputAmountWithFee * outputReserve;
        var denominator = inputReserve * 1000 + inputAmountWithFee;
        return numerator / denominator;
    };
    AMMSDK.prototype.swap = function (from, to, amountIn, wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var pairData, address0, address1, amount0, amount1, amountOut, _a, fromGameData, toGameData, fromUserData, toUserData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!wallet.wallet)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.getPair(from, to)];
                    case 1:
                        pairData = (_b.sent()).data;
                        address0 = pairData.address0, address1 = pairData.address1, amount0 = pairData.amount0, amount1 = pairData.amount1;
                        if (Number(amount0) === 0 || Number(amount1) === 0)
                            throw new Error("Pair reserves are empty");
                        return [4 /*yield*/, AMMSDK.getOutputAmount(amountIn, from === address0 ? amount0 : amount1, from === address1 ? amount1 : amount0)];
                    case 2:
                        amountOut = _b.sent();
                        return [4 /*yield*/, Promise.all([
                                this.getGameData(from),
                                this.getGameData(to),
                                this.getUserMapData(from, wallet.wallet),
                                this.getUserMapData(to, wallet.wallet),
                            ])];
                    case 3:
                        _a = _b.sent(), fromGameData = _a[0].data, toGameData = _a[1].data, fromUserData = _a[2].data, toUserData = _a[3].data;
                        if (!fromUserData.game_user_id)
                            throw new Error("User not found in ".concat(from));
                        if (!toUserData.game_user_id)
                            throw new Error("User not found in ".concat(to));
                        return [4 /*yield*/, Promise.all([
                                axios.post("".concat(fromGameData.endpoint, "/burn"), {
                                    amount: amountIn
                                }),
                                axios.post("".concat(toGameData.endpoint, "/mint"), {
                                    amount: amountIn
                                }),
                            ])];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.weaveDB.update({
                                amount0: from === address0 ? amount0 + amountIn : amount0 - amountOut,
                                amount1: from === address1 ? amount1 + amountIn : amount1 - amountOut
                            }, "pairs", "".concat(address0, ":").concat(address1), wallet)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AMMSDK;
}());

export { AMMSDK };
