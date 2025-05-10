# 常见错误

## A public key has been found, but no private key. Make sure to set `TAURI_SIGNING_PRIVATE_KEY` environment variable.
       Error A public key has been found, but no private key. Make sure to set `TAURI_SIGNING_PRIVATE_KEY` environment variable.

该错误是没有设置TAURI_SIGNING_PRIVATE_KEY引起的，打包时需要在打包环境设置私钥变量（.env文件中设置不起作用）
https://tauri.nodejs.cn/plugin/updater/
https://blog.csdn.net/weixin_44786530/article/details/131963524

## failed to decode secret key: incorrect updater private key password: failed to fill whole buffer
Error failed to decode secret key: incorrect updater private key password: failed to fill whole buffer

该错误是设置了公钥和私钥，但两者不匹配，请检查一下公钥、私钥是否设置正确
https://tauri.nodejs.cn/plugin/updater/
https://blog.jiang.in/archives/6acb3593-dd05-44df-9c80-119d02d6c76b
