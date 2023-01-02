"use strict";var I=Object.create;var l=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var L=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty;var N=(n,e)=>{for(var t in e)l(n,t,{get:e[t],enumerable:!0})},B=(n,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of S(e))!O.call(n,r)&&r!==t&&l(n,r,{get:()=>e[r],enumerable:!(s=P(e,r))||s.enumerable});return n};var q=(n,e,t)=>(t=n!=null?I(L(n)):{},B(e||!n||!n.__esModule?l(t,"default",{value:n,enumerable:!0}):t,n)),w=n=>B(l({},"__esModule",{value:!0}),n);var W={};N(W,{PktCapture:()=>b,PktCaptureAll:()=>y,deviceList:()=>E,findDevice:()=>D});module.exports=w(W);var _=q(require("cap")),C=require("net"),v=require("tiny-typed-emitter");var a=require("stream");var d=class{buffer;position;out;constructor(){this.buffer=null,this.position=0,this.out=[]}write(e){for(;e.length>0;){if(this.buffer){if(this.buffer.length<2){let r=this.buffer[0],i=(e[0]<<8)+r;this.buffer=Buffer.alloc(i),this.buffer[0]=r,this.position=1}let s=Math.min(e.length,this.buffer.length-this.position);e.copy(this.buffer,this.position,0,s),this.position+=s,this.position===this.buffer.length&&(this.out.push(this.buffer),this.buffer=null,this.position=0),e=e.subarray(s);continue}if(e.length<2){this.buffer=Buffer.from(e),this.position=e.length;break}let t=e.readUInt16LE(0);if(t===0){this.buffer=null;return}if(t>e.length){this.buffer=Buffer.alloc(t),e.copy(this.buffer),this.position=e.length;break}this.out.push(e.subarray(0,t)),e=e.subarray(t)}}read(){return this.out.shift()}};var G=require("http");var p=class extends a.EventEmitter{sessions;listen_options;constructor(e){super(),this.sessions={},this.listen_options=e,a.EventEmitter.call(this)}track_packet(e,t,s){let r=t.info.srcaddr+":"+s.info.srcport,i=t.info.dstaddr+":"+s.info.dstport,f;r<i?f=r+"-"+i:f=i+"-"+r;let c=!1,o=this.sessions[f];o||(c=!0,o=new k(this.listen_options),this.sessions[f]=o,o.on("end",()=>{delete this.sessions[f],console.info(`[meter-core/tcp-tracker] - Remove session ${o?.src}->${o?.dst} (Total: ${Object.keys(this.sessions).length})`)})),o.track(e,t,s),c&&this.emit("session",o)}},k=class extends a.EventEmitter{state;src;dst;send_seqno;send_buffers;recv_seqno;recv_buffers;listen_options;is_ignored;packetBuffer;constructor(e){super(),this.listen_options=e,this.state="NONE",this.send_seqno=0,this.send_buffers=[],this.recv_seqno=0,this.recv_buffers=[],this.is_ignored=!1,this.packetBuffer=new d,a.EventEmitter.call(this)}track(e,t,s){let r=t.info.srcaddr+":"+s.info.srcport,i=t.info.dstaddr+":"+s.info.dstport;if(this.state==="NONE"){let f=g(t.info.srcaddr,this.listen_options),c=g(t.info.dstaddr,this.listen_options);f&&this.listen_options.port===s.info.dstport?(this.src=r,this.dst=i):this.listen_options.port===s.info.srcport&&c?(this.src=i,this.dst=r):!f&&!c?this.listen_options.port===s.info.dstport?(this.src=r,this.dst=i):this.listen_options.port===s.info.srcport?(this.src=i,this.dst=r):(this.src=r,this.dst=i,this.is_ignored=!0):(this.src=r,this.dst=i,this.is_ignored=!0),s.info.flags&2&&!(s.info.flags&16)?this.state="SYN_SENT":this.state="ESTAB"}else s.info.flags&4?this.emit("end",this):this[this.state](e,t,s)}SYN_SENT(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.dst&&s.info.flags&18?(this.send_seqno=s.info.ackno??0,this.state="SYN_RCVD"):s.info.flags&4&&(this.state="CLOSED")}SYN_RCVD(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.src&&s.info.flags&16&&(this.recv_seqno=s.info.ackno??0,this.state="ESTAB")}ESTAB(e,t,s){if(this.is_ignored)return;let r=t.info.srcaddr+":"+s.info.srcport,i=t.info.totallen-t.hdrlen-s.hdrlen,f=!1;try{f=A(e,t,s)}catch(c){console.error(c);return}r===this.src?(i>0&&this.send_buffers.push({seqno:s.info.seqno,payload:Buffer.from(e.subarray(s.offset,s.offset+i))}),s.info.ackno&&!f&&this.flush_buffers(s.info.ackno??0,"recv"),s.info.flags&1&&(this.state="FIN_WAIT")):r===this.dst?(i>0&&this.recv_buffers.push({seqno:s.info.seqno,payload:Buffer.from(e.subarray(s.offset,s.offset+i))}),s.info.ackno&&!f&&this.flush_buffers(s.info.ackno??0,"send"),s.info.flags&1&&(this.state="CLOSE_WAIT")):console.error("[meter-core/tcp_tracker] - non-matching packet in session: ip="+t+"tcp="+s)}FIN_WAIT(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.dst&&s.info.flags&1&&(this.state="CLOSING")}CLOSE_WAIT(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.src&&s.info.flags&1&&(this.state="LAST_ACK")}LAST_ACK(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.dst&&(this.state="CLOSED",this.emit("end",this))}CLOSING(e,t,s){t.info.srcaddr+":"+s.info.srcport===this.src&&(this.state="CLOSED",this.emit("end",this))}CLOSED(e,t,s){}flush_buffers(e,t){if(t==="recv"){this.recv_seqno===0&&(this.recv_seqno=e);let s=this.get_flush(this.recv_buffers,this.recv_seqno,e);if(this.recv_seqno=e,!s)return;this.packetBuffer.write(s);let r=this.packetBuffer.read();for(;r;)this.emit("payload_recv",r),r=this.packetBuffer.read()}else if(t==="send"){this.send_seqno===0&&(this.send_seqno=e);let s=this.get_flush(this.send_buffers,this.send_seqno,e);if(this.send_seqno=e,!s)return}}get_flush(e,t,s){let r=s-t;if(r<=0)return null;let i=Buffer.alloc(r),f=Buffer.alloc(r),c=e.filter(o=>{if(o.seqno>s)return!0;o.seqno<t&&(o.payload=o.payload.subarray(t-o.seqno),o.seqno=t);let u=o.seqno-t,h=s-o.seqno;return o.payload.copy(i,u,0,h),f.fill(1,u,u+h),h<o.payload.length?(o.payload=o.payload.subarray(h),o.seqno+=h,!0):!1});return e.length=0,e.push(...c),f.includes(0)?(console.warn(`[meter-core/tcp_tracker] - Dropped ${r} bytes`),null):i}};function A(n,e,t){if(t.hdrlen==20)return!1;let s=e.offset+20,r=t.hdrlen-20,i=s+r;for(;s<i;)switch(n[s]){case 0:s=i;break;case 1:s+=1;break;case 2:s+=4;break;case 3:s+=3;break;case 4:s+=2;break;case 5:return!0;case 8:s+=10;break;case 254:case 255:s+=n[s+1]??1;break;default:throw new Error(`[meter-core/tcp-tracker] - Unknown TCPOption ${n[s]}, packet is probably malformed, should drop.`)}return!1}function m(n){var e=n.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);return e&&e.length===5?(+e[1]<<24)+(+e[2]<<16)+(+e[3]<<8)+ +e[4]:null}function g(n,e){let t=m(n),s=m(e.ip),r=m(e.mask);return!t||!s||!r?!1:(t&r)===(s&r)}var{findDevice:D,deviceList:E}=_.default.Cap,{Ethernet:$,PROTOCOL:T,IPV4:x,TCP:R}=_.default.decoders;var b=class extends v.TypedEmitter{c;#s;constructor(e,t){super(),this.c=new _.default.Cap,this.#s=Buffer.alloc(65535);let s=this.c.open(e,`tcp and (src port ${t.port} or dst port ${t.port})`,10*1024*1024,this.#s),r=new p(t);this.c.setMinBytes&&this.c.setMinBytes(54),this.c.on("packet",(i,f)=>{let c;if(s==="ETHERNET"){let u=$(this.#s);if(u.info.type!==T.ETHERNET.IPV4)return;c=u.offset}else if(s==="NULL"&&t.ip==="127.0.0.1"){if(this.#s.readUInt32LE()!==2)return;c=4}else return;let o=x(this.#s,c);if(o.info.protocol===T.IP.TCP){let u=R(this.#s,o.offset);r.track_packet(this.#s,o,u)}}),r.on("session",i=>{console.info(`[meter-core/pkt-capture] - New session ${i.src}->${i.dst} ${i.is_ignored?"(ingored) ":""}(Total: ${Object.keys(r.sessions).length})`),i.on("payload_recv",f=>{this.emit("packet",f)})})}close(){this.c.close()}},y=class extends v.TypedEmitter{caps;constructor(){super(),this.caps=new Map;for(let e of E())for(let t of e.addresses)if(t.addr&&t.netmask&&(0,C.isIPv4)(t.addr))try{let s=new b(e.name,{ip:t.addr,mask:t.netmask,port:6040});s.on("packet",r=>this.emit("packet",r,e.name)),this.caps.set(e.name,s);break}catch(s){console.error(`[meter-core/PktCaptureAll] ${s}`)}}close(){for(let e of this.caps.values())e.close()}};0&&(module.exports={PktCapture,PktCaptureAll,deviceList,findDevice});
