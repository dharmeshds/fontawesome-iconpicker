/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(z) {
    z.ui = z.ui || {};
    var e = z.ui.version = "1.12.1";
    (function() {
        var s, v = Math.max, x = Math.abs, r = /left|center|right/, l = /top|center|bottom/, i = /[\+\-]\d+(\.[\d]+)?%?/, o = /^\w+/, c = /%$/, a = z.fn.pos;
        function q(e, a, t) {
            return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? t / 100 : 1) ];
        }
        function D(e, a) {
            return parseInt(z.css(e, a), 10) || 0;
        }
        function t(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (z.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        z.pos = {
            scrollbarWidth: function() {
                if (s !== undefined) {
                    return s;
                }
                var e, a, t = z("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), r = t.children()[0];
                z("body").append(t);
                e = r.offsetWidth;
                t.css("overflow", "scroll");
                a = r.offsetWidth;
                if (e === a) {
                    a = t[0].clientWidth;
                }
                t.remove();
                return s = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), r = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, s = t === "scroll" || t === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: s ? z.pos.scrollbarWidth() : 0,
                    height: r ? z.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = z(e || window), t = z.isWindow(a[0]), r = !!a[0] && a[0].nodeType === 9, s = !t && !r;
                return {
                    element: a,
                    isWindow: t,
                    isDocument: r,
                    offset: s ? z(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        z.fn.pos = function(h) {
            if (!h || !h.of) {
                return a.apply(this, arguments);
            }
            h = z.extend({}, h);
            var m, p, d, u, T, e, g = z(h.of), b = z.pos.getWithinInfo(h.within), w = z.pos.getScrollInfo(b), k = (h.collision || "flip").split(" "), y = {};
            e = t(g);
            if (g[0].preventDefault) {
                h.at = "left top";
            }
            p = e.width;
            d = e.height;
            u = e.offset;
            T = z.extend({}, u);
            z.each([ "my", "at" ], function() {
                var e = (h[this] || "").split(" "), a, t;
                if (e.length === 1) {
                    e = r.test(e[0]) ? e.concat([ "center" ]) : l.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = r.test(e[0]) ? e[0] : "center";
                e[1] = l.test(e[1]) ? e[1] : "center";
                a = i.exec(e[0]);
                t = i.exec(e[1]);
                y[this] = [ a ? a[0] : 0, t ? t[0] : 0 ];
                h[this] = [ o.exec(e[0])[0], o.exec(e[1])[0] ];
            });
            if (k.length === 1) {
                k[1] = k[0];
            }
            if (h.at[0] === "right") {
                T.left += p;
            } else if (h.at[0] === "center") {
                T.left += p / 2;
            }
            if (h.at[1] === "bottom") {
                T.top += d;
            } else if (h.at[1] === "center") {
                T.top += d / 2;
            }
            m = q(y.at, p, d);
            T.left += m[0];
            T.top += m[1];
            return this.each(function() {
                var t, e, i = z(this), o = i.outerWidth(), c = i.outerHeight(), a = D(this, "marginLeft"), r = D(this, "marginTop"), s = o + a + D(this, "marginRight") + w.width, l = c + r + D(this, "marginBottom") + w.height, f = z.extend({}, T), n = q(y.my, i.outerWidth(), i.outerHeight());
                if (h.my[0] === "right") {
                    f.left -= o;
                } else if (h.my[0] === "center") {
                    f.left -= o / 2;
                }
                if (h.my[1] === "bottom") {
                    f.top -= c;
                } else if (h.my[1] === "center") {
                    f.top -= c / 2;
                }
                f.left += n[0];
                f.top += n[1];
                t = {
                    marginLeft: a,
                    marginTop: r
                };
                z.each([ "left", "top" ], function(e, a) {
                    if (z.ui.pos[k[e]]) {
                        z.ui.pos[k[e]][a](f, {
                            targetWidth: p,
                            targetHeight: d,
                            elemWidth: o,
                            elemHeight: c,
                            collisionPosition: t,
                            collisionWidth: s,
                            collisionHeight: l,
                            offset: [ m[0] + n[0], m[1] + n[1] ],
                            my: h.my,
                            at: h.at,
                            within: b,
                            elem: i
                        });
                    }
                });
                if (h.using) {
                    e = function(e) {
                        var a = u.left - f.left, t = a + p - o, r = u.top - f.top, s = r + d - c, l = {
                            target: {
                                element: g,
                                left: u.left,
                                top: u.top,
                                width: p,
                                height: d
                            },
                            element: {
                                element: i,
                                left: f.left,
                                top: f.top,
                                width: o,
                                height: c
                            },
                            horizontal: t < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: s < 0 ? "top" : r > 0 ? "bottom" : "middle"
                        };
                        if (p < o && x(a + t) < p) {
                            l.horizontal = "center";
                        }
                        if (d < c && x(r + s) < d) {
                            l.vertical = "middle";
                        }
                        if (v(x(a), x(t)) > v(x(r), x(s))) {
                            l.important = "horizontal";
                        } else {
                            l.important = "vertical";
                        }
                        h.using.call(this, e, l);
                    };
                }
                i.offset(z.extend(f, {
                    using: e
                }));
            });
        };
        z.ui.pos = {
            _trigger: function(e, a, t, r) {
                if (a.elem) {
                    a.elem.trigger({
                        type: t,
                        position: e,
                        positionData: a,
                        triggered: r
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    z.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var t = a.within, r = t.isWindow ? t.scrollLeft : t.offset.left, s = t.width, l = e.left - a.collisionPosition.marginLeft, i = r - l, o = l + a.collisionWidth - s - r, c;
                    if (a.collisionWidth > s) {
                        if (i > 0 && o <= 0) {
                            c = e.left + i + a.collisionWidth - s - r;
                            e.left += i - c;
                        } else if (o > 0 && i <= 0) {
                            e.left = r;
                        } else {
                            if (i > o) {
                                e.left = r + s - a.collisionWidth;
                            } else {
                                e.left = r;
                            }
                        }
                    } else if (i > 0) {
                        e.left += i;
                    } else if (o > 0) {
                        e.left -= o;
                    } else {
                        e.left = v(e.left - l, e.left);
                    }
                    z.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    z.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var t = a.within, r = t.isWindow ? t.scrollTop : t.offset.top, s = a.within.height, l = e.top - a.collisionPosition.marginTop, i = r - l, o = l + a.collisionHeight - s - r, c;
                    if (a.collisionHeight > s) {
                        if (i > 0 && o <= 0) {
                            c = e.top + i + a.collisionHeight - s - r;
                            e.top += i - c;
                        } else if (o > 0 && i <= 0) {
                            e.top = r;
                        } else {
                            if (i > o) {
                                e.top = r + s - a.collisionHeight;
                            } else {
                                e.top = r;
                            }
                        }
                    } else if (i > 0) {
                        e.top += i;
                    } else if (o > 0) {
                        e.top -= o;
                    } else {
                        e.top = v(e.top - l, e.top);
                    }
                    z.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    z.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var t = a.within, r = t.offset.left + t.scrollLeft, s = t.width, l = t.isWindow ? t.scrollLeft : t.offset.left, i = e.left - a.collisionPosition.marginLeft, o = i - l, c = i + a.collisionWidth - s - l, f = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, n = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, h = -2 * a.offset[0], m, p;
                    if (o < 0) {
                        m = e.left + f + n + h + a.collisionWidth - s - r;
                        if (m < 0 || m < x(o)) {
                            e.left += f + n + h;
                        }
                    } else if (c > 0) {
                        p = e.left - a.collisionPosition.marginLeft + f + n + h - l;
                        if (p > 0 || x(p) < c) {
                            e.left += f + n + h;
                        }
                    }
                    z.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    z.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var t = a.within, r = t.offset.top + t.scrollTop, s = t.height, l = t.isWindow ? t.scrollTop : t.offset.top, i = e.top - a.collisionPosition.marginTop, o = i - l, c = i + a.collisionHeight - s - l, f = a.my[1] === "top", n = f ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, h = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, m = -2 * a.offset[1], p, d;
                    if (o < 0) {
                        d = e.top + n + h + m + a.collisionHeight - s - r;
                        if (d < 0 || d < x(o)) {
                            e.top += n + h + m;
                        }
                    } else if (c > 0) {
                        p = e.top - a.collisionPosition.marginTop + n + h + m - l;
                        if (p > 0 || x(p) < c) {
                            e.top += n + h + m;
                        }
                    }
                    z.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    z.ui.pos.flip.left.apply(this, arguments);
                    z.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    z.ui.pos.flip.top.apply(this, arguments);
                    z.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, t, r, s, l = document.getElementsByTagName("body")[0], i = document.createElement("div");
            e = document.createElement(l ? "div" : "body");
            t = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (l) {
                z.extend(t, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (s in t) {
                e.style[s] = t[s];
            }
            e.appendChild(i);
            a = l || document.documentElement;
            a.insertBefore(e, a.firstChild);
            i.style.cssText = "position: absolute; left: 10.7432222px;";
            r = z(i).offset().left;
            z.support.offsetFractions = r > 10 && r < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = z.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(c) {
    "use strict";
    var i = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return c(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return c.isArray(e);
        },
        inArray: function(e, a) {
            return c.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var t = function(e, a) {
        this._id = t._idCounter++;
        this.element = c(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = c.extend({}, t.defaultOptions, this.element.data(), a);
        this.options.templates = c.extend({}, t.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = i.isElement(this.options.container) ? c(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = c("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    t._idCounter = 0;
    t.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    t.batch = function(e, a) {
        var t = Array.prototype.slice.call(arguments, 2);
        return c(e).each(function() {
            var e = c(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, t);
            }
        });
    };
    t.prototype = {
        constructor: t,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(c.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = c(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !i.isEmpty(this.options.templates.footer)) {
                var a = c(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(c(this.options.templates.search));
                }
                if (!i.isEmpty(this.options.templates.buttons)) {
                    a.append(c(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var t = this;
            this.iconpicker = c(this.options.templates.iconpicker);
            var e = function(e) {
                var a = c(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                t._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: t.iconpickerValue
                });
                if (t.options.mustAccept === false) {
                    t.update(a.data("iconpickerValue"));
                    t._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: t.iconpickerValue
                    });
                } else {
                    t.update(a.data("iconpickerValue"), true);
                }
                if (t.options.hideOnSelect && t.options.mustAccept === false) {
                    t.hide();
                }
            };
            var a = c(this.options.templates.iconpickerItem);
            var r = [];
            for (var s in this.options.icons) {
                if (typeof this.options.icons[s].title === "string") {
                    var l = a.clone();
                    l.find("i").addClass(this.options.fullClassFormatter(this.options.icons[s].title));
                    l.data("iconpickerValue", this.options.icons[s].title).on("click.iconpicker", e);
                    l.attr("title", "." + this.options.icons[s].title);
                    if (this.options.icons[s].searchTerms.length > 0) {
                        var i = "";
                        for (var o = 0; o < this.options.icons[s].searchTerms.length; o++) {
                            i = i + this.options.icons[s].searchTerms[o] + " ";
                        }
                        l.attr("data-search-terms", i);
                    }
                    r.push(l);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(r);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = c(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(c(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!i.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(c(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = c(window.document);
            var a = this;
            var t = ".iconpicker.inst" + this._id;
            c(window).on("resize.iconpicker" + t + " orientationchange.iconpicker" + t, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + t, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            c(window).off(".iconpicker.inst" + this._id);
            c(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var t = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(c.extend({}, t, e));
            }
            switch (e) {
              case "inline":
                {
                    t = false;
                }
                break;

              case "topLeftCorner":
                {
                    t.my = "right bottom";
                    t.at = "left top";
                }
                break;

              case "topLeft":
                {
                    t.my = "left bottom";
                    t.at = "left top";
                }
                break;

              case "top":
                {
                    t.my = "center bottom";
                    t.at = "center top";
                }
                break;

              case "topRight":
                {
                    t.my = "right bottom";
                    t.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    t.my = "left bottom";
                    t.at = "right top";
                }
                break;

              case "rightTop":
                {
                    t.my = "left bottom";
                    t.at = "right center";
                }
                break;

              case "right":
                {
                    t.my = "left center";
                    t.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    t.my = "left top";
                    t.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    t.my = "left top";
                    t.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    t.my = "right top";
                    t.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    t.my = "center top";
                    t.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    t.my = "left top";
                    t.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    t.my = "right top";
                    t.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    t.my = "right top";
                    t.at = "left center";
                }
                break;

              case "left":
                {
                    t.my = "right center";
                    t.at = "left center";
                }
                break;

              case "leftTop":
                {
                    t.my = "right bottom";
                    t.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (t !== false) {
                this.popover.pos(t).css("maxWidth", c(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!i.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = c.trim(e);
            var t = false;
            for (var r = 0; r < this.options.icons.length; r++) {
                if (this.options.icons[r].title === e) {
                    t = true;
                    break;
                }
            }
            if (t || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(s) {
            if (i.isEmpty(s)) {
                this.iconpicker.find(".iconpicker-item").show();
                return c(false);
            } else {
                var l = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = c(this);
                    var a = e.attr("title").toLowerCase();
                    var t = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + t;
                    var r = false;
                    try {
                        r = new RegExp("(^|\\W)" + s, "g");
                    } catch (e) {
                        r = false;
                    }
                    if (r !== false && a.match(r)) {
                        l.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return l;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            c(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    c.iconpicker = t;
    c.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = c(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new t(this, typeof a === "object" ? a : {}));
            }
        });
    };
    t.defaultOptions = c.extend(t.defaultOptions, {
        icons: [ {
            title: "fal fa-abacus",
            searchTerms: []
        }, {
            title: "fal fa-acorn",
            searchTerms: [ "fall", "nature", "nut", "seasonal", "tree" ]
        }, {
            title: "fal fa-ad",
            searchTerms: []
        }, {
            title: "fal fa-address-book",
            searchTerms: []
        }, {
            title: "fal fa-address-card",
            searchTerms: []
        }, {
            title: "fal fa-adjust",
            searchTerms: [ "contrast" ]
        }, {
            title: "fal fa-air-freshener",
            searchTerms: []
        }, {
            title: "fal fa-alarm-clock",
            searchTerms: [ "date", "late", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alicorn",
            searchTerms: [ "fantasy", "fauna", "horse", "mammmal", "pegasus", "unicorn", "wing" ]
        }, {
            title: "fal fa-align-center",
            searchTerms: [ "middle", "text" ]
        }, {
            title: "fal fa-align-justify",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-align-left",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-align-right",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-allergies",
            searchTerms: [ "freckles", "hand", "intolerances", "pox", "spots" ]
        }, {
            title: "fal fa-ambulance",
            searchTerms: [ "help", "machine", "support", "vehicle" ]
        }, {
            title: "fal fa-american-sign-language-interpreting",
            searchTerms: []
        }, {
            title: "fal fa-analytics",
            searchTerms: []
        }, {
            title: "fal fa-anchor",
            searchTerms: [ "link" ]
        }, {
            title: "fal fa-angel",
            searchTerms: [ "christmas", "decoration", "halo", "holiday", "jonathan smith", "michael landon", "person", "wings", "xmas" ]
        }, {
            title: "fal fa-angle-double-down",
            searchTerms: [ "arrows" ]
        }, {
            title: "fal fa-angle-double-left",
            searchTerms: [ "arrows", "back", "laquo", "previous", "quote" ]
        }, {
            title: "fal fa-angle-double-right",
            searchTerms: [ "arrows", "forward", "next", "quote", "raquo" ]
        }, {
            title: "fal fa-angle-double-up",
            searchTerms: [ "arrows" ]
        }, {
            title: "fal fa-angle-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-angle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-angle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-angle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fal fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egyptian", "venus" ]
        }, {
            title: "fal fa-apple-alt",
            searchTerms: [ "fall", "food", "fruit", "fuji", "macintosh", "seasonal" ]
        }, {
            title: "fal fa-apple-crate",
            searchTerms: [ "bushel", "container", "fall", "food", "fruit", "fuji", "macintosh", "peck", "seasonal" ]
        }, {
            title: "fal fa-archive",
            searchTerms: [ "box", "package", "storage" ]
        }, {
            title: "fal fa-archway",
            searchTerms: [ "arc", "monument", "road", "street" ]
        }, {
            title: "fal fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fal fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fal fa-arrow-alt-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-from-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-square-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-square-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-to-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-alt-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-circle-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-from-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-square-down",
            searchTerms: []
        }, {
            title: "fal fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-square-up",
            searchTerms: []
        }, {
            title: "fal fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-to-top",
            searchTerms: []
        }, {
            title: "fal fa-arrow-up",
            searchTerms: []
        }, {
            title: "fal fa-arrows",
            searchTerms: [ "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "resize" ]
        }, {
            title: "fal fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "resize" ]
        }, {
            title: "fal fa-arrows-h",
            searchTerms: [ "resize" ]
        }, {
            title: "fal fa-arrows-v",
            searchTerms: [ "resize" ]
        }, {
            title: "fal fa-assistive-listening-systems",
            searchTerms: []
        }, {
            title: "fal fa-asterisk",
            searchTerms: [ "details" ]
        }, {
            title: "fal fa-at",
            searchTerms: [ "e-mail", "email" ]
        }, {
            title: "fal fa-atlas",
            searchTerms: [ "book", "directions", "geography", "map", "wayfinding" ]
        }, {
            title: "fal fa-atom",
            searchTerms: [ "atheism", "chemistry", "science" ]
        }, {
            title: "fal fa-atom-alt",
            searchTerms: []
        }, {
            title: "fal fa-audio-description",
            searchTerms: []
        }, {
            title: "fal fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon" ]
        }, {
            title: "fal fa-axe",
            searchTerms: [ "blade", "cut", "fall", "outdoors", "seasonal", "sharp", "swing", "tool", "weapon" ]
        }, {
            title: "fal fa-axe-battle",
            searchTerms: [ "Dungeons & Dragons", "barbarian", "d&d", "dnd", "fantasy", "gimli", "lumberjack", "melee attack" ]
        }, {
            title: "fal fa-baby",
            searchTerms: [ "diaper", "human", "infant", "kid", "offspring", "person", "sprout" ]
        }, {
            title: "fal fa-baby-carriage",
            searchTerms: [ "buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels" ]
        }, {
            title: "fal fa-backpack",
            searchTerms: []
        }, {
            title: "fal fa-backspace",
            searchTerms: [ "command", "delete", "keyboard", "undo" ]
        }, {
            title: "fal fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fal fa-badge",
            searchTerms: []
        }, {
            title: "fal fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "winner", "yes" ]
        }, {
            title: "fal fa-badge-dollar",
            searchTerms: []
        }, {
            title: "fal fa-badge-percent",
            searchTerms: []
        }, {
            title: "fal fa-badger-honey",
            searchTerms: [ "care", "dont", "ewww", "fauna", "mammmal", "nasty" ]
        }, {
            title: "fal fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fal fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-ball-pile",
            searchTerms: [ "group", "seasonal", "snowballs" ]
        }, {
            title: "fal fa-ballot",
            searchTerms: [ "election", "vote", "voting" ]
        }, {
            title: "fal fa-ballot-check",
            searchTerms: [ "completed", "done", "election", "finished", "vote", "voting" ]
        }, {
            title: "fal fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fal fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "ouch" ]
        }, {
            title: "fal fa-barcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fal fa-barcode-alt",
            searchTerms: []
        }, {
            title: "fal fa-barcode-read",
            searchTerms: []
        }, {
            title: "fal fa-barcode-scan",
            searchTerms: []
        }, {
            title: "fal fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fal fa-baseball",
            searchTerms: []
        }, {
            title: "fal fa-baseball-ball",
            searchTerms: []
        }, {
            title: "fal fa-basketball-ball",
            searchTerms: []
        }, {
            title: "fal fa-basketball-hoop",
            searchTerms: []
        }, {
            title: "fal fa-bat",
            searchTerms: [ "batman", "bruce wayne", "flying", "gotham", "halloween", "holiday", "mammal", "wings" ]
        }, {
            title: "fal fa-bath",
            searchTerms: []
        }, {
            title: "fal fa-battery-bolt",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-empty",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-full",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-half",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-quarter",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-slash",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-battery-three-quarters",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fal fa-bed",
            searchTerms: [ "lodging", "sleep", "travel" ]
        }, {
            title: "fal fa-beer",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor", "mug", "stein" ]
        }, {
            title: "fal fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-school",
            searchTerms: [ "alert", "class", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-school-slash",
            searchTerms: [ "alert", "cancel", "class", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fal fa-bell-slash",
            searchTerms: [ "alert", "cancel", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fal fa-bells",
            searchTerms: [ "alert", "christmas", "holiday", "notification", "reminder", "xmas" ]
        }, {
            title: "fal fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fal fa-bible",
            searchTerms: [ "book", "catholicism", "christianity" ]
        }, {
            title: "fal fa-bicycle",
            searchTerms: [ "bike", "gears", "transportation", "vehicle" ]
        }, {
            title: "fal fa-binoculars",
            searchTerms: []
        }, {
            title: "fal fa-biohazard",
            searchTerms: [ "danger", "dangerous", "medical", "waste" ]
        }, {
            title: "fal fa-birthday-cake",
            searchTerms: []
        }, {
            title: "fal fa-blanket",
            searchTerms: []
        }, {
            title: "fal fa-blender",
            searchTerms: []
        }, {
            title: "fal fa-blender-phone",
            searchTerms: [ "appliance", "fantasy", "silly" ]
        }, {
            title: "fal fa-blind",
            searchTerms: [ "cane", "disability", "person", "sight" ]
        }, {
            title: "fal fa-blog",
            searchTerms: [ "journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing" ]
        }, {
            title: "fal fa-bold",
            searchTerms: []
        }, {
            title: "fal fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fal fa-bomb",
            searchTerms: []
        }, {
            title: "fal fa-bone",
            searchTerms: []
        }, {
            title: "fal fa-bone-break",
            searchTerms: []
        }, {
            title: "fal fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fal fa-book",
            searchTerms: [ "documentation", "read" ]
        }, {
            title: "fal fa-book-alt",
            searchTerms: []
        }, {
            title: "fal fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "read", "skull", "spell" ]
        }, {
            title: "fal fa-book-heart",
            searchTerms: []
        }, {
            title: "fal fa-book-open",
            searchTerms: [ "flyer", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fal fa-book-reader",
            searchTerms: [ "library" ]
        }, {
            title: "fal fa-book-spells",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dark arts", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "mage", "magic", "read", "sorcery", "voodoo", "witch", "wizard" ]
        }, {
            title: "fal fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "fal fa-books",
            searchTerms: []
        }, {
            title: "fal fa-boot",
            searchTerms: [ "clothing", "foot", "seasonal", "shoe", "sturdy" ]
        }, {
            title: "fal fa-booth-curtain",
            searchTerms: [ "changing room", "election", "vote", "voting", "voting booth" ]
        }, {
            title: "fal fa-bow-arrow",
            searchTerms: [ "Dungeons & Dragons", "archery", "d&d", "dnd", "fantasy", "legolas", "ranged attack", "ranger", "weapon" ]
        }, {
            title: "fal fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fal fa-bowling-pins",
            searchTerms: []
        }, {
            title: "fal fa-box",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-box-alt",
            searchTerms: []
        }, {
            title: "fal fa-box-ballot",
            searchTerms: [ "election", "politics", "vote", "voting" ]
        }, {
            title: "fal fa-box-check",
            searchTerms: [ "accept", "ackage", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-box-fragile",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-box-full",
            searchTerms: [ "package", "packed" ]
        }, {
            title: "fal fa-box-heart",
            searchTerms: [ "care", "package" ]
        }, {
            title: "fal fa-box-open",
            searchTerms: []
        }, {
            title: "fal fa-box-up",
            searchTerms: []
        }, {
            title: "fal fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "money", "usd" ]
        }, {
            title: "fal fa-boxes",
            searchTerms: []
        }, {
            title: "fal fa-boxes-alt",
            searchTerms: []
        }, {
            title: "fal fa-boxing-glove",
            searchTerms: []
        }, {
            title: "fal fa-braille",
            searchTerms: []
        }, {
            title: "fal fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "fal fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fal fa-briefcase-medical",
            searchTerms: [ "health briefcase" ]
        }, {
            title: "fal fa-broadcast-tower",
            searchTerms: [ "airwaves", "radio", "waves" ]
        }, {
            title: "fal fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "holiday", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "fal fa-browser",
            searchTerms: [ "website" ]
        }, {
            title: "fal fa-brush",
            searchTerms: [ "bristles", "color", "handle", "painting" ]
        }, {
            title: "fal fa-bug",
            searchTerms: [ "insect", "report" ]
        }, {
            title: "fal fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "fal fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fal fa-bullseye",
            searchTerms: [ "target" ]
        }, {
            title: "fal fa-bullseye-arrow",
            searchTerms: [ "archery", "target" ]
        }, {
            title: "fal fa-bullseye-pointer",
            searchTerms: [ "target" ]
        }, {
            title: "fal fa-burn",
            searchTerms: [ "energy" ]
        }, {
            title: "fal fa-bus",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bus-alt",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bus-school",
            searchTerms: []
        }, {
            title: "fal fa-business-time",
            searchTerms: [ "briefcase", "business socks", "clock", "flight of the conchords", "wednesday" ]
        }, {
            title: "fal fa-cabinet-filing",
            searchTerms: []
        }, {
            title: "fal fa-calculator",
            searchTerms: []
        }, {
            title: "fal fa-calculator-alt",
            searchTerms: []
        }, {
            title: "fal fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "date", "done", "event", "ok", "schedule", "select", "success", "time", "todo", "when" ]
        }, {
            title: "fal fa-calendar-day",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single day", "time", "today", "when" ]
        }, {
            title: "fal fa-calendar-edit",
            searchTerms: [ "date", "edit", "event", "pen", "pencil", "schedule", "time", "update", "when", "write" ]
        }, {
            title: "fal fa-calendar-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-calendar-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-calendar-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-calendar-star",
            searchTerms: []
        }, {
            title: "fal fa-calendar-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-calendar-week",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single week", "time", "today", "when" ]
        }, {
            title: "fal fa-camera",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-camera-alt",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-camera-retro",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fal fa-campfire",
            searchTerms: [ "Dungeons & Dragons", "caliente", "campaign", "camping", "d&d", "dnd", "fall", "fire", "flame", "gathering", "heat", "hot", "meeting", "outdoors", "seasonal", "tent", "wilderness" ]
        }, {
            title: "fal fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "seasonal", "tent" ]
        }, {
            title: "fal fa-candle-holder",
            searchTerms: [ "fire", "flame", "halloween", "holiday", "hot", "light", "lit", "wick" ]
        }, {
            title: "fal fa-candy-cane",
            searchTerms: [ "candy", "christmas", "food", "holiday", "mint", "peppermint", "striped", "xmas" ]
        }, {
            title: "fal fa-candy-corn",
            searchTerms: [ "food", "halloween", "holiday", "sugar", "triangles" ]
        }, {
            title: "fal fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fal fa-capsules",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-car",
            searchTerms: [ "machine", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car-alt",
            searchTerms: []
        }, {
            title: "fal fa-car-battery",
            searchTerms: []
        }, {
            title: "fal fa-car-bump",
            searchTerms: []
        }, {
            title: "fal fa-car-crash",
            searchTerms: []
        }, {
            title: "fal fa-car-garage",
            searchTerms: []
        }, {
            title: "fal fa-car-mechanic",
            searchTerms: []
        }, {
            title: "fal fa-car-side",
            searchTerms: []
        }, {
            title: "fal fa-car-tilt",
            searchTerms: []
        }, {
            title: "fal fa-car-wash",
            searchTerms: []
        }, {
            title: "fal fa-caret-circle-down",
            searchTerms: [ "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-caret-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-caret-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-caret-circle-up",
            searchTerms: []
        }, {
            title: "fal fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more", "triangle down" ]
        }, {
            title: "fal fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle left" ]
        }, {
            title: "fal fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle right" ]
        }, {
            title: "fal fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "fal fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
        }, {
            title: "fal fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "fal fa-caret-up",
            searchTerms: [ "arrow", "triangle up" ]
        }, {
            title: "fal fa-carrot",
            searchTerms: [ "bugs bunny", "food", "holiday", "orange", "vegetable" ]
        }, {
            title: "fal fa-cart-arrow-down",
            searchTerms: [ "shopping" ]
        }, {
            title: "fal fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "fal fa-cash-register",
            searchTerms: [ "buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store" ]
        }, {
            title: "fal fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "fal fa-cauldron",
            searchTerms: [ "boil", "bubble", "cooking", "halloween", "holiday", "magic", "pot", "sorcery", "toil", "trouble", "witch", "wizard" ]
        }, {
            title: "fal fa-certificate",
            searchTerms: [ "badge", "star" ]
        }, {
            title: "fal fa-chair",
            searchTerms: [ "furniture", "seat" ]
        }, {
            title: "fal fa-chair-office",
            searchTerms: [ "furniture", "seat" ]
        }, {
            title: "fal fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fal fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fal fa-charging-station",
            searchTerms: []
        }, {
            title: "fal fa-chart-area",
            searchTerms: [ "analytics", "area-chart", "graph" ]
        }, {
            title: "fal fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "fal fa-chart-line",
            searchTerms: [ "activity", "analytics", "dashboard", "gain", "graph", "increase", "line-chart" ]
        }, {
            title: "fal fa-chart-line-down",
            searchTerms: [ "analytics", "dashboard", "decline", "graph", "line-chart", "loss" ]
        }, {
            title: "fal fa-chart-network",
            searchTerms: [ "activity", "analytics", "association", "dashboard", "distribution", "map", "network" ]
        }, {
            title: "fal fa-chart-pie",
            searchTerms: [ "analytics", "graph", "pie-chart" ]
        }, {
            title: "fal fa-chart-pie-alt",
            searchTerms: []
        }, {
            title: "fal fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fal fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-chess",
            searchTerms: []
        }, {
            title: "fal fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fal fa-chess-bishop-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-board",
            searchTerms: []
        }, {
            title: "fal fa-chess-clock",
            searchTerms: []
        }, {
            title: "fal fa-chess-clock-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-king",
            searchTerms: []
        }, {
            title: "fal fa-chess-king-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-knight",
            searchTerms: []
        }, {
            title: "fal fa-chess-knight-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fal fa-chess-pawn-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-queen",
            searchTerms: []
        }, {
            title: "fal fa-chess-queen-alt",
            searchTerms: []
        }, {
            title: "fal fa-chess-rook",
            searchTerms: []
        }, {
            title: "fal fa-chess-rook-alt",
            searchTerms: []
        }, {
            title: "fal fa-chevron-circle-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-circle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-chevron-double-down",
            searchTerms: []
        }, {
            title: "fal fa-chevron-double-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-double-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-double-up",
            searchTerms: []
        }, {
            title: "fal fa-chevron-down",
            searchTerms: []
        }, {
            title: "fal fa-chevron-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-square-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-square-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-chevron-up",
            searchTerms: []
        }, {
            title: "fal fa-child",
            searchTerms: []
        }, {
            title: "fal fa-chimney",
            searchTerms: [ "brick", "fireplace", "house", "roof", "seasonal" ]
        }, {
            title: "fal fa-church",
            searchTerms: [ "building", "community", "religion" ]
        }, {
            title: "fal fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
        }, {
            title: "fal fa-circle-notch",
            searchTerms: [ "circle-o-notch" ]
        }, {
            title: "fal fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "fal fa-claw-marks",
            searchTerms: [ "attack", "damage", "halloween", "holiday", "rip", "scratch", "tear", "torn" ]
        }, {
            title: "fal fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "fal fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fal fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "todo", "ul" ]
        }, {
            title: "fal fa-clipboard-list-check",
            searchTerms: [ "checklist", "completed", "done", "election", "finished", "intinerary", "ol", "schedule", "todo", "ul", "vote", "voting" ]
        }, {
            title: "fal fa-clipboard-prescription",
            searchTerms: []
        }, {
            title: "fal fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-clone",
            searchTerms: [ "copy", "duplicate" ]
        }, {
            title: "fal fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "fal fa-cloud",
            searchTerms: [ "save" ]
        }, {
            title: "fal fa-cloud-download",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-cloud-download-alt",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-cloud-drizzle",
            searchTerms: [ "precipitation", "rain" ]
        }, {
            title: "fal fa-cloud-hail",
            searchTerms: [ "golf balls", "precipitation" ]
        }, {
            title: "fal fa-cloud-hail-mixed",
            searchTerms: [ "precipitation", "rain", "storm" ]
        }, {
            title: "fal fa-cloud-meatball",
            searchTerms: []
        }, {
            title: "fal fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "halloween", "holiday", "lunar", "night", "sky" ]
        }, {
            title: "fal fa-cloud-moon-rain",
            searchTerms: []
        }, {
            title: "fal fa-cloud-rain",
            searchTerms: [ "precipitation" ]
        }, {
            title: "fal fa-cloud-rainbow",
            searchTerms: []
        }, {
            title: "fal fa-cloud-showers",
            searchTerms: [ "precipitation", "rain" ]
        }, {
            title: "fal fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "storm" ]
        }, {
            title: "fal fa-cloud-sleet",
            searchTerms: [ "precipitation", "winter", "wintry mix" ]
        }, {
            title: "fal fa-cloud-snow",
            searchTerms: [ "precipitation", "winter" ]
        }, {
            title: "fal fa-cloud-sun",
            searchTerms: [ "day", "daytime", "fall", "outdoors", "seasonal" ]
        }, {
            title: "fal fa-cloud-sun-rain",
            searchTerms: []
        }, {
            title: "fal fa-cloud-upload",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload" ]
        }, {
            title: "fal fa-clouds",
            searchTerms: []
        }, {
            title: "fal fa-clouds-moon",
            searchTerms: []
        }, {
            title: "fal fa-clouds-sun",
            searchTerms: []
        }, {
            title: "fal fa-club",
            searchTerms: [ "card", "suit" ]
        }, {
            title: "fal fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink" ]
        }, {
            title: "fal fa-code",
            searchTerms: [ "brackets", "html" ]
        }, {
            title: "fal fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "fal fa-coffee-togo",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "latte", "morning", "mug", "stahhbucks", "takeout", "tea" ]
        }, {
            title: "fal fa-coffin",
            searchTerms: [ "halloween", "holiday" ]
        }, {
            title: "fal fa-cog",
            searchTerms: [ "settings" ]
        }, {
            title: "fal fa-cogs",
            searchTerms: [ "gears", "settings" ]
        }, {
            title: "fal fa-coins",
            searchTerms: []
        }, {
            title: "fal fa-columns",
            searchTerms: [ "dashboard", "panes", "split" ]
        }, {
            title: "fal fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-check",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-dollar",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-dots",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-comment-alt-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-comment-alt-lines",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-comment-alt-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-comment-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-comment-alt-smile",
            searchTerms: [ "happy" ]
        }, {
            title: "fal fa-comment-alt-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-comment-check",
            searchTerms: []
        }, {
            title: "fal fa-comment-dollar",
            searchTerms: []
        }, {
            title: "fal fa-comment-dots",
            searchTerms: []
        }, {
            title: "fal fa-comment-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-comment-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-comment-lines",
            searchTerms: []
        }, {
            title: "fal fa-comment-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-comment-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-comment-slash",
            searchTerms: []
        }, {
            title: "fal fa-comment-smile",
            searchTerms: []
        }, {
            title: "fal fa-comment-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-comments",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comments-alt",
            searchTerms: []
        }, {
            title: "fal fa-comments-alt-dollar",
            searchTerms: []
        }, {
            title: "fal fa-comments-dollar",
            searchTerms: []
        }, {
            title: "fal fa-compact-disc",
            searchTerms: [ "bluray", "cd", "disc", "media" ]
        }, {
            title: "fal fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "fal fa-compass-slash",
            searchTerms: []
        }, {
            title: "fal fa-compress",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-compress-alt",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-compress-arrows-alt",
            searchTerms: [ "arrows-alt", "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fal fa-compress-wide",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fal fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "service", "support" ]
        }, {
            title: "fal fa-container-storage",
            searchTerms: []
        }, {
            title: "fal fa-conveyor-belt",
            searchTerms: []
        }, {
            title: "fal fa-conveyor-belt-alt",
            searchTerms: []
        }, {
            title: "fal fa-cookie",
            searchTerms: [ "baked good", "chips", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "eating", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
        }, {
            title: "fal fa-copyright",
            searchTerms: []
        }, {
            title: "fal fa-corn",
            searchTerms: [ "cob", "ear", "fall", "food", "kernel", "maize", "seasonal" ]
        }, {
            title: "fal fa-couch",
            searchTerms: [ "furniture", "sofa" ]
        }, {
            title: "fal fa-cow",
            searchTerms: [ "agriculture", "bovine", "farm", "fauna", "mammmal", "moo" ]
        }, {
            title: "fal fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-cricket",
            searchTerms: []
        }, {
            title: "fal fa-crop",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-crop-alt",
            searchTerms: []
        }, {
            title: "fal fa-cross",
            searchTerms: [ "catholicism", "christianity" ]
        }, {
            title: "fal fa-crosshairs",
            searchTerms: [ "gpd", "picker", "position" ]
        }, {
            title: "fal fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "fal fa-crown",
            searchTerms: []
        }, {
            title: "fal fa-cube",
            searchTerms: [ "package" ]
        }, {
            title: "fal fa-cubes",
            searchTerms: [ "packages" ]
        }, {
            title: "fal fa-curling",
            searchTerms: []
        }, {
            title: "fal fa-cut",
            searchTerms: [ "scissors" ]
        }, {
            title: "fal fa-dagger",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "melee attack", "rogue", "sting", "weapon" ]
        }, {
            title: "fal fa-database",
            searchTerms: []
        }, {
            title: "fal fa-deaf",
            searchTerms: []
        }, {
            title: "fal fa-deer",
            searchTerms: [ "antlers", "blitzen", "comet", "cupid", "dancer", "dasher", "donner", "fauna", "mammal", "prancer", "reindeer", "vixen" ]
        }, {
            title: "fal fa-deer-rudolph",
            searchTerms: [ "antlers", "fauna", "mammal", "reindeer" ]
        }, {
            title: "fal fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "fal fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fal fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "fal fa-dewpoint",
            searchTerms: []
        }, {
            title: "fal fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "fal fa-diagnoses",
            searchTerms: []
        }, {
            title: "fal fa-diamond",
            searchTerms: [ "gem", "gemstone" ]
        }, {
            title: "fal fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d10",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d12",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d4",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d8",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-digital-tachograph",
            searchTerms: []
        }, {
            title: "fal fa-diploma",
            searchTerms: []
        }, {
            title: "fal fa-directions",
            searchTerms: []
        }, {
            title: "fal fa-divide",
            searchTerms: []
        }, {
            title: "fal fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
        }, {
            title: "fal fa-dna",
            searchTerms: [ "double helix", "helix" ]
        }, {
            title: "fal fa-do-not-enter",
            searchTerms: []
        }, {
            title: "fal fa-dog",
            searchTerms: [ "canine", "fauna", "mammmal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "fal fa-dog-leashed",
            searchTerms: [ "canine", "fauna", "mammmal", "pet", "pooch", "puppy", "walk", "woof" ]
        }, {
            title: "fal fa-dollar-sign",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-dolly",
            searchTerms: []
        }, {
            title: "fal fa-dolly-empty",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed-alt",
            searchTerms: []
        }, {
            title: "fal fa-dolly-flatbed-empty",
            searchTerms: []
        }, {
            title: "fal fa-donate",
            searchTerms: [ "generosity", "give" ]
        }, {
            title: "fal fa-door-closed",
            searchTerms: []
        }, {
            title: "fal fa-door-open",
            searchTerms: []
        }, {
            title: "fal fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fal fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace" ]
        }, {
            title: "fal fa-download",
            searchTerms: [ "import" ]
        }, {
            title: "fal fa-drafting-compass",
            searchTerms: [ "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fal fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy" ]
        }, {
            title: "fal fa-draw-circle",
            searchTerms: []
        }, {
            title: "fal fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fal fa-draw-square",
            searchTerms: []
        }, {
            title: "fal fa-dreidel",
            searchTerms: [ "clay", "hanukkah", "holiday", "jewish", "judaism", "toy" ]
        }, {
            title: "fal fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fal fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fal fa-drumstick",
            searchTerms: [ "bone", "chicken", "fall", "food", "leg", "poultry", "seasonal", "turkey" ]
        }, {
            title: "fal fa-drumstick-bite",
            searchTerms: []
        }, {
            title: "fal fa-duck",
            searchTerms: [ "bath", "bird", "fauna", "quack", "rubber" ]
        }, {
            title: "fal fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fal fa-dumpster",
            searchTerms: [ "alley", "bin", "commercial", "trash", "waste" ]
        }, {
            title: "fal fa-dumpster-fire",
            searchTerms: [ "alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste" ]
        }, {
            title: "fal fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "fal fa-ear",
            searchTerms: []
        }, {
            title: "fal fa-ear-muffs",
            searchTerms: [ "accessory", "clothing", "cold", "head", "puffy", "seasonal", "soft" ]
        }, {
            title: "fal fa-eclipse",
            searchTerms: []
        }, {
            title: "fal fa-eclipse-alt",
            searchTerms: []
        }, {
            title: "fal fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-eject",
            searchTerms: []
        }, {
            title: "fal fa-elephant",
            searchTerms: [ "dumbo", "fauna", "mammmal", null, "pachyderm", "trunk" ]
        }, {
            title: "fal fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-empty-set",
            searchTerms: []
        }, {
            title: "fal fa-engine-warning",
            searchTerms: []
        }, {
            title: "fal fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-open-dollar",
            searchTerms: []
        }, {
            title: "fal fa-envelope-open-text",
            searchTerms: []
        }, {
            title: "fal fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-equals",
            searchTerms: []
        }, {
            title: "fal fa-eraser",
            searchTerms: [ "delete", "remove" ]
        }, {
            title: "fal fa-ethernet",
            searchTerms: [ "cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired" ]
        }, {
            title: "fal fa-euro-sign",
            searchTerms: [ "eur" ]
        }, {
            title: "fal fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-expand",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-alt",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-external-link",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fal fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open" ]
        }, {
            title: "fal fa-external-link-square",
            searchTerms: [ "new", "open" ]
        }, {
            title: "fal fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open" ]
        }, {
            title: "fal fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fal fa-eye-dropper",
            searchTerms: [ "eyedropper" ]
        }, {
            title: "fal fa-eye-evil",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "sauron", "see", "seen", "show", "sight" ]
        }, {
            title: "fal fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fal fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-fax",
            searchTerms: []
        }, {
            title: "fal fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fal fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fal fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fal fa-field-hockey",
            searchTerms: []
        }, {
            title: "fal fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fal fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fal fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fal fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fal fa-file-audio",
            searchTerms: []
        }, {
            title: "fal fa-file-certificate",
            searchTerms: []
        }, {
            title: "fal fa-file-chart-line",
            searchTerms: [ "analytics", "data", "projection", "report" ]
        }, {
            title: "fal fa-file-chart-pie",
            searchTerms: [ "analytics", "data", "projection", "report" ]
        }, {
            title: "fal fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "synced", "todo" ]
        }, {
            title: "fal fa-file-code",
            searchTerms: []
        }, {
            title: "fal fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fal fa-file-csv",
            searchTerms: [ "spreadsheets" ]
        }, {
            title: "fal fa-file-download",
            searchTerms: []
        }, {
            title: "fal fa-file-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-file-excel",
            searchTerms: []
        }, {
            title: "fal fa-file-exclamation",
            searchTerms: [ "important" ]
        }, {
            title: "fal fa-file-export",
            searchTerms: []
        }, {
            title: "fal fa-file-image",
            searchTerms: []
        }, {
            title: "fal fa-file-import",
            searchTerms: []
        }, {
            title: "fal fa-file-invoice",
            searchTerms: [ "bill", "document", "receipt" ]
        }, {
            title: "fal fa-file-invoice-dollar",
            searchTerms: [ "$", "bill", "document", "dollar-sign", "money", "receipt", "usd" ]
        }, {
            title: "fal fa-file-medical",
            searchTerms: []
        }, {
            title: "fal fa-file-medical-alt",
            searchTerms: []
        }, {
            title: "fal fa-file-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-file-pdf",
            searchTerms: []
        }, {
            title: "fal fa-file-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fal fa-file-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fal fa-file-spreadsheet",
            searchTerms: [ "excel", "numbers", "sheets", "xls" ]
        }, {
            title: "fal fa-file-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-file-upload",
            searchTerms: []
        }, {
            title: "fal fa-file-user",
            searchTerms: [ "account", "personnel", "profile" ]
        }, {
            title: "fal fa-file-video",
            searchTerms: []
        }, {
            title: "fal fa-file-word",
            searchTerms: []
        }, {
            title: "fal fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fal fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fal fa-film",
            searchTerms: [ "movie" ]
        }, {
            title: "fal fa-film-alt",
            searchTerms: []
        }, {
            title: "fal fa-filter",
            searchTerms: [ "funnel", "options" ]
        }, {
            title: "fal fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fal fa-fire",
            searchTerms: [ "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fal fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fal fa-fire-smoke",
            searchTerms: []
        }, {
            title: "fal fa-fireplace",
            searchTerms: [ "caliente", "flame", "hearth", "heat", "holiday", "mantle", "toasty", "warmth" ]
        }, {
            title: "fal fa-first-aid",
            searchTerms: []
        }, {
            title: "fal fa-fish",
            searchTerms: [ "fauna", "gold", "swimming" ]
        }, {
            title: "fal fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "fal fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fal fa-flag-alt",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fal fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "fal fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "fal fa-flame",
            searchTerms: [ "Dungeons & Dragons", "caliente", "d&d", "dnd", "fantasy", "heat", "hot" ]
        }, {
            title: "fal fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fal fa-flask-poison",
            searchTerms: [ "beverage", "container", "drink", "halloween", "health", "holiday", "power" ]
        }, {
            title: "fal fa-flask-potion",
            searchTerms: [ "Dungeons & Dragons", "alert", "beaker", "beverage", "container", "d&d", "danger", "dangerous", "deadly", "death", "dnd", "drink", "fantasy", "halloween", "heal", "health", "holiday", "magic", "mana", "science" ]
        }, {
            title: "fal fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fal fa-fog",
            searchTerms: [ "opaque", "san francisco", "visibility" ]
        }, {
            title: "fal fa-folder",
            searchTerms: []
        }, {
            title: "fal fa-folder-minus",
            searchTerms: [ "archive", "delete", "negative", "remove" ]
        }, {
            title: "fal fa-folder-open",
            searchTerms: []
        }, {
            title: "fal fa-folder-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-folder-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-folders",
            searchTerms: []
        }, {
            title: "fal fa-font",
            searchTerms: [ "text" ]
        }, {
            title: "fal fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fal fa-football-ball",
            searchTerms: [ "fall", "pigskin", "seasonal" ]
        }, {
            title: "fal fa-football-helmet",
            searchTerms: []
        }, {
            title: "fal fa-forklift",
            searchTerms: []
        }, {
            title: "fal fa-forward",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-fragile",
            searchTerms: []
        }, {
            title: "fal fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "fal fa-frosty-head",
            searchTerms: [ "carrot", "hat", "seasonal", "snowman" ]
        }, {
            title: "fal fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-function",
            searchTerms: []
        }, {
            title: "fal fa-funnel-dollar",
            searchTerms: []
        }, {
            title: "fal fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "fal fa-gamepad",
            searchTerms: [ "controller" ]
        }, {
            title: "fal fa-gas-pump",
            searchTerms: []
        }, {
            title: "fal fa-gas-pump-slash",
            searchTerms: []
        }, {
            title: "fal fa-gavel",
            searchTerms: [ "hammer", "judge", "lawyer", "opinion" ]
        }, {
            title: "fal fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "fal fa-genderless",
            searchTerms: []
        }, {
            title: "fal fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "fal fa-gift",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fal fa-gift-card",
            searchTerms: []
        }, {
            title: "fal fa-gifts",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fal fa-gingerbread-man",
            searchTerms: [ "cookie", "decoration", "food", "frosting", "holiday" ]
        }, {
            title: "fal fa-glass-champagne",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "drink", "holiday", "party" ]
        }, {
            title: "fal fa-glass-cheers",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "clink", "drink", "holiday", "new year's eve", "party", "toast" ]
        }, {
            title: "fal fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fal fa-glass-martini-alt",
            searchTerms: []
        }, {
            title: "fal fa-glass-whiskey",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor", "neat", "seasonal" ]
        }, {
            title: "fal fa-glass-whiskey-rocks",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "ice", "liquor", "seasonal" ]
        }, {
            title: "fal fa-glasses",
            searchTerms: [ "foureyes", "hipster", "nerd", "reading", "sight", "spectacles" ]
        }, {
            title: "fal fa-glasses-alt",
            searchTerms: []
        }, {
            title: "fal fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-europe",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-snow",
            searchTerms: [ "diorama", "scene", "seasonal", "shake", "souvenir" ]
        }, {
            title: "fal fa-globe-stand",
            searchTerms: []
        }, {
            title: "fal fa-golf-ball",
            searchTerms: []
        }, {
            title: "fal fa-golf-club",
            searchTerms: []
        }, {
            title: "fal fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "fal fa-graduation-cap",
            searchTerms: [ "learning", "school", "student" ]
        }, {
            title: "fal fa-greater-than",
            searchTerms: []
        }, {
            title: "fal fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fal fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "fal fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "fal fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fal fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fal fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fal fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-lines",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-lines-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-guitar",
            searchTerms: [ "acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fal fa-h-square",
            searchTerms: [ "hospital", "hotel" ]
        }, {
            title: "fal fa-h1",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-h2",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-h3",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fal fa-hammer-war",
            searchTerms: [ "Dungeons & Dragons", "cleric", "d&d", "dnd", "dwarf", "fantasy", "melee attack", "weapon" ]
        }, {
            title: "fal fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "fal fa-hand-heart",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-box",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-magic",
            searchTerms: [ "Dungeons & Dragons", "cast", "d&d", "dnd", "fantasy", "mage", "spell", "witch", "wizard" ]
        }, {
            title: "fal fa-hand-holding-seedling",
            searchTerms: []
        }, {
            title: "fal fa-hand-holding-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price" ]
        }, {
            title: "fal fa-hand-holding-water",
            searchTerms: []
        }, {
            title: "fal fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fal fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "fal fa-hand-peace",
            searchTerms: []
        }, {
            title: "fal fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fal fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fal fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fal fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fal fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fal fa-hand-receiving",
            searchTerms: []
        }, {
            title: "fal fa-hand-rock",
            searchTerms: []
        }, {
            title: "fal fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fal fa-hand-spock",
            searchTerms: []
        }, {
            title: "fal fa-hands",
            searchTerms: []
        }, {
            title: "fal fa-hands-heart",
            searchTerms: []
        }, {
            title: "fal fa-hands-helping",
            searchTerms: [ "aid", "assistance", "partnership", "volunteering" ]
        }, {
            title: "fal fa-hands-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price", "usd" ]
        }, {
            title: "fal fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fal fa-handshake-alt",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fal fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fal fa-hashtag",
            searchTerms: []
        }, {
            title: "fal fa-hat-santa",
            searchTerms: [ "accessory", "christmas", "claus", "clothing", "head", "holiday", "santa", "xmas" ]
        }, {
            title: "fal fa-hat-winter",
            searchTerms: [ "accessory", "clothing", "cold", "head", "knitted", "seasonal" ]
        }, {
            title: "fal fa-hat-witch",
            searchTerms: [ "accessory", "clothing", "halloween", "head", "holiday", "mage", "magic", "sorceror" ]
        }, {
            title: "fal fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "fal fa-haykal",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "fal fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fal fa-head-side",
            searchTerms: [ "profile" ]
        }, {
            title: "fal fa-head-vr",
            searchTerms: [ "occulus", "profile", "reality", "virtual" ]
        }, {
            title: "fal fa-heading",
            searchTerms: [ "header" ]
        }, {
            title: "fal fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fal fa-heart",
            searchTerms: [ "favorite", "like", "love", "relationship" ]
        }, {
            title: "fal fa-heart-broken",
            searchTerms: [ "breakup", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad" ]
        }, {
            title: "fal fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram" ]
        }, {
            title: "fal fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heartbeat",
            searchTerms: [ "ekg", "lifeline", "vital signs" ]
        }, {
            title: "fal fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly" ]
        }, {
            title: "fal fa-helmet-battle",
            searchTerms: [ "Dungeons & Dragons", "armor", "clothing", "d&d", "dnd", "fantasy", "hat", "knight", "paladin" ]
        }, {
            title: "fal fa-hexagon",
            searchTerms: []
        }, {
            title: "fal fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "person", "seasonal", "walking" ]
        }, {
            title: "fal fa-hippo",
            searchTerms: [ "fauna", "hungry", "mammmal" ]
        }, {
            title: "fal fa-history",
            searchTerms: []
        }, {
            title: "fal fa-hockey-mask",
            searchTerms: [ "clothing", "friday", "halloween", "holiday", "jason", "protection", "thirteenth" ]
        }, {
            title: "fal fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fal fa-hockey-sticks",
            searchTerms: []
        }, {
            title: "fal fa-holly-berry",
            searchTerms: [ "catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas" ]
        }, {
            title: "fal fa-home",
            searchTerms: [ "building", "house", "main" ]
        }, {
            title: "fal fa-home-heart",
            searchTerms: []
        }, {
            title: "fal fa-hood-cloak",
            searchTerms: [ "Dungeons & Dragons", "clothing", "d&d", "dnd", "fantasy", "hat", "rogue", "stealth" ]
        }, {
            title: "fal fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "neigh" ]
        }, {
            title: "fal fa-horse-head",
            searchTerms: [ "equus", "fauna", "mammmal", "neigh" ]
        }, {
            title: "fal fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital-symbol",
            searchTerms: []
        }, {
            title: "fal fa-hot-tub",
            searchTerms: []
        }, {
            title: "fal fa-hotel",
            searchTerms: [ "building", "lodging" ]
        }, {
            title: "fal fa-hourglass",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fal fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fal fa-house-damage",
            searchTerms: [ "building", "devastation", "home" ]
        }, {
            title: "fal fa-house-flood",
            searchTerms: [ "building", "devastation", "home", "water" ]
        }, {
            title: "fal fa-hryvnia",
            searchTerms: [ "money" ]
        }, {
            title: "fal fa-humidity",
            searchTerms: []
        }, {
            title: "fal fa-hurricane",
            searchTerms: [ "coriolis effect", "eye", "storm", "tropical cyclone", "typhoon" ]
        }, {
            title: "fal fa-i-cursor",
            searchTerms: []
        }, {
            title: "fal fa-ice-skate",
            searchTerms: [ "blade", "clothing", "figure skating", "hockey", "seasonal", "shoe" ]
        }, {
            title: "fal fa-icicles",
            searchTerms: [ "cold", "frozen", "hanging", "ice", "seasonal", "sharp" ]
        }, {
            title: "fal fa-id-badge",
            searchTerms: []
        }, {
            title: "fal fa-id-card",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fal fa-id-card-alt",
            searchTerms: [ "demographics" ]
        }, {
            title: "fal fa-igloo",
            searchTerms: [ "dome", "dwelling", "eskimo", "home", "house", "ice", "seasonal" ]
        }, {
            title: "fal fa-image",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fal fa-images",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fal fa-inbox",
            searchTerms: []
        }, {
            title: "fal fa-inbox-in",
            searchTerms: []
        }, {
            title: "fal fa-inbox-out",
            searchTerms: []
        }, {
            title: "fal fa-indent",
            searchTerms: []
        }, {
            title: "fal fa-industry",
            searchTerms: [ "building", "factory", "manufacturing" ]
        }, {
            title: "fal fa-industry-alt",
            searchTerms: [ "building", "factory", "manufacturing" ]
        }, {
            title: "fal fa-infinity",
            searchTerms: []
        }, {
            title: "fal fa-info",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-info-circle",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-info-square",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fal fa-inhaler",
            searchTerms: []
        }, {
            title: "fal fa-integral",
            searchTerms: []
        }, {
            title: "fal fa-intersection",
            searchTerms: []
        }, {
            title: "fal fa-inventory",
            searchTerms: []
        }, {
            title: "fal fa-italic",
            searchTerms: [ "italics" ]
        }, {
            title: "fal fa-jack-o-lantern",
            searchTerms: [ "carve", "face", "halloween", "holiday", "lantern", "pumpkin", "smile" ]
        }, {
            title: "fal fa-jedi",
            searchTerms: [ "star wars" ]
        }, {
            title: "fal fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fal fa-journal-whills",
            searchTerms: [ "book", "jedi", "star wars", "the force" ]
        }, {
            title: "fal fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "fal fa-key",
            searchTerms: [ "password", "unlock" ]
        }, {
            title: "fal fa-key-skeleton",
            searchTerms: [ "halloween", "holiday", "password", "unlock" ]
        }, {
            title: "fal fa-keyboard",
            searchTerms: [ "input", "type" ]
        }, {
            title: "fal fa-keynote",
            searchTerms: [ "lecture", "panel", "seminar", "speak", "speaker", "talk" ]
        }, {
            title: "fal fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "fal fa-kidneys",
            searchTerms: []
        }, {
            title: "fal fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kite",
            searchTerms: [ "air", "benjamin", "fall", "flying", "franklin", "outdoors", "seasonal", "sky", "wind" ]
        }, {
            title: "fal fa-kiwi-bird",
            searchTerms: [ "bird", "fauna" ]
        }, {
            title: "fal fa-knife-kitchen",
            searchTerms: [ "chef", "cut", "halloween", "holiday", "tool" ]
        }, {
            title: "fal fa-lambda",
            searchTerms: []
        }, {
            title: "fal fa-lamp",
            searchTerms: []
        }, {
            title: "fal fa-landmark",
            searchTerms: [ "building", "historic", "memoroable", "politics" ]
        }, {
            title: "fal fa-landmark-alt",
            searchTerms: [ "building", "historic", "memoroable", "politics" ]
        }, {
            title: "fal fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fal fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "dude you're getting", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fal fa-laptop-code",
            searchTerms: []
        }, {
            title: "fal fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "fal fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-layer-group",
            searchTerms: [ "layers" ]
        }, {
            title: "fal fa-layer-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-layer-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant" ]
        }, {
            title: "fal fa-leaf-heart",
            searchTerms: [ "eco", "flora", "nature", "plant" ]
        }, {
            title: "fal fa-leaf-maple",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-leaf-oak",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "fal fa-less-than",
            searchTerms: []
        }, {
            title: "fal fa-less-than-equal",
            searchTerms: []
        }, {
            title: "fal fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-down-alt",
            searchTerms: [ "level-down" ]
        }, {
            title: "fal fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-up-alt",
            searchTerms: [ "level-up" ]
        }, {
            title: "fal fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "fal fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "fal fa-lightbulb-dollar",
            searchTerms: []
        }, {
            title: "fal fa-lightbulb-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-lightbulb-on",
            searchTerms: []
        }, {
            title: "fal fa-lightbulb-slash",
            searchTerms: []
        }, {
            title: "fal fa-lights-holiday",
            searchTerms: [ "bulb", "christmas", "decoration", "holiday", "string", "xmas" ]
        }, {
            title: "fal fa-link",
            searchTerms: [ "chain" ]
        }, {
            title: "fal fa-lips",
            searchTerms: []
        }, {
            title: "fal fa-lira-sign",
            searchTerms: [ "try", "turkish" ]
        }, {
            title: "fal fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ol",
            searchTerms: [ "checklist", "list", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ul",
            searchTerms: [ "checklist", "list", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-location",
            searchTerms: []
        }, {
            title: "fal fa-location-arrow",
            searchTerms: [ "address", "coordinates", "gps", "location", "map", "place", "where" ]
        }, {
            title: "fal fa-location-circle",
            searchTerms: []
        }, {
            title: "fal fa-location-slash",
            searchTerms: []
        }, {
            title: "fal fa-lock",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fal fa-lock-alt",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fal fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "protect" ]
        }, {
            title: "fal fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-long-arrow-alt-down",
            searchTerms: [ "long-arrow-down" ]
        }, {
            title: "fal fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fal fa-long-arrow-alt-right",
            searchTerms: [ "long-arrow-right" ]
        }, {
            title: "fal fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up" ]
        }, {
            title: "fal fa-long-arrow-down",
            searchTerms: []
        }, {
            title: "fal fa-long-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-long-arrow-right",
            searchTerms: []
        }, {
            title: "fal fa-long-arrow-up",
            searchTerms: []
        }, {
            title: "fal fa-loveseat",
            searchTerms: [ "furniture" ]
        }, {
            title: "fal fa-low-vision",
            searchTerms: []
        }, {
            title: "fal fa-luchador",
            searchTerms: []
        }, {
            title: "fal fa-luggage-cart",
            searchTerms: []
        }, {
            title: "fal fa-lungs",
            searchTerms: []
        }, {
            title: "fal fa-mace",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "melee attack", "weapon", "windu" ]
        }, {
            title: "fal fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "witch", "wizard" ]
        }, {
            title: "fal fa-magnet",
            searchTerms: []
        }, {
            title: "fal fa-mail-bulk",
            searchTerms: []
        }, {
            title: "fal fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fal fa-mandolin",
            searchTerms: [ "Dungeons & Dragons", "bard", "d&d", "dnd", "fantasy", "instrument", "lute", "music", "song", "strings" ]
        }, {
            title: "fal fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "fal fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fal fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fal fa-map-marker",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-marker-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-check",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-map-marker-exclamation",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-map-marker-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-map-marker-question",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-slash",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-smile",
            searchTerms: []
        }, {
            title: "fal fa-map-marker-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-map-pin",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "marker", "place", "position", "travel", "where" ]
        }, {
            title: "fal fa-map-signs",
            searchTerms: []
        }, {
            title: "fal fa-marker",
            searchTerms: [ "edit", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fal fa-mars-double",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fal fa-mask",
            searchTerms: [ "costume", "disguise", "halloween", "holiday", "secret", "super hero" ]
        }, {
            title: "fal fa-medal",
            searchTerms: []
        }, {
            title: "fal fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fal fa-megaphone",
            searchTerms: [ "announcement", "broadcast", "bullhorn", "louder", "share" ]
        }, {
            title: "fal fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-memory",
            searchTerms: [ "DIMM", "RAM", "hardware", "technology" ]
        }, {
            title: "fal fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fal fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fal fa-meteor",
            searchTerms: []
        }, {
            title: "fal fa-microchip",
            searchTerms: [ "cpu", "processor" ]
        }, {
            title: "fal fa-microphone",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fal fa-microscope",
            searchTerms: []
        }, {
            title: "fal fa-mind-share",
            searchTerms: [ "brain", "brainstorming", "meeting", "planning" ]
        }, {
            title: "fal fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-minus-octagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-mistletoe",
            searchTerms: [ "awkward", "christmas", "decoration", "holiday", "kiss", "tradition", "trap", "xmas" ]
        }, {
            title: "fal fa-mitten",
            searchTerms: [ "clothing", "cold", "hands", "knitted", "seasonal", "warmth" ]
        }, {
            title: "fal fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fal fa-money-bill-wave-alt",
            searchTerms: []
        }, {
            title: "fal fa-money-check",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fal fa-money-check-alt",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fal fa-monitor-heart-rate",
            searchTerms: []
        }, {
            title: "fal fa-monkey",
            searchTerms: [ "banana", "fauna", "mammmal", "tail" ]
        }, {
            title: "fal fa-monument",
            searchTerms: [ "building", "historic", "memoroable" ]
        }, {
            title: "fal fa-moon",
            searchTerms: [ "contrast", "crescent", "darker", "lunar", "night" ]
        }, {
            title: "fal fa-moon-cloud",
            searchTerms: []
        }, {
            title: "fal fa-moon-stars",
            searchTerms: [ "crescent", "lunar" ]
        }, {
            title: "fal fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "spices" ]
        }, {
            title: "fal fa-mosque",
            searchTerms: [ "building", "islam", "muslim" ]
        }, {
            title: "fal fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fal fa-mountain",
            searchTerms: []
        }, {
            title: "fal fa-mountains",
            searchTerms: []
        }, {
            title: "fal fa-mouse-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fal fa-mug-hot",
            searchTerms: [ "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "steam", "tea", "warmth" ]
        }, {
            title: "fal fa-mug-marshmallows",
            searchTerms: [ "cocoa", "coffee", "cup", "drink", "food", "seasonal", "sweet", "warmth" ]
        }, {
            title: "fal fa-music",
            searchTerms: [ "note", "sound" ]
        }, {
            title: "fal fa-narwhal",
            searchTerms: [ "fauna", "holiday", "mammmal" ]
        }, {
            title: "fal fa-network-wired",
            searchTerms: []
        }, {
            title: "fal fa-neuter",
            searchTerms: []
        }, {
            title: "fal fa-newspaper",
            searchTerms: [ "article", "press" ]
        }, {
            title: "fal fa-not-equal",
            searchTerms: []
        }, {
            title: "fal fa-notes-medical",
            searchTerms: []
        }, {
            title: "fal fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "fal fa-octagon",
            searchTerms: []
        }, {
            title: "fal fa-oil-can",
            searchTerms: []
        }, {
            title: "fal fa-oil-temp",
            searchTerms: []
        }, {
            title: "fal fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "fal fa-omega",
            searchTerms: []
        }, {
            title: "fal fa-ornament",
            searchTerms: [ "christmas", "decoration", "holiday", "xmas" ]
        }, {
            title: "fal fa-otter",
            searchTerms: [ "fauna", "mammmal" ]
        }, {
            title: "fal fa-outdent",
            searchTerms: []
        }, {
            title: "fal fa-paint-brush",
            searchTerms: []
        }, {
            title: "fal fa-paint-brush-alt",
            searchTerms: []
        }, {
            title: "fal fa-paint-roller",
            searchTerms: [ "brush", "painting", "tool" ]
        }, {
            title: "fal fa-palette",
            searchTerms: [ "colors", "painting" ]
        }, {
            title: "fal fa-pallet",
            searchTerms: []
        }, {
            title: "fal fa-pallet-alt",
            searchTerms: []
        }, {
            title: "fal fa-paper-plane",
            searchTerms: []
        }, {
            title: "fal fa-paperclip",
            searchTerms: [ "attachment" ]
        }, {
            title: "fal fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fal fa-paragraph",
            searchTerms: []
        }, {
            title: "fal fa-parking",
            searchTerms: []
        }, {
            title: "fal fa-parking-circle",
            searchTerms: []
        }, {
            title: "fal fa-parking-circle-slash",
            searchTerms: []
        }, {
            title: "fal fa-parking-slash",
            searchTerms: []
        }, {
            title: "fal fa-passport",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fal fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "fal fa-paste",
            searchTerms: [ "clipboard", "copy" ]
        }, {
            title: "fal fa-pause",
            searchTerms: [ "wait" ]
        }, {
            title: "fal fa-pause-circle",
            searchTerms: []
        }, {
            title: "fal fa-paw",
            searchTerms: [ "animal", "pet" ]
        }, {
            title: "fal fa-paw-alt",
            searchTerms: [ "pet" ]
        }, {
            title: "fal fa-paw-claws",
            searchTerms: [ "Dungeons & Dragons", "animal", "beast", "d&d", "dnd", "fantasy", "pet" ]
        }, {
            title: "fal fa-peace",
            searchTerms: []
        }, {
            title: "fal fa-pegasus",
            searchTerms: [ "fantasy", "horse", "wings" ]
        }, {
            title: "fal fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fal fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fal fa-pencil-paintbrush",
            searchTerms: []
        }, {
            title: "fal fa-pencil-ruler",
            searchTerms: []
        }, {
            title: "fal fa-pennant",
            searchTerms: []
        }, {
            title: "fal fa-people-carry",
            searchTerms: [ "movers" ]
        }, {
            title: "fal fa-percent",
            searchTerms: []
        }, {
            title: "fal fa-percentage",
            searchTerms: []
        }, {
            title: "fal fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "fal fa-person-carry",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-dolly",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-dolly-empty",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-sign",
            searchTerms: [ "advocate", "human", "information", "person", "protest", "protester", "volunteer" ]
        }, {
            title: "fal fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-office",
            searchTerms: []
        }, {
            title: "fal fa-phone-plus",
            searchTerms: [ "positive" ]
        }, {
            title: "fal fa-phone-slash",
            searchTerms: []
        }, {
            title: "fal fa-phone-square",
            searchTerms: [ "call", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-volume",
            searchTerms: [ "telephone", "volume-control-phone" ]
        }, {
            title: "fal fa-pi",
            searchTerms: []
        }, {
            title: "fal fa-pie",
            searchTerms: []
        }, {
            title: "fal fa-pig",
            searchTerms: [ "agriculture", "farm", "fauna", "mammmal", "oink" ]
        }, {
            title: "fal fa-piggy-bank",
            searchTerms: [ "save", "savings" ]
        }, {
            title: "fal fa-pills",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-place-of-worship",
            searchTerms: [ "building", "church", "holy", "mosque", "synagogue" ]
        }, {
            title: "fal fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane-alt",
            searchTerms: []
        }, {
            title: "fal fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fal fa-play",
            searchTerms: [ "music", "playing", "sound", "start" ]
        }, {
            title: "fal fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "fal fa-plug",
            searchTerms: [ "connect", "online", "power" ]
        }, {
            title: "fal fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fal fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fal fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fal fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fal fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fal fa-podcast",
            searchTerms: []
        }, {
            title: "fal fa-podium",
            searchTerms: [ "lecture", "panel", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "fal fa-podium-star",
            searchTerms: [ "debate", "election", "keynote", "politics", "speak", "speaker", "speech" ]
        }, {
            title: "fal fa-poll",
            searchTerms: [ "results", "survey", "vote", "voting" ]
        }, {
            title: "fal fa-poll-h",
            searchTerms: [ "results", "survey", "vote", "voting" ]
        }, {
            title: "fal fa-poll-people",
            searchTerms: [ "candidates", "election", "people", "person", "results", "survey", "vote", "voting" ]
        }, {
            title: "fal fa-poo",
            searchTerms: []
        }, {
            title: "fal fa-poo-storm",
            searchTerms: [ "bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit" ]
        }, {
            title: "fal fa-poop",
            searchTerms: []
        }, {
            title: "fal fa-portrait",
            searchTerms: []
        }, {
            title: "fal fa-pound-sign",
            searchTerms: [ "gbp" ]
        }, {
            title: "fal fa-power-off",
            searchTerms: [ "on", "reboot", "restart" ]
        }, {
            title: "fal fa-pray",
            searchTerms: []
        }, {
            title: "fal fa-praying-hands",
            searchTerms: []
        }, {
            title: "fal fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-presentation",
            searchTerms: [ "keynote", "lecture", "panel", "powerpoint", "ppt", "seminar", "slides", "speak", "speaker", "talk" ]
        }, {
            title: "fal fa-print",
            searchTerms: []
        }, {
            title: "fal fa-print-slash",
            searchTerms: []
        }, {
            title: "fal fa-procedures",
            searchTerms: []
        }, {
            title: "fal fa-project-diagram",
            searchTerms: []
        }, {
            title: "fal fa-pumpkin",
            searchTerms: []
        }, {
            title: "fal fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "section" ]
        }, {
            title: "fal fa-qrcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fal fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-quidditch",
            searchTerms: []
        }, {
            title: "fal fa-quote-left",
            searchTerms: []
        }, {
            title: "fal fa-quote-right",
            searchTerms: []
        }, {
            title: "fal fa-quran",
            searchTerms: [ "book", "islam", "muslim" ]
        }, {
            title: "fal fa-rabbit",
            searchTerms: [ "bunny", "fast", "fauna", "hare", "mammmal", "speed", "wabbit" ]
        }, {
            title: "fal fa-rabbit-fast",
            searchTerms: [ "bunny", "fast", "fauna", "hare", "mammmal", "running", "speed", "wabbit" ]
        }, {
            title: "fal fa-racquet",
            searchTerms: []
        }, {
            title: "fal fa-radiation",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fal fa-radiation-alt",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fal fa-rainbow",
            searchTerms: []
        }, {
            title: "fal fa-raindrops",
            searchTerms: [ "precipitation" ]
        }, {
            title: "fal fa-ram",
            searchTerms: [ "fauna", "horns", "mammmal" ]
        }, {
            title: "fal fa-ramp-loading",
            searchTerms: []
        }, {
            title: "fal fa-random",
            searchTerms: [ "shuffle", "sort" ]
        }, {
            title: "fal fa-receipt",
            searchTerms: [ "check", "invoice", "table" ]
        }, {
            title: "fal fa-rectangle-landscape",
            searchTerms: []
        }, {
            title: "fal fa-rectangle-portrait",
            searchTerms: []
        }, {
            title: "fal fa-rectangle-wide",
            searchTerms: []
        }, {
            title: "fal fa-recycle",
            searchTerms: []
        }, {
            title: "fal fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fal fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fal fa-registered",
            searchTerms: []
        }, {
            title: "fal fa-repeat",
            searchTerms: []
        }, {
            title: "fal fa-repeat-1",
            searchTerms: []
        }, {
            title: "fal fa-repeat-1-alt",
            searchTerms: []
        }, {
            title: "fal fa-repeat-alt",
            searchTerms: []
        }, {
            title: "fal fa-reply",
            searchTerms: []
        }, {
            title: "fal fa-reply-all",
            searchTerms: []
        }, {
            title: "fal fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "fal fa-restroom",
            searchTerms: [ "bathroom", "john", "loo", "potty", "washroom", "waste", "wc" ]
        }, {
            title: "fal fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fal fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "fantasy", "jewelry", "precious" ]
        }, {
            title: "fal fa-road",
            searchTerms: [ "street" ]
        }, {
            title: "fal fa-robot",
            searchTerms: []
        }, {
            title: "fal fa-rocket",
            searchTerms: [ "app" ]
        }, {
            title: "fal fa-route",
            searchTerms: []
        }, {
            title: "fal fa-route-highway",
            searchTerms: []
        }, {
            title: "fal fa-route-interstate",
            searchTerms: []
        }, {
            title: "fal fa-rss",
            searchTerms: [ "blog" ]
        }, {
            title: "fal fa-rss-square",
            searchTerms: [ "blog", "feed" ]
        }, {
            title: "fal fa-ruble-sign",
            searchTerms: [ "rub" ]
        }, {
            title: "fal fa-ruler",
            searchTerms: []
        }, {
            title: "fal fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fal fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fal fa-ruler-triangle",
            searchTerms: []
        }, {
            title: "fal fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "fal fa-running",
            searchTerms: [ "jog", "person", "sprint" ]
        }, {
            title: "fal fa-rupee-sign",
            searchTerms: [ "indian", "inr" ]
        }, {
            title: "fal fa-rv",
            searchTerms: [ "cousin eddie", "recreational", "vehicle" ]
        }, {
            title: "fal fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-satellite",
            searchTerms: [ "communications", "hardware", "orbit", "space" ]
        }, {
            title: "fal fa-satellite-dish",
            searchTerms: [ "SETI", "communications", "hardware", "receiver", "saucer", "signal" ]
        }, {
            title: "fal fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "fal fa-scalpel",
            searchTerms: []
        }, {
            title: "fal fa-scalpel-path",
            searchTerms: []
        }, {
            title: "fal fa-scanner",
            searchTerms: []
        }, {
            title: "fal fa-scanner-keyboard",
            searchTerms: []
        }, {
            title: "fal fa-scanner-touchscreen",
            searchTerms: []
        }, {
            title: "fal fa-scarecrow",
            searchTerms: [ "halloween", "holiday" ]
        }, {
            title: "fal fa-scarf",
            searchTerms: [ "clothing", "knitted", "neck", "seasonal", "warmth" ]
        }, {
            title: "fal fa-school",
            searchTerms: [ "building" ]
        }, {
            title: "fal fa-screwdriver",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fal fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper" ]
        }, {
            title: "fal fa-scroll-old",
            searchTerms: [ "Dungeons & Dragons", "ancient", "announcement", "d&d", "dnd", "fantasy", "paper", "relic", "worn" ]
        }, {
            title: "fal fa-scrubber",
            searchTerms: []
        }, {
            title: "fal fa-scythe",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "weapon" ]
        }, {
            title: "fal fa-sd-card",
            searchTerms: []
        }, {
            title: "fal fa-search",
            searchTerms: [ "bigger", "enlarge", "magnify", "preview", "zoom" ]
        }, {
            title: "fal fa-search-dollar",
            searchTerms: []
        }, {
            title: "fal fa-search-location",
            searchTerms: []
        }, {
            title: "fal fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fal fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "fal fa-seedling",
            searchTerms: []
        }, {
            title: "fal fa-server",
            searchTerms: [ "cpu" ]
        }, {
            title: "fal fa-shapes",
            searchTerms: [ "circle", "square", "triangle" ]
        }, {
            title: "fal fa-share",
            searchTerms: []
        }, {
            title: "fal fa-share-all",
            searchTerms: []
        }, {
            title: "fal fa-share-alt",
            searchTerms: []
        }, {
            title: "fal fa-share-alt-square",
            searchTerms: []
        }, {
            title: "fal fa-share-square",
            searchTerms: [ "send", "social" ]
        }, {
            title: "fal fa-sheep",
            searchTerms: [ "agriculture", "farming", "fauna", "mammmal", "wool", "yarn" ]
        }, {
            title: "fal fa-shekel-sign",
            searchTerms: [ "ils" ]
        }, {
            title: "fal fa-shield",
            searchTerms: [ "achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "security", "winner" ]
        }, {
            title: "fal fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "fal fa-shield-check",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "success", "winner" ]
        }, {
            title: "fal fa-shield-cross",
            searchTerms: [ "Dungeons & Dragons", "block", "crusader", "d&d", "defend", "dnd", "fantasy", "security", "templar" ]
        }, {
            title: "fal fa-ship",
            searchTerms: [ "boat", "sea" ]
        }, {
            title: "fal fa-shipping-fast",
            searchTerms: []
        }, {
            title: "fal fa-shipping-timed",
            searchTerms: []
        }, {
            title: "fal fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps" ]
        }, {
            title: "fal fa-shopping-bag",
            searchTerms: []
        }, {
            title: "fal fa-shopping-basket",
            searchTerms: []
        }, {
            title: "fal fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "payment", "purchase" ]
        }, {
            title: "fal fa-shovel",
            searchTerms: [ "dig", "tool" ]
        }, {
            title: "fal fa-shovel-snow",
            searchTerms: [ "dig", "seasonal", "tool" ]
        }, {
            title: "fal fa-shower",
            searchTerms: []
        }, {
            title: "fal fa-shredder",
            searchTerms: []
        }, {
            title: "fal fa-shuttle-van",
            searchTerms: [ "machine", "public-transportation", "transportation", "vehicle" ]
        }, {
            title: "fal fa-shuttlecock",
            searchTerms: []
        }, {
            title: "fal fa-sigma",
            searchTerms: [ "summation" ]
        }, {
            title: "fal fa-sign",
            searchTerms: []
        }, {
            title: "fal fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "signin", "signup" ]
        }, {
            title: "fal fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fal fa-sign-language",
            searchTerms: []
        }, {
            title: "fal fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "fal fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fal fa-signal",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-1",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-2",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-3",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-4",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-alt",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-alt-1",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-alt-2",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-alt-3",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-alt-slash",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signal-slash",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fal fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fal fa-sim-card",
            searchTerms: [ "hard drive", "hardware", "portable", "storage", "technology", "tiny" ]
        }, {
            title: "fal fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fal fa-skating",
            searchTerms: [ "activity", "figure skating", "fitness", "ice", "person", "seasonal" ]
        }, {
            title: "fal fa-skeleton",
            searchTerms: []
        }, {
            title: "fal fa-ski-jump",
            searchTerms: [ "activity", "fast", "fitness", "person", "seasonal", "snowman" ]
        }, {
            title: "fal fa-ski-lift",
            searchTerms: [ "machine", "outdoors", "resort", "seasonal", "seat", "skiing", "tow" ]
        }, {
            title: "fal fa-skiing",
            searchTerms: [ "activity", "downhill", "fast", "fitness", "outdoors", "person", "seasonal", "slalom" ]
        }, {
            title: "fal fa-skiing-nordic",
            searchTerms: [ "activity", "cross country", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "fal fa-skull",
            searchTerms: [ "bones", "skeleton", "yorick" ]
        }, {
            title: "fal fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "fal fa-slash",
            searchTerms: []
        }, {
            title: "fal fa-sledding",
            searchTerms: [ "activity", "outdoors", "person", "seasonal", "snow" ]
        }, {
            title: "fal fa-sleigh",
            searchTerms: [ "christmas", "claus", "fly", "holiday", "santa", "sled", "xmas" ]
        }, {
            title: "fal fa-sliders-h",
            searchTerms: [ "settings", "sliders" ]
        }, {
            title: "fal fa-sliders-h-square",
            searchTerms: []
        }, {
            title: "fal fa-sliders-v",
            searchTerms: []
        }, {
            title: "fal fa-sliders-v-square",
            searchTerms: []
        }, {
            title: "fal fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fal fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fal fa-smile-plus",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fal fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fal fa-smog",
            searchTerms: [ "dragon" ]
        }, {
            title: "fal fa-smoke",
            searchTerms: []
        }, {
            title: "fal fa-smoking",
            searchTerms: [ "cigarette", "nicotine", "smoking status" ]
        }, {
            title: "fal fa-smoking-ban",
            searchTerms: [ "no smoking", "non-smoking" ]
        }, {
            title: "fal fa-sms",
            searchTerms: [ "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting" ]
        }, {
            title: "fal fa-snake",
            searchTerms: [ "cobra", "fauna", "reptile", "slither" ]
        }, {
            title: "fal fa-snow-blowing",
            searchTerms: [ "blizzard", "precipitation", "storm", "winter" ]
        }, {
            title: "fal fa-snowboarding",
            searchTerms: [ "activity", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "fal fa-snowflake",
            searchTerms: [ "precipitation", "seasonal", "winter" ]
        }, {
            title: "fal fa-snowflakes",
            searchTerms: [ "precipitation", "seasonal", "winter" ]
        }, {
            title: "fal fa-snowman",
            searchTerms: [ "decoration", "frost", "holiday" ]
        }, {
            title: "fal fa-snowmobile",
            searchTerms: [ "fast", "person", "seasonal", "transportation", "treads" ]
        }, {
            title: "fal fa-snowplow",
            searchTerms: [ "clean up", "cold", "seasonal" ]
        }, {
            title: "fal fa-socks",
            searchTerms: [ "business socks", "business time", "clothing", "flight of the conchords", "wednesday" ]
        }, {
            title: "fal fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fal fa-sort",
            searchTerms: [ "order" ]
        }, {
            title: "fal fa-sort-alpha-down",
            searchTerms: [ "sort-alpha-asc" ]
        }, {
            title: "fal fa-sort-alpha-up",
            searchTerms: [ "sort-alpha-desc" ]
        }, {
            title: "fal fa-sort-amount-down",
            searchTerms: [ "sort-amount-asc" ]
        }, {
            title: "fal fa-sort-amount-up",
            searchTerms: [ "sort-amount-desc" ]
        }, {
            title: "fal fa-sort-down",
            searchTerms: [ "arrow", "descending", "sort-desc" ]
        }, {
            title: "fal fa-sort-numeric-down",
            searchTerms: [ "numbers", "sort-numeric-asc" ]
        }, {
            title: "fal fa-sort-numeric-up",
            searchTerms: [ "numbers", "sort-numeric-desc" ]
        }, {
            title: "fal fa-sort-up",
            searchTerms: [ "arrow", "ascending", "sort-asc" ]
        }, {
            title: "fal fa-spa",
            searchTerms: [ "flora", "mindfullness", "plant", "wellness" ]
        }, {
            title: "fal fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "transportation" ]
        }, {
            title: "fal fa-spade",
            searchTerms: []
        }, {
            title: "fal fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween", "holiday" ]
        }, {
            title: "fal fa-spider-black-widow",
            searchTerms: [ "alert", "arachnid", "bug", "charlotte", "crawl", "danger", "dangerous", "deadly", "eight", "error", "halloween", "holiday" ]
        }, {
            title: "fal fa-spider-web",
            searchTerms: [ "halloween", "holiday" ]
        }, {
            title: "fal fa-spinner",
            searchTerms: [ "loading", "progress" ]
        }, {
            title: "fal fa-spinner-third",
            searchTerms: []
        }, {
            title: "fal fa-splotch",
            searchTerms: []
        }, {
            title: "fal fa-spray-can",
            searchTerms: []
        }, {
            title: "fal fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "fal fa-square-full",
            searchTerms: []
        }, {
            title: "fal fa-square-root",
            searchTerms: []
        }, {
            title: "fal fa-square-root-alt",
            searchTerms: []
        }, {
            title: "fal fa-squirrel",
            searchTerms: []
        }, {
            title: "fal fa-staff",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "mage", "weapon" ]
        }, {
            title: "fal fa-stamp",
            searchTerms: []
        }, {
            title: "fal fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fal fa-star-and-crescent",
            searchTerms: [ "islam", "muslim" ]
        }, {
            title: "fal fa-star-christmas",
            searchTerms: [ "bethlehem", "christmas", "holiday", "xmas" ]
        }, {
            title: "fal fa-star-exclamation",
            searchTerms: [ "achievement", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "fal fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-of-david",
            searchTerms: [ "jewish", "judaism" ]
        }, {
            title: "fal fa-star-of-life",
            searchTerms: []
        }, {
            title: "fal fa-stars",
            searchTerms: []
        }, {
            title: "fal fa-steering-wheel",
            searchTerms: []
        }, {
            title: "fal fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-stethoscope",
            searchTerms: []
        }, {
            title: "fal fa-sticky-note",
            searchTerms: []
        }, {
            title: "fal fa-stocking",
            searchTerms: [ "christmas", "clothing", "decoration", "gift", "holiday", "present", "sock", "tradition", "xmas" ]
        }, {
            title: "fal fa-stomach",
            searchTerms: []
        }, {
            title: "fal fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fal fa-stop-circle",
            searchTerms: []
        }, {
            title: "fal fa-stopwatch",
            searchTerms: [ "time" ]
        }, {
            title: "fal fa-store",
            searchTerms: []
        }, {
            title: "fal fa-store-alt",
            searchTerms: []
        }, {
            title: "fal fa-stream",
            searchTerms: []
        }, {
            title: "fal fa-street-view",
            searchTerms: [ "map" ]
        }, {
            title: "fal fa-strikethrough",
            searchTerms: []
        }, {
            title: "fal fa-stroopwafel",
            searchTerms: [ "dessert", "food", "sweets", "waffle" ]
        }, {
            title: "fal fa-subscript",
            searchTerms: []
        }, {
            title: "fal fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fal fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fal fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fal fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fal fa-sun-cloud",
            searchTerms: []
        }, {
            title: "fal fa-sun-dust",
            searchTerms: [ "dry", "heat" ]
        }, {
            title: "fal fa-sun-haze",
            searchTerms: [ "heat", "sweltering" ]
        }, {
            title: "fal fa-sunrise",
            searchTerms: [ "dawn", "day", "daybreak", "daylight", "daytime", "morning", "sun up" ]
        }, {
            title: "fal fa-sunset",
            searchTerms: [ "dusk", "night", "nighttime", "sun down" ]
        }, {
            title: "fal fa-superscript",
            searchTerms: [ "exponential" ]
        }, {
            title: "fal fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fal fa-swatchbook",
            searchTerms: []
        }, {
            title: "fal fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "person", "water" ]
        }, {
            title: "fal fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "water" ]
        }, {
            title: "fal fa-sword",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "weapon" ]
        }, {
            title: "fal fa-swords",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "weapon" ]
        }, {
            title: "fal fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "star of david", "temple" ]
        }, {
            title: "fal fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fal fa-sync-alt",
            searchTerms: [ "refresh", "reload", "rotate" ]
        }, {
            title: "fal fa-syringe",
            searchTerms: [ "immunizations", "needle" ]
        }, {
            title: "fal fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fal fa-table-tennis",
            searchTerms: []
        }, {
            title: "fal fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-android",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fal fa-tablet-android-alt",
            searchTerms: [ "device", "screen" ]
        }, {
            title: "fal fa-tablet-rugged",
            searchTerms: [ "device", "durable", "screen", "tough" ]
        }, {
            title: "fal fa-tablets",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fal fa-tachometer",
            searchTerms: [ "dashboard", "fast", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt",
            searchTerms: [ "dashboard", "tachometer" ]
        }, {
            title: "fal fa-tachometer-alt-average",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-fast",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-fastest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-slow",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-alt-slowest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-average",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-fast",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-fastest",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-slow",
            searchTerms: []
        }, {
            title: "fal fa-tachometer-slowest",
            searchTerms: []
        }, {
            title: "fal fa-tag",
            searchTerms: [ "label" ]
        }, {
            title: "fal fa-tags",
            searchTerms: [ "labels" ]
        }, {
            title: "fal fa-tally",
            searchTerms: []
        }, {
            title: "fal fa-tape",
            searchTerms: []
        }, {
            title: "fal fa-tasks",
            searchTerms: [ "downloading", "downloads", "loading", "progress", "settings" ]
        }, {
            title: "fal fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "uber", "vehicle" ]
        }, {
            title: "fal fa-teeth",
            searchTerms: []
        }, {
            title: "fal fa-teeth-open",
            searchTerms: []
        }, {
            title: "fal fa-temperature-frigid",
            searchTerms: [ "cold", "mercury", "seasonal", "thermometer", "winter" ]
        }, {
            title: "fal fa-temperature-high",
            searchTerms: [ "mercury", "thermometer", "warm" ]
        }, {
            title: "fal fa-temperature-hot",
            searchTerms: [ "heat", "mercury", "summer", "thermometer" ]
        }, {
            title: "fal fa-temperature-low",
            searchTerms: [ "cool", "mercury", "thermometer" ]
        }, {
            title: "fal fa-tenge",
            searchTerms: [ "currency", "kazakhstan", "money", "price" ]
        }, {
            title: "fal fa-tennis-ball",
            searchTerms: []
        }, {
            title: "fal fa-terminal",
            searchTerms: [ "code", "command", "console", "prompt" ]
        }, {
            title: "fal fa-text-height",
            searchTerms: []
        }, {
            title: "fal fa-text-width",
            searchTerms: []
        }, {
            title: "fal fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-theater-masks",
            searchTerms: []
        }, {
            title: "fal fa-thermometer",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-empty",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-full",
            searchTerms: [ "fever", "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-theta",
            searchTerms: []
        }, {
            title: "fal fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "fal fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fal fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fal fa-thunderstorm",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "storm" ]
        }, {
            title: "fal fa-thunderstorm-moon",
            searchTerms: []
        }, {
            title: "fal fa-thunderstorm-sun",
            searchTerms: []
        }, {
            title: "fal fa-ticket",
            searchTerms: [ "movie", "pass", "support" ]
        }, {
            title: "fal fa-ticket-alt",
            searchTerms: [ "ticket" ]
        }, {
            title: "fal fa-tilde",
            searchTerms: []
        }, {
            title: "fal fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "fal fa-tint",
            searchTerms: [ "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fal fa-tint-slash",
            searchTerms: []
        }, {
            title: "fal fa-tire",
            searchTerms: [ "wheel" ]
        }, {
            title: "fal fa-tire-flat",
            searchTerms: []
        }, {
            title: "fal fa-tire-pressure-warning",
            searchTerms: []
        }, {
            title: "fal fa-tire-rugged",
            searchTerms: []
        }, {
            title: "fal fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
        }, {
            title: "fal fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toilet",
            searchTerms: [ "bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "washroom", "waste", "wc" ]
        }, {
            title: "fal fa-toilet-paper",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fal fa-toilet-paper-alt",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fal fa-tombstone",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fal fa-tombstone-alt",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fal fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fal fa-tools",
            searchTerms: [ "admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench" ]
        }, {
            title: "fal fa-tooth",
            searchTerms: [ "bicuspid", "dental", "molar", "mouth", "teeth" ]
        }, {
            title: "fal fa-toothbrush",
            searchTerms: []
        }, {
            title: "fal fa-torah",
            searchTerms: [ "book", "jewish", "judaism" ]
        }, {
            title: "fal fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "fal fa-tornado",
            searchTerms: [ "cyclone", "dorothy", "landspout", "toto", "twister", "vortext", "waterspout", "whirlwind" ]
        }, {
            title: "fal fa-tractor",
            searchTerms: []
        }, {
            title: "fal fa-trademark",
            searchTerms: []
        }, {
            title: "fal fa-traffic-cone",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-go",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-slow",
            searchTerms: []
        }, {
            title: "fal fa-traffic-light-stop",
            searchTerms: []
        }, {
            title: "fal fa-train",
            searchTerms: [ "bullet", "locomotive", "railway" ]
        }, {
            title: "fal fa-tram",
            searchTerms: [ "crossing", "machine", "mountains", "seasonal", "transportation" ]
        }, {
            title: "fal fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fal fa-transgender-alt",
            searchTerms: []
        }, {
            title: "fal fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fal fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
        }, {
            title: "fal fa-treasure-chest",
            searchTerms: [ "Dungeons & Dragons", "booty", "d&d", "dnd", "fantasy", "gold", "hidden", "loot", "reward", "trap" ]
        }, {
            title: "fal fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-tree-alt",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-tree-christmas",
            searchTerms: [ "christmas", "decorated", "decorations", "flora", "holiday", "lights", "plant", "star", "xmas" ]
        }, {
            title: "fal fa-tree-decorated",
            searchTerms: [ "christmas", "decorations", "flora", "holiday", "lights", "plant", "xmas" ]
        }, {
            title: "fal fa-tree-large",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-trees",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-triangle",
            searchTerms: []
        }, {
            title: "fal fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fal fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "fal fa-truck",
            searchTerms: [ "delivery", "shipping" ]
        }, {
            title: "fal fa-truck-container",
            searchTerms: [ "delivery", "shipping" ]
        }, {
            title: "fal fa-truck-couch",
            searchTerms: [ "moving", "rental" ]
        }, {
            title: "fal fa-truck-loading",
            searchTerms: [ "inventory", "moving", "rental" ]
        }, {
            title: "fal fa-truck-monster",
            searchTerms: []
        }, {
            title: "fal fa-truck-moving",
            searchTerms: [ "inventory", "rental" ]
        }, {
            title: "fal fa-truck-pickup",
            searchTerms: []
        }, {
            title: "fal fa-truck-plow",
            searchTerms: [ "clean up", "cold", "seasonal", "snow" ]
        }, {
            title: "fal fa-truck-ramp",
            searchTerms: []
        }, {
            title: "fal fa-tshirt",
            searchTerms: [ "clothing" ]
        }, {
            title: "fal fa-tty",
            searchTerms: []
        }, {
            title: "fal fa-turkey",
            searchTerms: [ "bird", "fall", "food", "meal", "poultry", "seasonal", "thanksgiving" ]
        }, {
            title: "fal fa-turtle",
            searchTerms: [ "cowabunga", "donatello", "fauna", "leonardo", "michaelangelo", "raphael", "reptile", "shell", "slow" ]
        }, {
            title: "fal fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fal fa-tv-retro",
            searchTerms: []
        }, {
            title: "fal fa-umbrella",
            searchTerms: [ "protection", "rain" ]
        }, {
            title: "fal fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sun" ]
        }, {
            title: "fal fa-underline",
            searchTerms: []
        }, {
            title: "fal fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fal fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fal fa-unicorn",
            searchTerms: [ "fantasy", "fauna", "horn", "horse" ]
        }, {
            title: "fal fa-union",
            searchTerms: []
        }, {
            title: "fal fa-universal-access",
            searchTerms: []
        }, {
            title: "fal fa-university",
            searchTerms: [ "bank", "building", "college", "higher education - students", "institution" ]
        }, {
            title: "fal fa-unlink",
            searchTerms: [ "chain", "chain-broken", "remove" ]
        }, {
            title: "fal fa-unlock",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fal fa-upload",
            searchTerms: [ "export", "publish" ]
        }, {
            title: "fal fa-usd-circle",
            searchTerms: [ "$", "currency", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-alt-slash",
            searchTerms: []
        }, {
            title: "fal fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "space", "suit" ]
        }, {
            title: "fal fa-user-chart",
            searchTerms: []
        }, {
            title: "fal fa-user-check",
            searchTerms: []
        }, {
            title: "fal fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-clock",
            searchTerms: []
        }, {
            title: "fal fa-user-cog",
            searchTerms: []
        }, {
            title: "fal fa-user-crown",
            searchTerms: []
        }, {
            title: "fal fa-user-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-user-friends",
            searchTerms: []
        }, {
            title: "fal fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "student" ]
        }, {
            title: "fal fa-user-injured",
            searchTerms: [ "cast", "ouch", "sling" ]
        }, {
            title: "fal fa-user-lock",
            searchTerms: []
        }, {
            title: "fal fa-user-md",
            searchTerms: [ "doctor", "job", "medical", "nurse", "occupation", "profile" ]
        }, {
            title: "fal fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "fal fa-user-plus",
            searchTerms: [ "positive", "sign up", "signup" ]
        }, {
            title: "fal fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "privacy", "spy", "whisper" ]
        }, {
            title: "fal fa-user-shield",
            searchTerms: []
        }, {
            title: "fal fa-user-slash",
            searchTerms: [ "ban", "remove" ]
        }, {
            title: "fal fa-user-tag",
            searchTerms: []
        }, {
            title: "fal fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal" ]
        }, {
            title: "fal fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-users",
            searchTerms: [ "people", "persons", "profiles" ]
        }, {
            title: "fal fa-users-class",
            searchTerms: []
        }, {
            title: "fal fa-users-cog",
            searchTerms: []
        }, {
            title: "fal fa-users-crown",
            searchTerms: []
        }, {
            title: "fal fa-utensil-fork",
            searchTerms: []
        }, {
            title: "fal fa-utensil-knife",
            searchTerms: [ "cut", "tool" ]
        }, {
            title: "fal fa-utensil-spoon",
            searchTerms: [ "spoon" ]
        }, {
            title: "fal fa-utensils",
            searchTerms: [ "cutlery", "dinner", "eat", "food", "knife", "restaurant", "spoon" ]
        }, {
            title: "fal fa-utensils-alt",
            searchTerms: []
        }, {
            title: "fal fa-value-absolute",
            searchTerms: []
        }, {
            title: "fal fa-vector-square",
            searchTerms: [ "anchors", "lines", "object" ]
        }, {
            title: "fal fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fal fa-venus-double",
            searchTerms: []
        }, {
            title: "fal fa-venus-mars",
            searchTerms: []
        }, {
            title: "fal fa-vial",
            searchTerms: [ "test tube" ]
        }, {
            title: "fal fa-vials",
            searchTerms: [ "lab results", "test tubes" ]
        }, {
            title: "fal fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fal fa-video-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fal fa-video-slash",
            searchTerms: []
        }, {
            title: "fal fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "fal fa-volcano",
            searchTerms: []
        }, {
            title: "fal fa-volleyball-ball",
            searchTerms: []
        }, {
            title: "fal fa-volume",
            searchTerms: [ "audio", "control", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-mute",
            searchTerms: []
        }, {
            title: "fal fa-volume-off",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fal fa-volume-slash",
            searchTerms: [ "audio", "ban", "music", "mute", "sound" ]
        }, {
            title: "fal fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-vote-nay",
            searchTerms: [ "cast", "election", "negative", "no", "politics", "reject", "voting" ]
        }, {
            title: "fal fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "fal fa-vr-cardboard",
            searchTerms: [ "google", "reality", "virtual" ]
        }, {
            title: "fal fa-walking",
            searchTerms: [ "person" ]
        }, {
            title: "fal fa-wallet",
            searchTerms: []
        }, {
            title: "fal fa-wand",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "halloween", "holiday", "weapon" ]
        }, {
            title: "fal fa-wand-magic",
            searchTerms: [ "autocomplete", "automatic", "fantasy", "halloween", "holiday", "magic", "weapon", "witch", "wizard" ]
        }, {
            title: "fal fa-warehouse",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fal fa-warehouse-alt",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fal fa-watch",
            searchTerms: []
        }, {
            title: "fal fa-watch-fitness",
            searchTerms: []
        }, {
            title: "fal fa-water",
            searchTerms: []
        }, {
            title: "fal fa-water-lower",
            searchTerms: []
        }, {
            title: "fal fa-water-rise",
            searchTerms: []
        }, {
            title: "fal fa-weight",
            searchTerms: [ "measurement", "scale", "weight" ]
        }, {
            title: "fal fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fal fa-whale",
            searchTerms: [ "fauna", "mammal", "swimming" ]
        }, {
            title: "fal fa-wheat",
            searchTerms: [ "argriculture", "fall", "farming", "food", "grain", "seasonal" ]
        }, {
            title: "fal fa-wheelchair",
            searchTerms: [ "handicap", "person" ]
        }, {
            title: "fal fa-whistle",
            searchTerms: []
        }, {
            title: "fal fa-wifi",
            searchTerms: [ "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fal fa-wifi-1",
            searchTerms: [ "connection", "hotspot", "internet", "network", "weak", "wireless" ]
        }, {
            title: "fal fa-wifi-2",
            searchTerms: [ "average", "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fal fa-wifi-slash",
            searchTerms: [ "ban", "broken", "connection", "disabled", "hotspot", "internet", "network", "unavailable", "wireless" ]
        }, {
            title: "fal fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal" ]
        }, {
            title: "fal fa-wind-warning",
            searchTerms: []
        }, {
            title: "fal fa-window",
            searchTerms: []
        }, {
            title: "fal fa-window-alt",
            searchTerms: []
        }, {
            title: "fal fa-window-close",
            searchTerms: []
        }, {
            title: "fal fa-window-maximize",
            searchTerms: []
        }, {
            title: "fal fa-window-minimize",
            searchTerms: []
        }, {
            title: "fal fa-window-restore",
            searchTerms: []
        }, {
            title: "fal fa-windsock",
            searchTerms: []
        }, {
            title: "fal fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "drink", "glass", "grapes" ]
        }, {
            title: "fal fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "drink", "grapes" ]
        }, {
            title: "fal fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "drink", "grapes" ]
        }, {
            title: "fal fa-won-sign",
            searchTerms: [ "krw" ]
        }, {
            title: "fal fa-wreath",
            searchTerms: [ "christmas", "decoration", "door", "holiday", "welcome", "xmas" ]
        }, {
            title: "fal fa-wrench",
            searchTerms: [ "fix", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fal fa-x-ray",
            searchTerms: [ "radiological images", "radiology" ]
        }, {
            title: "fal fa-yen-sign",
            searchTerms: [ "currency", "jpy", "money" ]
        }, {
            title: "fal fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        } ]
    });
});