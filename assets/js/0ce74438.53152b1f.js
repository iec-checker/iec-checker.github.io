"use strict";(self.webpackChunkiec_checker_site=self.webpackChunkiec_checker_site||[]).push([["8406"],{7810(e,n,s){s.d(n,{A:()=>i});var t=s(3941),a=s(1022);function i(){let{prism:e}=(0,a.p)(),{colorMode:n}=(0,t.G)(),s=e.theme,i=e.darkTheme||s;return"dark"===n?i:s}},3238(e,n,s){s.r(n),s.d(n,{default:()=>R});var t=s(4848),a=s(6540),i=s(1085),r=s(3572),l=s(1765),o=s(7810);let c="panelHeader_licZ",d="diagnosticLocation_gisA",u="locationLink_xeoB",h="infoWrapper_Sy3U",p="infoButton_LvAq",m="infoBackdrop_dToS",f="infoPopup_sxOd";var N=JSON.parse('{"detectors":{"disabled":[],"enabled":[]},"thresholds":{"mccabe_complexity":15,"statements_count":25,"max_string_length":4096},"output":{"format":"plain","color":true},"input":{"format":"st","merge":false,"exclude_paths":[]},"analysis":{"dump":false,"verbose":false},"naming_conventions":{"type_prefixes":{},"case":{"variable":null,"constant":null,"pou":null,"type":null},"min_length":0,"max_length":0,"udt_prefixes":{}}}');let g="u">typeof window&&"localhost"===window.location.hostname?"http://localhost:8080":"https://iec-checker.nowarp.io",x=JSON.stringify(N,null,2),_={"":"","Float equality (CP8)":`PROGRAM main
VAR
  x : REAL := 1.0;
  y : REAL := 1.0;
END_VAR
  IF x = y THEN
    x := x + 0.1;
  END_IF;
END_PROGRAM
`,"Uninitialized variable (CP3)":`FUNCTION_BLOCK FB_Example
VAR
  counter : INT;
  result  : INT;
END_VAR
  result := counter + 1;
END_FUNCTION_BLOCK
`,"Missing ELSE (L17)":`PROGRAM main
VAR
  mode : INT := 0;
  output : BOOL;
END_VAR
  IF mode = 1 THEN
    output := TRUE;
  END_IF;
END_PROGRAM
`,"Duty pump selection":`FUNCTION_BLOCK FB_DutyPump
VAR_INPUT
  abAvailable : ARRAY[1..4] OF BOOL := [4(TRUE)];
  fPressure   : REAL := 0.0;
END_VAR
VAR_OUTPUT
  abRun   : ARRAY[1..4] OF BOOL := [4(FALSE)];
  nDuty   : INT := 1;
  bDryRun : BOOL := FALSE;
END_VAR
VAR
  i      : INT := 1;
  tonRun : TON;
END_VAR
FOR i := 1 TO 4 DO
  IF abAvailable[i] THEN
    EXIT;
  END_IF;
END_FOR;
nDuty := i;
abRun[nDuty] := NOT bDryRun;
tonRun(IN := abRun[nDuty], PT := T#60S);
IF tonRun.ET = T#5S AND fPressure < 1.5 THEN
  bDryRun := TRUE;
END_IF;
END_FUNCTION_BLOCK
`,"Analog input scaling":`FUNCTION_BLOCK FB_AnalogIn
VAR_INPUT
  iRaw      : INT := 0;
  fDeadband : REAL := 0.5;
END_VAR
VAR_OUTPUT
  fValue  : REAL := 0.0;
  bReport : BOOL := FALSE;
END_VAR
VAR
  fRaw      : REAL := 0.0;
  fReported : REAL := 0.0;
END_VAR
(* 4..20 mA = 5530..27648 counts -> 0..100 % *)
fRaw := iRaw;
fValue := (fRaw - 5530.0) * 100.0 / 22118.0;
bReport := fValue <> fReported;
IF bReport THEN
  fReported := fValue;
END_IF;
END_FUNCTION_BLOCK
`,"Lift I/O mapping":`PROGRAM PRG_IoMap
VAR
  diEStopOk    AT %IX0.0 : BOOL;
  aiLiftPos    AT %IW64  : INT;
  diEncoderCnt AT %ID66  : DINT;
  wVfdStatus   AT %IW68  : WORD;
  doBrakeRel   AT %QX0.0 : BOOL;
END_VAR
VAR_EXTERNAL
  gstIn  : ST_LiftInputs;
  gstOut : ST_LiftOutputs;
END_VAR
gstIn.fPosMm    := INT_TO_REAL(aiLiftPos) / 10.0;
gstIn.nEncoder  := diEncoderCnt;
gstIn.bVfdFault := wVfdStatus.3;
doBrakeRel := gstOut.bBrakeRelease AND diEStopOk;
%QX0.5 := gstOut.bWarningLamp;
END_PROGRAM
`},j=new Set(["OutOfBounds","UnusedVariable","UncalledInstance","PLCOPEN-CP1","PLCOPEN-CP2","PLCOPEN-CP3","PLCOPEN-CP4","PLCOPEN-CP6","PLCOPEN-CP8","PLCOPEN-CP9","PLCOPEN-CP13","PLCOPEN-CP17","PLCOPEN-CP20","PLCOPEN-CP25","PLCOPEN-CP28","PLCOPEN-L10","PLCOPEN-L17","PLCOPEN-N3"]);function E({code:e}){let n=(0,o.A)();return(0,t.jsx)(l.f4,{code:e,language:"iecst",theme:n,children:({tokens:e,getTokenProps:s})=>(0,t.jsxs)("pre",{className:"editorHighlight_jTtJ",style:{color:n.plain.color},"aria-hidden":"true",children:[e.map((e,n)=>(0,t.jsxs)(a.Fragment,{children:[n>0&&"\n",e.map((e,n)=>e.empty?null:(0,t.jsx)("span",{...s({token:e})},n))]},n))," "]})})}function R(){let e,n,s,[l,o]=(0,a.useState)(""),[N,R]=(0,a.useState)(null),[b,C]=(0,a.useState)(null),[P,O]=(0,a.useState)(!1),[T,k]=(0,a.useState)(()=>!("u"<typeof document)&&!document.cookie.split("; ").some(e=>"playground_info_seen=1"===e)),[y,L]=(0,a.useState)(!1),[v,A]=(0,a.useState)(!1),[I,S]=(0,a.useState)(null),D=(0,a.useRef)(null),w=(0,a.useRef)(null),F=(0,a.useMemo)(()=>l?l.split("\n").length:1,[l]),V=(0,a.useMemo)(()=>Array.from({length:F},(e,n)=>n+1).join("\n"),[F]),B=(0,a.useCallback)(e=>{let n=D.current,s=w.current;if(!n||!s)return;let t=l.split("\n");if(e<1||e>t.length)return;let a=0;for(let n=0;n<e-1;n++)a+=t[n].length+1;let i=a+t[e-1].length;n.focus({preventScroll:!0}),n.setSelectionRange(a,i);let r=window.getComputedStyle(n),o=parseFloat(r.lineHeight)||1.5*parseFloat(r.fontSize)||18;s.scrollTop=Math.max(0,parseFloat(r.paddingTop)+(e-1)*o-s.clientHeight/2+o/2),s.scrollLeft=0},[l]),U=(0,a.useCallback)((e,n)=>!!Number.isFinite(e)&&!!Number.isFinite(n)&&!(e<1)&&!(n<1)&&e<=(l?l.split("\n").length:0),[l]),H=(0,a.useCallback)(e=>{let n,s=/(?<![\w.])(\d+):(\d+)(?![\w.])/g,a=[],i=0,r=0;for(;null!==(n=s.exec(e));){let s=parseInt(n[1],10);U(s,parseInt(n[2],10))&&(n.index>i&&a.push(e.slice(i,n.index)),a.push((0,t.jsx)("button",{type:"button",className:u,onClick:()=>B(s),title:`Jump to line ${s}`,children:n[0]},`loc-${r++}`)),i=n.index+n[0].length)}return i<e.length&&a.push(e.slice(i)),a.length>0?a:e},[B,U]),$=(0,a.useCallback)(()=>{"u">typeof navigator&&navigator.clipboard&&navigator.clipboard.writeText(x).then(()=>{A(!0),setTimeout(()=>A(!1),1500)})},[]);(0,a.useEffect)(()=>{fetch(`${g}/api/version`).then(e=>e.ok?e.json():null).then(e=>e&&S(e)).catch(()=>{})},[]);let M=(0,a.useCallback)(async()=>{if(l.trim()){O(!0),C(null),R(null);try{let e=await fetch(`${g}/api/check`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:l})});if(!e.ok){let n=await e.text();throw Error(`Server returned ${e.status}: ${n}`)}let n=await e.json();R(n)}catch(e){C(e instanceof Error?e.message:String(e))}finally{O(!1)}}},[l]),W=(0,a.useCallback)(e=>{if((e.ctrlKey||e.metaKey)&&"Enter"===e.key){e.preventDefault(),M();return}if("Tab"===e.key){e.preventDefault();let n=e.currentTarget,s=n.selectionStart,t=n.selectionEnd;o(l.substring(0,s)+"  "+l.substring(t)),requestAnimationFrame(()=>{n.selectionStart=n.selectionEnd=s+2})}},[l,M]),K=(0,a.useCallback)(e=>{let n=_[e.target.value];n&&(o(n),R(null),C(null))},[]);return(0,t.jsxs)(i.A,{description:"Try iec-checker online",noFooter:!0,children:[(0,t.jsx)(r.A,{children:(0,t.jsx)("title",{children:"Try Online \u2014 iec-checker"})}),(0,t.jsxs)("div",{className:"playgroundContainer_V_u3",children:[(0,t.jsxs)("div",{className:"toolbar_O020",children:[(0,t.jsxs)("div",{className:"toolbarLeft_kPRx",children:[(0,t.jsx)("button",{className:"runButton_utke",onClick:M,disabled:P||!l.trim(),children:P?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("i",{className:"fa-solid fa-spinner fa-spin","aria-hidden":"true"}),"Running\u2026"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("i",{className:"fa-solid fa-play","aria-hidden":"true"}),"Run"]})}),(0,t.jsxs)("select",{className:"exampleSelect_zCyJ",onChange:K,defaultValue:"",children:[(0,t.jsx)("option",{value:"",disabled:!0,children:"Load example\u2026"}),Object.keys(_).filter(Boolean).map(e=>(0,t.jsx)("option",{value:e,children:e},e))]})]}),(0,t.jsxs)("div",{className:"toolbarRight_Www2",children:[I&&(0,t.jsxs)("span",{className:"versionLabel_yNcP",children:["v",I.version," (",(0,t.jsx)("a",{href:`https://github.com/iec-checker/iec-checker/commit/${I.commit}`,target:"_blank",rel:"noopener noreferrer",children:I.commit_short}),", ",I.commit_date.split(" ")[0],")"]}),(0,t.jsx)("kbd",{children:"Ctrl"}),"+",(0,t.jsx)("kbd",{children:"Enter"})," to run",(0,t.jsxs)("div",{className:h,children:[(0,t.jsx)("button",{className:p,onClick:()=>L(e=>!e),"aria-label":"Default config",title:"Default config",children:(0,t.jsx)("i",{className:"fa-solid fa-gear","aria-hidden":"true"})}),y&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:m,onClick:()=>L(!1)}),(0,t.jsxs)("div",{className:`${f} configPopup_Rg_p`,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"configHeader_Aaiw",children:[(0,t.jsx)("strong",{children:"Default configuration"}),(0,t.jsxs)("button",{className:"configCopyButton_CUNH",onClick:$,"aria-label":"Copy config",children:[(0,t.jsx)("i",{className:`fa-solid ${v?"fa-check":"fa-copy"}`,"aria-hidden":"true"}),v?"Copied":"Copy"]})]}),(0,t.jsxs)("p",{className:"configHint_PWgr",children:["The playground runs ",(0,t.jsx)("code",{children:"iec_checker"})," with this effective config. Generate a local copy via"," ",(0,t.jsx)("code",{children:"iec_checker --generate-config"}),"."]}),(0,t.jsx)("pre",{className:"configPre_gMBZ",children:x})]})]})]}),(0,t.jsxs)("div",{className:h,children:[(0,t.jsx)("button",{className:p,onClick:()=>k(e=>!e),"aria-label":"Info",children:"?"}),T&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:m,onClick:()=>{k(!1),document.cookie="playground_info_seen=1; path=/; SameSite=Lax"}}),(0,t.jsx)("div",{className:f,onClick:e=>e.stopPropagation(),children:(0,t.jsxs)("ul",{className:"infoList_IMJl",children:[(0,t.jsxs)("li",{children:["This is a ",(0,t.jsx)("strong",{children:"demonstration site"})," for reference only and cannot be used for code verification."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"DO NOT"})," upload safety-critical components! The input code is saved on the server during analysis. The server's security is not audited and will never be."]}),(0,t.jsxs)("li",{children:["If you find any issues, please report them at"," ",(0,t.jsx)("a",{href:"https://github.com/iec-checker/iec-checker/issues",target:"_blank",rel:"noopener noreferrer",children:"GitHub Issues"}),"."]})]})})]})]})]})]}),(0,t.jsxs)("div",{className:"panels_qxEI",children:[(0,t.jsxs)("div",{className:"editorPanel_a0mE",children:[(0,t.jsx)("div",{className:c,children:"Structured Text"}),(0,t.jsx)("div",{ref:w,className:"editorWrap_ZoKW",children:(0,t.jsxs)("div",{className:"editorInner_LHWC",children:[(0,t.jsx)("div",{className:"lineNumbers_wMOp","aria-hidden":"true",children:V}),(0,t.jsxs)("div",{className:"editorCode_tHT0",children:[(0,t.jsx)(E,{code:l}),(0,t.jsx)("textarea",{ref:D,className:"editorTextarea_pVij",value:l,onChange:e=>o(e.target.value),onKeyDown:W,placeholder:"Paste your IEC 61131-3 Structured Text program here\u2026",spellCheck:!1,autoCapitalize:"off",autoCorrect:"off",wrap:"off",rows:1})]})]})})]}),(0,t.jsxs)("div",{className:"resultsPanel_xs2A",children:[(0,t.jsx)("div",{className:c,children:"Diagnostics"}),(0,t.jsxs)("div",{className:"resultsBody_IUnM",children:[b&&(0,t.jsxs)("div",{className:"errorBanner_hn0q",children:[b,(0,t.jsx)("br",{}),"If this issue persists, please reach out to"," ",(0,t.jsx)("a",{href:"mailto:jubnzv@gmail.com",children:"jubnzv@gmail.com"}),"."]}),!N&&!b&&(0,t.jsxs)("div",{className:"emptyState_VQ_H",children:[(0,t.jsx)("div",{className:"emptyStateIcon_S58I",children:(0,t.jsx)("i",{className:"fa-solid fa-terminal","aria-hidden":"true"})}),(0,t.jsx)("span",{children:"Write or paste a program, then hit Run."})]}),N&&0===N.length&&(0,t.jsxs)("div",{className:"successBanner_mKBw",children:[(0,t.jsx)("i",{className:"fa-solid fa-circle-check","aria-hidden":"true"}),"No issues found. Your code looks clean."]}),N&&N.length>0&&(n=(e=N.some(e=>"ParserError"===e.id||"LexingError"===e.id))&&N.every(e=>"ParserError"===e.id||"LexingError"===e.id||"Hint"===e.id),s=N.some(e=>"Hint"===e.id&&!1===e.report),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("ul",{className:"diagnosticList_SXxa",children:N.map((e,n)=>{var s;let a=(s=e.id,j.has(s)?`/docs/detectors/${s}`:null),i="ParserError"===e.id||"LexingError"===e.id,r="Hint"===e.id,l=e.msg||(i?"Syntax error":"Unknown issue"),o=i?"diagnosticError_ZHti":r?"diagnosticHint_MUp5":"";return(0,t.jsxs)("li",{className:`diagnosticItem_JAGj ${o}`,children:[U(e.linenr,e.column)?(0,t.jsxs)("button",{type:"button",className:`${d} ${u}`,onClick:()=>B(e.linenr),title:`Jump to line ${e.linenr}`,children:[e.linenr,":",e.column]}):(0,t.jsxs)("span",{className:d,children:[e.linenr,":",e.column]}),(0,t.jsxs)("span",{className:i?"diagnosticIdError_NXew":r?"diagnosticIdHint_htLY":"diagnosticId_R86S",children:[r&&(0,t.jsx)("i",{className:"fa-solid fa-lightbulb","aria-hidden":"true"})," ",a?(0,t.jsx)("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:"diagnosticIdLink_Q8vW",children:e.id}):e.id]}),(0,t.jsx)("span",{className:"diagnosticMsg_WyuK",children:H(l)})]},n)})}),e&&!s&&(0,t.jsxs)("a",{className:"reportLink_N1WR",href:`https://github.com/iec-checker/iec-checker/issues/new?${new URLSearchParams({title:"Parser error from Try Online",labels:"bug",body:["### Environment\n\n- **PLC IDE**: \x3c!-- e.g. CODESYS 3.5 SP19, TIA Portal V18, Beckhoff TwinCAT 3.1 --\x3e","- **iec-checker version**: "+(I?`${I.version} (${I.commit_short}, ${I.commit_date.split(" ")[0]})`:"unknown"),"- **Platform**: Try Online\n\n### Source code\n\n```iecst",l.length>150?"\x3c!-- please paste the program here --\x3e":l,"```\n\n### Current behavior\n\n```",N.filter(e=>"ParserError"===e.id||"LexingError"===e.id).map(e=>`${e.linenr}:${e.column} ${e.id}: ${e.msg||"Syntax error"}`).join("\n"),"```\n\n### Expected behavior\n\n\x3c!-- What you expected to happen instead. --\x3e"].join("\n")}).toString()}`,target:"_blank",rel:"noopener noreferrer",children:[(0,t.jsx)("i",{className:"fa-solid fa-bug","aria-hidden":"true"})," ",n?"Using a vendor ST extension we don\u2019t know yet? Open an issue and help us add support.":"Looks like a bug? Report this issue"]})]}))]})]})]})]})]})}}}]);