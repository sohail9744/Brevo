!function() {
	var m = {
		version : "1.6.19",
		mesh : function(t) {
			return q(t, l.apply(this, arguments))
		},
		meshArcs : l,
		merge : function(t) {
			return q(t, o.apply(this, arguments))
		},
		mergeArcs : o,
		feature : s,
		neighbors : k,
		presimplify : d
	};
	function a(A, t) {
		var u = {}, v = {}, w = {}, x = [], B = -1;
		t.forEach(function(F, C) {
			var E = A.arcs[F < 0 ? ~F : F], D;
			if (E.length < 3 && !E[1][0] && !E[1][1]) {
				D = t[++B], t[B] = F, t[C] = D
			}
		});
		t.forEach(function(F) {
			var I = y(F), J = I[0], D = I[1], H, G;
			if (H = w[J]) {
				delete w[H.end];
				H.push(F);
				H.end = D;
				if (G = v[D]) {
					delete v[G.start];
					var C = G === H ? H : H.concat(G);
					v[C.start = H.start] = w[C.end = G.end] = C
				} else {
					v[H.start] = w[H.end] = H
				}
			} else {
				if (H = v[D]) {
					delete v[H.start];
					H.unshift(F);
					H.start = J;
					if (G = w[J]) {
						delete w[G.end];
						var E = G === H ? H : G.concat(H);
						v[E.start = G.start] = w[E.end = H.end] = E
					} else {
						v[H.start] = w[H.end] = H
					}
				} else {
					H = [ F ];
					v[H.start = J] = w[H.end = D] = H
				}
			}
		});
		function y(D) {
			var C = A.arcs[D < 0 ? ~D : D], F = C[0], E;
			if (A.transform) {
				E = [ 0, 0 ], C.forEach(function(G) {
					E[0] += G[0], E[1] += G[1]
				})
			} else {
				E = C[C.length - 1]
			}
			return D < 0 ? [ E, F ] : [ F, E ]
		}
		function z(D, F) {
			for ( var C in D) {
				var E = D[C];
				delete F[E.start];
				delete E.start;
				delete E.end;
				E.forEach(function(G) {
					u[G < 0 ? ~G : G] = 1
				});
				x.push(E)
			}
		}
		z(w, v);
		z(v, w);
		t.forEach(function(C) {
			if (!u[C < 0 ? ~C : C]) {
				x.push([ C ])
			}
		});
		return x
	}
	function l(E, w, u) {
		var t = [];
		if (arguments.length > 1) {
			var z = [], B;
			function v(H) {
				var G = H < 0 ? ~H : H;
				(z[G] || (z[G] = [])).push({
					i : H,
					g : B
				})
			}
			function F(G) {
				G.forEach(v)
			}
			function C(G) {
				G.forEach(F)
			}
			function A(G) {
				if (G.type === "GeometryCollection") {
					G.geometries.forEach(A)
				} else {
					if (G.type in D) {
						B = G, D[G.type](G.arcs)
					}
				}
			}
			var D = {
				LineString : F,
				MultiLineString : C,
				Polygon : C,
				MultiPolygon : function(G) {
					G.forEach(C)
				}
			};
			A(w);
			z.forEach(arguments.length < 3 ? function(G) {
				t.push(G[0].i)
			} : function(G) {
				if (u(G[0].g, G[G.length - 1].g)) {
					t.push(G[0].i)
				}
			})
		} else {
			for (var y = 0, x = E.arcs.length; y < x; ++y) {
				t.push(y)
			}
		}
		return {
			type : "MultiLineString",
			arcs : a(E, t)
		}
	}
	function o(z, y) {
		var w = {}, t = [], v = [];
		y.forEach(function(A) {
			if (A.type === "Polygon") {
				u(A.arcs)
			} else {
				if (A.type === "MultiPolygon") {
					A.arcs.forEach(u)
				}
			}
		});
		function u(A) {
			A.forEach(function(B) {
				B.forEach(function(C) {
					(w[C = C < 0 ? ~C : C] || (w[C] = [])).push(A)
				})
			});
			t.push(A)
		}
		function x(A) {
			return j(q(z, {
				type : "Polygon",
				arcs : [ A ]
			}).coordinates[0]) > 0
		}
		t.forEach(function(C) {
			if (!C._) {
				var A = [], B = [ C ];
				C._ = 1;
				v.push(A);
				while (C = B.pop()) {
					A.push(C);
					C.forEach(function(D) {
						D.forEach(function(E) {
							w[E < 0 ? ~E : E].forEach(function(F) {
								if (!F._) {
									F._ = 1;
									B.push(F)
								}
							})
						})
					})
				}
			}
		});
		t.forEach(function(A) {
			delete A._
		});
		return {
			type : "MultiPolygon",
			arcs : v.map(function(A) {
				var D = [];
				A.forEach(function(F) {
					F.forEach(function(G) {
						G.forEach(function(H) {
							if (w[H < 0 ? ~H : H].length < 2) {
								D.push(H)
							}
						})
					})
				});
				D = a(z, D);
				if ((n = D.length) > 1) {
					var E = x(A[0][0]);
					for (var C = 0, B; C < n; ++C) {
						if (E === x(D[C])) {
							B = D[0], D[0] = D[C], D[C] = B;
							break
						}
					}
				}
				return D
			})
		}
	}
	function s(u, t) {
		return t.type === "GeometryCollection" ? {
			type : "FeatureCollection",
			features : t.geometries.map(function(v) {
				return g(u, v)
			})
		} : g(u, t)
	}
	function g(v, u) {
		var t = {
			type : "Feature",
			id : u.id,
			properties : u.properties || {},
			geometry : q(v, u)
		};
		if (u.id == null) {
			delete t.id
		}
		return t
	}
	function q(C, v) {
		var z = c(C.transform), t = C.arcs;
		function u(G, H) {
			if (H.length) {
				H.pop()
			}
			for (var E = t[G < 0 ? ~G : G], F = 0, J = E.length, I; F < J; ++F) {
				H.push(I = E[F].slice());
				z(I, F)
			}
			if (G < 0) {
				i(H, J)
			}
		}
		function A(E) {
			E = E.slice();
			z(E, 0);
			return E
		}
		function D(G) {
			var F = [];
			for (var E = 0, H = G.length; E < H; ++E) {
				u(G[E], F)
			}
			if (F.length < 2) {
				F.push(F[0].slice())
			}
			return F
		}
		function w(F) {
			var E = D(F);
			while (E.length < 4) {
				E.push(E[0].slice())
			}
			return E
		}
		function y(E) {
			return E.map(w)
		}
		function x(F) {
			var E = F.type;
			return E === "GeometryCollection" ? {
				type : E,
				geometries : F.geometries.map(x)
			} : E in B ? {
				type : E,
				coordinates : B[E](F)
			} : null
		}
		var B = {
			Point : function(E) {
				return A(E.coordinates)
			},
			MultiPoint : function(E) {
				return E.coordinates.map(A)
			},
			LineString : function(E) {
				return D(E.arcs)
			},
			MultiLineString : function(E) {
				return E.arcs.map(D)
			},
			Polygon : function(E) {
				return y(E.arcs)
			},
			MultiPolygon : function(E) {
				return E.arcs.map(y)
			}
		};
		return x(v)
	}
	function i(y, x) {
		var w, u = y.length, v = u - x;
		while (v < --u) {
			w = y[v], y[v++] = y[u], y[u] = w
		}
	}
	function p(u, t) {
		var y = 0, w = u.length;
		while (y < w) {
			var v = y + w >>> 1;
			if (u[v] < t) {
				y = v + 1
			} else {
				w = v
			}
		}
		return y
	}
	function k(F) {
		var v = {}, G = F.map(function() {
			return []
		});
		function H(J, I) {
			J.forEach(function(K) {
				if (K < 0) {
					K = ~K
				}
				var L = v[K];
				if (L) {
					L.push(I)
				} else {
					v[K] = [ I ]
				}
			})
		}
		function B(J, I) {
			J.forEach(function(K) {
				H(K, I)
			})
		}
		function A(J, I) {
			if (J.type === "GeometryCollection") {
				J.geometries.forEach(function(K) {
					A(K, I)
				})
			} else {
				if (J.type in E) {
					E[J.type](J.arcs, I)
				}
			}
		}
		var E = {
			LineString : H,
			MultiLineString : B,
			Polygon : B,
			MultiPolygon : function(J, I) {
				J.forEach(function(K) {
					B(K, I)
				})
			}
		};
		F.forEach(A);
		for ( var y in v) {
			for (var z = v[y], u = z.length, x = 0; x < u; ++x) {
				for (var w = x + 1; w < u; ++w) {
					var D = z[x], C = z[w], t;
					if ((t = G[D])[y = p(t, C)] !== C) {
						t.splice(y, 0, C)
					}
					if ((t = G[C])[y = p(t, D)] !== D) {
						t.splice(y, 0, D)
					}
				}
			}
		}
		return G
	}
	function d(y, t) {
		var x = c(y.transform), v = b(y.transform), u = h();
		if (!t) {
			t = f
		}
		y.arcs.forEach(function(A) {
			var C = [], H = 0, F;
			for (var D = 0, B = A.length, z; D < B; ++D) {
				z = A[D];
				x(A[D] = [ z[0], z[1], Infinity ], D)
			}
			for (var D = 1, B = A.length - 1; D < B; ++D) {
				F = A.slice(D - 1, D + 2);
				F[1][2] = t(F);
				C.push(F);
				u.push(F)
			}
			for (var D = 0, B = C.length; D < B; ++D) {
				F = C[D];
				F.previous = C[D - 1];
				F.next = C[D + 1]
			}
			while (F = u.pop()) {
				var G = F.previous, E = F.next;
				if (F[1][2] < H) {
					F[1][2] = H
				} else {
					H = F[1][2]
				}
				if (G) {
					G.next = E;
					G[2] = F[2];
					w(G)
				}
				if (E) {
					E.previous = G;
					E[0] = F[0];
					w(E)
				}
			}
			A.forEach(v)
		});
		function w(z) {
			u.remove(z);
			z[1][2] = t(z);
			u.push(z)
		}
		return y
	}
	function j(v) {
		var w = -1, y = v.length, u, t = v[y - 1], x = 0;
		while (++w < y) {
			u = t;
			t = v[w];
			x += u[0] * t[1] - u[1] * t[0]
		}
		return x * 0.5
	}
	function f(v) {
		var u = v[0], t = v[1], w = v[2];
		return Math.abs((u[0] - w[0]) * (t[1] - u[1]) - (u[0] - t[0]) * (w[1] - u[1]))
	}
	function r(u, t) {
		return u[1][2] - t[1][2]
	}
	function h() {
		var u = {}, x = [], v = 0;
		u.push = function(y) {
			t(x[y._ = v] = y, v++);
			return v
		};
		u.pop = function() {
			if (v <= 0) {
				return
			}
			var z = x[0], y;
			if (--v > 0) {
				y = x[v], w(x[y._ = 0] = y, 0)
			}
			return z
		};
		u.remove = function(A) {
			var z = A._, y;
			if (x[z] !== A) {
				return
			}
			if (z !== --v) {
				y = x[v], (r(y, A) < 0 ? t : w)(x[y._ = z] = y, z)
			}
			return z
		};
		function t(z, A) {
			while (A > 0) {
				var y = ((A + 1) >> 1) - 1, B = x[y];
				if (r(z, B) >= 0) {
					break
				}
				x[B._ = A] = B;
				x[z._ = A = y] = z
			}
		}
		function w(A, B) {
			while (true) {
				var C = (B + 1) << 1, y = C - 1, z = B, D = x[z];
				if (y < v && r(x[y], D) < 0) {
					D = x[z = y]
				}
				if (C < v && r(x[C], D) < 0) {
					D = x[z = C]
				}
				if (z === B) {
					break
				}
				x[D._ = B] = D;
				x[A._ = B = z] = A
			}
		}
		return u
	}
	function c(v) {
		if (!v) {
			return e
		}
		var x, z, y = v.scale[0], w = v.scale[1], u = v.translate[0], t = v.translate[1];
		return function(A, B) {
			if (!B) {
				x = z = 0
			}
			A[0] = (x += A[0]) * y + u;
			A[1] = (z += A[1]) * w + t
		}
	}
	function b(v) {
		if (!v) {
			return e
		}
		var x, z, y = v.scale[0], w = v.scale[1], u = v.translate[0], t = v.translate[1];
		return function(A, C) {
			if (!C) {
				x = z = 0
			}
			var B = (A[0] - u) / y | 0, D = (A[1] - t) / w | 0;
			A[0] = B - x;
			A[1] = D - z;
			x = B;
			z = D
		}
	}
	function e() {
	}
	if (typeof define === "function" && define.amd) {
		define(m)
	} else {
		if (typeof module === "object" && module.exports) {
			module.exports = m
		} else {
			this.topojson = m
		}
	}
}();