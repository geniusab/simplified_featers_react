import { useState, useEffect } from "react";


function useTitleChange(title) {
   
    useEffect(() => {
      document.title = title;
    }, [title]);

}

export  useTitleChange