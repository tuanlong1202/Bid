import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import NewTender from "./NewTender";
function Tender({bid_id}) {
    const [tenderlist, setTenders] = useState([]);
    
    useEffect(loadTenders(),[]);
    
    function loadTenders(){
        fetch(`/bids/${bid_id}/tenders`)
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
            setTenders(data);
        })
        .catch((err) => console.log(err.errors));
    }

    function handleOnAdd() {
        loadTenders();
    }
    
    return (
        <>
            <>
                <NewTender bid_id={bid_id} onAdd={handleOnAdd} >
                </NewTender>
            </>
            {tenderlist.length > 0 ? (
                tenderlist.map((tender) => (
                <>
                <p>
                <h3>Price: {tender.price}</h3>
                &nbsp;·&nbsp;
                <cite>By {tender.user.user_name}</cite>
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