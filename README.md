# oirno

`oirno` is a toolkit built for Olympic-Informatics Runs No cOde.

oirno 是一个用于加速“编写-运行-改错”的工具集，它致力于为OIer提供开箱即用的标准本地评测环境。

## 安装

### GitHub Release

未发布。

### 从源码构建

```bash
npm ci
npm run build
```

## 使用

### 命令行

```bash
oirno --help # 查看帮助
```

#### 单次评测

```bash
oirno judge [/path/to/src]
```

默认情况下，oirno 将在当前目录寻找 `oirno/oirno.json` 文件，该文件用于配置评测机的行为，并将 `source.code` 视作默认加载的源码文件。

### 工作区配置文件

下列是一个典型的用于 C 评测环境的 `oirno/oirno.json` 配置文件：

```json
{
    "version": 1, // 配置文件版本
    "config": {
        // 编译命令，其中 {bin} 代表编译输出文件，{src} 代表源码文件
        "compile": "gcc -x c -o {bin} -lm -O2 -Wall -std=c99 -Wno-unused-result -DONLINE_JUDGE {src}",
        // 运行命令，其中 {bin} 代表编译输出文件
        "run": "{bin}",
        // 默认评测点内存限制，单位为 MB
        "memory_limit": 256,
        // 默认评测点时间限制，单位为 ms
        "time_limit": 1000
    },
    "points": [
        {
            // 评测点名称，用于在评测报告中显示
            "name": "Sample 1",
            // 输入文件，相对于本配置文件的路径，不支持绝对路径
            "input": "1.in",
            // 期望输出文件，相对于本配置文件的路径，不支持绝对路径
            "output": "1.out",
            // 输出比较方式，支持 exact, string-exact 与自定义
            "method": "exact",
            // 评测点时间限制，单位为 ms，若不填则使用默认值
            "time_limit": 200,
            // 评测点分值
            "score": 1
        },
        {
            "name": "Sample 2",
            "input": "1.in",
            "output": "1.out",
            // 自定义比较方式，其中 {out} 代表运行输出文件，{exp} 代表期望输出文件
            "method": {
                "command": "diff -w {out} {exp}"
            },
            "memory_limit": 128,
            "score": 1
        },
        {
            "name": "Sample 3",
            "input": "1.in",
            "output": "1.out",
            "method": "string-exact",
            "memory_limit": 128,
            "score": 1
        }
    ]
}
```

### 比较方式的区别

#### `exact`

别名：`number-exact`

默认比较方式，该方式将逐行切割输出，再按空格切割输出，要求每一个块的内容完全相同。

Note: 该方式为作者推测的主流评测机的比较方式，但具体实现可能存在差异，欢迎指出。

#### `string-exact`

极端严格的比较方式，要求输出的内容与期望输出完全相同。

#### 自定义

自定义比较方式需要提供一个命令，oirno 将在运行结束后执行该命令，若命令返回值为 0 则判定为正确，否则判定为错误，并返回该命令的标准输出。

## 功能列表

- [ ] 命令行
  - [ ] `oirno init` 初始化工作区
  - [ ] `oirno test` 运行单个评测点
  - [x] `oirno judge` 运行评测
  - [ ] `oirno watch` 监视文件变化并自动评测
- [ ] 网页 UI
  - [ ] `oirno serve` 启动 _REST API_ 服务
  - [ ] 可视化评测报告
  - [ ] 编辑配置文件
    - [ ] 编辑评测配置
    - [ ] 编辑评测点
- [ ] 杂项
  - [ ] 工作区容器化
  - [ ] 项目容器化

### 路线图

- 23年末
  - 完善命令行相关功能
  - 发布首个预览版本
- 24年初
  - 工作区可配置为容器，仅需挂载源码文件
  - 提供外部 REST API 服务
  - 通过网页 UI 可视化评测报告
- 24年中
  - 网页 UI 支持编辑配置文件
