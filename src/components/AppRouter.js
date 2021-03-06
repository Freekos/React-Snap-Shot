import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from '../routes';
import { HOME_ROUTE } from '../util/consts';

import { responsePhoto } from './actions/response';

export const Context = React.createContext(null);

const AppRouter = () => {
    const [request, setRequest] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    const response = async(value) => {
        try {
            let request = await responsePhoto(value);
            let hits = request.hits;
            setImages(hits);
        }catch(e) {
            setError(e);
        }
    }

    useEffect(() => {
        if(error) {
            alert(error)
        }
    }, [error])

    return (
        <Context.Provider
            value={{
                value: request,
                setValue: setRequest,
                setQuery: response,
                imgs: images,
            }}
        >
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />}></Route>
                ))}

                <Route path='*' element={<Navigate to={HOME_ROUTE}/>} />
            </Routes>
        </Context.Provider>
    )
}

export default AppRouter;