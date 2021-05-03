import logo from './logo.svg';
import './App.css';
import index from "../"
import index from ""

function App() {
    return (
        <div>
            <Router>


                <Wrapper>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />

                        <Route path="/cars" exact component={Cars} />
                        <Route path="/buying" component={Buying} />
                        <Route path="/selling" component={Selling} />
                        <Route path="/accessorize" component={Accessorize} />
                        <Route path="/forum" component={Forum} />
                        <Route path="/maintenance" component={Maintenance} />
                        <Route path="/history" component={History} />
                    </Switch>

                </Wrapper>

            </Router>

        </div>
    );
}

export default App;
