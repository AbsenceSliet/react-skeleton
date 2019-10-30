import * as React from  "react";
import classNames from  "classnames";
type widthUnit = number | string;
export  interface SkeletonParagraphProps{
    rows?:number;
    width?:widthUnit | Array<widthUnit>;
    className?:string;
    style?:object;
    prefixCls?:string
}

export default class  Paragraph extends React.Component<SkeletonParagraphProps,{}>{
    getWidth = (index:number) => {
        const { width,rows = 2 } = this.props
        if(Array.isArray(width)){
            return width[index]
        }
        if(rows - 1 === index){
            return width
        }
        return  undefined
    }
    render(){
        const  {rows,className,style,prefixCls} = this.props
        const rowList = [...Array(rows)].map((_,index) => (
            <li key={index} style={{width:this.getWidth(index)}}></li>
        ))
        return (
            <ul className={classNames(prefixCls,className)} style={style}>
                {rowList}
            </ul>
        )
    }
}