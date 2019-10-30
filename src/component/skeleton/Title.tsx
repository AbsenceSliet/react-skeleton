import * as React from "react";
import classNames from  "classnames";


export interface SkeletonTitleProps{
    className?:string;
    width?: number | string;
    style?: object;
    prefixCls?: string;
}

const Title =({className,width,style,prefixCls}:SkeletonTitleProps)=>(
    <h3 className={classNames(prefixCls,className)} style={{ width, ...style }} />
)

export default Title;