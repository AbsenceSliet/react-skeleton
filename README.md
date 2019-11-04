[![NPM](https://nodei.co/npm/react-awesome-skeleton.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-awesome-skeleton/)


# React-Awesome-Skeleton
基于[React16+](https://www.reactjscn.com/)、适用于单页应用

# Example
[Demo Page](https://github.com/AbsenceSliet/react-skeleton/blob/master/example/index.tsx)

# Install

### NPM or YARN

```bash
npm install react-awesome-skeleton --save
```
or
```
yarn add  react-awesome-skeleton --save
```

### Use in Compoent

```bash
import Skeleton from "react-awesome-skeleton"
## 引入样式
import "react-awesome-skeleton/lib/main.min.css"

### In component 
<Skeleton />
```

# API

### loading
**loading**: boolean  是否展示该组建 默认true
```
    <Skeleton loading={true} />
```
### active
**loading**: boolean  是否展示动画 默认false
```
    <Skeleton active={true} />
```
### paragraph
**paragraph**: SkeletonParagraphProps|boolean  线条配置 默认true
```
    <Skeleton paragraph＝{true}/>
```
#### SkeletonParagraphProps 参数
```
    rows?:number;  //行数 
    width?:number | string   //宽度
    style?:object   //对应样式

    <Skeleton paragraph＝{style:{height:'20px'},rows:5,width:'60px'}/>
```

### title
**title**: SkeletonTitleProps|boolean  线条配置 默认true
```
    <Skeleton paragraph＝{true}/>
```
#### SkeletonTitleProps 参数
```
    width?:number | string  宽度
    style?:object  对应样式

    <Skeleton paragraph＝{style:{height:'20px'},rows:5,width:'60px'}/>
```
### avatar
**title**: SkeletonAvatarProps|boolean  线条配置 默认true
```
    <Skeleton paragraph＝{true}/>
```
#### SkeletonAvatarProps 参数
```
    width:  宽度
    size?: 'large' | 'small' | 'default' | number;   //默认large
    shape?: 'circle' | 'square'; //默认circle
    order?: number   //排在左边或者右边 默认是0 左边

    <Skeleton paragraph＝{style:{height:'20px'},rows:5,width:'60px'}/>
```

