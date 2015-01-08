(function() {
    Crafty.c("TiledLevel", {
        makeTiles: function(a, e) {
            var l, r, q, p, g, d, o, s, t, c, m, k, b, n, f, j, h;
            k = a.image, t = a.firstgid, n = a.imagewidth;
            m = a.imageheight, c = a.tilewidth, o = a.tileheight;
            b = a.tileproperties;
            f = n / c | 0;
            j = m / o | 0;
            g = {};
            for (r = 0, h = j * f; r < h; r += 1) {
                q = r % f;
                p = r / f | 0;
                d = "tileSprite" + t;
                s = "tile" + t;
                g[d] = [q, p];
                l = "2D, " + e + ", " + d + ", MapTile";
                if (b) {
                    if (b[t - 1]) {
                        if (b[t - 1]["components"]) {
                            l += ", " + b[t - 1]["components"]
                        }
                    }
                }
                Crafty.c(s, {
                    comp: l,
                    init: function() {
                        this.addComponent(this.comp);
                        return this
                    }
                });
                t++
            }
            Crafty.sprite(c, o, k, g);
            return null
        },
        makeLayer: function(f) {
            var e, b, h, d, c, g, a;
            b = f.data, d = f.width, h = f.height;
            for (e = 0, a = b.length; e < a; e++) {
                c = b[e];
                if (c) {
                    g = Crafty.e("tile" + c);
                    g.x = (e % d) * g.w;
                    g.y = (e / d | 0) * g.h
                }
            }
            return null
        },
        tiledLevel: function(b, a) {
            var c = this;
            $.ajax({
                type: "GET",
                url: b,
                dataType: "json",
                data: {},
                async: false,
                success: function(h) {
                    var e, g, f, d;
                    e = h.layers, d = h.tilesets;
                    a = a != null ? a : "Canvas";
                    f = (function() {
                        var k, j, i;
                        i = [];
                        for (k = 0, j = d.length; k < j; k++) {
                            g = d[k];
                            i.push(g.image)
                        }
                        return i
                    })();
                    Crafty.load(f, function() {
                        var k, m, n, l, j, i;
                        for (n = 0, j = d.length; n < j; n++) {
                            m = d[n];
                            c.makeTiles(m, a)
                        }
                        for (l = 0, i = e.length; l < i; l++) {
                            k = e[l];
                            c.makeLayer(k)
                        }
                        return null
                    });
                    return null
                }
            });
            return this
        },
        init: function() {
            return this
        }
    })
})
    .call(this);