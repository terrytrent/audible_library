import{_ as S}from"./gallery-lazy.9238549d.js";import{a as B}from"./gallery-search.8aedb8f0.js";import{f as M}from"./gallery-findSubPageSource.85dad557.js";import{_ as w,c as p,d as b,a as f,F as N,i as D,n as k,e as g,r as R,b as F,o as c,h as O,j as v,t as h,w as $,f as W}from"./lodash.4793ee9f.js";import"./gallery.f59fb107.js";import"./gallery-makeCoverUrl.52ce2441.js";import"./jquery.fca3dd19.js";import"./index.ff69ba6a.js";import"./content-script-helpers.caeeb6e9.js";import"./jszip.f74de32f.js";import"./howler.45f3c8a6.js";import"./tippy.0141f121.js";import"./gallery-page-title.3a2b50a5.js";import"./fuse.esm.249bd5bb.js";const C={name:"aleSeries",mixins:[M],data:function(){return{collectionSource:"pageCollection",pageTitle:"Series",pageSubTitle:null,listReady:!1}},computed:{optionsOpenMargin:function(){return this.$store.state.searchOptOpenHeight?{marginBottom:0}:!1},galleryStyle:function(){return this.$store.state.searchOptOpenHeight?{overflow:"hidden",height:this.$store.state.searchOptOpenHeight-this.$refs.wrapper.offsetTop*2+"px"}:!1}},methods:{makeCollection:function(){const o=this,t=[];let e=1;_.eachRight(o.subPageSource.collection,s=>{_.each(_.get(s,"series"),r=>{const l=_.find(t,{asin:r.asin}),a=_.find(this.$store.state.library.series,{asin:r.asin}),n=l!=null?l:{books:[],added:e++,name:r.name,asin:r.asin,authors:s.authors,narrators:s.narrators,publishers:s.publishers,minRating:_.toNumber(s.myRating)};if(a){let m=function(u){return(u||"").split("-").map(_.toNumber).filter(_.isFinite)},d=function(u){return _.flatMap(u.map(x=>m(x.bookNumbers)))},i=function(u){return _.max(d(u))};a.allBooksMinusDupes=o.removeDuplicates(a.allBooks);const y=_.filter(a.allBooksMinusDupes,u=>_.includes(a.books,u.asin));n.allBooksMinusDupes=a.allBooksMinusDupes,n.myMaxBookNumber=i(y),n.maxBookNumber=i(a.allBooksMinusDupes),n.missingLatest=n.myMaxBookNumber<n.maxBookNumber,n.minRating=this.calcMinRating(n,s)}n.books.push(s.title||s.shortTitle),l||t.push(n)})}),_.reverse(t),this.$store.commit("prop",{key:"pageCollection",value:t}),this.updateListRenderingOptions(),this.listReady=!0},updateListRenderingOptions:function(){let o=this,t={scope:[{active:!0,key:"name",tippy:"Search series by name",weight:5},{active:!0,key:"books",tippy:"Search series by book titles",weight:1},{active:!0,key:"authors.name",tippy:"Search series by authors",weight:1},{active:!0,key:"narrators.name",tippy:"Search series by narrators",weight:1},{active:!0,key:"publishers.name",tippy:"Search series by publishers",weight:1}],filter:[{active:!1,type:"filterExtras",label:"Number of owned books",key:"inSeries",range:[1,function(){let e=_.get(o.$store.state,o.collectionSource),s=_.maxBy(e,function(r){if(r.books)return r.books.length});return s?s.books.length:1}()],rangeMinDist:0,rangeSuffix:"",rangeMin:function(){return 1},rangeMax:function(){let e=_.get(o.$store.state,o.collectionSource),s=_.maxBy(e,function(r){if(r.books)return r.books.length});return s?s.books.length:1},condition:function(e){if(e.books){let s=this.range[0],r=this.range[1];return e.books.length>=s&&e.books.length<=r}}},{excludeFromWishlist:!0,type:"divider",key:"divider1.0"},{excludeFromWishlist:!0,active:!1,type:"filterExtras",label:"Rating (min)",tippy:"Based on the book you rated lowest in the series",key:"min-rating",condition:function(e){return(e.minRating||0)>=this.range[0]},range:!0,rangeMin:()=>1,rangeMax:()=>5,rangeMinDist:0,rangeSuffix:"",tooltipFormatter:function(e){switch(e){case 1:return e+" (Not for me)";case 2:return e+" (It\u2019s okay)";case 3:return e+" (Pretty good)";case 4:return e+" (It\u2019s great)";case 5:return e+" (I love it)";default:return 0}}},{excludeFromWishlist:!0,type:"divider",key:"divider1.1"},{excludeFromWishlist:!0,active:!1,type:"filterExtras",label:"Incomplete series",key:"series-incomplete",tippy:"Series in which I don't own all the books",condition:function(e){return e.allBooksMinusDupes.length>e.books.length}},{excludeFromWishlist:!0,type:"divider",key:"divider1.2"},{excludeFromWishlist:!0,active:!1,type:"filterExtras",label:"Missing latest book",key:"missing-latest",condition:e=>e==null?void 0:e.missingLatest}],sort:[{active:!1,key:"randomize",label:"Randomize",type:"sortExtras",tippy:"Ignores sorting and randomizes instead unless there's an active search."},{type:"divider",key:"divider1"},{active:!0,current:!0,key:"added",label:"Added",type:"sort",tippy:'<div style="text-align: left;"><small>&#9650;</small> Old at the top <br><small style="display: inline-block; transform: rotate(180deg);">&#9650;</small> New at the top</div>'},{active:!0,current:!1,key:"name",label:"Name",type:"sort",tippy:"Sort by series name"},{active:!1,current:!1,key:"amount",label:"Number of owned books",type:"sort"},{excludeFromWishlist:!0,active:!1,current:!1,key:"amountTotal",label:"Total number of books",type:"sort"},{excludeFromWishlist:!0,active:!1,current:!1,key:"missing",label:"Missing",tippy:"Number of missing books",type:"sort"}]};this.subPageSource.wishlist&&(t.filter=_.filter(t.filter,function(e){return!e.excludeFromWishlist}),t.sort=_.filter(t.sort,function(e){return!e.excludeFromWishlist})),this.$setListRenderingOpts(t)},removeDuplicates:function(o){let t=_.clone(o);var e=0;return _.each(t,function(s){s.order=++e}),t=_.groupBy(t,"bookNumbers"),_.each(t,function(s,r){if(s.length===1)t[r]=[s[0]];else{var l=_.filter(s,function(a){return!a.notInLibrary});l.length>0?t[r]=l:t[r]=[s[0]]}}),t=_.map(t,function(s){return s}),t=_.flatten(t),t=_.orderBy(t,"order","asc"),t},calcMinRating(o,t){let e=[o.minRating,t.myRating];return e=_.map(e,_.toNumber),e=_.filter(e,_.isFinite),_.min(e)}}},I={key:0,class:"books-total",content:"Total number of books I have in this series."},T={key:0};function z(o,t,e,s,r,l){const a=B,n=R("router-link"),m=S,d=F("tippy");return o.listReady?(c(),p("div",{key:0,id:"ale-series",class:"box-layout-wrapper",style:k(l.optionsOpenMargin),ref:"wrapper"},[b(a,{collectionSource:o.collectionSource},null,8,["collectionSource"]),f("div",{style:k(l.galleryStyle),class:"page-content"},[(c(!0),p(N,null,D(o.$store.getters.collection,(i,y)=>(c(),O(m,{class:"single-box","data-asin":i.asin,key:"series:"+i.asin},{default:v(()=>[b(n,{to:{name:"series",params:{series:i.asin},query:{subPageSource:o.subPageSource.name}}},{default:v(()=>[f("h2",null,h(i.name),1),i.books&&i.books.length?$((c(),p("div",I,[f("span",{class:W({"my-books":i.allBooksMinusDupes&&i.allBooksMinusDupes.length})},h(i.books.length),3),i.allBooksMinusDupes&&i.allBooksMinusDupes.length?(c(),p("span",T,"\xA0of\xA0"+h(i.allBooksMinusDupes.length),1)):g("",!0)])),[[d,{placement:"right"}]]):g("",!0)]),_:2},1032,["to"])]),_:2},1032,["data-asin"]))),128))],4)],4)):g("",!0)}const Y=w(C,[["render",z],["__scopeId","data-v-c08e84b7"]]);export{Y as default};
