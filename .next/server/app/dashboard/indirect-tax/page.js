(()=>{var e={};e.id=73,e.ids=[73],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},5477:e=>{"use strict";e.exports=require("punycode")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},9796:e=>{"use strict";e.exports=require("zlib")},6005:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>x,pages:()=>c,routeModule:()=>u,tree:()=>l});var r=t(482),a=t(9108),i=t(2563),n=t.n(i),d=t(8300),o={};for(let e in d)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>d[e]);t.d(s,o);let l=["",{children:["dashboard",{children:["indirect-tax",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8036)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\indirect-tax\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,5030)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,2360)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,5560)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,1429)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\not-found.tsx"]}],c=["C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\indirect-tax\\page.tsx"],x="/dashboard/indirect-tax/page",m={require:t,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/indirect-tax/page",pathname:"/dashboard/indirect-tax",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2534:(e,s,t)=>{Promise.resolve().then(t.bind(t,7397))},7397:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>o});var r=t(5344),a=t(3729),i=t(2456),n=t(637),d=t(7626);function o(){let[e,s]=(0,a.useState)([]),[t,o]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null),x=(0,n.AY)("https://mxuczdeyrczekcyvcshp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dWN6ZGV5cmN6ZWtjeXZjc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDUxMTEsImV4cCI6MjA1ODM4MTExMX0.h6wT_HPziCAwPhpOa2hs0MQF9ND76wpCleU-yjLyxSA");(0,a.useEffect)(()=>{(async()=>{o(!0);try{let{data:{session:e}}=await x.auth.getSession();if(!e)return;let t=x.from("tax_records").select("*").eq("user_id",e.user.id).eq("tax_type","Indirect").order("date_of_payment",{ascending:!1});l&&(t=t.eq("status",l));let{data:r,error:a}=await t;if(a)throw a;s(r||[])}catch(e){console.error("Error fetching indirect tax records:",e)}finally{o(!1)}})()},[l]);let m=e.reduce((e,s)=>e+Number(s.amount),0),u=e.reduce((e,s)=>"Paid"===s.status?e+Number(s.amount):e,0);return(0,r.jsxs)("div",{className:"animate-fade-in",children:[r.jsx("div",{className:"mb-6",children:(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Indirect Tax Management"}),r.jsx("p",{className:"text-gray-600 mt-1",children:"Manage your GST, sales tax, and other indirect taxes"})]}),r.jsx(d.default,{defaultTaxType:"Indirect"})]})}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5 mb-6",children:[r.jsx("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 rounded-full bg-blue-100 mr-4",children:r.jsx(i.orK,{className:"h-6 w-6 text-blue-600"})}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Total Indirect Tax"}),(0,r.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",m.toFixed(2)]})]})]})}),r.jsx("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 rounded-full bg-green-100 mr-4",children:r.jsx(i.orK,{className:"h-6 w-6 text-green-600"})}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Paid Amount"}),(0,r.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",u.toFixed(2)]})]})]})}),r.jsx("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx("div",{className:"p-3 rounded-full bg-amber-100 mr-4",children:r.jsx(i.orK,{className:"h-6 w-6 text-amber-600"})}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"text-sm font-medium text-gray-500",children:"Pending Amount"}),(0,r.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",(m-u).toFixed(2)]})]})]})})]}),(0,r.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden rounded-lg shadow-sm mb-6",children:[r.jsx("div",{className:"px-6 py-5 border-b border-gray-200",children:(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Indirect Tax Records"}),(0,r.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsxs)("select",{className:"appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",value:l||"",onChange:e=>c(e.target.value||null),children:[r.jsx("option",{value:"",children:"All Status"}),r.jsx("option",{value:"Paid",children:"Paid"}),r.jsx("option",{value:"Pending",children:"Pending"}),r.jsx("option",{value:"Overdue",children:"Overdue"})]}),r.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500",children:r.jsx(i.Ihx,{className:"h-4 w-4"})})]}),(0,r.jsxs)("button",{className:"inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[r.jsx(i._hL,{className:"mr-2 h-4 w-4"})," Export"]})]})]})}),r.jsx("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[r.jsx("thead",{className:"bg-gray-50",children:(0,r.jsxs)("tr",{children:[r.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tax Name"}),r.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amount"}),r.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Date of Payment"}),r.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),r.jsx("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Notes"})]})}),r.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:t?r.jsx("tr",{children:r.jsx("td",{colSpan:5,className:"px-6 py-4 text-center text-sm text-gray-500",children:"Loading tax records..."})}):0===e.length?r.jsx("tr",{children:r.jsx("td",{colSpan:5,className:"px-6 py-4 text-center text-sm text-gray-500",children:"No indirect tax records found. Add your first record with the button above."})}):e.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-gray-50",children:[r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm font-medium text-gray-900",children:e.tax_name})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,r.jsxs)("div",{className:"text-sm text-gray-900",children:["₹",Number(e.amount).toFixed(2)]})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("div",{className:"text-sm text-gray-900",children:new Date(e.date_of_payment).toLocaleDateString()})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:r.jsx("span",{className:`inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                        ${"Paid"===e.status?"bg-green-100 text-green-800":"Overdue"===e.status?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}`,children:e.status})}),r.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:e.notes||"-"})]},e.id))})]})})]}),(0,r.jsxs)("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:[r.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Indirect Tax Information"}),(0,r.jsxs)("div",{className:"prose prose-sm text-gray-700",children:[r.jsx("p",{children:"Indirect taxes are taxes imposed on goods and services rather than on income or profits. They include:"}),(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:[r.jsx("strong",{children:"GST (Goods and Services Tax):"})," Tax on most goods and services sold"]}),(0,r.jsxs)("li",{children:[r.jsx("strong",{children:"Sales Tax:"})," Tax on sale of goods to the end consumer"]}),(0,r.jsxs)("li",{children:[r.jsx("strong",{children:"Excise Duty:"})," Tax on production of goods"]}),(0,r.jsxs)("li",{children:[r.jsx("strong",{children:"Customs Duty:"})," Tax on imports and exports"]}),(0,r.jsxs)("li",{children:[r.jsx("strong",{children:"Service Tax:"})," Tax on services provided"]})]}),r.jsx("p",{children:"Indirect taxes are typically regressive and are ultimately passed on to the end consumer as part of the purchase price."})]})]})]})}},7626:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>x});var r=t(5344),a=t(3729),i=t(2456),n=t(8428),d=t(708),o=t(637),l=t(6055);let c=({onClose:e,defaultTaxType:s})=>{let t=(0,n.useRouter)(),[c,x]=(0,a.useState)(!1),[m,u]=(0,a.useState)(null),p=(0,o.AY)("https://mxuczdeyrczekcyvcshp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dWN6ZGV5cmN6ZWtjeXZjc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDUxMTEsImV4cCI6MjA1ODM4MTExMX0.h6wT_HPziCAwPhpOa2hs0MQF9ND76wpCleU-yjLyxSA"),{register:h,handleSubmit:g,formState:{errors:f}}=(0,d.cI)({defaultValues:{tax_type:s||"Direct",status:"Pending",date_of_payment:new Date().toISOString().split("T")[0]}}),y=async s=>{x(!0),u(null);try{let{data:r,error:a}=await p.auth.getUser();if(a)throw a;if(!r.user)throw Error("User not authenticated");let{error:i}=await p.from("tax_records").insert({user_id:r.user.id,tax_type:s.tax_type,tax_name:s.tax_name,amount:s.amount,date_of_payment:s.date_of_payment,status:s.status,notes:s.notes||""});if(i)throw console.error("Insert error:",i),i;t.refresh(),e()}catch(e){console.error("Error adding tax record:",e),u(e instanceof Error?e.message:"Failed to add tax record")}finally{x(!1)}};return r.jsx(l.Z,{onClose:e,children:(0,r.jsxs)("div",{className:"bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h3",{className:"text-lg font-medium text-gray-900",children:"Add Tax Record"}),r.jsx("button",{onClick:e,className:"text-gray-400 hover:text-gray-500",children:r.jsx(i.q5L,{size:20})})]}),m&&r.jsx("div",{className:"mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative",children:r.jsx("span",{className:"block sm:inline",children:m})}),(0,r.jsxs)("form",{onSubmit:g(y),className:"space-y-4",children:[(0,r.jsxs)("div",{className:"grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2",children:[(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"tax_type",className:"block text-sm font-medium text-gray-700",children:"Tax Type"}),(0,r.jsxs)("select",{id:"tax_type",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",...h("tax_type",{required:"Tax type is required"}),children:[r.jsx("option",{value:"Direct",children:"Direct Tax"}),r.jsx("option",{value:"Indirect",children:"Indirect Tax"})]}),f.tax_type&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:f.tax_type.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"tax_name",className:"block text-sm font-medium text-gray-700",children:"Tax Name"}),r.jsx("input",{type:"text",id:"tax_name",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",placeholder:"e.g., Income Tax, GST",...h("tax_name",{required:"Tax name is required",minLength:{value:2,message:"Tax name must be at least 2 characters"}})}),f.tax_name&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:f.tax_name.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"amount",className:"block text-sm font-medium text-gray-700",children:"Amount"}),(0,r.jsxs)("div",{className:"mt-1 relative rounded-md shadow-sm",children:[r.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:r.jsx("span",{className:"text-gray-500 sm:text-sm",children:"₹"})}),r.jsx("input",{type:"number",id:"amount",className:"mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",step:"0.01",...h("amount",{required:"Amount is required",min:{value:.01,message:"Amount must be greater than 0"},valueAsNumber:!0})})]}),f.amount&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:f.amount.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"date_of_payment",className:"block text-sm font-medium text-gray-700",children:"Date of Payment"}),r.jsx("input",{type:"date",id:"date_of_payment",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",...h("date_of_payment",{required:"Date is required"})}),f.date_of_payment&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:f.date_of_payment.message})]}),(0,r.jsxs)("div",{children:[r.jsx("label",{htmlFor:"status",className:"block text-sm font-medium text-gray-700",children:"Status"}),(0,r.jsxs)("select",{id:"status",className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",...h("status",{required:"Status is required"}),children:[r.jsx("option",{value:"Pending",children:"Pending"}),r.jsx("option",{value:"Paid",children:"Paid"})]}),f.status&&r.jsx("p",{className:"mt-1 text-sm text-red-600",children:f.status.message})]}),(0,r.jsxs)("div",{className:"sm:col-span-2",children:[r.jsx("label",{htmlFor:"notes",className:"block text-sm font-medium text-gray-700",children:"Notes (Optional)"}),r.jsx("textarea",{id:"notes",rows:3,className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",placeholder:"Add any additional information here",...h("notes")})]})]}),(0,r.jsxs)("div",{className:"pt-4 flex justify-end",children:[r.jsx("button",{type:"button",className:"bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3",onClick:e,children:"Cancel"}),r.jsx("button",{type:"submit",disabled:c,className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50",children:c?"Saving...":"Save"})]})]})]})})},x=({defaultTaxType:e})=>{let[s,t]=(0,a.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("button",{onClick:()=>t(!0),className:"btn-gradient inline-flex items-center px-4 py-2 border-0 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200",children:[r.jsx(i.OvN,{className:"mr-2 h-4 w-4"}),"Add Tax Record"]}),s&&r.jsx(c,{onClose:()=>t(!1),defaultTaxType:e})]})}},6055:(e,s,t)=>{"use strict";t.d(s,{Z:()=>i});var r=t(5344),a=t(3729);let i=({children:e,onClose:s})=>((0,a.useEffect)(()=>{document.body.style.overflow="hidden";let e=e=>{"Escape"===e.key&&s()};return window.addEventListener("keydown",e),()=>{document.body.style.overflow="unset",window.removeEventListener("keydown",e)}},[s]),r.jsx("div",{className:"fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center",onClick:e=>{e.target===e.currentTarget&&s()},children:r.jsx("div",{className:"relative bg-white rounded-lg max-w-lg w-full mx-auto shadow-xl",children:e})}))},8036:(e,s,t)=>{"use strict";t.r(s),t.d(s,{$$typeof:()=>i,__esModule:()=>a,default:()=>n});let r=(0,t(6843).createProxy)(String.raw`C:\Users\phinn\OneDrive\Desktop\appfinal\app\dashboard\indirect-tax\page.tsx`),{__esModule:a,$$typeof:i}=r,n=r.default}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[844,320,708,174],()=>t(6005));module.exports=r})();