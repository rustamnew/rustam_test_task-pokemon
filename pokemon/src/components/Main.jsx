import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Header } from "./Header";
import { Info } from "./Info";
import { CardList } from "./CardList";
import { SideList } from "./SideList";


export const Main = () => {
    return <>
        <div className="wrapper">
            <Header/>

            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <div className="lists">
                            <SideList/>
                            <CardList/>
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
