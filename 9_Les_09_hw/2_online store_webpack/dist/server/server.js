!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=2)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,n){var r=n(3),i=r(),o=n(0),u=n(4),a=n(1),s=a.resolve(__dirname,"./db/0_products.json"),c=a.resolve(__dirname,"./db/1_cart.json"),l=a.resolve(__dirname,"./db/3_catalog_new.json");i.use(r.json()),i.use("/",r.static(a.resolve(__dirname,"../public"))),i.get("/api/catalog",(function(t,e){o.readFile(s,"utf-8",(function(t,n){t?e.send(JSON.stringify({result:0,text:t})):(e.send(n),u("read-catalog"))}))})),i.get("/api/catalog-new",(function(t,e){o.readFile(l,"utf-8",(function(t,n){t?e.send(JSON.stringify({result:0,text:t})):(e.send(n),u("read-catalog"))}))})),i.get("/api/cart",(function(t,e){o.readFile(c,"utf-8",(function(t,n){t?e.sendStatus(404,JSON.stringify({result:0,text:t})):(e.send(n),u("read-cart"))}))})),i.get("/api/cart-clear",(function(t,e){o.readFile(c,"utf-8",(function(t,n){if(t)e.sendStatus(404,JSON.stringify({result:0,text:t}));else{var r=JSON.parse(n);r.amount=0,r.countGoods=0,r.contents=[],o.writeFile(c,JSON.stringify(r,null,4),(function(t){t?e.send('{"result": 0}'):(e.send('{"result": 1}'),u("clear-cart"))}))}}))})),i.post("/api/cart",(function(t,e){o.readFile(c,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0,text:n}));else{var i=JSON.parse(r);i.contents.push(t.body),i.countGoods++,i.amount+=t.body.amount,o.writeFile(c,JSON.stringify(i,null,4),(function(n){n?e.send('{"result": 0}'):(e.send('{"result": 1}'),u("add-new-product",t.body))}))}}))})),i.delete("/api/cart",(function(t,e){o.readFile(c,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0,text:n}));else{var i=JSON.parse(r);i.contents.splice(i.contents.indexOf(t.body),1),i.countGoods--,i.amount-=t.body.amount,o.writeFile(c,JSON.stringify(i,null,4),(function(n){n?e.send('{"result": 0}'):(e.send('{"result": 1}'),u("delete-product",t.body))}))}}))})),i.put("/api/cart/:id",(function(t,e){o.readFile(c,"utf-8",(function(n,r){if(n)e.sendStatus(404,JSON.stringify({result:0,text:n}));else{var i=JSON.parse(r),a=i.contents.find((function(e){return e.id===+t.params.id}));t.body.quantity>0&&a.quantity++,t.body.quantity<0&&a.quantity>1&&a.quantity--,a.amount=a.price*a.quantity,i.amount=i.contents.reduce((function(t,e){return t+e.amount}),0),o.writeFile(c,JSON.stringify(i,null,4),(function(t){t?e.send('{"result": 0}'):(e.send('{"result": 1}'),u("change-product",a))}))}}))}));i.listen(3e3,(function(){console.log("Listening ".concat(3e3," port"))}))},function(t,e){t.exports=require("express")},function(t,e,n){var r=n(0),i=n(1).resolve(__dirname,"./db/2_log.json");t.exports=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;r.readFile(i,"utf-8",(function(n,o){var u=JSON.parse(o);if(e){var a=e.id,s=e.title,c=e.price,l=e.quantity,d=e.amount;u.content.push({N:u._id,action:t,id:a,title:s,price:c,quantity:l,amount:d,timestamp:(new Date).toLocaleString("ru")})}else u.content.push({N:u._id,action:t,timestamp:(new Date).toLocaleString("ru")});u._id++,r.writeFile(i,JSON.stringify(u,null,4),(function(t){return console.log(t)}))}))}}]);