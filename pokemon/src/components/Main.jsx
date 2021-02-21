import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Header } from "./Header";
import { Info } from "./Info";
import { MainList } from "./MainList";
import { SideList } from "./SideList";


export const Main = () => {
    return <>
        <div className="main">
            <Header/>

            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <div className="lists">
                            <SideList/>
                            <MainList/>
                        </div>
                    </Route>

                    <Route path='/pokemon'>
                        <Info/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    </>
}
