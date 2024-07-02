import React, { useState } from 'react';
import Title from './Title';
import RecordMessage from "./RecordMessage"; 

function Controller() {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);


    const createBlobUrl = (data: any) => {
        const blob = new Blob([data], { type : "audio/mpeg"});
        const url = window.URL.createObjectURL(blob);
        return url;
    };
    const handleStop = async (blobUrl : string) => {
        setIsLoading(true);

        //append recorded messages to message send to backend[BACKEND]
        setIsLoading(false);

    };
    return (
        <div className="h-screen overflow-y-hidden">
            <Title setMessages = {setMessages}/>
            <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
                
                {/* {Recorder} */}
                <div className = "fixed bottom-0 w-full py-6 border-t text-center bg-gray-200"> 
                    <div className = "flex justify-center items-center w-full">
                        <RecordMessage handleStop = {handleStop}/>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Controller;