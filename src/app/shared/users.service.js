"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var lodash_1 = require("lodash");
var UsersService = /** @class */ (function () {
    function UsersService(httpClient) {
        this.httpClient = httpClient;
    }
    UsersService.prototype.findFavoriteChannels = function (user, contents, channels) {
        var favoriteContents = user.favorite_content_id;
        if (favoriteContents.length === 0) {
            return [];
        }
        var channelsCounter = favoriteContents.reduce(function (acc, id) {
            var _a;
            var favoriteContent = contents.find(function (element) { return element.favorite_content_id === id; });
            if (!favoriteContent) {
                return;
            }
            var channelId = favoriteContent.channel_id;
            var count = lodash_1.get(acc, channelId, 0) + 1;
            return __assign(__assign({}, acc), (_a = {}, _a[channelId] = count, _a));
        }, {});
        var favoriteChannels = Object.keys(channelsCounter).map(function (channelId) {
            var name = channels.find(function (channel) { return channel.channel_id === Number(channelId); }).name;
            return { id: channelId, name: name, count: channelsCounter[channelId] };
        });
        return lodash_1.sortBy(favoriteChannels, [function (item) { return item.count; }])
            .filter(function (c) { return c.count === favoriteChannels[favoriteChannels.length - 1].count; })
            .map(function (channel) { return channel.name; });
    };
    UsersService.prototype.loadUsers = function () {
        return this.httpClient.get('/assets/users.json');
    };
    UsersService.prototype.getContents = function () {
        return this.httpClient.get('/assets/content.json');
    };
    UsersService.prototype.getTvChannels = function () {
        return this.httpClient.get('/assets/tv_channels.json');
    };
    UsersService.prototype.getUsers = function () {
        var _this = this;
        return rxjs_1.forkJoin([this.loadUsers(), this.getContents(), this.getTvChannels()])
            .pipe(operators_1.map(function (_a) {
            var users = _a[0], content = _a[1], channels = _a[2];
            return users.map(function (user) {
                var favorite_channels = _this.findFavoriteChannels(user, content, channels);
                return __assign(__assign({}, user), { favorite_channels: favorite_channels });
            });
        }));
    };
    UsersService.prototype.addUser = function (user, contents, channels) {
        var _this = this;
        return this.httpClient.post('https://reqres.in/api/users', user).pipe(operators_1.map(function (_a) {
            var name = _a.name, favorite_content_id = _a.favorite_content_id;
            var favorite_channels = _this.findFavoriteChannels({ name: name, favorite_content_id: favorite_content_id }, contents, channels);
            return { name: name, favorite_content_id: favorite_content_id, favorite_channels: favorite_channels };
        }), operators_1.catchError(function (error) {
            console.log(error);
            return rxjs_1.throwError(error);
        }));
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
