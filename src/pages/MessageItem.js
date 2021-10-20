import React from "react";
function MessageItem({m , viewClick}) {
    function onViewClick() {
        viewClick(m.id);
    }
    return (
        <>
            <li>
                <span onClick={onViewClick}>
                    { m.unread ? 
                        (<strong>{m.subject}</strong>
                        ) : (
                            <>{m.subject}</>
                        )
                    }
                </span>
            </li>        
        </>
    )
}
export default MessageItem