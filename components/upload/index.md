---
category: Components
subtitle: 上传
order: 16
type: 表单
title: Upload
---

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - | 1.0.0 |
| action | 上传的地址 | string \| (file) => Promise&lt;string> | - | 1.0.0 |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）。**注意：IE9 不支持该方法** | (file, fileList) => boolean \| Promise&lt;File> | - | 1.0.0 |
| data | 上传所需额外参数或返回上传额外参数的方法 | object\|(file) => object \| Promise&lt;object> | - | 1.0.0 |
| defaultFileList | 默认已经上传的文件列表 | object\[] | - | 1.0.0 |
| directory | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)） | boolean | false | 1.0.0 |
| disabled | 是否禁用 | boolean | false | 1.0.0 |
| fileList | 已经上传的文件列表（受控） | object\[] | - | 1.0.0 |
| itemRender | 自定义上传列表项 | (originNode: ReactElement, file: UploadFile, fileList?: object\[]) => React.ReactNode | - | 1.0.0 |
| listType | 上传列表的内建样式，支持二种基本样式 `text`, `picture` | string | `text` | 1.0.0 |
| method | 上传请求的 http method | string | `post` | 1.0.0 |
| multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件 | boolean | false | 1.0.0 |
| name | 发到后台的文件参数名 | string | `file` | 1.0.0 |
| showUploadList | 是否展示文件列表 | boolean | true | 1.0.0 |
| transformFile | 在上传之前转换文件。支持返回一个 Promise 对象 | function(file): string \| Blob \| File \| Promise<string \| Blob \| File> | - |  1.0.0 |
| withCredentials | 上传请求时是否携带 cookie | boolean | false | 1.0.0 |
| onChange | 上传文件改变时的状态，详见 [onChange](#onChange) | function | - | 1.0.0 |
| onPreview | 点击文件链接或预览图标时的回调 | function(file) | - | 1.0.0 |
| onRemove   | 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除               | function(file): boolean \| Promise | -   | 1.0.0 |
| onStart | 开始上传触发的回调 | function(file) | - | 1.0.0 |

### onChange

> 上传中、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png', // 文件名
      status: 'done', // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
      response: '{"status": "success"}', // 服务端响应内容
      linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
   }
   ```

2. `fileList` 当前的文件列表。

3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

### UploadInstance

| 参数 | 说明 | 类型 | 版本     |
| --- | --- | --- |--------|
| fileList | 组件fileList属性 | file[] | 1.7.19 |
| uploadFiles | 上传文件 | (files: files) => void | 1.7.19 |
| reUploadFile | 重新单个文件| (file: file) => void | 1.7.19 |
| removeFile | 删除单个文件| (file: file) => void | 1.7.19 |
| abortFile | 中断单个上传文件，传入空为中断所有| (file?: file) => void | 1.7.19 |
| input | input Ref | - | 1.7.19 |

## FAQ

### 服务端如何实现？

- 服务端上传接口实现可以参考 [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side)。
- 如果要做本地 mock 可以参考这个 [express 的例子](https://github.com/react-component/upload/blob/master/server.js)。

### 如何显示下载链接？

请使用 fileList 属性设置数组项的 url 属性进行展示控制。

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-upload-color | --kd-g-color-text-third | #999 |
|  | --kd-c-upload-error-color | --kd-g-color-error | #fb2323 |
|  | --kd-c-upload-color-background-error | --kd-g-color-background-error | #fff2f4 |
|  | --kd-c-upload-color-border-error | --kd-g-color-border-error | #fc808B |
|  | --kd-c-upload-color-border | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-upload-division-color | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-upload-color-border-active | --kd-g-color-text-link | #0e5fd8 |
|  | --kd-c-upload-color-background | --kd-g-color-background-contain | #fafafa |
|  | --kd-c-upload-color-background-ongoing | --kd-g-color-background-ongoing | #f2f9ff |
|  | --kd-c-upload-color-background-hover | --kd-g-color-hover | #f5f5f5 |
|  | --kd-c-upload-panel-button-color | - | #0E5FD8 |
|  | --kd-c-upload-panel-color | --kd-g-color-text-primary | #212121 |
| font | --kd-c-upload-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-upload-picture-action-font-size | --kd-g-font-size-small | 12px |
| motion | --kd-c-upload-motion-duration | --kd-g-duration | 0.3s |
| radius | --kd-c-upload-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-upload-list-item-height | - | 44px |
| spacing | --kd-c-upload-text-list-margin-top | - | 16px |
|  | --kd-c-upload-text-list-item-padding-horizontal | - | 20px |
|  | --kd-c-upload-text-list-item-name-padding-left | - | 4px |
|  | --kd-c-upload-text-list-item-name-padding-right | - | 8px |
