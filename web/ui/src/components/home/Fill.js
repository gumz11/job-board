import React from 'react';

const Fill = (props) => (
    <div className="jb-background" style={{
        height: window.innerHeight+'px', 
        backgroundImage:`url("${props.screen}")`
    }}>
        {/* <a style={{position:'absolute',bottom: '0',margin:'5px 0',backgroundColor:'black',color:'white',textDecoration:'none',padding:'4px 6px',fontFamily:'-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif',fontSize:'12px',fontWeight:'bold',lineHeight:'1.2',display:'inline-block',borderRadius:'3px'}} href={`https://unsplash.com/@${props.photographer}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`} target="_blank" rel="noopener noreferrer" title={`Download free do whatever you want high-resolution photos from ${props.photographer}`}><span style={{display:'inline-block',padding:'2px 3px'}}>{props.photographer}</span></a> */}
    </div>
);

export default Fill;