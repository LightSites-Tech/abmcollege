var $jscomp = {
    scope: {},
    findInternal: function(a, b, c) {
        a instanceof String && (a = String(a));
        for (var d = a.length, e = 0; e < d; e++) {
            var f = a[e];
            if (b.call(c, f, e, a)) return {
                i: e,
                v: f
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6-impl", "es3");
var isNumericInput = function(a) {
        a = a.keyCode;
        return 48 <= a && 57 >= a || 96 <= a && 105 >= a
    },
    isModifierKey = function(a) {
        var b = a.keyCode;
        return !0 === a.shiftKey || 35 === b || 36 === b || 8 === b || 9 === b || 13 === b || 46 === b || 36 < b && 41 > b || (!0 === a.ctrlKey || !0 === a.metaKey) && (65 === b || 67 === b || 86 === b || 88 === b || 90 === b)
    },
    enforceFormat = function(a) {
        isNumericInput(a) || isModifierKey(a) || a.preventDefault()
    },
    formatToPhone = function(a) {
        if (!isModifierKey(a)) {
            var b = a.target.value.replace(/\D/g, "").substring(0, 10),
                c = b.substring(0, 3),
                d = b.substring(3, 6),
                e = b.substring(6, 10);
            6 < b.length ? a.target.value = "(" + c + ") " + d + "-" + e : 3 < b.length ? a.target.value = "(" + c + ") " + d : 0 < b.length && (a.target.value = "(" + c)
        }
    };

function setCookie(a, b, c) {
    var d = new Date;
    d.setTime(d.getTime() + 864E5 * c);
    c = "expires=" + d.toUTCString();
    document.cookie = a + "=" + b + ";" + c + ";path=/"
}

function getCookie(a) {
    a += "=";
    for (var b = decodeURIComponent(document.cookie).split(";"), c = 0; c < b.length; c++) {
        for (var d = b[c];
            " " == d.charAt(0);) d = d.substring(1);
        if (0 == d.indexOf(a)) return d.substring(a.length, d.length)
    }
    return ""
}

function checkCookie(a, b) {
    b && setCookie(a, b, 7);
    var c = getCookie(a);
    $("." + a).val(c)
}

function pad(a, b) {
    var c = "0" + a;
    return c.substr(c.length - b)
}

function parseDate(a) {
    var b = Date.parse(a);
    return isNaN(b) ? Date.parse(a.replace(/-/g, "/").replace(/[a-z]+/gi, " ")) : b
}

function getTimeRemaining(a) {
    a = parseDate(a) - Date.parse(new Date((new Date).toLocaleString("en-US", {
        timeZone: "America/Boise"
    })));
    return {
        total: a,
        days: Math.floor(a / 864E5),
        hours: Math.floor(a / 36E5 % 24),
        minutes: Math.floor(a / 1E3 / 60 % 60),
        seconds: Math.floor(a / 1E3 % 60)
    }
}

function clock(a, b) {
    var c = $("#" + a).closest(".js-clock"),
        d = $(c).find(".js-days"),
        e = $(c).find(".js-hours"),
        f = $(c).find(".js-minutes"),
        g = $(c).find(".js-seconds"),
        h = setInterval(function() {
            var a = getTimeRemaining(b);
            0 >= a.total ? clearInterval(h) : (2 > a.days.length ? d.text(pad(a.days, 2)) : d.text(a.days), e.text(pad(a.hours, 2)), f.text(pad(a.minutes, 2)), g.text(pad(a.seconds, 2)));
            $(function() {
                $(d).closest(".js-clock").fadeIn({
                    start: function() {
                        $(this).css("display", "flex")
                    }
                })
            })
        }, 1E3)
}
Webflow.push(function() {
    function a() {
        $(".nav-bar").css("top", $(".notification-bar").height());
        $(".navigation-wrap").css("top", $(".notification-bar").height())
    }
    var b = 0;
    $("#mobile-button").click(function() {
        if (0 == b) {
            $("body").css("overflow-y", "hidden");
            var a = $("#mobile-nav").offset().top;
            $("#mobile-nav").css("max-height", "calc(100vh - " + a);
            b = 1
        } else $("body").css("overflow-y", "scroll"), b = 0
    });
    height = 1.5 * $(".nav-bar.w-nav").outerHeight();
    $(".video-thumbnail").click(function() {
        var a = $(this).attr("data-video-id"),
            b = $(this).height(),
            c = $(this).parent();
        $(this).closest(".youtube-container").addClass("open");
        $(this).siblings().fadeOut(200);
        $(this).replaceWith('<iframe class="youtube-source" width="560" height="315" src="https://www.youtube.com/embed/' + a + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        c.find("iframe").height(b)
    });
    $("#program-list .w-dyn-item").each(function() {
        var a =
            $(this).find("div").text();
        $(this).find("div").remove();
        $('#program-nav .navigationheadings:contains("' + a + '")').closest(".w-dyn-item").append(this);
        $('.dropdown-item:contains("' + a + '")').closest(".w-dropdown-toggle").siblings(".w-dropdown-list").append(this)
    });
    $("#program-list-mobile .w-dyn-item").each(function() {
        var a = $(this).find(".title").text();
        $(this).find(".title").remove();
        $('.dropdown-title:contains("' + a + '")').closest(".w-dropdown-toggle").siblings(".w-dropdown-list").append(this)
    });
    $('input[type="tel"]').on("keydown",
        enforceFormat);
    $('input[type="tel"]').on("keyup", formatToPhone);
    $('input[type="tel"]').attr("pattern", ".{14}");
    $('input[type="tel"]').attr("placeholder", "(012) 345-6789");
    $('.info-pack input[type="radio"]').on("change", function() {
        $(this).closest("form").find(".require-study-permit").is(":checked") ? ($(this).closest("form").find(".international-students").show(), $(this).closest("form").find(".info-kit-button").hide()) : ($(this).closest("form").find(".international-students").hide(), $(this).closest("form").find(".info-kit-button").show())
    });
    var c = new URLSearchParams(window.location.search),
        d = c.get("gclid"),
        e = c.get("utm_source"),
        f = c.get("utm_campaign"),
        g = c.get("utm_medium"),
        h = c.get("utm_content"),
        k = c.get("utm_term"),
        l = c.get("utm_source_platform"),
        m = c.get("utm_creative_format"),
        c = c.get("utm_marketing_tactic");
    checkCookie("utm_source", e);
    checkCookie("utm_campaign", f);
    checkCookie("utm_medium", g);
    checkCookie("utm_content", h);
    checkCookie("utm_term", k);
    checkCookie("utm_source_platform", l);
    checkCookie("utm_creative_format", m);
    checkCookie("utm_marketing_tactic",
        c);
    checkCookie("gclid", d);
    "function" === typeof typeform && typeform();
    $(".date").attr("type", "date");
    $(".team-left-info").css("top", height + "px");
    $(".sticky").css("top", height + "px");
    $(".anchor-offset").css("top", "-" + height + "px");
    $(".anchor-adjusted").css("top", "-" + height + "px");
    a();
    $(window).resize(a)
});