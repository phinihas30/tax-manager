(()=>{var e={};e.id=455,e.ids=[455],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},1808:e=>{"use strict";e.exports=require("net")},5477:e=>{"use strict";e.exports=require("punycode")},2781:e=>{"use strict";e.exports=require("stream")},4404:e=>{"use strict";e.exports=require("tls")},7310:e=>{"use strict";e.exports=require("url")},9796:e=>{"use strict";e.exports=require("zlib")},3135:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>d.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>c,routeModule:()=>g,tree:()=>l});var a=r(482),s=r(9108),i=r(2563),d=r.n(i),n=r(8300),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);r.d(t,o);let l=["",{children:["dashboard",{children:["settings",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2849)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\settings\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,5030)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,2360)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\not-found.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,5560)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,1429)),"C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\not-found.tsx"]}],c=["C:\\Users\\phinn\\OneDrive\\Desktop\\appfinal\\app\\dashboard\\settings\\page.tsx"],m="/dashboard/settings/page",x={require:r,loadChunk:()=>Promise.resolve()},g=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/dashboard/settings/page",pathname:"/dashboard/settings",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},1257:(e,t,r)=>{Promise.resolve().then(r.bind(r,2151))},2151:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var a=r(5344),s=r(3729),i=r(637),d=r(2456),n=r(4444),o=r(8428);function l(){let[e,t]=(0,s.useState)(!0),[r,l]=(0,s.useState)(null),[c,m]=(0,s.useState)(null),[x,g]=(0,s.useState)(null),[u,h]=(0,s.useState)(!1),[f,y]=(0,s.useState)(!1),[p,b]=(0,s.useState)(!1),[k,j]=(0,s.useState)({name:"",email:"",language:"en",currency:"INR",notificationsEmail:!0,notificationsBrowser:!0,notificationFrequency:"immediately",theme:"light",dateFormat:"DD/MM/YYYY",taxYearStart:"april",taxYearEnd:"march",reminderAdvance:!0}),[v,N]=(0,s.useState)("profile"),[w,D]=(0,s.useState)(""),[C,P]=(0,s.useState)(""),F=(0,o.useRouter)(),S=(0,i.AY)("https://mxuczdeyrczekcyvcshp.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14dWN6ZGV5cmN6ZWtjeXZjc2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDUxMTEsImV4cCI6MjA1ODM4MTExMX0.h6wT_HPziCAwPhpOa2hs0MQF9ND76wpCleU-yjLyxSA");(0,s.useEffect)(()=>{(async()=>{t(!0);try{let{data:{user:e},error:t}=await S.auth.getUser();if(t){console.error("Error getting authenticated user:",t);return}e&&(l(e),e.user_metadata?.avatar_url&&g(e.user_metadata.avatar_url),j(t=>({...t,name:e.user_metadata?.full_name||"",email:e.email||""})))}catch(e){console.error("Error fetching user:",e)}finally{t(!1)}})()},[]);let Y=e=>{let{name:t,value:r,type:a}=e.target;if("checkbox"===a){let{checked:r}=e.target;j(e=>({...e,[t]:r}))}else j(e=>({...e,[t]:r}))},E=async e=>{e.preventDefault(),D("saving"),P("");try{let{error:e,data:t}=await S.auth.updateUser({data:{full_name:k.name,language:k.language,currency:k.currency,date_format:k.dateFormat,notifications_email:k.notificationsEmail,notifications_browser:k.notificationsBrowser}});if(e)throw e;if(t.user){l(t.user);let{data:e,error:r}=await S.auth.getUser();if(r)throw console.error("Error getting updated user:",r),r;e.user&&setTimeout(()=>{window.dispatchEvent(new CustomEvent("userProfileUpdated",{detail:{user:e.user,timestamp:new Date().toISOString()}})),console.log("Dispatched userProfileUpdated event from settings")},0)}D("success");let r=document.getElementById("notification-banner");r&&(r.innerText="Settings updated successfully!",r.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100",setTimeout(()=>{r.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"},3e3)),setTimeout(()=>{D("")},3e3)}catch(e){console.error("Error saving settings:",e),P(e.message||"Failed to save settings. Please try again."),D("")}},T=async()=>{try{let{error:e}=await S.auth.resetPasswordForEmail(k.email,{redirectTo:`${window.location.origin}/reset-password`});if(e)throw e;alert("Password reset email sent. Please check your inbox.")}catch(e){console.error("Error sending password reset:",e),alert("Failed to send password reset email. Please try again.")}},I=async()=>{if(c&&r){h(!0);try{let e=c.name.split(".").pop(),t=`avatar-${r.id}-${Date.now()}.${e}`,{error:a,data:s}=await S.storage.from("avatars").upload(t,c,{upsert:!0});if(a)throw a;let{data:{publicUrl:i}}=S.storage.from("avatars").getPublicUrl(t),{error:d,data:n}=await S.auth.updateUser({data:{avatar_url:i}});if(d)throw d;if(g(i),n.user){l(n.user);let{data:e}=await S.auth.getUser();e.user&&setTimeout(()=>{window.dispatchEvent(new CustomEvent("userProfileUpdated",{detail:{user:e.user,timestamp:new Date().toISOString()}})),console.log("Dispatched userProfileUpdated event from settings")},0)}let o=document.getElementById("notification-banner");o&&(o.innerText="Profile picture updated successfully!",o.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100",setTimeout(()=>{o.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"},3e3))}catch(e){console.error("Error uploading avatar:",e),alert("Error uploading avatar. Please try again.")}finally{h(!1),m(null)}}},q=e=>{let{name:t,checked:r}=e.target;j(e=>({...e,[t]:r}));let a="notificationsEmail"===t?"email":"browser";if(r){let e=document.getElementById("notification-banner");e&&(e.innerText=`${a.charAt(0).toUpperCase()+a.slice(1)} notifications ${r?"enabled":"disabled"}.`,e.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100",setTimeout(()=>{e.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"},3e3))}},M=e=>{let{value:t}=e.target;j(e=>({...e,notificationFrequency:t}))},U=async()=>{if(!r){alert("User not found. Please sign in again.");return}y(!0);try{console.log("Deleting profile for user:",r.id);let{error:e}=await S.from("profiles").delete().eq("id",r.id);if(e)throw console.error("Error deleting profile:",e),e;console.log("Profile deleted successfully"),b(!1);let{data:{user:t},error:a}=await S.auth.getUser();if(a)console.error("Error getting current user:",a);else if(t){l(t);try{setTimeout(()=>{window.dispatchEvent(new CustomEvent("userProfileUpdated",{detail:{user:t,profileDeleted:!0,timestamp:new Date().toISOString()}})),console.log("Dispatched profile deletion event from settings")},0)}catch(e){console.error("Failed to dispatch profile deletion event:",e)}}let s=document.getElementById("notification-banner");s&&(s.innerText="Profile data deleted successfully. Your account is still active.",s.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100",setTimeout(()=>{s.className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"},3e3)),setTimeout(()=>{F.push("/dashboard")},1500)}catch(e){console.error("Error during profile deletion:",e),alert("Failed to delete profile. Please try again.")}finally{y(!1)}};return e?a.jsx("div",{className:"flex justify-center items-center min-h-[60vh]",children:a.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"})}):(0,a.jsxs)("div",{className:"animate-fade-in",children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-dark-text",children:"Settings"}),a.jsx("p",{className:"text-gray-600 dark:text-gray-400 mt-1",children:"Manage your account settings and preferences"})]}),a.jsx("div",{className:"bg-white dark:bg-dark-card rounded-lg shadow dark:shadow-gray-800",children:(0,a.jsxs)("div",{className:"md:grid md:grid-cols-12",children:[a.jsx("div",{className:"md:col-span-3 border-r border-gray-200 dark:border-dark-border",children:a.jsx("nav",{className:"p-4",children:(0,a.jsxs)("ul",{className:"space-y-1",children:[a.jsx("li",{children:(0,a.jsxs)("button",{onClick:()=>N("profile"),className:`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${"profile"===v?"bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,children:[a.jsx(d.fzv,{className:"mr-3 h-4 w-4"}),"Profile Settings"]})}),a.jsx("li",{children:(0,a.jsxs)("button",{onClick:()=>N("account"),className:`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${"account"===v?"bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,children:[a.jsx(d.bfl,{className:"mr-3 h-4 w-4"}),"Account Security"]})}),a.jsx("li",{children:(0,a.jsxs)("button",{onClick:()=>N("preferences"),className:`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${"preferences"===v?"bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,children:[a.jsx(d.RsK,{className:"mr-3 h-4 w-4"}),"Preferences"]})}),a.jsx("li",{children:(0,a.jsxs)("button",{onClick:()=>N("notifications"),className:`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${"notifications"===v?"bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,children:[a.jsx(d.vWP,{className:"mr-3 h-4 w-4"}),"Notifications"]})}),a.jsx("li",{children:(0,a.jsxs)("button",{onClick:()=>N("tax"),className:`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${"tax"===v?"bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400":"text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`,children:[a.jsx(d.NOg,{className:"mr-3 h-4 w-4"}),"Tax Settings"]})})]})})}),a.jsx("div",{className:"md:col-span-9 p-6",children:(0,a.jsxs)("form",{onSubmit:E,children:["profile"===v&&(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-dark-text mb-4",children:"Profile Information"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Full Name"}),a.jsx("input",{type:"text",name:"name",id:"name",value:k.name,onChange:Y,className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Email Address"}),a.jsx("input",{type:"email",name:"email",id:"email",value:k.email,onChange:Y,className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",disabled:!0}),a.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:"To change your email address, please contact support."})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Profile Picture"}),(0,a.jsxs)("div",{className:"mt-2 flex items-center",children:[a.jsx("div",{className:"h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 overflow-hidden",children:x?a.jsx("img",{src:x,alt:"Profile",className:"h-12 w-12 object-cover"}):a.jsx(d.fzv,{className:"h-6 w-6"})}),(0,a.jsxs)("label",{htmlFor:"avatar-upload",className:"ml-4 bg-white dark:bg-dark-card py-2 px-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none cursor-pointer",children:["Choose Photo",a.jsx("input",{id:"avatar-upload",name:"avatar",type:"file",accept:"image/*",className:"sr-only",onChange:e=>{if(e.target.files&&e.target.files.length>0){let t=e.target.files[0];if(t.size>2097152){alert("File size must be less than 2MB");return}m(t),g(URL.createObjectURL(t))}}})]}),c&&a.jsx("button",{type:"button",onClick:I,disabled:u,className:"ml-2 bg-indigo-600 dark:bg-indigo-700 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none",children:u?"Uploading...":"Upload"})]}),a.jsx("p",{className:"mt-1 text-xs text-gray-500 dark:text-gray-400",children:"JPG, PNG or GIF. Maximum size 2MB."})]})]})]}),"account"===v&&(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-dark-text mb-4",children:"Account Security"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Password"}),a.jsx("button",{type:"button",onClick:T,className:"text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300",children:"Reset Password"})]}),(0,a.jsxs)("div",{className:"mt-1 relative rounded-md shadow-sm",children:[a.jsx("input",{type:"password",value:"••••••••••••",disabled:!0,className:"block w-full pr-10 border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}),a.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",children:a.jsx(d.UIZ,{className:"h-5 w-5 text-gray-400 dark:text-gray-500"})})]}),a.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:'For security reasons, we don\'t display your password. Click "Reset Password" to create a new one.'})]}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"Two-Factor Authentication"}),a.jsx("div",{className:"mt-2 flex items-center",children:a.jsx("button",{type:"button",className:"bg-white dark:bg-dark-card py-2 px-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-bg",children:"Enable 2FA"})}),a.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:"Add an extra layer of security to your account."})]}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"Sessions"}),a.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:"You're currently signed in on this device."}),a.jsx("button",{type:"button",className:"mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300",children:"Sign out of all sessions"})]}),(0,a.jsxs)("div",{className:"pt-4 border-t border-gray-200 dark:border-dark-border",children:[a.jsx("h3",{className:"text-sm font-medium text-red-600 dark:text-red-400",children:"Delete Profile Data"}),a.jsx("p",{className:"mt-1 text-sm text-gray-500 dark:text-gray-400",children:"Delete your profile information from our system. Your account will remain active, but your profile data will be removed."}),a.jsx("button",{type:"button",onClick:()=>b(!0),className:"mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"Delete Profile Data"})]})]})]}),"preferences"===v&&(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-dark-text mb-4",children:"Preferences"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"mb-6",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Theme"}),a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-3",children:"Choose between light and dark theme"}),a.jsx(n.d,{})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"language",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Language"}),(0,a.jsxs)("select",{id:"language",name:"language",value:k.language,onChange:Y,className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",children:[a.jsx("option",{value:"en",children:"English"}),a.jsx("option",{value:"hi",children:"Hindi"}),a.jsx("option",{value:"kn",children:"Kannada"}),a.jsx("option",{value:"te",children:"Telugu"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"currency",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Currency"}),(0,a.jsxs)("select",{id:"currency",name:"currency",value:k.currency,onChange:Y,className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",children:[a.jsx("option",{value:"INR",children:"Indian Rupee (₹)"}),a.jsx("option",{value:"USD",children:"US Dollar ($)"})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"dateFormat",className:"block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Date Format"}),(0,a.jsxs)("select",{id:"dateFormat",name:"dateFormat",value:k.dateFormat,onChange:Y,className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",children:[a.jsx("option",{value:"DD/MM/YYYY",children:"DD/MM/YYYY"}),a.jsx("option",{value:"MM/DD/YYYY",children:"MM/DD/YYYY"}),a.jsx("option",{value:"YYYY-MM-DD",children:"YYYY-MM-DD"})]})]})]})]}),"notifications"===v&&(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-dark-text mb-4",children:"Notification Settings"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"notificationsEmail",name:"notificationsEmail",type:"checkbox",checked:k.notificationsEmail,onChange:q,className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"notificationsEmail",className:"font-medium text-gray-700 dark:text-gray-300",children:"Email Notifications"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Receive email notifications for tax payment due dates and updates."})]})]}),(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"notificationsBrowser",name:"notificationsBrowser",type:"checkbox",checked:k.notificationsBrowser,onChange:q,className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"notificationsBrowser",className:"font-medium text-gray-700 dark:text-gray-300",children:"Browser Notifications"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Receive browser notifications when you're using the app."})]})]}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Notification Frequency"}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("input",{id:"freq-immediately",name:"notificationFrequency",type:"radio",className:"h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500",defaultChecked:!0,value:"immediately",onChange:M}),a.jsx("label",{htmlFor:"freq-immediately",className:"ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Immediately"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("input",{id:"freq-daily",name:"notificationFrequency",type:"radio",className:"h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500",value:"daily",onChange:M}),a.jsx("label",{htmlFor:"freq-daily",className:"ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Daily digest"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx("input",{id:"freq-weekly",name:"notificationFrequency",type:"radio",className:"h-4 w-4 border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500",value:"weekly",onChange:M}),a.jsx("label",{htmlFor:"freq-weekly",className:"ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300",children:"Weekly digest"})]})]})]}),(0,a.jsxs)("div",{className:"mt-6 border-t border-gray-200 dark:border-dark-border pt-6",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-4",children:"Notification Types"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400 text-sm mb-4",children:"Control which types of notifications you want to receive."}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"notifyTaxDue",name:"notifyTaxDue",type:"checkbox",defaultChecked:!0,className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"notifyTaxDue",className:"font-medium text-gray-700 dark:text-gray-300",children:"Tax Due Date Reminders"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Get notified before your tax payments are due."})]})]}),(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"notifyStatusChanges",name:"notifyStatusChanges",type:"checkbox",defaultChecked:!0,className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"notifyStatusChanges",className:"font-medium text-gray-700 dark:text-gray-300",children:"Status Changes"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Get notified when tax payment statuses change."})]})]}),(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"notifyReports",name:"notifyReports",type:"checkbox",defaultChecked:!0,className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500"})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"notifyReports",className:"font-medium text-gray-700 dark:text-gray-300",children:"Monthly Reports"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Receive monthly tax summary reports."})]})]})]})]}),(0,a.jsxs)("div",{className:"mt-6 border-t border-gray-200 dark:border-dark-border pt-6",children:[a.jsx("h3",{className:"text-sm font-medium text-gray-700 dark:text-gray-300 mb-4",children:"Test Notifications"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400 text-sm mb-4",children:"Send a test notification to verify your settings are working correctly."}),(0,a.jsxs)("button",{type:"button",onClick:()=>{if(!k.notificationsEmail&&!k.notificationsBrowser){alert("Please enable at least one notification method first.");return}let e=document.getElementById("notification-banner");e&&(e.innerText="\uD83D\uDD14 This is a test notification. Your notification settings are working!",e.className="fixed bottom-4 right-4 bg-indigo-50 text-indigo-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-100",setTimeout(()=>{e.className="fixed bottom-4 right-4 bg-indigo-50 text-indigo-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"},5e3))},className:"inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-dark-bg",children:[a.jsx(d.vWP,{className:"mr-2 h-4 w-4"}),"Send Test Notification"]})]})]})]}),"tax"===v&&(0,a.jsxs)("div",{children:[a.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-dark-text mb-4",children:"Tax Settings"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Indian Tax Categories"}),(0,a.jsxs)("div",{className:"bg-gray-50 dark:bg-gray-800 p-4 rounded-md",children:[a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-2",children:"Common tax categories in India. These are used throughout the app."}),(0,a.jsxs)("ul",{className:"space-y-1",children:[(0,a.jsxs)("li",{className:"text-sm flex items-center justify-between",children:[a.jsx("span",{className:"dark:text-dark-text",children:"Income Tax"}),a.jsx("span",{className:"text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full",children:"Direct"})]}),(0,a.jsxs)("li",{className:"text-sm flex items-center justify-between",children:[a.jsx("span",{className:"dark:text-dark-text",children:"GST"}),a.jsx("span",{className:"text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full",children:"Indirect"})]}),(0,a.jsxs)("li",{className:"text-sm flex items-center justify-between",children:[a.jsx("span",{className:"dark:text-dark-text",children:"Property Tax"}),a.jsx("span",{className:"text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full",children:"Direct"})]}),(0,a.jsxs)("li",{className:"text-sm flex items-center justify-between",children:[a.jsx("span",{className:"dark:text-dark-text",children:"Professional Tax"}),a.jsx("span",{className:"text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full",children:"Direct"})]}),(0,a.jsxs)("li",{className:"text-sm flex items-center justify-between",children:[a.jsx("span",{className:"dark:text-dark-text",children:"Customs Duty"}),a.jsx("span",{className:"text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full",children:"Indirect"})]})]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Financial Year Settings"}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"taxYearStart",className:"block text-xs text-gray-500 dark:text-gray-400",children:"Financial Year Start"}),a.jsx("select",{id:"taxYearStart",name:"taxYearStart",className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",defaultValue:"april",children:a.jsx("option",{value:"april",children:"April (Indian FY)"})})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"taxYearEnd",className:"block text-xs text-gray-500 dark:text-gray-400",children:"Financial Year End"}),a.jsx("select",{id:"taxYearEnd",name:"taxYearEnd",className:"mt-1 block w-full rounded-md border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-dark-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",defaultValue:"march",disabled:!0,children:a.jsx("option",{value:"march",children:"March"})})]})]}),a.jsx("p",{className:"mt-2 text-xs text-gray-500 dark:text-gray-400",children:"Indian financial year runs from April 1 to March 31"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Payment Reminders"}),(0,a.jsxs)("div",{className:"flex items-start",children:[a.jsx("div",{className:"flex items-center h-5",children:a.jsx("input",{id:"reminderAdvance",name:"reminderAdvance",type:"checkbox",className:"h-4 w-4 rounded border-gray-300 dark:border-dark-border text-indigo-600 focus:ring-indigo-500",defaultChecked:!0})}),(0,a.jsxs)("div",{className:"ml-3 text-sm",children:[a.jsx("label",{htmlFor:"reminderAdvance",className:"font-medium text-gray-700 dark:text-gray-300",children:"Advance Reminders"}),a.jsx("p",{className:"text-gray-500 dark:text-gray-400",children:"Get notifications 7 days before tax due dates"})]})]})]})]})]}),(0,a.jsxs)("div",{className:"mt-8",children:[C&&a.jsx("div",{className:"mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm",children:a.jsx("p",{children:C})}),a.jsx("div",{className:"flex justify-end",children:a.jsx("button",{type:"submit",className:`btn-gradient inline-flex items-center px-4 py-2 border-0 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${"saving"===w?"opacity-70 cursor-not-allowed":""}`,disabled:"saving"===w,children:"saving"===w?(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"}),"Saving..."]}):"success"===w?(0,a.jsxs)(a.Fragment,{children:[a.jsx("svg",{className:"h-4 w-4 mr-1.5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Saved"]}):(0,a.jsxs)(a.Fragment,{children:[a.jsx(d.mW3,{className:"mr-1.5 h-4 w-4"}),"Save Changes"]})})})]})]})})]})}),a.jsx("div",{id:"notification-banner",className:"fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 opacity-0"}),p&&a.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,a.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full",children:[a.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Delete Profile Data"}),a.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"Are you sure you want to delete your profile data? This action cannot be undone."}),(0,a.jsxs)("p",{className:"text-gray-600 dark:text-gray-300 mb-6 text-sm",children:[a.jsx("strong",{children:"Note:"})," This will only remove your profile information (name, phone, address, etc.). Your account will remain active and you can recreate your profile anytime."]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[a.jsx("button",{onClick:()=>b(!1),className:"px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:"Cancel"}),a.jsx("button",{onClick:U,disabled:f,className:"px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed",children:f?(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2 inline-block"}),"Deleting..."]}):"Delete Profile Data"})]})]})})]})}},2849:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>i,__esModule:()=>s,default:()=>d});let a=(0,r(6843).createProxy)(String.raw`C:\Users\phinn\OneDrive\Desktop\appfinal\app\dashboard\settings\page.tsx`),{__esModule:s,$$typeof:i}=a,d=a.default}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[844,320,898],()=>r(3135));module.exports=a})();