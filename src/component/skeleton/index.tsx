import * as React from "react";
import './index.scss';
import classNames from "classnames";
import Paragraph, { SkeletonParagraphProps } from './Paragraph';
import Title, { SkeletonTitleProps } from './Title';
import Avatar, { SkeletonAvatarProps } from './Avatar';
interface SkeletonProps {
    active?: boolean;
    prefixCls?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    paragraph?: SkeletonParagraphProps | boolean;
    title?: SkeletonTitleProps | boolean,
    avatar?: SkeletonAvatarProps | boolean
}
const ConfigConsumer = React.createContext(null).Consumer
function getComponentProps<T>(prop: T | boolean | undefined): T | {} {
    if (prop && typeof prop === 'object') {
        return prop
    }
    return {}
}
function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
    if (hasTitle && !hasParagraph) {
        return { shape: 'square' }
    }
    return { shape: 'circle' }
}
function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
    let basicProps: SkeletonTitleProps = {}
    if (hasAvatar && hasParagraph) {
        basicProps.width = '50%'
    }
    if (!hasAvatar && hasParagraph) {
        basicProps.width = '35%'
    }
    return basicProps
}
function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
    let basicProps: SkeletonParagraphProps = {}
    if (!hasAvatar || !hasTitle) {
        basicProps.width = '65%'
    }
    if (!hasAvatar && hasTitle) {
        basicProps.rows = 3
    } else {
        basicProps.rows = 2
    }
    return basicProps
}
 class Skeleton extends React.Component<SkeletonProps>{
    static defaultProps: Partial<SkeletonProps> = {
        avatar: false,
        title: true,
        paragraph: true
    }
    renderSkeleton = () => {
        const {
            prefixCls = 'skeleton',
            active,
            title,
            paragraph,
            avatar,
            className,
            children,
            loading
        } = this.props
        if (loading || !('loading' in this.props)) {
            const hasAvatar = !!avatar;
            const hasTitle = !!title;
            const hasParagraph = !!paragraph;
            let avatarNode;
            if (hasAvatar) {
                const avatarProps: SkeletonAvatarProps = {
                    prefixCls: `${prefixCls}-avatar`,
                    ...getAvatarBasicProps(hasTitle, hasParagraph),
                    ...getComponentProps(avatar)
                }
                avatarNode = (
                    // <div className={`${prefixCls}-header`}>
                        
                    // </div>
                    <Avatar  {...avatarProps} />
                )
            }
            let contentNode;
            if (hasTitle || hasParagraph) {
                let titleNode;
                if (hasTitle) {
                    const titleProps: SkeletonTitleProps = {
                        prefixCls: `${prefixCls}-title`,
                        ...getTitleBasicProps(hasAvatar, hasParagraph),
                        ...getComponentProps(title)
                    }
                    titleNode = <Title {...titleProps} />
                }
                let paragraphNode;
                if (hasParagraph) {
                    const paragraphProps: SkeletonParagraphProps = {
                        prefixCls: `${prefixCls}-paragraph`,
                        ...getParagraphBasicProps(hasAvatar, hasTitle),
                        ...getComponentProps(paragraph)
                    }
                    paragraphNode = <Paragraph {...paragraphProps} />
                }
                contentNode = (
                    <div className={`${prefixCls}-content`}>
                        {titleNode}
                        {paragraphNode}
                    </div>
                );
            }
            const cls = classNames(prefixCls, className, {
                [`${prefixCls}-with-avatar`]: hasAvatar,
                [`${prefixCls}-active`]: active
            });
            return (
                <div className={cls}>
                    {avatarNode}
                    {contentNode}
                </div>
            )
        }
        return children;
    };
    render(){
        return (
            <ConfigConsumer>{this.renderSkeleton}</ConfigConsumer>
        )
    }
}
export default Skeleton