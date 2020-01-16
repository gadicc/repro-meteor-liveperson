window.lpTag = window.lpTag || {};
lpTag.taglets = lpTag.taglets || {};
lpTag._tagv = "4.1.2";
! function(a, b) {
    function c(c, d, e) {
        b._logcnt = b._logcnt || 0;
        F(c, d, e, b._logcnt);
        if ("undefined" != typeof a.lpTaglogListeners && a.lpTaglogListeners.constructor === Array)
            for (var f = 0; f < lpTaglogListeners.length; f++) try {
                lpTaglogListeners[f](c, d, e, b._logcnt)
            } catch (g) {
                F("Exception=" + g.message + " msg=" + c, d, e, b._logcnt)
            }
        b._logcnt++
    }

    function d(a) {
        if (a)
            for (var b = 0; b < a.length; b++) ca[a[b].service] = a[b].baseURI
    }

    function e() {
        for (var a = Ba.PRODUCTION, c = b.ovr && b.ovr.domain, d = 0; d < Ca.length; d++)
            if (Ca[d].tagDomain === c) {
                a = Ca[d].env;
                break
            } return a
    }

    function f(a) {
        var b;
        a = a || e();
        if ("string" == typeof a)
            for (var c = 0; c < Ca.length; c++)
                if (Ca[c].env === a) {
                    b = Ca[c].tagDomain;
                    break
                } return b
    }

    function g(a) {
        var b = ca[a],
            c = "ALL";
        return b ? b : ca[c]
    }

    function h() {
        return ca
    }

    function i(a) {
        return l(da, a)
    }

    function j(a) {
        return l(ea, a)
    }

    function k(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }

    function l(a, b) {
        var c;
        c = "undefined" != typeof b ? "undefined" != typeof a[b] ? a[b] : null : X(a);
        return c
    }

    function m() {
        var a = new b.Events,
            c = a.trigger,
            d = !1;
        a.trigger = function(a, e, f) {
            var g = a;
            "string" == typeof a && (g = {
                eventName: e,
                appName: a,
                data: f
            });
            if ("LPT" === g.appName && "DOM_READY" === g.eventName) {
                if (d) return;
                d = !0
            }
            "undefined" != typeof b._deferExecuted ? c(g) : b.defer(function() {
                c(g)
            }, 1)
        };
        return a
    }

    function n(a) {
        ga.taglets = ga.taglets || {};
        if (a) {
            K(a, ga.taglets);
            N(a, ga.taglets)
        }
        M(ga);
        O();
        aa.trigger("LPTAG", "ON_READY");
        a && Q(a, ga.taglets);
        aa.trigger("LPTAG", "ON_STARTED")
    }

    function o(a) {
        if (a) {
            N(a, {}, !0);
            Q(a, {}, !0)
        }
    }

    function p() {
        return ya
    }

    function q() {
        return za
    }

    function r() {
        return ma[za]
    }

    function s() {
        return ka[ya]
    }

    function t() {
        return Aa
    }

    function u() {
        return oa[Aa]
    }

    function v() {
        if (!b.started) {
            b.started = !0;
            Z()
        }
    }

    function w(a, c) {
        if (!a) return !1;
        b.url = a;
        c = c || {};
        c.taglets = c.taglets || {};
        b.section = c.section || b.section;
        b.tagletSection = c.tagletSection || b.tagletSection;
        ga = c;
        J(c.taglets);
        ha = !0;
        Z();
        return !0
    }

    function x(a) {
        if (a && a.name) {
            a.excludeWhitelist = !0;
            y(a)
        }
    }

    function y(a) {
        var c;
        a = a || {};
        if (b.taglets && b.taglets.jsonp) {
            c = {
                url: C(a),
                success: G(a),
                error: H(a)
            };
            b.taglets.jsonp.issueCall(c)
        }
    }

    function z() {
        if (a.location && a.location.search) {
            var c = a.location.search.match(/lpDebug=(?=(\d))/);
            c && c[1] && (b.debug = c[1])
        }
        if (!b.isDom && ("interactive" === document.readyState || "complete" === document.readyState)) {
            b.isDom = !0;
            aa.trigger("LPT", "DOM_READY")
        }
        "undefined" != typeof a._lptTagStop || "undefined" != typeof b.autoStart && !b.autoStart || v()
    }

    function A(a) {
        try {
            if (a) {
                var e = ba.retry;
                if (a.retry) $(e, a.retry, !0, Z);
                else if (!b.loaded || ha) {
                    ha = !1;
                    b.loaded = !0;
                    e.count = 0;
                    b.site = a.site || b.site;
                    d(a.serviceMap);
                    k(da, a.features);
                    k(ea, a.settings);
                    setTimeout(function() {
                        n(a.taglets)
                    }, 0)
                }
                if (a.error) {
                    c("callback error ,Error:" + JSON.stringify(a.error), "ERROR", "LPTAG");
                    aa.trigger("LPTAG", "CB_ERROR", {
                        err: a.error
                    })
                }
            } else {
                c("callback error, no response", "ERROR", "LPTAG");
                aa.trigger("LPTAG", "CB_ERROR", {
                    err: "no response"
                });
                O()
            }
        } catch (f) {
            c("callback has failed " + f.message, "ERROR", "LPTAG");
            aa.trigger("LPTAG", "CB_EXCEPTION", {
                err: f.message
            });
            O()
        }
    }

    function B(a, c) {
        b.log("Error creating taglet:" + a + " ex=" + c.message, "ERROR", "LPTAG")
    }

    function C(a) {
        a = a || {};
        var c = "?v=2.0&df=" + b.device.family(),
            d = a.lpDebug || b.debug,
            e = a.whitelist || b.wl,
            f = a.scp || b.scp,
            g = Y(fa),
            h = D(),
            i = b.protocol + "//" + (b.ovr && b.ovr.domain ? b.ovr.domain : "lptag.liveperson.net") + "/lptag/api/account/" + b.site + "/configuration/applications/taglets/.jsonp";
        f && (c += "&scp=" + f);
        if (!a.excludeWhitelist && e) {
            e = e.constructor === Array ? e : [e];
            c += "&wl=" + encodeURIComponent(e.join(","))
        }
        if (a.name) {
            a.name = a.name.constructor === Array ? a.name : [a.name];
            c += "&byName=" + encodeURIComponent(a.name.join(","))
        }(1 == d || 2 == d) && (c += "&lpDebug=" + d);
        g.length && (c += "&ct=" + encodeURIComponent(g.join(",")));
        h && (c += "&s=" + encodeURIComponent(h));
        na && (c += "&b=" + Aa);
        return i + c
    }

    function D() {
        var a;
        b.tagletSection ? a = b.tagletSection : "object" != typeof b.section && b.section ? a = b.section : b.section && b.section.constructor === Array && 1 === b.section.length && "object" != typeof b.section[0] && b.section[0] && (a = b.section[0]);
        return a
    }

    function E(a) {
        return qa.match(a) ? !0 : !1
    }

    function F(b, c, d, e) {
        "undefined" != typeof a.lpMTagDebug && "function" == typeof lpMTagDebug.Display && a.lpMTagDebug.Display(b, c, d, e)
    }

    function G(a) {
        return function(b) {
            var d, e;
            if (b && !b.error) {
                e = ba.retry;
                if (b.retry) $(e, b.retry, !1, function() {
                    y(a)
                });
                else if (b.taglets) {
                    e.count = 0;
                    b.taglets.constructor !== Array && (b.taglets = [b.taglets]);
                    setTimeout(function() {
                        o(b.taglets);
                        I(a.success, a.context)
                    }, 0)
                } else I(a.success, a.context)
            } else {
                d = b && b.error ? "response error: " + JSON.stringify(b.error) : "no response";
                c("callback error, " + d, "ERROR", "LPTAG");
                I(a.error, a.context, d)
            }
        }
    }

    function H(a) {
        return function(b) {
            I(a.error, a.context, b)
        }
    }

    function I(b, d) {
        d = d || a;
        if ("function" == typeof b) {
            var e = Array.prototype.slice.call(arguments, 2);
            try {
                return b.apply(d, e)
            } catch (f) {
                c("Failed to execute callback exc= " + f.message, "ERROR", "LPTAG")
            }
        }
    }

    function J(a) {
        for (var d in fa)
            if (fa.hasOwnProperty(d) && fa[d] !== ia.STOPPED) {
                var e = b.taglets[d];
                if (d && e) try {
                    if ("function" == typeof e.onBeforeNavigation) {
                        c("onBeforeNavigation taglet: " + d, "DEBUG", "LPTAG");
                        e.onBeforeNavigation(a[d])
                    }
                } catch (f) {
                    c("Error onBeforeNavigation taglet :" + d + "ex= " + f.message, "ERROR", "LPTAG")
                } else c("onBeforeNavigation not called on non-JS taglet: " + d, "DEBUG", "LPTAG")
            }
    }

    function K(a, d) {
        for (var e in fa)
            if (fa.hasOwnProperty(e) && fa[e] !== ia.STOPPED && L(a, e)) {
                var f = b.taglets[e];
                if (e && f) try {
                    if ("function" == typeof f.stop) {
                        c("Stop taglet: " + e, "DEBUG", "LPTAG");
                        f.stop(d[e])
                    }
                    fa[e] = ia.STOPPED;
                    aa.trigger("LPTAG", "TAGLET_STOPPED", {
                        name: e
                    })
                } catch (g) {
                    c("Error stop taglet :" + e + "ex= " + g.message, "ERROR", "LPTAG")
                } else c("Stop not called on non-JS taglet: " + e, "DEBUG", "LPTAG")
            }
    }

    function L(a, b) {
        for (var c = !0, d = 0; d < a.length; d++)
            if (a[d].name === b) {
                c = !1;
                break
            } return c
    }

    function M(a) {
        a.sdes && a.sdes.length && b.sdes.push(a.sdes)
    }

    function N(a, d, e) {
        for (var f = 0; f < a.length; f++) {
            var g = b.taglets[a[f].name];
            if (a[f].name && g)
                if (fa[a[f].name]) {
                    if (!e) try {
                        if ("function" == typeof g.reinit) {
                            c("Reinit taglet: " + a[f].name, "DEBUG", "LPTAG");
                            g.reinit(a[f].parameters, d[a[f].name]);
                            aa.trigger("LPTAG", "TAGLET_REINITIALIZED", {
                                name: a[f].name
                            })
                        }
                    } catch (h) {
                        c("Error reinit taglet :" + a[f].name + "ex= " + h.message, "ERROR", "LPTAG")
                    }
                } else try {
                    c("Init taglet: " + a[f].name, "DEBUG", "LPTAG");
                    g.init(a[f].parameters);
                    aa.trigger("LPTAG", "TAGLET_INITIALIZED", {
                        name: a[f].name
                    })
                } catch (h) {
                    c("Error init taglet:" + a[f].name + "  ex=" + h.message, "ERROR", "LPTAG")
                } else c("Init not called on non-JS taglet: " + a[f].name, "DEBUG", "LPTAG")
        }
    }

    function O() {
        b._deferExecuted = !0;
        b.defer = function(a) {
            try {
                a()
            } catch (b) {
                c("Error executing defer fn:" + b.message, "ERROR", "LPTAG")
            }
        };
        P(b._defB);
        P(b._defT);
        P(b._defL)
    }

    function P(a) {
        if ("undefined" != typeof a) {
            for (var b = 0; b < a.length; b++) try {
                a[b]()
            } catch (d) {
                c("Error executing defer fn:" + d.message, "ERROR", "LPTAG")
            }
            a.length = 0
        }
    }

    function Q(a, d, e) {
        for (var f = 0; f < a.length; f++) {
            var g = b.taglets[a[f].name];
            if (a[f].name && g) {
                if (fa[a[f].name]) {
                    if (!e) try {
                        if ("function" == typeof g.restart) {
                            c("Restart taglet: " + a[f].name, "DEBUG", "LPTAG");
                            g.restart(d[a[f].name])
                        }
                        aa.trigger("LPTAG", "TAGLET_RESTARTED", {
                            name: a[f].name
                        })
                    } catch (h) {
                        c("Error restart taglet :" + a[f].name + "ex= " + h.message, "ERROR", "LPTAG")
                    }
                } else try {
                    if ("function" == typeof g.start) {
                        c("Start taglet: " + a[f].name, "DEBUG", "LPTAG");
                        g.start()
                    }
                    aa.trigger("LPTAG", "TAGLET_STARTED", {
                        name: a[f].name
                    })
                } catch (h) {
                    c("Error start taglet :" + a[f].name + "ex= " + h.message, "ERROR", "LPTAG")
                }
                fa[a[f].name] = ia.STARTED
            } else {
                c("Start not called on non-JS taglet: " + a[f].name, "DEBUG", "LPTAG");
                a[f].name && !fa[a[f].name] && (fa[a[f].name] = ia.STOPPED)
            }
        }
    }

    function R() {
        var a = ja.desktop;
        ra && !sa ? a = ja.mobile : !sa && !xa || U() ? sa && U() && ta && (V() || (a = ja.tablet)) : a = ja.tablet;
        return a
    }

    function S() {
        var a = la.windows;
        ua && !ra ? a = la.mac : xa ? a = la.android : wa ? a = la.iOS : va && (a = la.linux);
        return a
    }

    function T() {
        var a = na.unknown;
        pa ? a = na.oldie : E(/MSIE|Trident|IEMobile/) ? a = na.ie : E(/Line/) ? a = na.line : E(/CriOS/) ? a = na.chromeios : E(/Opera|OPR/) ? a = na.opera : E(/Chrome/) ? a = na.chrome : E(/ BlackBerry /) ? a = na.blackberry : E(/Firefox/) ? a = na.firefox : E(/Safari/) && (ua || wa || za === la.windows) ? a = na.safari : xa && (a = na.android);
        return a
    }

    function U() {
        var a, b = !1,
            c = document.documentMode;
        a = /*@cc_on!@*/ b;
        if (!a) {
            W("");
            a = "number" == typeof document.documentMode;
            W(c)
        }!a && navigator && navigator.userAgent && (a = "Netscape" === navigator.appName && /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.test(navigator.userAgent));
        return a
    }

    function V() {
        return E(/Trident\/.*rv:(11)/)
    }

    function W(a) {
        try {
            document.documentMode = a
        } catch (b) {}
    }

    function X(a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b
    }

    function Y(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b
    }

    function Z() {
        b.load(C(), "UTF-8", ba.scriptPrefix + ba.count);
        ba.count++
    }

    function $(a, b, d, e) {
        if (d) {
            var f = ba.count - 1;
            _(ba.scriptPrefix + f)
        }
        isNaN(b.maxRetries) || (a.max = parseInt(b.maxRetries, 10));
        isNaN(b.timeout) || (a.timeout = parseInt(b.timeout, 10));
        if (a.count < a.max) {
            c("retrying count=" + a.count + " max=" + a.max, "DEBUG", "LPTAG");
            a.count++;
            setTimeout(function() {
                e()
            }, a.timeout)
        } else {
            c("exceeded max retries: " + a.max + ", stopping", "ERROR", "LPTAG");
            aa.trigger("LPTAG", "CB_ERROR", {
                err: "max retries",
                count: a.count
            })
        }
    }

    function _(a) {
        var b = document.getElementById(a);
        if (b) try {
            b.parentNode.removeChild(b);
            for (var d in b) b.hasOwnProperty(d) && delete b[d]
        } catch (e) {
            c("error removing script: " + a, "ERROR", "LPTAG")
        }
    }
    var aa, ba = {
            retry: {
                count: 0,
                max: 3,
                timeout: 1e3
            },
            scriptPrefix: "_lpTagScriptId_",
            count: 0
        },
        ca = [],
        da = {},
        ea = {},
        fa = {},
        ga = {},
        ha = !1,
        ia = {
            STARTED: 1,
            STOPPED: 2
        },
        ja = {
            desktop: 0,
            tablet: 1,
            mobile: 2
        },
        ka = ["Desktop", "Tablet", "Mobile"],
        la = {
            windows: 0,
            mac: 1,
            linux: 2,
            iOS: 3,
            android: 4
        },
        ma = ["Windows", "Mac OSX", "Linux", "iOS", "Android"],
        na = {
            ie: 0,
            chrome: 1,
            safari: 2,
            firefox: 3,
            line: 4,
            chromeios: 5,
            oldie: 6,
            blackberry: 7,
            opera: 8,
            android: 9,
            unknown: 10
        },
        oa = ["MSIE", "Chrome", "Safari", "Firefox", "Line", "ChromeIOS", "IE<9", "BlackBerry", "Opera", "Android", "Unknown"],
        pa = !a.addEventListener,
        qa = navigator.userAgent,
        ra = E(/(Windows Phone|iPhone|iPod|mobile|Mobile|IEMobile)/g),
        sa = E(/(Tablet PC|iPad|Tablet|tablet)/g),
        ta = E(/(Touch)/g),
        ua = E(/(Mac OS)/g),
        va = E(/(Linux)/g),
        wa = E(/(iPhone|iPod|iPad)/g),
        xa = E(/(android|Android)/g),
        ya = R(),
        za = S(),
        Aa = T(),
        Ba = {
            ALPHA: "alpha",
            QA: "qa",
            PRODUCTION: "prod",
            DEV: "dev"
        },
        Ca = [{
            env: Ba.ALPHA,
            tagDomain: "lptag-a.liveperson.net"
        }, {
            env: Ba.PRODUCTION,
            tagDomain: "lptag.liveperson.net"
        }, {
            env: Ba.QA,
            tagDomain: "lptag-dev.dev.lprnd.net"
        }, {
            env: Ba.QA,
            tagDomain: "tlv_plankton3.dev.lprnd.net"
        }, {
            env: Ba.QA,
            tagDomain: "tlv_plankton4.dev.lprnd.net"
        }, {
            env: Ba.DEV,
            tagDomain: "object" == typeof b.configurationDefaults && b.configurationDefaults.tagDomain
        }];
    ! function(a, b) {
        "use strict";
        if ("object" == typeof exports) b(a, exports);
        else {
            a.Chronos = a.Chronos || {};
            b(a, a.Chronos)
        }
    }("undefined" == typeof a.lpTag ? this : a.lpTag, function(a, b, c) {
        "use strict";

        function d(a, b, c) {
            var d = [];
            if (a[b] && a[b].length)
                for (var e = 0; e < a[b].length; e++) c && "*" !== a[b][e].appName && a[b][e].appName !== c || d.push(a[b][e]);
            if (a["*"])
                for (var f = 0; f < a["*"].length; f++) c && "*" !== a["*"][f].appName && a["*"][f].appName !== c || d.push(a["*"][f]);
            return d
        }

        function e(b, c, d) {
            a && "function" == typeof a.log && a.log(b, c, d)
        }

        function f(a) {
            var b, c = a.unbindObj[a.attrName],
                d = !1;
            if (!a.unbindObj) {
                e("CMD listen id not spec for unbind", "ERROR", a.loggerName);
                return null
            }
            if ("string" == typeof a.unbindObj) return j(a.lstnrs, a.unbindObj);
            if (!a.unbindObj.func && !a.unbindObj.context && !a.unbindObj.appName) return !1;
            var f = a.lstnrs;
            if (c) {
                f = {};
                f[c] = a.lstnrs[c]
            }
            for (var g in f)
                if (f.hasOwnProperty(g) && f[g] && f[g].length) {
                    b = k(f[g], a.unbindObj.func, a.unbindObj.context, a.unbindObj.appName);
                    if (b.length !== f[g].length) {
                        a.lstnrs[g] = b;
                        d = !0
                    }
                } return d
        }

        function g(a) {
            var b = {};
            if (a.constructor === Object)
                for (var c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && ("object" == typeof a[c] && a[c].constructor !== Array ? b[c] = g(a[c]) : a[c].constructor === Array ? b[c] = a[c].slice(0) || [] : "function" != typeof a[c] && (b[c] = null !== a[c] && void 0 !== a[c] ? a[c] : ""));
            else a.constructor === Array ? b = a.slice(0) || [] : "function" != typeof a && (b = a);
            return b
        }

        function h(a, b, c) {
            if (("undefined" == typeof c || "*" === c) && "*" === b) return a;
            for (var d = [], e = 0; e < a.length; e++)(a[e].eventName === c || "*" === c) && (b && b === a[e].appName || !a[e].appName || "*" === a[e].appName || "*" === b) && d.push(a[e]);
            return d
        }

        function i(a) {
            if (0 === a.eventBufferLimit || a.triggerData.data && a.triggerData.data.doNotStore) a = null;
            else {
                var b = {
                    eventName: a.triggerData[a.attrName],
                    appName: a.triggerData.appName
                };
                b.data = a.triggerData.passDataByRef ? a.triggerData.data : g(a.triggerData.data);
                if (a.eventBufferLimit > 0) {
                    a.index >= a.eventBufferLimit && (a.index = 0);
                    a.fired[a.index] = b;
                    a.index++
                } else a.fired.push(b);
                a = null
            }
        }

        function j(a, b) {
            var c = !1;
            if (!b) {
                e("Ev listen id not spec for unregister", "ERROR", "Events");
                return null
            }
            for (var d in a)
                if (a.hasOwnProperty(d))
                    for (var f = 0; f < a[d].length; f++)
                        if (a[d][f].id == b) {
                            a[d].splice(f, 1);
                            e("Ev listen=" + b + " and name=" + d + " unregister", "DEBUG", "Events");
                            c = !0;
                            break
                        } c || e("Ev listen not found " + b + " unregister", "DEBUG", "Events");
            return c
        }

        function k(a, b, c, d) {
            var f = [];
            if (a && a.length)
                for (var g = 0; g < a.length; g++) try {
                    var h = !c && a[g].func === b,
                        i = !b && c && a[g].context === c,
                        j = b && c && a[g].func === b && a[g].context === c,
                        k = d && d === a[g].appName,
                        l = "*" === a[g].appName;
                    if (h || i || j) {
                        if (k || l) continue;
                        if (i) continue
                    } else if (!b && !c && k) continue;
                    f.push(a[g])
                } catch (m) {
                    e("Error in unbind e=" + m.message, "ERROR", "Events")
                }
            return f
        }
        var l = {
            getListeners: d,
            log: e,
            unbind: f,
            hasFired: h,
            cloneEventData: g,
            storeEventData: i
        };
        c || (b.EventsUtil = b.EventsUtil || l);
        return l
    });
    ! function(a, b) {
        "use strict";
        if ("object" == typeof exports) b(a, exports, require("./util/EventsUtil").EventsUtil);
        else {
            a.Chronos = a.Chronos || {};
            b(a, a.Chronos, a.Chronos.EventsUtil)
        }
    }("undefined" == typeof a.lpTag ? this : a.lpTag, function(a, b, c, d) {
        "use strict";

        function e(a) {
            function b(a) {
                if (a) {
                    a.triggerOnce = !0;
                    return d(a)
                }
                return null
            }

            function d(a, b, e) {
                var f = a;
                "string" == typeof a && (f = {
                    appName: a,
                    eventName: b,
                    func: e
                });
                f.appName = f.appName || l;
                "*" !== l && ("string" != typeof a || "function" != typeof b && "undefined" != typeof b || (f.eventName = a));
                if (!f.eventName || !f.func || "function" != typeof f.func && f.func.constructor !== Array) {
                    c.log("Ev listen has invalid params: evName=[" + f.eventName + "]", "ERROR", "Events");
                    return null
                }
                if (f.func.constructor === Array) {
                    for (var g, h, i = [], j = 0; j < f.func.length; j++) {
                        g = c.cloneEventData(f);
                        g.func = f.func[j];
                        h = d(g);
                        i.push(h)
                    }
                    return i
                }
                var k = r + o++,
                    m = {
                        id: k,
                        func: f.func,
                        context: f.context || null,
                        aSync: f.aSync ? !0 : !1,
                        appName: f.appName,
                        triggerOnce: f.triggerOnce || !1
                    };
                p[f.eventName] = p[f.eventName] || [];
                p[f.eventName].push(m);
                c.log("Ev listen rgstr: evName=[" + f.eventName + "] aSync=" + m.aSync + " appName=" + m.name, "DEBUG", "Events");
                f = null;
                a = null;
                return k
            }

            function e(a) {
                "*" !== l && (a.appName = a.appName || l);
                return c.unbind({
                    unbindObj: a,
                    attrName: n,
                    loggerName: m,
                    lstnrs: p
                })
            }

            function f(a, b) {
                if ("undefined" == typeof b) {
                    b = a;
                    a = l
                }
                return c.hasFired(q, a, b)
            }

            function g(a, b, d) {
                var e = a;
                "string" == typeof a && (e = {
                    eventName: b,
                    appName: a,
                    data: d
                });
                if ("*" !== l) {
                    e.appName = e.appName || l;
                    "string" != typeof a || "object" != typeof b && "undefined" != typeof b || (e.eventName = a)
                }
                if (!e || "undefined" == typeof e.eventName) {
                    c.log("Ev name not spec for publish", "ERROR", "Events");
                    e = null;
                    return null
                }
                e.passDataByRef = e.passDataByRef || !j;
                i(e);
                var f = c.getListeners(p, e.eventName, e.appName);
                if (f.length > 0)
                    for (var g = 0; g < f.length; g++) {
                        var k = e.passDataByRef ? e.data : c.cloneEventData(e.data),
                            m = {
                                appName: e.appName,
                                eventName: e.eventName
                            },
                            n = f[g];
                        n.aSync || k && k.aSync ? setTimeout(h(n, k, m), 0) : h(n, k, m)()
                    }
                e = null;
                return f.length > 0
            }

            function h(a, b, d) {
                return function() {
                    try {
                        a.func.call(a.context, b, d);
                        b = null;
                        a.triggerOnce && e(a);
                        a = null
                    } catch (f) {
                        c.log("Error executing " + d.eventName + " eventId: " + a.id + "e=" + f.message, "ERROR", "Events")
                    }
                }
            }

            function i(a) {
                c.storeEventData({
                    triggerData: a,
                    eventBufferLimit: k,
                    attrName: n,
                    fired: q,
                    index: s
                })
            }
            var j, k, l, m = "Events",
                n = "eventName",
                o = 0,
                p = {},
                q = [],
                r = "evId_",
                s = 0;
            l = a && a.appName || "*";
            j = a && "boolean" == typeof a.cloneEventData ? a.cloneEventData : !1;
            k = a && !isNaN(a.eventBufferLimit) ? a.eventBufferLimit : -1;
            this.once = b;
            this.hasFired = f;
            this.trigger = g;
            this.publish = g;
            this.bind = d;
            this.register = d;
            this.unbind = e;
            this.unregister = e
        }
        d || (b.Events = b.Events || e);
        return e
    });
    b.Events = b.Events || b.Chronos.Events;
    a.lpTag = a.lpTag || {};
    b.storageMethods = b.storageMethods || function() {
        "use strict";

        function a() {
            return l && m
        }

        function b() {
            return l
        }

        function c() {
            return m
        }

        function d(a, c) {
            if (b()) {
                sessionStorage.setItem(a, c);
                return !0
            }
        }

        function e(a) {
            return b() ? sessionStorage.getItem(a) || "" : void 0
        }

        function f(a) {
            if (b() && e(a)) {
                sessionStorage.removeItem(a);
                return !0
            }
            return !1
        }

        function g(a, b) {
            if (c()) {
                localStorage.setItem(a, b);
                return !0
            }
        }

        function h(a) {
            return c() ? localStorage.getItem(a) || "" : void 0
        }

        function i(a) {
            if (c() && h(a)) {
                localStorage.removeItem(a);
                return !0
            }
            return !1
        }

        function j() {
            try {
                l = k(sessionStorage);
                m = k(localStorage)
            } catch (a) {}
        }

        function k(a) {
            var b = !1,
                c = "lpTestCase",
                d = "abc";
            try {
                if ("undefined" != typeof Storage) {
                    a.setItem(c, d);
                    b = a.getItem(c) === d;
                    a.removeItem(c)
                }
            } catch (e) {}
            return b
        }
        var l = !1,
            m = !1;
        j();
        return {
            isStorageEnabled: a,
            isSessionStorageEnabled: b,
            isLocalStorageEnabled: c,
            setSessionData: d,
            getSessionData: e,
            removeSessionData: f,
            setPersistentData: g,
            getPersistentData: h,
            removePersistentData: i
        }
    }();
    a.lpTag = a.lpTag || {};
    b.cookieMethods = b.cookieMethods || function() {
        "use strict";

        function a() {
            var a = "lpTestCookie" + (new Date).getTime(),
                b = "testValue";
            f({
                name: a,
                value: b
            });
            h = b === c(a);
            g(a);
            i = !1;
            return h
        }

        function b() {
            return h
        }

        function c(a) {
            var b, c, d = "; ",
                e = "";
            if (i || h) {
                if ("string" != typeof a) return "";
                a = encodeURIComponent(a);
                try {
                    c = d + document.cookie
                } catch (f) {}
                b = c.split(d + a + "=");
                e = 1 == b.length ? "" : decodeURIComponent(b[1].split(";")[0])
            }
            return e
        }

        function d(a, b, c) {
            c = "number" == typeof c ? c : 2592e3;
            "object" == typeof a && (a.seconds = c);
            return e(a, b, c)
        }

        function e(a, b, c, d, e, g) {
            return f("object" == typeof a ? a : {
                name: a,
                value: b,
                seconds: c,
                path: d,
                domain: e,
                secure: g
            })
        }

        function f(a) {
            var b, c, d = !1;
            if (i || h) {
                if ("string" != typeof a.name || "" === a.name) return !1;
                (null === a.value || "undefined" == typeof a.value) && (a.seconds = -1);
                if ("number" == typeof a.seconds) {
                    c = (new Date).getTime();
                    b = new Date(c + 1e3 * a.seconds)
                }
                a.value = a.value ? encodeURIComponent(a.value) : "";
                try {
                    document.cookie = [encodeURIComponent(a.name), "=", a.value, b ? "; expires=" + b.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("");
                    d = !0
                } catch (e) {}
            }
            return d
        }

        function g(a, b, c) {
            return f({
                name: a,
                path: b,
                domain: c
            })
        }
        var h = !1,
            i = !0;
        a();
        return {
            clearCookie: g,
            writeSessionCookie: e,
            writePersistentCookie: d,
            readCookie: c,
            isCookieEnabled: b
        }
    }();
    b.cfg = ba;
    b.log = c;
    b.csds = {
        getDomain: g,
        setDomains: d,
        getCSDSMap: h
    };
    b.features = {
        getFeature: i
    };
    b.siteSettings = {
        getSetting: j
    };
    b.getEnv = e;
    b.getTagDomain = f;
    b.getDomain = g;
    b.eventsFactory = m;
    b.tglMng = {
        run: n,
        runtTaglet: o
    };
    b.device = {
        os: q,
        osEnum: X(la),
        osName: r,
        family: p,
        familyEnum: X(ja),
        familyName: s,
        browser: t,
        browserName: u,
        browserEnum: X(na)
    };
    b.start = v;
    b._reload = Z;
    b.newPage = w;
    b.loadTaglet = x;
    b.loadTaglets = y;
    b.callback = A;
    b.handleGeneralError = B;
    b.run = z;
    b.hooks = b.hooks || [];
    aa = m();
    b.events = aa;
    z()
}(window, lpTag);
