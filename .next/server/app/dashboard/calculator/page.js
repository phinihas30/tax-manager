(()=>{var e={};e.id=366,e.ids=[366],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},5477:e=>{"use strict";e.exports=require("punycode")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},9796:e=>{"use strict";e.exports=require("zlib")},9997:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>x,pages:()=>o,routeModule:()=>p,tree:()=>c});var a=t(482),r=t(9108),i=t(2563),l=t.n(i),n=t(8300),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);t.d(s,d);let c=["",{children:["dashboard",{children:["calculator",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8027)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\calculator\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,5030)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,2360)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,5560)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,1429)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\not-found.tsx"]}],o=["C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\calculator\\page.tsx"],x="/dashboard/calculator/page",m={require:t,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/dashboard/calculator/page",pathname:"/dashboard/calculator",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},9075:(e,s,t)=>{Promise.resolve().then(t.bind(t,6334))},6334:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>l});var a=t(5344),r=t(3729),i=t(2456);function l(){let[e,s]=(0,r.useState)("exclusive"),[t,l]=(0,r.useState)(""),[n,d]=(0,r.useState)("18"),[c,o]=(0,r.useState)(0),[x,m]=(0,r.useState)(0),[p,h]=(0,r.useState)(0),u=[{value:"0",label:"0%"},{value:"5",label:"5%"},{value:"12",label:"12%"},{value:"18",label:"18%"},{value:"28",label:"28%"}];(0,r.useEffect)(()=>{g()},[t,n,e]);let g=()=>{if(!t||isNaN(Number(t))||0>Number(t)){j();return}let s=parseFloat(t),a=parseFloat(n)/100;if("exclusive"===e){let e=s*a;o(e),h(s),m(s+e)}else{let e=s/(1+a);o(s-e),h(e),m(s)}},j=()=>{o(0),m(0),h(0)};return(0,a.jsxs)("div",{className:"animate-fade-in",children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"GST Calculator"}),a.jsx("p",{className:"text-gray-600 mt-1",children:"Calculate GST amounts quickly and accurately"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:[(0,a.jsxs)("div",{className:"md:col-span-2",children:[(0,a.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden",children:[a.jsx("div",{className:"px-6 py-5 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx(i.bAx,{className:"h-5 w-5 text-indigo-500 mr-2"}),a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"GST Calculator"})]})}),(0,a.jsxs)("div",{className:"p-6",children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Calculation Type"}),(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("input",{id:"exclusive",name:"calculatorType",type:"radio",className:"h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500",checked:"exclusive"===e,onChange:()=>s("exclusive")}),a.jsx("label",{htmlFor:"exclusive",className:"ml-2 block text-sm text-gray-700",children:"Add GST to amount (Exclusive)"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("input",{id:"inclusive",name:"calculatorType",type:"radio",className:"h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500",checked:"inclusive"===e,onChange:()=>s("inclusive")}),a.jsx("label",{htmlFor:"inclusive",className:"ml-2 block text-sm text-gray-700",children:"Extract GST from amount (Inclusive)"})]})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"amount",className:"block text-sm font-medium text-gray-700 mb-1",children:"exclusive"===e?"Base Amount":"Total Amount (Including GST)"}),(0,a.jsxs)("div",{className:"mt-1 relative rounded-md shadow-sm",children:[a.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:a.jsx("span",{className:"text-gray-500 sm:text-sm",children:"₹"})}),a.jsx("input",{type:"text",name:"amount",id:"amount",value:t,onChange:e=>{let s=e.target.value;(""===s||/^\d*\.?\d*$/.test(s))&&l(s)},className:"block w-full pl-7 pr-12 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",placeholder:"0.00"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"gstRate",className:"block text-sm font-medium text-gray-700 mb-1",children:"GST Rate"}),a.jsx("select",{id:"gstRate",name:"gstRate",value:n,onChange:e=>d(e.target.value),className:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:u.map(e=>a.jsx("option",{value:e.value,children:e.label},e.value))})]})]}),(0,a.jsxs)("div",{className:"bg-gray-50 rounded-lg p-5",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-4",children:"Calculation Results"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{className:"p-4 bg-white border border-gray-200 rounded-md",children:[a.jsx("p",{className:"text-xs text-gray-500",children:"Net Amount"}),(0,a.jsxs)("p",{className:"text-lg font-medium text-gray-800",children:["₹",p.toFixed(2)]})]}),(0,a.jsxs)("div",{className:"p-4 bg-white border border-gray-200 rounded-md",children:[(0,a.jsxs)("p",{className:"text-xs text-gray-500",children:["GST Amount (",n,"%)"]}),(0,a.jsxs)("p",{className:"text-lg font-medium text-gray-800",children:["₹",c.toFixed(2)]})]}),(0,a.jsxs)("div",{className:"p-4 bg-indigo-50 border border-indigo-100 rounded-md",children:[a.jsx("p",{className:"text-xs text-indigo-700",children:"Total Amount"}),(0,a.jsxs)("p",{className:"text-lg font-medium text-indigo-900",children:["₹",x.toFixed(2)]})]})]})]})]})]}),(0,a.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden mt-5",children:[a.jsx("div",{className:"px-6 py-5 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx(i.NNy,{className:"h-5 w-5 text-indigo-500 mr-2"}),a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Detailed GST Breakdown"})]})}),a.jsx("div",{className:"p-6",children:a.jsx("div",{className:"overflow-hidden border border-gray-200 rounded-lg",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[a.jsx("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[a.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Component"}),a.jsx("th",{scope:"col",className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amount"}),a.jsx("th",{scope:"col",className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Percentage"})]})}),(0,a.jsxs)("tbody",{className:"bg-white divide-y divide-gray-200",children:[(0,a.jsxs)("tr",{children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:"Net Amount"}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:["₹",p.toFixed(2)]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:[x>0?(p/x*100).toFixed(2):"0.00","%"]})]}),(0,a.jsxs)("tr",{children:[(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:["CGST (",parseInt(n)/2,"%)"]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:["₹",(c/2).toFixed(2)]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:[parseInt(n)/2,"%"]})]}),(0,a.jsxs)("tr",{children:[(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",children:["SGST (",parseInt(n)/2,"%)"]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:["₹",(c/2).toFixed(2)]}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right",children:[parseInt(n)/2,"%"]})]}),(0,a.jsxs)("tr",{className:"bg-indigo-50",children:[a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900",children:"Total Amount"}),(0,a.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900 text-right",children:["₹",x.toFixed(2)]}),a.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900 text-right",children:"100.00%"})]})]})]})})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden",children:[a.jsx("div",{className:"px-6 py-5 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx(i.bax,{className:"h-5 w-5 text-indigo-500 mr-2"}),a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"About GST"})]})}),a.jsx("div",{className:"p-6",children:(0,a.jsxs)("div",{className:"space-y-4 text-sm text-gray-600",children:[(0,a.jsxs)("p",{children:[a.jsx("span",{className:"font-medium text-gray-900",children:"GST (Goods and Services Tax)"})," is a comprehensive indirect tax levied on the manufacture, sale, and consumption of goods and services throughout India."]}),a.jsx("h3",{className:"font-medium text-gray-900",children:"GST Calculation Types:"}),(0,a.jsxs)("ul",{className:"list-disc list-inside space-y-1 ml-2",children:[(0,a.jsxs)("li",{children:[a.jsx("span",{className:"font-medium",children:"Exclusive GST:"})," The tax amount is added to the original price."]}),(0,a.jsxs)("li",{children:[a.jsx("span",{className:"font-medium",children:"Inclusive GST:"})," The tax amount is already included in the final price."]})]}),a.jsx("h3",{className:"font-medium text-gray-900",children:"GST Components:"}),(0,a.jsxs)("ul",{className:"list-disc list-inside space-y-1 ml-2",children:[(0,a.jsxs)("li",{children:[a.jsx("span",{className:"font-medium",children:"CGST (Central GST):"})," Collected by the Central Government"]}),(0,a.jsxs)("li",{children:[a.jsx("span",{className:"font-medium",children:"SGST (State GST):"})," Collected by the State Government"]}),(0,a.jsxs)("li",{children:[a.jsx("span",{className:"font-medium",children:"IGST (Integrated GST):"})," For inter-state transactions"]})]}),a.jsx("h3",{className:"font-medium text-gray-900",children:"Common GST Rates in India:"}),a.jsx("div",{className:"grid grid-cols-2 gap-2 mt-2",children:u.map(e=>a.jsx("div",{className:"p-2 bg-gray-50 rounded text-center",children:e.label},e.value))}),a.jsx("p",{className:"text-xs text-gray-500 mt-4",children:"This calculator provides both CGST and SGST calculations at half of the selected rate each. For interstate transactions (IGST), the full rate applies."})]})})]}),(0,a.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden mt-5",children:[a.jsx("div",{className:"px-6 py-5 border-b border-gray-200",children:a.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"GST Formula"})}),a.jsx("div",{className:"p-6",children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"To Add GST (Exclusive):"}),(0,a.jsxs)("div",{className:"p-3 bg-gray-50 rounded-md text-sm",children:[a.jsx("p",{className:"font-mono",children:"GST Amount = Original Price \xd7 GST Rate"}),a.jsx("p",{className:"font-mono mt-1",children:"Total Price = Original Price + GST Amount"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"To Extract GST (Inclusive):"}),(0,a.jsxs)("div",{className:"p-3 bg-gray-50 rounded-md text-sm",children:[a.jsx("p",{className:"font-mono",children:"Original Price = Total Price \xf7 (1 + GST Rate)"}),a.jsx("p",{className:"font-mono mt-1",children:"GST Amount = Total Price - Original Price"})]})]})]})})]})]})]})]})}},8027:(e,s,t)=>{"use strict";t.r(s),t.d(s,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});let a=(0,t(6843).createProxy)(String.raw`C:\Users\phinn\OneDrive\Desktop\appfinal\app\dashboard\calculator\page.tsx`),{__esModule:r,$$typeof:i}=a,l=a.default}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[844,320,898],()=>t(9997));module.exports=a})();