import * as React from 'react';
import { useEffect } from 'react';
import getInnerHeight from './getInnerHeight';
import "./sb.css";
interface ISBar {
    children?: any
}
export default (props: ISBar) => {
    const {children} = props;
    const containerRef = React.useRef(null);
    const viewRef = React.useRef<HTMLDivElement>(null);
    const barContainerRef = React.useRef<HTMLDivElement>(null);
    const [top, doSetTop] = React.useState(0);
    const [barHeight, doSetBarHeight] = React.useState(10);
    const [isShow, setIsShow] = React.useState(false);

    const scrollHandler = (e: any) => {
        setBarHeight(e.target);
        setTop(e.target);
        if (!isShow) {
            setIsShow(true);
        }
    };

    const setBarHeight = (el: any)=>{
        const {clientHeight, scrollHeight} = el;
        const barContainerHeight = getInnerHeight(barContainerRef.current);
        const barHeight = clientHeight/scrollHeight * barContainerHeight;
        doSetBarHeight(barHeight);
    }
    const setTop = (el: any) => {
        const {scrollTop, clientHeight, scrollHeight} = el;
        const barContainerHeight = getInnerHeight(barContainerRef.current);
        const barHeight = clientHeight/scrollHeight * barContainerHeight;
        const top = scrollTop/(scrollHeight-clientHeight)*(barContainerHeight-barHeight);
        doSetTop(top);
    }


    useEffect(() =>{
        if (viewRef.current) {
            viewRef.current.addEventListener("scroll", scrollHandler, true);
        }
    },[])

    return <div ref={containerRef} className="sb-container">
        <div ref={viewRef} className="sb-view">
            {children}
        </div>
        {
            <Bar
            isShow={isShow}
            top={top} barHeight={barHeight} ref={barContainerRef}></Bar>
        }
    </div>
    return null
}

const Bar = React.forwardRef((props: any, ref: any) =>{
        return <div className="sb-bar-container" ref={ref} style={{display: props.isShow?"block":"none"}}>
            <div className="sb-bar" style={{"top": props.top||0, "height": props.barHeight}}></div>
        </div>
})

