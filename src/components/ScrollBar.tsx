import * as React from 'react';
import { useEffect } from 'react';
import "./sb.css";
interface ISBar {
    children?: any
}
export default (props: ISBar) => {
    const {children} = props;
    const containerRef = React.useRef(null);
    const viewRef = React.useRef<HTMLDivElement>(null);
    const [top, setTop] = React.useState(0);
    const [isShow, setIsShow] = React.useState(false);

    const scrollHandler = (e: any) => {
        const top = e.target.scrollTop;
        setTop(top);
        if (!isShow) {
            setIsShow(true);
        }
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
        {isShow ?
            <Bar top={top}></Bar> :
            null
        }
    </div>
    return null
}

const Bar = (props: any)=>{
    return <div className="sb-bar-container">
        <div className="sb-bar" style={{"top": props.top||10}}></div>
    </div>
}