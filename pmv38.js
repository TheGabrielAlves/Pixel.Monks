function APIMM(eventObjectLocal) {
    fetch("https://southamerica-east1-coty-415718.cloudfunctions.net/ingress_proxy", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventObjectLocal)
    })
    .then(response => response.json())
    .then(resultado => console.log(resultado))
    .catch(erro => console.error(erro));
}

function pm(e) {
    function t() {
        let e = "abcdefghijklmnopqrstuvwxyz"
          , t = e.charAt(Math.floor(Math.random() * e.length))
          , i = Date.now().toString(36)
          , n = Math.random().toString(36).substr(2, 5);
        return t + "-" + i + n
    }
    function i() {
        let e = "DE/" + t() + Date.now().toString(36) + "/" + n();
        return localStorage.setItem("MMdevice", e),
        e
    }
    function n() {
        let e = navigator.userAgent
          , t = e.match(/(Windows|Mac|Linux|Android|iOS)/i);
        return t ? t[0] : "desconhecido"
    }
    function r() {
        return sessionStorage.getItem("MMPsessionId")
    }
    function s() {
        return localStorage.getItem("MMdevice")
    }
    !function e(i) {
        var s, o, p, a, c, d, u, l, m, h, f, M, g, v, y, w, k, b;
        let I = {
            session_id: r(),
            system: n(),
            url: document.URL,
            
            "items": [],
            "total": 1,
            "transaction_id": "",
            "list": "",
            "index": 1,
            "p_1": "",
            "p_2": "",
            "p_3": "",
            "p_4": "",
            "p_5": "",
            "p_value": "",
            
            ref: document.referrer,
            pointer: function e() {
                let t = sessionStorage.getItem("MMhash");
                return "P-" + t + "-" + Date.now()
            }(),
            customer_id: i.client_id
        };
        switch (i.type) {
        case "gen":
            s = i,
            o = I,
            o.type = "gen",
            o.p1 = s.p1,
            o.p2 = s.p2,
            o.p3 = s.p3,
            o.p4 = s.p4,
            o.p5 = s.p5,
            o.p_value = s.p_value,
            gf(o);
            break;
        case "form":
            p = i,
            a = I,
            a.type = "form",
            a.p1 = p.p1,
            a.p2 = p.p2,
            a.p_value = p.p_value,
            gf(a);
            break;
        case "add_product_list":
            c = i,
            d = I,
            d.type = "add_product_list",
            d.items = c.items,
            d.list = c.list,
            d.index = c.index,
            gf(d);
            break;
        case "view_product_list":
            u = i,
            l = I,
            l.type = "view_product_list",
            l.items = u.items,
            l.list = u.list,
            l.index = u.index,
            gf(l);
            break;
        case "purchase":
            m = i,
            h = I,
            h.type = "purchase",
            h.items = m.items,
            h.total = m.total,
            h.transaction_id = m.transaction_id,
            console.log(h),
            gf(h);
            break;
        case "checkout":
            f = i,
            M = I,
            M.type = "checkout",
            M.items = f.items,
            M.total = f.total,
            gf(M);
            break;
        case "remove_product":
            g = i,
            v = I,
            v.type = "remove_product",
            v.items = g.items,
            gf(v);
            break;
        case "add_product":
            y = i,
            w = I,
            w.type = "add_product",
            w.items = y.items,
            gf(w);
            break;
        case "view_product":
            k = i,
            b = I,
            b.type = "view_product",
            b.items = k.items,
            gf(b);
            break;
        case "page_view":
            !function e(i, n) {
                let s = r();
                if (!s) {
                    s = function e() {
                        let i = "SE-" + t();
                        return sessionStorage.setItem("MMPsessionId", i),
                        i
                    }();
                    let o = function e() {
                        let i = t()
                          , n = "P-" + i + "-" + Date.now();
                        return sessionStorage.setItem("MMhash", i),
                        n
                    }();
                    n.event_name = "session_start",
                    n.session_id = s,
                    n.pointer = o,
                    APIMM(n)
                }
                n.event_name = "page_view",
                APIMM(n)
            }(i, I)
        }
    }(e)
}
