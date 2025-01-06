# OpenRPC OOM Demo

The repo contains a reproducible issue with `@open-rpc/schema-utils-js` resulting in the Node process OOM-ing.

- `demo.json` - A valid OpenRPC document containing a recursive type definition
- `index.ts` - Small program to load a json file and call `parseOpenRPCDocument`

## Running
1. Install deps
```
yarn
```
2. Run demo with included `demo.json`
```
yarn demo
```
> Note: You can also run the program with any OpenRPC Document
> 
> ```shell
> yarn demo -f <PATH>
> ```

## Additional Info

Running the demo will result in Node receiving a SIGABRT due to the program exceeding the heap allocation limit.
```
$ ts-node index.ts
Loading ./demo.json...

<--- Last few GCs --->

[305:0x138008000]    28680 ms: Mark-Compact 4042.0 (4129.1) -> 4032.0 (4135.6) MB, 4280.42 / 0.00 ms  (average mu = 0.169, current mu = 0.039) allocation failure; scavenge might not succeed
[305:0x138008000]    32153 ms: Mark-Compact 4048.7 (4136.1) -> 4036.6 (4139.8) MB, 3451.54 / 0.00 ms  (average mu = 0.095, current mu = 0.006) allocation failure; scavenge might not succeed


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x1008acbf4 node::Abort() [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 2: 0x1008acddc node::ModifyCodeGenerationFromStrings(v8::Local<v8::Context>, v8::Local<v8::Value>, bool) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 3: 0x100a30da8 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, v8::OOMDetails const&) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 4: 0x100c056e8 v8::internal::Heap::GarbageCollectionReasonToString(v8::internal::GarbageCollectionReason) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 5: 0x100c0959c v8::internal::Heap::CollectGarbageShared(v8::internal::LocalHeap*, v8::internal::GarbageCollectionReason) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 6: 0x100c06000 v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::internal::GarbageCollectionReason, char const*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 7: 0x100c03d88 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 8: 0x100bfa9dc v8::internal::HeapAllocator::AllocateRawWithLightRetrySlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
 9: 0x100bfb23c v8::internal::HeapAllocator::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
10: 0x100be0240 v8::internal::Factory::NewFillerObject(int, v8::internal::AllocationAlignment, v8::internal::AllocationType, v8::internal::AllocationOrigin) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
11: 0x100fc7e70 v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
12: 0x101324c44 Builtins_CEntry_Return1_ArgvOnStack_NoBuiltinExit [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
13: 0x1069e158c 
14: 0x1069db124 
15: 0x1069d79e0 
16: 0x1069e0a04 
17: 0x101380fb8 Builtins_PromiseFulfillReactionJob [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
18: 0x1012c2b94 Builtins_RunMicrotasks [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
19: 0x10129a3f4 Builtins_JSRunMicrotasksEntry [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
20: 0x100b729f0 v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
21: 0x100b72edc v8::internal::(anonymous namespace)::InvokeWithTryCatch(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
22: 0x100b730b8 v8::internal::Execution::TryRunMicrotasks(v8::internal::Isolate*, v8::internal::MicrotaskQueue*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
23: 0x100b9a284 v8::internal::MicrotaskQueue::RunMicrotasks(v8::internal::Isolate*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
24: 0x100b9aa20 v8::internal::MicrotaskQueue::PerformCheckpoint(v8::Isolate*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
25: 0x1007dcc64 node::InternalCallbackScope::Close() [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
26: 0x1007dd01c node::InternalMakeCallback(node::Environment*, v8::Local<v8::Object>, v8::Local<v8::Object>, v8::Local<v8::Function>, int, v8::Local<v8::Value>*, node::async_context) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
27: 0x1007f348c node::AsyncWrap::MakeCallback(v8::Local<v8::Function>, int, v8::Local<v8::Value>*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
28: 0x1008b264c node::fs::FSReqCallback::Resolve(v8::Local<v8::Value>) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
29: 0x1008b2d9c node::fs::AfterNoArgs(uv_fs_s*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
30: 0x1008a7cf0 node::MakeLibuvRequestCallback<uv_fs_s, void (*)(uv_fs_s*)>::Wrapper(uv_fs_s*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
31: 0x101278b64 uv__work_done [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
32: 0x10127c5b4 uv__async_io [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
33: 0x10128e68c uv__io_poll [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
34: 0x10127cb78 uv_run [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
35: 0x1007dd754 node::SpinEventLoopInternal(node::Environment*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
36: 0x1008ec8d8 node::NodeMainInstance::Run(node::ExitCode*, node::Environment*) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
37: 0x1008ec674 node::NodeMainInstance::Run() [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
38: 0x100877030 node::Start(int, char**) [/Users/d/.nvm/versions/node/v20.10.0/bin/node]
39: 0x191f58274 start [/usr/lib/dyld]
error Command failed with signal "SIGABRT".

```

A naive hypothesis is that this is caused by the recursive nature of the result parameter type `RecursiveType`.

Its worth noting this issue **does** not present itself in the OpenRPC playground.
