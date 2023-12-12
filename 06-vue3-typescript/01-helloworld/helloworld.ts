/*
首先得安装node js，然后用npm安装typescript
PS D:\ws-vue\snow-vue3-overview\06-vue3-typescript\01-helloworld> cnpm install -
g typescript
Downloading typescript to D:\oth_tools\node_jd_20_modules\node_modules\typescrip
t_tmp
Copying D:\oth_tools\node_jd_20_modules\node_modules\typescript_tmp\.store\types
cript@5.3.3\node_modules\typescript to D:\oth_tools\node_jd_20_modules\node_modu
les\typescript
Installing typescript's dependencies to D:\oth_tools\node_jd_20_modules\node_mod
ules\typescript/node_modules
All packages installed (used 4ms(network 1ms), speed 0B/s, json 0(0B), tarball 0
B, manifests cache hit 0, etag hit 0 / miss 0)
[typescript@5.3.3] link D:\oth_tools\node_jd_20_modules\tsc@ -> D:\oth_tools\nod
e_jd_20_modules\node_modules\typescript\bin\tsc
    [typescript@5.3.3] link D:\oth_tools\node_jd_20_modules\tsserver@ -> D:\oth_tool
s\node_jd_20_modules\node_modules\typescript\bin\tsserver



//然后用tsc命令编译ts文件成js文件
PS D:\ws-vue\snow-vue3-overview\06-vue3-typescript\01-helloworld> tsc .\hellowor
ld.ts
PS D:\ws-vue\snow-vue3-overview\06-vue3-typescript\01-helloworld>*/



function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);