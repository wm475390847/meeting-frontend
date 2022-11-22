import { RequestOpt } from "@/utils/request";
import { request } from "@/utils/tool";
import OSS from "ali-oss";
import path from "path";

const client = new OSS({
    // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: 'yourAccessKeyId',
    accessKeySecret: 'yourAccessKeySecret',
    // 填写Bucket名称。
    bucket: 'xhzy-test',
});

const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'private',
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'true',
};

async function putObject(data: any) {
    try {
        // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
        // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
        // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
        const result = await client.put(
            "qa-meeting/face/exampleobject.txt",
            data
            //{headers}
        );
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}