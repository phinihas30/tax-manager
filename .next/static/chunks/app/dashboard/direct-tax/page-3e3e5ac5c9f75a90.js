(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[548],{8453:function(e,s,t){Promise.resolve().then(t.bind(t,1128))},1128:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return l}});var a=t(3827),r=t(4090),i=t(6173),d=t(3807),n=t(9186);function l(){let[e,s]=(0,r.useState)([]),[t,l]=(0,r.useState)(!0),[c,x]=(0,r.useState)(null),o=(0,d.AY)("https://mxuczdeyrczekcyvcshp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dWN6ZGV5cmN6ZWtjeXZjc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDUxMTEsImV4cCI6MjA1ODM4MTExMX0.h6wT_HPziCAwPhpOa2hs0MQF9ND76wpCleU-yjLyxSA");(0,r.useEffect)(()=>{(async()=>{l(!0);try{let{data:{session:e}}=await o.auth.getSession();if(!e)return;let t=o.from("tax_records").select("*").eq("user_id",e.user.id).eq("tax_type","Direct").order("date_of_payment",{ascending:!1});c&&(t=t.eq("status",c));let{data:a,error:r}=await t;if(r)throw r;s(a||[])}catch(e){console.error("Error fetching direct tax records:",e)}finally{l(!1)}})()},[c]);let m=e.reduce((e,s)=>e+Number(s.amount),0),h=e.reduce((e,s)=>"Paid"===s.status?e+Number(s.amount):e,0);return(0,a.jsxs)("div",{className:"animate-fade-in",children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"Direct Tax Management"}),(0,a.jsx)("p",{className:"text-gray-600 mt-1",children:"Manage your income tax, property tax, and other direct taxes"})]}),(0,a.jsx)(n.default,{defaultTaxType:"Direct"})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5 mb-6",children:[(0,a.jsx)("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 rounded-full bg-indigo-100 mr-4",children:(0,a.jsx)(i.orK,{className:"h-6 w-6 text-indigo-600"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-500",children:"Total Direct Tax"}),(0,a.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",m.toFixed(2)]})]})]})}),(0,a.jsx)("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 rounded-full bg-green-100 mr-4",children:(0,a.jsx)(i.orK,{className:"h-6 w-6 text-green-600"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-500",children:"Paid Amount"}),(0,a.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",h.toFixed(2)]})]})]})}),(0,a.jsx)("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"p-3 rounded-full bg-amber-100 mr-4",children:(0,a.jsx)(i.orK,{className:"h-6 w-6 text-amber-600"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-sm font-medium text-gray-500",children:"Pending Amount"}),(0,a.jsxs)("h3",{className:"text-xl font-bold text-gray-900",children:["₹",(m-h).toFixed(2)]})]})]})})]}),(0,a.jsxs)("div",{className:"dashboard-card bg-white overflow-hidden rounded-lg shadow-sm mb-6",children:[(0,a.jsx)("div",{className:"px-6 py-5 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900",children:"Direct Tax Records"}),(0,a.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsxs)("select",{className:"appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",value:c||"",onChange:e=>x(e.target.value||null),children:[(0,a.jsx)("option",{value:"",children:"All Status"}),(0,a.jsx)("option",{value:"Paid",children:"Paid"}),(0,a.jsx)("option",{value:"Pending",children:"Pending"}),(0,a.jsx)("option",{value:"Overdue",children:"Overdue"})]}),(0,a.jsx)("div",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500",children:(0,a.jsx)(i.Ihx,{className:"h-4 w-4"})})]}),(0,a.jsxs)("button",{className:"inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:[(0,a.jsx)(i._hL,{className:"mr-2 h-4 w-4"})," Export"]})]})]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,a.jsx)("thead",{className:"bg-gray-50",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Tax Name"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Amount"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Date of Payment"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),(0,a.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Notes"})]})}),(0,a.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:t?(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:5,className:"px-6 py-4 text-center text-sm text-gray-500",children:"Loading tax records..."})}):0===e.length?(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:5,className:"px-6 py-4 text-center text-sm text-gray-500",children:"No direct tax records found. Add your first record with the button above."})}):e.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm font-medium text-gray-900",children:e.tax_name})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsxs)("div",{className:"text-sm text-gray-900",children:["₹",Number(e.amount).toFixed(2)]})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("div",{className:"text-sm text-gray-900",children:new Date(e.date_of_payment).toLocaleDateString()})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,a.jsx)("span",{className:"inline-flex px-2 py-1 text-xs font-semibold rounded-full \n                        ".concat("Paid"===e.status?"bg-green-100 text-green-800":"Overdue"===e.status?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"),children:e.status})}),(0,a.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:e.notes||"-"})]},e.id))})]})})]}),(0,a.jsxs)("div",{className:"dashboard-card bg-white p-6 rounded-lg shadow-sm",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Direct Tax Information"}),(0,a.jsxs)("div",{className:"prose prose-sm text-gray-700",children:[(0,a.jsx)("p",{children:"Direct taxes are taxes levied directly on individuals and organizations. They include:"}),(0,a.jsxs)("ul",{children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Income Tax:"})," Tax on personal income"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Corporate Tax:"})," Tax on company profits"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Property Tax:"})," Tax on property ownership"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Capital Gains Tax:"})," Tax on profit from selling assets"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Wealth Tax:"})," Tax on net worth"]})]}),(0,a.jsx)("p",{children:"Direct taxes are an important source of revenue for the government and are typically progressive in nature."})]})]})]})}}},function(e){e.O(0,[956,807,884,135,971,69,744],function(){return e(e.s=8453)}),_N_E=e.O()}]);