import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { observable } from 'mobx';

import './app.css';

const App = () => {
    const store = observable({
        email: '',
        password: '',
        sendData: async () => {
            const client = new ApolloClient({
                uri: 'http://localhost:4015/graphql',
                cache: new InMemoryCache(),
            });
            client
                .query({
                    query: gql`
                        query CreateUser($email: String!, $password: String!) {
                            addUser(email: $email, password: $password) {
                                email
                                password
                            }
                        }
                    `,
                    variables: {
                        email: store.email,
                        password: store.password,
                    },
                })
                .then((response) => console.log(response.data))
                .catch((error) => console.error(error));
            // const { data } = await client.mutate({
            //     mutation: gql`
            //         mutation CreateUser($email: String!, $password: String!) {
            //             createUser(
            //                 addUser: { email: $email, password: $password }
            //             ) {
            //                 email
            //                 password
            //             }
            //         }
            //     `,
            //     variables: {
            //         email: store.email,
            //         password: store.password,
            //     },
            // });
            // console.log(data);
        },
        handleSubmit: (e) => {
            e.preventDefault();
            store.sendData();
        },
    });

    return (
        <div className="app-add-form">
            <h3>REGISTRASTION</h3>
            <form className="add-form d-flex" onSubmit={store.handleSubmit}>
                <input
                    id="email"
                    type="text"
                    className="form-control new-post-label"
                    placeholder="email"
                    onChange={(e) => (store.email = e.target.value)}
                />
                <input
                    id="password"
                    type="password"
                    className="form-control new-post-label"
                    placeholder="password"
                    onChange={(e) => (store.password = e.target.value)}
                />
                <button type="submit" className="btn btn-outline-light">
                    Register
                </button>
            </form>
        </div>
    );
};
export default App;
