import { useState,useEffect } from "react";
import ReactMarkdown from "react-markdown";
import NewTender from "./NewTender";
function Tender({user, bid, tenders}) {
    const [tenderlist, setTenders] = useState(tenders.sort((a, b) => b.price - a.price));
    
    function handleOnAdd(addTender) {
        const newArr = [...tenderlist,addTender];
        newArr.sort((a, b) => b.price - a.price);
        setTenders(newArr);
    }
    
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        // load users
        fetch(`/users`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setUserList(data);
                });
            }
        }); 
    }, []);

    function user_name(tender){
        return (userList.length > 0) ? userList.find(x => x.id === tender.user_id).user_name : "";
    }

    return (
        <>
            <>
            {(bid.end_session || bid.user.id === user.id) ? (
                <>
                </>
            ) : (
                <NewTender bid_id={bid.id} onAdd={handleOnAdd} />
            )}
            </>
            {tenderlist.length > 0 ? (
                tenderlist.map((tender) => (
                <>
                <p>
                <h3>Price: {tender.price}</h3>
                &nbsp;·&nbsp;
                <cite>By {user_name(tender)}</cite>
                </p>
                <ReactMarkdown>{tender.description}</ReactMarkdown> 
                </>
                ))
            ) : (
                <>
                </>
            )}
        </>
    );
}

export default Tender;